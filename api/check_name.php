<?php
require_once __DIR__ . '/config.php';
apiInit();

$name = trim($_GET['name'] ?? '');
if ($name === '') {
    echo json_encode(['exists' => false]);
    exit;
}

$db   = getDB();
$stmt = $db->prepare(
    'SELECT id FROM exam_results WHERE LOWER(examiner_name) = LOWER(?) LIMIT 1'
);
$stmt->execute([mb_substr($name, 0, 100)]);

echo json_encode(['exists' => (bool)$stmt->fetch()]);
