# UI/UX SYSTEM REQUIREMENTS
# PUSAKA: GEMA NAWANTARA

**Tanggal:** September 2026
**Tujuan:** Menerjemahkan 9 mekanik signature (World Bible) jadi daftar komponen UI konkret yang bisa diestimasi effort-nya oleh tim engineering/UI
**Sumber:** World Bible v5.3 (definisi mekanik), 9 Quest Script (penerapan detail per misi)
**Konteks:** Temuan dari `ANALISIS_DOKUMEN_KESIAPAN_PRODUKSI.md` §3.1 — 9 mekanik signature butuh 9 paradigma UI yang SEPENUHNYA berbeda, bukan 1 sistem dengan variasi kecil

---

# CARA MEMBACA DOKUMEN INI

Tiap region dipecah jadi:
- **Komponen UI Inti** — elemen visual/interaktif yang HARUS dibangun khusus untuk mekanik ini (tidak bisa dipakai ulang dari region lain)
- **Komponen yang Bisa Dipakai Ulang** — elemen yang bisa berbagi kode dengan region lain (skala reuse)
- **Kompleksitas Relatif** — estimasi kasar (Rendah/Sedang/Tinggi/Sangat Tinggi) dibanding rata-rata, BUKAN estimasi jam kerja (di luar kapasitas saya menghitung tanpa data velocity tim)
- **Dependency Sistem Lain** — apakah komponen ini butuh sistem lain lebih dulu selesai

---

# 1 — NIRWASITA: Kompas Berputar

## Komponen UI Inti
1. **HUD Compass Widget** — jarum kompas yang berputar acak (±15-45°) setelah 5 detik idle, kembali presisi saat pemain bergerak
2. **Timer Idle Detector** — sistem deteksi "pemain tidak bergerak" (bukan sekadar tidak ada input — perlu deteksi posisi world statis)
3. **Visual Landmark Highlight System** — penanda visual di dunia (pohon berbekas, batu bertanda) yang harus terlihat jelas TANPA HUD, di 3+ titik per zona navigasi

## Komponen yang Bisa Dipakai Ulang
- Timer Idle Detector berpotensi dipakai ulang di Anawil (untuk mekanik "diam" AW-H04) — REKOMENDASI: bangun sebagai sistem generik "Idle Detection Service" sejak awal, bukan spesifik Nirwasita

## Kompleksitas Relatif: **Sedang**
Bukan yang paling rumit, tapi butuh koordinasi ketat dengan tim level design (landmark harus didesain BERSAMAAN dengan compass logic, bukan environment art generik).

## Dependency
Tidak bergantung sistem lain — bisa dibangun paling awal sebagai "proof of concept" mekanik signature.

---

# 2 — KADEWAN: Ritual Otomatis (Buff/Debuff Acak)

## Komponen UI Inti
1. **Battle Timer Indicator** — "Ritual berikutnya: X ronde lagi" — TANPA menunjukkan jenis efek sampai terjadi (butuh desain khusus: countdown visible, HASIL hidden)
2. **Efek Buff/Debuff Random Reveal Animation** — animasi saat efek acak muncul (harus terasa "acak" secara visual, bukan sekadar teks popup)
3. **Siklus Malam Modifier Display** — indikator visual kalau battle terjadi malam (interval 3→2 ronde)

## Komponen yang Bisa Dipakai Ulang
- Battle Timer Indicator — pola serupa dipakai di Himagiri (Kelancangan) dan Jaladri (gelombang timing), REKOMENDASI: bangun sebagai "Battle Countdown Widget" generik dengan parameter berbeda per region

## Kompleksitas Relatif: **Rendah-Sedang**
Paling sederhana dari 9 mekanik — murni sistem RNG + timer, tidak butuh navigasi/gestur khusus.

## Dependency
Bergantung pada Battle System inti (harus ada dulu sebelum "Ritual Otomatis" bisa terintegrasi).

---

# 3 — SMARANA: Neraca Dagang (Transaksi Permanen)

