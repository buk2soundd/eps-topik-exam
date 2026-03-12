<?php
// ════════════════════════════════════════════════════════════════
//  EPS-TOPIK Exam — MySQL API Configuration
//  ► แก้ไขข้อมูล MySQL ด้านล่างให้ตรงกับ cPanel ของ hostatom.com
// ════════════════════════════════════════════════════════════════

define('DB_HOST', 'localhost');                  // ปกติเป็น localhost สำหรับ shared hosting
define('DB_NAME', 'CHANGE_TO_YOUR_DB_NAME');     // ชื่อ Database จาก cPanel เช่น myuser_epsdb
define('DB_USER', 'CHANGE_TO_YOUR_DB_USER');     // ชื่อผู้ใช้ Database จาก cPanel
define('DB_PASS', 'CHANGE_TO_YOUR_DB_PASSWORD'); // รหัสผ่าน Database

// Secret key สำหรับการลบข้อมูล — ต้องตรงกับ VITE_API_SECRET ใน .env.local
define('API_SECRET', 'CHANGE_TO_A_LONG_RANDOM_SECRET_KEY');

// ─── PDO Connection helper ────────────────────────────────────
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

// ─── Initialize CORS + JSON headers ──────────────────────────
function apiInit(): void {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Api-Secret');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}
