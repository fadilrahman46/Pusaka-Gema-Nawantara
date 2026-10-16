$ErrorActionPreference = 'Stop'
$repoPath = Split-Path $PSScriptRoot -Parent
$names = @('GUIDE_KARAKTER_100_Nawantara_FINAL_v1_1.md','DOKUMEN_ITEM_Pusaka_Gema_Nawantara_FINAL_v1.md','KERANGKA_MISI_Pusaka_Gema_Nawantara.md','SKEMA_FLAG_COUNTER_GLOBAL.md','UI_UX_SYSTEM_REQUIREMENTS.md','World_Bible_Pusaka_Gema_Nawantara_v5.3.md','COMBAT_MATH_GLOBAL.md')
$names += Get-ChildItem -LiteralPath $repoPath -Filter 'QUEST_SCRIPT_R*.md' | Sort-Object Name | ForEach-Object Name
if ($names.Count -ne 16) { throw 'Expected exactly 16 source documents.' }
$report = [System.Collections.Generic.List[string]]::new()
$report.Add('# Inventaris sumber Markdown')
$report.Add('')
$report.Add('Dihasilkan oleh audit-markdown.ps1. Pemindaian seluruh teks 16 sumber; bukan sertifikasi semantik seluruh konten. Hash mengunci revisi sumber untuk review. Token flag hasil regex belum merupakan skema bertipe yang tervalidasi.')
$report.Add('')
$report.Add('| Sumber | Baris | SHA256 |')
$report.Add('|---|---:|---|')
$questRows = [System.Collections.Generic.List[string]]::new()
$todoRows = [System.Collections.Generic.List[string]]::new()
$allQuest = @()
$allFlags = @()
foreach ($name in $names) {
  $path = Join-Path $repoPath $name
  $raw = Get-Content -LiteralPath $path -Raw -Encoding utf8
  $lines = $raw -split '\r?\n'
  $hash = (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash
  $report.Add("| [$name](../$name) | $($lines.Count) | $hash |")
  if ($name -like 'QUEST_SCRIPT*') {
    $ids = @([regex]::Matches($raw, '(?m)^#{1,3}\s+((?:NR|KD|SM|WN|KL|HM|RJ|JL|AW)-[MSH]\d{2})\b') | ForEach-Object {$_.Groups[1].Value} | Sort-Object -Unique)
    $allQuest += $ids
    $allFlags += [regex]::Matches($raw, '\b(?:flag|counter|array)_[a-z0-9_]+\b') | ForEach-Object Value
    $questRows.Add("| $name | $($ids.Count) | $($ids -join ', ') |")
  }
  for ($i=0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '\[PLACEHOLDER|\bTBD\b') {
      $snippet = $lines[$i].Replace('|','/').Trim()
      if ($snippet.Length -gt 210) { $snippet=$snippet.Substring(0,210)+'…' }
      $todoRows.Add("| $name | $($i+1) | $snippet |")
    }
  }
}
$uniqueQuest = @($allQuest | Sort-Object -Unique)
$uniqueFlags = @($allFlags | Sort-Object -Unique)
$guide = Get-Content -LiteralPath (Join-Path $repoPath $names[0]) -Raw -Encoding utf8
$characters = @([regex]::Matches($guide,'(?m)^###\s+(\d{2,3})\s+·') | ForEach-Object {$_.Groups[1].Value} | Sort-Object -Unique)
$report.Add('')
$report.Add("Karakter dari heading bernomor: **$($characters.Count)**. Quest unik dari heading (termasuk tambahan level heading 3): **$($uniqueQuest.Count)**. Token state unik pada Quest Script: **$($uniqueFlags.Count)**. Baris dengan literal [PLACEHOLDER atau TBD pada seluruh sumber: **$($todoRows.Count)** (termasuk catatan historis; bukan jumlah bug aktif).")
$report.Add('')
$report.Add('| Quest Script | Jumlah | ID |')
$report.Add('|---|---:|---|')
$report.AddRange($questRows)
$report.Add('')
$report.Add('## Kandidat tindak lanjut sumber')
$report.Add('')
$report.Add('Klasifikasikan setiap baris sebagai historis, keputusan sementara, atau parameter aktif yang belum lengkap sebelum menutup gate. Kemunculan literal tidak membuktikan masalah aktif; ketiadaannya juga tidak membuktikan kelengkapan.')
$report.Add('')
$report.Add('| Sumber | Baris | Cuplikan |')
$report.Add('|---|---:|---|')
$report.AddRange($todoRows)
$report | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'SOURCE_INVENTORY.md') -Encoding utf8
if ($characters.Count -ne 100 -or $uniqueQuest.Count -ne 138) { throw 'Source cardinality changed: review plan scope.' }
Write-Output "PASS inventory: $($names.Count) sources, $($characters.Count) character headings, $($uniqueQuest.Count) quest headings, $($uniqueFlags.Count) distinct state tokens, $($todoRows.Count) placeholder/TBD lines."
