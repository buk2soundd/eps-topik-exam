<?php
require_once __DIR__ . '/config.php';
apiInit();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON body']);
    exit;
}

// Sanitize inputs
$name      = mb_substr(trim($body['examiner_name'] ?? 'ຜູ້ສອບ'), 0, 100);
$total     = max(0, min(200, (int)($body['total_score'] ?? 0)));
$reading   = max(0, min(20,  (int)($body['reading_score'] ?? 0)));
$listening = max(0, min(20,  (int)($body['listening_score'] ?? 0)));
$passed    = !empty($body['passed']) ? 1 : 0;
$time      = max(0, (int)($body['time_taken_sec'] ?? 0));
$set       = isset($body['exam_set']) ? mb_substr((string)$body['exam_set'], 0, 50) : null;
$cat       = mb_substr($body['category'] ?? 'ALL', 0, 50);

$db   = getDB();
$stmt = $db->prepare(
    'INSERT INTO exam_results
       (examiner_name, total_score, reading_score, listening_score, passed, time_taken_sec, exam_set, category)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
);
$stmt->execute([$name, $total, $reading, $listening, $passed, $time, $set, $cat]);

echo json_encode(['ok' => true, 'id' => (int)$db->lastInsertId()]);
