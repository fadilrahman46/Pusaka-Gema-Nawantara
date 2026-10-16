# Audit sumber — 14 konflik diselesaikan

**Status terbaru: C01–C14 ACCEPTED**, berdasarkan instruksi pengguna untuk menyelesaikan konflik sesuai rekomendasi. [DESIGN_DECISIONS.md](DESIGN_DECISIONS.md) adalah kontrak mengikat yang merinci aturan final, default baru, migration, dan acceptance. Jika ringkasan audit awal di bawah berbeda atau kurang lengkap, kontrak keputusan tersebut berlaku.

| Keputusan | Status | Hasil final |
|---|---|---|
| C01 | ACCEPTED | Growth2% dengan pembulatan floor sekali dan override anchor individual; stat awakened tidak dihitung dua kali |
| C02 | ACCEPTED | Nirsmara dari lagu NR-M06; pengorbanan Ensiklopedia untuk Nggarindu NR-S04 |
| C03 | ACCEPTED | Common ally tidak membuka passive; exception hanya encounter eksplisit |
| C04 | ACCEPTED | Enum path/resolution Adi terpisah; adapter dan migrasi legacy eksplisit |
| C05 | ACCEPTED | Input pilihan Smarana/Himagiri disimpan dengan provenance; unknown bukan skor0 final |
| C06 | ACCEPTED | Checkpoint saat HM-M03 selesai; ritual hanya reset global meter |
| C07 | ACCEPTED | Status audit historis tidak dianggap bukti; registry evidence dan prioritas parameter dikunci |
| C08 | ACCEPTED | Party4, Prana, cooldown, status, equipment, target dan default combat ditetapkan sebagai baseline desain |
| C09 | ACCEPTED | Rarity26/19/19/14/13/9 cocok dengan100 blok karakter |
| C10 | ACCEPTED | Empat mode UI; NO_HUD di AW-M05 A7; pause/recovery tetap tersedia |
| C11 | ACCEPTED | B memakai AND; A fallback; C mensyaratkan pilihan diam |
| C12 | ACCEPTED | Reward satu instance dengan nama pending sebelum finale; diam8 detik aktif |
| C13 | ACCEPTED | Review naratif tercatat; final art baru tetap memiliki gate review sendiri |
| C14 | ACCEPTED | Kadewan16 adalah reference encounter level, bukan target level party |

Tuntas pada tingkat keputusan desain. Binding encounter, implementasi migrasi, tuning, dan review aset tetap task produksi. Lihat [verifikasi aktual](DECISION_VERIFICATION.md) dan [registry bukti HP](ENCOUNTER_REGISTER.json).

18 September 2026. Audit perencanaan, bukan sertifikasi semua dialog/kit. Inventaris membaca seluruh teks 16 dokumen. Review semantik berfokus pada sistem global, karakter awal, dependency sembilan region, ending, dan konflik produksi. [Inventaris mekanis](SOURCE_INVENTORY.md) mencatat 100 karakter, 138 quest, 341 token state unik, dan 64 baris kandidat PLACEHOLDER/TBD; sebagian kandidat hanya catatan historis.

## Riwayat conflict register sebelum persetujuan

P0/P1 dan rekomendasi pada tabel ini disimpan sebagai bukti audit awal. Semua usulan di sini telah diputuskan dan dirinci dalam DESIGN_DECISIONS; tabel historis ini tidak lagi menjadi daftar keputusan terbuka. Owner adalah peran, bukan orang yang diasumsikan sudah tersedia.

