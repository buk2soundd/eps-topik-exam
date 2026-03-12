<?php
require_once __DIR__ . '/config.php';
apiInit();

$db   = getDB();
$stmt = $db->query('SELECT * FROM exam_results ORDER BY created_at DESC');
$rows = $stmt->fetchAll();

// Type-cast for proper JSON output
foreach ($rows as &$r) {
    $r['id']              = (int)$r['id'];
    $r['total_score']     = (int)$r['total_score'];
    $r['reading_score']   = (int)$r['reading_score'];
    $r['listening_score'] = (int)$r['listening_score'];
    $r['passed']          = (bool)(int)$r['passed'];
    $r['time_taken_sec']  = (int)$r['time_taken_sec'];
}
unset($r);

echo json_encode($rows);
