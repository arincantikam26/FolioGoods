# Builds the ZIP that buyers download.
#
#   powershell -ExecutionPolicy Bypass -File scripts/package-ui-edition.ps1
#   powershell -ExecutionPolicy Bypass -File scripts/package-ui-edition.ps1 -Version 1.0.1
#
# Contents: every file git tracks or would track (so .gitignore rules apply:
# no .env, vendor, node_modules, builds or editor folders), plus the
# documentation in docs/ui-edition, which .gitignore excludes.

param(
    [string]$Version = '1.0.0'
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
Set-Location $root

$name = "FolioGoods-UI-Edition-v$Version"
$distDir = Join-Path $root 'dist'
$zipPath = Join-Path $distDir "$name.zip"

# Seller-only files that must never reach a buyer.
$excluded = @(
    'scripts/package-ui-edition.ps1'
)

$files = @(git ls-files --cached --others --exclude-standard)
$files += Get-ChildItem -Path 'docs/ui-edition' -File -Recurse |
    ForEach-Object { $_.FullName.Substring("$root".Length + 1) -replace '\\', '/' }

$files = $files |
    Where-Object { $_ -and ($excluded -notcontains $_) -and (Test-Path -LiteralPath $_ -PathType Leaf) } |
    Sort-Object -Unique

foreach ($required in @('README.md', 'LICENSE.txt', 'CHANGELOG.md', '.env.example', 'docs/ui-edition/installation.md')) {
    if ($files -notcontains $required) { throw "Missing $required" }
}
foreach ($forbidden in @('.env', 'vendor/', 'node_modules/', 'public/build/', '.claude/', 'dist/')) {
    $isDir = $forbidden.EndsWith('/')
    if ($files | Where-Object { $_ -eq $forbidden -or ($isDir -and $_.StartsWith($forbidden)) }) { throw "Refusing to package $forbidden" }
}

New-Item -ItemType Directory -Force -Path $distDir | Out-Null
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

# ZipArchive with explicit forward-slash entry names: Compress-Archive on
# Windows PowerShell writes backslashes, which break extraction on macOS/Linux.
$zip = [System.IO.Compression.ZipFile]::Open($zipPath, 'Create')
try {
    foreach ($file in $files) {
        $entry = "$name/$file"
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
            $zip, (Join-Path $root $file), $entry, 'Optimal'
        ) | Out-Null
    }
} finally {
    $zip.Dispose()
}

$sizeMb = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)
Write-Host "Packaged $($files.Count) files into dist/$name.zip ($sizeMb MB)"
