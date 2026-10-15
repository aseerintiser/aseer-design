# Windows version of self-host-framer-images.mjs: no Node needed.
# Downloads every image listed in scripts/framer-images.json from
# Framer's CDN into public/media/framer/, keeping the original names.
#
# Run from the repo root in PowerShell:
#   powershell -ExecutionPolicy Bypass -File scripts\self-host-framer-images.ps1
#
# Safe to run again: files that already exist are skipped.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $root "public\media\framer"
$files = Get-Content (Join-Path $root "scripts\framer-images.json") -Raw | ConvertFrom-Json
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$fetched = 0; $skipped = 0; $failed = @()
$i = 0
foreach ($file in $files) {
  $i++
  $target = Join-Path $outDir $file
  if ((Test-Path $target) -and ((Get-Item $target).Length -gt 0)) { $skipped++; continue }
  $ok = $false
  for ($attempt = 1; $attempt -le 3 -and -not $ok; $attempt++) {
    try {
      Invoke-WebRequest -Uri "https://framerusercontent.com/images/$file" -OutFile $target -UseBasicParsing
      if ((Get-Item $target).Length -gt 0) { $ok = $true }
    } catch { Start-Sleep -Seconds 1 }
  }
  if ($ok) { $fetched++ } else { $failed += $file; if (Test-Path $target) { Remove-Item $target } }
  Write-Progress -Activity "Downloading images" -Status "$i of $($files.Count)" -PercentComplete (100 * $i / $files.Count)
}

Write-Host "Downloaded $fetched, already had $skipped."
if ($failed.Count -gt 0) {
  Write-Host "$($failed.Count) failed. Run the script again to retry:" -ForegroundColor Red
  $failed | ForEach-Object { Write-Host "  $_" }
  exit 1
}
Write-Host "All $($files.Count) images are in public\media\framer\." -ForegroundColor Green
