$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
# BUG (Phase A): default port 4001 while mock server listens on 4000
$env:MOCK_BASE = if ($env:MOCK_BASE) { $env:MOCK_BASE } else { "http://127.0.0.1:4001" }

Push-Location (Join-Path $Root "integration\tests")
node --test ./*.test.mjs
$code = $LASTEXITCODE
Pop-Location
exit $code
