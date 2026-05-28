$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot

$env:MOCK_PORT = if ($env:MOCK_PORT) { $env:MOCK_PORT } else { "4000" }
$env:DASHBOARD_PORT = if ($env:DASHBOARD_PORT) { $env:DASHBOARD_PORT } else { "4001" }
$env:MOCK_BASE = "http://127.0.0.1:$($env:MOCK_PORT)"

function Start-MockService {
  param([string]$Name, [string]$RelativePath)
  $dir = Join-Path $Root $RelativePath
  if (-not (Test-Path (Join-Path $dir "node_modules"))) {
    Push-Location $dir
    npm install 2>&1 | Out-Null
    Pop-Location
  }
  Start-Job -Name $Name -ScriptBlock {
    param($d)
    Set-Location $d
    node server.js
  } -ArgumentList $dir | Out-Null
}

Start-MockService -Name "mock-api" -RelativePath "mock\server"
Start-Sleep -Seconds 1
Start-MockService -Name "mock-dashboard" -RelativePath "mock\client-dashboard"

Write-Host "Mock API:      http://localhost:$($env:MOCK_PORT)"
Write-Host "Dashboard:     http://localhost:$($env:DASHBOARD_PORT)"
Write-Host "Press Ctrl+C to stop (jobs: mock-api, mock-dashboard)"

try {
  while ($true) { Start-Sleep -Seconds 3600 }
} finally {
  Get-Job -Name "mock-api", "mock-dashboard" -ErrorAction SilentlyContinue |
    Stop-Job -PassThru |
    Remove-Job -Force
}
