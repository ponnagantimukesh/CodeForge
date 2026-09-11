# Start CitizenScheme AI - Both Backend and Frontend
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " CitizenScheme AI — Universal Citizen Scheme Intelligence" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan

$backendPath = Join-Path $PSScriptRoot "backend"
$frontendPath = Join-Path $PSScriptRoot "frontend"

Write-Host "`n[1/2] Starting Python FastAPI Backend on http://127.0.0.1:8000 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; python run.py"

Write-Host "[2/2] Starting Vite Frontend on http://localhost:5173 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; npm run dev"

Write-Host "`nAll services launched!" -ForegroundColor Cyan
Write-Host "• Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "• Backend API Docs: http://127.0.0.1:8000/docs" -ForegroundColor White
