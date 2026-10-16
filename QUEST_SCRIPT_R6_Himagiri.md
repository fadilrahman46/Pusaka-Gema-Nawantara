# QUEST SCRIPT — REGION 6: HIMAGIRI
# PUSAKA: GEMA NAWANTARA

**Versi:** Draf v0.1 — Quest Script Detail
**Status:** 🟡 SIAP REVIEW TEKNIS — belum diimplementasi, belum playtest
**Rujukan kanon:**
- `World_Bible_Pusaka_Gema_Nawantara_v5.1.md` §BAB 6 (Himagiri)
- `GUIDE_KARAKTER_100_Nawantara_FINAL_v1.1.md` #48-56, #93-94
- `DOKUMEN_ITEM_Pusaka_Gema_Nawantara_FINAL_v1.md` §1.6, §2, §3.7, §3.10
- `KERANGKA_MISI_Pusaka_Gema_Nawantara.md` v1.1 (kerangka sumber — 14 misi Himagiri, sudah termasuk Opsi D + 2 Main Mission direvisi)
**Tanggal:** September 2026

**Verifikasi pra-scripting (checklist established R1-R5):**
- **Monster:** WB §6.8 sudah punya "Abdi Dalem Bayang" (Umum) dan "Upacara yang Mengeras" (Elite) — dipakai langsung.
- **"Cara Didapat" Legendary (Wisesa Girinatha #56) diverifikasi SEBELUM scripting.** Ditemukan syarat asli ("Kelancangan 0 sepanjang region") berpotensi mengunci mayoritas pemain dari boss utama — **Opsi D dieksekusi**: syarat dilonggarkan khusus untuk beliau (HM-M03-M04 saja), HM-H01 tetap ketat, mekanik reset "Ritual Penyucian" ditambahkan.
- **2 Main Mission ditemukan overlap identitas dengan karakter roster** (pola sama Lidah Watu/KL-M03 di Kalamrtu): HM-M02 (Pasar Hantu) = Pasarwengi #49, HM-M03 (Lima Ratus Pagi) = Sabdaguna #51. Keduanya direvisi untuk merekrut karakter terkait.
- **Seluruh pasif dikutip langsung dari GK.** Ditemukan 1 "Cara Didapat" kanon tambahan (Tabuh Senja #93 — rantai 4 tahap 1 siklus siang-malam, BUKAN "3 hari berturut" seperti draf awal) — dikoreksi di Kerangka Misi sebelum dokumen ini ditulis.

---

## KONVENSI SCRIPT

Sama seperti Quest Script R1-R5. Angka HP non-kanon tetap `[PLACEHOLDER — akan direvisi]`. Pasif/skill dikutip dari GK ditandai `(kanon)`.

**Catatan khusus Region 6:** Mekanik signature Tata Krama — perilaku pemain DI LUAR battle menentukan hasil DALAM battle. Meter Kelancangan naik akibat pelanggaran (pasukan musuh dapat buff, NPC menutup informasi), turun HANYA lewat Ritual Penyucian (mekanik baru, lihat KL-M... — maksud saya HM di bawah). Siklus siang-malam Himagiri (WB §6.12): siang = Kelancangan naik normal, malam = Tata Krama nonaktif total tapi tidak ada info baru bisa digali sampai pagi.

---

# MEKANIK RESET — RITUAL PENYUCIAN

**Implementasi berlaku sepanjang region, dirujuk di banyak misi di bawah — didefinisikan sekali di sini.**

## Trigger
- Pemain berada di lokasi tetap dekat Abdi Dalem Tua (vendor kanon, WB §6.12) SAAT transisi malam→pagi
- Prasyarat: memiliki 1x item "Kain Sembah" (dibeli dari Abdi Dalem Tua dengan Kepeng — harga TBD sistem ekonomi)

## Efek
- Meter Kelancangan direset penuh ke 0
- Konsumsi 1x Kain Sembah
- **Cooldown: 1x per siklus siang-malam** (tidak bisa spam berulang di siklus yang sama)

## Flag
- `flag_kelancangan_meter` (integer, 0-100, global untuk region — TIDAK reset otomatis antar sesi, persisten sampai direset manual lewat ritual ini ATAU dinaikkan lewat pelanggaran)
- `flag_kain_sembah_owned` (integer, stok item)
- `flag_ritual_penyucian_used_this_cycle` (boolean, reset tiap pergantian siklus siang-malam)

## Penerapan
- **HM-M04 (Wisesa Girinatha):** cek `flag_kelancangan_meter == 0` HANYA berdasarkan histori SEJAK HM-M03 dimulai (bukan sejak awal region) — lihat detail di bagian HM-M04
- **HM-H01 (Ruang Semedi Sabdaguna):** cek `flag_kelancangan_meter == 0` berdasarkan HISTORI PENUH sejak HM-M01 — tetap ketat, TAPI ritual ini memberi jalan pemulihan nyata jika pemain sempat melanggar

---

# HM-M01 · LERENG YANG MENJAGA

## Trigger
- Season 3 terbuka (S1+S2 selesai) DAN pemain memilih Himagiri (bisa sebelum/sesudah Kalamrtu)

## Flag
- `flag_hm_m01_complete`
- `flag_tata_krama_tutorial_seen`

## Struktur

### Beat 1 — Tiba di Lereng
- Cutscene: istana yang menolak mengakui sudah runtuh — abdi dalem masih bertugas meski istana kosong

### Beat 2 — Tutorial Tata Krama
- UI popup: pelajari 3 aturan dasar istana (mis. tidak boleh menyela, harus membungkuk, dll. — detail spesifik di luar cakupan generic script, perlu breakdown oleh tim narrative)
- Pelanggaran pertama (disengaja untuk tutorial) → demonstrasi visual meter Kelancangan naik + efek nyata (1 musuh tutorial dapat buff kecil)

### Beat 3 — Battle Tutorial
- **Battle Params:**
  - Musuh: 3x Abdi Dalem Bayang (kanon Umum, WB §6.8) — HP **1665 (dikoreksi hasil audit Combat Math Global — Level~37, Himagiri region kedua S3)**
  - Jika Kelancangan pemain > 0 saat battle dimulai: musuh dapat +10% ATK per 20 poin Kelancangan (demonstrasi mekanik nyata, bukan hanya kosmetik)
  - Kondisi menang: HP 0%

### Beat 4 — Reward
- Drop: Untaian Waktu Tertunda (Common Jimat, DI §1.6)
- `flag_hm_m01_complete = true`

## Fail State
- Party wipe: auto-revive 30% HP (pola tutorial standar)

---

# HM-M02 · PASAR HANTU (TITAH PASARWENGI)

**Catatan implementasi khusus — DIREVISI:** Pasarwengi (#49) BUKAN karakter terpisah dari pasar ini — ia ADALAH pasar itu, 5 "NPC hantu" adalah fragmennya.

## Trigger
- `flag_hm_m01_complete == true`
- Pemain masuk H4

## Flag
- `counter_fragmen_pasar_heard` (0-5)
- `flag_kelancangan_meter` (dipakai lintas region, didefinisikan di atas)
- `flag_pasarwengi_recruited`

## Struktur

### Beat 1 — Temukan Pasar Lengang
- Pasar Lengang hanya muncul pada jam tertentu (echo lore: "muncul di jalur pendakian pada jam tertentu dan menghilang saat disebut" — implementasi: window waktu in-game spesifik, di luar jam itu lokasi tampak kosong)

### Beat 2 — 5 Fragmen, 5 Kesempatan Tanpa Pelanggaran
- 5 "NPC hantu" tersebar di pasar — tiap satu adalah fragmen Pasarwengi (pedagang, pembeli, dll., echo lore "pedagang, pembeli, tawar-menawar, bau makanan, uang receh")
- Tiap interaksi: pilihan dialog yang BISA melanggar tata krama pasar (mis. menawar terlalu agresif, tidak sopan ke pedagang tua, dll.)
- Respons SALAH → `flag_kelancangan_meter += [PLACEHOLDER jumlah]`, fragmen itu TETAP terhitung "didengar" (tidak mengulang), tapi kualitas penyatuan di Beat 3 berkurang
- Respons BENAR → `counter_fragmen_pasar_heard += 1`, tidak ada kenaikan Kelancangan

### Beat 3 — Penyatuan
- Trigger: 5/5 fragmen "didengar" (terlepas dari benar/salah responsnya)
- **Jika seluruh 5 respons benar (0 pelanggaran selama Beat 2):** Pasarwengi menyatu utuh, dialog penuh, recruitment berjalan mulus
- **Jika ada pelanggaran:** Pasarwengi tetap menyatu (TIDAK blocking — economy region tidak boleh mengunci recruitment karena 1 kesalahan dialog), tapi 1 baris dialog tambahan muncul mencerminkan keraguannya

### Beat 4 — Battle: Upacara yang Mengeras
- **Battle Params:**
  - Musuh: Upacara yang Mengeras (kanon Elite, WB §6.8) — HP **3331 (dikoreksi hasil audit Combat Math Global — Level~37, formula ×1.5 dari Common)**
  - Ini BUKAN battle melawan Pasarwengi — ia sudah "menyatu" secara naratif, battle ini adalah gangguan terakhir (ritual yang mengeras jadi entitas) yang mencoba mencegah penyatuan sempurna
  - Kondisi menang: HP 0%

### Beat 5 — Recruitment & Reward
- `flag_pasarwengi_recruited = true` — Pasarwengi bergabung (Common, Ghost/Akasa/CC)
- Drop: Keris Pengulang (Uncommon Senjata, DI §1.6) + Jimat Menunggu Pengumuman (DI §3.7, item kanon — nama dikoreksi dari draf awal yang sempat salah karang)
- `flag_hm_m02_complete = true`

## Fail State
- Party wipe di battle: retry, `counter_fragmen_pasar_heard` dan Kelancangan yang sudah terkumpul tidak reset
- Tidak ada fail permanen dari pelanggaran dialog — hanya konsekuensi naratif ringan

---

# HM-M03 · LIMA RATUS PAGI (TITAH SABDAGUNA)

**Catatan implementasi khusus — DIREVISI:** Sabdaguna (#51) adalah sosok di balik puzzle dua kalender ini — direkrut di sini, bukan hanya jadi NPC guide pasif.

## Trigger
- `flag_hm_m02_complete == true`
- Pemain masuk H4-H5

## Flag
- `counter_pagi_disaksikan` (0-500, tapi diimplementasi sebagai counter simbolis — TIDAK literal 500 iterasi gameplay, lihat catatan implementasi)
- `flag_dua_kalender_understood`
- `flag_sabdaguna_recruited`

## Struktur

### Beat 1 — Puzzle Dua Kalender
- Dialog dengan sosok yang menyebut tahun berbeda untuk hari yang sama — pemain harus menyadari bahwa Wisesa Girinatha (disebut namanya, belum tentu hadir fisik di titik ini) hidup di Tarikh Girinata, bukan Tarikh Laras yang dipakai dunia luar
- Puzzle: cocokkan 3 tanggal dari sumber berbeda (dokumen istana, kalender rakyat, catatan Sabdaguna sendiri) untuk memahami selisih kedua tarikh

### Beat 2 — 2 Encounter Bertingkat (Tata Krama Aktif)
- **Battle Params (×2):**
  - Battle 1: HP **2253 — dikoreksi Common-tier Level~38**
  - Battle 2: HP **3316 — dikoreksi Uncommon-tier Level~38**
  - Hasil dipengaruhi `flag_kelancangan_meter` saat ini (musuh dapat buff proporsional, sama seperti mekanik HM-M01)

### Beat 3 — Pagi ke-500 (Puncak Puzzle, Simbolis)
- **Catatan implementasi:** "500 pagi" adalah angka SIMBOLIS dari lore (500 tahun Sabdaguna mengucap kalimat yang sama). Implementasi TIDAK secara literal meminta pemain mengulang 500 kali — sebagai gantinya, sistem menandai momen ini sebagai "pagi terakhir dari siklus yang sudah berlangsung tak terhitung" begitu pemain menyelesaikan puzzle dua kalender + 2 battle
- Sabdaguna mengucap kalimat kanon: *"Kerajaan ini sudah berakhir, Tuanku."* — TAPI kali ini, alih-alih raja (Wisesa Girinatha, tidak hadir langsung di titik ini) yang mengangguk dan mengabaikannya seperti 500 pagi sebelumnya, PEMAIN yang mendengar dan meresponsnya
- **Dialog Branch (flavor, tidak mengubah recruitment):**
  - `[Dengarkan sepenuhnya]` → dialog tambahan reflektif
  - `[Akui kebenarannya]` → dialog alternatif, sama-sama valid
  - Kedua opsi mengarah ke recruitment yang sama — ini bukan pilihan berkonsekuensi mekanis, murni memberi pemain ruang bereaksi

### Beat 4 — Recruitment & Reward
- `flag_sabdaguna_recruited = true` — Sabdaguna bergabung (Uncommon, Spirit/Pertiwi/Support)
- Drop: Segel Pembeku Kecil (Rare Jimat, DI §1.6) + Jimat Lima Ratus Pagi (DI §3.7, item kanon)
- `flag_hm_m03_complete = true`
- **PENTING:** Sejak titik ini, `flag_kelancangan_meter` mulai dilacak ULANG dari 0 untuk keperluan syarat HM-M04 (Opsi D — lihat bagian HM-M04). Histori SEBELUM HM-M03 tidak lagi relevan untuk syarat itu, TAPI tetap relevan untuk syarat HM-H01 (yang melacak sejak HM-M01).

## Fail State
- Party wipe di battle manapun: retry battle individual

---

# HM-M04 · UPACARA TERAKHIR (TITAH WISESA GIRINATHA)

**Catatan implementasi khusus — OPSI D:** Syarat Kelancangan dilonggarkan. Cek HANYA berdasarkan histori SEJAK HM-M03 dimulai (checkpoint reset otomatis, BUKAN manual lewat Ritual Penyucian — checkpoint ini terpisah dari mekanik ritual).

## Trigger
- `flag_hm_m03_complete == true`
- Pemain masuk H6-H7

## Flag
- `flag_kelancangan_since_hm_m03` (counter TERPISAH dari `flag_kelancangan_meter` global — mulai dari 0 otomatis saat HM-M03 selesai, TIDAK terpengaruh pelanggaran SEBELUM HM-M03)
- `flag_wisesa_girinatha_recruited`
- `flag_regalia_terakhir_obtained` (Item Spesial, DI §2)

## Struktur

### Beat 1-2 — Battle Fase 1-2 (Konvensional, MENYEDIHKAN Bukan Epik)
- **Battle Params:**
  - Musuh: Wisesa Girinatha (GK #56, Legendary Human/Teja/Tank kanon — sesuai profil awal region "kecocokan langsung") — **HP 5500 (dikonfirmasi final dari tabel kanon, bukan lagi placeholder)**
  - **Arahan nada eksplisit dari kerangka asli:** battle ini didesain terasa MENYEDIHKAN, bukan megah — implementasi harus dikoordinasikan dengan tim audio/visual (musik minor, animasi lelah, bukan dramatis-epik)
  - Jika `flag_kelancangan_since_hm_m03 > 0`: musuh dapat buff proporsional (sama mekanik region), battle fase 1-2 lebih sulit
  - Fase 1-2 berlangsung sampai HP turun ke ~30%

### Beat 3 — Fase 3: Pilih Tidak Menyerang
- Trigger: HP Wisesa Girinatha ~30%
- **Cek syarat:** `flag_kelancangan_since_hm_m03 == 0` DIBUTUHKAN untuk mengakses opsi "jadi saksi" di fase ini
  - **Jika terpenuhi:** UI menampilkan opsi "Jadi Saksi" (tidak menyerang) di samping opsi serang biasa. Memilih "Jadi Saksi" memicu Pamungkas kanon Wisesa Girinatha sendiri, battle berakhir dengan ia "mengizinkan kerajaannya akhirnya berduka"
  - **Jika TIDAK terpenuhi** (`flag_kelancangan_since_hm_m03 > 0` dan belum sempat Ritual Penyucian sejak HM-M03): opsi "Jadi Saksi" TIDAK muncul — pemain harus mengalahkan Wisesa Girinatha lewat damage konvensional sampai HP 0%. **Wisesa Girinatha TETAP bergabung di jalur ini** (Opsi D eksplisit melonggarkan syarat, bukan mengunci total) — hanya CARA mendapatkannya yang berbeda: dikalahkan, bukan disaksikan. 1 baris dialog berbeda mencerminkan ini (ia bergabung dengan nada "kalah", bukan "mengizinkan")

### Beat 4 — Recruitment & Reward
- `flag_wisesa_girinatha_recruited = true` — Wisesa Girinatha bergabung (Legendary, Human/Teja/Tank), kedua jalur (KEDUANYA memberi karakter, hanya framing dialog berbeda — konsisten dengan filosofi Opsi D bahwa ia HARUS bisa didapat mayoritas pemain)
- Drop: Regalia Upacara Terakhir (Ultra Rare Pusaka, DI §1.6)
- **Cek Item Spesial:** Regalia Terakhir (DI §2, "dari misi menjadi saksi tanpa bertarung") — **HANYA diberikan jika jalur "Jadi Saksi" (Beat 3, syarat terpenuhi) yang ditempuh**, TIDAK diberikan jika jalur damage konvensional. Ini SATU-SATUNYA elemen yang benar-benar membedakan kedua jalur secara mekanis (di luar dialog)
- `flag_hm_m04_complete = true`

## Fail State
- Party wipe fase 1-2: retry dari awal battle
- Fase 3 jalur "Jadi Saksi": tidak ada wipe condition
- Fase 3 jalur damage konvensional: party wipe memungkinkan seperti battle biasa, retry dari fase 3

---

# HM-M05 · KERATON KOSONG (PASCA-UPACARA)

## Trigger
- `flag_hm_m04_complete == true`
- Pemain masuk H7

## Flag
- `array_ruangan_kenangan` (5 ruangan)
- `flag_hm_m05_complete`

## Struktur

### Beat 1 — Eksplorasi Keraton Kosong
- Trigger: upacara berakhir, seluruh NPC menghilang (echo tema "istana yang menolak mengakui ia sudah runtuh" — sekarang benar-benar runtuh)
- 5 ruangan berisi kenangan, susun kronologi keruntuhan dari artefak (puzzle observasi, tidak wajib urutan kunjungan tertentu)

### Beat 2 — Encounter Opsional: Kenangan Terakhir
- Echo Abdi Dalem Bayang versi lampau — TIDAK wajib diselesaikan untuk lanjut
- Battle opsional: `[PLACEHOLDER]` HP 1000

### Beat 3 — Reward
- Entri Ensiklopedia (5 total, 1 per ruangan), closure naratif region
- `flag_hm_m05_complete = true`

## Fail State
- Tidak ada — eksplorasi bebas, battle opsional tidak bisa gagal secara permanen (retry battle jika diinginkan)

---

# HM-S01 · MENAHAN WAKTU (TITAH SANG GIRIPAWANA)

## Trigger
- `flag_hm_m04_complete == true` (H6 accessible penuh)
- Ditemukan di titik "pagi yang tidak berubah jadi siang" H6

## Flag
- `flag_izin_arsip_found`
- `flag_sang_giripawana_recruited`

## Struktur
- Puzzle: temukan izin yang tidak pernah datang lewat arsip istana — Sang Giripawana (#55) menahan 1 momen waktu spesifik menunggu izin yang gugur bersama kerajaan
- Battle: 1 battle di titik waktu yang tertahan, HP **5448 — dikoreksi hasil audit Combat Math Global, Super Rare-tier Level~38**. Pasif kanon "Menunggu Izin" (+1 Prana tiap efek durasi berakhir pada unit manapun, maks 2/ronde) — sebagai musuh, battle ini punya banyak efek durasi pendek yang memicu pasifnya berulang
- Drop: Jimat Menahan Waktu (DI §3.10)
- `flag_sang_giripawana_recruited = true` — Sang Giripawana bergabung (Super Rare, Ghost/Akasa/CC)

## Fail State
- Party wipe: retry battle

---

# HM-S02 · GENTA YANG TAK BERHENTI (TITAH TABUH SENJA)

**Catatan implementasi khusus — DIKOREKSI:** Kanon GK #93 "Cara Didapat" eksplisit: 4 tahap dalam 1 siklus siang-malam PENUH, bukan "3 hari berturut" seperti draf awal.

## Trigger
- `flag_hm_m03_complete == true` (H5 accessible)
- Ditemukan di menara H5

## Flag
- `counter_siklus_tahap` (0-4: pagi/siang/senja/malam)
- `flag_tabuh_senja_recruited`

## Struktur

### Beat 1-4 — 4 Tahap Siklus Siang-Malam
- **Tahap Pagi:** dengar genta pertama, catat ritmenya
- **Tahap Siang:** genta berbunyi lagi dengan ritme sedikit berbeda, pemain mulai menyadari pola
- **Tahap Senja:** genta berbunyi paling sering — TITIK KRITIS (echo lore: gentanya menahan senja agar tidak berubah jadi malam)
- **Tahap Malam (anomali):** JIKA pemain sampai tahap ini, itu berarti genta GAGAL menahan senja — encounter battle di menara terpicu di sini

### Beat 5 — Battle di Menara
- **Battle Params:**
  - Musuh: Tabuh Senja (echo/bayangan, bukan pertarungan mematikan) — HP **6537 — dikoreksi hasil audit Combat Math Global, Ultra Rare-tier di-skala ke Level~38 Himagiri**
  - Pasif kanon "Waktu yang Ditahan": jika tim (party) menunggu diserang lebih dulu (sesuai Tata Krama — tidak menyerang di ronde pertama), Tabuh Senja MEMULAI dengan 2 Prana alih-alih 0 — sebagai musuh, ini berarti membiarkan dia menyerang duluan justru membuatnya lebih kuat lebih cepat (insentif taktis untuk PARTY menyerang duluan di battle spesifik ini, kontras dengan pola "tunggu" di battle lain region)
  - Kondisi menang: HP 0%

### Beat 6 — Reward
- Drop: Senjata Genta yang Tak Berhenti (DI §3.10)
- `flag_tabuh_senja_recruited = true` — Tabuh Senja bergabung (Ultra Rare, Spirit/Teja/Attacker)
- `flag_hm_s02_complete = true`

## Fail State
- Party wipe: retry battle, progres 4 tahap tidak reset (siklus tidak perlu diulang)

---

# HM-S03 · MENUNGGU KESEMPATAN BERIKUTNYA (TITAH SABDA TERTUNDA)

## Trigger
- `flag_hm_m02_complete == true`
- Ditemukan H4

## Flag
- `flag_konteks_kalimat_500_found`
- `flag_sabda_tertunda_recruited`

## Struktur
- **0 battle** — puzzle arsip murni
- Kumpulkan konteks kenapa "kalimat ke-500" tak terucap (echo tematik dengan Sabdaguna/HM-M03, tapi Sabda Tertunda adalah entitas TERPISAH — kalimat yang TIDAK PERNAH diucapkan, kontras dengan Sabdaguna yang kalimatnya diucapkan tapi tidak didengar)
- Ucapkan kalimat itu UNTUK-nya (pemain melengkapi apa yang tidak pernah selesai)
- **Sinergi kanon:** jika Sabdaguna (#51, dari HM-M03) SUDAH ada di tim saat misi ini dikerjakan, pasif Sabda Tertunda ("Bentuk dari Penundaan") otomatis aktif penuh — dialog tambahan muncul mengenali koneksi keduanya. Ini BUKAN syarat wajib (bisa dikerjakan tanpa Sabdaguna di tim), hanya bonus flavor+mekanik jika urutannya kebetulan begitu
- Drop: Jimat Menunggu Kesempatan Berikutnya (DI §3.10)
- `flag_sabda_tertunda_recruited = true` — Sabda Tertunda bergabung (Rare, Ghost/Bayu/Support)

## Fail State
- Tidak ada — puzzle arsip bisa diulang bebas

---

# HM-S04 · MENARI UNTUK SEMBILAN (TITAH RATRI KEMUNING)

## Trigger
- `flag_hm_m02_complete == true`
- Ditemukan H3-H4

## Flag
- `flag_tarian_9_gerakan_complete`
- `flag_ratri_kemuning_recruited`

## Struktur
- Mini-game ritme: tiru 9 gerakan tari berurutan (echo pasif kanon "Tidak Bisa Diubah" — +12% ATK & +10% SPD per sekutu tumbang, mengisyaratkan tema "menari meski kehilangan")
- Battle tari: HP **4421 — dikoreksi Rare-tier Level~38**. Pasif kanon "Mengisi Celah" (+20% damage per slot tim kosong/tumbang) relevan sebagai musuh — battle lebih berbahaya kalau party kehilangan anggota di tengah jalan
- Drop: Senjata Menari untuk Sembilan (DI §3.7)
- `flag_ratri_kemuning_recruited = true` — Ratri Kemuning bergabung (Rare, Human/Akasa/Attacker)

## Fail State
- Mini-game ritme gagal: bisa diulang tanpa batas
- Party wipe: retry battle

---

# HM-S05 · IKUTI SAJA (TITAH JALAK GIRINDRA)

## Trigger
- `flag_hm_m01_complete == true`
- Ditemukan H1-H2

## Flag
- `flag_navigasi_burung_complete`
- `flag_jalak_girindra_recruited`

## Struktur
- Puzzle navigasi: ikuti Jalak Girindra (#48) TANPA bertanya arah — murni observasi gerak burung (echo pasif kanon "Tidak Tahu Cara Berhenti": +8% SPD tim bahkan saat ia tidak beraksi — tema "terus bergerak")
- 2 encounter ringan sepanjang perjalanan, HP **2253 — dikoreksi Common-tier Level~38** masing-masing
- Drop: Jimat Ikuti Saja (DI §3.7)
- `flag_jalak_girindra_recruited = true` — Jalak Girindra bergabung (Common, Beast/Bayu/Support)

## Fail State
- Tersesat mengikuti burung: kembali ke titik awal, tidak ada penalti keras

---

# HM-H01 · RUANG SEMEDI SABDAGUNA

**Catatan implementasi khusus — OPSI D:** Syarat TETAP KETAT (tidak dilonggarkan seperti HM-M04), tapi sekarang bisa dicapai lewat Ritual Penyucian jika pemain sempat melanggar.

## Trigger
- `flag_kelancangan_meter == 0` (histori PENUH sejak HM-M01, BUKAN checkpoint HM-M03 seperti HM-M04)
- Area Tersembunyi H3 (WB §6.12) terbuka otomatis saat syarat terpenuhi

## Flag
- `flag_hm_h01_complete`

## Struktur
- **0 battle** — akses murni berdasar syarat Kelancangan
- Dialog eksklusif tentang Wisesa Girinatha muda (konten sebelum keruntuhan — kontras dengan gambaran "MENYEDIHKAN" di HM-M04)
- **Catatan penting:** jika Sabdaguna (#51) sudah direkrut (HM-M03), ada kemungkinan dialog tambahan di sini karena ia sosok yang paling mengenal Wisesa Girinatha muda — TBD apakah ini diimplementasi sebagai variasi dialog atau dianggap di luar cakupan awal
- Reward: 2 entri Ensiklopedia eksklusif
- `flag_hm_h01_complete = true`

## Fail State
- Tidak ada battle. Jika Kelancangan naik SETELAH area ini terbuka (pemain sudah masuk), area TETAP bisa diakses lagi (syarat dicek saat MEMBUKA akses pertama kali, bukan tiap kunjungan — mencegah area "terkunci lagi" secara tidak adil)

---

# HM-H02 · TETAP MENYALA (TITAH WANASPATI GIRI)

## Trigger
- `flag_hm_m01_complete == true`
- Ditemukan H3

## Flag
- `flag_api_tidak_padam_found`
- `flag_wanaspati_giri_recruited`

## Struktur
- Puzzle: temukan api yang tidak padam di hutan pinus bisu, ikuti cahaya (echo pasif kanon "Tidak Pernah Dipadamkan": meledak AoE + Bakar saat tumbang — tema "tidak pernah benar-benar padam")
- Battle berbasis Teja, HP **3316 — dikoreksi Uncommon-tier Level~38**
- Drop: Senjata Tetap Menyala (DI §3.7)
- `flag_wanaspati_giri_recruited = true` — Wanaspati Giri bergabung (Uncommon, Spirit/Teja/Attacker)

## Fail State
- Party wipe: retry battle

---

# HM-H03 · HUTAN YANG TIDAK BERBUNYI (TITAH GANDARWA PINUS)

## Trigger
- `flag_hm_m01_complete == true` (H3-H4 accessible)
- Ditemukan H3-H4
- **Catatan: encounter WAJIB (bukan opsional) — sesuai keputusan battle balance Himagiri sebelumnya (HM-H03 dinaikkan dari opsional ke wajib untuk memperbaiki distribusi Zero Battle region)**

## Flag
- `flag_navigasi_sunyi_complete`
- `flag_gandarwa_pinus_recruited`

## Struktur
- Puzzle: navigasi hutan yang DIAM SEMPURNA — identifikasi arah dari vibrasi tanah, bukan suara (mekanik unik: HUD audio-cue dinonaktifkan, feedback visual/haptic sebagai gantinya)
- Battle berbasis Bayu (WAJIB), HP **4421 — dikoreksi Rare-tier Level~38**. Pasif kanon "Memikul Kebohongan" (heal 10% HP maks tiap skill lawan dibatalkan/tertunda) — sebagai musuh, battle ini butuh party memakai CC/silence untuk memaksimalkan tekanan, tapi itu justru menyembuhkannya — insentif taktis untuk damage langsung alih-alih CC berlebihan
- Drop: Pusaka Hutan yang Tidak Berbunyi (DI §3.7)
- `flag_gandarwa_pinus_recruited = true` — Gandarwa Pinus bergabung (Rare, Spirit/Bayu/CC)

## Fail State
- Tersesat navigasi sunyi: kembali ke titik awal
- Party wipe: retry battle

---

# HM-H04 · TIDAK ADA YANG MEMBATALKAN (TITAH KURAWATU)

## Trigger
- `flag_hm_m01_complete == true`
- Ditemukan H2-H3

## Flag
- `flag_pintu_dipilih` (1 dari 3, permanen untuk playthrough)
- `flag_kurawatu_recruited`

## Struktur
- Puzzle: temukan keputusan yang tidak bisa dibatalkan — pilih 1 dari 3 pintu, SISANYA TERTUTUP PERMANEN (echo pasif kanon Kurawatu "Perintah Lama": +30% DEF berkurang tiap ronde, "paling kuat sebelum ada yang memerintahkannya bergerak" — tema keputusan yang mengunci)
- **PENTING implementasi:** ini butuh UI konfirmasi jelas SEBELUM memilih pintu (mirip pola NR-H03 Nirwasita) — 2 pintu yang tidak dipilih TIDAK bisa diakses lagi untuk sisa playthrough, meski ini TIDAK menghalangi progres apa pun lain (hanya konten kosmetik/flavor di balik pintu yang tidak dipilih, BUKAN karakter atau item penting — dipastikan tidak ada kehilangan konten signifikan)
- Battle di balik pintu terpilih berbasis Pertiwi, HP **2253 — dikoreksi Common-tier Level~38**
- Drop: Pusaka Tidak Ada yang Membatalkan (DI §3.7)
- `flag_kurawatu_recruited = true` — Kurawatu bergabung (Common, Human/Pertiwi/Tank)

## Fail State
- Party wipe: retry battle (pilihan pintu tidak berubah)
- Pintu yang tidak dipilih: TIDAK bisa diakses lagi — sesuai desain permanen, tapi dipastikan tidak ada konten kritis di baliknya

---

# RINGKASAN DEPENDENCY GRAPH — REGION 6

```
HM-M01 (Lereng yang Menjaga) ──┬──→ HM-S05 (Jalak Girindra)
   ↓                            ├──→ HM-H02 (Wanaspati Giri)
   ↓                            ├──→ HM-H03 (Gandarwa Pinus, WAJIB)
   ↓                            └──→ HM-H04 (Kurawatu)
HM-M02 (Pasar Hantu → Pasarwengi) ──→ HM-S03 (Sabda Tertunda) [sinergi opsional dengan Sabdaguna]
   ↓                                  └──→ HM-S04 (Ratri Kemuning)
HM-M03 (Lima Ratus Pagi → Sabdaguna) ──[checkpoint flag_kelancangan_since_hm_m03]──┬──→ HM-S02 (Tabuh Senja)
   ↓                                                                                
HM-M04 (Wisesa Girinatha) ──[Opsi D: syarat longgar]──→
HM-M05 (Keraton Kosong) ──→ HM-S01 (Sang Giripawana, H6 accessible)

[Independen, dicek sepanjang region]: HM-H01 (Ruang Semedi) ── syarat Kelancangan 0 PENUH sejak HM-M01
```

## Titik Kritis Dependency

1. **DUA sistem tracking Kelancangan berjalan paralel** — `flag_kelancangan_meter` (histori penuh, untuk HM-H01) dan `flag_kelancangan_since_hm_m03` (checkpoint, untuk HM-M04). Implementasi HARUS membedakan keduanya dengan jelas; jika tertukar, salah satu syarat jadi tidak berfungsi sesuai desain Opsi D.

2. **HM-M02 dan HM-M03 sekarang Main Mission dengan recruitment** — mengubah asumsi lama bahwa hanya HM-M04 (boss) yang merekrut karakter di jalur Main. Perlu dipastikan UI/sistem log misi menampilkan reward karakter untuk KETIGA Main Mission ini (M02, M03, M04), bukan cuma M04.

3. **HM-S03 (Sabda Tertunda) sinergi dengan Sabdaguna bersifat opsional** — tidak boleh diimplementasi sebagai prasyarat keras, hanya bonus dialog/mekanik jika urutan rekrutmen kebetulan begitu.

---

# ITEM TINDAK LANJUT UNTUK MANUSIA

1. **HP Wisesa Girinatha masih placeholder** (diestimasi 5300) — perlu verifikasi ke tabel stat lengkap GK #56.

2. **"Pagi ke-500" di HM-M03 diimplementasi simbolis, bukan literal** — saya asumsikan ini pendekatan yang benar (tidak ada game yang secara realistis meminta 500 iterasi), tapi perlu dikonfirmasi tim narrative bahwa penyederhanaan ini tidak kehilangan esensi tematik yang dimaksud.

3. **Dialog tambahan HM-H01 jika Sabdaguna sudah direkrut** — saya tandai sebagai "TBD apakah diimplementasi", bukan keputusan final. Ini nice-to-have, bukan kebutuhan struktural.

4. **Kedua sistem Kelancangan (global vs checkpoint) menambah kompleksitas teknis signifikan** — perlu dikonfirmasi tim engineering bahwa 2 counter paralel untuk 1 mekanik region tidak menimbulkan bug/kebingungan sistem save-file.

5. **Combat math placeholder** — status sama seperti R1-R5: direvisi setelah Quest Script 9 region selesai.

---

*Quest Script Region 6 — Draf v0.1 · September 2026*
*Status: 14/14 misi Himagiri di-script detail. 0 monster region baru tanpa alasan. 1 restrukturisasi besar (Opsi D — Wisesa Girinatha) + 2 Main Mission direvisi untuk merekrut karakter yang identitasnya sudah cocok (Pasarwengi/HM-M02, Sabdaguna/HM-M03) + 1 koreksi "Cara Didapat" (Tabuh Senja — 4 tahap 1 siklus, bukan 3 hari). Seluruh pasif karakter diverifikasi langsung ke Guide Karakter. 5 item tindak lanjut untuk manusia. Belum diimplementasi, belum playtest.*
