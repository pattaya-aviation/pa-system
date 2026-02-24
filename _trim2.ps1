$f = "c:\dev\pa-system\page\portal\vfc\index.html"
$l = Get-Content $f -Encoding UTF8
# Keep lines 1-90 (indices 0-89) and 149 onwards (index 148+)
$k = $l[0..89] + $l[148..($l.Count - 1)]
Set-Content $f $k -Encoding UTF8
Write-Host "Done. Lines: $($k.Count)"
