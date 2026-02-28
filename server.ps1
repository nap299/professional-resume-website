$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8765/")
$listener.Start()
Write-Host "Server started on http://localhost:8765"
$root = "c:\Users\NAPTUN3\Desktop\resume"
while ($listener.IsListening) {
    $context = $listener.GetContext()
    $localPath = $context.Request.Url.LocalPath
    if ($localPath -eq "/") { $localPath = "/index.html" }
    $localPath = [System.Uri]::UnescapeDataString($localPath)
    $filePath = Join-Path $root ($localPath.TrimStart("/").Replace("/", "\"))
    $response = $context.Response
    if (Test-Path $filePath -PathType Leaf) {
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $mimeTypes = @{
            ".html" = "text/html; charset=utf-8"
            ".css"  = "text/css"
            ".js"   = "application/javascript"
            ".json" = "application/json"
            ".png"  = "image/png"
            ".jpg"  = "image/jpeg"
            ".jpeg" = "image/jpeg"
            ".svg"  = "image/svg+xml"
            ".webp" = "image/webp"
        }
        $mime = $mimeTypes[$ext]
        if (-not $mime) { $mime = "application/octet-stream" }
        $response.ContentType = $mime
        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
    }
    else {
        $response.StatusCode = 404
        $bytes = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
    $response.Close()
}