## Komponen UI Inti
1. **Trade/Sell Confirmation UI dengan Peringatan Permanen** — HARUS beda dari konfirmasi jual-beli biasa, eksplisit menyatakan "hilang dari Ensiklopedia" sebelum konfirmasi final
2. **Ensiklopedia Entry Removal Animation** — visual saat entri "terjual" hilang dari koleksi pemain (dampak emosional penting untuk tema region)
3. **Harga Fluktuatif Display** — tabel harga 5 barang yang berubah tiap siklus, dengan indikator tren (naik/turun) untuk pola 3-hari
4. **Malam Hari Price Modifier** — badge/indikator "harga malam +20%"
5. **Redemption UI (SM-M07)** — sistem terpisah untuk "menebus kembali" entri yang hilang, termasuk versi teks "dipulihkan" yang berbeda dari versi asli

## Komponen yang Bisa Dipakai Ulang
- Trade Confirmation UI — bisa jadi basis untuk sistem vendor generik di region lain (Wanasunya Puti Lengang, dll.)

## Kompleksitas Relatif: **Tinggi**
Bukan cuma UI — ini butuh SISTEM DATA yang melacak status tiap entri Ensiklopedia (terjual/tidak, dari sumber mana) lintas SELURUH game, karena NR-S04 (Nirwasita) juga terhubung ke sistem penebusan yang sama (lihat `SKEMA_FLAG_COUNTER_GLOBAL.md` §2.2).

## Dependency
Bergantung pada Encyclopedia/Collection System (harus ada dulu) DAN Currency System (Kepeng).

---

# 4 — WANASUNYA: Jejak yang Menutup (Peta Sementara)

## Komponen UI Inti
1. **Penanda (Marker) Placement System** — pemain menaruh maks 5 Penanda aktif, UI untuk memilih Penanda mana dihapus saat limit tercapai
2. **Jejak Fade/Close Animation** — visual jalur yang "menutup" setelah 3-5 ronde (siang/malam beda durasi)
3. **Avatar Beast Bonus Indicator** — indikator visual saat unit Beast di party memberi bonus "mengendus jalur"

## Komponen yang Bisa Dipakai Ulang
- Marker Placement System — konsepnya mirip quest marker generik, tapi LOGIKA "menutup setelah waktu" adalah custom, tidak reuse penuh

## Kompleksitas Relatif: **Sedang-Tinggi**
Sistem "peta yang menghukum diam" (Nirwasita) vs "peta yang menghukum mondar-mandir" (Wanasunya) SECARA SENGAJA didesain berbeda (World Bible §1.2 eksplisit menegaskan ini) — tim UI TIDAK BOLEH menyederhanakan keduanya jadi 1 sistem yang sama meski terlihat mirip di permukaan.

## Dependency
Tidak bergantung sistem lain secara berat, tapi butuh World/Navmesh system yang solid untuk deteksi "jalur sudah dilewati".

---

# 5 — KALAMRTU: Aksara Kutukan (Mini-Game Susun Simbol)

## Komponen UI Inti
1. **Symbol Assembly Mini-Game** — drag/pilih potongan aksara jadi kalimat, dengan tingkat kesulitan bertingkat (3 potongan tutorial → kompleks dengan potongan rusak/tersirat di KL-M05)
2. **Prasasti Reading Progress Tracker** — visual "berapa prasasti sudah terbaca" per rantai (KL-M03 3 prasasti, dll.)
3. **Kutukan Dua Arah Visual Feedback** — indikator saat debuff "memantul balik" ke pengirimnya sendiri (baik musuh maupun party)

## Komponen yang Bisa Dipakai Ulang
- Symbol Assembly Mini-Game — TIDAK ada region lain yang butuh pola serupa persis, tapi kerangka "assembly puzzle" bisa dipakai ulang untuk JL-H01 (rekonstruksi bangkai kapal) dengan tema visual berbeda

## Kompleksitas Relatif: **Tinggi**
Mini-game custom yang dipakai berulang (tutorial → 3 level kesulitan meningkat sepanjang region) butuh desain progresif yang matang, bukan 1 sistem generik dipakai flat semua tingkat.

