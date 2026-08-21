# Minimal static file server (no node/python on this machine).
# HTTP Range 対応 — <video> はバイト範囲要求を投げるため、これが無いと
# 接続がハングしてプレビューが固まる。
$root = $PSScriptRoot
if (-not $root) { $root = Split-Path -Parent $MyInvocation.MyCommand.Path }
$port = if ($env:PORT) { [int]$env:PORT } else { 5178 }
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "serving $root on http://localhost:$port/"

$mime = @{
  '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8';
  '.js'='application/javascript; charset=utf-8'; '.png'='image/png';
  '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.svg'='image/svg+xml';
  '.mp4'='video/mp4'; '.webm'='video/webm'; '.json'='application/json';
  '.webp'='image/webp'
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $res = $ctx.Response
  try {
    $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
    if ($rel -eq '') { $rel = 'index.html' }
    $path = Join-Path $root $rel

    if (-not (Test-Path $path -PathType Leaf)) {
      $res.StatusCode = 404
      $res.Close()
      continue
    }

    $ext = [IO.Path]::GetExtension($path).ToLower()
    $res.ContentType = if ($mime[$ext]) { $mime[$ext] } else { 'application/octet-stream' }
    $res.Headers.Add('Cache-Control','no-store')
    $res.Headers.Add('Accept-Ranges','bytes')

    $fs = [IO.File]::OpenRead($path)
    try {
      $total = $fs.Length
      $range = $ctx.Request.Headers['Range']
      $start = 0
      $end   = $total - 1

      if ($range -and $range -match 'bytes=(\d*)-(\d*)') {
        if ($matches[1] -ne '') { $start = [int64]$matches[1] }
        if ($matches[2] -ne '') { $end   = [int64]$matches[2] }
        if ($end -ge $total) { $end = $total - 1 }
        if ($start -gt $end)  { $start = 0 }
        $res.StatusCode = 206
        $res.Headers.Add('Content-Range', "bytes $start-$end/$total")
      }

      $len = $end - $start + 1
      $res.ContentLength64 = $len
      $fs.Seek($start, [IO.SeekOrigin]::Begin) | Out-Null

      $buf = New-Object byte[] 65536
      $remaining = $len
      while ($remaining -gt 0) {
        $take = [Math]::Min($buf.Length, $remaining)
        $read = $fs.Read($buf, 0, $take)
        if ($read -le 0) { break }
        $res.OutputStream.Write($buf, 0, $read)
        $remaining -= $read
      }
    } finally {
      $fs.Close()
    }
  } catch {
    # クライアント切断など。接続は閉じて次へ。
  } finally {
    try { $res.Close() } catch {}
  }
}
