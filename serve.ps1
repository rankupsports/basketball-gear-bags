# Minimal static file server (no node/python on this machine).
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 5178
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "serving $root on http://localhost:$port/"

$mime = @{
  '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8';
  '.js'='application/javascript; charset=utf-8'; '.png'='image/png';
  '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.svg'='image/svg+xml';
  '.mp4'='video/mp4'; '.json'='application/json'
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
  if ($rel -eq '') { $rel = 'index.html' }
  $path = Join-Path $root $rel
  if (Test-Path $path -PathType Leaf) {
    $bytes = [IO.File]::ReadAllBytes($path)
    $ext = [IO.Path]::GetExtension($path).ToLower()
    $ctx.Response.ContentType = if ($mime[$ext]) { $mime[$ext] } else { 'application/octet-stream' }
    $ctx.Response.Headers.Add('Cache-Control','no-store')
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $ctx.Response.StatusCode = 404
  }
  $ctx.Response.OutputStream.Close()
}