## Dependency
Tidak bergantung sistem lain.

---

# 6 — HIMAGIRI: Tata Krama (Meter Reputasi + Ritual Reset)

## Komponen UI Inti
1. **Kelancangan Meter Widget** — meter 0-100 yang SELALU terlihat (atau bisa diakses cepat) selama region ini
2. **2 SISTEM PARALEL TERPISAH** — `flag_kelancangan_meter` (histori penuh) DAN `flag_kelancangan_since_hm_m03` (checkpoint) — UI harus bisa menunjukkan status KEDUANYA tanpa membingungkan pemain (lihat `SKEMA_FLAG_COUNTER_GLOBAL.md` §1.6, ini kompleksitas teknis yang sudah diidentifikasi sebelumnya)
3. **Ritual Penyucian UI** — sekuens reset meter, terikat ke siklus siang-malam (hanya bisa dipakai 1x per siklus)
4. **Dialog Choice dengan Pelanggaran Consequence Preview** — beberapa pilihan dialog HARUS terlihat "berisiko" tanpa secara eksplisit bilang "ini akan menaikkan Kelancangan" (spoiler mekanik)

## Komponen yang Bisa Dipakai Ulang
- Meter Widget generik (0-100 dengan reset) — pola serupa BISA dipakai ulang untuk sistem reputasi lain jika game diperluas, tapi TIDAK ada region lain saat ini yang butuh persis pola ini

## Kompleksitas Relatif: **Sangat Tinggi**
**Ini kemungkinan besar mekanik paling kompleks secara UI dari 8 region non-Anawil** — 2 sistem tracking paralel yang harus tetap sinkron, ditambah kebutuhan UI yang "menyembunyikan mekanik" dari dialog choice supaya tidak terasa game-y.

## Dependency
Bergantung pada Dialogue System (pilihan dialog harus bisa memicu efek state tersembunyi) DAN Battle System (Kelancangan mempengaruhi buff musuh).

---

# 7 — RAJAWANI: Yang Tak Terjual (Warisan)

## Komponen UI Inti
1. **Warisan Collection Gallery** — galeri item non-tradeable yang dikumpulkan (beda dari inventaris item biasa karena TIDAK BISA dijual/dibuang)
2. **Counter Progress Indicator** — visual progres menuju threshold (20+/30+ untuk Item Spesial dan tingkatan battle final)
3. **Battle Auto-Phase-Skip Visual** — saat battle final dimulai dengan fase yang sudah "dilewati" karena Warisan terkumpul, perlu transisi visual yang jelas (bukan tiba-tiba muncul di tengah)

## Komponen yang Bisa Dipakai Ulang
- Collection Gallery — bisa berbagi kerangka dengan Ensiklopedia System (Smarana) dan koleksi Serpihan (Jaladri), ketiganya adalah variasi "koleksi progresif" — REKOMENDASI KUAT: bangun 1 "Progressive Collection System" generik dipakai ulang untuk Warisan, Ensiklopedia, DAN Serpihan, bukan 3 sistem terpisah

## Kompleksitas Relatif: **Rendah-Sedang**
Kalau direkomendasikan reuse di atas diikuti, ini jadi salah satu yang PALING MURAH diproduksi dari 9 mekanik.

## Dependency
Idealnya dibangun BERSAMAAN dengan Ensiklopedia System (Smarana) dan Serpihan System (Jaladri) sebagai 1 paket "Collection System", bukan berurutan region-per-region.

---

# 8 — JALADRI: Yang Tersebar (Serpihan Avatar)

## Komponen UI Inti
1. **Fragment Collection Progress (X/40)** — mirip Warisan tapi dengan identifikasi "avatar mana" per fragmen (butuh sub-kategorisasi, bukan cuma counter flat)
2. **Fragment Matching Mini-Game** — identifikasi visual (warna/bentuk/resonansi elemen) untuk mencocokkan fragmen ke avatar yang benar, dengan PENALTI kalau salah gabung (spawn monster)
3. **Peta yang Terhapus (Padang Abu)** — HUD peta yang di-reset TOTAL tiap keluar-masuk zona J6 — butuh sistem "map memory" yang sengaja TIDAK persisten
4. **UI Pilihan Biner Permanen (JL-M05)** — konfirmasi paling "berat" di seluruh game (echo pola NR-H03), TIDAK BISA diubah bahkan lewat retry

