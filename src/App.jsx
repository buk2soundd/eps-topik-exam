import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import QuestionArea from './components/QuestionArea';
import ResultModal from './components/ResultModal';
import StartScreen from './components/StartScreen';
import {
  EXAM_SECTIONS,
  EXAM_CATEGORIES,
  EXAM_DURATION_SECONDS,
  LISTENING_PLAY_TIMES,
  LISTENING_PLAY_DURATION_SEC,
  LISTENING_ANSWER_TIME_SEC,
  generateExamSet,
  pickRandomSetNumber,
  POINTS_PER_QUESTION,
} from './data/examData';
import { saveExamResult } from './lib/db';
import { parseConversationScript, getKoreanVoices, loadKoreanVoices, speakConversation } from './lib/tts';

const MIN_FONT = 12;
const MAX_FONT = 22;
const DEFAULT_FONT = 15;

// Auto-play total seconds for one question:
//   (N plays × duration) + answer window
const calcListeningTotal = () =>
  LISTENING_PLAY_TIMES * LISTENING_PLAY_DURATION_SEC + LISTENING_ANSWER_TIME_SEC;

function App() {
  // ── Start screen ──────────────────────────────────────────────────────────
  const [examStarted, setExamStarted] = useState(false);
  const [assignedSet, setAssignedSet] = useState(() => pickRandomSetNumber());
  const [selectedCategory, setSelectedCategory] = useState(EXAM_CATEGORIES.ALL);
  const [examinerName, setExaminerName] = useState('');
  const [examQuestions, setExamQuestions] = useState([]);
  const examStartTimeRef = useRef(null);

  // ── Exam state ────────────────────────────────────────────────────────────
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [answers, setAnswers] = useState({});
  const [remainingSeconds, setRemainingSeconds] = useState(EXAM_DURATION_SECONDS);
  const [showResult, setShowResult] = useState(false);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT);
  const [timerActive, setTimerActive] = useState(false);

  // ── Listening auto-play state ─────────────────────────────────────────────
  // listeningPhase: 'playing' | 'pause' | 'answering' | 'done' | null
  const [listeningPhase, setListeningPhase] = useState(null);
  const [listeningPlayCount, setListeningPlayCount] = useState(0);
  const [listeningSecondsLeft, setListeningSecondsLeft] = useState(0);
  const [currentSpeaker, setCurrentSpeaker] = useState(null);   // '남자' | '여자' | '방송' | null
  const [convSegments, setConvSegments] = useState([]);         // parsed script segments
  const [activeSegIdx, setActiveSegIdx] = useState(-1);        // which segment is speaking
  const listeningTimerRef = useRef(null);
  const speechPauseRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const playFnRef = useRef(null);
  const autoTimerRef = useRef(null);       // 600ms auto-play delay timer
  const safariResumeRef = useRef(null);
  const cancelSpeechFnRef = useRef(null); // cancel fn returned by speakConversation
  const audioRef = useRef(null);           // HTML5 Audio element for MP3 playback

  // ── Derived ───────────────────────────────────────────────────────────────
  const currentQuestion = examQuestions.find((q) => q.id === currentQuestionId);
  const currentSection = currentQuestion?.section ?? EXAM_SECTIONS.READING;
  const isListeningQuestion = currentSection === EXAM_SECTIONS.LISTENING;

  // ── Start exam ────────────────────────────────────────────────────────────
  const handleStart = useCallback(() => {
    // Unlock Web Speech API for the whole session via this user gesture
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const unlock = new SpeechSynthesisUtterance('\u00A0');
      unlock.volume = 0;
      unlock.lang = 'ko-KR';
      window.speechSynthesis.speak(unlock);
      // Preload Korean voices now (after user gesture unlocks TTS)
      loadKoreanVoices();
    }
    const questions = generateExamSet(assignedSet, selectedCategory);
    setExamQuestions(questions);
    setExamStarted(true);
    setTimerActive(true);
    setCurrentQuestionId(1);
    setAnswers({});
    setRemainingSeconds(EXAM_DURATION_SECONDS);
    examStartTimeRef.current = Date.now();
  }, [assignedSet, selectedCategory]);

  // ── Main exam timer ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!timerActive || showResult || !examStarted) return;
    if (remainingSeconds <= 0) { handleSubmit(); return; }
    const id = setTimeout(() => setRemainingSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [remainingSeconds, timerActive, showResult, examStarted]);

  // ── Listening auto-play engine ────────────────────────────────────────────
  const clearListeningTimer = () => {
    if (listeningTimerRef.current) {
      clearInterval(listeningTimerRef.current);
      listeningTimerRef.current = null;
    }
  };

  const cancelSpeech = () => {
    // Cancel pending auto-play timer
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
    playFnRef.current = null;
    // Stop HTML5 audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    // Stop TTS fallback
    if (cancelSpeechFnRef.current) {
      cancelSpeechFnRef.current();
      cancelSpeechFnRef.current = null;
    } else if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (speechPauseRef.current) {
      clearTimeout(speechPauseRef.current);
      speechPauseRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (safariResumeRef.current) {
      clearInterval(safariResumeRef.current);
      safariResumeRef.current = null;
    }
    setCurrentSpeaker(null);
    setActiveSegIdx(-1);
  };

  const startListeningAutoPlay = useCallback((question) => {
    if (!question || question.section !== EXAM_SECTIONS.LISTENING) return;
    clearListeningTimer();
    cancelSpeech();

    setListeningPlayCount(0);
    setCurrentSpeaker(null);
    setActiveSegIdx(-1);
    setListeningPhase('loading');
    setListeningSecondsLeft(0);

    let playIndex = 0;

    const startAnswerTimer = () => {
      setCurrentSpeaker(null);
      setActiveSegIdx(-1);
      setListeningPhase('answering');
      let secs = LISTENING_ANSWER_TIME_SEC;
      setListeningSecondsLeft(secs);
      listeningTimerRef.current = setInterval(() => {
        secs -= 1;
        setListeningSecondsLeft(secs);
        if (secs <= 0) {
          clearListeningTimer();
          setListeningPhase('done');
          setCurrentQuestionId((prev) => Math.min(prev + 1, 40));
        }
      }, 1000);
    };

    // ── HTML5 Audio path (uses pre-generated MP3 files) ─────────────────────
    const playMp3 = () => {
      // Cancel any existing audio before starting new one
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      const audio = new Audio(`/audio/${question.bankId}.mp3`);
      audioRef.current = audio;
      setListeningPhase('playing');

      audio.addEventListener('loadedmetadata', () => {
        setListeningSecondsLeft(Math.ceil(audio.duration));
      });
      audio.addEventListener('timeupdate', () => {
        if (!isNaN(audio.duration)) {
          setListeningSecondsLeft(Math.max(0, Math.ceil(audio.duration - audio.currentTime)));
        }
      });
      audio.addEventListener('ended', () => {
        audioRef.current = null;
        playIndex += 1;
        setListeningPlayCount(playIndex);
        if (playIndex < LISTENING_PLAY_TIMES) {
          setListeningPhase('pause');
          setListeningSecondsLeft(3);
          speechPauseRef.current = setTimeout(() => {
            speechPauseRef.current = null;
            playMp3();
          }, 3000);
        } else {
          startAnswerTimer();
        }
      });
      audio.addEventListener('error', () => {
        // MP3 not found → fall back to TTS
        console.warn(`[Audio] /audio/${question.bankId}.mp3 not found — using TTS fallback`);
        audioRef.current = null;
        fallbackToTTS();
      });

      audio.play().catch(() => {
        // Autoplay blocked by browser
        setListeningPhase('loading');
        playFnRef.current = playMp3;
      });
    };

    // ── TTS fallback (used when MP3 files not yet generated) ─────────────────
    const fallbackToTTS = async () => {
      const script = question.audioScript || '';
      const segments = parseConversationScript(script);
      setConvSegments(segments);
      setActiveSegIdx(-1);
      setCurrentSpeaker(null);
      setListeningPhase('loading');

      const totalChars = segments.reduce((s, seg) => s + seg.text.length, 0);
      const estimatedSec = Math.max(Math.round(totalChars / 3.5), 8);

      const doSpeak = async () => {
        setListeningPhase('playing');
        let elapsed = 0;
        setListeningSecondsLeft(estimatedSec);
        progressIntervalRef.current = setInterval(() => {
          elapsed += 1;
          setListeningSecondsLeft((s) => Math.max(0, s - 1));
          if (elapsed >= estimatedSec) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
        }, 1000);

        const voices = await loadKoreanVoices();

        const onComplete = () => {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
          cancelSpeechFnRef.current = null;
          playIndex += 1;
          setListeningPlayCount(playIndex);
          if (playIndex < LISTENING_PLAY_TIMES) {
            setListeningPhase('pause');
            setCurrentSpeaker(null);
            setActiveSegIdx(-1);
            setListeningSecondsLeft(2);
            speechPauseRef.current = setTimeout(() => {
              speechPauseRef.current = null;
              doSpeak();
            }, 2000);
          } else {
            startAnswerTimer();
          }
        };

        cancelSpeechFnRef.current = speakConversation(
          segments, voices,
          (speaker, idx) => { setCurrentSpeaker(speaker); setActiveSegIdx(idx); },
          onComplete,
          { safariResumeRef }
        );
      };

      doSpeak();
    };

    // Auto-play after short delay (lets React finish rendering)
    autoTimerRef.current = setTimeout(() => {
      autoTimerRef.current = null;
      playMp3();
    }, 600);
    playFnRef.current = () => {
      if (autoTimerRef.current) { clearTimeout(autoTimerRef.current); autoTimerRef.current = null; }
      playMp3();
    };
  }, []);

  // Called when user taps fallback "Play" button
  const handleTapToPlay = useCallback(() => {
    if (playFnRef.current) {
      const fn = playFnRef.current;
      playFnRef.current = null;
      fn();
    }
  }, []);

  // Start auto-play when navigating to a listening question
  useEffect(() => {
    if (!examStarted || !currentQuestion) return;
    if (currentQuestion.section === EXAM_SECTIONS.LISTENING) {
      startListeningAutoPlay(currentQuestion);
    } else {
      clearListeningTimer();
      cancelSpeech();
      setListeningPhase(null);
    }
    return () => { clearListeningTimer(); cancelSpeech(); };
  }, [currentQuestionId, examStarted]);

  // Cleanup on unmount
  useEffect(() => () => { clearListeningTimer(); cancelSpeech(); }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSelectAnswer = useCallback((questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }, []);

  const handleNavigate = useCallback((questionId) => {
    setCurrentQuestionId(questionId);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentQuestionId((id) => Math.max(1, id - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentQuestionId((id) => Math.min(40, id + 1));
  }, []);

  const handleSubmit = useCallback(() => {
    clearListeningTimer();
    cancelSpeech();
    setTimerActive(false);
    setShowResult(true);

    // Calculate scores and save to Supabase
    const timeTakenSec = examStartTimeRef.current
      ? Math.round((Date.now() - examStartTimeRef.current) / 1000)
      : EXAM_DURATION_SECONDS - remainingSeconds;

    const readingCorrect = examQuestions
      .filter((q) => q.section === EXAM_SECTIONS.READING)
      .reduce((acc, q) => (answers[q.id] === q.correctIndex ? acc + 1 : acc), 0);

    const listeningCorrect = examQuestions
      .filter((q) => q.section === EXAM_SECTIONS.LISTENING)
      .reduce((acc, q) => (answers[q.id] === q.correctIndex ? acc + 1 : acc), 0);

    const totalCorrect = readingCorrect + listeningCorrect;
    const totalScore = totalCorrect * POINTS_PER_QUESTION;
    const passed = totalScore >= 120;

    saveExamResult({
      examinerName: examinerName.trim() || 'ຜູ້ສອບ',
      totalScore,
      readingScore: readingCorrect,
      listeningScore: listeningCorrect,
      passed,
      timeTakenSec,
      examSet: assignedSet,
      category: selectedCategory,
    }).catch((err) => console.warn('[DB] saveExamResult failed:', err.message));
  }, [examQuestions, answers, remainingSeconds, examinerName, assignedSet, selectedCategory]);

  const handleCloseResult = useCallback(() => setShowResult(false), []);

  const handleRestart = useCallback(() => {
    clearListeningTimer();
    cancelSpeech();
    const newSet = pickRandomSetNumber();
    setAssignedSet(newSet);
    setSelectedCategory(EXAM_CATEGORIES.ALL);
    setExaminerName('');
    setAnswers({});
    setCurrentQuestionId(1);
    setRemainingSeconds(EXAM_DURATION_SECONDS);
    setTimerActive(false);
    setShowResult(false);
    setExamStarted(false);
    setFontSize(DEFAULT_FONT);
    setListeningPhase(null);
    setListeningPlayCount(0);
  }, []);

  const handleFontDecrease = useCallback(() => setFontSize((f) => Math.max(MIN_FONT, f - 1)), []);
  const handleFontIncrease = useCallback(() => setFontSize((f) => Math.min(MAX_FONT, f + 1)), []);

  // ── Not started: show start screen ───────────────────────────────────────
  if (!examStarted) {
    return (
      <StartScreen
        assignedSet={assignedSet}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        examinerName={examinerName}
        onNameChange={setExaminerName}
        onStart={handleStart}
        onReshuffle={() => setAssignedSet(pickRandomSetNumber())}
      />
    );
  }

  // ── Exam in progress ──────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <Header
        fontSize={fontSize}
        setNumber={assignedSet}
        onFontDecrease={handleFontDecrease}
        onFontIncrease={handleFontIncrease}
        onSubmit={handleSubmit}
      />

      <main className="flex flex-1 overflow-hidden">
        {/* Left: Question Area (~75%) */}
        <section className="flex-1 overflow-hidden bg-white shadow-inner">
          <QuestionArea
            question={currentQuestion}
            selectedAnswer={answers[currentQuestionId]}
            onSelectAnswer={handleSelectAnswer}
            fontSize={fontSize}
            listeningPhase={listeningPhase}
            listeningPlayCount={listeningPlayCount}
            listeningSecondsLeft={listeningSecondsLeft}
            currentSpeaker={currentSpeaker}
            convSegments={convSegments}
            activeSegIdx={activeSegIdx}
            onTapToPlay={handleTapToPlay}
          />
        </section>

        {/* Right: Sidebar (~25%) */}
        <div className="w-64 shrink-0 overflow-hidden">
          <Sidebar
            currentSection={currentSection}
            currentQuestionId={currentQuestionId}
            answers={answers}
            remainingSeconds={remainingSeconds}
            setNumber={assignedSet}
            onNavigate={handleNavigate}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
      </main>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-200">
        <div
          className="h-full bg-[#1a3a6b] transition-all duration-300"
          style={{ width: `${(Object.keys(answers).length / 40) * 100}%` }}
        />
      </div>

      {showResult && (
        <ResultModal
          answers={answers}
          examQuestions={examQuestions}
          setNumber={assignedSet}
          onClose={handleCloseResult}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
