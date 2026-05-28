$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$env:MOCK_PORT = if ($env:MOCK_PORT) { $env:MOCK_PORT } else { "4000" }
$env:MOCK_BASE = "http://127.0.0.1:$($env:MOCK_PORT)"

$mockJob = Start-Job -ScriptBlock {
  param($r, $port)
  $env:MOCK_PORT = $port
  Set-Location (Join-Path $r "mock\server")
  if (-not (Test-Path "node_modules")) { npm install 2>&1 | Out-Null }
  node server.js
} -ArgumentList $Root, $env:MOCK_PORT

try {
  $deadline = (Get-Date).AddSeconds(15)
  do {
    try {
      $r = Invoke-WebRequest -Uri "$($env:MOCK_BASE)/api/tickers" -UseBasicParsing -TimeoutSec 2
      if ($r.StatusCode -eq 200) { break }
    } catch { Start-Sleep -Milliseconds 400 }
  } while ((Get-Date) -lt $deadline)

  Push-Location (Join-Path $Root "integration\pipeline")
  node run.mjs
  Pop-Location

  & (Join-Path $PSScriptRoot "run_tests.ps1")
} finally {
  Stop-Job $mockJob -ErrorAction SilentlyContinue
  Remove-Job $mockJob -Force -ErrorAction SilentlyContinue
}
