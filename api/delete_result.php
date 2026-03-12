<?php
require_once __DIR__ . '/config.php';
apiInit();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Verify admin secret key in header
$secret = $_SERVER['HTTP_X_API_SECRET'] ?? '';
if (API_SECRET === 'CHANGE_TO_A_LONG_RANDOM_SECRET_KEY' || $secret !== API_SECRET) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);
$id   = (int)($body['id'] ?? 0);

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid id']);
    exit;
}

$db   = getDB();
$stmt = $db->prepare('DELETE FROM exam_results WHERE id = ?');
$stmt->execute([$id]);

echo json_encode(['ok' => true, 'deleted' => $stmt->rowCount()]);
