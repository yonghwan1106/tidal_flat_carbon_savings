# JSON 파일을 한 줄로 변환하는 스크립트
# 사용법: 다운로드한 JSON 파일 경로를 입력하세요

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   JSON 파일 한 줄로 변환 스크립트" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# 다운로드 폴더에서 최근 JSON 파일 찾기
$downloadsPath = [Environment]::GetFolderPath("UserProfile") + "\Downloads"
$jsonFiles = Get-ChildItem -Path $downloadsPath -Filter "*.json" | Sort-Object LastWriteTime -Descending

if ($jsonFiles.Count -eq 0) {
    Write-Host "❌ Downloads 폴더에 JSON 파일이 없습니다!" -ForegroundColor Red
    Write-Host ""
    Write-Host "수동으로 파일 경로를 입력하세요:" -ForegroundColor Yellow
    $jsonPath = Read-Host "JSON 파일 전체 경로"
} else {
    Write-Host "📁 최근 다운로드한 JSON 파일들:" -ForegroundColor Green
    for ($i = 0; $i -lt [Math]::Min(5, $jsonFiles.Count); $i++) {
        Write-Host "  [$i] $($jsonFiles[$i].Name) - $($jsonFiles[$i].LastWriteTime)" -ForegroundColor Gray
    }
    Write-Host ""
    $selection = Read-Host "파일 번호 선택 (0-$([Math]::Min(4, $jsonFiles.Count-1)))"
    $jsonPath = $jsonFiles[[int]$selection].FullName
}

if (-not (Test-Path $jsonPath)) {
    Write-Host "❌ 파일을 찾을 수 없습니다: $jsonPath" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📄 파일: $jsonPath" -ForegroundColor Green
Write-Host ""
Write-Host "변환 중..." -ForegroundColor Yellow

try {
    # JSON 파일 읽기 및 한 줄로 변환
    $jsonContent = Get-Content -Path $jsonPath -Raw -Encoding UTF8
    $jsonOneLine = $jsonContent -replace '\r?\n', '' -replace '\s+', ' ' -replace ':\s+', ':' -replace ',\s+', ','

    # 클립보드에 복사
    $jsonOneLine | Set-Clipboard

    Write-Host ""
    Write-Host "✅ 성공! 클립보드에 복사되었습니다!" -ForegroundColor Green
    Write-Host ""
    Write-Host "다음 단계:" -ForegroundColor Cyan
    Write-Host "  1. backend\.env 파일을 여세요" -ForegroundColor White
    Write-Host "  2. GOOGLE_SHEETS_CREDENTIALS= 뒤에 붙여넣기 (Ctrl+V)" -ForegroundColor White
    Write-Host ""
    Write-Host "⚠️  주의: 따옴표 없이 그대로 붙여넣으세요!" -ForegroundColor Yellow
    Write-Host ""

    # 미리보기 (처음 100자)
    $preview = $jsonOneLine.Substring(0, [Math]::Min(100, $jsonOneLine.Length))
    Write-Host "미리보기:" -ForegroundColor Gray
    Write-Host "  $preview..." -ForegroundColor DarkGray
    Write-Host ""

} catch {
    Write-Host "❌ 오류 발생: $_" -ForegroundColor Red
    exit 1
}

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
