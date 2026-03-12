// EPS-TOPIK Mock Exam — Question Bank (2026 Edition)
// Reading bank: 151 questions  |  Listening bank: 120 questions
// generateExamSet(setNumber) picks 20R + 20L based on set seed

export const EXAM_SECTIONS = {
  READING: 'READING',
  LISTENING: 'LISTENING',
};

export const TOTAL_EXAM_SETS = 999;
export const TOTAL_QUESTIONS = 40;
export const READING_COUNT = 20;
export const LISTENING_COUNT = 20;
export const POINTS_PER_QUESTION = 5;
export const EXAM_DURATION_SECONDS = 40 * 60; // 40 minutes

export const EXAM_CATEGORIES = {
  ALL:         'ALL',
  AGRICULTURE: 'AGRICULTURE',
  INDUSTRY:    'INDUSTRY',
};

// BankIds belonging to each topic category
// Agriculture: R01-R08+R41-R52, L01-L08+L41-L48  |  Industry: R09-R16+R53-R72, L09-L16+L49-L60
const AGRI_R_IDS = new Set(['R01','R02','R03','R04','R05','R06','R07','R08','R41','R42','R43','R44','R45','R46','R47','R48','R49','R50','R51','R52','R96','R97','R98','R99','R100','R132','R133','R137','R138','R139','R140']);
const AGRI_L_IDS = new Set(['L01','L02','L03','L04','L05','L06','L07','L08','L41','L42','L43','L44','L45','L46','L47','L48','L84','L85','L89','L90','L91','L92','L109','L110','L111']);
const IND_R_IDS  = new Set(['R09','R10','R11','R12','R13','R14','R15','R16','R53','R54','R55','R56','R57','R58','R59','R60','R61','R62','R63','R64','R65','R66','R67','R68','R69','R70','R71','R72','R81','R82','R83','R84','R85','R86','R87','R88','R89','R90','R91','R92','R93','R94','R95','R101','R102','R103','R104','R105','R106','R107','R108','R109','R110','R111','R112','R113','R114','R115','R116','R117','R118','R119','R120','R121','R122','R123','R124','R125','R126','R127','R128','R129','R130','R131','R134','R135','R136','R141','R142','R143','R144','R145','R146','R151']);
const IND_L_IDS  = new Set(['L09','L10','L11','L12','L13','L14','L15','L16','L49','L50','L51','L52','L53','L54','L55','L56','L57','L58','L59','L60','L81','L82','L83','L86','L87','L88','L93','L94','L95','L96','L112','L113','L114','L119','L120']);

// Listening auto-play config (simulated — replace with real audio durations)
export const LISTENING_PLAY_TIMES = 2;          // plays per question
export const LISTENING_PLAY_DURATION_SEC = 10;  // simulated length per play (sec)
export const LISTENING_ANSWER_TIME_SEC = 8;      // answer window after final play