| ID / prioritas | Bukti sumber | Implikasi / usulan | Owner / gate |
|---|---|---|---|
| C01 P0 | Guide §Aturan: HP/ATK/DEF +2% per level; Combat §1.3: interpolasi linear antar L1/40/60 | Kedua kurva berbeda. Pakai tabel per karakter sebagai anchor, usulan growth 2% mengikuti aturan Guide; tentukan pembulatan agar anchor tetap cocok. Jangan memakai rata-rata tier menggantikan stat individual. | Combat designer / G2 |
| C02 P0 | Guide #09 Cara didapat: korbankan Ensiklopedia; R1 NR-M06: puzzle lagu lalu Nirsmara bergabung; NR-S04 mengaitkan pengorbanan dengan Nggarindu | Usulan mengikuti Quest Script untuk jalur rekrutmen dan mempertahankan identitas/kit Guide. Catat override eksplisit, bukan dua syarat ditumpuk tanpa dasar. | Narrative designer / M1 |
| C03 P0 | Guide #01–03 punya teks Pasif tetapi tabel menyebut Common tidak pernah mendapat Passive | Tentukan apakah teks flavor, passive musuh, atau pengecualian ally. Usulan Common ally tidak membuka pasif, encounter mengikuti aturan eksplisit script; perlu keputusan sebelum test kit final. | Combat designer / G2 |
| C04 P0 | R1 NR-S03: resolution=NEUTRAL/ADI_JOINS, path=FORCED_PAST/WAITED; R9 AW-M05 membaca WAITED dari field resolution | Simpan kedua enum R1 tanpa mencampur tipe. Adapter ending membaca path WAITED; bila save lama hanya ADI_JOINS, migrasikan dengan aturan terdokumentasi. Default belum memilih bukan otomatis WAITED. | Programmer + narrative / save G2 |
| C05 P0 | R9 CS memakai SM-M06 dan HM-M04 choice, tetapi flag complete/recruited saja tidak membedakan jalur | Tambahkan field keputusan bertipe dengan provenance, misalnya endingInputs.smaranaOffer dan himagiriResolution. Jangan menyimpulkan saksi dari meter saat finale atau recruitment. Backfill hanya jika bukti save mencukupi. | Programmer / save G2 |
| C06 P1 | R6 HM-M04: checkpoint “sejak dimulai” vs “saat selesai” HM-M03; kalimat ritual juga ambigu | Usulan event reset saat HM-M03 selesai mengikuti definisi Flag, meter ritual tidak menghapus history checkpoint sampai keputusan final. Tulis truth table reset untuk kedua field. | Systems designer / M5 |
| C07 P0 | Combat §4.3 sekaligus “selesai 100%” dan “belum diaudit”; R1 S01 baris 324 dan R9 S01 baris 285 masih placeholder HP/scaling | Klaim nol placeholder tidak dipakai sebagai sertifikasi. Buat encounter registry berisi sumber/override/parameter sementara dan uji per battle; bandingkan boss flat §4.1 dengan rumus generik §3. | Combat designer + QA / tiap milestone |
| C08 P0 | Guide mengeluarkan rasio party dari cakupan; Combat §5.2 mengasumsikan 4 anggota; biaya Prana/cooldown/slot item belum lengkap pada sumber yang ditinjau | ASSUMPTION untuk spike: 4 slot configurable. Kunci tabel Prana, turn tie-break, status stacking, target, cooldown, equip sebelum B06 final. Parameter percobaan dilabeli usulan, bukan kanon. | Combat designer / G2 |
| C09 P1 | Guide Lampiran A distribusi Rare14/SR19 vs Lampiran final Rare19/SR14 | Gunakan ID roster 100 dan audit tier per entri; usulan distribusi final 26/19/19/14/13/9, jangan mengikuti tabel lama. | Content designer / registry |
| C10 P1 | UI §9 empat tingkat termasuk normal; Skema §1.9 menyebut tiga tingkat dan tiga boolean disable | Representasikan empat mode presentasi (normal + tiga degradasi); derive boolean untuk kompatibilitas. Cocokkan pemicu zona/quest; sediakan recovery dan pause di luar HUD gameplay. | UI engineer / spike G2 |
| C11 P1 | R9 AW-M05 tabel A seolah butuh semua nilai rendah, tetapi prosa menyatakan A default jika B gagal | Gunakan B hanya jika SEMUA syarat B terpenuhi; A jika tidak. C hanya bila syarat C dan diam final. Uji kasus campuran dan batas. | Narrative + QA / ending |
| C12 P1 | R9 reward H03/H04 membaca ending sebelum M05, tetapi Laras bergantung keputusan final | Pisahkan projectedEnding/eligibility dan finalEnding committed; definisikan reward provisional agar tidak menganggap C sudah terjadi. Durasi jendela diam juga perlu nilai desain eksplisit. | Narrative + systems / M7 |
| C13 P1 | Dokumen Item catatan Anawil menyatakan review Arief 08-08-2026, Guide Lampiran B/WB memiliki prasyarat review | Catat review yang dinyatakan dokumen tanpa mengklaim verifikasi eksternal; petakan cakupan art/animasi yang belum dicakup. Masukkan review visual sesuai kebutuhan sumber ke asset gate. | Art/narrative / aset regional |
| C14 P1 | Combat §2 S1 level1–15 tetapi §4.2 Kadewan lookup level16; §3.2 contoh angka tidak mengikuti rumus secara persis | Jangan normalisasi otomatis semua HP. Usulan encounter eksplisit sebagai override; band/tabel perlu direkonsiliasi dan didaftarkan pengecualiannya. | Combat designer / M3 |

## Verifikasi matematis yang direncanakan

Combat §5.4 menetapkan baseline ATK²/(ATK+1.5 DEF), elemen 1.3/0.7/1.0, crit multiplier (1+CRT_DMG). Kasus simetris ATK=DEF=535 menghasilkan 214 sebelum elemen/crit. Nilai CRT_DMG 53.5% berarti multiplier 1.535, bukan 0.535. Siklus: Apah→Teja→Bayu→Pertiwi→Akasa→Apah. Semua konstanta tetap perlu playtest.

Guide +2% dan interpolasi Combat tidak ekuivalen: pada L20 multiplier 1.02^19 sekitar 1.4568, interpolasi 1+19/39×1.165 sekitar 1.5676. Selisih ini relevan untuk encounter, bukan perbedaan pembulatan biasa. Tabel numerik per karakter tetap perlu diperiksa sebelum memilih algoritma final.

## Format decision record perubahan berikutnya

ID konflik; sourceFile+section+line; opsi; keputusan; alasan; owner; tanggal; status PROPOSED/ACCEPTED/SUPERSEDED; schema/content version terdampak; regression test; migration. C01–C14 kini ACCEPTED pada revision naw-2026-09-18.1; perubahan berikutnya harus membuat revision baru.

Scope sumber tetap 16 Markdown. Rujukan ke GDD/DOCX yang tidak termasuk scope diperlakukan sebagai gap, bukan izin memperluas sumber. Dokumen asli tidak diubah pada sesi ini.
