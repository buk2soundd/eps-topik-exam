<?php
// ════════════════════════════════════════════════════════════════
//  EPS-TOPIK API — XAMPP Config Template
//  สำหรับ deploy_to_xampp.ps1 ใช้ auto-fill ค่าด้านล่าง
// ════════════════════════════════════════════════════════════════

define('DB_HOST',    '{{DB_HOST}}');
define('DB_NAME',    '{{DB_NAME}}');
define('DB_USER',    '{{DB_USER}}');
define('DB_PASS',    '{{DB_PASS}}');
define('API_SECRET', '{{API_SECRET}}');

function getDB(): PDO {
    static $pdo = null;
    if ($pdo !== null) return $pdo;
    try {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]
        );
    } catch (PDOException $e) {
        http_response_code(503);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'Database unavailable', 'detail' => $e->getMessage()]);
        exit;
    }
    return $pdo;
}

function apiInit(): void {
    header('Content-Type: application/json; charset=utf-8');
    $allowedOrigins = ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'];
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, $allowedOrigins, true)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        header('Access-Control-Allow-Origin: *');
    }
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Api-Secret');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}
