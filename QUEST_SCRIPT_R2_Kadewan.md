# QUEST SCRIPT — REGION 2: KADEWAN
# PUSAKA: GEMA NAWANTARA

**Versi:** Draf v0.1 — Quest Script Detail
**Status:** 🟡 SIAP REVIEW TEKNIS — belum diimplementasi, belum playtest
**Rujukan kanon:**
- `World_Bible_Pusaka_Gema_Nawantara_v5.1.md` §BAB 2 (Kadewan)
- `GUIDE_KARAKTER_100_Nawantara_FINAL_v1.1.md` #10-19, #86
- `DOKUMEN_ITEM_Pusaka_Gema_Nawantara_FINAL_v1.md` §1.2, §2, §3.3, §3.10
- `KERANGKA_MISI_Pusaka_Gema_Nawantara.md` v0.3 (kerangka sumber — 15 misi Kadewan, termasuk KD-S06 yang ditambahkan setelah gap Kala Sesari ditemukan di draf v0.1 dokumen ini)
- `QUEST_SCRIPT_R1_Nirwasita.md` v0.2 (pola konvensi diwariskan dari sini)
**Tanggal:** September 2026

**Pelajaran diterapkan dari Quest Script R1:** Sebelum menciptakan monster baru, saya cek World Bible §2.8 terlebih dahulu. Kanon sudah punya "Penari Kosong" (Umum, D1-D3) dan "Sesaji Berjalan" (Elite, D5) — keduanya dipakai persis sesuai kerangka asli, TIDAK ada monster baru diciptakan untuk KD-M01 dan KD-M03. Untuk KD-M04 dan KD-M05 (D5-D6, tidak ada entri kanon di zona itu), monster baru ditandai eksplisit dan diusulkan masuk WB §2.8 — lihat §Item Tindak Lanjut.

---

## KONVENSI SCRIPT

Sama seperti Quest Script R1 Nirwasita — lihat dokumen tersebut untuk definisi lengkap Flag/Trigger/Battle Params/Dialog Branch/Fail State. Semua angka HP/ATK yang BERSUMBER dari Guide Karakter (karakter roster) adalah kanon Level 1. Semua angka untuk monster musuh murni yang tidak tercatat di GK adalah `[PLACEHOLDER — akan direvisi]` mengikuti keputusan combat math global (ditunda sampai Quest Script 9 region selesai, per keputusan yang sudah dibuat di R1).

---

# KD-M01 · UPACARA PAGI

## Trigger
- `flag_nr_m06_complete == true` DAN Resolusi Region Nirwasita sudah dievaluasi (region S1 linear — Kadewan terbuka otomatis setelah Nirwasita tamat)

## Flag
- `flag_kd_m01_started`, `flag_kd_m01_complete`
- `flag_ritual_otomatis_tutorial_seen`
- `counter_upacara_answer` (tracking jawaban salah pemain — flavor saja, tidak mempengaruhi progres)

## Struktur

### Beat 1 — Menyaksikan Upacara Pagi (0-5 menit)
- Cutscene pendek: pemain tiba di D1 Sawah Laras, melihat upacara pagi berjalan sempurna — gerakan presisi tapi tanpa penonton yang paham maknanya
- Jero Mangku memimpin ritual, terlihat menjalankan gerakan otomatis tanpa ekspresi

### Beat 2 — Dialog "Apa Artinya?"
- Trigger: upacara selesai, Jero Mangku mendekati pemain
- Pertanyaan: "Kau lihat semua itu. Menurutmu, apa artinya?"
- **4 opsi jawaban — SEMUA SALAH secara desain:**
  - `[Untuk memohon berkat]` → Jero Mangku: "Mungkin. Tapi berkat dari siapa?"
  - `[Untuk mengusir yang jahat]` → Jero Mangku: "Mungkin. Tapi kenapa dilakukan tiap pagi, bukan saat ada ancaman?"
  - `[Sekadar tradisi]` → Jero Mangku: "Itu jawaban orang yang menyerah mencari tahu."
  - `[Aku tidak tahu]` → Jero Mangku: "Setidaknya kau jujur. Aku juga tidak tahu."
- **PENTING implementasi:** tidak ada flag "jawaban benar" — `counter_upacara_answer` hanya menyimpan pilihan untuk kemungkinan callback dialog minor di misi lain (opsional, tidak wajib diimplementasi jika terlalu kompleks untuk MVP)
- Ini poin naratif inti: ketiadaan jawaban benar ADALAH pointnya, bukan bug desain

### Beat 3 — Tutorial Ritual Otomatis (Battle)
- Trigger: Jero Mangku mengarahkan pemain ke D2, encounter pertama muncul di jalan
- **Battle Params:**
  - Musuh: 2x Penari Kosong (kanon WB §2.8, Umum, Ghost/Akasa) — HP **1066 (dikoreksi hasil audit Combat Math Global — Level~12, Kadewan sedikit lebih tinggi dari Nirwasita karena posisi kedua di S1)**
  - **Mekanik Ritual Otomatis aktif:** tiap 3 ronde, sistem menerapkan 1 buff ATAU 1 debuff ACAK ke party (50/50 kemungkinan) — tanpa pemain bisa memilih atau memprediksi jenisnya sebelum ronde ke-3 tiba
  - UI: indikator "Ritual berikutnya: X ronde lagi" ditampilkan (jenis efek TIDAK ditampilkan sampai efek terjadi — ini penting, prediktabilitas parsial adalah inti tutorial)
  - Kondisi menang: HP musuh 0%

