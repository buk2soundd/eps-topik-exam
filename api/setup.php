<?php
// ════════════════════════════════════════════════════════════════
//  setup.php  — EPS-TOPIK API Self-Install & Connection Test
//  เข้าถึงได้ที่: http://localhost/eps-api/setup.php
// ════════════════════════════════════════════════════════════════

require_once __DIR__ . '/config.php';

header('Content-Type: text/html; charset=utf-8');

$steps  = [];
$errors = [];

// ── Step 1: Test DB connection ────────────────────────────────
try {
    $db = getDB();
    $steps[] = ['ok' => true,  'label' => 'Database connection', 'detail' => 'Connected to MySQL as ' . DB_USER . '@' . DB_HOST . ' / ' . DB_NAME];
} catch (Throwable $e) {
    $errors[] = $e->getMessage();
    $steps[]  = ['ok' => false, 'label' => 'Database connection', 'detail' => $e->getMessage()];
}

// ── Step 2: Check / create table ─────────────────────────────
if (empty($errors)) {
    try {
        $db->exec("
            CREATE TABLE IF NOT EXISTS `exam_results` (
              `id`              INT UNSIGNED      NOT NULL AUTO_INCREMENT,
              `created_at`      DATETIME          NOT NULL DEFAULT CURRENT_TIMESTAMP,
              `examiner_name`   VARCHAR(100)      NOT NULL DEFAULT 'ຜູ້ສອບ',
              `total_score`     SMALLINT UNSIGNED NOT NULL DEFAULT 0,
              `reading_score`   TINYINT UNSIGNED  NOT NULL DEFAULT 0,
              `listening_score` TINYINT UNSIGNED  NOT NULL DEFAULT 0,
              `passed`          TINYINT(1)        NOT NULL DEFAULT 0,
              `time_taken_sec`  SMALLINT UNSIGNED NOT NULL DEFAULT 0,
              `exam_set`        VARCHAR(50)       DEFAULT NULL,
              `category`        VARCHAR(50)       NOT NULL DEFAULT 'ALL',
              PRIMARY KEY (`id`),
              INDEX `idx_name`   (`examiner_name`),
              INDEX `idx_date`   (`created_at`),
              INDEX `idx_passed` (`passed`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");

        $count = $db->query('SELECT COUNT(*) FROM exam_results')->fetchColumn();
        $steps[] = ['ok' => true, 'label' => 'Table exam_results', 'detail' => "Ready — $count record(s) in table"];
    } catch (Throwable $e) {
        $errors[] = $e->getMessage();
        $steps[]  = ['ok' => false, 'label' => 'Table exam_results', 'detail' => $e->getMessage()];
    }
}

// ── Step 3: Test insert + delete (smoke test) ─────────────────
if (empty($errors)) {
    try {
        $db->exec("INSERT INTO exam_results (examiner_name, total_score, exam_set) VALUES ('__setup_test__', 0, 'test')");
        $testId = (int)$db->lastInsertId();
        $db->exec("DELETE FROM exam_results WHERE id = $testId");
        $steps[] = ['ok' => true, 'label' => 'Write/Delete test', 'detail' => "Insert & delete row id=$testId succeeded"];
    } catch (Throwable $e) {
        $steps[] = ['ok' => false, 'label' => 'Write/Delete test', 'detail' => $e->getMessage()];
    }
}

$allOk = empty($errors);
?>
<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="utf-8">
<title>EPS-TOPIK API Setup</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body { font-family: system-ui, sans-serif; background: #f1f5f9; margin: 0; padding: 24px; }
  .card { background: #fff; border-radius: 16px; box-shadow: 0 4px 24px #0001; max-width: 640px; margin: 0 auto; overflow: hidden; }
  .header { background: #1a3a6b; color: #fff; padding: 24px 28px; }
  .header h1 { margin: 0; font-size: 1.4rem; }
  .header p  { margin: 4px 0 0; opacity: .7; font-size: .85rem; }
  .body { padding: 24px 28px; }
  .step { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
  .step:last-child { border-bottom: none; }
  .icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 1px; }
  .label { font-weight: 700; font-size: .95rem; color: #1e293b; }
  .detail { font-size: .8rem; color: #64748b; margin-top: 3px; font-family: monospace; }
  .banner { border-radius: 10px; padding: 14px 18px; margin-top: 16px; font-weight: 700; text-align: center; font-size: 1rem; }
  .ok  { background: #d1fae5; color: #065f46; }
  .err { background: #fee2e2; color: #991b1b; }
  .info { background: #dbeafe; border-radius: 10px; padding: 14px 18px; margin-top: 16px; font-size: .85rem; color: #1e40af; }
  .info code { background: #e0f2fe; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
  h3 { margin: 20px 0 8px; font-size: .85rem; text-transform: uppercase; letter-spacing: .1em; color: #94a3b8; }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <h1>🗄️ EPS-TOPIK API Setup</h1>
    <p>XAMPP Connection Test · <?= date('Y-m-d H:i:s') ?></p>
  </div>
  <div class="body">

    <h3>Diagnostic Steps</h3>
    <?php foreach ($steps as $s): ?>
    <div class="step">
      <div class="icon"><?= $s['ok'] ? '✅' : '❌' ?></div>
      <div>
        <div class="label"><?= htmlspecialchars($s['label']) ?></div>
        <div class="detail"><?= htmlspecialchars($s['detail']) ?></div>
      </div>
    </div>
    <?php endforeach; ?>

    <div class="banner <?= $allOk ? 'ok' : 'err' ?>">
      <?= $allOk
        ? '✅ ทุกอย่างพร้อมใช้งาน! API เชื่อมต่อ MySQL สำเร็จ'
        : '❌ พบข้อผิดพลาด — ดูรายละเอียดด้านบน' ?>
    </div>

    <?php if ($allOk): ?>
    <div class="info">
      <strong>ขั้นตอนถัดไป — ตั้งค่าในแอป React:</strong><br><br>
      ไปที่ <strong>Admin → ການຕັ້ງຄ່າ</strong> แล้วตั้งค่า:<br><br>
      API Base URL: <code>http://localhost/eps-api</code><br>
      API Secret: <code><?= htmlspecialchars(API_SECRET) ?></code>
    </div>
    <?php endif; ?>

    <div class="info" style="margin-top:10px; background:#f8fafc; color:#475569;">
      Config: <code>DB_HOST=<?= DB_HOST ?></code>
      <code>DB_NAME=<?= DB_NAME ?></code>
      <code>DB_USER=<?= DB_USER ?></code>
      <code>PHP <?= PHP_VERSION ?></code>
    </div>

  </div>
</div>
</body>
</html>
