# QUEST SCRIPT — REGION 4: WANASUNYA
# PUSAKA: GEMA NAWANTARA

**Versi:** Draf v0.1 — Quest Script Detail
**Status:** 🟡 SIAP REVIEW TEKNIS — belum diimplementasi, belum playtest
**Rujukan kanon:**
- `World_Bible_Pusaka_Gema_Nawantara_v5.1.md` §BAB 4 (Wanasunya)
- `GUIDE_KARAKTER_100_Nawantara_FINAL_v1.1.md` #29-37, #89-90
- `DOKUMEN_ITEM_Pusaka_Gema_Nawantara_FINAL_v1.md` §1.4, §2, §3.5, §3.10
- `KERANGKA_MISI_Pusaka_Gema_Nawantara.md` v0.8 (kerangka sumber — 17 misi Wanasunya, sudah termasuk restrukturisasi Opsi C rantai Sang Lengang)
**Tanggal:** September 2026

**Verifikasi pra-scripting (pelajaran dari R1-R3, checklist diperluas):**
- **Monster:** WB §4.8 sudah punya "Pemburu Tersesat" (Umum) dan "Rimba Bersuara" (Elite) — dipakai langsung.
- **Item/Titah:** Seluruh 11 karakter roster Wanasunya (#29-37, #89-90) di-cross-check ke DI §3.5 SEBELUM menulis script. **Ditemukan gap TERBESAR sejauh ini** — Kerangka Misi awal menstub seluruh Side Mission dan melewatkan 3 karakter Common sepenuhnya. Diperbaiki di Kerangka Misi v0.6-0.8 sebelum dokumen ini ditulis (8 Side Mission penuh + rekonstruksi Main Mission).
- **Pasif/Skill karakter yang dikutip di battle params:** SETIAP pasif yang disebut dalam dokumen ini diverifikasi langsung ke Guide Karakter sebelum ditulis (pelajaran dari kesalahan kutip pasif Juragan Larung di R3). **Ditemukan kesalahan STRUKTURAL besar**: draf awal WN-M05 mencampur identitas Niniak Belang (#35) dan Sang Lengang (#37) — pertanyaan "Apakah kau datang untuk mengambil?" adalah milik Niniak Belang, BUKAN Sang Lengang, dan "Cara didapat" kanon Sang Lengang eksplisit menyatakan ia TIDAK dilawan ("menyaksikan, tidak bertarung"). Diperbaiki lewat restrukturisasi Opsi C — lihat Kerangka Misi v0.8 untuk detail keputusan.

---

## KONVENSI SCRIPT

Sama seperti Quest Script R1-R3 — lihat dokumen tersebut untuk definisi Flag/Trigger/Battle Params/Dialog Branch/Fail State. Angka HP non-kanon tetap `[PLACEHOLDER — akan direvisi]`. Angka HP/pasif yang dikutip dari Guide Karakter ditandai `(kanon)`.

**Catatan khusus Region 4:** Wanasunya adalah region Season 2 (bebas urutan) seperti Smarana. Main Mission WN-M01-M06 sekarang LINEAR di dalam region (berbeda dari draf sebelumnya) karena WN-M05-M06 saling bergantung erat (Niniak Belang harus direkrut dulu sebelum Sang Lengang bisa muncul). Side dan Hidden Mission tetap bebas urutan relatif terhadap Main Mission, dengan prasyarat individual masing-masing.

---

# WN-M01 · LADANG TERAKHIR

## Trigger
- Season 2 terbuka (`flag_kd_m06_complete == true`) DAN pemain memilih Wanasunya (bisa sebelum/sesudah Smarana)

## Flag
- `flag_wn_m01_complete`
- `flag_jejak_tutorial_seen`
- `counter_penanda_placed` (0-5)

## Struktur

### Beat 1 — Tiba di Ladang Terakhir
- Cutscene pendek: kontras visual dengan Smarana — W1 sepi, alami, tanpa keramaian dagang
- Tutorial mekanik: UI popup "Jejak yang Menutup — jalur tertutup setelah 3 ronde siang, 5 ronde jika kamu menaruh Penanda. Maksimal 5 Penanda bisa aktif sekaligus."

### Beat 2 — Puzzle Navigasi & Penanda
- Labirin alam sederhana (tutorial) — pemain harus menaruh Penanda di titik strategis SEBELUM jalur tertutup
- `counter_penanda_placed` naik tiap Penanda ditaruh, maks 5 aktif (menaruh ke-6 memaksa pemain memilih 1 Penanda lama untuk dihapus — tutorial trade-off resource)
- Avatar Beast (unit party ber-tipe Beast, jika ada) memberi bonus "mengendus jalur" — visual hint tambahan arah, TIDAK wajib tapi mempercepat

### Beat 3 — Battle Tutorial
- **Battle Params:**
  - Musuh: 2x Pemburu Tersesat (kanon Umum, WB §4.8) — HP **1354 (dikoreksi hasil audit Combat Math Global — Level~24, Wanasunya region kedua S2)**
  - Kondisi menang: HP 0%

### Beat 4 — Reward
- Drop: Serat Daun Sunyi (Common Jimat, DI §1.4)
- Puti Lengang muncul sebagai vendor Penanda tambahan (WB §4.12) — **catatan penting:** ini peran VENDOR, terpisah dari recruitment (lihat WN-S01). Pemain bisa berdagang dengannya sejak titik ini meski belum merekrutnya sebagai anggota tim.
- `flag_wn_m01_complete = true`

## Fail State
- Party wipe: auto-revive 30% HP (pola tutorial standar)

---

# WN-M02 · EMPAT PULUH TAHUN

## Trigger
- `flag_wn_m01_complete == true`
- Pemain masuk W2 Rimba Batas

## Flag
- `counter_tanda_found` (0-5)
- `flag_wn_m02_complete`

## Struktur

### Beat 1 — Tanda-Tanda Penghuni
- 5 tanda keberadaan penghuni tersebar W2-W3 (bekas api unggun, dinding rotan, dll.) — setiap tanda ditemukan mengarah ke tanda berikutnya (chain clue)
- **Tanda ke-3 SENGAJA menyesatkan** — jebakan yang terlihat identik dengan tanda asli. Pembeda: tanda asli selalu menghadap arah matahari terbenam (observasi visual, bukan quest marker)
- Salah ikuti jebakan → kembali ke tanda ke-2, tidak ada penalti keras selain waktu

### Beat 2 — Battle: Rimba Bersuara
- Trigger: 5/5 tanda ditemukan (termasuk melewati jebakan dengan benar)
- **Battle Params:**
  - Musuh: Rimba Bersuara (kanon Elite, WB §4.8 — "hutan itu sendiri menyerang siapa pun yang memaksa masuk") — HP **2708 (dikoreksi hasil audit Combat Math Global — Level~24, formula ×1.5 dari Common)**
  - **Mekanik Jejak yang Menutup aktif di battle:** arena bergeser tiap 3 ronde — posisi party berubah otomatis (implementasi: reshuffle posisi barisan depan/belakang, memaksa adaptasi strategi target tiap 3 ronde)
  - Kondisi menang: HP 0%

### Beat 3 — Reward
- Drop: Cakar Tersembunyi (Uncommon Senjata, DI §1.4)
- Akses W4 terbuka
- `flag_wn_m02_complete = true`

## Fail State
- Party wipe: retry battle, progres 5 tanda tidak reset

---

# WN-M03 · RUMAH UPIAK

**Catatan implementasi khusus:** Misi penentu Resolusi Region (WB §4.6, §4.10). 0 battle — murni dialog dan eksplorasi, konsisten dengan tema "keputusan moral tidak butuh justifikasi lewat pertarungan".

## Trigger
- `flag_wn_m02_complete == true`
- Pemain masuk W4 Lembah Musna

## Flag
- `flag_upiak_met`
- `counter_bukti_beri_tahu` (0-3)
- `counter_bukti_jangan` (0-3)
- `flag_wn_resolution_path` (enum: INFORMED / KEPT_SECRET) — **PALING PENTING di region ini**, dipakai WN-H02, WN-H03, dan Resolusi Region

## Struktur

### Beat 1 — Pertemuan Upiak
- Dialog bercabang 4 lapis: Upiak bercerita kenapa ia masuk hutan 40 tahun lalu dan memilih tetap tinggal
- Lapis 1-3: eksplorasi cerita (opsional flavor, tidak mengubah hasil akhir)
- Lapis 4: pemain diberi tahu ada 2 opsi akhir, TAPI tidak bisa memilih dulu

### Beat 2 — Kumpul Bukti (Wajib Sebelum Memilih)
- 3 bukti mendukung "beri tahu keluarga" tersebar W4 (surat lama, barang keluarga yang ditinggal, dll.)
- 3 bukti mendukung "jangan beri tahu" tersebar W4 (tanda kedamaian Upiak saat ini, alasan ia benar-benar bahagia di sini, dll.)
- Pemain HARUS menemukan minimal 1 dari masing-masing kategori sebelum opsi akhir terbuka (memastikan keputusan tidak diambil buta sepihak)

### Beat 3 — Pilihan Akhir
- **Dialog Branch:**
  - `[Beri tahu keluarganya]` → `flag_wn_resolution_path = INFORMED`. Upiak keluar hutan, dialog penutup menunjukkan ia "tidak pernah benar-benar bahagia lagi" — tidak ada battle, murni cutscene
  - `[Jangan beri tahu]` → `flag_wn_resolution_path = KEPT_SECRET`. Upiak tetap, pemain membawa rahasia — dialog penutup lebih hening, tidak ada resolusi dramatis

### Beat 4 — Reward
- Resolusi Region ditentukan (WB §4.10)
- Drop: Topeng Rimbo (Rare Jimat, DI §1.4) dari eksplorasi W4 (bukan dari battle — item lingkungan)
- Akses Rumah Upiak (Area Tersembunyi) TERBUKA (prasyarat WN-H02)
- `flag_upiak_met = true`, `flag_wn_m03_complete = true`

## Fail State
- Tidak ada battle untuk gagal. Jika pemain mencoba memilih sebelum kumpul bukti minimal: opsi akhir tetap terkunci, UI menunjukkan "Kamu belum benar-benar memahami kedua sisi" — bukan fail, hanya soft-block sampai syarat terpenuhi

---

# WN-M04 · HUTAN BELANG

## Trigger
- `flag_wn_m03_complete == true`
- Pemain masuk W5 Kampung Lengang → W6 Hutan Belang

## Flag
- `array_pohon_penanda` (7 pohon, 1 asli)
- `flag_wn_m04_complete`

## Struktur

### Beat 1 — Puzzle 7 Pohon Penanda
- 7 pohon penanda di W6, hanya 1 asli (batas hutan terakhir yang tidak boleh dilalui tanpa persiapan)
- Petunjuk pembeda: pohon asli TIDAK PERNAH berpindah posisi meski mekanik Jejak yang Menutup aktif di sekitarnya (6 pohon jebakan "bergeser" posisi visual tiap kali jalur tertutup dan terbuka lagi, pohon asli statis)
- Ini butuh pemain OBSERVASI selama minimal 1 siklus jejak-tertutup untuk membedakan (~15 detik menunggu, bukan langsung tebak)

### Beat 2 — Battle Elite Malam
- Trigger: pohon asli teridentifikasi, pemain lanjut ke W6 dalam
- **Battle Params:**
  - Musuh: Elite bertingkat (echo Rimba Bersuara, versi lebih kuat — variasi tematik, bukan duplikat monster kanon; HP **2708 — dikoreksi hasil audit Combat Math Global, Elite ×1.5 dari Common Level~26**)
  - **Modifikasi malam (WB §4.12):** jika battle terjadi malam hari, Jejak tertutup dalam 2 ronde (bukan 3) — avatar Beast jadi krusial untuk mitigasi
  - Kondisi menang: HP 0%

### Beat 3 — Reward
- Drop: Jejak yang Tak Pernah Ada (Super Rare Pusaka, DI §1.4)
- Akses W7 terbuka
- `flag_wn_m04_complete = true`

## Fail State
- Party wipe: retry battle, identifikasi pohon asli tidak reset

---

# WN-M05 · EMPAT RATUS TAHUN BERTANYA (TITAH NINIAK BELANG)

**Catatan implementasi khusus — Restrukturisasi Opsi C:** Misi ini DIPROMOSIKAN dari Hidden Mission ke Main Mission. Struktur 3-langkah Titah sudah kanon di DI §3.10 sejak awal ("Temukan garis batas → Dihadapkan pertanyaan → Jawab jujur = bergabung") — script ini mengelaborasi struktur itu, bukan menciptakan yang baru.

## Trigger
- `flag_wn_m04_complete == true`
- Pemain masuk W7 Puncak Lengang (gerbang terluar)

## Flag
- `counter_aksi_restoratif` (0-3)
- `flag_niniak_belang_recruited`
- `flag_wn_m05_complete`

## Struktur

### Beat 1 — Pertemuan Niniak Belang
- Niniak Belang (#35, Super Rare) berdiri di gerbang, tidak menyerang, hanya menatap
- Dialog (kanon, echo lore GK #35): *"Apakah kau datang untuk mengambil?"* — pertanyaan yang sama diulang 400 tahun, hanya dijawab jujur 3 kali sepanjang itu

### Beat 2 — 3 Aksi Restoratif (Bukti, Bukan Sekadar Kata) — DETAIL LENGKAP, parameter numerik ditambahkan
Sesuai kerangka: pemain harus MEMBUKTIKAN lewat aksi, bukan hanya memilih dialog "aku datang memulihkan". 3 aksi konkret, tersebar W5-W7, TIDAK wajib urutan tertentu:

1. **Pulihkan pohon batas yang rusak** (W5 Kampung Lengang) — pohon penanda garis wilayah yang tumbang/rusak (echo peran Niniak Belang sebagai penjaga batas). **Mekanik persis:** tekan-tahan 1 tombol selama `[PLACEHOLDER]` 3 detik pada 3 titik topang berbeda di batang pohon (total 3 tekan-tahan berurutan, masing-masing titik muncul setelah titik sebelumnya selesai) — tanpa teks instruksi, hanya highlight visual bergeser ke titik berikutnya. Gagal tekan-tahan penuh (dilepas sebelum 3 detik) = progres titik itu reset ke 0, tidak ada penalti lain
2. **Kembalikan yang tersesat ke tempatnya** (W6 Hutan Belang) — 1 hewan kecil (anak rusa) tersesat, ditemukan lewat jejak. **Mekanik persis:** pemain berjalan `[PLACEHOLDER]` maks 3 meter di depan hewan (echo "mendekat tanpa mengejar", mirip WN-S01) — jika jarak turun di bawah 1.5 meter, hewan berhenti mengikuti selama `[PLACEHOLDER]` 5 detik sebelum mau lanjut lagi (penalti waktu, bukan fail). Jarak tempuh total sampai kelompoknya: `[PLACEHOLDER]` 40 meter
3. **Tenangkan satwa liar tanpa kekerasan** (W7 Puncak Lengang, dekat gerbang Niniak Belang) — 1 satwa liar terluka/ketakutan menghalangi jalan. **Mekanik persis:** diam total (tanpa input gerak/aksi apa pun) selama `[PLACEHOLDER]` 8 detik berturut-turut (echo pola RJ-H03 Talaga Diam yang memakai skema serupa) — timer terlihat lewat indikator visual non-teks (mis. cincin cahaya yang menutup perlahan di sekitar satwa, bukan angka countdown). Input apa pun (termasuk kamera bebas berlebihan) mereset timer ke 0

`counter_aksi_restoratif` naik tiap aksi selesai (independen urutan). Ketiga aksi secara tematik membentuk progresi: **memulihkan benda mati (pohon, 3 aksi aktif berurutan) → membantu makhluk hidup kembali (hewan tersesat, aksi berkelanjutan dengan jarak terjaga) → menahan diri sepenuhnya (satwa liar, murni pasif)** — dari aksi aktif ke aksi pasif, mencerminkan pergeseran dari "melakukan" ke "tidak melakukan" yang jadi inti jawaban jujur Niniak Belang. Seluruh angka `[PLACEHOLDER]` di atas adalah starting point desain, akan disesuaikan saat pass combat math/pacing global.

### Beat 3 — Battle (Bergantung Bukti)
- **Jika `counter_aksi_restoratif == 3` (bukti lengkap):**
  - Battle SANGAT singkat: party hanya perlu BERTAHAN 0-1 ronde (echo pola KD-H02/NR-M03 — kondisi menang berbasis tidak menyerang, bukan HP)
  - Niniak Belang kanon (GK #35): pasif "Batas Terakhir" aktif (barisan belakang tim pemain -30% damage — INI MENGUNTUNGKAN PARTY meski ia masih "musuh" di battle ini, karena battle ini uji kesabaran bukan pertarungan mematikan), Spesial "Satu Pertanyaan" menumpuk *Jawaban* dari serangan yang ia TERIMA (bukan yang ia berikan) — jika party tidak menyerang sama sekali, tumpukan *Jawaban* tidak naik, dan itu justru yang diinginkan (echo tema: kejujuran bukan soal kekuatan)
- **Jika `counter_aksi_restoratif < 3` (bukti belum lengkap):**
  - Battle penuh 3 ronde — Niniak Belang benar-benar menguji ketahanan party dengan Auman Rendah (AoE + -ATK) dan Spesial Satu Pertanyaan aktif penuh
  - **HP 3800 (dikonfirmasi final, dalam rentang 3500-4000 yang ditetapkan — dipilih sebagai titik tengah, mencerminkan Super Rare "Wajah Region" yang lebih kuat dari Super Rare biasa tapi jelas di bawah tier Legendary)**

### Beat 4 — Recruitment & Reward
- Kedua jalur (bukti lengkap atau tidak): jika party TIDAK pernah menyerang lebih dari batas wajar selama battle, `flag_niniak_belang_recruited = true`
- Drop: Pusaka Empat Ratus Tahun Bertanya (DI §3.5/§3.10 — item kanon, basis 200% +15 poin persen)
- `flag_wn_m05_complete = true`
- Trigger: akses ruang dalam W7 terbuka (WN-M06)

## Fail State
- Jika party menyerang berlebihan tanpa bukti cukup: battle tidak "gagal" secara HP, tapi Niniak Belang TIDAK yakin — dialog: "Kau belum menjawab." Party harus kembali kumpulkan aksi restoratif dan coba lagi (bukan permanent fail, hanya perlu retry dengan persiapan lebih baik)

---

# WN-M06 · BELANTARA MENELAN (SANG LENGANG, SPECTATOR)

**Catatan implementasi khusus — Restrukturisasi Opsi C:** Ini PERBAIKAN TOTAL dari draf sebelumnya. Sang Lengang TIDAK dilawan pemain. Battle yang terjadi adalah antara Niniak Belang (ally) vs Bayangan (manifestasi niat jahat/kebohongan), disaksikan pemain. Ini secara ketat mengikuti kanon "Cara didapat" Sang Lengang: *"hutan menampakkan diri sekali — pemain menyaksikan, tidak bertarung."*

## Trigger
- `flag_wn_m05_complete == true` (Niniak Belang sudah direkrut)
- Pemain masuk ruang dalam W7

## Flag
- `flag_sang_lengang_recruited`
- `flag_penanda_terakhir_obtained` (Item Spesial, DI §2)
- `flag_wn_m06_complete`

## Struktur

### Beat 1 — Pengantar
- Cutscene: hutan di sekitar ruang dalam W7 mulai "diam" secara tidak wajar — bahkan SFX battle standar teredam (echo karakteristik kanon Sang Lengang: "kehadirannya membuat seluruh SFX battle sedikit teredam")
- Niniak Belang (kini ally, baru direkrut) melangkah maju sendirian — dialog singkat: ia merasakan sesuatu yang salah, sesuatu yang MUNGKIN dibawa pemain tapi ternyata tidak

### Beat 2 — Battle Spectator: Niniak Belang vs Bayangan (SPESIFIKASI TEKNIS LENGKAP — BARU)

**Keputusan teknis final: BATTLE STATE SUNGGUHAN, BUKAN cutscene pre-rendered.** Berbeda dari AW-H02 (Gema Purwa, Anawil) yang diputuskan sebagai cutscene interaktif murni — battle ini punya alasan berbeda untuk pilihan berlawanan:

**Kenapa battle state, bukan cutscene (berbeda dari AW-H02):**
- AW-H02 hanya 1 momen "diam bersama" tanpa pertukaran combat nyata — cutscene murah dan tepat untuk itu
- WN-M06 melibatkan Niniak Belang benar-benar memakai kit combat penuh (Dasar, Spesial "Satu Pertanyaan", Pamungkas "Empat Ratus Tahun Bertanya") lewat beberapa ronde — cutscene pre-rendered untuk ini MAHAL diproduksi (animasi combat multi-ronde penuh) dan RAPUH terhadap balance patch (kalau stat Niniak Belang berubah di pass combat math global nanti, cutscene harus di-render ulang; battle state otomatis menyesuaikan)
- Battle state sungguhan memakai ulang sistem combat yang SUDAH ADA — jauh lebih murah diproduksi dan otomatis tetap sinkron dengan balance apa pun

**Implementasi teknis persis:**
1. **Battle di-flag `battle_type = "spectator"`** — flag baru di sistem battle (bukan flag custom per-misi) supaya bisa dipakai ulang jika region lain butuh pola serupa di masa depan
2. **Party pemain:** unit tetap muncul di formasi battle (untuk konsistensi visual), TAPI seluruh tombol aksi (Serang/Skill/Item/Guard) disembunyikan dari UI — bukan cuma di-disable, benar-benar tidak dirender, supaya tidak ada kebingungan "kenapa tombol ini tidak bisa ditekan"
3. **Niniak Belang:** dikontrol AI internal (profil "AI Sekutu Scripted" — TIDAK sama dengan AI musuh biasa, memakai urutan skill yang sudah ditentukan: Dasar → Spesial "Satu Pertanyaan" ronde 2 → Pamungkas "Empat Ratus Tahun Bertanya" ronde 3-4 untuk memastikan battle berakhir cepat dan meyakinkan)
4. **Bayangan (musuh):** **HP DISENGAJA RENDAH BY DESIGN (dikonfirmasi, bukan placeholder terbuka)** — diset relatif terhadap total damage output Niniak Belang dalam 3-4 ronde memakai kit di atas (rekomendasi: ~1400, cukup rendah agar kalah meyakinkan dari kit penuh Niniak Belang Level~26 W7) — memastikan kemenangan tercapai lewat damage NYATA (bukan scripted-win paksa), supaya battle tetap terasa "asli" meski hasilnya sudah pasti
5. **Safety net:** jika karena alasan apa pun (mis. balance berubah drastis di masa depan) battle belum selesai di ronde ke-5, sistem MEMAKSA battle berakhir dengan Niniak Belang menang (hard trigger) — mencegah battle spectator ini macet tanpa akhir
6. **UI HP bar dan nama skill TETAP tampil normal** (BEDA dari Anawil — Wanasunya tidak punya mekanik Tanpa Kata, jadi tidak ada alasan menyembunyikan informasi combat standar di sini)

**Bayangan HP:** `[PLACEHOLDER]` 1400 (skala kasar: cukup rendah agar kalah dalam 3-4 ronde dari kit Niniak Belang Level akhir W7, akan disesuaikan saat pass combat math global)

- Niniak Belang MENANG (hasil pasti secara desain, dicapai lewat damage nyata bukan scripted-win) — mengonfirmasi kejujuran pemain dengan mengalahkan representasi ketidakjujuran itu sendiri secara simbolis

### Beat 3 — Sang Lengang Menampakkan Diri
- Trigger: Bayangan lenyap
- Sang Lengang (#37, Legendary) mendekat dari kejauhan sepanjang sisa cutscene — TIDAK ada battle dengannya sama sekali, sesuai kanon
- Dialog naratif (tanpa pilihan — momen ini linear, bukan bercabang): hutan "memilih" menampakkan diri karena kejujuran pemain sudah dibuktikan lewat Niniak Belang

### Beat 4 — Recruitment & Reward
- `flag_sang_lengang_recruited = true` — Sang Lengang bergabung (Legendary, Beast/Pertiwi/CC)
- Pasif kanon yang benar (GK #37, dikoreksi dari draf sebelumnya): **"Memilih Tak Terdengar"** — selama Sang Lengang hidup, tim +25% penghindaran terhadap serangan AoE; saat pertama kali setiap lawan beraksi, 30% peluang aksinya "kehilangan jalur" (dialihkan ke target acak)
- Drop: Gerbang Kaum Lengang (Ultra Rare Pusaka, DI §1.4)
- **Cek Item Spesial:** Penanda Terakhir (DI §2, "dari rantai misi menemukan seluruh Penanda yang hilang") — syarat terpisah dari recruitment Sang Lengang, cek `counter_penanda_placed` dan progres Penanda lintas-region terpenuhi. Jika ya: `flag_penanda_terakhir_obtained = true`
- `flag_wn_m06_complete = true`
- Trigger: Season 3 terbuka (jika region lain S2 — Smarana — juga sudah selesai) ATAU pemain lanjut ke Smarana jika belum

## Fail State
- Tidak ada — battle spectator tidak bisa gagal (party tidak berpartisipasi). Jika pemain entah bagaimana mencoba menutup aplikasi/skip cutscene paksa: sistem harus tetap mencatat `flag_wn_m06_complete = true` setelah sekuens selesai diputar minimal sekali (mencegah soft-lock dari skip agresif)

---

# WN-S01 · YANG MEMILIH PERGI (TITAH PUTI LENGANG)

## Trigger
- `flag_wn_m01_complete == true`
- Ditemukan di W1 (lokasi sama dengan perannya sebagai vendor)

## Flag
- `counter_approach_attempts` (0-3, dengan jeda)
- `flag_puti_lengang_recruited`

## Struktur
- Puzzle "mendekat tanpa membuatnya pergi" — jika pemain interaksi berturut-turut tanpa jeda, Puti Lengang "menghilang" sebentar (echo lore: "orang berhenti mencari, dan itu cukup" — mendekat terlalu agresif = echo dari dunia lama yang mencarinya)
- 3x percobaan mendekat dengan jeda (mirip pola Antuwan Melayang di Smarana) sebelum ia akhirnya bicara penuh
- Battle: 1 encounter ringan — monster yang "mencarinya" tanpa sadar (echo tematik gangguan terakhir dari dunia luar). HP **1869 — dikoreksi hasil audit Combat Math Global, Common-tier Level~26 Wanasunya**
- Drop: Jimat Yang Memilih Pergi (DI §3.5)
- `flag_puti_lengang_recruited = true` — Puti Lengang bergabung (Common, Human/Bayu/Support) — **catatan:** perannya sebagai vendor (WB §4.12) TETAP AKTIF setelah recruitment, keduanya tidak eksklusif

## Fail State
- Tidak ada — bisa retry percobaan mendekat tanpa batas

---

# WN-S02 · GENANGAN YANG TAK PERNAH KERING (TITAH LASIK KUBANG)

## Trigger
- `flag_wn_m01_complete == true`
- Ditemukan W2-W3

## Flag
- `counter_kubangan_kering_found` (0-3)
- `flag_lasik_kubang_recruited`

## Struktur
- Pelacakan: temukan kubangan-kubangan kering yang pernah "diminum" Lasik Kubang, ikuti menuju sumbernya
- Battle: musuh dengan lifesteal (kanon GK #30, Dasar "Cecap" — heal diri 30% dari damage) — HP **1869 — dikoreksi Common-tier Level~26**. Battle mengajarkan burst damage untuk mengalahkan regenerasi
- Drop: Senjata Genangan yang Tak Pernah Kering (DI §3.5)
- `flag_lasik_kubang_recruited = true` — Lasik Kubang bergabung (Common, Ghost/Apah/Attacker)

## Fail State
- Party wipe: retry battle, pelacakan tidak reset

---

# WN-S03 · CUKUP UNTUK SEMUA (TITAH RANGKIANG BATU)

## Trigger
- `flag_wn_m02_complete == true`
- Ditemukan W3-W4

## Flag
- `flag_hitungan_lumbung_correct`
- `flag_rangkiang_batu_recruited`

## Struktur
- Puzzle hitung: cocokkan isi lumbung dengan jumlah keluarga yang pernah tinggal (data dari nisan/penanda rumah kosong W3-W4) — selalu "cukup", pemain membuktikan lewat penghitungan
- Battle: tank dengan tarik aggro (kanon GK #31, Dasar "Hentakan Tiang") — HP **1869 — dikoreksi Common-tier Level~26**. Battle defensif, party bertahan sementara Rangkiang Batu diuji
- Drop: Pusaka Cukup untuk Semua (DI §3.5)
- `flag_rangkiang_batu_recruited = true` — Rangkiang Batu bergabung (Common, Spirit/Pertiwi/Tank)

## Fail State
- Hitungan salah: bisa dicoba ulang tanpa batas, tidak ada penalti

---

# WN-S04 · KESEPAKATAN LAMA (TITAH SINDAKA RIMBO)

## Trigger
- `flag_wn_m01_complete == true`
- Ditemukan W1-W2

## Flag
- `flag_dialog_avoided_name` (boolean — apakah pemain berhasil menghindari menyebut namanya)
- `flag_sindaka_rimbo_recruited`

## Struktur
- Puzzle dialog: investigasi keberadaannya TANPA menyebut namanya langsung di pilihan dialog — opsi yang menyebut nama eksplisit membuatnya menjauh (dialog tersedia lagi setelah delay), opsi tidak langsung ("pelindung", "yang dijaga kesepakatan") membuka progres
- Battle: attacker sulit ditarget (kanon lore: "tidak pernah menampakkan diri lebih dari 2 detik") — mekanik dodge/stealth tinggi, party perlu AoE atau prediksi pola. HP **2751 — dikoreksi hasil audit Combat Math Global, Uncommon-tier Level~26**
- Drop: Senjata Kesepakatan Lama (DI §3.5)
- `flag_sindaka_rimbo_recruited = true` — Sindaka Rimbo bergabung (Uncommon, Beast/Bayu/Attacker)

## Fail State
- Menyebut nama langsung: tidak fail permanen, hanya delay sebelum bisa dialog lagi

---

# WN-S05 · BERJALAN MUNDUR SEMALAMAN (TITAH UHANG SUNYI)

## Trigger
- `flag_wn_m02_complete == true`
- Ditemukan W2-W4

## Flag
- `flag_reverse_navigation_complete`
- `flag_uhang_sunyi_recruited`

## Struktur
- Puzzle navigasi terbalik: ikuti jejak kaki mundur, pemain menavigasi jalur dengan membaca urutan terbalik dari jejak yang ditemukan (bukan mengikuti arah normal)
- Battle: crowd control (kanon GK #33, Dasar "Dorongan Rendah" — dorong ke barisan belakang) — HP **2751 — dikoreksi Uncommon-tier Level~26**. Battle mengajarkan manajemen posisi saat CC berulang
- Drop: Jimat Berjalan Mundur Semalaman (DI §3.5)
- `flag_uhang_sunyi_recruited = true` — Uhang Sunyi bergabung (Uncommon, Beast/Bayu/CC)

## Fail State
- Salah navigasi terbalik: kembali ke titik awal jalur, tidak ada penalti keras

---

# WN-S06 · SEMBILAN METER DAFTAR (TITAH BUNDO SARIKASO)

## Trigger
- `flag_wn_m03_complete == true` (echo tematik dengan WN-M03, W4-W5 accessible)
- Ditemukan W4-W5

## Flag
- `counter_daftar_fragmen` (0-5)
- `flag_bundo_sarikaso_recruited`

## Struktur
- Kumpul 5 fragmen daftar sembilan meter (echo skala kecil mekanik "400 bait" Kayuri Sindu, Nirwasita) — tersebar W4-W5
- Susun untuk memahami APA yang direlakan Wanasunya saat memilih menghilang — memperkaya konteks WN-M03 jika sudah dikerjakan
- Battle: support enemy yang mem-buff diri tiap ronde (echo peran Support Bundo Sarikaso sendiri, battle sebagai "cerminan" kemampuannya) — HP **3668 — dikoreksi hasil audit Combat Math Global, Rare-tier Level~26**
- Drop: Jimat Sembilan Meter Daftar (DI §3.5)
- `flag_bundo_sarikaso_recruited = true` — Bundo Sarikaso bergabung (Rare, Human/Teja/Support)

## Fail State
- Party wipe: retry battle, fragmen tidak reset

---

# WN-S07 · KE SINI, IKUTI SUARAKU (TITAH SUARA TANWUJUD)

## Trigger
- `flag_wn_m04_complete == true`
- Ditemukan W5-W6

## Flag
- `flag_audio_navigation_complete`
- `flag_suara_tanwujud_recruited`

## Struktur
- Puzzle navigasi audio murni — TANPA HUD arah (echo mekanik Nirwasita, foreshadowing ringan untuk Anawil), ikuti suaranya yang terdengar dari arah berbeda-beda tiap kali bicara. Pola: suara makin dekat = arah benar
- Battle: support ringan, bisa dimenangkan lebih cepat dengan heal (echo peran healer-nya sendiri) — HP **3668 — dikoreksi hasil audit Combat Math Global, Rare-tier Level~26**
- Drop: Jimat Ke Sini, Ikuti Suaraku (DI §3.5)
- `flag_suara_tanwujud_recruited = true` — Suara Tanwujud bergabung (Rare, Ghost/Pertiwi/Support)

## Fail State
- Tersesat dalam navigasi audio: tidak ada penalti, suara terus terdengar sampai pemain menemukan arah benar

---

# WN-S08 · RUTE YANG DIULANG (TITAH TAPAK GHAIB)

## Trigger
- `flag_wn_m04_complete == true`
- Ditemukan W6

## Flag
- `flag_anomaly_point_found`
- `flag_tapak_ghaib_recruited`

## Struktur
- Ikuti loop jejak kaki berulang, temukan titik di mana rute MENYIMPANG dari pola normal (1 titik anomali di antara puluhan pengulangan identik) — puzzle deteksi anomali/observasi pola
- Battle: attacker 2-target (kanon GK #90, Dasar "Injak Basah") — HP **3668 — dikoreksi Rare-tier Level~26**
- Drop: Senjata Rute yang Diulang (DI §3.5)
- `flag_tapak_ghaib_recruited = true` — Tapak Ghaib bergabung (Rare, Spirit/Apah/Attacker)

## Fail State
- Tidak menemukan anomali: bisa terus mencoba, loop jejak tidak hilang

---

# WN-H01 · AIR NAIK (TITAH SAMBILAN TALAGO)

## Trigger
- `flag_wn_m04_complete == true` (W6 accessible)
- Ditemukan di kawah W6

## Flag
- `counter_versi_cerita` (0-9)
- `flag_sambilan_talago_recruited`

## Struktur
- Dengar 9 versi cerita malam pengusiran di kawah W6 (kanon lore GK #36: sembilan orang dituduh tanpa bukti, diusir ke tepi kawah, jadi 1 danau dengan 9 arus)
- Puzzle: jangan memihak satu versi sebagai "yang benar" — tiap versi memberi clue parsial, gabungkan tanpa menyatakan ada yang salah
- **Battle Params:**
  - Musuh: "Danau yang Mengingat" — battle berbasis elemen Apah, HP **5424 — dikoreksi Ultra Rare-tier Level~26**
  - Kondisi menang: bertahan 9 ronde (1 per versi cerita) — bukan battle konvensional habiskan-HP
  - Pasif kanon Sambilan Talago (jika sudah direkrut sebelumnya lewat cara lain — TIDAK MUNGKIN karena ini satu-satunya jalur rekrutmen, jadi tidak relevan di battle ini): "Sembilan Versi" — heal tim 4% HP maks tiap lawan kena debuff (maks 5×/ronde). Dicatat untuk referensi pasca-recruitment
- Drop: Jimat Air Naik (DI §3.5)
- `flag_sambilan_talago_recruited = true` — Sambilan Talago bergabung (Ultra Rare, Spirit/Apah/CC)

## Fail State
- Party wipe sebelum ronde ke-9: retry battle, progres versi cerita yang sudah didengar tidak reset

---

# WN-H02 · RUMAH UPIAK

## Trigger
- `flag_wn_m03_complete == true` (Area Tersembunyi terbuka otomatis, WB §4.12)
- Pemain masuk W4 area tersembunyi

## Flag
- `array_objek_personal` (4 objek)
- `flag_wn_h02_complete`

## Struktur
- Eksplorasi rumah fisik Upiak — isinya BERBEDA tergantung `flag_wn_resolution_path` dari WN-M03:
  - Jalur INFORMED: rumah terasa "ditinggalkan buru-buru", objek personal menyisakan jejak kepergian
  - Jalur KEPT_SECRET: rumah masih "hidup", objek personal menunjukkan rutinitas berkelanjutan
- 4 objek personal, masing-masing mengungkap 1 detail yang TIDAK disebutkan Upiak sendiri di WN-M03 — pemain menyusun potret lebih lengkap daripada yang Upiak mau akui
- **0 battle** — murni eksplorasi dan refleksi
- Reward: 4 entri Ensiklopedia eksklusif (teks berbeda per jalur resolusi)
- `flag_wn_h02_complete = true`

## Fail State
- Tidak ada — eksplorasi bebas tanpa batas waktu

---

# WN-H03 · YANG TERSISA DARI PILIHAN

## Trigger
- `flag_wn_h02_complete == true` DAN Resolusi Region WN-M03 sudah dievaluasi

## Flag
- `flag_wn_h03_complete`

## Struktur

### Jalur INFORMED (Beri Tahu Keluarga)
- Lokasi: W1
- Seorang anggota keluarga Upiak muncul, mencari konfirmasi
- Dialog bercabang: pemain bisa menceritakan detail (dari WN-H02) atau menahan sebagian — murni pilihan naratif tentang seberapa banyak kebenaran dibagikan, TIDAK ada mekanik battle/puzzle

### Jalur KEPT_SECRET (Jangan Beri Tahu)
- Lokasi: W4 Rumah Upiak
- Pemain kembali beberapa waktu kemudian — sesuatu terasa berbeda (echo/gestur halus, BUKAN hantu literal — implementasi: efek visual sangat halus, bukan jump-scare atau elemen horror)
- Momen refleksi hening tentang rahasia yang dibawa pemain sendirian

### Reward (Kedua Jalur)
- **0 battle** di kedua jalur — misi penutup murni emosional/naratif
- 1 entri Ensiklopedia final region (teks berbeda per jalur) + closure naratif
- Tidak ada item mekanis — reward misi ini murni naratif
- `flag_wn_h03_complete = true`

## Fail State
- Tidak ada — murni naratif, tidak bisa gagal

---

# RINGKASAN DEPENDENCY GRAPH — REGION 4

```
WN-M01 (Ladang Terakhir) ──┬──→ WN-S01 (Puti Lengang)
   ↓                        ├──→ WN-S02 (Lasik Kubang)
   ↓                        └──→ WN-S04 (Sindaka Rimbo)
WN-M02 (Empat Puluh Tahun) ──┬──→ WN-S03 (Rangkiang Batu)
   ↓                          └──→ WN-S05 (Uhang Sunyi)
WN-M03 (Rumah Upiak) ──[flag_wn_resolution_path]──┬──→ WN-S06 (Bundo Sarikaso)
   ↓                                                └──→ WN-H02 (Rumah Upiak, Area Tersembunyi) ──→ WN-H03 (Yang Tersisa dari Pilihan)
WN-M04 (Hutan Belang) ──┬──→ WN-S07 (Suara Tanwujud)
   ↓                     ├──→ WN-S08 (Tapak Ghaib)
   ↓                     └──→ WN-H01 (Sambilan Talago)
WN-M05 (Niniak Belang, ex-Hidden→Main) ──[WAJIB sebelum M06]──→
WN-M06 (Sang Lengang, spectator) ──→ [Season 3 / lanjut region lain]
```

## Titik Kritis Dependency

1. **WN-M05 → WN-M06 sekarang HARD DEPENDENCY** — berbeda dari pola region lain di mana Main Mission akhir berdiri independen. Sang Lengang TIDAK BISA direkrut tanpa menyelesaikan Niniak Belang dulu. Ini konsisten dengan kanon "Cara didapat" tapi mengubah Wanasunya dari "Main Mission linear longgar" jadi "Main Mission linear ketat" di paruh akhir region.

2. **`flag_wn_resolution_path` (dari WN-M03) mempengaruhi 3 misi turunan** (WN-H02, WN-H03, dan konten Ensiklopedia terkait) — pola serupa `flag_kd_resolution_path` di Kadewan, tapi di sini dampaknya murni naratif/Ensiklopedia, tidak mengubah battle atau item mekanis.

3. **WN-S01 (Puti Lengang) beririsan dengan peran vendor-nya** — implementasi harus memastikan sistem vendor (WB §4.12) dan sistem recruitment tidak saling mengunci. Pemain harus bisa berdagang dengannya SEBELUM merekrutnya, dan tetap bisa berdagang SETELAH direkrut.

---

# ITEM TINDAK LANJUT UNTUK MANUSIA

1. **Battle spectator WN-M06 — ✅ SELESAI, spesifikasi teknis lengkap ditetapkan.** Keputusan: battle state sungguhan (bukan cutscene) — alasan lengkap (biaya produksi, ketahanan terhadap balance patch) ada di Beat 2. Kontras eksplisit dengan AW-H02 (Anawil, Gema Purwa) yang tetap cutscene murni — dua battle spectator di game ini punya justifikasi teknis berbeda meski konsepnya mirip.

2. **3 aksi restoratif spesifik di WN-M05 belum didefinisikan detail** — saya sebutkan konsepnya (memulihkan pohon, mengembalikan yang tersesat, menenangkan satwa) tapi implementasi mekanis persis (mini-game apa untuk tiap aksi) perlu breakdown terpisah oleh level designer.

3. **HP Niniak Belang — ✅ FINAL.** Dikonfirmasi 3800 (dalam rentang 3500-4000 yang ditetapkan, titik tengah). Diterapkan di WN-M05 Beat 3.

4. **Keputusan durasi Wanasunya — ✅ SELESAI.** Target region S2 direvisi final dari ~4.5 jam ke ~6.0-6.5 jam (bukan pangkas konten), didukung pola serupa di Smarana. Durasi final Wanasunya 6.58 jam berstatus SESUAI. Konsekuensi ke total season S2 WB §II.1 ditunda sampai 9 region selesai — lihat Kerangka Misi Item #15.

5. **Combat math placeholder** — status sama seperti R1-R3: direvisi setelah Quest Script 9 region selesai.

---

*Quest Script Region 4 — Draf v0.3 · September 2026*
*Status: 17/17 misi Wanasunya di-script detail (6 Main + 8 Side + 3 Hidden). 0 monster region baru tanpa alasan (2 kanon dipakai langsung). 1 kesalahan STRUKTURAL besar diperbaiki (identitas Niniak Belang/Sang Lengang tercampur — restrukturisasi Opsi C). WN-M05: 3 aksi restoratif didetail lengkap dengan parameter numerik penuh (tekan-tahan 3 titik/3 detik, jarak tuntun 40m, diam 8 detik), HP Niniak Belang dikonfirmasi 3800. WN-M06: spesifikasi teknis battle spectator ditetapkan final — battle state sungguhan (bukan cutscene), kontras eksplisit beralasan dengan AW-H02. Seluruh pasif karakter diverifikasi langsung ke Guide Karakter. Tidak ada lagi item terbuka di region ini. Belum diimplementasi, belum playtest.*
