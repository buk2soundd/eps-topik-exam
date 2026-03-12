param(
    [string]$XamppRoot = "C:\xampp",
    [string]$ApiFolder = "eps-api",
    [string]$DbName    = "eps_topik",
    [string]$DbUser    = "root",
    [string]$DbPass    = "",
    [string]$ApiSecret = "xampp_local_secret_change_me"
)
$dest   = Join-Path $XamppRoot "htdocs\$ApiFolder"
$srcApi = Join-Path $PSScriptRoot "..\api"
Write-Host "`n===================================================" -ForegroundColor Cyan
Write-Host "  EPS-TOPIK API -> XAMPP Deploy" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  XAMPP root : $XamppRoot"
Write-Host "  API dest   : $dest`n"
if (-not (Test-Path $XamppRoot)) {
    Write-Host "ERROR: XAMPP not found at $XamppRoot" -ForegroundColor Red
    Write-Host "  Usage: .\scripts\deploy_to_xampp.ps1 -XamppRoot D:\xampp" -ForegroundColor Yellow
    exit 1
}
New-Item -ItemType Directory -Path $dest -Force | Out-Null
Write-Host "  Folder ready: $dest" -ForegroundColor Green
$files = @("save_result.php","get_results.php","check_name.php","delete_result.php",".htaccess","setup.php")
foreach ($f in $files) {
    $src = Join-Path $srcApi $f
    if (Test-Path $src) {
        Copy-Item $src (Join-Path $dest $f) -Force
        Write-Host "  Copied: $f" -ForegroundColor Green
    }
}
$tpl = Get-Content (Join-Path $srcApi "config.xampp.php") -Raw
$cfg = $tpl -replace "\{\{DB_HOST\}\}","localhost" `
            -replace "\{\{DB_NAME\}\}",$DbName `
            -replace "\{\{DB_USER\}\}",$DbUser `
            -replace "\{\{DB_PASS\}\}",$DbPass `
            -replace "\{\{API_SECRET\}\}",$ApiSecret
$cfg | Set-Content (Join-Path $dest "config.php") -Encoding UTF8
Write-Host "  config.php written (DB=$DbName, User=$DbUser)" -ForegroundColor Green
Write-Host "`n===================================================" -ForegroundColor Cyan
Write-Host "  Deploy complete!" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "`n  [1] phpMyAdmin: http://localhost/phpmyadmin"
Write-Host "      SQL tab -> paste mysql_xampp_setup.sql -> Go"
Write-Host "`n  [2] Test API: http://localhost/$ApiFolder/setup.php"
Write-Host "`n  [3] Admin -> Settings:"
Write-Host "      API Base URL = http://localhost/$ApiFolder"
Write-Host "      API Secret   = $ApiSecret`n"
$ans = Read-Host "Open phpMyAdmin now? (y/n)"
if ($ans -match "^[yY]") {
    Start-Process "http://localhost/phpmyadmin"
    Start-Process "http://localhost/$ApiFolder/setup.php"
}