## Komponen yang Bisa Dipakai Ulang
- Fragment Collection — sama seperti Rajawani, REKOMENDASI gabung jadi 1 Progressive Collection System
- Peta yang Terhapus — TIDAK ada region lain yang butuh "map reset" seperti ini, murni custom Jaladri

## Kompleksitas Relatif: **Tinggi**
Kombinasi Fragment Matching (custom logic) + Peta yang Terhapus (custom persistence rule, hampir "anti-fitur" dibanding UX normal) + pilihan permanen (butuh safeguard UI ekstra kuat) membuat ini salah satu region UI-nya paling padat.

## Dependency
Fragment Collection bergantung Progressive Collection System (lihat Rajawani). Peta yang Terhapus BERLAWANAN dengan asumsi umum "map selalu persisten" — perlu dikomunikasikan eksplisit ke tim engineering supaya tidak "diperbaiki" jadi persisten oleh developer yang tidak sadar ini disengaja.

---

# 9 — ANAWIL: Tanpa Kata (Degradasi HUD Progresif)

## Komponen UI Inti — PALING KOMPLEKS DARI SELURUH GAME
1. **HUD Degradation Controller (4 Tingkat)** — sistem yang bisa mematikan elemen UI SECARA BERTAHAP dan PERMANEN per sesi:
   - Tingkat 1 (A1-A3): HUD normal, 1 elemen kecil hilang (foreshadowing)
   - Tingkat 2 (A3-A4): Dialog teks hilang total, UI battle MASIH normal
   - Tingkat 3 (A4-A5): UI battle kehilangan teks (HP bar tanpa angka, skill tanpa nama) — TAPI dialog masih dalam mode gestur dari tingkat 2
   - Tingkat 4 (A6-A7): HUD hilang TOTAL — tidak ada minimap, quest marker, indikator apa pun
2. **Gesture-Based Dialogue System** — MENGGANTIKAN dialog teks sepenuhnya dengan ikon/warna/suara — ini BUKAN dialog system biasa dengan teks disembunyikan, ini paradigma UI BERBEDA yang perlu dirancang dari nol
3. **Battle UI Tanpa Angka** — HP bar visual-only (bar tanpa nilai numerik), skill ditampilkan hanya lewat ikon animasi — sistem internal TETAP track angka penuh, hanya presentasi yang disembunyikan
4. **Idle/Diam Detection untuk Pilihan Pasif** — AW-H04 (Tanpa Rupa) memerlukan sistem "pilihan yang benar adalah TIDAK menekan tombol" — kebalikan dari UX konvensional yang biasanya mendesain supaya pemain SELALU melakukan sesuatu
5. **Spectator Cutscene System (AW-H02)** — battle non-formal, hanya 1 prompt kontekstual tanpa HUD battle sama sekali
6. **Formula Ending Global Display** — TIDAK ada UI eksplisit untuk ini (ending ditentukan otomatis), tapi butuh sistem tracking 8 input dari region lain yang harus tetap valid sampai akhir game

## Komponen yang Bisa Dipakai Ulang
- Idle Detection — SAMA dengan Nirwasita (compass idle timer), REKOMENDASI eksplisit: bangun sebagai 1 servis generik sejak Nirwasita, dipakai ulang di sini
- HP Bar Visual-Only Mode — bisa jadi "accessibility mode" atau opsi UI generik di masa depan, tapi untuk saat ini murni kebutuhan Anawil