//  READING QUESTION BANK 
const readingBank = [
  // ─── AGRICULTURE (Ch45 Crop Cultivation) ──────────────────────────────────
  {
    bankId: 'R01',
    chapter: 45,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '고추를 따고 있습니다.',
    options: ['① 씨앗을 뿌리는 그림', '② 고추를 따는 그림', '③ 모내기를 하는 그림', '④ 거름을 주는 그림'],
    correctIndex: 1,
    explanation: '고추를 따다 = to pick peppers (과수/채소 수확 작업)'
  },
  {
    bankId: 'R02',
    chapter: 45,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '모종을 심기 전에 ___을 뿌립니다. 그러면 땅에 영양분이 많아져서 작물이 튼튼하게 자랄 수 있습니다.',
    options: ['① 씨앗', '② 농약', '③ 거름', '④ 낙엽'],
    correctIndex: 2,
    explanation: '거름(비료)을 뿌려 땅에 영양분을 공급합니다.'
  },
  {
    bankId: 'R03',
    chapter: 45,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '포도에 봉지를 ___농약이 포도에 닿지 않습니다. 그리고 비에 맞지 않고 새가 먹는 것도 방지할 수 있어서 좋습니다.',
    options: ['① 옮기면', '② 뽑으면', '③ 씌우면', '④ 박으면'],
    correctIndex: 2,
    explanation: '봉지를 씌우다 = to cover with a bag; 농약·비·새로부터 과일을 보호합니다.'
  },
  {
    bankId: 'R04',
    chapter: 45,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 같은 것을 고르십시오.',
    questionText: '스마트팜은 생산성을 향상시키기 위하여 정보통신기술을 활용하는 농업 방식입니다. 빅데이터와 인공지능 기술을 활용하여 농작물의 성장 조건을 최적화하기 때문에 노동력을 줄이는 데도 도움을 줍니다. 한국에서는 스마트팜을 활용하여 과일, 쌈채소뿐만 아니라 허브류 재배도 하고 있습니다. 그리고 정부에서는 스마트팜 보급과 발전을 위해 다양한 정책으로 지원하고 있습니다.',
    options: ['① 스마트팜은 정부의 지원 없이 운영되고 있습니다.', '② 스마트팜 방식을 이용하면 사람이 해야 할 일이 많아집니다.', '③ 한국에서는 스마트팜 방식으로 쌈채소를 재배하지 않습니다.', '④ 스마트팜은 농작물의 성장을 위해 인공지능 기술을 활용합니다.'],
    correctIndex: 3,
    explanation: '스마트팜은 AI·빅데이터로 성장 조건을 최적화합니다.'
  },
  // ─── AGRICULTURE (Ch46 Livestock Management) ──────────────────────────────
  {
    bankId: 'R05',
    chapter: 46,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '소입니다.',
    options: ['① 돼지 그림', '② 닭 그림', '③ 소 그림', '④ 오리 그림'],
    correctIndex: 2,
    explanation: '양우(소 farming)의 기본 동물은 소입니다.'
  },
  {
    bankId: 'R06',
    chapter: 46,
    type: 'correct-sentence',
    question: '다음 중 밑줄 친 부분이 맞는 문장을 고르십시오.',
    options: ['① 저울로 무게를 켰어요.', '② 박스에 라벨을 치웠어요.', '③ 바가지로 사료를 발랐어요.', '④ 분무기로 소독약을 뿌렸어요.'],
    correctIndex: 3,
    explanation: '소독약을 뿌리다 = to spray disinfectant. 올바른 동사 사용입니다.'
  },
  {
    bankId: 'R07',
    chapter: 46,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '축사는 일주일에 한 번씩 ___을/를 해야 합니다. 그렇지 않으면 가축들이 병이 날 수 있기 때문입니다.',
    options: ['① 소독', '② 교체', '③ 조립', '④ 이동'],
    correctIndex: 0,
    explanation: '축사 소독은 일주일에 한 번씩 해야 가축 건강을 유지할 수 있습니다.'
  },
  {
    bankId: 'R08',
    chapter: 46,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 같은 것을 고르십시오.',
    questionText: '한국인은 다양한 육류를 즐기며 돼지고기, 닭고기, 소고기 순으로 육류를 소비합니다. 한국인의 육류 소비량은 예전에 비해 크게 늘었습니다. 2023년에 처음으로 1인당 60kg을 넘어섰는데, 이는 1인당 쌀 소비량인 56.4kg보다 많습니다.',
    options: ['① 채식을 하는 한국인이 줄고 있습니다.', '② 한국인은 소고기를 가장 많이 먹습니다.', '③ 한국인은 예전보다 고기를 많이 먹습니다.', '④ 한국인의 1인당 쌀 소비량은 육류 소비량보다 많습니다.'],
    correctIndex: 2,
    explanation: '2023년 1인당 육류 소비량이 60kg을 넘어 예전보다 크게 증가했습니다.'
  },
  // ─── INDUSTRY (Ch37 Machine Processing) ──────────────────────────────────
  {
    bankId: 'R09',
    chapter: 37,
    type: 'word-match',
    question: '다음 단어와 의미가 비슷한 말은 무엇입니까?',
    questionText: '절단하다',
    options: ['① 조립하다', '② 혼합하다', '③ 자르다', '④ 조절하다'],
    correctIndex: 2,
    explanation: '절단하다 = 자르다 (to cut)'
  },
  {
    bankId: 'R10',
    chapter: 37,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '___가 얇은 철판은 판금 가위로 자르면 됩니다. 그러나 두꺼운 철판은 전기 절단기로 잘라야 합니다.',
    options: ['① 두께', '② 깊이', '③ 길이', '④ 무게'],
    correctIndex: 0,
    explanation: '두께가 얇은 철판 → 판금 가위, 두꺼운 철판 → 전기 절단기'
  },
  {
    bankId: 'R11',
    chapter: 37,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '파이프가 움직이면 자르기 힘듭니다. 움직이지 않게 파이프를 ___.',
    options: ['① 깎아야 합니다', '② 고정해야 합니다', '③ 끊어야 합니다', '④ 측정해야 합니다'],
    correctIndex: 1,
    explanation: '바이스 등으로 파이프를 고정해야 절단 작업이 가능합니다.'
  },
  {
    bankId: 'R12',
    chapter: 39,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 같은 것을 고르십시오.',
    questionText: '그라인더로 작업할 때는 큰 상해를 입을 수 있으므로 조심해야 합니다. 그라인더의 날을 교체할 때에는 반드시 전원을 꺼야 합니다. 그리고 바닥에 물체를 놓아두고 절단 작업을 할 때는 그라인더의 날이 안쪽(왼쪽)으로 향하게 잡아야 합니다. 또한 작업 전에는 보안경이나 방진 마스크 등과 같은 보호구를 착용해야 합니다.',
    options: ['① 그라인더의 날은 전원을 켠 상태에서 교체합니다.', '② 그라인더로 작업할 때에는 보안경을 써야 합니다.', '③ 그라인더로 작업할 때에 마스크는 쓰지 않아도 됩니다.', '④ 물체를 바닥에 놓고 작업할 때에는 날이 밖으로 향해야 합니다.'],
    correctIndex: 1,
    explanation: '작업 전 보안경·방진 마스크 등 보호구를 착용해야 합니다.'
  },
  // ─── INDUSTRY (Ch38 Machine Assembly) ────────────────────────────────────
  {
    bankId: 'R13',
    chapter: 38,
    type: 'word-match',
    question: '다음 단어와 의미가 비슷한 말은 무엇입니까?',
    questionText: '스패너',
    options: ['① 안전모', '② 공구', '③ 재료', '④ 사료'],
    correctIndex: 1,
    explanation: '스패너는 공구(work tool)의 한 종류입니다.'
  },
  {
    bankId: 'R14',
    chapter: 38,
    type: 'correct-sentence',
    question: '다음 중 밑줄 친 부분이 맞는 문장을 고르십시오.',
    options: ['① 나사를 스패너로 잠갔어요.', '② 드라이버로 나사를 돌렸어요.', '③ 볼트를 펜치로 뿌렸어요.', '④ 렌치로 나사못을 염색했어요.'],
    correctIndex: 1,
    explanation: '드라이버로 나사를 돌리다 = correct usage (나사 조이기)'
  },
  {
    bankId: 'R15',
    chapter: 40,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '___이 나왔습니다. 제품의 생산을 중지하고 원인을 찾아야 합니다.',
    options: ['① 소모품', '② 신제품', '③ 생산품', '④ 불량품'],
    correctIndex: 3,
    explanation: '불량품이 발생하면 생산을 중지하고 원인을 파악해야 합니다.'
  },
  {
    bankId: 'R16',
    chapter: 40,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 같은 것을 고르십시오.',
    questionText: '세계 각국은 화석 연료의 사용으로 인한 환경 파괴와 기후 변화에 대응하기 위하여 친환경 에너지 개발에 힘쓰고 있습니다. 친환경 에너지는 초기 설치 비용이 높아 경제적으로 부담이 될 수 있지만, 운영 비용이 낮고 무제한으로 사용할 수 있다는 장점이 있습니다. 또한 화석 연료의 고갈을 막고 온실가스를 줄여 급격한 기후 변화에 따른 재난에 대비할 수 있게 해 줍니다.',
    options: ['① 세계 각국은 화석 연료 개발에 힘쓰고 있습니다.', '② 화석 연료 사용으로 기후 변화에 대비할 수 있습니다.', '③ 친환경 에너지 사용으로 온실가스를 줄일 수 있습니다.', '④ 친환경 에너지는 설치에 대한 경제적 부담이 적습니다.'],
    correctIndex: 2,
    explanation: '친환경 에너지는 온실가스를 줄이고 기후 변화 재난에 대비합니다.'
  },
  // ─── SAFETY (Ch53-56) ─────────────────────────────────────────────────────
  {
    bankId: 'R17',
    chapter: 53,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '우리 회사에는 작업장 밖에도 금연 표지가 붙어 있습니다. 작업장 밖에서도 담배를 ___ 안 됩니다.',
    options: ['① 바꾸면', '② 옮기면', '③ 피우면', '④ 만들면'],
    correctIndex: 2,
    explanation: '금연 표지 = 담배를 피워서는 안 됨'
  },
  {
    bankId: 'R18',
    chapter: 54,
    type: 'correct-sentence',
    question: '다음 중 밑줄 친 부분이 맞는 문장을 고르십시오.',
    options: ['① 안전을 위해 수칙을 지키세요.', '② 이상이 있으면 기계를 예방하세요.', '③ 소음이 심하면 귀마개를 켜세요.', '④ 작업 전에 환기 장치를 착용하세요.'],
    correctIndex: 0,
    explanation: '수칙을 지키다 = to follow safety regulations (올바른 표현)'
  },
  {
    bankId: 'R19',
    chapter: 55,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '무거운 물건을 옮길 때는 안전화를 ___ 안전사고를 예방할 수 있습니다.',
    options: ['① 닦아야', '② 받아야', '③ 잡아야', '④ 신어야'],
    correctIndex: 3,
    explanation: '안전화를 신다 = to wear safety shoes; 중량물 작업 시 필수 보호구'
  },
  {
    bankId: 'R20',
    chapter: 56,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 같은 것을 고르십시오.',
    questionText: '화재 예방 교육 안내: 다음 주에 화재 예방 교육이 있습니다. 신입 사원 여러분은 반드시 참석해 주십시오. 일시: 9월 23일(월) 10:00~11:00 / 장소: 회의실(2층 사무실 옆) / 대상: 신입 사원',
    options: ['① 화재 예방 교육은 주말에 있습니다.', '② 화재 예방 교육은 11시에 시작합니다.', '③ 신입 사원은 교육을 듣지 않아도 됩니다.', '④ 2층 회의실에서 화재 예방 교육을 합니다.'],
    correctIndex: 3,
    explanation: '장소: 회의실(2층 사무실 옆) → 2층 회의실에서 교육합니다.'
  },
  // ─── OFFICIAL SAMPLE (20문항 reading — text-based) ─────────────────────────
  {
    bankId: 'R21',
    chapter: 99,
    type: 'correct-sentence',
    question: '다음 중 밑줄 친 부분이 맞는 것은 무엇입니까?',
    options: ['① 집을 작아요.', '② 딸기가 먹어요.', '③ 회사에 다녀요.', '④ 겨울에서 추워요.'],
    correctIndex: 2,
    explanation: '회사에 다니다 → 회사에 다녀요 (조사 에 + 다니다 활용 정확)'
  },
  {
    bankId: 'R22',
    chapter: 99,
    type: 'correct-sentence',
    question: '다음 중 밑줄 친 부분이 맞는 것은 무엇입니까?',
    options: ['① 퇴근할 때 문을 달으세요.', '② 친구한테서 선물을 받았어요.', '③ 심심하면 한국 노래를 듣어요.', '④ 오늘 시내에서 많이 걷었어요.'],
    correctIndex: 1,
    explanation: '친구한테서 선물을 받다 = 친구에게서 받다 (올바른 조사 사용)'
  },
  {
    bankId: 'R23',
    chapter: 99,
    type: 'word-match',
    question: '다음 단어와 관계있는 것은 무엇입니까?',
    questionText: '복장',
    options: ['① 컴퓨터', '② 작업복', '③ 비빔밥', '④ 기차표'],
    correctIndex: 1,
    explanation: '복장 = 옷차림, 입는 것 → 작업복(work clothes)과 관계있음'
  },
  {
    bankId: 'R24',
    chapter: 99,
    type: 'word-match',
    question: '다음 단어와 관계있는 것은 무엇입니까?',
    questionText: '작업장',
    options: ['① 근로자가 일하는 곳이에요.', '② 근로자가 거주하는 곳이에요.', '③ 근로자가 운동하는 곳이에요.', '④ 근로자가 상담하는 곳이에요.'],
    correctIndex: 0,
    explanation: '작업장(workplace) = 근로자가 일하는 곳'
  },
  {
    bankId: 'R25',
    chapter: 99,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '한국어를 배우고 싶지만 학원에 갈 시간이 없습니다. 그래서 퇴근 후에 인터넷 강의를 ___ 한국어를 공부하고 있습니다.',
    options: ['① 듣느라고', '② 들으려고', '③ 들으면서', '④ 듣자마자'],
    correctIndex: 2,
    explanation: '-면서 = 두 동작을 동시에 할 때 (강의를 들으면서 공부한다)'
  },
  {
    bankId: 'R26',
    chapter: 99,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '오늘은 다른 날보다 길이 많이 막힙니다. ___ 가지 않으면 회사에 늦을 것 같습니다.',
    options: ['① 조심하게', '② 조심해서', '③ 서두르게', '④ 서둘러서'],
    correctIndex: 3,
    explanation: '서둘러서 = 서두르다 + 아서/어서 (이유), 빨리 가지 않으면 늦는다는 의미'
  },
  {
    bankId: 'R27',
    chapter: 99,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '오늘은 날씨가 너무 덥습니다. 집에 오자마자 선풍기를 ___ 시원한 물을 마셨습니다.',
    options: ['① 틀면', '② 틀고', '③ 틀려면', '④ 틀려고'],
    correctIndex: 1,
    explanation: '-고 = 두 행동을 순차적으로 연결 (선풍기를 틀고 나서 물을 마셨다)'
  },
  {
    bankId: 'R28',
    chapter: 99,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '못에 찔렸을 때는 상처가 가벼워도 바로 소독을 해야 합니다. 그리고 병원에 가서 진료를 받고 주사를 ___.',
    options: ['① 맞는 것이 좋습니다', '② 놓는 것이 좋습니다', '③ 맞지 않도록 합니다', '④ 놓지 않도록 합니다'],
    correctIndex: 0,
    explanation: '주사를 맞다 (to get an injection) = 환자의 입장에서 맞는 표현'
  },
  {
    bankId: 'R29',
    chapter: 99,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '어두운 곳에서 작업할 때는 가시성이 높은 ___. 이것을 입으면 멀리서도 잘 보여 사고를 막을 수 있습니다.',
    options: ['① 반사 조끼를 착용해야 합니다', '② 보호 장갑을 구매해야 합니다', '③ 비상 계단을 이용해야 합니다', '④ 환기 장치를 작동해야 합니다'],
    correctIndex: 0,
    explanation: '반사 조끼(reflective vest) = 어두운 환경에서 가시성을 높이는 안전 장비'
  },
  {
    bankId: 'R30',
    chapter: 99,
    type: 'word-definition',
    question: '다음 설명에 알맞은 어휘를 고르십시오.',
    questionText: '손에 쥐고 철사를 끊거나 구부릴 때 쓰는 도구입니다. 전선이나 작은 부품을 잡을 때도 사용합니다.',
    options: ['① 토치', '② 펜치', '③ 쇠톱', '④ 망치'],
    correctIndex: 1,
    explanation: '펜치(pliers) = 철사 자르기, 전선·부품 잡기에 사용하는 공구'
  },
  {
    bankId: 'R31',
    chapter: 99,
    type: 'topic',
    question: '다음 글을 읽고 무엇에 대한 글인지 고르십시오.',
    questionText: '한국 사람들은 계절마다 즐겨 먹는 음식이 있습니다. 여름에는 차갑고 시원한 냉면, 콩국수, 팥빙수 등을 많이 먹습니다. 겨울에는 뜨거운 국이나 따뜻한 팥죽, 군고구마, 호떡 등을 자주 먹습니다.',
    options: ['① 계절 음식', '② 음식 재료', '③ 조리 방법', '④ 조리 시기'],
    correctIndex: 0,
    explanation: '계절마다 즐겨 먹는 음식 → 계절 음식에 대한 글'
  },
  {
    bankId: 'R32',
    chapter: 99,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 같은 것을 고르십시오.',
    questionText: '한국에서 일하는 외국인 근로자는 4대 사회보험 혜택을 받습니다. 4대 사회보험 중 산재보험은 사업주만 가입하면 되지만 국민연금, 건강보험, 고용보험은 사업주와 근로자 모두 반드시 가입해야 합니다. 외국인 근로자는 질병, 부상, 상해, 실업 등이 발생하였을 때 가입한 4대 보험의 보험금을 받을 수 있습니다.',
    options: ['① 사업주는 4대 사회보험에 모두 가입해야 합니다.', '② 산재보험은 근로자와 사업주가 모두 가입해야 합니다.', '③ 사업주는 사고가 발생하면 보험금을 받을 수 있습니다.', '④ 근로자는 가입하고 싶은 보험을 선택하여 가입할 수 있습니다.'],
    correctIndex: 0,
    explanation: '국민연금·건강보험·고용보험은 사업주와 근로자 모두 가입 → 사업주는 4대 보험 모두 가입 대상'
  },
  // ─── OFFICIAL SAMPLE (일상생활 10문항 reading) ─────────────────────────────
  {
    bankId: 'R33',
    chapter: 99,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '___거지',
    options: ['① 설', '② 물', '③ 벌', '④ 탈'],
    correctIndex: 0,
    explanation: '설 + 거지 = 설거지 (dishwashing). 나머지는 단어가 되지 않음'
  },
  {
    bankId: 'R34',
    chapter: 99,
    type: 'correct-sentence',
    question: '다음 중 밑줄 친 부분이 맞는 것은 무엇입니까?',
    options: ['① 바지가 교환해 주세요.', '② 카드로 계산해 주세요.', '③ 딸기하고 씻어 주세요.', '④ 우리 집에게 와 주세요.'],
    correctIndex: 1,
    explanation: '카드로 계산하다 = 조사 로(수단) 사용 올바른 문장'
  },
  {
    bankId: 'R35',
    chapter: 99,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '쓰지 않는 물건은 ___를 통해서 사고팔 수 있습니다.',
    options: ['① 할인 행사', '② 대형 마트', '③ 중고 거래', '④ 주말 특가'],
    correctIndex: 2,
    explanation: '중고 거래(secondhand trading) = 쓰지 않는 물건을 사고파는 방법'
  },
  {
    bankId: 'R36',
    chapter: 99,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '이사할 집을 구하려고 ___에 갔습니다.',
    options: ['① 경기장', '② 관광지', '③ 부동산', '④ 백화점'],
    correctIndex: 2,
    explanation: '부동산(real estate agency) = 집을 구하러 가는 곳'
  },
  {
    bankId: 'R37',
    chapter: 99,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '고속버스의 주요 노선들은 심야 시간에도 ___.',
    options: ['① 운행합니다', '② 운전합니다', '③ 운동합니다', '④ 운반합니다'],
    correctIndex: 0,
    explanation: '노선을 운행하다(to operate a route) = 버스·기차에 쓰는 올바른 표현'
  },
  {
    bankId: 'R38',
    chapter: 99,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '인터넷으로 은행 업무를 보는 사람들이 ___ 늘어나고 있습니다.',
    options: ['① 점차', '② 얼른', '③ 항상', '④ 멀리'],
    correctIndex: 0,
    explanation: '점차(gradually) = 시간이 지나면서 서서히 증가함을 나타내는 부사'
  },
  {
    bankId: 'R39',
    chapter: 99,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 같은 것을 고르십시오.',
    questionText: '아파트나 원룸과 같은 공동 주택에서는 이웃에게 피해를 주지 않도록 주의해야 합니다. 집 안에서 뛰지 말고, 늦은 밤이나 이른 아침에는 세탁기를 사용해서는 안 됩니다. 큰 소리로 음악을 틀어서도 안 됩니다. 화장실에서 담배를 피우면 연기가 이웃집으로 들어갈 수 있으니 특히 조심해야 합니다.',
    options: ['① 집 안 화장실에서는 자유롭게 담배를 피울 수 있습니다.', '② 아파트는 일반 주택보다 소음에 신경 쓸 일이 적습니다.', '③ 집 안에서 어린아이들이 뛰는 것은 문제가 되지 않습니다.', '④ 다른 사람이 자는 시간에는 세탁기 사용을 피해야 합니다.'],
    correctIndex: 3,
    explanation: '늦은 밤이나 이른 아침에는 세탁기를 사용해서는 안 됩니다 → 다른 사람이 자는 시간에는 사용 금지'
  },
  {
    bankId: 'R40',
    chapter: 99,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '월급 지급 방법: ___',
    options: ['① 가족 모임', '② 생일 선물', '③ 출근 시간', '④ 통장 입금'],
    correctIndex: 3,
    explanation: '통장 입금(bank transfer) = 일반적인 급여 지급 방법'
  },
  // ─── NEW AGRICULTURE (Book 2 — 2026 Prediction) ─────────────────────────
  {
    bankId: 'R41',
    chapter: 45,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '비닐하우스에서 방울토마토를 수확하고 있습니다.',
    options: ['① 논에서 모내기를 하는 그림', '② 비닐하우스에서 작물을 수확하는 그림', '③ 과수원에서 사과를 따는 그림', '④ 밭에서 배추를 뽑는 그림'],
    correctIndex: 1,
    explanation: '비닐하우스에서 방울토마토를 수확 = 시설 원예 수확 그림'
  },
  {
    bankId: 'R42',
    chapter: 45,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '밭에 잡초가 많이 자라면 작물의 성장에 방해가 됩니다. 그래서 주기적으로 잡초를 ___ 합니다.',
    options: ['① 수확해야', '② 심어야', '③ 제거해야', '④ 뿌려야'],
    correctIndex: 2,
    explanation: '잡초를 제거하다 = to remove weeds; 잡초 방제는 작물 성장 관리의 핵심'
  },
  {
    bankId: 'R43',
    chapter: 45,
    type: 'correct-sentence',
    question: '다음 중 밑줄 친 부분이 맞는 문장을 고르십시오.',
    options: ['① 과일에 봉지를 갈았어요.', '② 모종에 비닐을 씌웠어요.', '③ 씨앗을 낫으로 뿌렸어요.', '④ 거름을 트랙터로 뽑았어요.'],
    correctIndex: 1,
    explanation: '비닐을 씌우다 = to cover with plastic film; 모종 보호에 사용하는 올바른 표현'
  },
  {
    bankId: 'R44',
    chapter: 45,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 같은 것을 고르십시오.',
    questionText: '시설 재배는 비닐이나 유리로 만든 하우스 안에서 작물을 기르는 방식입니다. 외부 온도나 날씨의 영향을 적게 받기 때문에 계절에 관계없이 채소와 과일을 생산할 수 있습니다. 하지만 초기 설치 비용이 많이 들고, 하우스 안의 온도와 습도를 꾸준히 관리해야 합니다.',
    options: ['① 시설 재배는 초기 비용이 적게 듭니다.', '② 시설 재배는 계절에 상관없이 작물을 생산할 수 있습니다.', '③ 시설 재배 하우스 안은 습도 관리가 필요 없습니다.', '④ 시설 재배는 야외 재배보다 수확량이 반드시 많습니다.'],
    correctIndex: 1,
    explanation: '계절에 관계없이 채소와 과일 생산 가능 = 시설 재배의 장점'
  },
  {
    bankId: 'R45',
    chapter: 45,
    type: 'word-match',
    question: '다음 단어와 의미가 비슷한 말은 무엇입니까?',
    questionText: '수확하다',
    options: ['① 갈다', '② 심다', '③ 거두다', '④ 뿌리다'],
    correctIndex: 2,
    explanation: '수확하다 = 거두다 (to harvest/gather)'
  },
  {
    bankId: 'R46',
    chapter: 45,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '과일이나 채소의 신선도를 오래 유지하려면 ___ 보관해야 합니다.',
    options: ['① 햇빛이 잘 드는 곳에', '② 온도가 높은 곳에', '③ 서늘하고 어두운 곳에', '④ 물기가 많은 곳에'],
    correctIndex: 2,
    explanation: '신선도 유지 = 서늘하고 어두운 곳에 보관 (냉장 보관의 기본 원리)'
  },
  {
    bankId: 'R47',
    chapter: 45,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '농약을 살포할 때는 ___을 착용해야 합니다. 농약은 피부나 눈에 닿으면 위험합니다.',
    options: ['① 방진 마스크와 보안경', '② 안전화와 안전모', '③ 용접 장갑과 앞치마', '④ 이어마개와 방진복'],
    correctIndex: 0,
    explanation: '농약 살포 시 방진 마스크(흡입 방지) + 보안경(눈 보호) 착용 필수'
  },
  {
    bankId: 'R48',
    chapter: 45,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 같은 것을 고르십시오.',
    questionText: '봄철 모종 재배 안내: 3월 중순부터 모종을 심기 시작합니다. 모종을 심기 전에 밭을 충분히 갈아야 합니다. 모종을 심은 후 첫 주에는 하루에 두 번씩 물을 주세요.',
    options: ['① 모종은 4월부터 심기 시작합니다.', '② 모종을 심기 전에 밭을 갈지 않아도 됩니다.', '③ 모종을 심은 후 첫 주에는 하루에 한 번 물을 줍니다.', '④ 모종을 심은 후 첫 주에는 하루에 두 번 물을 줍니다.'],
    correctIndex: 3,
    explanation: '첫 주는 하루에 두 번씩 물을 주세요 = 정답'
  },
  // ─── NEW LIVESTOCK (Book 2 — 2026 Prediction) ────────────────────────────
  {
    bankId: 'R49',
    chapter: 46,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '돼지 축사를 물로 청소하고 있습니다.',
    options: ['① 가축에게 사료를 주는 그림', '② 축사를 물청소하는 그림', '③ 돼지에게 소독약을 뿌리는 그림', '④ 저울로 돼지 무게를 재는 그림'],
    correctIndex: 1,
    explanation: '축사 물청소 = 고압 호스로 바닥을 세척하는 작업'
  },
  {
    bankId: 'R50',
    chapter: 46,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '가축을 건강하게 키우려면 영양이 균형 잡힌 ___를 골라 먹여야 합니다. 성장 단계에 따라 필요한 영양소가 다릅니다.',
    options: ['① 사료', '② 거름', '③ 비료', '④ 농약'],
    correctIndex: 0,
    explanation: '사료(feed) = 가축에게 먹이는 음식물'
  },
  {
    bankId: 'R51',
    chapter: 46,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '축산 농가에서는 가축 질병 예방을 위해 정기적으로 ___을 실시합니다. 외부인 출입도 제한하고 소독 게이트를 운영합니다.',
    options: ['① 이식', '② 방역', '③ 설치', '④ 이동'],
    correctIndex: 1,
    explanation: '방역(disease prevention) = 가축 전염병 예방을 위한 소독 및 출입 통제'
  },
  {
    bankId: 'R52',
    chapter: 46,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 같은 것을 고르십시오.',
    questionText: '구제역은 소, 돼지, 양 등 발굽이 갈라진 동물에게 발생하는 전염병으로 빠르게 퍼집니다. 구제역이 발생하면 즉시 동물을 격리하고 관련 기관에 신고해야 합니다. 치료보다 예방이 중요하므로 정기적인 예방접종을 실시해야 합니다.',
    options: ['① 구제역은 발굽이 없는 동물에게도 발생합니다.', '② 구제역이 발생해도 격리는 필요하지 않습니다.', '③ 구제역이 발생하면 관련 기관에 신고해야 합니다.', '④ 구제역은 예방보다 치료가 더 중요합니다.'],
    correctIndex: 2,
    explanation: '구제역 발생 시 즉시 격리하고 관련 기관에 신고해야 합니다.'
  },
  // ─── NEW INDUSTRY (Book 2 — 2026 Prediction) ────────────────────────────
  {
    bankId: 'R53',
    chapter: 37,
    type: 'word-match',
    question: '다음 단어와 의미가 비슷한 말은 무엇입니까?',
    questionText: '이동하다',
    options: ['① 고정하다', '② 누르다', '③ 옮기다', '④ 부수다'],
    correctIndex: 2,
    explanation: '이동하다 = 옮기다 (to move/transfer)'
  },
  {
    bankId: 'R54',
    chapter: 38,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '프레스 기계로 작업할 때는 손이 끼일 수 있습니다. 안전을 위해 손 대신 ___를 이용하여 제품을 넣고 꺼내야 합니다.',
    options: ['① 집게', '② 저울', '③ 스패너', '④ 그라인더'],
    correctIndex: 0,
    explanation: '집게(tongs) = 프레스 작업 시 손 보호를 위해 부품을 넣고 꺼낼 때 사용'
  },
  {
    bankId: 'R55',
    chapter: 38,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '부품을 조립하기 전에 ___를 보고 부품의 위치와 규격을 반드시 확인해야 합니다.',
    options: ['① 도면', '② 냉각수', '③ 사료', '④ 출고서'],
    correctIndex: 0,
    explanation: '도면(blueprint) = 부품 위치·규격이 그려진 설계 문서'
  },
  {
    bankId: 'R56',
    chapter: 38,
    type: 'correct-sentence',
    question: '다음 중 밑줄 친 부분이 맞는 문장을 고르십시오.',
    options: ['① 나사를 망치로 조였어요.', '② 나사를 드라이버로 조였어요.', '③ 볼트를 펜치로 끊었어요.', '④ 너트를 드릴로 풀었어요.'],
    correctIndex: 1,
    explanation: '나사를 드라이버로 조이다 = 올바른 공구 사용 표현'
  },
  {
    bankId: 'R57',
    chapter: 40,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '완성된 제품에 흠집이나 결함이 없는지 ___를 합니다. 기준에 맞지 않으면 불량품으로 처리합니다.',
    options: ['① 충전', '② 가공', '③ 검사', '④ 조달'],
    correctIndex: 2,
    explanation: '검사(inspection) = 품질 기준 충족 여부 확인 작업'
  },
  {
    bankId: 'R58',
    chapter: 40,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 같은 것을 고르십시오.',
    questionText: '제품을 출하하기 전에 반드시 품질 검사를 합니다. 검사를 통해 규격이 맞는지, 외관에 흠집이 없는지 확인합니다. 기준에 맞지 않는 불량품은 수정하거나 폐기합니다. 철저한 품질 관리가 고객 불만을 줄이는 데 도움이 됩니다.',
    options: ['① 불량품은 무조건 폐기해야 합니다.', '② 품질 검사를 하지 않아도 출하할 수 있습니다.', '③ 품질 관리를 잘하면 고객 불만을 줄일 수 있습니다.', '④ 품질 기준에 맞으면 검사를 하지 않아도 됩니다.'],
    correctIndex: 2,
    explanation: '철저한 품질 관리 → 고객 불만 감소'
  },
  {
    bankId: 'R59',
    chapter: 39,
    type: 'word-definition',
    question: '다음 설명에 알맞은 어휘를 고르십시오.',
    questionText: '제품을 포장하고 라벨을 붙인 다음 고객에게 물건을 보내는 것입니다.',
    options: ['① 조립', '② 가공', '③ 출하', '④ 제조'],
    correctIndex: 2,
    explanation: '출하(shipment/dispatch) = 포장 완료 후 고객에게 제품을 보내는 과정'
  },
  {
    bankId: 'R60',
    chapter: 38,
    type: 'topic',
    question: '다음 글을 읽고 무엇에 대한 글인지 고르십시오.',
    questionText: '이 기계는 작동 중에 건드리면 안 됩니다. 매일 작업 전에 기름을 넣어야 하고, 일주일에 한 번은 필터를 청소해야 합니다. 이상한 소리가 나면 즉시 작동을 멈추고 관리자에게 알려야 합니다.',
    options: ['① 기계 유지 관리 방법', '② 부품 조립 순서', '③ 제품 설계 방법', '④ 작업 결과 보고'],
    correctIndex: 0,
    explanation: '기름 교환, 필터 청소, 이상 시 보고 = 기계 유지 관리 방법에 대한 설명'
  },
  // ─── NEW SAFETY / HR (Book 1 & 2 — 2026 Prediction) ─────────────────────
  {
    bankId: 'R61',
    chapter: 53,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '작업장에서 화학물질을 다룰 때는 반드시 ___를 확인해야 합니다. 여기에는 물질의 위험성과 올바른 취급 방법이 나와 있습니다.',
    options: ['① MSDS', '② GPS', '③ QR코드', '④ 납기일'],
    correctIndex: 0,
    explanation: 'MSDS(Material Safety Data Sheet) = 화학물질안전보건자료'
  },
  {
    bankId: 'R62',
    chapter: 56,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '작업 중에 다쳤을 때는 ___ 보험을 통해 치료비를 지원받을 수 있습니다.',
    options: ['① 국민연금', '② 산재', '③ 실업', '④ 화재'],
    correctIndex: 1,
    explanation: '산재보험(industrial accident insurance) = 작업 중 부상·질병에 대한 보상 보험'
  },
  {
    bankId: 'R63',
    chapter: 53,
    type: 'correct-sentence',
    question: '다음 중 밑줄 친 부분이 맞는 문장을 고르십시오.',
    options: ['① 소음이 심하면 귀마개를 꺼내세요.', '② 연기가 나면 환기 장치를 끄세요.', '③ 높은 곳에서 작업할 때 안전벨트를 착용하세요.', '④ 화재 발생 시 엘리베이터로 대피하세요.'],
    correctIndex: 2,
    explanation: '높은 곳 작업 시 안전벨트 착용 = 올바른 안전 규칙; 귀마개는 끼는 것, 환기는 켜야 함, 화재 시 계단 사용'
  },
  {
    bankId: 'R64',
    chapter: 55,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '정해진 근무 시간을 초과하여 일하면 법으로 정해진 ___을 별도로 받아야 합니다.',
    options: ['① 퇴직금', '② 야간 수당', '③ 연장 수당', '④ 상여금'],
    correctIndex: 2,
    explanation: '연장 수당(overtime pay) = 법정 근무 시간 초과 시 지급하는 추가 임금'
  },
  {
    bankId: 'R65',
    chapter: 55,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 같은 것을 고르십시오.',
    questionText: '연차 휴가 사용 안내: 입사 1년 미만 근로자는 매월 1일의 연차가 발생합니다. 1년 이상 근무한 근로자는 1년에 15일의 연차 휴가를 받습니다. 연차 휴가는 근로자가 원하는 날에 사용할 수 있으나, 회사의 업무 상황에 따라 날짜가 조정될 수 있습니다.',
    options: ['① 입사 1년 미만이면 연차 휴가가 없습니다.', '② 1년 이상 근무 시 1년에 20일의 연차 휴가를 받습니다.', '③ 연차는 회사가 지정한 날에만 사용할 수 있습니다.', '④ 입사 초기에는 매달 1일씩 연차가 생깁니다.'],
    correctIndex: 3,
    explanation: '입사 1년 미만 → 매월 1일의 연차 발생 = 정답'
  },
  {
    bankId: 'R66',
    chapter: 54,
    type: 'word-match',
    question: '다음 단어와 의미가 비슷한 말은 무엇입니까?',
    questionText: '임금',
    options: ['① 월급', '② 야근', '③ 서류', '④ 임무'],
    correctIndex: 0,
    explanation: '임금 = 급여 = 월급 (wages/salary)'
  },
  {
    bankId: 'R67',
    chapter: 54,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '고용주는 매달 근로자에게 ___를 발행해야 합니다. 이 문서를 보면 기본급, 수당, 공제 내역을 확인할 수 있습니다.',
    options: ['① 근로계약서', '② 임금명세서', '③ 출입국기록표', '④ 보험증서'],
    correctIndex: 1,
    explanation: '임금명세서(pay slip) = 월급 내역을 알 수 있는 문서'
  },
  {
    bankId: 'R68',
    chapter: 54,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 같은 것을 고르십시오.',
    questionText: '근로계약서에는 근무 장소, 근무 시간, 임금, 담당 업무, 계약 기간 등이 명시됩니다. 한국어나 모국어로 작성된 계약서를 받을 수 있으며, 서명하기 전에 내용을 꼼꼼히 확인해야 합니다. 근로계약서는 두 부를 작성하여 사업주와 근로자가 각각 한 부씩 보관합니다.',
    options: ['① 근로계약서는 한국어로만 작성해야 합니다.', '② 근로계약서는 사업주만 한 부 보관합니다.', '③ 근로계약서에 임금 정보는 포함되지 않습니다.', '④ 서명하기 전에 근로계약서 내용을 확인해야 합니다.'],
    correctIndex: 3,
    explanation: '서명 전 내용 꼼꼼히 확인 = 정답'
  },
  {
    bankId: 'R69',
    chapter: 55,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '높은 곳에서 아래로 떨어지는 ___사고는 산업 현장에서 사망률이 높은 위험한 사고입니다.',
    options: ['① 협착', '② 전도', '③ 추락', '④ 폭발'],
    correctIndex: 2,
    explanation: '추락 사고(fall accident) = 높은 곳에서 아래로 떨어지는 사고'
  },
  {
    bankId: 'R70',
    chapter: 56,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 같은 것을 고르십시오.',
    questionText: '화재가 발생하면 빠르게 대피해야 합니다. 연기가 날 때는 몸을 낮추고 코와 입을 막은 채 이동해야 합니다. 엘리베이터는 절대 이용하지 말고 계단으로 대피해야 합니다. 대피 후에는 지정된 비상 집결지에 모여 인원을 확인합니다.',
    options: ['① 화재 시 엘리베이터로 신속히 대피해야 합니다.', '② 연기가 날 때는 몸을 높이 세우고 이동해야 합니다.', '③ 화재 시 비상 집결지에서 인원을 확인해야 합니다.', '④ 연기가 날 때는 코와 입을 열어야 합니다.'],
    correctIndex: 2,
    explanation: '대피 후 비상 집결지에서 인원 확인 = 올바른 화재 대피 절차'
  },
  {
    bankId: 'R71',
    chapter: 53,
    type: 'word-definition',
    question: '다음 설명에 알맞은 어휘를 고르십시오.',
    questionText: '눈을 보호하기 위해 착용하는 투명한 보호 기구로, 화학물질이나 비산물이 눈에 들어가지 않도록 합니다.',
    options: ['① 방진 마스크', '② 이어마개', '③ 안전모', '④ 보안경'],
    correctIndex: 3,
    explanation: '보안경(safety goggles) = 눈 보호용 투명 안전 기구'
  },
  {
    bankId: 'R72',
    chapter: 55,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '지게차 주변에서 작업할 때는 ___이 쏟아질 수 있으니 충분한 거리를 유지해야 합니다.',
    options: ['① 적재 화물', '② 연료', '③ 배기가스', '④ 윤활유'],
    correctIndex: 0,
    explanation: '지게차의 적재 화물(loaded cargo) 낙하 위험 = 안전 거리 유지 필요'
  },
  // ─── DAILY LIFE (Book 1 — 2026 Prediction) ──────────────────────────────
  {
    bankId: 'R73',
    chapter: 20,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '몸이 아플 때 간단한 증상이면 ___에 가서 약사와 상담하고 약을 살 수 있습니다.',
    options: ['① 약국', '② 공항', '③ 우체국', '④ 도서관'],
    correctIndex: 0,
    explanation: '약국(pharmacy) = 가벼운 증상 시 약을 구입하는 곳'
  },
  {
    bankId: 'R74',
    chapter: 20,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '한국에서 외국인 근로자로 취업하면 입국 후 90일 이내에 관할 출입국 관리소에서 ___을 발급받아야 합니다.',
    options: ['① 외국인등록증', '② 여권사진', '③ 건강확인서', '④ 통장사본'],
    correctIndex: 0,
    explanation: '외국인등록증(alien registration card) = 한국 체류 외국인의 신분증'
  },
  {
    bankId: 'R75',
    chapter: 20,
    type: 'correct-sentence',
    question: '다음 중 밑줄 친 부분이 맞는 문장을 고르십시오.',
    options: ['① 오늘은 회사에 걸어서 왔어요.', '② 버스를 타러 지하철역에 갔어요.', '③ 어제는 지하철로 타서 왔어요.', '④ 자전거를 버스로 출근했어요.'],
    correctIndex: 0,
    explanation: '걸어서 오다 = 도보로 이동하다 (올바른 표현)'
  },
  {
    bankId: 'R76',
    chapter: 20,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '한국의 설 명절에는 가족들이 한자리에 모여 차례를 지내고 ___를 입는 경우가 많습니다.',
    options: ['① 작업복', '② 한복', '③ 운동복', '④ 수영복'],
    correctIndex: 1,
    explanation: '한복(hanbok) = 한국 전통 의상; 설 명절에 착용'
  },
  {
    bankId: 'R77',
    chapter: 20,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '마트에서 물건값이 잘못 계산된 것 같으면 계산대 ___에게 말해서 확인해야 합니다.',
    options: ['① 관리자', '② 직원', '③ 손님', '④ 경비원'],
    correctIndex: 1,
    explanation: '계산 오류 시 계산대 직원에게 말해서 확인합니다.'
  },
  {
    bankId: 'R78',
    chapter: 20,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 같은 것을 고르십시오.',
    questionText: '한국에는 버스, 지하철, 택시 등 다양한 대중교통이 있습니다. 교통카드를 이용하면 현금보다 요금이 할인됩니다. 지하철은 막차 시간이 있으므로 미리 확인해야 합니다. 택시는 기본 요금이 있고 거리가 늘어날수록 요금이 추가됩니다.',
    options: ['① 교통카드를 사용하면 요금이 더 비쌉니다.', '② 지하철은 24시간 운행합니다.', '③ 택시는 거리가 늘어날수록 요금이 올라갑니다.', '④ 버스는 현금으로만 탈 수 있습니다.'],
    correctIndex: 2,
    explanation: '택시는 거리가 늘어날수록 요금이 추가됩니다 = 정답'
  },
  {
    bankId: 'R79',
    chapter: 20,
    type: 'topic',
    question: '다음 글을 읽고 무엇에 대한 글인지 고르십시오.',
    questionText: '음식물 쓰레기는 전용 봉투에 담아 버려야 하고, 재활용 쓰레기는 분리수거함에 넣어야 합니다. 쓰레기는 정해진 요일과 시간에만 버릴 수 있습니다. 큰 가구나 가전제품은 따로 신청하여 버려야 합니다.',
    options: ['① 아파트 쓰레기 처리 방법', '② 아파트 건물 구조', '③ 환기 장치 작동법', '④ 가구 구입 방법'],
    correctIndex: 0,
    explanation: '분리수거, 전용봉투, 수거 요일, 대형폐기물 신청 = 쓰레기 처리 방법'
  },
  {
    bankId: 'R80',
    chapter: 21,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 같은 것을 고르십시오.',
    questionText: '고용허가제 외국인 근로자는 사업장을 마음대로 바꿀 수 없습니다. 사업주가 계약 연장을 거부하거나, 사업장 폐업·휴업 등 불가피한 사정이 있을 때만 사업장을 변경할 수 있습니다. 사업장 변경은 고용센터에 신청하며 허가된 횟수 안에서만 가능합니다.',
    options: ['① 외국인 근로자는 원하면 언제든지 사업장을 바꿀 수 있습니다.', '② 사업장 변경 횟수에는 제한이 없습니다.', '③ 사업장 변경은 공장에서 직접 신청합니다.', '④ 사업장이 폐업하면 다른 사업장으로 옮길 수 있습니다.'],
    correctIndex: 3,
    explanation: '사업장 폐업은 사업장 변경 가능 사유입니다.'
  },
  // --- FROM BOOK 2 ---
  {
    bankId: 'R81',
    chapter: 37,
    type: 'comprehension',
    question: '다음 대화를 읽고 빈칸에 알맞은 것을 고르십시오.',
    questionText: '가: 에어컨은 언제부터 사용할 수 있어요? 나: 에어컨 같은 시설은 6월 말부터 사용할 수 있어요.',
    options: ['① 난방', '② 냉방', '③ 선풍기', '④ 전기장판'],
    correctIndex: 1,
    explanation: '공구·도구 사용 — B2Ch37Q03'
  },
  {
    bankId: 'R82',
    chapter: 37,
    type: 'comprehension',
    question: '다음 대화를 읽고 빈칸에 알맞은 것을 고르십시오.',
    questionText: '가: 주말에 같이 계단을 청소할까요? 나: 네, 그래요. 같이 （　　）.',
    options: ['① 청소합니다', '② 청소합시다', '③ 청소했습니다', '④ 청소해야 합니다'],
    correctIndex: 1,
    explanation: '직장생활 — B2Ch37Q04'
  },
  {
    bankId: 'R83',
    chapter: 37,
    type: 'comprehension',
    question: '다음 글을 읽고 물음에 답하십시오.',
    questionText: '기숙사는 여러 사람이 함께 생활하는 곳입니다. 그러니까 서로 예의를 지키고 다른 사람에게 피해를 주지 않아야 합니다. 늦은 시간에 시끄럽게 떠들지 마십시오. 그리고 시설도 깨끗하게 사용해야 합니다. 샤워실과 세탁실은 항상 깨끗하게 관리합시다. 글의 내용과 맞지 않는 것은 무엇입니까?',
    options: ['① 서로 배려해야 합니다.', '② 시설을 아껴 써야 합니다.', '③ 시끄럽게 떠들면 안 됩니다.', '④ 샤워실은 관리인이 청소합니다.'],
    correctIndex: 3,
    explanation: '직장생활 — B2Ch37Q05'
  },
  {
    bankId: 'R84',
    chapter: 38,
    type: 'comprehension',
    question: '다음 글을 읽고 ㉠에 알맞은 말을 고르십시오.',
    questionText: '즐거운 직장 분위기를 만들기 위해서는 모든 사람의 노력이 필요합니다. 직장에서는 서로에게 웃는 얼굴로 이야기하는 게 좋습니다. 그리고 서로를 배려하는 마음을 갖는다면 화내는 일이 없어질 것입니다. ㉠ 전에 상대방의 마음을 한 번 더 생각하는 것도 즐거운 직장을 만드는 방법입니다.',
    options: ['① 웃기', '② 화내기', '③ 배려하기', '④ 오해하기'],
    correctIndex: 1,
    explanation: '직장생활 — B2Ch38Q03'
  },
  {
    bankId: 'R85',
    chapter: 39,
    type: 'comprehension',
    question: '다음 대화를 읽고 빈칸에 알맞은 것을 고르십시오.',
    questionText: '가: 리한 씨가 이제 고향으로 돌아간다고 해요. 나: 그래요? 그럼 곧 （　　）파티를 해야겠네요.',
    options: ['① 생일', '② 승진', '③ 환송', '④ 환영'],
    correctIndex: 2,
    explanation: '회식·모임 — B2Ch39Q02'
  },
  {
    bankId: 'R86',
    chapter: 39,
    type: 'comprehension',
    question: '다음 글을 읽고 글의 주제로 알맞은 것을 고르십시오.',
    questionText: '요즘 회식 문화가 많이 바뀌었습니다. 예전에는 삼겹살에 술을 마시는 것이 보통이었지만 요즘은 공연 관람, 볼링, 스포츠 관람 등 다양한 활동을 합니다. 직원들이 함께 즐길 수 있는 방법을 선택하는 것이 중요합니다.',
    options: ['① 회식 문화가 바뀌고 있습니다.', '② 보통 회식에서는 술을 마십니다.', '③ 회식에서 공연을 보기도 합니다.', '④ 회식에 모든 직원이 참여해야 합니다.'],
    correctIndex: 0,
    explanation: '회식·모임 — B2Ch39Q03'
  },
  {
    bankId: 'R87',
    chapter: 40,
    type: 'comprehension',
    question: '다음 대화를 읽고 빈칸에 알맞은 것을 고르십시오.',
    questionText: '가: 수루 씨, 제 옆에 앉으세요. 나: 민수 씨, 이런 거 직장 내 성희롱에 해당하는 거 알지요? 상대방이 불쾌감을 느끼도록 （　　）안 됩니다.',
    options: ['① 강요하면', '② 신청하면', '③ 신고하면', '④ 표현하면'],
    correctIndex: 0,
    explanation: '직장 내 성희롱 — B2Ch40Q04'
  },
  {
    bankId: 'R88',
    chapter: 41,
    type: 'comprehension',
    question: '다음 글을 읽고 물음에 답하십시오.',
    questionText: '책상을 만들 때 필요한 도구가 아닌 것은 무엇입니까?',
    options: ['① 톱', '② 니퍼', '③ 망치', '④ 전기 드릴'],
    correctIndex: 1,
    explanation: '공구 사용법 — B2Ch41Q03'
  },
  {
    bankId: 'R89',
    chapter: 41,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '가: 기계를 점검해야 하는데 어떻게 해야 돼요? 나: 우선 스패너로 나사를 （　　） 뚜껑을 열어야 해요.',
    options: ['① 풀고', '② 뚫고', '③ 자르고', '④ 조이고'],
    correctIndex: 0,
    explanation: '공구 사용법 — B2Ch41Q04'
  },
  {
    bankId: 'R90',
    chapter: 42,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '기계를 다 사용한 후에는 반드시 전원 스위치를 （　　） 합니다.',
    options: ['① 넣어야', '② 내려야', '③ 꽂아야', '④ 작동해야'],
    correctIndex: 1,
    explanation: '기계 작동 — B2Ch42Q03'
  },
  {
    bankId: 'R91',
    chapter: 42,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '칼로 종이를 （　　） 때는 손을 다치지 않게 조심해야 합니다.',
    options: ['① 잴', '② 붙일', '③ 자를', '④ 접을'],
    correctIndex: 2,
    explanation: '기계 작동 — B2Ch42Q04'
  },
  {
    bankId: 'R92',
    chapter: 42,
    type: 'comprehension',
    question: '다음 글을 읽고 민수 씨가 지금 하는 일을 고르십시오.',
    questionText: '민수 씨는 냄비를 만드는 곳에서 일을 합니다. 그런데 민수 씨는 이 일을 시작한 지가 얼마 안 됐기 때문에 기계를 어떻게 작동하는지 모릅니다. 그래서 주로 물건을 옮기는 일을 하고 있습니다. 그렇지만 곧 기계를 작동하는 방법을 배워서 냄비 만드는 일을 할 겁니다.',
    options: ['① 냄비를 팝니다.', '② 물건을 옮깁니다.', '③ 냄비를 만듭니다.', '④ 기계를 작동합니다.'],
    correctIndex: 1,
    explanation: '기계 작동 — B2Ch42Q05'
  },
  {
    bankId: 'R93',
    chapter: 43,
    type: 'comprehension',
    question: '다음 대화를 읽고 빈칸에 알맞은 것을 고르십시오.',
    questionText: '가: 굴착기로 땅을 （　　） 놓으세요. 나: 네, 알겠습니다.',
    options: ['① 파', '② 싸', '③ 묶어', '④ 담아'],
    correctIndex: 0,
    explanation: '건설·철근 — B2Ch43Q04'
  },
  {
    bankId: 'R94',
    chapter: 44,
    type: 'comprehension',
    question: '다음 대화를 읽고 빈칸에 알맞은 것을 고르십시오.',
    questionText: '가: 며칠 전보다 분뇨가 （　　）. 나: 그렇죠? 빨리 치워야겠어요.',
    options: ['① 많아졌어요', '② 많으면 안 돼요', '③ 많지 않을 거예요', '④ 많았으면 좋겠어요'],
    correctIndex: 0,
    explanation: '페인트 작업 — B2Ch44Q04'
  },
  {
    bankId: 'R95',
    chapter: 44,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '공구함을 준비하여 종류와 크기별로 공구를 구별하여 （　　） 해야 합니다. 이렇게 잘 넣어 두면 공구를 안전하고 쉽게 사용할 수 있습니다.',
    options: ['① 사용', '② 보관', '③ 준비', '④ 점검'],
    correctIndex: 1,
    explanation: '페인트 작업 — B2Ch44Q05'
  },
  {
    bankId: 'R96',
    chapter: 45,
    type: 'comprehension',
    question: '다음 대화를 읽고 빈칸에 알맞은 것을 고르십시오.',
    questionText: '가: 모종을 심기 전에 밭에 비료를 （　　） 돼요. 나: 네, 알겠습니다.',
    options: ['① 캐야', '② 따야', '③ 심어야', '④ 뿌려야'],
    correctIndex: 3,
    explanation: '농업·재배 — B2Ch45Q02'
  },
  {
    bankId: 'R97',
    chapter: 45,
    type: 'picture-match',
    question: '다음 그림을 보고 맞는 단어를 고르십시오.',
    questionText: '벼를 수확할 때 사용하는 농기구입니다.',
    options: ['① 낫', '② 삽', '③ 괭이', '④ 호미'],
    correctIndex: 0,
    explanation: '농업·재배 — B2Ch45Q03'
  },
  {
    bankId: 'R98',
    chapter: 46,
    type: 'comprehension',
    question: '다음 글을 읽고 물음에 답하십시오.',
    questionText: '축산 농가는 여름이 되면 신경 써야 할 일이 많아집니다. 가축들의 위생을 위해 아침저녁으로 축사 청소도 해야 하고, 사료의 상태도 자주 확인을 해야 합니다. 또한 가축들이 더운 여름을 건강하게 보낼 수 있도록 축사를 시원하게 유지하는 것도 중요합니다. 축산 농가가 여름에 하는 일이 아닌 것을 고르십시오.',
    options: ['① 축사 청소를 자주 하는 것', '② 가축의 위생을 점검하는 것', '③ 축사를 시원하게 유지하는 것', '④ 먹이 상태를 매일 확인하는 것'],
    correctIndex: 1,
    explanation: '축산 관리 — B2Ch46Q03'
  },
  {
    bankId: 'R99',
    chapter: 46,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 단어를 고르십시오.',
    questionText: '이 동네에는 소를 키우는 농가가 많아요. 소를 키우는 것을 （　　）(이)라고 합니다.',
    options: ['① 양돈', '② 양우', '③ 양계', '④ 양망'],
    correctIndex: 1,
    explanation: '축산 관리 — B2Ch46Q04'
  },
  {
    bankId: 'R100',
    chapter: 46,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '（　　）은/는 조개를 캘 때 사용해요.',
    options: ['① 통발', '② 갈퀴', '③ 부표', '④ 밧줄'],
    correctIndex: 1,
    explanation: '축산 관리 — B2Ch46Q05'
  },
  {
    bankId: 'R101',
    chapter: 47,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '창고에 식료품을 보관할 때는 알맞은 온도를 （　　） 것이 매우 중요합니다.',
    options: ['① 가공하는', '② 냉방하는', '③ 유지하는', '④ 입고하는'],
    correctIndex: 2,
    explanation: '재고·물류 — B2Ch47Q01'
  },
  {
    bankId: 'R102',
    chapter: 47,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '가구를 만들 때 제일 먼저 해야 하는 일은 바로 원목을 （　　） 일입니다. 용도에 맞게 정확한 크기로 재는 것이 중요합니다.',
    options: ['① 도색하는', '② 샌딩하는', '③ 조립하는', '④ 재단하는'],
    correctIndex: 3,
    explanation: '재고·물류 — B2Ch47Q02'
  },
  {
    bankId: 'R103',
    chapter: 47,
    type: 'picture-match',
    question: '다음 그림을 보고 맞는 문장을 고르십시오.',
    questionText: '목공 작업 현장에서 작업자가 하고 있는 일은 무엇입니까?',
    options: ['① 홈을 파고 있습니다.', '② 조립을 하고 있습니다.', '③ 사포질을 하고 있습니다.', '④ 도색 작업을 하고 있습니다.'],
    correctIndex: 1,
    explanation: '재고·물류 — B2Ch47Q03'
  },
  {
    bankId: 'R104',
    chapter: 48,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '프레스 기계로 같은 모양을 여러 개 （　　） 수 있습니다.',
    options: ['① 깎을', '② 파낼', '③ 구부릴', '④ 찍어 낼'],
    correctIndex: 3,
    explanation: '산업 안전 — B2Ch48Q03'
  },
  {
    bankId: 'R105',
    chapter: 48,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '작업을 하다가 （　　） 것을 막기 위해서는 환기를 자주 해야 합니다.',
    options: ['① 찰과상을 입는', '② 유리가 박히는', '③ 손가락이 잘리는', '④ 가스에 중독되는'],
    correctIndex: 3,
    explanation: '산업 안전 — B2Ch48Q04'
  },
  {
    bankId: 'R106',
    chapter: 48,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 맞는 것을 고르십시오.',
    questionText: '공장에는 여러 종류의 기계가 있습니다. 이런 기계 덕분에 일하는 것이 더 쉬워졌지만 위험한 기계도 많아서 손가락이 잘리거나 화상을 입는 등의 사고도 종종 발생하게 되었습니다. 일을 할 때는 항상 신경을 쓰고 사고를 당하지 않도록 조심해야 합니다.',
    options: ['① 공장에는 위험한 기계도 많이 있다.', '② 사고가 나면 빨리 신고를 해야 한다.', '③ 기계를 사용하면 일이 더 어려워진다.', '④ 기계를 작동하기 전에 연습을 해야 한다.'],
    correctIndex: 0,
    explanation: '산업 안전 — B2Ch48Q05'
  },
  {
    bankId: 'R107',
    chapter: 49,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '높은 곳에서 작업을 할 때는 아래로 떨어질 위험이 있습니다. 그러므로 반드시 （　　）을/를 매고 일을 해야 합니다.',
    options: ['① 보안면', '② 안전대', '③ 안전화', '④ 안전장갑'],
    correctIndex: 1,
    explanation: '안전화·보호구 — B2Ch49Q02'
  },
  {
    bankId: 'R108',
    chapter: 50,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '작업장 환경이 별로 깨끗하지 않아서 늘 （　　） 위해 애쓰는 편입니다.',
    options: ['① 휴식을 취하기', '② 스트레칭을 하기', '③ 골고루 섭취하기', '④ 청결을 유지하기'],
    correctIndex: 3,
    explanation: '직장 성과 — B2Ch50Q02'
  },
  {
    bankId: 'R109',
    chapter: 51,
    type: 'comprehension',
    question: '다음 대화를 읽고 빈칸에 알맞은 것을 고르십시오.',
    questionText: '가: 한국어능력시험을 잘 봤어요? 나: 어렵지 않았어요. （　　）면 좋겠어요.',
    options: ['① 신청하', '② 합격하', '③ 접수하', '④ 문의하'],
    correctIndex: 1,
    explanation: '취업·입국 — B2Ch51Q02'
  },
  {
    bankId: 'R110',
    chapter: 51,
    type: 'picture-match',
    question: '다음 그림을 보고 맞는 단어를 고르십시오.',
    questionText: '바다에서 물고기를 잡는 일을 무엇이라고 합니까?',
    options: ['① 농업', '② 어업', '③ 축산업', '④ 건축업'],
    correctIndex: 1,
    explanation: '취업·입국 — B2Ch51Q04'
  },
  {
    bankId: 'R111',
    chapter: 52,
    type: 'comprehension',
    question: '다음 대화를 읽고 빈칸에 알맞은 것을 고르십시오.',
    questionText: '가: （　　）을 확인해 봤어요? 나: 네, 농장에서 사과 따는 일을 할 것 같아요.',
    options: ['① 근무 시간', '② 업무 내용', '③ 휴식 시간', '④ 식사 제공'],
    correctIndex: 1,
    explanation: '근로 계약 — B2Ch52Q02'
  },
  {
    bankId: 'R112',
    chapter: 52,
    type: 'comprehension',
    question: '다음 글을 읽고 물음에 답하십시오.',
    questionText: '고용허가제로 한국에 들어올 때는 근로계약을 체결합니다. 표준근로계약서에는 근로계약기간, 취업 장소, 업무 내용, 근무 시간, 휴식시간, 휴일, 임금, 지급 시기와 방법, 그 밖에 사용자와 외국인 근로자가 상호간에 정하고자 하는 등에 관한 사항을 담고 있습니다. 표준근로계약서에는 어떤 내용이 담겨 있습니까?',
    options: ['① 근무지', '② 근로 계약', '③ 근로 조건', '④ 근로 시기'],
    correctIndex: 2,
    explanation: '근로 계약 — B2Ch52Q03'
  },
  {
    bankId: 'R113',
    chapter: 53,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '등록증을 만들 때 본인이 맞는지 확인하기 위해서 손에 있는 （　　）을 등록합니다.',
    options: ['① 도장', '② 사인', '③ 서명', '④ 지문'],
    correctIndex: 3,
    explanation: '외국인 등록 — B2Ch53Q02'
  },
  {
    bankId: 'R114',
    chapter: 54,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '이 보험은 （　　）이/가 되면 그동안 낸 보험금을 전부 돌려 받을 수 있습니다.',
    options: ['① 만기', '② 신청', '③ 소멸', '④ 보상'],
    correctIndex: 0,
    explanation: '보험 — B2Ch54Q02'
  },
  {
    bankId: 'R115',
    chapter: 54,
    type: 'comprehension',
    question: '다음 대화를 읽고 두 사람이 이야기하는 주제를 고르십시오.',
    questionText: '여: 다쳐서 일도 못하고 생활이 어려워서 어떡해요. 남: 그래도 보험금으로 평균 임금의 70%를 받을 수 있으니까 다행이에요. 두 사람은 무엇에 대해 이야기를 하고 있습니까?',
    options: ['① 병원비', '② 치료비', '③ 휴업 급여', '④ 장애 보상금'],
    correctIndex: 2,
    explanation: '보험 — B2Ch54Q03'
  },
  {
    bankId: 'R116',
    chapter: 55,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '실수령액은 월급의 총액에서 세금을 （　　） 금액입니다.',
    options: ['① 포함한', '② 가불한', '③ 공제한', '④ 지불한'],
    correctIndex: 2,
    explanation: '급여·세금 — B2Ch55Q02'
  },
  {
    bankId: 'R117',
    chapter: 55,
    type: 'comprehension',
    question: '다음 대화를 읽고 두 사람이 이야기하는 주제를 고르십시오.',
    questionText: '가: 수당을 계산할 때 왜 6,030원으로 해요? 나: 그 금액이 법으로 정한 임금의 최소 기준이거든요. 두 사람은 무엇에 대해 이야기하고 있습니까?',
    options: ['① 국민연금', '② 고용 보험', '③ 최저 임금', '④ 급여 내역'],
    correctIndex: 2,
    explanation: '급여·세금 — B2Ch55Q04'
  },
  {
    bankId: 'R118',
    chapter: 55,
    type: 'comprehension',
    question: '다음 글을 읽고 ㉠에 들어갈 알맞은 말을 고르십시오.',
    questionText: '근로자는 기본급 이외에 상여금과 수당 등 매월 다른 금액의 급여를 받게 됩니다. 그렇지만 매월 발생하는 근로 소득에 대한 세금을 정확하게 계산하는 것은 굉장히 복잡합니다. 따라서 급여를 지급할 때 간단한 세금 계산표로 세금을 공제하고, 다음해 2월에 실제 부담해야 할 세금을 정확하게 계산합니다. 이것을 ㉠(이)라고 합니다.',
    options: ['① 연말 정산', '② 세금 공제', '③ 보험료 납부', '④ 급여 명세서'],
    correctIndex: 0,
    explanation: '급여·세금 — B2Ch55Q05'
  },
  {
    bankId: 'R119',
    chapter: 56,
    type: 'comprehension',
    question: '다음 대화를 읽고 빈칸에 알맞은 것을 고르십시오.',
    questionText: '가: 안색이 안 좋아요. 일찍 들어가서 쉬는 게 어때요? 나: 네, 먼저 （　　）보겠습니다.',
    options: ['① 결근하고', '② 조퇴하고', '③ 신청하고', '④ 휴직하고'],
    correctIndex: 1,
    explanation: '휴가 — B2Ch56Q02'
  },
  {
    bankId: 'R120',
    chapter: 56,
    type: 'comprehension',
    question: '다음 대화를 읽고 두 사람이 이야기하는 주제를 고르십시오.',
    questionText: '가: 그럼 회사에 연락도 없이 출근 안 한 거예요? 나: 그런가 봐요. 두 사람은 무엇에 대해 이야기하고 있습니까?',
    options: ['① 병가 내다', '② 휴직하다', '③ 조퇴하다', '④ 무단결근하다'],
    correctIndex: 3,
    explanation: '휴가 — B2Ch56Q04'
  },
  {
    bankId: 'R121',
    chapter: 56,
    type: 'comprehension',
    question: '다음 글을 읽고 ㉠에 들어갈 알맞은 말을 고르십시오.',
    questionText: '법으로 정한 날은 아니지만 회사가 휴일로 정하고 있는 날입니다. 유급으로 할 것인지 무급으로 할 것인지도 회사의 규정에 따라 다릅니다. 근로자의 날은 법정 휴일로 ㉠에 포함되지 않습니다.',
    options: ['① 무급 휴일', '② 연차 휴일', '③ 약정 휴일', '④ 유급 휴일'],
    correctIndex: 2,
    explanation: '휴가 — B2Ch56Q05'
  },
  {
    bankId: 'R122',
    chapter: 57,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '개인 사정으로 （　　）을 할 때 재입국 허가 신청서에 사업자의 동의서를 첨부하여 제출합니다.',
    options: ['① 재입국', '② 일시 출국', '③ 조기 귀국', '④ 근무지 변경'],
    correctIndex: 1,
    explanation: '사업장 변경 — B2Ch57Q02'
  },
  {
    bankId: 'R123',
    chapter: 57,
    type: 'fill-blank',
    question: '빈칸에 들어갈 가장 알맞은 것을 고르십시오.',
    questionText: '사업장 변경 （　　）에는 근로계약의 만료나 해지, 일하던 사업장의 휴업이나 폐업, 근로자의 상해 등이 있습니다.',
    options: ['① 기간', '② 사유', '③ 신고', '④ 신청'],
    correctIndex: 1,
    explanation: '사업장 변경 — B2Ch57Q03'
  },
  {
    bankId: 'R124',
    chapter: 57,
    type: 'comprehension',
    question: '다음 대화를 읽고 빈칸에 알맞은 것을 고르십시오.',
    questionText: '가: 일시 출국 전에 허가를 받으면 다시 입국할 때 재입국 허가가 （　　）. 나: 재입국 허가를 안 받아도 되니까 훨씬 편하겠네요.',
    options: ['① 등록돼요', '② 면제돼요', '③ 신고해요', '④ 제출돼요'],
    correctIndex: 1,
    explanation: '사업장 변경 — B2Ch57Q04'
  },
  {
    bankId: 'R125',
    chapter: 58,
    type: 'comprehension',
    question: '다음 글을 읽고 내용과 맞지 않는 것을 고르십시오.',
    questionText: '체류 기간을 연장하려면 체류 기간 만료일 전까지 체류 기간 연장 허가 신청서, 여권, 외국인 등록증, 수수료를 준비해서 출입국 관리 사무소에 가야 합니다.',
    options: ['① 수수료가 듭니다.', '② 외국인 등록증이 필요합니다.', '③ 체류 기간 연장에 대한 설명입니다.', '④ 신청 기간은 만료일 다음날까지입니다.'],
    correctIndex: 3,
    explanation: '체류 기간 연장 — B2Ch58Q02'
  },
  {
    bankId: 'R126',
    chapter: 58,
    type: 'comprehension',
    question: '다음 대화를 읽고 빈칸에 알맞은 것을 고르십시오.',
    questionText: '가: 체류 기간을 （　　） 출입국 관리 사무소에 가야 합니다. 나: 준비물이 무엇인가요?',
    options: ['① 연장하려면', '② 심사하려면', '③ 허가하려면', '④ 추방되려면'],
    correctIndex: 0,
    explanation: '체류 기간 연장 — B2Ch58Q04'
  },
  // --- FROM BOOK 2 — READING PICTURE QUESTIONS (with real images) ---
  {
    bankId: 'R127',
    chapter: 37,
    type: 'picture-match',
    question: '다음 그림을 보고 맞는 단어를 고르십시오.',
    questionText: '기숙사에 있는 냉방 장치는 어느 것입니까?',
    imageOptionUrls: ['/images/eps/r37_01.jpg', '/images/eps/r37_02.jpg', '/images/eps/r37_03.jpg', '/images/eps/r37_04.jpg'],
    options: ['① 에어컨', '② 세탁기', '③ 냉장고', '④ 선풍기'],
    correctIndex: 0,
    explanation: '공구·도구 사용 — 기숙사 시설'
  },
  {
    bankId: 'R128',
    chapter: 38,
    type: 'picture-match',
    question: '다음 그림을 보고 맞는 문장을 고르십시오.',
    questionText: '',
    imageOptionUrls: ['/images/eps/r38_01.jpg', '/images/eps/r38_02.jpg', '/images/eps/r38_03.jpg', '/images/eps/r38_04.jpg'],
    options: ['① 상사에게 인사하고 있습니다.', '② 동료에게 보고하고 있습니다.', '③ 말다툼을 하고 있습니다.', '④ 물건을 나르고 있습니다.'],
    correctIndex: 0,
    explanation: '직장생활 — 직장 내 행동'
  },
  {
    bankId: 'R129',
    chapter: 41,
    type: 'picture-match',
    question: '다음 그림을 보고 맞는 단어를 고르십시오.',
    questionText: '나사를 조이거나 풀 때 사용하는 공구입니다.',
    imageOptionUrls: ['/images/eps/r41_01.jpg', '/images/eps/r41_02.jpg', '/images/eps/r41_03.jpg', '/images/eps/r41_04.jpg'],
    options: ['① 톱', '② 볼트', '③ 드라이버', '④ 니퍼'],
    correctIndex: 1,
    explanation: '공구 사용법 — 공구 종류'
  },
  {
    bankId: 'R130',
    chapter: 43,
    type: 'picture-match',
    question: '다음 그림을 보고 맞는 단어를 고르십시오.',
    questionText: '건설 현장에서 높은 곳에서 작업할 수 있도록 설치하는 임시 구조물은 무엇입니까?',
    imageOptionUrls: ['/images/eps/r43_01.jpg', '/images/eps/r43_02.jpg', '/images/eps/r43_03.jpg', '/images/eps/r43_04.jpg'],
    options: ['① 벽돌', '② 철근', '③ 비계', '④ 굴착기'],
    correctIndex: 2,
    explanation: '건설·철근 — 건설 자재'
  },
  {
    bankId: 'R131',
    chapter: 44,
    type: 'picture-match',
    question: '다음 그림을 보고 맞는 단어를 고르십시오.',
    questionText: '페인트 작업 현장에서 페인트와 도구를 운반할 때 사용하는 것은 무엇입니까?',
    imageOptionUrls: ['/images/eps/r44_01.jpg', '/images/eps/r44_02.jpg', '/images/eps/r44_03.jpg', '/images/eps/r44_04.jpg'],
    options: ['① 손수레', '② 페인트 붓', '③ 롤러', '④ 스프레이'],
    correctIndex: 0,
    explanation: '페인트 작업 — 작업 장비'
  },
  {
    bankId: 'R132',
    chapter: 45,
    type: 'picture-match',
    question: '다음 그림을 보고 맞는 단어를 고르십시오.',
    questionText: '벼나 풀을 베는 데 사용하는 농기구는 무엇입니까?',
    imageOptionUrls: ['/images/eps/r45_01.jpg', '/images/eps/r45_02.jpg', '/images/eps/r45_03.jpg', '/images/eps/r45_04.jpg'],
    options: ['① 낫', '② 삽', '③ 괭이', '④ 호미'],
    correctIndex: 0,
    explanation: '농업·재배 — 농기구'
  },
  {
    bankId: 'R133',
    chapter: 46,
    type: 'picture-match',
    question: '다음 그림을 보고 맞는 단어를 고르십시오.',
    questionText: '바다에서 그물이나 어구의 위치를 표시하기 위해 물 위에 띄우는 것은 무엇입니까?',
    imageOptionUrls: ['/images/eps/r46_01.jpg', '/images/eps/r46_02.jpg', '/images/eps/r46_03.jpg', '/images/eps/r46_04.jpg'],
    options: ['① 부표', '② 갈퀴', '③ 통발', '④ 밧줄'],
    correctIndex: 0,
    explanation: '축산 관리 — 어업 장비'
  },
  {
    bankId: 'R134',
    chapter: 48,
    type: 'picture-match',
    question: '다음 그림을 보고 맞는 단어를 고르십시오.',
    questionText: '금속이나 목재를 깎아서 모양을 만드는 공장 기계는 무엇입니까?',
    imageOptionUrls: ['/images/eps/r48_01.jpg', '/images/eps/r48_02.jpg', '/images/eps/r48_03.jpg', '/images/eps/r48_04.jpg'],
    options: ['① 선반 기계', '② 프레스 기계', '③ 용접기', '④ 컨베이어'],
    correctIndex: 0,
    explanation: '산업 안전 — 공장 기계'
  },
  {
    bankId: 'R135',
    chapter: 49,
    type: 'picture-match',
    question: '다음 그림을 보고 맞는 단어를 고르십시오.',
    questionText: '발을 보호하기 위해 건설·제조업 현장에서 착용해야 하는 보호구는 무엇입니까?',
    imageOptionUrls: ['/images/eps/r49_01.jpg', '/images/eps/r49_02.jpg', '/images/eps/r49_03.jpg', '/images/eps/r49_04.jpg'],
    options: ['① 보안경', '② 귀마개', '③ 방진 마스크', '④ 안전화'],
    correctIndex: 3,
    explanation: '안전화·보호구 — 보호구 종류'
  },
  {
    bankId: 'R136',
    chapter: 49,
    type: 'picture-match',
    question: '다음 그림을 보고 맞는 단어를 고르십시오.',
    questionText: '높은 소음이 발생하는 작업 환경에서 귀를 보호하기 위해 사용하는 것은 무엇입니까?',
    imageOptionUrls: ['/images/eps/r49_05.jpg', '/images/eps/r49_06.jpg', '/images/eps/r49_07.jpg', '/images/eps/r49_08.jpg'],
    options: ['① 방진 마스크', '② 보안면', '③ 귀마개', '④ 안전장갑'],
    correctIndex: 2,
    explanation: '안전화·보호구 — 청력 보호구'
  },
  // ─── NEW PICTURE-MATCH READING (2026 — ภาพประกอบเพิ่มเติม) ────────────────────
  {
    bankId: 'R137',
    chapter: 45,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '트랙터로 밭을 갈고 있습니다.',
    imageOptionUrls: ['/images/eps/r137_01.svg','/images/eps/r137_02.svg','/images/eps/r137_03.svg','/images/eps/r137_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 1,
    explanation: '트랙터로 밭을 갈다 = to plow a field with a tractor (경운 작업)'
  },
  {
    bankId: 'R138',
    chapter: 45,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '분무기로 과수원에 농약을 살포하고 있습니다.',
    imageOptionUrls: ['/images/eps/r138_01.svg','/images/eps/r138_02.svg','/images/eps/r138_03.svg','/images/eps/r138_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 2,
    explanation: '농약을 살포하다 = 분무기로 농약을 뿌리다 (to spray pesticide with sprayer)'
  },
  {
    bankId: 'R139',
    chapter: 46,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '소에게 사료를 주고 있습니다.',
    imageOptionUrls: ['/images/eps/r139_01.svg','/images/eps/r139_02.svg','/images/eps/r139_03.svg','/images/eps/r139_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 1,
    explanation: '사료를 주다 = to feed livestock (축산 급이 작업)'
  },
  {
    bankId: 'R140',
    chapter: 46,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '그물로 바다에서 물고기를 잡고 있습니다.',
    imageOptionUrls: ['/images/eps/r140_01.svg','/images/eps/r140_02.svg','/images/eps/r140_03.svg','/images/eps/r140_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 2,
    explanation: '그물로 물고기를 잡다 = to catch fish with a net (어업 작업)'
  },
  {
    bankId: 'R141',
    chapter: 39,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '용접 마스크를 쓰고 용접 작업을 하고 있습니다.',
    imageOptionUrls: ['/images/eps/r141_01.svg','/images/eps/r141_02.svg','/images/eps/r141_03.svg','/images/eps/r141_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 1,
    explanation: '용접 마스크를 쓰고 용접 작업을 하다 = welding work wearing a welding mask'
  },
  {
    bankId: 'R142',
    chapter: 47,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '지게차로 팔레트 위의 상자를 이동하고 있습니다.',
    imageOptionUrls: ['/images/eps/r142_01.svg','/images/eps/r142_02.svg','/images/eps/r142_03.svg','/images/eps/r142_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 2,
    explanation: '지게차로 팔레트를 이동하다 = to move a pallet with a forklift'
  },
  {
    bankId: 'R143',
    chapter: 48,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '컨베이어 벨트에서 제품 불량 검사를 하고 있습니다.',
    imageOptionUrls: ['/images/eps/r143_01.svg','/images/eps/r143_02.svg','/images/eps/r143_03.svg','/images/eps/r143_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 2,
    explanation: '컨베이어 벨트에서 불량 검사 = quality inspection on a conveyor belt'
  },
  {
    bankId: 'R144',
    chapter: 53,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '소화기를 들고 불이 난 곳에 분사하고 있습니다.',
    imageOptionUrls: ['/images/eps/r144_01.svg','/images/eps/r144_02.svg','/images/eps/r144_03.svg','/images/eps/r144_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 3,
    explanation: '소화기를 분사하다 = to discharge a fire extinguisher (화재 초기 진압)'
  },
  {
    bankId: 'R145',
    chapter: 49,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '안전대를 매고 높은 곳에서 작업을 하고 있습니다.',
    imageOptionUrls: ['/images/eps/r145_01.svg','/images/eps/r145_02.svg','/images/eps/r145_03.svg','/images/eps/r145_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 1,
    explanation: '안전대를 매고 고소 작업 = working at height with a safety harness (추락 방지)'
  },
  {
    bankId: 'R146',
    chapter: 43,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '철근을 서로 묶어서 고정하고 있습니다.',
    imageOptionUrls: ['/images/eps/r146_01.svg','/images/eps/r146_02.svg','/images/eps/r146_03.svg','/images/eps/r146_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 2,
    explanation: '철근을 묶다 = to tie rebar (건설 현장 철근 결속 작업)'
  },
  {
    bankId: 'R147',
    chapter: 20,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '은행 ATM기에서 돈을 인출하고 있습니다.',
    imageOptionUrls: ['/images/eps/r147_01.svg','/images/eps/r147_02.svg','/images/eps/r147_03.svg','/images/eps/r147_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 1,
    explanation: 'ATM기에서 돈을 인출하다 = to withdraw money from an ATM machine'
  },
  {
    bankId: 'R148',
    chapter: 20,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '분리수거함에 종이와 플라스틱을 분리해서 버리고 있습니다.',
    imageOptionUrls: ['/images/eps/r148_01.svg','/images/eps/r148_02.svg','/images/eps/r148_03.svg','/images/eps/r148_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 2,
    explanation: '분리수거 = separate waste disposal (재활용 분리)'
  },
  {
    bankId: 'R149',
    chapter: 25,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '병원에서 의사에게 증상을 설명하고 진찰을 받고 있습니다.',
    imageOptionUrls: ['/images/eps/r149_01.svg','/images/eps/r149_02.svg','/images/eps/r149_03.svg','/images/eps/r149_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 2,
    explanation: '의사에게 진찰을 받다 = to receive a medical examination from a doctor'
  },
  {
    bankId: 'R150',
    chapter: 22,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '고용센터에서 사업장 변경 신청서를 제출하고 있습니다.',
    imageOptionUrls: ['/images/eps/r150_01.svg','/images/eps/r150_02.svg','/images/eps/r150_03.svg','/images/eps/r150_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 2,
    explanation: '고용센터에서 사업장 변경 신청서 제출 = applying for workplace change at employment center'
  },
  {
    bankId: 'R151',
    chapter: 37,
    type: 'picture-match',
    question: '다음 내용과 관계있는 그림을 고르십시오.',
    questionText: '드릴을 이용해서 벽에 구멍을 뚫고 있습니다.',
    imageOptionUrls: ['/images/eps/r151_01.svg','/images/eps/r151_02.svg','/images/eps/r151_03.svg','/images/eps/r151_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 1,
    explanation: '드릴로 구멍을 뚫다 = to drill a hole with a power drill'
  },
];

//  LISTENING QUESTION BANK 
const listeningBank = [
  // ─── AGRICULTURE (Ch45 Crop Cultivation) ──────────────────────────────────
  {
    bankId: 'L01',
    chapter: 45,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '여: 사장님, 이제 뭘 할까요?\n남: 저쪽에 있는 사과를 따 주세요.',
    options: ['① 씨앗을 뿌리는 그림', '② 사과를 따는 그림', '③ 트랙터를 운전하는 그림', '④ 모종을 심는 그림'],
    correctIndex: 1,
    explanation: '사과를 따다 = to pick apples (과수 수확)'
  },
  {
    bankId: 'L02',
    chapter: 45,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '남: 배추를 뽑을까요?',
    options: ['① 네, 배추를 담을게요.', '② 아니요, 배추가 있어요.', '③ 네, 배추를 뽑아 주세요.', '④ 아니요, 배추를 좋아해요.'],
    correctIndex: 2,
    explanation: '배추를 뽑을까요? → 네, 배추를 뽑아 주세요. (지시 따르기)'
  },
  {
    bankId: 'L03',
    chapter: 45,
    type: 'topic',
    question: '두 사람은 무엇에 대해 말하고 있습니까?',
    audioScript: '여: 밤마다 야생 동물이 자꾸 내려와서 울타리망을 설치할까 해요.\n남: 그럼 빨리 하세요. 울타리망이 있으면 농작물을 보호할 수 있어요.',
    options: ['① 농약 살포 방법', '② 야생 동물 대책', '③ 수확 일정', '④ 모종 심기'],
    correctIndex: 1,
    explanation: '울타리망 설치 = 야생 동물로부터 농작물 보호 대책'
  },
  {
    bankId: 'L04',
    chapter: 45,
    type: 'next-action',
    question: '다음 중 들은 내용과 같은 것은 무엇입니까?',
    audioScript: '남: 수레 위에 있던 비닐 못 봤어요? 밭에 가져가야 하는데 없네요.\n여: 제가 미리 가져다 두었어요. 창고에서 삽도 꺼내 놓고요.\n남: 고마워요. 그럼 삽 챙겨서 밭에 먼저 가 있을게요.',
    options: ['① 남자는 밭이 어디인지 모릅니다.', '② 여자는 삽을 가지고 밭에 갈 것입니다.', '③ 남자는 비닐을 밭에 가져다 두었습니다.', '④ 여자는 창고에 가서 삽을 찾아왔습니다.'],
    correctIndex: 3,
    explanation: '여자가 창고에서 삽도 꺼내 놓았다고 합니다.'
  },
  // ─── AGRICULTURE (Ch46 Livestock Management) ──────────────────────────────
  {
    bankId: 'L05',
    chapter: 46,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '남: 사장님, 이제 뭘 할까요?\n여: 축사에 가서 분뇨 좀 치워 주세요.',
    options: ['① 사료를 주는 그림', '② 분뇨를 치우는 그림', '③ 소독약을 뿌리는 그림', '④ 축사 문을 여는 그림'],
    correctIndex: 1,
    explanation: '분뇨를 치우다 = to remove manure (축사 청소 첫 단계)'
  },
  {
    bankId: 'L06',
    chapter: 46,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '남: 누가 축사 청소를 했어요?',
    options: ['① 오전에 청소했어요.', '② 더러워서 청소했어요.', '③ 다라 씨가 청소했어요.', '④ 두 시간 동안 청소했어요.'],
    correctIndex: 2,
    explanation: '누가 청소를 했어요? → (사람 이름)이/가 청소했어요.'
  },
  {
    bankId: 'L07',
    chapter: 46,
    type: 'continuation',
    question: '다음을 듣고 이어지는 말로 가장 알맞은 것을 고르십시오.',
    audioScript: '남: 물청소를 했으니까 축사 소독을 시작합시다.',
    options: ['① 물을 많이 뿌려야겠어요.', '② 그럼 소독할 준비를 할게요.', '③ 축사가 너무 더러운 것 같아요.', '④ 소독약을 뿌린 후에 청소를 할게요.'],
    correctIndex: 1,
    explanation: '물청소 완료 후 소독 시작 → 소독 준비를 하겠다고 답합니다.'
  },
  {
    bankId: 'L08',
    chapter: 46,
    type: 'next-action',
    question: '여자가 이어서 할 행동은 무엇입니까?',
    audioScript: '남: 사료 정리하느라 고생했어요. 내일은 축사 청소한 후에 소독도 할 거니까 준비해 주세요.\n여: 소독이요? 지난주에 했는데 또 소독을 해야 돼요?\n남: 일주일에 한 번씩 해야 소들이 병에 걸리지 않거든요.\n여: 네, 알겠어요. 이따가 창고에 가서 소독약을 준비해 놓을게요.',
    options: ['① 사료를 정리합니다.', '② 축사 청소를 합니다.', '③ 축사 소독을 합니다.', '④ 소독약을 준비합니다.'],
    correctIndex: 3,
    explanation: '여자는 창고에 가서 소독약을 준비해 놓겠다고 합니다.'
  },
  // ─── INDUSTRY (Ch37-39 Metal/Machine) ─────────────────────────────────────
  {
    bankId: 'L09',
    chapter: 37,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '남: 반장님이 빨간색 버튼을 누르라고 하셨어요.',
    options: ['① 레버를 당기는 그림', '② 핸들을 돌리는 그림', '③ 버튼을 누르는 그림', '④ 스위치를 올리는 그림'],
    correctIndex: 2,
    explanation: '버튼을 누르다 = to press a button (기계 조작)'
  },
  {
    bankId: 'L10',
    chapter: 37,
    type: 'topic',
    question: '두 사람은 무엇에 대해 말하고 있습니까?',
    audioScript: '남: 반장님이 표면을 깎으라고 하셨는데 뭘로 깎아야 돼요?\n여: 이건 금속이라서 줄로 깎아야 돼요. 공구함에 줄이 있을 거예요.',
    options: ['① 작업 규칙', '② 작업 도구', '③ 작업 순서', '④ 작업 장소'],
    correctIndex: 1,
    explanation: '줄(file)로 금속 깎기 = 작업 도구에 대한 대화'
  },
  {
    bankId: 'L11',
    chapter: 38,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '여: 이 나사는 뭐로 조여야 돼요?',
    options: ['① 나사가 커서 제일 큰 드라이버로 조여야 돼요.', '② 바이스로 고정하고 잘라야 해요.', '③ 스패너로 구멍을 뚫어야 돼요.', '④ 망치로 박으면 돼요.'],
    correctIndex: 0,
    explanation: '나사를 조이는 도구 = 드라이버 (나사 크기에 맞는 것 사용)'
  },
  {
    bankId: 'L12',
    chapter: 38,
    type: 'continuation',
    question: '다음을 듣고 이어지는 말로 가장 알맞은 것을 고르십시오.',
    audioScript: '남: 기계에서 소음이 나요.',
    options: ['① 필요한 기계를 미리 준비하세요.', '② 작동을 멈추고 점검을 요청합시다.', '③ 도면을 보고 작업 순서를 확인할게요.', '④ 작업하기 전에 조립 부품을 가져오세요.'],
    correctIndex: 1,
    explanation: '기계 소음 발생 → 작동을 멈추고 점검 요청 (안전 규칙)'
  },
  {
    bankId: 'L13',
    chapter: 38,
    type: 'comprehension',
    question: '여자가 다른 공구로 작업해야 하는 이유는 무엇입니까?',
    audioScript: '남: 지금 무슨 작업을 하고 있어요?\n여: 이 부품을 조여야 되는데 잘 안 되네요.\n남: 스패너 치수가 안 맞는 것 같아요. 아주 작은 치수의 스패너로 해 보세요.\n여: 알겠어요. 작은 스패너로 해 볼게요.',
    options: ['① 스패너가 부러져서', '② 스패너가 무거워서', '③ 스패너가 너무 커서', '④ 스패너를 잃어버려서'],
    correctIndex: 2,
    explanation: '스패너 치수가 안 맞는다 = 스패너가 너무 커서 맞지 않음'
  },
  {
    bankId: 'L14',
    chapter: 39,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '여: 공구함에 망치가 있을 거예요. 몇 개 갖다줄까요?\n남: 두 개 갖다주세요. 고맙습니다.',
    options: ['① 드릴 그림', '② 망치 그림', '③ 줄(file) 그림', '④ 바이스 그림'],
    correctIndex: 1,
    explanation: '망치(hammer) = 못을 박을 때 사용하는 공구'
  },
  {
    bankId: 'L15',
    chapter: 39,
    type: 'comprehension',
    question: '다음 중 들은 내용과 같은 것은 무엇입니까?',
    audioScript: '여: 마두 씨, 절단 작업은 다 끝났어요?\n남: 네, 방금 다 했어요.\n여: 그럼 자하라 씨한테 용접봉 좀 가져다주세요. 아까부터 찾고 있었어요.',
    options: ['① 남자는 방금 작업을 마쳤습니다.', '② 남자는 용접봉을 찾고 있었습니다.', '③ 여자는 자하라 씨를 찾고 있습니다.', '④ 자하라 씨는 지금 절단 작업을 합니다.'],
    correctIndex: 0,
    explanation: '남자: "네, 방금 다 했어요" = 방금 절단 작업을 마쳤습니다.'
  },
  {
    bankId: 'L16',
    chapter: 39,
    type: 'continuation',
    question: '다음을 듣고 이어지는 말로 가장 알맞은 것을 고르십시오.',
    audioScript: '남: 용접할 때 불꽃이 튈 수 있으니까 조심하세요.',
    options: ['① 네, 공구함에 잘 넣어 놓겠습니다.', '② 네, 물건이 있는지 확인하겠습니다.', '③ 네, 다치지 않도록 주의하겠습니다.', '④ 네, 잘 보이는 곳에 보관하겠습니다.'],
    correctIndex: 2,
    explanation: '불꽃 주의 경고 → 다치지 않도록 주의하겠습니다 (안전 의식)'
  },
  // ─── SAFETY (Ch53-56) ─────────────────────────────────────────────────────
  {
    bankId: 'L17',
    chapter: 53,
    type: 'comprehension',
    question: '다음 중 들은 내용과 같은 것은 무엇입니까?',
    audioScript: '남: 대리님, 말씀하신 대로 안전화도 신고 안전장갑도 꼈습니다.\n여: 잘했어요. 어, 그런데 왜 안전모를 손에 들고 있어요?\n남: 날씨가 너무 더워서 벗었습니다.\n여: 저기에 붙어 있는 안전 표지를 보세요. 안전모를 반드시 착용해야 합니다.',
    options: ['① 남자는 안전화로 바꿔 신어야 합니다.', '② 남자는 안전모를 가지고 오지 않았습니다.', '③ 여자는 남자에게 안전장갑을 가져다줄 겁니다.', '④ 여자는 남자에게 안전 표지에 대해 설명했습니다.'],
    correctIndex: 3,
    explanation: '여자가 안전 표지를 보며 안전모 착용 규정을 설명했습니다.'
  },
  {
    bankId: 'L18',
    chapter: 54,
    type: 'next-action',
    question: '남자가 이어서 할 행동은 무엇입니까?',
    audioScript: '여: 오늘은 화학물질을 혼합하는 작업을 할 거예요. 작업복으로 갈아입으셨지요?\n남: 네, 그런데 작업장에서 커피를 마셔도 돼요?\n여: 아니요, 음식물은 안 돼요. 그리고 작업 시작하기 전에 환기 장치부터 켜도록 하세요.\n남: 알겠습니다.',
    options: ['① 커피를 마십니다.', '② 환기 장치를 켭니다.', '③ 혼합 작업을 시작합니다.', '④ 작업복으로 갈아입습니다.'],
    correctIndex: 1,
    explanation: '여자가 환기 장치를 먼저 켜라고 지시했으므로 남자는 환기 장치를 켭니다.'
  },
  {
    bankId: 'L19',
    chapter: 55,
    type: 'comprehension',
    question: '다음 중 들은 내용과 같은 것은 무엇입니까?',
    audioScript: '남: 반장님, 오늘 작업할 때 마스크도 써야 돼요?\n여: 네, 작업 중에 먼지가 많이 발생할 테니까 방진 마스크를 꼭 쓰세요. 다른 보호 장비는 다 챙겼어요?\n남: 네, 안전화는 신었고, 안전모도 챙겼어요.',
    options: ['① 남자는 안전모를 준비하지 않았습니다.', '② 방진 마스크는 착용하지 않아도 됩니다.', '③ 남자는 보안경이 없어서 챙기지 못했습니다.', '④ 오늘은 먼지가 많이 발생하는 작업을 할 겁니다.'],
    correctIndex: 3,
    explanation: '여자: "먼지가 많이 발생할 테니까" = 오늘 먼지 많은 작업 예정'
  },
  {
    bankId: 'L20',
    chapter: 56,
    type: 'next-action',
    question: '여자가 이어서 할 행동은 무엇입니까?',
    audioScript: '남: 자하라 씨, 큰일 났어요. 용접하다가 불꽃이 상자에 튀었어요.\n여: 용접기부터 끄세요. 어, 저기 불이 붙은 것 같아요. 소화기 가져와서 얼른 불을 끄세요.\n남: 네, 빨리 가져올게요.\n여: 저는 반장님을 불러올게요.',
    options: ['① 불을 끄러 갑니다.', '② 용접기를 끄러 갑니다.', '③ 반장님을 부르러 갑니다.', '④ 소화기를 가지러 갑니다.'],
    correctIndex: 2,
    explanation: '여자: "저는 반장님을 불러올게요" = 반장님을 부르러 갑니다.'
  },
  // ─── OFFICIAL SAMPLE (20문항 listening) ────────────────────────────────────
  {
    bankId: 'L21',
    chapter: 99,
    type: 'word-discrimination',
    question: '다음을 듣고 들은 것을 고르십시오.',
    audioScript: '가구',
    options: ['① 가구', '② 기구', '③ 가게', '④ 거기'],
    correctIndex: 0,
    explanation: '가구 = furniture (家具)'
  },
  {
    bankId: 'L22',
    chapter: 99,
    type: 'word-discrimination',
    question: '다음을 듣고 들은 것을 고르십시오.',
    audioScript: '적재',
    options: ['① 적재', '② 직장', '③ 적정', '④ 정전'],
    correctIndex: 0,
    explanation: '적재 = loading/stacking cargo (積載)'
  },
  {
    bankId: 'L23',
    chapter: 99,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 것을 고르십시오.',
    audioScript: '여: 커피를 마셔요.',
    options: ['① 청소를 하고 있습니다.', '② 밥을 먹고 있습니다.', '③ 커피를 마시고 있습니다.', '④ 전화를 하고 있습니다.'],
    correctIndex: 2,
    explanation: '커피를 마셔요 → 커피를 마시고 있습니다.'
  },
  {
    bankId: 'L24',
    chapter: 99,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 것을 고르십시오.',
    audioScript: '여: 망치입니다.',
    options: ['① 드라이버입니다.', '② 렌치입니다.', '③ 스패너입니다.', '④ 망치입니다.'],
    correctIndex: 3,
    explanation: '망치 = hammer'
  },
  {
    bankId: 'L25',
    chapter: 99,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 것을 고르십시오.',
    audioScript: '여: 음악을 들어요.',
    options: ['① 사진을 찍고 있습니다.', '② 음악을 듣고 있습니다.', '③ 책을 읽고 있습니다.', '④ 전화를 하고 있습니다.'],
    correctIndex: 1,
    explanation: '음악을 들어요 → 음악을 듣고 있습니다.'
  },
  {
    bankId: 'L26',
    chapter: 99,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 것을 고르십시오.',
    audioScript: '여: 제품을 포장합니다.',
    options: ['① 제품을 검사하고 있습니다.', '② 제품을 포장하고 있습니다.', '③ 제품을 운반하고 있습니다.', '④ 제품을 조립하고 있습니다.'],
    correctIndex: 1,
    explanation: '포장합니다 → 포장하고 있습니다.'
  },
  {
    bankId: 'L27',
    chapter: 99,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 것을 고르십시오.',
    audioScript: '남: 괜찮아요? 자, 제 손 잡고 일어나세요.\n여: 고마워요. 오늘 스케이트를 처음 타는데 정말 어렵네요.',
    options: ['① 수영장에서 수영을 합니다.', '② 공원에서 자전거를 탑니다.', '③ 아이스링크에서 스케이트를 탑니다.', '④ 운동장에서 달리기를 합니다.'],
    correctIndex: 2,
    explanation: '스케이트를 처음 타는데 → 아이스링크에서 스케이트를 탑니다.'
  },
  {
    bankId: 'L28',
    chapter: 99,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 것을 고르십시오.',
    audioScript: '여: 오후에 무슨 작업을 해요?\n남: 납품할 물건을 트럭에 실어야 돼요.',
    options: ['① 물건을 트럭에 싣고 있습니다.', '② 물건을 창고에 정리하고 있습니다.', '③ 제품을 포장하고 있습니다.', '④ 트럭을 세차하고 있습니다.'],
    correctIndex: 0,
    explanation: '납품할 물건을 트럭에 실어야 돼요 → 물건을 트럭에 싣고 있습니다.'
  },
  {
    bankId: 'L29',
    chapter: 99,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '남: 외국인인력지원센터에서 법률 교육도 해요?',
    options: ['① 그럼요, 법률 교육은 못해요.', '② 아니요, 항상 수업을 하고 있어요.', '③ 아니요, 법률 교육을 받고 있어요.', '④ 그럼요, 상담을 받고 신청하면 돼요.'],
    correctIndex: 3,
    explanation: '법률 교육도 해요? → 그럼요, 상담을 받고 신청하면 돼요.'
  },
  {
    bankId: 'L30',
    chapter: 99,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '여: 사전 취업 교육을 받았어요?',
    options: ['① 네, 교육 일정을 좀 알려 주세요.', '② 네, 취업이 빨리 돼야 할 텐데요.', '③ 아니요, 다음 주라고 들었는데요.', '④ 아니요, 교육 내용이 어려웠어요.'],
    correctIndex: 2,
    explanation: '사전 취업 교육을 받았어요? → 아니요, 다음 주라고 들었는데요.'
  },
  {
    bankId: 'L31',
    chapter: 99,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '남: 이 약은 언제 먹어야 돼요?',
    options: ['① 집에서 드세요.', '② 감기약을 드세요.', '③ 밥을 먹은 후에 드세요.', '④ 따뜻한 물과 같이 드세요.'],
    correctIndex: 2,
    explanation: '이 약은 언제 먹어야 돼요? → 밥을 먹은 후에 드세요.'
  },
  {
    bankId: 'L32',
    chapter: 99,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '남: \'직장 내 성희롱 예방 교육\'은 어디에서 합니까?',
    options: ['① 3층 회의실에서 한다고 들었어요.', '② 교육은 누구나 받을 수 있어요.', '③ 성희롱 예방 교육은 두 시에 있어요.', '④ 성희롱 예방 교육은 꼭 들어야 돼요.'],
    correctIndex: 0,
    explanation: '어디에서 합니까? → 3층 회의실에서 한다고 들었어요.'
  },
  {
    bankId: 'L33',
    chapter: 99,
    type: 'continuation',
    question: '다음을 듣고 이어지는 말을 고르십시오.',
    audioScript: '여: 이게 비상구 표지니까 불이 나면 이 문으로 나가면 돼요.',
    options: ['① 비상구가 어디인지 가르쳐 주세요.', '② 불이 나자마자 밖으로 대피했어요.', '③ 소화기가 있어서 빨리 불을 껐어요.', '④ 비상구 위치를 잘 기억해 놓을게요.'],
    correctIndex: 3,
    explanation: '비상구 표지 설명 → 비상구 위치를 잘 기억해 놓을게요.'
  },
  {
    bankId: 'L34',
    chapter: 99,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 것을 고르십시오.',
    audioScript: '여: 언제 집들이를 해요?\n남: 이월 오 일에 해요.',
    options: ['① 달력에 2월 5일이 표시되어 있습니다.', '② 달력에 3월 5일이 표시되어 있습니다.', '③ 달력에 2월 15일이 표시되어 있습니다.', '④ 달력에 1월 5일이 표시되어 있습니다.'],
    correctIndex: 0,
    explanation: '이월 오 일 = 2월 5일; 이월 = 2월'
  },
  {
    bankId: 'L35',
    chapter: 99,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 것을 고르십시오.',
    audioScript: '남: 저 큰 프라이팬은 얼마예요?\n여: 만 사천칠백 원이에요.',
    options: ['① 14,700원이라고 적혀 있습니다.', '② 13,700원이라고 적혀 있습니다.', '③ 15,700원이라고 적혀 있습니다.', '④ 24,700원이라고 적혀 있습니다.'],
    correctIndex: 0,
    explanation: '만 사천칠백 원 = 14,700원'
  },
  {
    bankId: 'L36',
    chapter: 99,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 것을 고르십시오.',
    audioScript: '남: 이 절연 안전모는 한 개에 얼마예요?\n여: 삼만 오천 원이에요.',
    options: ['① 30,000원', '② 35,000원', '③ 25,000원', '④ 40,000원'],
    correctIndex: 1,
    explanation: '삼만 오천 원 = 35,000원'
  },
  {
    bankId: 'L37',
    chapter: 99,
    type: 'comprehension',
    question: '안경은 어디에 있습니까?',
    audioScript: '남: 안경은 어디에 있습니까?\n여: 서류 옆에 있습니다.',
    options: ['① 시계 아래에 있습니다.', '② 가방 안에 있습니다.', '③ 의자 밑에 있습니다.', '④ 서류 옆에 있습니다.'],
    correctIndex: 3,
    explanation: '여: 서류 옆에 있습니다.'
  },
  {
    bankId: 'L38',
    chapter: 99,
    type: 'comprehension',
    question: '남자가 이곳에 온 이유는 무엇입니까?',
    audioScript: '남: 저, 실례합니다. 오늘 지하철에서 검은색 가방을 잃어버렸는데요.\n여: 몇 시쯤에 어느 역에서 내리셨는지 말씀해 주시겠어요?\n남: 오후 세 시쯤에 2호선 시청역이요. 가방 안에 지갑과 노트북이 들어 있습니다.',
    options: ['① 노트북 수리를 맡기려고', '② 지하철 표를 구입하려고', '③ 잃어버린 가방을 찾으려고', '④ 내려야 할 역을 물어보려고'],
    correctIndex: 2,
    explanation: '지하철에서 검은색 가방을 잃어버렸다 → 잃어버린 가방을 찾으려고'
  },
  {
    bankId: 'L39',
    chapter: 99,
    type: 'comprehension',
    question: '점심시간 전까지 포장 작업을 끝내야 하는 이유는 무엇입니까?',
    audioScript: '남: 포장 작업이 얼마나 남았어요?\n여: 상자를 테이프로 밀봉한 다음에 라벨을 붙이면 돼요.\n남: 오후에 출고해야 되니까 점심시간 전까지 마무리해 주세요.\n여: 네. 늦지 않게 준비해 놓을게요.',
    options: ['① 작업 시간이 많이 걸려서', '② 포장할 물건이 너무 많아서', '③ 오후에 라벨을 붙여야 해서', '④ 오후에 제품을 출고해야 해서'],
    correctIndex: 3,
    explanation: '오후에 출고해야 되니까 → 오후에 제품을 출고해야 해서'
  },
  {
    bankId: 'L40',
    chapter: 99,
    type: 'comprehension',
    question: '다음 중 들은 내용과 같은 것은 무엇입니까?',
    audioScript: '여: 이번에 새로 옮긴 공장은 분위기가 어때요? 일이 힘들지 않아요?\n남: 처음 하는 일이라서 좀 힘들긴 한데 동료들이 잘 도와줘서 괜찮아요.\n여: 다행이네요. 공장장님은 어떠세요? 친절하세요?\n남: 네. 항상 저희를 배려해 주세요. 아플 때는 병원에도 같이 가 주세요.',
    options: ['① 남자는 여자와 같은 공장에서 일합니다.', '② 남자는 아직 공장장님을 못 만났습니다.', '③ 남자는 새 회사 사람들이 마음에 듭니다.', '④ 남자는 이전 공장에서와 같은 일을 합니다.'],
    correctIndex: 2,
    explanation: '동료들이 잘 도와주고 공장장님도 배려해 줌 → 새 회사 사람들이 마음에 듭니다.'
  },
  // ─── NEW AGRICULTURE LISTENING (Book 2 — 2026 Prediction) ────────────────
  {
    bankId: 'L41',
    chapter: 45,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '남: 지금 뭘 하고 있어요?\n여: 비닐하우스에서 방울토마토를 따고 있어요.',
    options: ['① 밭에 씨를 뿌리는 그림', '② 비닐하우스에서 작물을 수확하는 그림', '③ 트랙터로 밭을 가는 그림', '④ 물을 주고 있는 그림'],
    correctIndex: 1,
    explanation: '방울토마토를 따다 = 비닐하우스에서 작물을 수확하는 그림'
  },
  {
    bankId: 'L42',
    chapter: 45,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '남: 오늘 밭에 비료를 뿌려야 해요?',
    options: ['① 비료를 창고에 넣었어요.', '② 네, 오전에 뿌리면 돼요.', '③ 비료가 없어서 살까요?', '④ 아니요, 비료를 좋아해요.'],
    correctIndex: 1,
    explanation: '비료를 뿌려야 해요? → 네, 오전에 뿌리면 돼요.'
  },
  {
    bankId: 'L43',
    chapter: 45,
    type: 'topic',
    question: '두 사람은 무엇에 대해 말하고 있습니까?',
    audioScript: '남: 배추가 다 자랐는데 수확 시기를 놓칠 것 같아요.\n여: 그럼 내일 사람을 더 불러서 빨리 수확합시다.',
    options: ['① 배추 가격', '② 배추 수확 일정', '③ 배추 보관 방법', '④ 새 인력 모집'],
    correctIndex: 1,
    explanation: '수확 시기를 놓칠까 봐 빨리 수확하자 = 배추 수확 일정에 대한 대화'
  },
  {
    bankId: 'L44',
    chapter: 45,
    type: 'next-action',
    question: '여자가 이어서 할 행동은 무엇입니까?',
    audioScript: '남: 오늘 모종을 다 심었어요?\n여: 아직요. 아까부터 물이 안 나와서요.\n남: 물 호스 연결 상태를 확인해 보세요. 빠진 것 같아요.\n여: 네, 지금 바로 확인해 볼게요.',
    options: ['① 모종을 심습니다.', '② 사장님께 연락합니다.', '③ 물 호스 연결 상태를 확인합니다.', '④ 새 물 호스를 구매하러 갑니다.'],
    correctIndex: 2,
    explanation: '여자: 물 호스 연결 상태를 확인해 볼게요 → 물 호스 확인'
  },
  {
    bankId: 'L45',
    chapter: 45,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '남: 오늘 할 일이 뭐예요?\n여: 과수원에 농약을 살포해야 해요.',
    options: ['① 과일을 따는 그림', '② 농약을 뿌리는 그림', '③ 풀을 제거하는 그림', '④ 비료를 주는 그림'],
    correctIndex: 1,
    explanation: '농약을 살포하다 = 분무기로 농약을 뿌리는 그림'
  },
  {
    bankId: 'L46',
    chapter: 46,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '여: 닭장 청소를 언제 할 거예요?',
    options: ['① 닭장이 더러워졌어요.', '② 오전에 청소할게요.', '③ 닭장이 크지 않아요.', '④ 청소하는 것이 힘들어요.'],
    correctIndex: 1,
    explanation: '언제 할 거예요? → 시간 답변: 오전에 청소할게요.'
  },
  {
    bankId: 'L47',
    chapter: 46,
    type: 'comprehension',
    question: '여자가 다음에 할 일은 무엇입니까?',
    audioScript: '남: 사장님, 소들이 이틀째 밥을 잘 안 먹는 것 같아요. 콧물도 나오고요.\n여: 그럼 수의사한테 연락해서 진찰을 받아야겠어요.',
    options: ['① 사료를 더 구입합니다.', '② 소들에게 직접 약을 줍니다.', '③ 수의사에게 연락합니다.', '④ 새로운 소를 구매합니다.'],
    correctIndex: 2,
    explanation: '수의사한테 연락해서 진찰을 받아야겠어요 = 수의사에게 연락하는 것이 다음 행동'
  },
  {
    bankId: 'L48',
    chapter: 46,
    type: 'comprehension',
    question: '방역을 하는 이유는 무엇입니까?',
    audioScript: '남: 다음 주에 방역을 한다는 게 사실이에요?\n여: 네. 이웃 농장에서 조류 독감이 발생했다고 해서 예방 차원에서 하는 거예요.\n남: 그럼 그날은 외부인 출입을 막아야겠네요.\n여: 맞아요. 소독 게이트도 준비해야 해요.',
    options: ['① 정기적인 방역 일정이 되어서', '② 이웃 농장에 조류 독감이 발생해서', '③ 닭들이 살이 빠져서', '④ 계절이 바뀌는 시기라서'],
    correctIndex: 1,
    explanation: '이웃 농장에서 조류 독감 발생 → 예방 차원에서 방역 실시'
  },
  // ─── NEW INDUSTRY LISTENING (Book 2 — 2026 Prediction) ──────────────────
  {
    bankId: 'L49',
    chapter: 37,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '남: 지금 뭐 해요?\n여: 금속 파이프를 그라인더로 절단하고 있어요.',
    options: ['① 드릴로 구멍을 뚫는 그림', '② 그라인더로 파이프를 자르는 그림', '③ 용접기로 부품을 연결하는 그림', '④ 스패너로 볼트를 조이는 그림'],
    correctIndex: 1,
    explanation: '그라인더로 절단하다 = 그라인더로 파이프를 자르는 그림'
  },
  {
    bankId: 'L50',
    chapter: 37,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '남: 용접 작업복은 어디에 있어요?',
    options: ['① 창고에 있어요.', '② 일이 많아요.', '③ 어제 용접했어요.', '④ 용접을 잘해요.'],
    correctIndex: 0,
    explanation: '어디에 있어요? → 장소 답변: 창고에 있어요.'
  },
  {
    bankId: 'L51',
    chapter: 38,
    type: 'topic',
    question: '여자는 무엇에 대해 말하고 있습니까?',
    audioScript: '여: 오늘 작업 순서를 설명할게요. 먼저 도면을 확인하고 재료를 준비하세요. 그다음 선반으로 부품을 가공하고, 마지막으로 조립하면 됩니다.',
    options: ['① 작업 순서', '② 기계 종류', '③ 부품 규격', '④ 안전 수칙'],
    correctIndex: 0,
    explanation: '도면 확인 → 재료 준비 → 가공 → 조립 = 작업 순서에 대한 설명'
  },
  {
    bankId: 'L52',
    chapter: 37,
    type: 'continuation',
    question: '다음을 듣고 이어지는 말로 가장 알맞은 것을 고르십시오.',
    audioScript: '남: 기계에서 이상한 소리가 나는데 어떻게 해야 돼요?',
    options: ['① 더 빨리 작업하세요.', '② 기름을 더 넣어 보세요.', '③ 즉시 기계를 끄고 관리자에게 알리세요.', '④ 소리가 멈출 때까지 계속 작업하세요.'],
    correctIndex: 2,
    explanation: '기계 이상 소리 → 즉시 정지 + 관리자 보고 = 올바른 안전 처리'
  },
  {
    bankId: 'L53',
    chapter: 38,
    type: 'next-action',
    question: '남자가 이어서 할 행동은 무엇입니까?',
    audioScript: '여: 마두 씨, 이번 주 금요일까지 부품 500개를 조립해야 해요.\n남: 혼자서는 힘들 것 같아요. 사람이 더 필요해요.\n여: 그럼 반장님께 말씀드려서 추가 인원을 요청해 보세요.\n남: 알겠습니다. 바로 말씀드릴게요.',
    options: ['① 부품 조립을 시작합니다.', '② 반장님께 추가 인원을 요청합니다.', '③ 일정을 다음 주로 미룹니다.', '④ 혼자 조립을 계속합니다.'],
    correctIndex: 1,
    explanation: '남자: 바로 반장님께 말씀드릴게요 = 반장님께 추가 인원 요청'
  },
  {
    bankId: 'L54',
    chapter: 39,
    type: 'comprehension',
    question: '다음 중 들은 내용과 같은 것은 무엇입니까?',
    audioScript: '남: 오늘 도장 작업이 있어요. 페인트 냄새가 독하니까 환기를 잘 해야 해요.\n여: 방독 마스크도 착용해야 되죠?\n남: 네. 그리고 작업 중에 음식물 섭취는 금지예요.',
    options: ['① 도장 작업 중에는 마스크를 착용하지 않아도 됩니다.', '② 작업 중에 음식을 먹어도 됩니다.', '③ 도장 작업 시 환기가 필요합니다.', '④ 마스크보다 환기가 더 중요합니다.'],
    correctIndex: 2,
    explanation: '환기를 잘 해야 해요 = 도장 작업 시 환기 필요'
  },
  {
    bankId: 'L55',
    chapter: 39,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '여: 작업 전에 안전모를 반드시 착용해야 해요.\n남: 네, 알겠습니다.',
    options: ['① 안전장갑을 끼고 있습니다.', '② 안전모를 쓰고 있습니다.', '③ 보안경을 착용하고 있습니다.', '④ 안전화를 신고 있습니다.'],
    correctIndex: 1,
    explanation: '안전모를 착용해야 한다 → 안전모를 쓰고 있는 그림'
  },
  {
    bankId: 'L56',
    chapter: 40,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '여: 어제 야근을 얼마나 했어요?',
    options: ['① 야근 수당을 받았어요.', '② 두 시간 했어요.', '③ 내일도 야근이에요.', '④ 야근이 힘들어요.'],
    correctIndex: 1,
    explanation: '얼마나 했어요? → 기간/시간 답변: 두 시간 했어요.'
  },
  {
    bankId: 'L57',
    chapter: 40,
    type: 'comprehension',
    question: '납품 시간은 언제입니까?',
    audioScript: '여: 포장 작업이 다 끝났어요?\n남: 조금 남았어요. 상자에 테이프만 붙이면 돼요.\n여: 오늘 오후 세 시에 납품해야 하니까 얼른 마무리해요.\n남: 두 시까지는 다 끝낼 수 있어요.',
    options: ['① 오전 두 시', '② 오후 두 시', '③ 오후 세 시', '④ 내일 오전'],
    correctIndex: 2,
    explanation: '오늘 오후 세 시에 납품해야 합니다.'
  },
  {
    bankId: 'L58',
    chapter: 40,
    type: 'comprehension',
    question: '초과 근무 수당은 기본 시급의 몇 배입니까?',
    audioScript: '남: 이번 달 초과 근무 시간이 12시간이에요.\n여: 그럼 초과 근무 수당은 기본 시급의 1.5배로 계산해서 이번 달 급여와 함께 드릴게요.',
    options: ['① 1배', '② 1.5배', '③ 2배', '④ 3배'],
    correctIndex: 1,
    explanation: '초과 근무 수당 = 기본 시급의 1.5배'
  },
  {
    bankId: 'L59',
    chapter: 38,
    type: 'topic',
    question: '이 대화는 무엇에 대한 내용입니까?',
    audioScript: '남: 오늘 안전 교육이 있는 거 알고 있어요?\n여: 네. 화학물질 취급에 관한 교육이라고 들었어요.\n남: 두 시부터 3층 교육실에서 한대요.\n여: 늦지 않게 가야겠어요.',
    options: ['① 안전 교육 일정', '② 화학물질 취급 방법', '③ 작업 일정 변경', '④ 교육실 예약'],
    correctIndex: 0,
    explanation: '언제, 어디서 안전 교육이 있는지 = 안전 교육 일정에 대한 대화'
  },
  {
    bankId: 'L60',
    chapter: 38,
    type: 'next-action',
    question: '남자가 이어서 할 행동은 무엇입니까?',
    audioScript: '여: 마두 씨, 생산 라인에 문제가 생겼어요. 기계가 멈췄어요.\n남: 제가 확인해 볼까요?\n여: 혼자 하기 위험해요. 전원을 내리고 정비팀에 연락해 주세요.\n남: 알겠어요. 바로 연락할게요.',
    options: ['① 기계를 직접 수리합니다.', '② 생산 라인을 재가동합니다.', '③ 전원을 끄고 정비팀에 연락합니다.', '④ 여자와 함께 기계를 확인합니다.'],
    correctIndex: 2,
    explanation: '전원을 내리고 정비팀에 연락해 주세요 = 남자의 다음 행동'
  },
  // ─── DAILY LIFE / GENERAL LISTENING (Book 1 — 2026 Prediction) ────────────
  {
    bankId: 'L61',
    chapter: 36,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '남: 저 사람들은 뭐 해요?\n여: 소화기로 불을 끄고 있어요.',
    options: ['① 청소를 하고 있습니다.', '② 소화기로 불을 끄고 있습니다.', '③ 비상구로 대피하고 있습니다.', '④ 소방차를 기다리고 있습니다.'],
    correctIndex: 1,
    explanation: '소화기로 불을 끄다 = 소화기 사용하는 그림'
  },
  {
    bankId: 'L62',
    chapter: 25,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '여: 오늘 몸이 안 좋아서 조기 퇴근해도 될까요?',
    options: ['① 병원에서 일찍 퇴근했어요.', '② 어떤 증상이 있는지 말씀해 주세요.', '③ 오늘 일찍 출근했어요.', '④ 오늘 일이 많아요.'],
    correctIndex: 1,
    explanation: '조기 퇴근 요청 → 어떤 증상인지 물어보는 것이 적절한 응답'
  },
  {
    bankId: 'L63',
    chapter: 25,
    type: 'topic',
    question: '두 사람은 무엇에 대해 말하고 있습니까?',
    audioScript: '여: 병원에서 진단서를 받아오셨어요?\n남: 네. 2주 안정이 필요하다고 했어요.\n여: 이 서류를 작성해서 회사에 제출하세요. 산재 처리를 받으실 수 있어요.',
    options: ['① 병원 선택 방법', '② 산재 처리 절차', '③ 진단서 발급 방법', '④ 퇴근 방법'],
    correctIndex: 1,
    explanation: '진단서, 서류 제출, 산재 처리 = 산재 처리 절차에 대한 대화'
  },
  {
    bankId: 'L64',
    chapter: 22,
    type: 'comprehension',
    question: '외국인 근로자 지원센터는 어디에 있습니까?',
    audioScript: '남: 외국인 근로자 지원센터를 찾고 있는데요.\n여: 이 길로 직진하다가 세 번째 사거리에서 왼쪽으로 돌면 오른쪽에 보여요.\n남: 걸어서 얼마나 걸릴까요?\n여: 한 5분 정도요.',
    options: ['① 두 번째 사거리를 왼쪽으로 돌면 있습니다.', '② 세 번째 사거리를 왼쪽으로 돌면 오른쪽에 있습니다.', '③ 세 번째 사거리를 오른쪽으로 돌면 있습니다.', '④ 걸어서 15분 정도 걸립니다.'],
    correctIndex: 1,
    explanation: '세 번째 사거리에서 왼쪽으로 돌면 오른쪽에 보여요.'
  },
  {
    bankId: 'L65',
    chapter: 22,
    type: 'continuation',
    question: '다음을 듣고 이어지는 말로 가장 알맞은 것을 고르십시오.',
    audioScript: '여: 오늘 월급날인데 급여가 제대로 들어왔는지 확인해 봤어요?',
    options: ['① 네, 지금 확인해 볼게요.', '② 아니요, 오늘 휴일이에요.', '③ 네, 빨리 일해야겠어요.', '④ 아니요, 오늘 일이 많아요.'],
    correctIndex: 0,
    explanation: '월급 확인 제안 → 바로 확인하겠다는 것이 자연스러운 응답'
  },
  {
    bankId: 'L66',
    chapter: 22,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '남: ATM기에서 돈을 뽑고 싶은데 어디에 있어요?\n여: 저기 은행 건물 안에 있어요.',
    options: ['① 은행 창구에서 서류를 작성합니다.', '② ATM기에서 돈을 인출합니다.', '③ 편의점에서 물건을 삽니다.', '④ 우체국에서 소포를 보냅니다.'],
    correctIndex: 1,
    explanation: 'ATM기에서 돈을 뽑다 = ATM기에서 돈을 인출하는 그림'
  },
  {
    bankId: 'L67',
    chapter: 24,
    type: 'comprehension',
    question: '여자는 무엇이라고 조언했습니까?',
    audioScript: '남: 한국 음식이 너무 매워서 잘 못 먹어요.\n여: 그럼 처음엔 순두부찌개나 된장찌개 같은 덜 매운 음식부터 먹어 보세요. 조금씩 먹다 보면 익숙해져요.',
    options: ['① 한국 음식 대신 다른 음식을 먹으세요.', '② 처음엔 덜 매운 음식부터 먹어 보세요.', '③ 매운 음식은 절대 먹지 마세요.', '④ 음식에 물을 섞어서 먹으세요.'],
    correctIndex: 1,
    explanation: '덜 매운 음식부터 먹다 보면 익숙해진다 = 여자의 조언'
  },
  {
    bankId: 'L68',
    chapter: 23,
    type: 'comprehension',
    question: '새 숙소에 대해 알 수 있는 것은 무엇입니까?',
    audioScript: '남: 다음 주부터 숙소가 바뀐다는 이야기 들었어요?\n여: 네. 기존 숙소에서 버스로 20분 거리래요.\n남: 출퇴근 시간이 더 길어지겠네요.\n여: 회사에서 통근 버스를 운행한다고 하니까 걱정 안 해도 돼요.',
    options: ['① 기존 숙소와 같은 곳입니다.', '② 회사에서 통근 버스를 운행합니다.', '③ 걸어서 출퇴근할 수 있습니다.', '④ 기존 숙소보다 더 가깝습니다.'],
    correctIndex: 1,
    explanation: '회사에서 통근 버스를 운행한다고 합니다.'
  },
  {
    bankId: 'L69',
    chapter: 22,
    type: 'topic',
    question: '두 사람은 무엇에 대해 말하고 있습니까?',
    audioScript: '남: 고향에 송금하고 싶은데 어떻게 해요?\n여: 은행에 가서 해외 송금 신청서를 작성하면 돼요. 신분증이랑 통장도 가져가야 해요.\n남: 모바일로도 할 수 있어요?\n여: 네, 외국인 등록이 되어 있으면 모바일 뱅킹으로도 할 수 있어요.',
    options: ['① 은행 계좌 개설 방법', '② 해외 송금 방법', '③ 외국인 등록 방법', '④ 모바일 앱 설치 방법'],
    correctIndex: 1,
    explanation: '고향에 송금, 해외 송금 신청서 = 해외 송금 방법에 대한 대화'
  },
  {
    bankId: 'L70',
    chapter: 23,
    type: 'next-action',
    question: '남자가 이어서 할 행동은 무엇입니까?',
    audioScript: '남: 내일이 공휴일이라 쉬는 날인 줄 알았어요.\n여: 우리 회사는 내일도 정상 출근이에요.\n남: 그럼 달력 표시를 지워야겠네요.\n여: 그리고 반장님한테 내일 출근 확인도 해 두세요.',
    options: ['① 내일 집에서 쉽니다.', '② 달력을 수정하고 반장님께 출근을 확인합니다.', '③ 공휴일 수당을 신청합니다.', '④ 반장님께 휴가를 신청합니다.'],
    correctIndex: 1,
    explanation: '달력 수정 + 반장님께 출근 확인 = 남자의 다음 행동'
  },
  {
    bankId: 'L71',
    chapter: 37,
    type: 'word-discrimination',
    question: '다음을 듣고 들은 것을 고르십시오.',
    audioScript: '배출',
    options: ['① 배출', '② 배달', '③ 매출', '④ 배열'],
    correctIndex: 0,
    explanation: '배출(排出) = discharge/emission'
  },
  {
    bankId: 'L72',
    chapter: 38,
    type: 'word-discrimination',
    question: '다음을 듣고 들은 것을 고르십시오.',
    audioScript: '점검',
    options: ['① 점근', '② 점검', '③ 정검', '④ 정건'],
    correctIndex: 1,
    explanation: '점검(點檢) = inspection/check'
  },
  {
    bankId: 'L73',
    chapter: 23,
    type: 'continuation',
    question: '다음을 듣고 이어지는 말로 가장 알맞은 것을 고르십시오.',
    audioScript: '남: 이번 주말에 회사 야유회가 있는데 혹시 아세요?',
    options: ['① 네, 아직 세부 일정을 못 들었어요.', '② 아니요, 내일 야유회가 있어요.', '③ 야유회가 재미없어요.', '④ 야유회는 내년에 있어요.'],
    correctIndex: 0,
    explanation: '야유회 소식에 → 아직 세부 일정을 못 들었다는 자연스러운 응답'
  },
  {
    bankId: 'L74',
    chapter: 25,
    type: 'comprehension',
    question: '남자가 연차를 내일 쓰기 어려운 이유는 무엇입니까?',
    audioScript: '남: 내일 연차 휴가를 쓰려고요.\n여: 연차 신청은 최소 3일 전에 해야 해요. 내일은 너무 촉박하니까 다음 주로 일정을 미루는 게 좋을 것 같아요.\n남: 그렇군요. 알겠습니다.',
    options: ['① 이미 연차를 다 사용해서', '② 최소 3일 전에 신청해야 해서', '③ 내일 중요한 작업이 있어서', '④ 인사팀이 오늘 문을 닫아서'],
    correctIndex: 1,
    explanation: '연차 신청은 최소 3일 전에 해야 해서 내일은 너무 촉박합니다.'
  },
  {
    bankId: 'L75',
    chapter: 24,
    type: 'comprehension',
    question: '여자는 남자에게 어떻게 하라고 조언했습니까?',
    audioScript: '남: 직장 동료가 나한테 자꾸 반말을 해. 기분이 나빠.\n여: 한국에서는 나이에 따라 존댓말을 쓰는 문화가 있어요. 먼저 그 동료에게 정중하게 이야기해 보는 건 어때요?',
    options: ['① 먼저 반말로 이야기하세요.', '② 정중하게 이야기해 보세요.', '③ 반장님에게 신고하세요.', '④ 다른 부서로 옮겨 달라고 하세요.'],
    correctIndex: 1,
    explanation: '정중하게 이야기해 보는 건 어때요? = 여자의 조언'
  },
  {
    bankId: 'L76',
    chapter: 25,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '남: 지금 어디에 있어요?\n여: 의사한테 진찰을 받고 나서 처방전을 받아서 약국에서 약을 사고 있어요.',
    options: ['① 병원 진찰실에 있습니다.', '② 약국에서 약을 구입합니다.', '③ 편의점에서 물건을 삽니다.', '④ 응급실에서 치료를 받습니다.'],
    correctIndex: 1,
    explanation: '약국에서 약을 사고 있다 = 약국에서 약을 구입하는 그림'
  },
  {
    bankId: 'L77',
    chapter: 25,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '남: 이 약은 언제 복용해야 하나요?',
    options: ['① 하루에 세 번, 식후에 드세요.', '② 약이 좀 비쌌어요.', '③ 감기라서 약을 받았어요.', '④ 약국에서 처방을 받으세요.'],
    correctIndex: 0,
    explanation: '언제 복용해야 하나요? → 복용 시기 안내: 하루에 세 번, 식후에 드세요.'
  },
  {
    bankId: 'L78',
    chapter: 25,
    type: 'comprehension',
    question: '남자의 현재 상태는 무엇입니까?',
    audioScript: '여: 자하라 씨, 오늘 몸이 안 좋아요?\n남: 아침부터 열이 나고 목도 아파요.\n여: 그럼 체온을 재어 보세요. 열이 높으면 병원에 가야 해요.\n남: 알겠어요. 체온계 좀 빌려줄 수 있어요?',
    options: ['① 배가 아파요.', '② 열과 목 통증이 있어요.', '③ 손이 다쳤어요.', '④ 머리가 너무 아파요.'],
    correctIndex: 1,
    explanation: '열이 나고 목도 아프다 = 열과 목 통증이 있는 상태'
  },
  {
    bankId: 'L79',
    chapter: 25,
    type: 'comprehension',
    question: '교통사고가 났을 때 먼저 해야 할 일은 무엇입니까?',
    audioScript: '남: 교통사고가 났을 때 어떻게 해야 돼요?\n여: 다친 것 같으면 먼저 119에 신고해서 응급 치료를 받으세요. 그다음에 보험 회사에 연락하고 사고 경위를 정리하면 돼요.',
    options: ['① 보험 회사에 전화합니다.', '② 119에 신고해서 응급 치료를 받습니다.', '③ 경찰서를 방문합니다.', '④ 운전 면허증을 확인합니다.'],
    correctIndex: 1,
    explanation: '먼저 119에 신고해서 응급 치료를 받으세요 = 교통사고 시 첫 번째 할 일'
  },
  {
    bankId: 'L80',
    chapter: 22,
    type: 'comprehension',
    question: '외국인 근로자가 한국에서 통장을 만들려면 무엇이 필요합니까?',
    audioScript: '남: 외국인 근로자도 한국에서 통장을 만들 수 있어요?\n여: 네. 외국인 등록증과 여권을 가지고 은행에 가면 개설할 수 있어요.\n남: 어떤 은행이든 돼요?\n여: 보통은 됩니다.',
    options: ['① 한국인 보증인이 필요합니다.', '② 외국인 등록증과 여권이 필요합니다.', '③ 고용주의 허가서가 필요합니다.', '④ 한국 거주 1년 이상이어야 합니다.'],
    correctIndex: 1,
    explanation: '외국인 등록증과 여권을 가지고 은행에 가면 됩니다.'
  },
  // --- FROM BOOK 2 — LISTENING PICTURE QUESTIONS ---
  {
    bankId: 'L81',
    chapter: 37,
    type: 'picture-match',
    question: '다음을 듣고 그림과 관계있는 것을 고르십시오.',
    audioScript: '남: 이 물건은 뭐예요?\n여: 에어컨이에요. 여름에 시원하게 해 주는 기계예요.',
    imageOptionUrls: ['/images/eps/l37_01.jpg', '/images/eps/l37_02.jpg', '/images/eps/l37_03.jpg', '/images/eps/l37_04.jpg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 0,
    explanation: '공구·도구 사용 — 기숙사 시설'
  },
  {
    bankId: 'L82',
    chapter: 38,
    type: 'picture-match',
    question: '다음을 듣고 그림과 일치하는 것을 고르십시오.',
    audioScript: '남: 저 두 사람이 왜 저래요?\n여: 일 때문에 서로 말다툼을 하고 있어요.',
    imageOptionUrls: ['/images/eps/l38_01.jpg', '/images/eps/l38_02.jpg', '/images/eps/l38_03.jpg', '/images/eps/l38_04.jpg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 2,
    explanation: '직장생활 — 직장 내 행동'
  },
  {
    bankId: 'L83',
    chapter: 43,
    type: 'picture-match',
    question: '다음을 듣고 그림과 일치하는 것을 고르십시오.',
    audioScript: '남: 지금 현장에서 뭘 하고 있어요?\n여: 철근을 쌓아서 옮기고 있어요.',
    imageOptionUrls: ['/images/eps/l43_01.jpg', '/images/eps/l43_02.jpg', '/images/eps/l43_03.jpg', '/images/eps/l43_04.jpg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 1,
    explanation: '건설·철근 — 건설 현장 작업'
  },
  {
    bankId: 'L84',
    chapter: 45,
    type: 'picture-match',
    question: '다음을 듣고 그림과 일치하는 것을 고르십시오.',
    audioScript: '여: 지금 밭에서 뭐 하고 있어요?\n남: 모종을 심고 있어요. 간격을 맞춰서 심어야 해요.',
    imageOptionUrls: ['/images/eps/l45_01.jpg', '/images/eps/l45_02.jpg', '/images/eps/l45_03.jpg', '/images/eps/l45_04.jpg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 2,
    explanation: '농업·재배 — 농업 작업'
  },
  {
    bankId: 'L85',
    chapter: 46,
    type: 'picture-match',
    question: '다음을 듣고 그림과 일치하는 것을 고르십시오.',
    audioScript: '남: 저건 뭐예요?\n여: 부표예요. 바다에서 그물이나 어구의 위치를 표시할 때 사용해요.',
    imageOptionUrls: ['/images/eps/l46_01.jpg', '/images/eps/l46_02.jpg', '/images/eps/l46_03.jpg', '/images/eps/l46_04.jpg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 0,
    explanation: '축산 관리 — 어업 장비'
  },
  {
    bankId: 'L86',
    chapter: 44,
    type: 'picture-match',
    question: '다음을 듣고 그림과 일치하는 것을 고르십시오.',
    audioScript: '여: 페인트 작업을 할 때 왜 조심해야 해요?\n남: 페인트 냄새가 너무 심하기 때문에 마스크를 꼭 써야 해요.',
    imageOptionUrls: ['/images/eps/l44_01.jpg', '/images/eps/l44_02.jpg', '/images/eps/l44_03.jpg', '/images/eps/l44_04.jpg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 1,
    explanation: '페인트 작업 — 작업장 안전'
  },
  {
    bankId: 'L87',
    chapter: 49,
    type: 'picture-match',
    question: '다음을 듣고 그림과 일치하는 것을 고르십시오.',
    audioScript: '남: 높은 곳에서 일할 때는 뭘 착용해야 해요?\n여: 안전대를 꼭 매야 해요. 그리고 안전모도 써야 해요.',
    imageOptionUrls: ['/images/eps/l49_01.jpg', '/images/eps/l49_02.jpg', '/images/eps/l49_03.jpg', '/images/eps/l49_04.jpg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 1,
    explanation: '안전화·보호구 — 고소 작업 보호구'
  },
  {
    bankId: 'L88',
    chapter: 38,
    type: 'picture-match',
    question: '다음을 듣고 그림과 일치하는 것을 고르십시오.',
    audioScript: '여: 민수 씨, 오늘 회의에서 발표했어요?\n남: 네, 자료를 화면에 띄우고 팀원들에게 설명했어요.',
    imageOptionUrls: ['/images/eps/l38b_01.jpg', '/images/eps/l38b_02.jpg', '/images/eps/l38b_03.jpg', '/images/eps/l38b_04.jpg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 0,
    explanation: '직장생활 — 회의/발표'
  },
  // ─── EXTRA AGRICULTURE LISTENING (L89-L92) ────────────────────────────────
  {
    bankId: 'L89',
    chapter: 45,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '남: 오늘 오전에 뭘 할까요?\n여: 밭에 물이 부족하니까 물을 주세요.',
    options: ['① 씨앗을 뿌리는 그림', '② 밭에 물을 주는 그림', '③ 잡초를 뽑는 그림', '④ 트랙터로 밭을 가는 그림'],
    correctIndex: 1,
    explanation: '물을 주다 = 밭에 관수하는 그림'
  },
  {
    bankId: 'L90',
    chapter: 45,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '여: 오늘 수확한 사과는 어디에 보관해요?',
    options: ['① 사과를 좋아해요.', '② 창고에 쌓아 두면 돼요.', '③ 사과가 많이 있어요.', '④ 내일 수확할 거예요.'],
    correctIndex: 1,
    explanation: '어디에 보관해요? → 장소 답변: 창고에 쌓아 두면 돼요.'
  },
  {
    bankId: 'L91',
    chapter: 46,
    type: 'comprehension',
    question: '다음 중 들은 내용과 같은 것은 무엇입니까?',
    audioScript: '남: 이번 주에 돼지를 출하해야 하는데 체중이 얼마나 돼요?\n여: 대부분 100킬로가 넘었어요. 한 마리만 좀 더 키워야 할 것 같아요.\n남: 알겠어요. 그럼 먼저 준비된 돼지들만 출하 준비를 합시다.',
    options: ['① 모든 돼지가 출하 기준에 맞습니다.', '② 돼지 한 마리는 더 키울 예정입니다.', '③ 이번 주 출하를 취소했습니다.', '④ 체중이 100킬로 미만인 돼지가 많습니다.'],
    correctIndex: 1,
    explanation: '한 마리만 좀 더 키워야 할 것 같다 = 돼지 한 마리는 더 키울 예정'
  },
  {
    bankId: 'L92',
    chapter: 45,
    type: 'next-action',
    question: '남자가 이어서 할 행동은 무엇입니까?',
    audioScript: '여: 잡초가 많이 자랐네요. 오늘 제초 작업을 해야 할 것 같아요.\n남: 제초제를 써요, 아니면 손으로 뽑아요?\n여: 손으로 뽑으면 시간이 너무 걸리니까 제초제를 사용하세요. 창고에 있어요.\n남: 알겠어요. 지금 바로 가져올게요.',
    options: ['① 손으로 잡초를 뽑습니다.', '② 제초제를 창고에서 가져옵니다.', '③ 제초기를 주문합니다.', '④ 잡초 제거를 내일로 미룹니다.'],
    correctIndex: 1,
    explanation: '창고에서 제초제를 가져오겠다고 합니다.'
  },
  // ─── EXTRA INDUSTRY LISTENING (L93-L96) ───────────────────────────────────
  {
    bankId: 'L93',
    chapter: 37,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '남: 지금 뭐 하고 있어요?\n여: 도면을 보면서 치수를 재고 있어요.',
    options: ['① 용접을 하는 그림', '② 도면을 보며 치수를 재는 그림', '③ 나사를 조이는 그림', '④ 재료를 절단하는 그림'],
    correctIndex: 1,
    explanation: '도면을 보면서 치수를 재다 = 측정 작업 그림'
  },
  {
    bankId: 'L94',
    chapter: 38,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '여: 이 부품은 왜 교체해야 해요?',
    options: ['① 창고에 새 부품이 있어요.', '② 마모가 심해서 더 이상 쓰기 어려워요.', '③ 부품이 너무 비싸요.', '④ 교체하는 방법을 모르겠어요.'],
    correctIndex: 1,
    explanation: '왜 교체해야 해요? → 이유 답변: 마모가 심해서 더 이상 쓰기 어려워요.'
  },
  {
    bankId: 'L95',
    chapter: 39,
    type: 'comprehension',
    question: '작업을 중단한 이유는 무엇입니까?',
    audioScript: '남: 반장님, 프레스 기계에서 냄새가 나서 작업을 잠깐 멈췄어요.\n여: 잘했어요. 냄새가 나면 즉시 전원을 차단해야 해요. 정비팀에 바로 연락했어요?\n남: 아직이요. 지금 연락할게요.',
    options: ['① 작업 할당량을 초과해서', '② 기계에서 이상한 냄새가 나서', '③ 점심 시간이 되어서', '④ 재료가 부족해서'],
    correctIndex: 1,
    explanation: '프레스 기계에서 냄새가 나서 작업을 멈췄습니다.'
  },
  {
    bankId: 'L96',
    chapter: 37,
    type: 'next-action',
    question: '여자가 이어서 할 행동은 무엇입니까?',
    audioScript: '남: 오늘 작업 전에 장비 점검을 해야 해요.\n여: 어떤 장비를 점검해야 해요?\n남: 용접기랑 보호 장비를 확인해 주세요.\n여: 알겠어요. 지금 바로 시작할게요.',
    options: ['① 용접 작업을 시작합니다.', '② 작업 일정을 변경합니다.', '③ 용접기와 보호 장비를 점검합니다.', '④ 장비를 새로 주문합니다.'],
    correctIndex: 2,
    explanation: '용접기랑 보호 장비를 확인해 달라고 했으므로 점검을 시작합니다.'
  },
  // ─── EXTRA DAILY LIFE / GENERAL LISTENING (L97-L108) ──────────────────────
  {
    bankId: 'L97',
    chapter: 99,
    type: 'word-discrimination',
    question: '다음을 듣고 들은 것을 고르십시오.',
    audioScript: '조립',
    options: ['① 조립', '② 조약', '③ 저립', '④ 조업'],
    correctIndex: 0,
    explanation: '조립(組立) = assembly; 비슷한 발음과 구별'
  },
  {
    bankId: 'L98',
    chapter: 99,
    type: 'word-discrimination',
    question: '다음을 듣고 들은 것을 고르십시오.',
    audioScript: '납품',
    options: ['① 나품', '② 낙품', '③ 납품', '④ 남품'],
    correctIndex: 2,
    explanation: '납품(納品) = delivery of goods; ㅂ 받침 주의'
  },
  {
    bankId: 'L99',
    chapter: 99,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 것을 고르십시오.',
    audioScript: '남: 소포를 보내러 왔어요.',
    options: ['① 은행에서 통장을 만들고 있습니다.', '② 우체국에서 소포를 보냅니다.', '③ 편의점에서 물건을 사고 있습니다.', '④ 병원에서 진찰을 받고 있습니다.'],
    correctIndex: 1,
    explanation: '소포를 보내다 = 우체국에서 소포를 보내는 그림'
  },
  {
    bankId: 'L100',
    chapter: 25,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '여: 산업재해 처리를 받으려면 어디에 연락해야 해요?',
    options: ['① 회사 인사팀이나 근로복지공단에 연락하면 돼요.', '② 다쳤으니까 일을 쉬어야 돼요.', '③ 병원비가 너무 비싸요.', '④ 일하다가 다쳤어요.'],
    correctIndex: 0,
    explanation: '산재 처리 → 회사 인사팀이나 근로복지공단 연락'
  },
  {
    bankId: 'L101',
    chapter: 23,
    type: 'continuation',
    question: '다음을 듣고 이어지는 말로 가장 알맞은 것을 고르십시오.',
    audioScript: '남: 기숙사 방이 너무 더워서 잠을 못 잤어요.',
    options: ['① 관리자에게 에어컨을 켜달라고 해 보세요.', '② 방이 넓어서 좋겠네요.', '③ 기숙사가 가까워서 편하겠어요.', '④ 아침에 일찍 일어나는 게 중요해요.'],
    correctIndex: 0,
    explanation: '방이 덥다는 불편 호소 → 관리자에게 에어컨 요청 제안이 자연스럽습니다.'
  },
  {
    bankId: 'L102',
    chapter: 22,
    type: 'comprehension',
    question: '남자가 은행에 온 이유는 무엇입니까?',
    audioScript: '남: 안녕하세요. 제 통장으로 돈이 들어온 것 같은데 확인이 안 돼요.\n여: 통장 내역을 출력해 드릴게요. 신분증 가져오셨어요?\n남: 네, 여기 있어요.',
    options: ['① 통장을 새로 만들러 왔습니다.', '② 해외 송금을 하러 왔습니다.', '③ 입금 내역을 확인하러 왔습니다.', '④ 비밀번호를 변경하러 왔습니다.'],
    correctIndex: 2,
    explanation: '통장으로 들어온 돈을 확인하러 왔습니다.'
  },
  {
    bankId: 'L103',
    chapter: 24,
    type: 'next-action',
    question: '여자가 이어서 할 행동은 무엇입니까?',
    audioScript: '남: 이번 주 토요일에 외국인 근로자 한국어 수업이 있어요. 신청했어요?\n여: 아직 안 했어요. 어디서 신청해요?\n남: 지원센터 홈페이지에서 신청하면 돼요.\n여: 그럼 지금 바로 신청해야겠어요.',
    options: ['① 지원센터에 직접 방문합니다.', '② 한국어 수업에 바로 참석합니다.', '③ 홈페이지에서 수업을 신청합니다.', '④ 남자에게 대신 신청해 달라고 합니다.'],
    correctIndex: 2,
    explanation: '홈페이지에서 신청하겠다고 했으므로 홈페이지에서 신청합니다.'
  },
  {
    bankId: 'L104',
    chapter: 99,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 것을 고르십시오.',
    audioScript: '여: 버스를 타고 출근해요.',
    options: ['① 지하철을 타고 있습니다.', '② 자전거를 타고 있습니다.', '③ 버스를 타고 있습니다.', '④ 걸어서 이동합니다.'],
    correctIndex: 2,
    explanation: '버스를 타고 출근 → 버스를 타고 있는 그림'
  },
  {
    bankId: 'L105',
    chapter: 22,
    type: 'response',
    question: '다음을 듣고 물음에 알맞은 대답을 고르십시오.',
    audioScript: '남: 이 지역에서 외국인이 이용할 수 있는 의료 통역 서비스가 있어요?',
    options: ['① 네, 외국인 지원센터에서 통역 서비스를 제공해요.', '② 아니요, 한국인만 이용할 수 있어요.', '③ 병원이 너무 멀어요.', '④ 통역이 필요 없어요.'],
    correctIndex: 0,
    explanation: '의료 통역 서비스 문의 → 외국인 지원센터 안내가 적절한 응답'
  },
  {
    bankId: 'L106',
    chapter: 25,
    type: 'comprehension',
    question: '남자가 휴가를 사용하지 못하는 이유는 무엇입니까?',
    audioScript: '여: 이번 주에 휴가 쓰려고요?\n남: 쓰고 싶은데 이번 주에 납품 일정이 있어서 못 쓸 것 같아요.\n여: 그럼 납품이 끝나고 나서 쓰는 건 어때요?\n남: 그리고 다음 달 초에 신규 직원 교육도 있어서 다음 달도 좀 어려울 것 같아요.',
    options: ['① 연차 일수가 남아 있지 않아서', '② 납품 일정과 신규 직원 교육이 있어서', '③ 반장님이 허락하지 않아서', '④ 같이 쉴 동료가 없어서'],
    correctIndex: 1,
    explanation: '납품 일정 + 다음 달 신규 직원 교육 = 2가지 이유로 휴가를 쓰기 어렵습니다.'
  },
  {
    bankId: 'L107',
    chapter: 24,
    type: 'topic',
    question: '두 사람은 무엇에 대해 말하고 있습니까?',
    audioScript: '남: 한국에 온 지 얼마나 됐어요?\n여: 6개월 됐어요. 처음에 음식이 많이 달라서 적응하기 힘들었어요.\n남: 저도 처음엔 그랬는데 지금은 한국 음식이 입에 맞아요.\n여: 맞아요. 저도 요즘은 된장찌개가 맛있어요.',
    options: ['① 한국어 공부 방법', '② 한국 생활 적응', '③ 고향의 음식 문화', '④ 식당 추천'],
    correctIndex: 1,
    explanation: '한국에 온 기간, 음식 적응 = 한국 생활 적응에 대한 대화'
  },
  {
    bankId: 'L108',
    chapter: 23,
    type: 'next-action',
    question: '남자가 이어서 할 행동은 무엇입니까?',
    audioScript: '여: 자하라 씨, 이번 주 금요일에 기숙사 점검이 있는데 알고 있어요?\n남: 몰랐어요. 방 청소를 해야겠네요.\n여: 네. 그리고 소화기 위치도 확인해 두세요.\n남: 알겠어요. 지금 청소하고 소화기도 확인할게요.',
    options: ['① 점검 결과를 기다립니다.', '② 기숙사 담당자에게 연락합니다.', '③ 방 청소를 하고 소화기 위치를 확인합니다.', '④ 소화기를 새로 구입합니다.'],
    correctIndex: 2,
    explanation: '청소하고 소화기도 확인하겠다고 했습니다.'
  },
  // ─── NEW PICTURE-MATCH LISTENING (2026 — ภาพประกอบเพิ่มเติม) ──────────────────
  {
    bankId: 'L109',
    chapter: 45,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '남: 지금 뭐 해요?\n여: 트랙터로 밭을 갈고 있어요.',
    imageOptionUrls: ['/images/eps/l109_01.svg','/images/eps/l109_02.svg','/images/eps/l109_03.svg','/images/eps/l109_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 1,
    explanation: '트랙터로 밭을 갈다 = 경운 작업 그림 (plowing with tractor)'
  },
  {
    bankId: 'L110',
    chapter: 46,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '남: 오전에 무슨 작업을 해요?\n여: 닭장 청소하고 소독해야 해요.',
    imageOptionUrls: ['/images/eps/l110_01.svg','/images/eps/l110_02.svg','/images/eps/l110_03.svg','/images/eps/l110_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 1,
    explanation: '닭장 청소하다 = to clean a chicken coop (양계 위생 관리)'
  },
  {
    bankId: 'L111',
    chapter: 46,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '여: 저건 뭐예요?\n남: 갈퀴예요. 밭에서 잡초나 낙엽을 긁어모을 때 써요.',
    imageOptionUrls: ['/images/eps/l111_01.svg','/images/eps/l111_02.svg','/images/eps/l111_03.svg','/images/eps/l111_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 2,
    explanation: '갈퀴 = rake (밭에서 긁어모으는 농기구)'
  },
  {
    bankId: 'L112',
    chapter: 38,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '남: 지금 무슨 작업을 해요?\n여: 컨베이어 벨트에서 제품을 포장하고 있어요.',
    imageOptionUrls: ['/images/eps/l112_01.svg','/images/eps/l112_02.svg','/images/eps/l112_03.svg','/images/eps/l112_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 1,
    explanation: '컨베이어 벨트에서 포장하다 = packaging products on a conveyor belt'
  },
  {
    bankId: 'L113',
    chapter: 47,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '여: 저 사람들이 뭘 하고 있어요?\n남: 제품을 팔레트에 쌓고 있어요.',
    imageOptionUrls: ['/images/eps/l113_01.svg','/images/eps/l113_02.svg','/images/eps/l113_03.svg','/images/eps/l113_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 1,
    explanation: '팔레트에 쌓다 = to stack products on a pallet (물류 창고 작업)'
  },
  {
    bankId: 'L114',
    chapter: 39,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '남: 오늘 용접 작업이 있는데 뭘 착용해야 해요?\n여: 용접 마스크랑 장갑을 꼭 착용하세요.',
    imageOptionUrls: ['/images/eps/l114_01.svg','/images/eps/l114_02.svg','/images/eps/l114_03.svg','/images/eps/l114_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 2,
    explanation: '용접 마스크와 장갑 착용 = wearing welding mask and gloves for welding work'
  },
  {
    bankId: 'L115',
    chapter: 22,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '여: 어디 가요?\n남: 은행에 해외 송금하러 가요.',
    imageOptionUrls: ['/images/eps/l115_01.svg','/images/eps/l115_02.svg','/images/eps/l115_03.svg','/images/eps/l115_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 1,
    explanation: '해외 송금하러 은행에 가다 = going to a bank for international money transfer'
  },
  {
    bankId: 'L116',
    chapter: 99,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 것을 고르십시오.',
    audioScript: '남: 이 안전장갑은 한 짝에 얼마예요?\n여: 만 이천 원이에요.',
    imageOptionUrls: ['/images/eps/l116_01.svg','/images/eps/l116_02.svg','/images/eps/l116_03.svg','/images/eps/l116_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 1,
    explanation: '만 이천 원 = 12,000원 (숫자 청취 문제)'
  },
  {
    bankId: 'L117',
    chapter: 99,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 것을 고르십시오.',
    audioScript: '남: 이 보안경은 한 개에 얼마예요?\n여: 팔천오백 원이에요.',
    imageOptionUrls: ['/images/eps/l117_01.svg','/images/eps/l117_02.svg','/images/eps/l117_03.svg','/images/eps/l117_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 2,
    explanation: '팔천오백 원 = 8,500원 (숫자 청취 문제)'
  },
  {
    bankId: 'L118',
    chapter: 24,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '남: 오늘 점심으로 뭘 먹었어요?\n여: 삼겹살을 구워 먹었어요.',
    imageOptionUrls: ['/images/eps/l118_01.svg','/images/eps/l118_02.svg','/images/eps/l118_03.svg','/images/eps/l118_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 2,
    explanation: '삼겹살을 구워 먹다 = grilling and eating pork belly (삼겹살)'
  },
  {
    bankId: 'L119',
    chapter: 38,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '여: 지금 뭐 해요?\n남: 작업 일지를 작성하고 있어요.',
    imageOptionUrls: ['/images/eps/l119_01.svg','/images/eps/l119_02.svg','/images/eps/l119_03.svg','/images/eps/l119_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 1,
    explanation: '작업 일지를 작성하다 = to fill in a work log (직장 기록 업무)'
  },
  {
    bankId: 'L120',
    chapter: 53,
    type: 'picture-match',
    question: '다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.',
    audioScript: '남: 저 표지는 뭐예요?\n여: 안전 표지예요. 이 구역에서는 안전화를 반드시 착용해야 한다는 뜻이에요.',
    imageOptionUrls: ['/images/eps/l120_01.svg','/images/eps/l120_02.svg','/images/eps/l120_03.svg','/images/eps/l120_04.svg'],
    options: ['①', '②', '③', '④'],
    correctIndex: 2,
    explanation: '안전화 착용 표지 = mandatory safety shoes sign (PPE 의무 착용 구역)'
  },
];

// ─── GENERATE EXAM SET ─────────────────────────────────────────────────────
/**
 * Seeded Fisher-Yates shuffle using a simple LCG.
 * Returns a new shuffled copy of the array.
 */
function seededShuffle(arr, seed) {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Shuffle the answer options of a question and return a new question object
 * with updated correctIndex. Uses a per-question seed so it's deterministic.
 *
 * If targetCorrect is provided, the correct answer is GUARANTEED to land at
 * that position (0–3), while the other 3 options are shuffled randomly.
 * This ensures uniform distribution (exactly 5 per position per exam set).
 */
function shuffleOptions(q, seed, targetCorrect = null) {
  const SYMS = ['①', '②', '③', '④'];
  const strip = (opt) => opt.replace(/^[①②③④]\s*/, '').trim();
  let s = seed;

  if (targetCorrect !== null) {
    // Guaranteed placement: correct answer → targetCorrect; shuffle other 3
    const otherOrig = [0, 1, 2, 3].filter(i => i !== q.correctIndex);
    const otherNew  = [0, 1, 2, 3].filter(i => i !== targetCorrect);
    for (let i = otherOrig.length - 1; i > 0; i--) {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      const j = Math.abs(s) % (i + 1);
      [otherOrig[i], otherOrig[j]] = [otherOrig[j], otherOrig[i]];
    }
    const indices = new Array(4);
    indices[targetCorrect] = q.correctIndex;
    otherNew.forEach((newPos, k) => { indices[newPos] = otherOrig[k]; });
    const newOptions = indices.map((origIdx, newPos) =>
      `${SYMS[newPos]} ${strip(q.options[origIdx])}`
    );
    return { ...q, options: newOptions, correctIndex: targetCorrect };
  }

  // Fallback: full Fisher-Yates (no position guarantee)
  const indices = [0, 1, 2, 3];
  for (let i = indices.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const newOptions = indices.map((origIdx, newPos) =>
    `${SYMS[newPos]} ${strip(q.options[origIdx])}`
  );
  const newCorrectIndex = indices.indexOf(q.correctIndex);
  return { ...q, options: newOptions, correctIndex: newCorrectIndex };
}

/**
 * Generate one exam set.
 * setNumber is now a full random seed (1–999999) so every session is unique.
 * category: 'ALL'|'AGRICULTURE'|'INDUSTRY'
 *
 * The seed is spread across both question selection AND option shuffling,
 * so two people with different seeds always get a different question order
 * and different answer-option order.
 */
export function generateExamSet(setNumber, category = EXAM_CATEGORIES.ALL) {
  // Mix the seed thoroughly so nearby set numbers produce very different results
  const seed = ((setNumber * 2654435761) ^ (setNumber << 13) ^ (setNumber >>> 7)) >>> 0;
  let pickedR, pickedL;

  if (category === EXAM_CATEGORIES.ALL) {
    pickedR = seededShuffle(readingBank,   seed).slice(0, 20);
    pickedL = seededShuffle(listeningBank, seed + 7).slice(0, 20);
  } else {
    const isAgri = category === EXAM_CATEGORIES.AGRICULTURE;
    const targetRIds = isAgri ? AGRI_R_IDS : IND_R_IDS;
    const targetLIds = isAgri ? AGRI_L_IDS : IND_L_IDS;

    const targetR = readingBank.filter(q => targetRIds.has(q.bankId));
    const fillR   = readingBank.filter(q => !AGRI_R_IDS.has(q.bankId) && !IND_R_IDS.has(q.bankId));
    const targetL = listeningBank.filter(q => targetLIds.has(q.bankId));
    const fillL   = listeningBank.filter(q => !AGRI_L_IDS.has(q.bankId) && !IND_L_IDS.has(q.bankId));

    pickedR = [
      ...seededShuffle(targetR, seed),
      ...seededShuffle(fillR,   seed + 3),
    ].slice(0, 20);

    pickedL = [
      ...seededShuffle(targetL, seed + 7),
      ...seededShuffle(fillL,   seed + 11),
    ].slice(0, 20);
  }

  // Guarantee exactly 5 questions per correct-answer position (①②③④) in each section
  const rTargets = seededShuffle([0,0,0,0,0, 1,1,1,1,1, 2,2,2,2,2, 3,3,3,3,3], seed + 99997);
  const lTargets = seededShuffle([0,0,0,0,0, 1,1,1,1,1, 2,2,2,2,2, 3,3,3,3,3], seed + 99993);

  const readingQuestions = pickedR.map((q, i) => {
    const qSeed = (seed + i * 7919) & 0xffffffff;
    return { ...shuffleOptions(q, qSeed, rTargets[i]), id: i + 1, section: EXAM_SECTIONS.READING };
  });

  const listeningQuestions = pickedL.map((q, i) => {
    const qSeed = (seed + 99991 + i * 7919) & 0xffffffff;
    return { ...shuffleOptions(q, qSeed, lTargets[i]), id: i + 21, section: EXAM_SECTIONS.LISTENING };
  });

  return [...readingQuestions, ...listeningQuestions];
}

/**
 * Pick a unique random seed (1–999999) for each new exam session.
 * The huge range ensures virtually no two test-takers get the same paper.
 */
export function pickRandomSetNumber() {
  return Math.floor(Math.random() * 999999) + 1;
}

export const getSectionQuestions = (questions, section) =>
  questions.filter((q) => q.section === section);

export const getQuestionById = (questions, id) =>
  questions.find((q) => q.id === id);

// Export the raw banks for admin / question manager
export { readingBank, listeningBank };
