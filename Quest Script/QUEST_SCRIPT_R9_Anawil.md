# QUEST SCRIPT — REGION 9: ANAWIL
# PUSAKA: GEMA NAWANTARA

**Versi:** Draf v0.1 — Quest Script Detail
**Status:** 🟡 SIAP REVIEW TEKNIS — belum diimplementasi, belum playtest
**Rujukan kanon:**
- `World_Bible_Pusaka_Gema_Nawantara_v5.1.md` §BAB 9 (Anawil), §9.0 (prasyarat konsultan)
- `GUIDE_KARAKTER_100_Nawantara_FINAL_v1.1.md` #75-83, #99-100
- `DOKUMEN_ITEM_Pusaka_Gema_Nawantara_FINAL_v1.md` §1.9, §2, §3.12, §3.13
- `KERANGKA_MISI_Pusaka_Gema_Nawantara.md` v1.3 (kerangka sumber — 12 misi Anawil, sudah termasuk koreksi Gema Purwa)
**Tanggal:** September 2026

**Ini region TERAKHIR dari 9 region — seluruh proses verifikasi pra-scripting yang dibangun sejak R1 diterapkan penuh di sini.**

**Verifikasi pra-scripting:**
- **Monster:** WB §9.8 sudah punya "Telapak Berjalan" (Umum) dan "Suara Sebelum Kata" (Elite) — dipakai langsung.
- **Item/Titah:** Seluruh 11 karakter roster Anawil (#75-83, #99-100) di-cross-check ke DI §3.12. **0 gap murni** — 5 karakter Common (#75-79) sudah diputuskan sebagai sub-objective Main Mission (keputusan sebelumnya), 6 karakter (Kalana Sauyan, Wai Cendra, Nin Waiam, Gema Purwa, Penunggu Sunyi, Tanpa Rupa) punya misi dedicated.
- **DITEMUKAN BUG STRUKTURAL SERIUS sebelum scripting:** AW-M05 dan AW-H02 di Kerangka Misi SAMA-SAMA mengklaim merekrut Gema Purwa lewat mekanik yang saling bertentangan. Dokumen Item §3.12 punya catatan revisi EKSPLISIT yang menolak skema lama (recruitment terikat ending di zona penutup) demi skema baru (recruitment independen di zona pembuka, syarat 100% Ensiklopedia 8 region). **Diperbaiki di Kerangka Misi sebelum dokumen ini ditulis** — AW-M05 sekarang murni klimaks naratif tanpa rekrutmen karakter, AW-H02 jadi SATU-SATUNYA jalur Gema Purwa.
- **Penunggu Sunyi (#99) dan Tanpa Rupa (#100) diverifikasi SUDAH selaras kanon** sejak draf awal — tidak ada kesalahan seperti kasus Gema Purwa.
- **Prasyarat konsultan (WB §9.0) diverifikasi:** seluruh konten region ini TIDAK menggunakan mitos mesianis secara langsung, TIDAK mereproduksi artefak ritual spesifik. Script ini mempertahankan prinsip itu di setiap Beat.

---

## KONVENSI SCRIPT

Sama seperti Quest Script R1-R8. Angka HP non-kanon tetap `[PLACEHOLDER — akan direvisi]`. Pasif/skill dikutip dari GK ditandai `(kanon)`.

**Catatan khusus Region 9 — Mekanik Tanpa Kata:** HUD hilang PROGRESIF, bukan sekaligus:
- A1-A3 (AW-M01-M02): HUD normal, beberapa elemen mulai hilang sebagai foreshadowing
- A3-A4 (AW-M03): dialog teks MULAI menghilang saat masuk A4
- A4-A5 (AW-M04): dialog teks HILANG TOTAL
- A6-A7 (AW-M05): HUD hilang TOTAL (termasuk HP bar, nama skill)

**Prinsip implementasi lintas-region:** Region ini SENGAJA minim dialog teks — bukan berarti minim KONTEN, tapi konten disampaikan lewat gestur, warna, suara lingkungan, dan pola visual. Setiap Beat di bawah yang menyebut "tanpa teks" BUKAN saran, tapi requirement keras.

---

# AW-M01 · KARST WARANA (SUB-OBJECTIVE: TAPAK NIRBAHASA)

**Catatan — gap ditemukan & diperbaiki:** Tapak Nirbahasa (#76) sebelumnya tidak tercakup di sub-objective manapun meski sudah diputuskan sebagai bagian dari 5 karakter Common sub-objective. Ditambahkan di sini karena lore-nya (cap tangan berpigmen di dinding karst) cocok persis dengan tutorial navigasi lukisan tangan yang sudah ada di misi ini.

## Trigger
- Seluruh 8 region lain selesai (`flag_kd_m06_complete`, `flag_sm_m06_complete`, `flag_wn_m06_complete`, `flag_kl_m06_complete`, `flag_hm_m04_complete`, `flag_rj_m06_complete`, `flag_jl_m06_complete` semua true)

## Flag
- `flag_aw_m01_complete`
- `flag_tanpa_kata_tutorial_seen`
- `flag_tapak_nirbahasa_subobjective_complete`
- `counter_encyclopedia_8_region` (dihitung otomatis dari total entri 8 region — dipakai syarat AW-H02)

## Struktur

### Beat 1 — Tiba di Anawil
- Cutscene TANPA dialog teks (echo prinsip region sejak awal) — visual murni: pemain tiba di formasi karst purba, jauh lebih tua dari kerajaan mana pun yang sudah dikunjungi
- UI popup (SATU-SATUNYA teks besar di awal region, menjelaskan mekanik): "Anawil tidak memakai kata. HUD akan menghilang bertahap. Perhatikan gestur, warna, dan suara."

### Beat 2 — Tutorial Fase 1 + Sub-objective: Tapak Nirbahasa
- Navigasi lewat lukisan tangan di dinding — HUD kompas/marker MASIH ada di sini, tapi 1 elemen (misal nama lokasi di layar) sudah dihilangkan sebagai foreshadowing
- **Sub-objective Tapak Nirbahasa (#76):** di antara lukisan tangan navigasi, 1 cap tangan bercahaya berbeda dari yang lain — sentuh cap itu (echo lore kanon: "aku ada di sini", kalimat pertama manusia). Ini TIDAK mengganggu navigasi utama, murni observasi tambahan bagi pemain yang teliti
- `flag_tapak_nirbahasa_subobjective_complete = true` saat cap disentuh

### Beat 3 — Battle Tutorial
- **Battle Params:**
  - Musuh: 3x Telapak Berjalan (kanon Umum, WB §9.8) — HP **2413 (dikoreksi hasil audit Combat Math Global — Level~56, Finale)**
  - HUD battle masih penuh (angka HP, nama skill) di region ini — degradasi belum dimulai
  - Kondisi menang: HP 0%

### Beat 4 — Reward
- Drop: Jejak Kasuari (Common Jimat, DI §1.9) + (jika sub-objective selesai) Serat Anyaman Tanpa Pengrajin versi awal — **catatan:** ini BUKAN recruitment, sesuai pola sub-objective lain di region ini, murni progress/reward item
- `flag_aw_m01_complete = true`

## Fail State
- Party wipe: auto-revive 30% HP (pola tutorial standar)

---

# AW-M02 · HUTAN PURBA (SUB-OBJECTIVE: KASWARI TANAHWIL, PARI LAMPUR)

**Catatan implementasi:** Sesuai keputusan sebelumnya, 5 karakter Common Anawil terintegrasi sebagai sub-objective di Main Mission, bukan misi mandiri. Misi ini membawa 2 dari 5 (Kaswari Tanahwil #75, Pari Lampur #78).

## Trigger
- `flag_aw_m01_complete == true`
- Pemain masuk A2-A3

## Flag
- `flag_kaswari_subobjective_complete`
- `flag_pari_lampur_subobjective_complete`
- `flag_aw_m02_complete`

## Struktur

### Beat 1 — Sub-objective: Kaswari Tanahwil (3 Aksi Restoratif — BARU, detail lengkap)
Sesuai DI §3.12 spesifikasi 1 tahap ("tanam ulang benih tersembunyi... tanpa dialog bantuan"), dipecah jadi 3 aksi konkret berurutan (echo pola WN-M05 Niniak Belang di Wanasunya — 3 aksi restoratif jadi motif berulang lintas-region untuk tema "membuktikan lewat perbuatan"):

1. **Tanam benih kanopi** di titik tanah paling subur (warna tanah paling gelap, mudah dikenali) — echo lore kanon: Kaswari Tanahwil "menyebarkan benih pohon hutan". Aksi: pemain menekan 1 ikon "tanam" di lokasi yang tepat, TANPA teks instruksi — hanya visual highlight halus pada tanah subur
2. **Tanam benih semak berbuah** di titik kedua, dekat sumber air (echo tema memberi makan fauna kecil hutan) — puzzle: identifikasi lokasi lewat pola jejak hewan kecil di sekitarnya (visual murni)
3. **Tanam benih terakhir** di titik PALING GUNDUL/rusak dari seluruh Hutan Purba — kontras sengaja dengan 2 titik sebelumnya (mudah→sedang→sulit menemukan), echo tema "memulihkan yang paling membutuhkan, bukan yang paling mudah"

Ketiga aksi TIDAK perlu urutan tertentu, tapi ketiganya wajib selesai sebelum sub-objective dianggap tuntas. Tidak ada dialog bantuan di titik manapun — murni observasi visual + aksi tanam.

### Beat 2 — 2 Encounter Beast Purba
- **Battle Params (×2):** HP **3330/3330 (Common-tier Level~58) — dikoreksi hasil audit Combat Math Global**

### Beat 3 — Sub-objective: Pari Lampur
- Ikuti pola migrasi fauna TANPA HUD arah (echo Titah Pari Lampur #78 kanon — pasifnya "Ingatan Tubuh" secara tematik cocok dengan navigasi tanpa bantuan eksternal)
- Puzzle observasi murni: pola gerak hewan sebagai satu-satunya petunjuk arah
- Komunikasi lewat suara lingkungan (bukan dialog)

### Beat 4 — Reward
- Drop: Serat Anyaman Tanpa Pengrajin (Uncommon Jimat, DI §1.9)
- `flag_kaswari_subobjective_complete = true`, `flag_pari_lampur_subobjective_complete = true`
- **Catatan:** ini BUKAN recruitment — kedua karakter tetap tidak bergabung sebagai roster di sini, sub-objective hanya memberi progress/reward item, sesuai keputusan desain sebelumnya
- `flag_aw_m02_complete = true`

## Fail State
- Party wipe: retry battle, sub-objective yang sudah selesai tidak reset

---

# AW-M03 · LAGUNA TENANG (SUB-OBJECTIVE: KARANG WAYAHAN)

## Trigger
- `flag_aw_m02_complete == true`
- Pemain masuk A3-A4

## Flag
- `flag_karang_wayahan_subobjective_complete`
- `flag_dialog_teks_disabled` (mulai dari sini — TRANSISI PENTING mekanik)
- `flag_aw_m03_complete`

## Struktur

### Beat 1 — Transisi: Dialog Teks Mulai Menghilang
- Trigger: pemain masuk A4
- **PERUBAHAN MEKANIK PERMANEN dari titik ini:** `flag_dialog_teks_disabled = true` untuk sisa region — implementasi harus benar-benar menghilangkan UI dialog teks standar mulai zona ini, mengganti dengan sistem gestur+warna+suara

### Beat 2 — Sub-objective: Karang Wayahan
- Amati formasi karang di Laguna Tenang 1 SIKLUS PENUH tanpa dialog (sesuai DI §3.12 — pasif kanon "Bentuk yang Dibuat Waktu" DEF +6%/ronde cocok tematik dengan observasi panjang tanpa interupsi)

### Beat 3 — Battle: Suara Sebelum Kata
- **Battle Params:**
  - Musuh: Suara Sebelum Kata (kanon Elite, WB §9.8 — "entitas yang berkomunikasi lewat getaran, bukan bahasa") — HP **4995 — dikoreksi Elite ×1.5 dari Common Level~58**
  - Battle ini PERTAMA KALI tanpa dialog teks aktif — pastikan sistem battle UI (nama skill, dll.) MASIH ada di sini (hanya dialog NPC yang hilang, bukan UI battle — itu terjadi di AW-M04)
  - Kondisi menang: HP 0%

### Beat 4 — Reward
- Drop: Cadik yang Tahu Arahnya Sendiri (Rare Senjata, DI §1.9)
- `flag_karang_wayahan_subobjective_complete = true`
- `flag_aw_m03_complete = true`

## Fail State
- Party wipe: retry battle

---

# AW-M04 · DINDING TELAPAK (SUB-OBJECTIVE: SAMPARA WENE)

**Catatan implementasi khusus:** Zona A4-A5 — dialog teks HILANG TOTAL termasuk UI battle (HP bar tanpa angka, skill tanpa nama). Ini adalah syarat Item Spesial "Telapak Keenam".

## Trigger
- `flag_aw_m03_complete == true`
- Pemain masuk A4-A5

## Flag
- `flag_sampara_wene_subobjective_complete`
- `flag_battle_ui_teks_disabled` (BARU — lebih ekstrem dari flag_dialog_teks_disabled, sekarang UI BATTLE juga kena)
- `flag_telapak_keenam_progress`
- `flag_aw_m04_complete`

## Struktur

### Beat 1 — Transisi: UI Battle Kehilangan Teks
- Trigger: masuk A4-A5 zona dalam
- **PERUBAHAN MEKANIK PALING EKSTREM di region ini:** HP bar tanpa angka (hanya visual bar tanpa nilai numerik), nama skill tidak ditampilkan (hanya ikon)
- Ini syarat literal untuk Item Spesial "Telapak Keenam" (DI §2, dari WB §9.9 "misi menyelesaikan interaksi tanpa dialog teks")

### Beat 2 — Sub-objective: Sampara Wene
- Berada di titik transisi fajar, jendela waktu SEMPIT tanpa notifikasi (sesuai DI §3.12 — pasif kanon "Tidak Menyaksikan Akibat" +35% damage ronde 1-3 cocok tematik dengan aksi cepat di jendela sempit)
- Puzzle timing: pemain harus mengenali visual transisi fajar TANPA timer teks

### Beat 3 — 2 Encounter Tanpa Informasi Teks
- **Battle Params (×2):**
  - HP **3330/4901 (Common+Uncommon, nilai internal — TIDAK ditampilkan ke pemain) — dikoreksi hasil audit Combat Math Global** — TIDAK ditampilkan sebagai angka ke pemain (UI hanya bar visual)
  - Skill musuh tidak diberi nama tampil — pemain harus membaca pola dari ANIMASI, bukan tooltip teks
  - Kondisi menang: HP 0% (sistem internal tetap track angka, hanya UI yang disembunyikan)

### Beat 4 — Reward
- Drop: Pigmen Tangan Pertama (Super Rare Pusaka, DI §1.9)
- `flag_sampara_wene_subobjective_complete = true`
- `flag_telapak_keenam_progress` bertambah (dicek penuh di AW-M05)
- `flag_aw_m04_complete = true`

## Fail State
- Party wipe: retry battle (HP musuh yang sudah berkurang TIDAK ditampilkan ke pemain saat retry, tapi sistem internal reset normal)

---

# AW-M05 · TELAPAK PERTAMA — GEMA PURBA

**Catatan implementasi khusus — DIKOREKSI TOTAL:** Misi ini SEBELUMNYA mengklaim merekrut Gema Purwa — INI SALAH dan sudah diperbaiki. Misi ini SEKARANG murni klimaks naratif (3 ending global) TANPA rekrutmen karakter apa pun. Gema Purwa HANYA bisa direkrut lewat AW-H02 (lihat bagian Hidden Mission), independen sepenuhnya dari misi ini.

## Trigger
- `flag_aw_m04_complete == true`
- Pemain masuk A6-A7

## Flag
- `flag_hud_total_disabled` (HUD hilang TOTAL — level degradasi maksimal)
- `array_gema_8_region` (audio callback dari 8 region, tracking mana yang sudah "didengar")
- `flag_ending_global` (enum: KABUT_KEMBALI / YANG_MENGINGAT / LARAS)
- `flag_aw_m05_complete`

## Struktur

### Beat 1 — HUD Hilang Total
- Trigger: masuk A7
- **Degradasi maksimal:** seluruh HUD hilang — tidak ada minimap, tidak ada quest marker, tidak ada indikator apa pun. Ini adalah puncak mekanik Tanpa Kata

### Beat 2 — Mendengar Gema 8 Region
- Pemain "mendengar" gema dari 8 region sebelumnya — audio callback (cuplikan musik/ambience tiap region yang sudah dikunjungi, TANPA teks label region)
- Ini murni sekuens naratif/atmosferik, bukan puzzle dengan solusi benar/salah

### Beat 3 — 3 Ending Global Ditentukan (FORMULA LENGKAP — BARU)
**Catatan sumber:** World Bible §9.10 mendelegasikan nama & struktur dasar 3 ending ke GDD v3 §5.5. Setelah dicek langsung, GDD v3 menggambarkan game **2-region/30-karakter** (purwarupa lama) — mekanisme syaratnya (mis. "24/30 Sukma", "Bab 2") **sepenuhnya usang** untuk struktur 9-region/100-karakter saat ini. Formula di bawah adalah **desain baru**, dipandu esensi tematik ketiga ending (A = menyegel/hampa, B = mengikat/mengingat dengan harga individual, C = membagikan/berbagi beban — sesuai teks asli GDD v3 §5.5 yang tetap valid sebagai deskripsi TEMA, bukan mekanik), diterapkan ke titik keputusan nyata yang sudah ada di 9 region.

**Connection Score (CS) — dari 8 keputusan resolusi region:**

| Region | Sumber Flag | Pilihan "Terhubung/Berbagi" | Pilihan "Menyegel/Individual" |
|---|---|---|---|
| Nirwasita | `flag_region_resolution_nirwasita` | WAITED → **+2** | FORCED_PAST → +0 |
| Kadewan | `flag_kd_resolution_path` | MEANING → **+2** | EFFICIENCY → +0 |
| Smarana | SM-M06 pilihan penawaran | [Tolak] → **+2** | [Terima] → +0 |
| Wanasunya | `flag_wn_resolution_path` | INFORMED → **+2** | KEPT_SECRET → +0 |
| Kalamrtu | `flag_kl_resolution_path` | REVEALED → **+2** | CONCEALED → +0 |
| Himagiri | Jalur HM-M04 | "Jadi Saksi" (Kelancangan rendah) → **+2** | Kalahkan konvensional → +0 |
| Rajawani | `counter_warisan_total` | ≥30 → **+2**, ≥20 → **+1** | <20 → +0 |
| Jaladri | `flag_jl_unity_choice` | SCATTERED → **+2** | UNIFIED → +0 |

**Maksimal CS: 16** (8 keputusan × 2 poin, Rajawani kumulatif maks 2).

**2 syarat tambahan (echo skala "24/30 Sukma" & "%Batu Gema" GDD lama, di-scale ke struktur saat ini):**
- `counter_karakter_direkrut_total` (dari 100)
- `counter_encyclopedia_percentage` (rata-rata % entri Ensiklopedia terkumpul, 8 region non-Anawil)

**Threshold Final:**

| Ending | Syarat CS | Syarat Karakter | Syarat Ensiklopedia | Syarat Tambahan |
|---|---|---|---|---|
| **A — Kabut yang Kembali** (default) | CS < 10 | < 75/100 | < 80% | Tidak ada — ini adalah default jika syarat B tidak terpenuhi |
| **B — Yang Mengingat** | CS ≥ 10 | ≥ 75/100 | ≥ 80% | — |
| **C — Laras** (tersembunyi) | CS ≥ 14 | ≥ 95/100 | = 100% | **DAN** pilihan final Beat 3.5 di bawah |

- Sistem HARUS sudah menghitung CS, karakter, dan Ensiklopedia SEBELUM pemain sampai di titik ini (progresif sepanjang playthrough) — `flag_ending_global` dasar (A atau B) sudah ditentukan begitu pemain masuk AW-M05, HANYA syarat C yang masih bisa berubah lewat Beat 3.5

### Beat 3.5 — Pilihan Final (BARU — hanya relevan jika syarat C selain "pilihan final" sudah terpenuhi)
**Echo tematik dari GDD v3 lama:** ending tersembunyi dulu mensyaratkan "berhenti menyerang 3 ronde penuh di pertarungan akhir" — prinsip ini dipertahankan meski AW-M05 versi saat ini tidak lagi punya battle karakter (sudah dikoreksi, Gema Purwa direkrut terpisah di AW-H02). Sebagai gantinya:
- **Jika CS ≥ 14 DAN karakter ≥ 95/100 DAN Ensiklopedia = 100%:** UI menampilkan momen hening di akhir sekuens audio callback (Beat 2) — pemain diberi pilihan pasif: **tunggu tanpa menekan tombol apa pun selama jendela waktu tertentu** (echo langsung mekanik "diam" AW-H04 Tanpa Rupa — konsisten mekanik region), alih-alih menekan tombol "lanjutkan" yang biasa muncul
- Menunggu (diam) → `flag_ending_global = LARAS`
- Menekan tombol (tidak sabar menunggu) → `flag_ending_global = YANG_MENGINGAT` (ending B, meski secara teknis syarat C sudah lengkap — pemain "gagal" lewat aksi terakhir, konsisten prinsip GDD lama "ending baik butuh perhatian, bukan grinding")
- **Jika syarat CS/karakter/Ensiklopedia TIDAK terpenuhi:** Beat 3.5 tidak muncul sama sekali, ending sudah final di A atau B dari Beat 3

### Beat 4 — Reward & Closure
- Drop: Gema yang Tak Pernah Direkam (Ultra Rare Pusaka, DI §1.9)
- **Cek Item Spesial:** Telapak Keenam (DI §2) — jika `flag_telapak_keenam_progress` dari AW-M04 terpenuhi: diberikan di sini
- Cutscene ending sesuai `flag_ending_global` — 3 versi berbeda, masing-masing closure naratif penuh
- **TIDAK ADA REKRUTMEN KARAKTER DI MISI INI** (koreksi dari draf lama)
- `flag_aw_m05_complete = true`

## Fail State
- Tidak ada battle konvensional dengan fail state — ini sekuens naratif/atmosferik murni

---

# AW-S01 · EMPAT PULUH TAHUN TANPA KATA (TITAH KALANA SAUYAN)

## Trigger
- `flag_aw_m03_complete == true` (A3-A4 accessible, dialog teks sudah mulai hilang — cocok tematik dengan karakter yang "tidak bicara sama sekali")

## Flag
- `counter_titik_ditunjuk` (0-3)
- `flag_kalana_sauyan_recruited`

## Struktur
- Ikuti NPC (Kalana Sauyan #82, Wajah Region), tunjuk 3 titik lewat gestur PEMAIN SENDIRI (input gestur, bukan pilihan dialog) — echo lore kanon: 40 tahun memerintah tanpa 1 pun perintah verbal
- Berdiri di posisi benar tanpa diberi tahu lewat teks — murni observasi posisi/arah pandang NPC
- Battle: HP kanon Level 1 2500 (referensi langsung dari tabel progresi GK #82, bukan estimasi) — di level battle ini kemungkinan sudah di-scale lebih tinggi sesuai progres game, `[PLACEHOLDER — scaling]` dari basis 2500
- Pasif kanon "Tempat Ia Berdiri" (+15% ATK tim jika di barisan depan, +15% DEF jika di barisan belakang) — sebagai musuh, posisinya sendiri jadi indikator visual strategi (pemain bisa "membaca" apakah ia akan main ofensif/defensif dari posisinya, echo tema "komunikasi tanpa kata")
- Drop: Senjata Empat Puluh Tahun Tanpa Kata (DI §3.12)
- `flag_kalana_sauyan_recruited = true` — Kalana Sauyan bergabung (Super Rare, Human/Apah/Attacker)

## Fail State
- Salah tunjuk titik: kembali coba, tidak ada penalti keras
- Party wipe: retry battle

---

# AW-S02 · TANPA BERNIAT MEMILIKI (TITAH NIN WAIAM)

## Trigger
- `flag_aw_m04_complete == true` (A5 accessible, UI battle sudah tanpa teks — cocok tematik dengan perawatan tanpa info jenis)

## Flag
- `flag_rawat_makhluk_complete`
- `flag_nin_waiam_recruited`

## Struktur
- Rawat makhluk asing TANPA info jenisnya (UI battle sudah tanpa teks di zona ini, jadi ini bukan tambahan mekanik baru — memanfaatkan kondisi yang sudah aktif dari AW-M04)
- Puzzle gestur perawatan: pilih aksi lewat ikon (bukan teks), pelajari lewat trial-and-error visual apa yang dibutuhkan makhluk itu
- Battle: HP **6535 — dikoreksi Rare-tier Level~58**. Pasif kanon "Memahami Belakangan" (+8% heal per kategori Tipe berbeda di tim, maks +32% pada tim 4 kategori) — battle mendorong party dengan komposisi Tipe beragam (Human/Ghost/Beast/Spirit campuran)
- Drop: Jimat Tanpa Berniat Memiliki (DI §3.12)
- `flag_nin_waiam_recruited = true` — Nin Waiam bergabung (Rare, Human/Pertiwi/Support)

## Fail State
- Salah rawat: makhluk tidak mati/hilang, hanya perlu coba pendekatan lain — tidak ada penalti permanen
- Party wipe: retry battle

---

# AW-S03 · YANG TIDAK PERNAH DIAJARKAN (TITAH WAI CENDRA)

## Trigger
- `flag_aw_m03_complete == true` (A4 accessible)

## Flag
- `flag_tarian_gestur_complete`
- `flag_wai_cendra_recruited`

## Struktur
- Mini-game gestur: tiru gerakan tari TANPA tutorial teks (pemain belajar murni dari observasi visual berulang — echo lore kanon: "tahu tanpa diajari")
- Battle: HP **4901 — dikoreksi Uncommon-tier Level~58**. Pasif kanon "Tahu Tanpa Diajari" (mulai battle dengan tumpukan Dahan yang Sama sudah terisi 1) — sebagai musuh, ini berarti damage-nya sudah lebih tinggi dari ronde pertama, tanpa perlu "pemanasan"
- Drop: Senjata Yang Tidak Pernah Diajarkan (DI §3.12)
- `flag_wai_cendra_recruited = true` — Wai Cendra bergabung (Uncommon, Beast/Bayu/Attacker)

## Fail State
- Gestur salah ditiru: bisa diulang, tidak ada penalti keras
- Party wipe: retry battle

---

# AW-H01 · TELAPAK KEDELAPAN

## Trigger
- `flag_aw_m01_complete == true` (Area Tersembunyi A4, WB §9.12)

## Flag
- `flag_aw_h01_complete`

## Struktur
- Cap tangan tambahan yang TIDAK disebut di legenda manapun — echo tema region "ingatan yang lebih tua daripada bahasa"
- **0 battle** — puzzle observasi visual MURNI, tanpa clue teks apa pun (bahkan lebih ketat dari standar region — ini area tersembunyi yang menguji apakah pemain benar-benar mengadopsi cara "melihat" ala Anawil)
- Reward: 1 entri Ensiklopedia — **implementasi khusus:** entri ini SENDIRI tanpa teks, hanya ikon (konsisten dengan prinsip region, bahkan reward-nya mengikuti aturan yang sama)
- `flag_aw_h01_complete = true`

## Fail State
- Tidak ada — eksplorasi bebas tanpa batas waktu

---

# AW-H02 · GEMA YANG MENUNGGU DIKETUK (TITAH GEMA PURWA)

**Catatan implementasi khusus — SATU-SATUNYA JALUR REKRUTMEN GEMA PURWA:** Sesuai koreksi struktural di awal dokumen ini, misi ini adalah SATU-SATUNYA cara mendapatkan Gema Purwa. AW-M05 TIDAK LAGI merekrutnya.

## Trigger
- `counter_encyclopedia_8_region == TOTAL_MAKSIMAL` (100% entri Ensiklopedia dari 8 region Nirwasita-Jaladri — TIDAK termasuk Anawil sendiri)
- **Bisa terpenuhi KAPAN SAJA setelah Anawil dibuka** — termasuk SEBELUM mengerjakan AW-M01 sekalipun secara teknis (lokasinya A1, zona pembuka), TIDAK terikat progres Main Mission Anawil lainnya
- Ceruk tersembunyi di Karst Warana (A1) — TANPA quest marker, murni clue lingkungan

## Flag
- `flag_gema_purwa_recruited`
- `flag_yang_tersisa_ketika_semua_gagal_obtained` (item kunci akun)

## Struktur

### Beat 1 — Temukan Ceruk
- Clue lingkungan MURNI (tanpa quest marker, tanpa hint teks) — pola visual di dinding karst A1 yang berbeda dari sekitarnya, hanya terlihat jika pemain benar-benar observasi (echo prinsip "temukan lewat melihat, bukan diberi tahu" yang jadi tema besar region)

### Beat 2 — Sekuens Interaktif "Diam Bersama" (DIKONFIRMASI: cutscene interaktif, BUKAN battle state)
**Keputusan final:** rekomendasi teknis sebelumnya sekarang ditetapkan sebagai implementasi resmi — ini BUKAN battle, sama sekali tidak masuk sistem combat state.
- **Struktur teknis:**
  - Trigger masuk ceruk memulai 1 cutscene interaktif (bukan battle load screen) — kamera fokus ke Gema Purwa dan party, tanpa HUD battle (HP bar, giliran, dll.) sama sekali
  - Layar menampilkan SATU prompt kontekstual (ikon, bukan teks tombol standar) — pemain menekannya untuk "diam bersama"
  - Durasi: 1 sekuens singkat terjadwal (`[PLACEHOLDER]` 5-8 detik) dengan animasi Gema Purwa dan party sama-sama diam, tanpa dialog
  - **Tidak ada input lain yang mungkin** selama sekuens ini — prompt tunggal, tidak ada opsi menyerang/lari/apa pun (berbeda dari AW-H04 Tanpa Rupa yang punya jendela waktu dengan opsi aktif vs pasif; di sini hanya SATU jalan)
  - Otomatis berhasil begitu prompt ditekan (atau bahkan otomatis lanjut tanpa input jika desain akhir memilih itu — TIDAK ada kondisi gagal dalam bentuk apa pun)
- **Alasan struktural:** menghindari battle state formal berarti tidak perlu spec HP/damage/AI musuh untuk Gema Purwa di titik ini sama sekali — lebih ringan diproduksi, dan lebih jujur secara desain karena memang tidak ada "pertarungan" yang terjadi

### Beat 3 — Recruitment
- `flag_gema_purwa_recruited = true` — Gema Purwa bergabung (Legendary, tanpa Tipe/Elemen/Role spesifik dicatat di sini karena pasifnya sendiri unik — GK #83: "Statnya selalu sama persis dengan rata-rata seluruh sekutu di timnya")
- **Notifikasi UI bergabungnya DISARANKAN tanpa teks nama, hanya ikon** (konsisten prinsip region — meski Gema Purwa tidak seketat Penunggu Sunyi/Tanpa Rupa soal larangan nama, kanon tetap menyarankan pendekatan minim-teks untuknya)
- Drop: Pusaka Yang Tersisa Ketika Semua Gagal (kunci akun, BUKAN gear — pasif "Tidak Pernah Tersimpan" melarang ia diberi perlengkapan apa pun, termasuk item unik miliknya sendiri; item ini murni penanda penyelesaian di inventaris)
- `flag_aw_h02_complete = true`

## Fail State
- Tidak ada — encounter non-lethal tidak bisa gagal secara mekanis

---

# AW-H03 · TITAH PENUNGGU SUNYI (#99)

## Trigger
- `flag_aw_m04_complete == true` (A5 Palung Purwa accessible, UI battle tanpa teks sudah aktif)

## Flag
- `counter_gelombang_survival` (0-3)
- `flag_hp_threshold_no_ally_down` (boolean — apakah threshold tercapai TANPA sekutu tumbang)
- `flag_penunggu_sunyi_recruited`

## Struktur

### Beat 1-3 — 3 Gelombang Tanpa Dialog Bantuan
- Lindungi 1 NPC tanpa nama di Palung Purwa dari 3 gelombang serangan — TIDAK ADA dialog bantuan apa pun ditampilkan (UI battle sudah tanpa teks sejak AW-M04, konsisten)
- **Battle Params (×3 gelombang):**
  - HP musuh generik `[PLACEHOLDER]` 700/900/1100 (meningkat tiap gelombang), TIDAK ditampilkan sebagai angka (sesuai UI battle tanpa teks)
  - Kondisi KHUSUS: bertahan sampai ambang HP tertentu TANPA ada sekutu yang tumbang — jika 1 sekutu tumbang di titik manapun, `flag_hp_threshold_no_ally_down` gagal untuk attempt ini (bukan game over, tapi recruitment tidak terpicu di akhir)

### Beat 4 — Recruitment
- Trigger: 3/3 gelombang selesai DENGAN syarat "tanpa sekutu tumbang" terpenuhi
- **"Sesuatu yang berdiri di belakangnya selamat" — ia bergabung TANPA memperkenalkan diri**
- **Notifikasi UI bergabungnya WAJIB tanpa teks nama, hanya ikon** (kanon eksplisit, bukan sekadar saran seperti Gema Purwa — ini requirement keras untuk Penunggu Sunyi)
- `flag_penunggu_sunyi_recruited = true` — Penunggu Sunyi bergabung (Ultra Rare)
- Drop: Pusaka reward — **nama item bervariasi tergantung `flag_ending_global`** yang sudah ditentukan (dari AW-M05, meski recruitment ini independen dari AW-M05, item reward-nya TETAP terpengaruh ending karena itu ditentukan oleh akumulasi keputusan sepanjang game, bukan oleh AW-M05 itu sendiri) — lihat DI §3.13 untuk 3 variasi nama

## Fail State
- Sekutu tumbang di gelombang manapun: 3 gelombang tetap selesai (battle tidak otomatis gagal), TAPI recruitment TIDAK terpicu — pemain harus retry seluruh 3 gelombang dari awal untuk mencoba lagi tanpa kehilangan sekutu

---

# AW-H04 · TITAH TANPA RUPA (#100)

## Trigger
- `flag_aw_m02_complete == true` (A6 Pulau Ketujuh accessible)

## Flag
- `array_jejak_kaki_pattern` (2→4→2)
- `flag_pilihan_biner_diam` (boolean — apakah pemain memilih "tidak memilih")
- `flag_tanpa_rupa_recruited`

## Struktur

### Beat 1 — Observasi Jejak Kaki
- Ikuti jejak kaki yang berubah dari 2 jadi 4 lalu kembali ke 2 di Pulau Ketujuh — mini-game observasi murni TANPA teks penjelas (pemain harus menyadari sendiri pola perubahan jumlah kaki)

### Beat 2 — Pilihan Biner: Pilih untuk Tidak Memilih
- Trigger: dihadapkan pilihan "ia manusia / ia bukan-manusia"
- **Mekanik unik:** opsi "diam" (tidak memilih) MUNCUL OTOMATIS jika pemain tidak menekan tombol dalam batas waktu — ini BUKAN opsi ketiga yang dipilih aktif, tapi hasil dari TIDAK bertindak
- **PENTING implementasi:** UI harus dirancang agar "diam" terasa seperti pilihan yang valid, bukan timeout/kegagalan — tidak ada visual "waktu habis!" yang terasa negatif, cukup transisi halus ke hasil "diam"

### Beat 3 — Recruitment
- Trigger: pemain memilih diam (baik sengaja menunggu, atau natural tidak menekan tombol)
- **Jika pemain MEMAKSA memilih salah satu kategori (manusia/bukan-manusia):** Tanpa Rupa TIDAK bergabung di attempt ini — echo kanon "ia bergabung karena pemain tidak memaksakan kategori/batas padanya"
- `flag_tanpa_rupa_recruited = true` — Tanpa Rupa bergabung (Super Rare)
- Drop: Jimat reward — **nama bervariasi per `flag_ending_global`** (DI §3.13, 3 variasi)

## Fail State
- Memilih kategori secara aktif (bukan diam): recruitment gagal untuk attempt ini, TIDAK ada penalti lain — pemain bisa kembali dan coba lagi kapan saja, cukup biarkan waktu habis di kesempatan berikutnya

---

# RINGKASAN DEPENDENCY GRAPH — REGION 9

```
[Prasyarat: 8 region lain selesai penuh]

AW-M01 (Karst Warana — SUB-OBJ: Tapak Nirbahasa, BARU) ──┬──→ AW-H01 (Telapak Kedelapan)
   ↓                     └──→ AW-H02 (Gema Purwa — independen penuh, bisa kapan saja setelah Anawil dibuka)
AW-M02 (Hutan Purba — sub-obj Kaswari, Pari Lampur) ──→ AW-H04 (Tanpa Rupa)
   ↓
AW-M03 (Laguna Tenang — sub-obj Karang Wayahan) ──[flag_dialog_teks_disabled mulai aktif]──┬──→ AW-S01 (Kalana Sauyan)
   ↓                                                                                        └──→ AW-S03 (Wai Cendra)
AW-M04 (Dinding Telapak — sub-obj Sampara Wene) ──[flag_battle_ui_teks_disabled mulai aktif]──┬──→ AW-S02 (Nin Waiam)
   ↓                                                                                            └──→ AW-H03 (Penunggu Sunyi)
AW-M05 (Telapak Pertama — Gema Purba) ──[TIDAK ADA rekrutmen — murni ending, terpisah dari AW-H02]
```

## Titik Kritis Dependency

1. **AW-H02 (Gema Purwa) adalah SATU-SATUNYA hidden mission yang bisa diselesaikan SEBELUM Main Mission apa pun di region ini** — lokasinya di A1 (zona pembuka) dan syaratnya (100% Ensiklopedia 8 region lain) sudah terpenuhi begitu pemain masuk Anawil (jika memang sudah 100%). Ini konsisten dengan tujuan desain kanon: independen total dari flow cerita Anawil.

2. **`flag_ending_global` ditentukan progresif sepanjang SELURUH GAME**, bukan di AW-M05 — tapi BARU DIUNGKAP di AW-M05. Item reward AW-H03 (Penunggu Sunyi) dan AW-H04 (Tanpa Rupa) bergantung pada flag ini WALAUPUN kedua misi itu sendiri independen dari AW-M05 — implementasi harus memastikan `flag_ending_global` bisa diakses/dihitung SEBELUM AW-M05 selesai jika pemain mengerjakan AW-H03/H04 duluan (kemungkinan besar, karena keduanya butuh AW-M04 saja sebagai prasyarat, bukan AW-M05).

3. **Degradasi HUD progresif (4 tingkat: normal → dialog hilang → UI battle hilang → HUD total hilang)** adalah backbone teknis SELURUH region — setiap sistem UI yang dibangun tim engineering untuk region lain HARUS punya "mode degradasi" yang bisa diaktifkan bertahap di sini.

---

# ITEM TINDAK LANJUT UNTUK MANUSIA

1. **Formula `flag_ending_global` — ✅ SELESAI, ditambahkan lengkap di AW-M05 Beat 3-3.5.** Connection Score dari 8 keputusan region (maks 16) + syarat karakter/Ensiklopedia + pilihan final "diam vs tekan tombol" (echo GDD v3 lama). **Catatan penting:** GDD v3 §5.5 yang dirujuk World Bible ternyata purwarupa 2-region/30-karakter — mekanisme syaratnya usang total, formula ini desain baru berdasar esensi tematik saja, BUKAN port langsung dari GDD lama. Perlu review naratif oleh tim writing untuk memastikan pemetaan 8 keputusan region ke tema A/B/C terasa tepat (saya desain berdasar pembacaan tematik saya sendiri terhadap tiap pilihan — "terhubung/berbagi" vs "menyegel/individual" — ini interpretasi, bukan sesuatu yang eksplisit dinyatakan kanon manapun).

2. **AW-H02 (Gema Purwa) — ✅ SELESAI, dikonfirmasi FINAL sebagai cutscene interaktif**, bukan battle state formal. Detail teknis lengkap (single prompt, tanpa HUD battle, tanpa kondisi gagal) ada di Beat 2 misi tersebut.

3. **3 aksi restoratif — ✅ SELESAI untuk Kaswari Tanahwil** (tanam kanopi/semak/titik gundul, detail lengkap di AW-M02 Beat 1). Pari Lampur, Karang Wayahan, Sampara Wene TETAP dengan deskripsi 1-baris sebelumnya — ketiganya lebih berbasis observasi/timing murni (bukan "aksi" berurutan seperti Kaswari), jadi format "3 aksi restoratif" tidak otomatis cocok untuk semuanya. Jika tim level design butuh breakdown serupa untuk ketiganya, perlu diminta terpisah.

4. **HP musuh generik di battle tanpa-teks (AW-M04, AW-H03) sengaja tidak ditampilkan ke pemain** — tapi angka INTERNAL sistem tetap perlu ditentukan untuk keperluan balancing. Placeholder di sini adalah angka internal developer, BUKAN sesuatu yang akan terlihat pemain bahkan setelah implementasi final.

5. **Combat math placeholder** — status sama seperti R1-R8: direvisi setelah Quest Script 9 region selesai. **Dengan selesainya dokumen ini, seluruh 9 region sudah di-Quest-Script — pass combat math global sekarang bisa dimulai.**

---

*Quest Script Region 9 — Draf v0.2 · September 2026*
*Status: 12/12 misi Anawil di-script detail (5 Main + 3 Side + 4 Hidden). 0 monster region baru tanpa alasan. 1 BUG STRUKTURAL SERIUS diperbaiki (Gema Purwa — AW-M05 vs AW-H02). 1 gap tambahan ditemukan & diperbaiki saat revisi ini (Tapak Nirbahasa #76 — sempat hilang dari 5 sub-objective yang seharusnya, sekarang di AW-M01). AW-H02 dikonfirmasi final sebagai cutscene interaktif. 3 aksi restoratif Kaswari Tanahwil didetail lengkap. Penunggu Sunyi dan Tanpa Rupa diverifikasi selaras kanon. Seluruh pasif karakter diverifikasi langsung ke Guide Karakter. 3 item tindak lanjut tersisa (formula ending butuh review tim writing, HP musuh generik, combat math global). Belum diimplementasi, belum playtest.*

---

# 🎉 CATATAN PENUTUP — SELURUH 9 REGION SELESAI DI-QUEST-SCRIPT

Dengan selesainya Quest Script Region 9 (Anawil), seluruh 9 region Pusaka: Gema Nawantara sekarang punya spesifikasi implementasi detail:

| Region | Quest Script | Misi | Gap Ditemukan & Diperbaiki |
|---|---|---|---|
| 1. Nirwasita | v0.2 | 13 | — |
| 2. Kadewan | v0.3 | 15 | Kala Sesari (rekrutmen) |
| 3. Smarana | v0.2 | 17 | Antuwan Melayang, Jatawira |
| 4. Wanasunya | v0.1 | 17 | 8 karakter (stub Side Mission) + restrukturisasi Opsi C (Sang Lengang) |
| 5. Kalamrtu | v0.2 | 18 | 3 karakter + Rahib Abu, Lidah Watu (Cara Didapat) |
| 6. Himagiri | v0.1 | 14 | Opsi D (Wisesa Girinatha) + Pasarwengi, Sabdaguna, Tabuh Senja |
| 7. Rajawani | v0.2 | 16 | Sawangi Pala + Penjaga Polos (Cara Didapat) |
| 8. Jaladri | v0.2 | 16 | Abu Tembara + Gema Ganda (Cara Didapat) |
| 9. Anawil | v0.1 | 12 | Gema Purwa (bug struktural AW-M05 vs AW-H02) |
| **TOTAL** | | **138** | **9 region, setiap satu punya minimal 1 temuan** |

**Item tindak lanjut lintas-region yang masih terbuka:**
1. Combat math global (placeholder di seluruh 9 dokumen) — sekarang bisa dimulai karena seluruh region sudah lengkap
2. Revisi resmi WB §II.1 total jam per-season — ditunda sengaja sampai titik ini (Item #15 Kerangka Misi)
3. Dokumen Walkthrough — dijadwalkan setelah kedua item di atas dan playtest

Tahap berikutnya sesuai rencana asli: playtest, pass combat math global, lalu revisi final World Bible.
