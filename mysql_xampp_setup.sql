-- ════════════════════════════════════════════════════════════════
--  EPS-TOPIK Mock Exam — XAMPP Setup SQL
--  วิธีใช้:
--    1. เปิด http://localhost/phpmyadmin
--    2. คลิก "SQL" ที่เมนูบน
--    3. วาง SQL นี้ทั้งหมด → กด "Go"
-- ════════════════════════════════════════════════════════════════

-- สร้าง Database (ถ้ายังไม่มี)
CREATE DATABASE IF NOT EXISTS `eps_topik`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- เลือกใช้ Database นี้
USE `eps_topik`;

-- สร้างตารางเก็บผลสอบ
CREATE TABLE IF NOT EXISTS `exam_results` (
  `id`              INT UNSIGNED      NOT NULL AUTO_INCREMENT,
  `created_at`      DATETIME          NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `examiner_name`   VARCHAR(100)      NOT NULL DEFAULT 'ຜູ້ສອບ'   COMMENT 'ชื่อผู้สอบ',
  `total_score`     SMALLINT UNSIGNED NOT NULL DEFAULT 0          COMMENT 'คะแนนรวม 0-200',
  `reading_score`   TINYINT UNSIGNED  NOT NULL DEFAULT 0          COMMENT 'ข้อถูก Reading 0-20',
  `listening_score` TINYINT UNSIGNED  NOT NULL DEFAULT 0          COMMENT 'ข้อถูก Listening 0-20',
  `passed`          TINYINT(1)        NOT NULL DEFAULT 0          COMMENT '1=ผ่าน 0=ไม่ผ่าน',
  `time_taken_sec`  SMALLINT UNSIGNED NOT NULL DEFAULT 0          COMMENT 'เวลาที่ใช้ (วินาที)',
  `exam_set`        VARCHAR(50)       DEFAULT NULL                COMMENT 'หมายเลขชุดข้อสอบ',
  `category`        VARCHAR(50)       NOT NULL DEFAULT 'ALL'      COMMENT 'ALL/AGRICULTURE/INDUSTRY',
  PRIMARY KEY (`id`),
  INDEX `idx_name`   (`examiner_name`),
  INDEX `idx_date`   (`created_at`),
  INDEX `idx_passed` (`passed`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='ตารางเก็บผลการสอบ EPS-TOPIK';

-- ตรวจสอบผลลัพธ์
SELECT 'Setup complete! Table exam_results created in eps_topik database.' AS status;
SHOW TABLES;