### Beat 4 — Reward & Transisi
- Drop: Lembar Doa Usang (Common Kitab, DI §1.2)
- Jero Mangku memberi akses D2
- `flag_kd_m01_complete = true`

## Fail State
- Party wipe: auto-revive 30% HP (sama seperti Nirwasita tutorial), tidak ada penalti permanen

---

# KD-M02 · DUA YANG SATU

## Trigger
- `flag_kd_m01_complete == true`
- Pemain masuk D2 Wana Wanara, lanjut ke D3 Bale Ombak

## Flag
- `flag_bharwang_kesari_recruited`, `flag_rarwang_celeng_recruited`
- `flag_kd_m02_path` (enum: SIDED_BHARWANG / SIDED_RARWANG / NEUTRAL_PATIENCE)
- `counter_neutral_rounds` (0-5, untuk jalur diam)

## Struktur

### Beat 1 — Menyaksikan Pertarungan
- Trigger: pemain masuk area D3
- Cutscene: Bharwang Kesari (#13) dan Rarwang Celeng (#14) sedang bertarung satu sama lain — pola yang menurut lore GK #13 "sudah ribuan tahun tanpa pernah menang" (echo pasif "Pasangan": jika keduanya di tim yang sama, +25% seluruh stat — di sini mereka justru saling melawan, ironi disengaja)
- Dialog sistem/narator: "Mereka tidak benar-benar musuh. Tapi Kadewan lupa itu, dan mulai bersorak untuk satu pihak saja — sekarang giliranmu memilih, atau tidak."

### Beat 2 — Battle Bercabang 3 Jalur
- **Jalur A — `[Bantu Bharwang Kesari]`:**
  - Battle 3 ronde, party + Bharwang Kesari (dipinjam sementara sebagai ally unit, Tank, **HP 2281 — dikoreksi hasil audit Combat Math Global, Uncommon-tier di-skala ke Level~16 Kadewan, ATK/DEF proporsional dari rasio kanon 750:825**) vs Rarwang Celeng (musuh, **HP 2281, sama skala**)
  - Menang → `flag_kd_m02_path = SIDED_BHARWANG`. HANYA Bharwang Kesari bergabung. Rarwang Celeng TIDAK bergabung, hilang dari region (flag `flag_rarwang_celeng_recruited = false` permanen untuk playthrough ini kecuali direkrut ulang lewat mekanik lain di luar cakupan region ini)
- **Jalur B — `[Bantu Rarwang Celeng]`:**
  - Battle 3 ronde, party + Rarwang Celeng (Attacker, **HP 2281 — sama skala Level~16**) vs Bharwang Kesari (musuh, **HP 2281, sama skala**)
  - Menang → `flag_kd_m02_path = SIDED_RARWANG`. HANYA Rarwang Celeng bergabung.
- **Jalur C — `[Tidak membantu siapa pun]` (opsi tersembunyi, tidak muncul di menu default):**
  - Terungkap jika pemain memilih "Amati" alih-alih menyerang di giliran pertama — UI menu battle menampilkan opsi tambahan "Amati" di antara opsi biasa (Serang/Skill/Item) HANYA di battle spesifik ini
  - `counter_neutral_rounds` naik tiap ronde party TIDAK menyerang siapa pun (murni bertahan/guard)
  - Setelah `counter_neutral_rounds == 5`: kedua NPC berhenti sendiri, kelelahan
  - `flag_kd_m02_path = NEUTRAL_PATIENCE`. **KEDUANYA bergabung** — Bharwang Kesari DAN Rarwang Celeng, pasif "Pasangan" mereka otomatis aktif (+25% stat masing-masing selama satu tim)

### Beat 3 — Reward
- Berdasarkan `flag_kd_m02_path`:
  - SIDED_BHARWANG atau SIDED_RARWANG: 1 karakter bergabung, drop 1 Titah item (DI §3.3, sesuai karakter yang direkrut)
  - NEUTRAL_PATIENCE: kedua karakter bergabung, drop KEDUA Titah item
- `flag_kd_m02_complete = true`

## Fail State
- Jalur A/B: party wipe → retry battle dari awal (jalur pilihan tidak reset, harus pilih ulang sisi yang sama atau ganti)
- Jalur C: TIDAK ADA fail state HP — musuh saling menyerang satu sama lain (bukan party), party hanya perlu bertahan. Jika pemain SALAH menyerang di tengah percobaan jalur C (misal reflex klik "Serang"), `counter_neutral_rounds` reset ke 0, battle berlanjut sebagai Jalur A/B tergantung siapa yang diserang — **desain ini konsisten dengan kerangka asli** ("jika pemain menyerang duluan, battle reset" — pola yang sama dipakai NR-M03 Tandaraga)

---

# KD-M03 · DOA YANG SALAH SATU BARISNYA BENAR

## Trigger
- `flag_kd_m02_complete == true`
- Pemain masuk D3-D5

## Flag
- `flag_jero_mangku_chain_stage` (integer 0-3 — dipakai lintas KD-M03, KD-M04, KD-M06)
- `array_doa_lines_eliminated` (tracking baris mana yang sudah dieliminasi dari 7 baris)
- `flag_doa_line_identified` (integer 1-7, baris mana yang pemain identifikasi sebagai benar)

## Struktur

### Beat 1 — Investigasi 7 Baris Doa
- Trigger: bicara ke Jero Mangku di D3, ia menjelaskan temuannya
- `flag_jero_mangku_chain_stage = 2` (stage 1 dianggap sudah terjadi di KD-M01 secara implisit — pertemuan pertama)
- 7 baris doa, masing-masing punya 1 lokasi clue tersebar D3-D5 (implementasi: interactable object per lokasi, tidak perlu quest marker eksplisit untuk semua — 4 dari 7 punya marker, 3 sisanya butuh eksplorasi ringan, menyeimbangkan antara aksesibilitas dan rasa penemuan)
- Tiap clue yang ditemukan mengeliminasi 1-2 baris dari daftar 7 (`array_doa_lines_eliminated` bertambah)
- Pemain BISA menebak sebelum menemukan semua clue — tapi menebak salah mengharuskan pemain kumpulkan clue lagi (bukan reset total, hanya kembali ke state "belum menebak")

### Beat 2 — Battle: Sesaji Berjalan
- Trigger: 1 dari 7 lokasi clue dijaga oleh Sesaji Berjalan (kanon Elite, WB §2.8, di D5)
- **Battle Params:**
  - Musuh: Sesaji Berjalan — HP **2132 (dikoreksi hasil audit Combat Math Global — Elite di Level~12, formula ×1.5 dari Common)**
  - **Ritual Otomatis versi malam (WB §2.12):** jika battle terjadi malam hari in-game, interval buff/debuff acak turun dari tiap 3 ronde menjadi tiap 2 ronde (lebih sering, lebih intens — sesuai siklus malam Kadewan)
  - Kondisi menang: HP 0%

### Beat 3 — Identifikasi Baris Benar
- Trigger: seluruh 7 clue collected ATAU pemain memilih untuk menebak dengan clue parsial (opsi "Tebak Sekarang" selalu tersedia, dengan risiko salah)
- UI: pilih 1 dari baris yang TERSISA (belum dieliminasi) sebagai jawaban final
- Benar → `flag_doa_line_identified` diset, `flag_jero_mangku_chain_stage = 2` (progres rantai lanjut)
- Salah → kembali ke Beat 1, `array_doa_lines_eliminated` TIDAK reset (clue yang sudah dikumpulkan tetap ada), pemain harus cari clue tambahan untuk baris yang tersisa

### Beat 4 — Reward
- Drop: Mantra yang Dilupakan Artinya (Uncommon Kitab, DI §1.2)
- `flag_kd_m03_complete = true`

## Fail State
- Battle Sesaji Berjalan: party wipe → retry, clue yang sudah dikumpulkan tidak hilang
- Menebak baris salah: tidak ada penalti keras, hanya perlu clue tambahan (dijelaskan di atas)

---

# KD-M04 · EFISIENSI ATAU MAKNA

**Catatan implementasi khusus:** Ini titik keputusan PALING KRITIS di region — menentukan Resolusi Region DAN mempengaruhi battle final KD-M06. Implementasi harus benar-benar tidak condong ke salah satu pilihan lewat framing UI (warna netral, tidak ada ikon "baik/buruk").

## Trigger
- `flag_kd_m03_complete == true` DAN `flag_doa_line_identified` sudah terisi (baris benar teridentifikasi)
- Pemain masuk D5-D6

## Flag
- `flag_kd_resolution_path` (enum: MEANING / EFFICIENCY) — **PALING PENTING di region ini**, dipakai WB §2.10 Resolusi Region dan battle KD-M06
- `flag_jero_mangku_recruited_as_npc` (boolean, hanya true jika jalur MEANING)

## Struktur

### Beat 1 — Data Disajikan (Bukan Disembunyikan)
- Trigger: Jero Mangku menyampaikan temuan lengkap
- **Data mekanis eksplisit ditampilkan ke pemain (BUKAN disembunyikan sebagai "misteri"):**
  - "Sang Werdi memberi tim +20% heal & buff selama ritual dijalankan — bahkan tanpa makna."
  - "Jika 1 baris dipulihkan maknanya, bonus itu akan turun ke +15% — tapi ritual akan benar-benar dipahami untuk pertama kalinya dalam berabad-abad."
- Ini SENGAJA transparan secara mekanis — pemain membuat keputusan dengan informasi lengkap, bukan menebak-nebak konsekuensi tersembunyi

### Beat 2 — Dialog Bercabang 4 Lapis
- Lapis 1-3: eksplorasi alasan pemain (opsional flavor, tidak mengubah hasil akhir — hanya memperkaya reaksi NPC)
- Lapis 4 (final): `[Pulihkan makna baris ini]` vs `[Biarkan kosong]`
- **TIDAK ADA lapis "netral"/"tunda keputusan"** — berbeda dari KD-M02, di sini keputusan harus diambil untuk melanjutkan progres region (linear gate)

### Beat 3A — Jalur MEANING (jika pilih "Pulihkan")
- `flag_kd_resolution_path = MEANING`
- **Battle: "Ritual yang Memberontak"**
  - Musuh: manifestasi ritual — HP **2281 — dikoreksi Elite ×1.5 Level~16 Kadewan**, 3 fase (fase berganti tiap 33% HP hilang)
  - Battle KONVENSIONAL (tidak ada mekanik puzzle khusus di battle ini — pilihan sudah dibuat di Beat 2, battle ini murni konsekuensi naratif dari pilihan tersebut)
  - Menang → Jero Mangku bergabung sebagai NPC pendukung (implementasi Padepokan, di luar cakupan dokumen region), `flag_jero_mangku_recruited_as_npc = true`
  - Sang Werdi pasif berubah dari +20% ke +15% (perubahan permanen untuk sisa game — dicatat di flag global karakter Sang Werdi, bukan hanya region-scoped)

### Beat 3B — Jalur EFFICIENCY (jika pilih "Biarkan kosong")
- `flag_kd_resolution_path = EFFICIENCY`
- **0 battle** — transisi langsung ke D6
- Jero Mangku TIDAK bergabung, dialog penutup singkat menunjukkan kekecewaan halus (bukan kemarahan — konsisten nada region ini)
- Sang Werdi pasif tetap +20% (utuh)

### Beat 4 — Transisi
- Kedua jalur: akses D6 terbuka
- `flag_kd_m04_complete = true`

## Fail State
- Jalur MEANING battle: party wipe → retry battle (pilihan tidak bisa diubah setelah battle dimulai — mencegah "save scumming" untuk melihat kedua hasil tanpa komitmen naratif, TAPI ini keputusan desain yang bisa didebat — lihat §Item Tindak Lanjut)

---

# KD-M05 · SEMBILAN RATUS TAHUN TERAKHIR

## Trigger
- `flag_kd_m04_complete == true`
- Pemain masuk D6 Nusa Gersang

## Flag
- `array_upacara_points_visited` (4 titik, urutan tercatat)
- `flag_kd_m05_complete`

## Struktur

### Beat 1 — Puzzle Jejak Upacara
- 4 titik di D6 harus dikunjungi dalam urutan TERTENTU — polanya hanya terlihat dari 1 sudut pandang spesifik (mekanik kamera/observasi: pemain harus menemukan titik pandang di mana ke-4 titik membentuk garis/pola yang jelas, kemungkinan lewat elevasi tertentu di peta)
- Salah urutan → tidak ada battle instan, tapi debuff "Ritual Otomatis Tambahan" diterapkan ke party (1 debuff ekstra acak) sampai pemain kembali ke titik pertama dan mengulang dengan urutan benar

### Beat 2 — 3 Battle Bertingkat
- Trigger: urutan benar tercapai, jalan menuju D7 terbuka, tapi dijaga 3 encounter berturut
- **Battle Params:**
  - Musuh generik D6 (echo Kala Sesari #11 — GK #11 lore "900 tahun", HP kanon Level 1: 1000, ATK 500, DEF 550, tapi INI BUKAN Kala Sesari sendiri yang direkrut di sini — ini variasi musuh bertema serupa. Kala Sesari sendiri direkrut lewat mekanisme lain di luar cakupan Main Mission ini, kemungkinan Side Mission tambahan yang BELUM ada di kerangka — lihat §Item Tindak Lanjut)
  - **Pola "makin kuat tiap ronde ganjil":** battle 1 = normal, battle 2 = musuh +15% ATK di ronde ganjil (1,3,5), battle 3 = musuh +30% ATK di ronde ganjil — mengeskalasi echo tema "900 tahun tanpa jeda, makin berat"

### Beat 3 — Reward
- Drop dari encounter terakhir: Genta Tanpa Suara (Rare Pusaka, DI §1.2)
- `flag_kd_m05_complete = true`, akses D7 terbuka

## Fail State
- Party wipe di battle manapun: retry battle individual, tidak mengulang seluruh chain 3 battle

---

# KD-M06 · RASA YANG KEMBALI

## Trigger
- `flag_kd_m05_complete == true`
- Pemain masuk D7 Puncak Laras

## Flag
- `flag_sang_werdi_recruited`
- `flag_kd_m06_complete`
- `flag_genta_makna_obtained` (Item Spesial — syarat: `flag_jero_mangku_chain_stage` mencapai nilai final DAN `flag_kd_resolution_path == MEANING`)

## Struktur

### Beat 1 — Battle Bercabang Berdasarkan Resolusi Region

**Jika `flag_kd_resolution_path == MEANING`:**
- Sang Werdi HP dikurangi (2 fase, bukan 3) — HP kanon Level 1: 5000, tapi untuk 2-fase battle, threshold fase 2 di 50% (bukan 66%/33% seperti battle 3 fase biasa)
- Fase 2 (final): sistem tidak menerima damage lagi — pemain harus menjawab "mengapa ritual dilakukan" lewat UI pilihan 3-4 opsi, dengan jawaban BENAR bergantung pada clue yang dikumpulkan sepanjang rantai Jero Mangku (`flag_doa_line_identified` dari KD-M03 dipakai untuk menentukan opsi mana yang "benar" dalam konteks battle ini)
- Jawaban benar → battle berakhir (Sang Werdi "diingatkan", bukan HP 0% — echo mekanik Nirsmara NR-M06)
- Jawaban salah → Sang Werdi heal 20%, coba lagi (tidak ada limit percobaan)

**Jika `flag_kd_resolution_path == EFFICIENCY`:**
- Sang Werdi HP penuh (3 fase konvensional, threshold 66%/33%)
- Battle standar, tidak ada mekanik puzzle tambahan — pemain "menang" dengan cara konvensional, konsisten dengan tema "efisiensi tanpa makna"

### Beat 2 — Recruitment & Reward
- `flag_sang_werdi_recruited = true` (kedua jalur — Sang Werdi TETAP bergabung terlepas dari resolusi, hanya CARA mengalahkannya yang berbeda)
- Drop: Restu yang Menguat dalam Diam (Ultra Rare Pusaka, DI §1.2)
- **Cek Item Spesial:** jika `flag_kd_resolution_path == MEANING` → berikan Genta Makna (Item Spesial, DI §2), set `flag_genta_makna_obtained = true`. Jika EFFICIENCY → Item Spesial TIDAK didapat di playthrough ini (perlu new game+ atau mekanik lain untuk retroactive, di luar cakupan)
- `flag_kd_m06_complete = true`
- Trigger: buka akses Season 2 (Smarana + Wanasunya, bebas urutan — WB §II.1)

## Fail State
- Party wipe: retry dari awal battle (fase yang sudah dilewati harus diulang — TIDAK ada checkpoint mid-battle untuk boss fight, konsisten dengan pola NR-M06)

---

# KD-S01 · URUTAN YANG DIWARISKAN (TITAH JURU WANGSUH)

## Trigger
- `flag_kd_m01_complete == true`
- Bicara ke Juru Wangsuh (#10) di D1-D2

## Flag
- `flag_juru_wangsuh_recruited`
- `array_cuci_steps_performed` (7 langkah, tracking urutan pemain)

## Struktur
- 7 langkah urutan cuci ritual — pemain mengulang PERSIS urutan yang didemonstrasikan Juru Wangsuh
- **Twist:** langkah ke-5 SENGAJA salah di demonstrasi asli (Juru Wangsuh sendiri tidak sadar) — jika pemain MENGULANG kesalahan itu persis (mengikuti demonstrasi apa adanya), itu dianggap "urutan benar" untuk tujuan misi (karena tujuannya adalah mengikuti warisan, bukan mengoreksi — echo lore GK #10 "ia melakukannya dengan sempurna, itu bagian yang menyedihkan")
- Battle: encounter air tercemar di D2 (monster berbasis Apah, kanon atau baru — TBD, lihat §Item Tindak Lanjut), lemah terhadap elemen Teja
- Selesai → `flag_juru_wangsuh_recruited = true`
- Drop: Kitab Urutan yang Diwariskan (DI §3.3)

## Fail State
- Tidak ada — bahkan "kesalahan" langkah ke-5 dianggap sebagai keberhasilan tematik

---

# KD-S02 · LUPA BENTUK ASLI (TITAH RARWANG CELENG)

## Trigger
- `flag_kd_m02_complete == true` DAN `flag_kd_m02_path != SIDED_BHARWANG` (misi ini tidak relevan jika Rarwang Celeng tidak pernah ditemui/direkrut di jalur SIDED_BHARWANG murni — **CATATAN DESAIN PENTING:** jika pemain pilih jalur SIDED_BHARWANG di KD-M02 dan Rarwang Celeng "hilang" dari region, KD-S02 ini otomatis TIDAK TERSEDIA. Ini konsekuensi logis tapi perlu dikomunikasikan jelas ke pemain — lihat §Item Tindak Lanjut)

## Flag
- `flag_rarwang_titah_complete`

## Struktur
- 3 lukisan lama, masing-masing gambarkan wujud berbeda — identifikasi mana yang asli lewat cross-reference lore Bharwang Kesari (jika Bharwang Kesari ada di party/roster, dialog tambahan muncul membantu identifikasi — sinergi antar-karakter)
- Battle: "Bayangan Bentuk Lama" — 3 monster meniru 1 wujud masing-masing, hanya 1 yang bisa dikalahkan tanpa konsekuensi (2 lainnya memberi debuff permanen ringan ke Rarwang Celeng jika diserang — mendorong pemain benar-benar mengidentifikasi dulu, bukan asal serang)
- Drop: Senjata Lupa Bentuk Asli (DI §3.3)

## Fail State
- Salah identifikasi (serang wujud yang salah): Rarwang Celeng dapat debuff ringan permanen (bisa dihapus lewat item pemulih status jika ada di sistem global, TBD) — tidak fail total, hanya konsekuensi minor

---

# KD-S03 · SUMBER YANG DIULANG (TITAH KIDANG BELANTIK)

## Trigger
- `flag_kd_m01_complete == true`
- Ikuti Kidang Belantik (#86, Rare — sudah dikoreksi tier-nya di Guide Karakter v1.1) di D1-D3

## Flag
- `counter_fajar_observed` (0-3, tracking 3 hari in-game)
- `flag_kidang_belantik_recruited`

## Struktur
- 3 hari in-game (bukan 3 hari real-time — sistem waktu game, TBD berapa lama 1 "hari" berlangsung di gameplay, di luar cakupan dokumen ini)
- Tiap fajar: observasi 1 perubahan kecil di ritual Kidang Belantik (echo lore GK #86: minum dari sumber air upacara setiap fajar)
- Hari ke-3: sumber air "merespons" — battle di mana pola serangan musuh SAMA PERSIS dengan pola ritual yang diobservasi 2 hari sebelumnya (pemain yang memperhatikan dengan baik bisa memprediksi & menghindari 100% serangan)
- Drop: Senjata Sumber yang Diulang (DI §3.3)

## Fail State
- Jika pemain skip observasi (tidak hadir di fajar tertentu): battle tetap bisa dimenangkan tanpa prediksi (hanya lebih sulit, bukan blocking)

---

# KD-S04 · PENARI YANG MELIHAT ROH (RANTAI LUH SARI)

## Trigger
- `flag_kd_m01_complete == true`
- Bicara ke Luh Sari di D1-D2

## Flag
- `counter_family_convinced` (0-3, keluarga Luh Sari)
- `flag_ghost_evidence_found`
- `flag_sanggar_luh_sari_unlocked` (membuka KD-H01)

## Struktur
- Bicara ke 3 NPC keluarga Luh Sari + Luh Sari sendiri
- Temukan roh yang HANYA Luh Sari bisa lihat (jika party punya karakter Ghost, ada dialog tambahan/opsi deteksi — sinergi elemen)
- Buat bukti TANPA melibatkan Luh Sari langsung di depan keluarganya (puzzle sosial: kumpulkan bukti fisik/testimoni pihak ketiga)
- Selesai → `flag_sanggar_luh_sari_unlocked = true` (buka KD-H01), Sloka Misi diberikan

## Fail State
- Tidak ada battle wajib di misi dasar ini — battle roh HANYA muncul jika party punya karakter Ghost untuk deteksi opsional (battle bonus, bukan gate)

---

# KD-S05 · TIDAK ADA YANG MENANGGUNG SEMUANYA (TITAH LEMBUJAGA)

## Trigger
- `flag_kd_m02_complete == true` (D4 accessible)
- Temukan Lembujaga (#16) di D4 Kawah Bara

## Flag
- `array_beban_distribution` (5 jenis beban → 5 penjaga, mapping pemain)
- `flag_lembujaga_recruited`

## Struktur
- Mini-game alokasi: 5 jenis beban (panen, duka, utang, kesalahan, +1 lainnya sesuai lore GK #16) → assign ke 5 penjaga yang masing-masing HANYA sanggup menanggung 1 jenis
- Battle: manifestasi beban yang GAGAL didistribusi — jika alokasi sempurna (5/5 benar), 0 battle. Tiap alokasi salah = 1 battle tambahan melawan manifestasi beban jenis itu
- Drop: Kitab Tidak Ada yang Menanggung Semuanya (DI §3.3)

## Fail State
- Tidak ada fail permanen — alokasi salah hanya menambah battle, tidak memblokir progres

---

# KD-H01 · SANGGAR LUH SARI

## Trigger
- `flag_sanggar_luh_sari_unlocked == true` (dari KD-S04)
- Area Tersembunyi di D2 (WB §2.12) terbuka otomatis

## Flag
- `array_dance_gestures_interpreted` (5 gerakan → 5 kata kunci)
- `flag_kd_h01_complete`

## Struktur
- Luh Sari menari, 5 gerakan tarian harus diinterpretasi jadi 5 kata kunci (UI: pilih kata kunci yang paling cocok dari beberapa opsi per gerakan, berdasarkan observasi visual murni — tidak ada teks penjelas)
- Susun 5 kata kunci jadi kalimat yang menjawab "mengapa ritual dilakukan" — jawaban ini BISA dipakai sebagai referensi di KD-M06 jalur MEANING (Beat 1, opsi jawaban battle final)
- Battle opsional: "Sukma Kera Wanara versi lore alternatif" — HP **2281 — dikoreksi Elite ×1.5 Level~16 Kadewan**, tidak wajib untuk reward utama
- Reward: jawaban tematik + 1 entri Ensiklopedia eksklusif

## Fail State
- Tidak ada — interpretasi bisa diulang tanpa batas sampai kalimat masuk akal tercapai

---

# KD-H02 · DUKA YANG TAK DIRASAKAN (TITAH RARASUNYI)

## Trigger
- `flag_kd_m04_complete == true` (D5-D6 accessible)
- Ditemukan lewat observasi murni — tidak ada quest marker

## Flag
- `flag_upacara_duka_followed` (tanpa skip dialog — sistem HARUS mendeteksi jika pemain skip dialog NPC selama upacara duka, dan jika ya, misi ini tidak bisa dilanjutkan sampai pemain mengulang dengan menonton penuh)
- `flag_rarasunyi_recruited`

## Struktur
- Ikuti 1 upacara duka NPC TANPA skip dialog (syarat keras — implementasi harus benar-benar mem-block skip button selama sequence ini, atau mendeteksi skip dan meminta ulang)
- Temukan sumber duka "tanpa alamat" lewat clue lingkungan (tidak ada marker)
- Battle: "akumulasi duka" — kondisi menang: TIDAK menyerang duluan selama 3 ronde (echo pola NR-M03 Tandaraga, tapi konteks berbeda: empati bukan navigasi)
- Drop: Kitab Duka yang Tak Dirasakan (DI §3.3)

## Fail State
- Skip dialog terdeteksi: misi soft-lock sampai diulang dari awal upacara (BUKAN permanen, hanya perlu replay sequence)
- Battle: menyerang duluan → reset counter ronde (sama seperti pola NR-M03)

---

# KD-H03 · YANG LEBIH MUDAH DARIPADA MENDENGARKAN (TITAH RANDU GIRANG)

## Trigger
- `flag_kd_m03_complete == true` (D3-D5 accessible)
- Ditemukan lewat investigasi lintas-NPC

## Flag
- `counter_testimoni_collected` (0-3)
- `flag_randu_girang_recruited`

## Struktur
- Kumpulkan 3 kesaksian NPC — 2 kesaksian pertama mudah ditemukan (menyebut "monster"), kesaksian ke-3 (menyebut nama perempuannya) TERSEMBUNYI, tidak ada quest marker, butuh eksplorasi/dialog mendalam dengan NPC yang tidak jelas relevansinya di awal
- Dialog akhir: pilih memanggil namanya (bukan sebutan "monster") — SATU-SATUNYA pilihan yang memungkinkan recruitment (tidak ada opsi "panggil monster" yang tetap berhasil — ini poin naratif keras: menghormati adalah syarat, bukan pilihan berkonsekuensi ganda)
- **0 battle** — seluruh misi berbasis investigasi dan dialog murni
- Drop: Kitab Yang Lebih Mudah Daripada Mendengarkan (DI §3.3)

## Fail State
- Jika pemain memilih memanggilnya "monster" di dialog akhir: Randu Girang TIDAK bergabung, tapi TIDAK ada penalti lain — pemain bisa kembali bicara dengannya lagi kapan saja untuk retry dialog akhir (bukan fail permanen seperti NR-H03, karena tidak ada konten yang "dirusak" secara permanen di sini)

---

# RINGKASAN DEPENDENCY GRAPH — REGION 2

```
KD-M01 (Upacara Pagi) ──┬──→ KD-S01 (Urutan yang Diwariskan)
   ↓                     ├──→ KD-S03 (Sumber yang Diulang)
   ↓                     └──→ KD-S04 (Rantai Luh Sari) ──→ KD-H01 (Sanggar Luh Sari)
KD-M02 (Dua yang Satu) ──┬──→ KD-S02 (Lupa Bentuk Asli) [HANYA jika path != SIDED_BHARWANG]
   ↓                      └──→ KD-S05 (Tidak Ada yang Menanggung Semuanya)
KD-M03 (Doa Salah Satu Baris) ──→ KD-H03 (Yang Lebih Mudah Daripada Mendengarkan)
   ↓
KD-M04 (Efisiensi atau Makna) ──[flag_kd_resolution_path]──→ KD-H02 (Duka yang Tak Dirasakan)
   ↓
KD-M05 (Sembilan Ratus Tahun Terakhir)
   ↓
KD-M06 (Rasa yang Kembali) ──[flag_kd_resolution_path menentukan battle & Item Spesial]
   ↓
[Season 2 terbuka: Smarana + Wanasunya, bebas urutan]
```

## Titik Kritis Dependency

1. **`flag_kd_resolution_path` (dari KD-M04) adalah flag PALING BERPENGARUH di region ini** — mempengaruhi battle KD-M06, ketersediaan Item Spesial Genta Makna, DAN pasif permanen Sang Werdi (+20% vs +15%) untuk SISA GAME, bukan hanya region ini. Implementasi harus memastikan flag ini tersimpan di level save-file global, bukan region-scoped.

2. **`flag_kd_m02_path` (dari KD-M02) menentukan ketersediaan KD-S02** — ini pola dependency baru yang tidak muncul di Nirwasita: sebuah Main Mission bisa membuat sebuah Side Mission menjadi TIDAK TERSEDIA sama sekali (bukan hanya terkunci sementara). Perlu UI yang jelas (misal ikon "tidak tersedia" alih-alih hilang total dari log misi) supaya pemain tidak bingung.

3. **KD-H02 butuh deteksi "tanpa skip dialog"** — ini requirement teknis yang lebih ketat dari apa pun di Region 1. Sistem harus punya cara mendeteksi skip button ditekan selama sequence spesifik.

---

# ITEM TINDAK LANJUT — STATUS SETELAH KEPUTUSAN

## 1. KD-M04 Beat 3A/3B: Dikunci Permanen — ✅ FINAL

**Keputusan:** Mekanik "tidak bisa ganti pilihan setelah battle dimulai" **dikonfirmasi tetap** sebagai commitment device. Tidak ada UI warning eksplisit "Keputusan ini permanen" model NR-H03 yang ditambahkan — beda dengan NR-H03 (yang mengunci KONTEN, risiko kehilangan karakter tanpa sengaja), KD-M04 mengunci NARASI dari keputusan yang SUDAH disertai data mekanis lengkap di Beat 1 (bonus 20% vs 15% ditampilkan eksplisit sebelum pemain memilih). Karena informasi sudah transparan sebelum pilihan diambil, popup peringatan tambahan akan terasa berlebihan dan mengganggu alur dialog bercabang 4 lapis yang sudah dirancang mengalir alami.

## 2. KD-S02 Hilang di Jalur SIDED_BHARWANG — ✅ FINAL, diterima sebagai fitur

**Keputusan:** **Tidak ada jalur alternatif ditambahkan.** Ini dikonfirmasi sebagai konsekuensi desain yang disengaja — pilihan di KD-M02 (Dua yang Satu) adalah pilihan nyata berkonsekuensi, bukan sekadar pilihan kosmetik. Kehilangan akses ke Titah Rarwang Celeng adalah harga dari memilih sisi Bharwang Kesari, konsisten dengan tema region "Dua yang Satu" — memihak salah satu berarti kehilangan yang lain sepenuhnya, sama seperti tema dualitas yang mendasari kedua karakter ini di lore (GK #13, #14).

**Implikasi UI:** Log misi harus menampilkan KD-S02 dengan status "Tidak Tersedia — konsekuensi dari pilihan di Dua yang Satu" (bukan hilang tanpa penjelasan) agar pemain paham ini pilihan sadar, bukan bug.

## 3. Monster Belum Terverifikasi — 🟡 MASIH TERBUKA

"Manifestasi ritual" (KD-M04) dan "monster air tercemar" (KD-S01) masih perlu verifikasi kanon atau ditandai sebagai encounter naratif sekali-pakai. Belum ada keputusan eksplisit dari sesi ini — tetap terbuka untuk sesi berikutnya.

## 4. Kala Sesari — ✅ SELESAI, jalur rekrutmen dibuat

**Keputusan:** Misi baru **KD-S06 · Titah Sembilan Ratus Tahun (Kala Sesari)** ditambahkan ke Kerangka Misi v0.4. Detail lengkap:

### KD-S06 · Titah Sembilan Ratus Tahun (Kala Sesari)

**Trigger:** `flag_kd_m05_complete == true` (region D6 sudah disaksikan penuh lewat Main Mission)

**Flag:**
- `counter_kala_sesari_fragments` (0-3)
- `flag_kala_sesari_recruited`

**Struktur:**
- **Beat 1 — Investigasi 3 Fragmen:** catatan persembahan tertua di D6, terpisah dari 4 titik upacara KD-M05 (ini catatan tertulis/terukir, bukan titik observasi). Tiap fragmen mengungkap sedikit tentang siapa penerima persembahan asli yang sudah lama dilupakan Kadewan.
- **Beat 2 — Battle Stabilisasi:** trigger setelah 3/3 fragmen terkumpul. Kala Sesari "goyah" saat 900 tahun kebiasaan tiba-tiba diberi jawaban. Battle Params: kondisi menang = bertahan 3 ronde TANPA menyerang balik (echo pola kesabaran yang sudah jadi motif berulang region — sama seperti KD-H02, mengikat tematik "menerima" bukan "melawan"). HP tidak relevan di battle ini — party hanya perlu tidak menyerang, sama seperti pola Fase 3 Nirsmara/Sang Werdi.
- **Beat 3 — Recruitment:** `flag_kala_sesari_recruited = true`. Drop: Kitab Sembilan Ratus Tahun (item KANON — sudah tercatat di DI §3.3 sebelum misi ini dibuat, ternyata Dokumen Item sudah mengantisipasi Titah ini duluan, hanya belum ada misi yang menyalurkannya).

**Fail State:** Jika party menyerang selama Beat 2: counter ronde reset (pola identik dengan KD-H02 dan NR-M03), tidak ada battle wipe karena musuh tidak benar-benar menyerang balik.

**Koneksi Dokumen:** GK #11 (lore — "ia tidak tahu ia seharusnya untuk siapa", dijawab lewat misi ini), Kerangka Misi v0.3 §KD-S06

## 5. Combat Math Placeholder — 🟡 status tetap sama

Tidak berubah dari keputusan sebelumnya: revisi menyeluruh dilakukan setelah Quest Script 9 region selesai.

## 6. Item Reward KD-S06 — ✅ SELESAI, ternyata sudah kanon

Saat menyiapkan dokumen ini, saya sempat menandai "Jimat Sembilan Ratus Tahun Menumpuk" sebagai item baru yang perlu ditulis. **Setelah verifikasi ke Dokumen Item §3.3, ternyata ini SALAH** — Dokumen Item sudah mencatat baris berikut SEBELUM Quest Script ini dibuat:

> `11 | Kala Sesari | Common | Lv20 | Titah Sembilan Ratus Tahun | Kitab Sembilan Ratus Tahun | Pamungkas 'Sembilan Ratus Tahun' — basis 130%, +10 poin persen`

Ini konsisten dengan pola yang sudah terlihat di Region 1: dokumen desain kadang sudah mengantisipasi sesuatu (nama Titah, nama item) sebelum misi konkretnya ditulis. Nama misi dan reward di KD-S06 sudah dikoreksi mengikuti kanon ini — **tidak ada item baru yang perlu ditulis ke Dokumen Item.**

**Pelajaran untuk Quest Script region selanjutnya:** cek Dokumen Item §3.X SEBELUM menciptakan nama Titah/item untuk misi gap-fill — pola yang sama seperti "cek World Bible §X.8 sebelum menciptakan monster" dari Region 1.

---

# RINGKASAN DEPENDENCY GRAPH — TAMBAHAN

```
KD-M05 (Sembilan Ratus Tahun Terakhir) ──→ KD-S06 (Kala Sesari, BARU)
```

KD-S06 independen dari cabang KD-M02 (`flag_kd_m02_path`) — Kala Sesari TIDAK terpengaruh pilihan Bharwang/Rarwang, berbeda dari KD-S02 yang bergantung penuh pada flag itu. Ini disengaja: Kala Sesari adalah karakter tunggal tanpa pasangan dualitas, jadi tidak ada konflik pilihan yang relevan untuknya.

---

*Quest Script Region 2 — Draf v0.3 · September 2026*
*Status: 15/15 misi Kadewan di-script detail (termasuk KD-S06 baru). 0 monster baru diciptakan tanpa alasan (2 kanon dipakai langsung). 2 keputusan desain FINAL (KD-M04 dikunci tanpa warning UI tambahan, KD-S02 diterima sebagai konsekuensi permanen). 1 gap rekrutmen terisi (Kala Sesari, KD-S06) — reward-nya dikoreksi mengikuti item yang TERNYATA sudah kanon di Dokumen Item §3.3, bukan item baru. 2 item masih terbuka: verifikasi 2 monster naratif (KD-M04, KD-S01), combat math placeholder (ditunda pasca 9 region). Belum diimplementasi, belum playtest.*
