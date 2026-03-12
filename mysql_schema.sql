-- ════════════════════════════════════════════════════════════════
--  EPS-TOPIK Mock Exam — MySQL Database Schema
--  วิธีใช้: เปิด phpMyAdmin ใน cPanel → เลือก Database ของคุณ
--           → แท็บ SQL → วาง SQL นี้ → กด Go
-- ════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS `exam_results` (
  `id`              INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  `created_at`      DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `examiner_name`   VARCHAR(100)     NOT NULL DEFAULT 'ຜູ້ສອບ'   COMMENT 'ชื่อผู้สอบ',
  `total_score`     SMALLINT UNSIGNED NOT NULL DEFAULT 0          COMMENT 'คะแนนรวม 0-200',
  `reading_score`   TINYINT UNSIGNED  NOT NULL DEFAULT 0          COMMENT 'ข้อถูก Reading 0-20',
  `listening_score` TINYINT UNSIGNED  NOT NULL DEFAULT 0          COMMENT 'ข้อถูก Listening 0-20',
  `passed`          TINYINT(1)        NOT NULL DEFAULT 0          COMMENT '1=ผ่าน 0=ไม่ผ่าน',
  `time_taken_sec`  SMALLINT UNSIGNED NOT NULL DEFAULT 0          COMMENT 'เวลาที่ใช้ (วินาที)',
  `exam_set`        VARCHAR(50)       DEFAULT NULL                COMMENT 'หมายเลขชุดข้อสอบ',
  `category`        VARCHAR(50)       NOT NULL DEFAULT 'ALL'      COMMENT 'ประเภท: ALL/AGRICULTURE/INDUSTRY',
  PRIMARY KEY (`id`),
  INDEX `idx_name`  (`examiner_name`),
  INDEX `idx_date`  (`created_at`),
  INDEX `idx_passed` (`passed`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='ตารางเก็บผลการสอบ EPS-TOPIK';
