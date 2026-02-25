# ============================================================
# PAM — Deploy Script (Windows PowerShell)
# รันบนเครื่อง Windows เพื่ออัปไฟล์ขึ้น EC2
# ============================================================

$EC2_IP = "54.254.222.207"
$EC2_USER = "ubuntu"
$KEY_PATH = "C:\dev\PAM\pam-key.pem"
$LOCAL_PATH = "C:\dev\PAM"
$REMOTE_DIR = "/var/www/pam"

# ── Check key file exists ────────────────────────────────
if (-not (Test-Path $KEY_PATH)) {
    Write-Host "❌ ไม่พบไฟล์ key: $KEY_PATH" -ForegroundColor Red
    Write-Host "   กรุณาเปลี่ยน KEY_PATH ให้ถูกต้อง" -ForegroundColor Yellow
    exit 1
}

# ── Fix key permissions (Windows) ────────────────────────
Write-Host "🔑 Setting key file permissions..." -ForegroundColor Cyan
icacls $KEY_PATH /inheritance:r /grant:r "${env:USERNAME}:(R)" 2>$null

Write-Host ""
Write-Host "🚀 Deploying PAM to EC2 ($EC2_IP)..." -ForegroundColor Green
Write-Host ""

# ── Upload files via SCP ─────────────────────────────────
# Upload ทุก folder ที่จำเป็น
$folders = @("page", "function")

foreach ($folder in $folders) {
    Write-Host "📤 Uploading $folder/..." -ForegroundColor Cyan
    scp -i $KEY_PATH -r -o StrictHostKeyChecking=no `
        "$LOCAL_PATH\$folder" `
        "${EC2_USER}@${EC2_IP}:${REMOTE_DIR}/"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ $folder uploaded" -ForegroundColor Green
    }
    else {
        Write-Host "   ❌ $folder failed" -ForegroundColor Red
        exit 1
    }
}

# ── Upload root files (if any .html at root) ─────────────
Write-Host "📤 Uploading root files..." -ForegroundColor Cyan
$rootFiles = Get-ChildItem -Path $LOCAL_PATH -Filter "*.html" -File
foreach ($f in $rootFiles) {
    scp -i $KEY_PATH -o StrictHostKeyChecking=no `
        $f.FullName `
        "${EC2_USER}@${EC2_IP}:${REMOTE_DIR}/"
}

# ── Fix permissions on server ────────────────────────────
Write-Host ""
Write-Host "🔧 Fixing permissions on server..." -ForegroundColor Cyan
ssh -i $KEY_PATH -o StrictHostKeyChecking=no `
    "${EC2_USER}@${EC2_IP}" `
    "sudo chown -R ubuntu:www-data /var/www/pam && sudo chmod -R 755 /var/www/pam && sudo systemctl reload nginx"

Write-Host ""
Write-Host "✅ Deploy complete!" -ForegroundColor Green
Write-Host "🌐 PAM is live at: http://$EC2_IP" -ForegroundColor Yellow
Write-Host ""