## Kompleksitas Relatif: **SANGAT TINGGI — TERTINGGI DARI SELURUH GAME**
Ini bukan "1 komponen UI unik" seperti region lain — ini SISTEM UI YANG BISA MENDEGRADASI DIRI SENDIRI SECARA TERKONTROL, mempengaruhi HAMPIR SEMUA komponen UI lain yang sudah dibangun untuk 8 region sebelumnya (HUD, dialog, battle UI semuanya harus punya "mode tanpa teks" sebagai fallback). Dari sudut pandang arsitektur software, ini seharusnya BUKAN dikerjakan terakhir (meski secara cerita Anawil adalah finale) — **sistem degradasi ini idealnya dirancang SEJAK AWAL** sebagai bagian dari arsitektur UI inti, supaya 8 region sebelumnya dibangun dengan "hook" yang sudah kompatibel, bukan di-retrofit di akhir.

## Dependency
Bergantung pada SEMUA sistem UI dari 8 region lain (karena harus bisa "mematikan" elemen dari sistem-sistem itu) — **ini SATU-SATUNYA rekomendasi arsitektur yang saya anggap cukup penting untuk ditulis eksplisit: desain "UI Degradation Hook" sebagai bagian dari fondasi UI sejak hari pertama, jangan ditunda sampai Anawil mulai dikerjakan.**

---

# RINGKASAN — PERBANDINGAN KOMPLEKSITAS 9 MEKANIK

| Region | Kompleksitas | Alasan Utama | Reuse Signifikan? |
|---|---|---|---|
| Nirwasita | Sedang | Compass + landmark, cukup mandiri | Idle Detector → dipakai ulang Anawil |
| Kadewan | Rendah-Sedang | Murni RNG + timer | Countdown Widget → reuse luas |
| Smarana | **Tinggi** | Butuh sistem data lintas-game (Ensiklopedia) | Trade UI → basis vendor lain |
| Wanasunya | Sedang-Tinggi | Mirip Nirwasita tapi HARUS beda logic | Terbatas (disengaja beda) |
| Kalamrtu | Tinggi | Mini-game custom progresif 3 tingkat | Assembly puzzle → reuse Jaladri |
| Himagiri | **Sangat Tinggi** | 2 sistem tracking paralel + dialog hidden-consequence | Terbatas |
| Rajawani | Rendah-Sedang *(jika reuse diikuti)* | Collection sederhana | **Tinggi** — gabung Progressive Collection System |
| Jaladri | Tinggi | Fragment matching + map-reset + pilihan permanen | Sebagian (Collection System) |
| Anawil | **SANGAT TINGGI — TERTINGGI** | Mendegradasi SEMUA sistem UI lain | Idle Detector dari Nirwasita |

## Rekomendasi Arsitektur Paling Penting (2 Poin)

1. **Bangun "Progressive Collection System" generik SEJAK AWAL**, dipakai ulang untuk Ensiklopedia (Smarana), Warisan (Rajawani), DAN Serpihan (Jaladri) — 3 mekanik berbeda tapi pola UI-nya cukup mirip untuk digabung, menghemat effort signifikan dibanding membangun 3 sistem terpisah.

2. **Rancang "UI Degradation Hook" sebagai bagian arsitektur UI inti dari HARI PERTAMA**, bukan fitur yang ditambahkan saat mulai mengerjakan Anawil — karena Anawil butuh KEMAMPUAN MEMATIKAN elemen dari SEMUA sistem UI 8 region lain, jauh lebih murah kalau kemampuan itu sudah built-in sejak awal daripada di-retrofit belakangan.

---

*UI/UX System Requirements · September 2026*
*Status: 9 mekanik signature diterjemahkan jadi komponen UI konkret. 2 rekomendasi arsitektur signifikan (Progressive Collection System generik, UI Degradation Hook sejak awal) yang berpotensi menghemat effort produksi signifikan jika diikuti dari awal. Anawil dikonfirmasi sebagai mekanik UI paling kompleks di seluruh game — bukan hanya karena kontennya, tapi karena ketergantungannya ke SELURUH sistem UI region lain. Estimasi kompleksitas bersifat RELATIF (dibanding sesama 9 mekanik), BUKAN estimasi jam kerja — itu perlu data velocity tim yang tidak saya punya.*
