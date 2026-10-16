# QUEST SCRIPT — REGION 5: KALAMRTU
# PUSAKA: GEMA NAWANTARA

**Versi:** Draf v0.1 — Quest Script Detail
**Status:** 🟡 SIAP REVIEW TEKNIS — belum diimplementasi, belum playtest
**Rujukan kanon:**
- `World_Bible_Pusaka_Gema_Nawantara_v5.1.md` §BAB 5 (Kalamrtu)
- `GUIDE_KARAKTER_100_Nawantara_FINAL_v1.1.md` #38-47, #91-92
- `DOKUMEN_ITEM_Pusaka_Gema_Nawantara_FINAL_v1.md` §1.5, §2, §3.6, §3.10
- `KERANGKA_MISI_Pusaka_Gema_Nawantara.md` v1.0 (kerangka sumber — 18 misi Kalamrtu, sudah termasuk 3 gap-fill + 2 koreksi rantai)
**Tanggal:** September 2026

**Verifikasi pra-scripting (checklist established R1-R4):**
- **Monster:** WB §5.8 sudah punya "Penjaga Prasasti Bisu" (Umum) dan "Kutukan Berjalan" (Elite) — dipakai langsung.
- **Item/Titah:** Seluruh 12 karakter roster Kalamrtu (#38-47, #91-92) di-cross-check ke DI §3.6 SEBELUM menulis script. **3 gap ditemukan** (Sidhayatri #39, Kelasi Wira #40, Watu Sema #41 — tidak punya misi sama sekali) — diperbaiki di Kerangka Misi v1.0.
- **Pasif/Skill dikutip langsung dari GK, bukan dikarang.** **2 masalah tambahan ditemukan**: (1) Rahib Abu (#92) punya "Cara Didapat" kanon eksplisit di GK — rantai 5 tahap menelusuri jejak Rahib Kalpa (#44), BUKAN misi berdiri sendiri seperti draf awal. (2) Lidah Watu (#45) punya Titah kanon yang memakai premis SAMA PERSIS dengan KL-M03 (baca 3 prasasti perbatasan, temukan kutukan menghapus sejarah sendiri) — bukan investigasi terpisah. Keduanya diperbaiki di Kerangka Misi sebelum dokumen ini ditulis.
- **"Cara Didapat" Legendary (Sang Wiranata #47) diverifikasi TERLEBIH DAHULU** — pelajaran langsung dari kesalahan Sang Lengang di R4. Dikonfirmasi SUDAH selaras kanon di Kerangka Misi, tidak perlu direstrukturisasi.

---

## KONVENSI SCRIPT

Sama seperti Quest Script R1-R4. Angka HP non-kanon tetap `[PLACEHOLDER — akan direvisi]`. Pasif/skill yang dikutip dari GK ditandai `(kanon)`.

**Catatan khusus Region 5:** Kalamrtu adalah region S3 (bebas urutan dengan Himagiri). Mekanik signature Aksara Kutukan: debuff berbasis "kutukan dua arah" — beberapa efek yang menyerang lawan juga berpotensi mengenai party sendiri, tema yang berulang di banyak battle region ini (echo eksplisit di pasif Kijang Prasasti, Rahib Abu, dan mekanik KL-M04).

---

# KL-M01 · MUARA WIRA

## Trigger
- Season 3 terbuka (S1+S2 selesai penuh: `flag_kd_m06_complete`, `flag_sm_m06_complete`, `flag_wn_m06_complete` semua true) DAN pemain memilih Kalamrtu

## Flag
- `flag_kl_m01_complete`
- `flag_aksara_tutorial_seen`

## Struktur

### Beat 1 — Tiba di Muara Wira
- Cutscene: reruntuhan pelabuhan kerajaan yang namanya sendiri sudah hilang dari catatan — kontras dengan Season 1-2 yang masih py fungsional
- Juru Laklak (NPC guide) memperkenalkan konsep Aksara Kutukan

### Beat 2 — Tutorial Mini-Game Susun Aksara
- UI popup: sistem aksara orisinal (BUKAN reproduksi aksara nyata mana pun, sesuai catatan desain WB §5.6) — pemain belajar menyusun potongan aksara jadi kata yang bisa "menahan" kutukan sementara
- Tutorial: 1 prasasti sederhana, 3 potongan aksara, susun urutan benar (drag/pilih)

### Beat 3 — Battle Tutorial
- **Battle Params:**
  - Musuh: 3x Penjaga Prasasti Bisu (kanon Umum, WB §5.8) — HP **1522 (dikoreksi hasil audit Combat Math Global — Level~31, Kalamrtu region pertama S3)**
  - Kondisi menang: HP 0%

### Beat 4 — Reward
- Drop: Serpihan Prasasti (Common Jimat, DI §1.5)
- `flag_kl_m01_complete = true`

## Fail State
- Party wipe: auto-revive 30% HP (pola tutorial standar)

---

# KL-M02 · PULAU DUA NAMA

## Trigger
- `flag_kl_m01_complete == true`
- Pemain masuk K2

## Flag
- `flag_nama_pulau_identified`
- `flag_kl_m02_complete`

## Struktur

### Beat 1 — Dua Nama yang Kontradiktif
- Pulau di K2 punya 2 nama tercatat di sumber berbeda, saling bertentangan — pemain harus identifikasi mana yang asli lewat prasasti tersisa
- Puzzle: 4 prasasti tersebar, masing-masing menyebut 1 nama. Mayoritas (3/4) menyebut nama A, tapi prasasti TERTUA (butuh dianalisis dari gaya ukiran, bukan cuma dibaca) menyebut nama B — nama B yang benar (echo tema: "kutukan menghapus sejarah, termasuk konsensus yang salah")

### Beat 2 — Battle: Kutukan Berjalan
- **Battle Params:**
  - Musuh: Kutukan Berjalan (kanon Elite, WB §5.8 — "prasasti yang lepas dari batunya") — HP **3043 (dikoreksi hasil audit Combat Math Global — Level~31, formula ×1.5 dari Common)**
  - Kondisi menang: HP 0%

### Beat 3 — Reward
- Drop: Catatan Juru Laklak (Uncommon Kitab, DI §1.5)
- `flag_kl_m02_complete = true`

## Fail State
- Salah identifikasi nama: tidak fail, hanya dialog Juru Laklak mengoreksi, pemain bisa coba lagi

---

# KL-M03 · AKSARA YANG BERBICARA

**Catatan implementasi khusus:** Misi ini adalah SUMBER investigasi yang dilanjutkan oleh KL-S03 (Lidah Watu) — pastikan 3 prasasti perbatasan yang dibaca di sini adalah PRASASTI YANG SAMA yang direferensikan di KL-S03, bukan set prasasti berbeda.

## Trigger
- `flag_kl_m02_complete == true`
- Pemain masuk K3-K5

## Flag
- `counter_prasasti_perbatasan_read` (0-3) — **dipakai lintas KL-M03 dan KL-S03**
- `flag_kl_m03_complete`

## Struktur

### Beat 1 — 3 Encounter Bertingkat
- 3 prasasti perbatasan tersebar K3-K5, tiap prasasti dijaga 1 encounter
- **Battle Params (×3, bertingkat):**
  - Battle 1: HP **2061 — dikoreksi Common-tier Level~32**
  - Battle 2: HP **3033 — dikoreksi Uncommon-tier Level~32**
  - Battle 3: HP **4045 — dikoreksi Rare-tier Level~32**
  - Kondisi menang tiap battle: HP 0%

### Beat 2 — Membaca Prasasti
- Tiap prasasti terbaca (mini-game susun aksara, lebih kompleks dari tutorial KL-M01) → `counter_prasasti_perbatasan_read` naik
- 3/3 terbaca: pemain menemukan bahwa kutukan yang mereka baca JUGA menghapus sejarah kerajaan mereka sendiri — bukan hanya melindungi dari luar, tapi menghapus dari dalam (twist naratif inti region)

### Beat 3 — Reward
- Drop: Batu Penahan Kutuk (Rare Jimat, DI §1.5)
- `flag_kl_m03_complete = true`
- **Catatan:** `counter_prasasti_perbatasan_read == 3` menjadi PRASYARAT untuk KL-S03 (Lidah Watu) — lihat bagian Side Mission

## Fail State
- Party wipe di battle manapun: retry battle individual, prasasti yang sudah terbaca tidak reset

---

# KL-M04 · SISI KELAM KERAJAAN

**Catatan implementasi khusus:** Misi penentu Resolusi Region (WB §5.10) — pola pilihan moral serupa KD-M04 (Kadewan) dan WN-M03 (Wanasunya), tapi di sini pilihannya "ungkap atau tidak" alih-alih "beri tahu atau tidak".

## Trigger
- `flag_kl_m03_complete == true`
- Pemain masuk K5-K6

## Flag
- `counter_bukti_kekejaman` (0-4)
- `flag_kl_resolution_path` (enum: REVEALED / CONCEALED)

## Struktur

### Beat 1 — Investigasi Bukti Kekejaman
- 4 bukti tersebar K5-K6 menunjukkan kekejaman historis kerajaan (perbudakan, penindasan, dll. — detail spesifik di luar cakupan generic script, perlu breakdown naratif terpisah oleh tim writing)
- Pemain BISA menyelesaikan misi tanpa mengumpulkan semua 4 bukti, tapi pilihan Beat 2 lebih bermakna jika bukti lengkap

### Beat 2 — Pilihan Moral
- **Dialog Branch:**
  - `[Ungkap kekejaman ini]` → `flag_kl_resolution_path = REVEALED`. Konsekuensi: memulihkan kejayaan kerajaan berarti juga membangkitkan kembali ingatan kekejamannya — echo langsung ke premis KL-M06
  - `[Biarkan terkubur]` → `flag_kl_resolution_path = CONCEALED`. Kerajaan tetap terhapus dari catatan, tapi kekejamannya juga tidak pernah diketahui siapa pun

### Beat 3 — Battle: Kutukan Dua Arah
- **Battle Params:**
  - Musuh: manifestasi kutukan — `[PLACEHOLDER]` HP 1700
  - **Mekanik signature aktif eksplisit:** debuff yang diterapkan musuh ke party memiliki 20% peluang JUGA mengenai musuh itu sendiri (mirror langsung dari mekanik region), dan sebaliknya — skill AoE party punya peluang serupa mengenai 1 anggota party sendiri. Ini battle PALING eksplisit menunjukkan tema "Kutukan Dua Arah" dari seluruh region
  - Kondisi menang: HP 0%

### Beat 4 — Reward
- Resolusi Region ditentukan
- `flag_kl_m04_complete = true`

## Fail State
- Party wipe: retry battle, pilihan resolusi tidak reset

---

# KL-M05 · PELABUHAN PRALAYA

## Trigger
- `flag_kl_m04_complete == true`
- Pemain masuk K6

## Flag
- `counter_prasasti_dinonaktifkan` (0-2)
- `flag_kl_m05_complete`

## Struktur

### Beat 1 — Nonaktifkan Prasasti Kutukan Terakhir
- Mini-game aksara PALING SULIT di region (puncak kurva kesulitan puzzle Kalamrtu) — 2 prasasti kutukan terakhir, masing-masing butuh menyusun kalimat lengkap dari potongan aksara yang tersebar dan sebagian rusak (beberapa potongan harus disimpulkan dari konteks, bukan langsung terlihat)

### Beat 2 — Battle: 2 Elite dengan Prasasti Aktif
- **Battle Params:**
  - Musuh: 2x Elite (echo Kutukan Berjalan, versi lebih kuat) — HP **3043 — dikoreksi Elite ×1.5 Level~32** masing-masing
  - **Mekanik:** selama prasasti BELUM dinonaktifkan (`counter_prasasti_dinonaktifkan < 2`), kedua Elite mendapat +1 debuff tambahan yang bisa diterapkan ke party tiap ronde. Setiap prasasti dinonaktifkan (bisa dilakukan mid-battle sebagai aksi alih-alih menyerang) mengurangi 1 sumber debuff tambahan
  - Kondisi menang: HP 0% KEDUA musuh DAN `counter_prasasti_dinonaktifkan == 2`

### Beat 3 — Reward
- Drop: Kitab Aksara yang Hilang (Super Rare Kitab, DI §1.5)
- `flag_kl_m05_complete = true`, akses K7 terbuka

## Fail State
- Party wipe: retry battle, prasasti yang sudah dinonaktifkan sebelum wipe TETAP nonaktif (tidak reset — battle ini panjang dan sulit, mencegah frustrasi berlebihan)

---

# KL-M06 · DIHAPUS DEMI SELAMAT (TITAH SANG WIRANATA)

**Catatan implementasi khusus:** Struktur SUDAH selaras kanon DI §3.10 sejak Kerangka Misi awal (diverifikasi ulang sebelum scripting — TIDAK ada kesalahan identitas seperti Sang Lengang). 3 langkah kanon: (1) pulihkan Aksara yang Hilang, (2) hadapi pilihan moral, (3) pilih menyaksikan bukan mengalahkan.

## Trigger
- `flag_kl_m05_complete == true`
- Pemain masuk K7

## Flag
- `flag_sang_wiranata_recruited`
- `flag_aksara_yang_tersisa_obtained` (Item Spesial, DI §2)
- `flag_kl_m06_complete`

## Struktur

### Beat 1 — Pulihkan Aksara yang Hilang
- Langkah 1 kanon: ini merujuk ke rantai Titah Kalamrtu reguler yang sudah diselesaikan sepanjang KL-M01-M05 — trigger otomatis terpenuhi begitu pemain sampai di sini (tidak perlu aksi tambahan, murni gate naratif)

### Beat 2 — Battle Konvensional (Fase 1-2) — DIPERBARUI: HP dikonfirmasi, pasukan pendamping ditambahkan
- **Battle Params:**
  - Musuh: Sang Wiranata (GK #47, Legendary Human/Pertiwi/Tank kanon) — **HP 5400 (dikonfirmasi final, bukan lagi placeholder)**
  - Pasif kanon "Beban Kerajaan": semakin rendah HP-nya, semakin tinggi DEF dirinya DAN DEF seluruh timnya jika ia punya sekutu (+1% DEF tim per 2% HP yang hilang). Tidak bisa dipaksa berpindah, kebal Terhempas & Terkunci
  - **Pasukan pendamping tematik (BARU — mengisi kebutuhan Spesial "Menahan Kedaton"):** 2x Penjaga Prasasti Bisu (kanon Umum, WB §5.8, di-scale ke level akhir region — **HP 3043 — dikoreksi hasil audit Combat Math Global, Elite ×1.5 dari Common Level~32**, naik dari versi tutorial) berperan sebagai **penjaga setia terakhir kerajaan** yang masih bertugas meski kerajaannya sudah terhapus dari catatan — echo tematik langsung dengan premis "Kerajaan yang Hilang dari Catatan". Ini memberi Spesial "Menahan Kedaton" (ambil alih 60% damage ke sekutu 3 ronde) fungsi nyata: Sang Wiranata melindungi kedua penjaga ini, bukan pasif dorman
  - Fase 1-2: battle konvensional sampai HP Sang Wiranata turun ke ~30-35% ATAU kedua Penjaga Prasasti Bisu tumbang (mana yang lebih dulu tercapai)

### Beat 3 — Pilihan Moral & Fase Akhir — DIPERBARUI: konsekuensi mekanis `flag_kl_resolution_path` dikonfirmasi
- Trigger: HP Sang Wiranata rendah (~30%)
- Dialog mid-battle: hadapkan pemain pada pilihan "memulihkan kejayaan kerajaan juga membangkitkan kekejamannya" — echo `flag_kl_resolution_path` dari KL-M04
- **Konsekuensi mekanis dikonfirmasi (sebelumnya hanya echo naratif tanpa efek — sekarang berikut ini FINAL):**
  - **Jika `flag_kl_resolution_path == REVEALED`:** 1 add musuh tambahan muncul di awal Fase 1-2 — "Manifestasi Kekejaman" (echo visual dari kekejaman yang sudah terungkap, `[PLACEHOLDER]` HP 900, menyerang party maupun kadang menyerang Sang Wiranata sendiri secara acak — echo tema Kutukan Dua Arah region). Battle Fase 1-2 lebih sulit (3 target alih-alih 1+pasukan). **Reward tambahan:** 1 entri Ensiklopedia eksklusif menjelaskan kekejaman yang terungkap
  - **Jika `flag_kl_resolution_path == CONCEALED`:** tidak ada add tambahan, TAPI pasif "Beban Kerajaan" Sang Wiranata mendapat **+50% efektivitas** (+1.5% DEF tim per 2% HP hilang, alih-alih +1%) — beban yang tidak pernah diungkap ke siapa pun jadi lebih berat ia tanggung SENDIRIAN, membuatnya secara mekanis lebih tangguh/sulit di-burst-down meski tanpa musuh tambahan
  - Kedua jalur SAMA-SAMA mengarah ke Fase Akhir (Beat berikut) — resolution_path hanya mempengaruhi Fase 1-2, tidak mengunci/membuka opsi "Jadi Saksi"
- **Fase akhir (kanon langkah 3):** pemain memilih MENYAKSIKAN titah penutupnya, BUKAN mengalahkannya dengan damage sampai 0%. Implementasi: UI menampilkan opsi "Serang untuk mengakhiri" vs "Biarkan ia menyelesaikan sendiri" — memilih opsi kedua memicu Pamungkas kanon Sang Wiranata sendiri ("Dihapus Demi Selamat" — tim jadi tidak bisa ditarget + kebal 1 ronde, Sang Wiranata kehilangan 30% HP saat ini), lalu battle berakhir dengan Sang Wiranata "tenggelam" sesuai pilihannya sendiri. **Ini SATU-SATUNYA jalur recruitment (tidak ada jalur alternatif "kalahkan konvensional" seperti Wisesa Girinatha) — Sang Wiranata tidak pernah punya syarat seketat "0 Kelancangan sepanjang region", jadi tidak butuh pelonggaran Opsi-D-style**
- **Berbeda dari Sang Lengang:** di sini ADA battle partisipatif sebelum momen penyaksian (fase 1-2 nyata, sekarang dengan pasukan pendamping), bukan spectator murni sejak awal — konsisten dengan kanon yang tidak menyatakan "tidak bertarung" untuk Sang Wiranata, hanya "menyaksikan titah penutupnya" di momen akhir

### Beat 4 — Recruitment & Reward
- `flag_sang_wiranata_recruited = true`
- Drop: Mahkota Sang Wiranata (Ultra Rare Pusaka, DI §1.5)
- **Cek Item Spesial:** Aksara yang Tersisa (DI §2, "dari rantai misi menonaktifkan seluruh prasasti kutukan") — cek `counter_prasasti_dinonaktifkan` dari KL-M05 dan progres prasasti lain lintas region terpenuhi. Jika ya: `flag_aksara_yang_tersisa_obtained = true`
- **Reward tambahan jalur REVEALED:** 1 entri Ensiklopedia eksklusif (dari Beat 3)
- `flag_kl_m06_complete = true`

## Fail State
- Party wipe di fase 1-2: retry dari awal battle
- Fase akhir: tidak ada wipe condition (Sang Wiranata tidak menyerang mematikan di momen ini, sesuai nada "menyaksikan")

---

# KL-S01 · KEBIASAAN, BUKAN NIAT (TITAH ANTUMUARA)

## Trigger
- `flag_kl_m01_complete == true`
- Ditemukan K1-K2

## Flag
- `flag_antumuara_recruited`

## Struktur
- Puzzle observasi kebiasaan NPC — Antumuara (#38) mengulang pola tanpa sadar (echo lore: "kebiasaan, bukan niat")
- Battle: encounter berbasis Apah, HP **2061 — dikoreksi Common-tier Level~32**. Pasif kanon Antumuara ("Melawan Arus": +20% RES, tapi -10% ACC jika ia unit tercepat) relevan jika ia jadi ally dipinjam sementara — TIDAK diimplementasi sebagai ally battle di sini (ia musuh dalam battle recruitment, bukan dipinjam), dicatat untuk referensi pasca-recruitment
- Drop: Kitab Kebiasaan, Bukan Niat (DI §3.6)
- `flag_antumuara_recruited = true` — Antumuara bergabung (Common, Ghost/Apah/CC)

## Fail State
- Party wipe: retry battle

---

# KL-S02 · DELAPAN RATUS TAHUN (TITAH NAGA WIRA)

## Trigger
- `flag_kl_m03_complete == true`
- Ditemukan K4-K5

## Flag
- `array_kronologi_fragmen` (susun kronologi 800 tahun)
- `flag_naga_wira_recruited`

## Struktur
- Puzzle kronologi: susun fragmen sejarah 800 tahun (echo skala besar tema "sejarah yang terhapus" region ini)
- Battle: melawan sisa imperium, HP **4045 — dikoreksi Rare-tier Level~32**. Pasif kanon Naga Wira ("Tidak Akan Melepaskan": semakin rendah HP, semakin tinggi DEF, +1% per 1% HP hilang) — relevan sebagai musuh, battle jadi lebih sulit di HP rendah, party harus burst damage bukan chip damage
- Drop: Pusaka Delapan Ratus Tahun (DI §3.6)
- `flag_naga_wira_recruited = true` — Naga Wira bergabung (Rare, Beast/Pertiwi/Tank)

## Fail State
- Party wipe: retry battle, kronologi yang sudah disusun tidak reset

---

# KL-S03 · JURU KUTUK NEGARA (TITAH LIDAH WATU)

**Catatan implementasi khusus — DIKOREKSI:** Ini BUKAN investigasi terpisah dari KL-M03. Prasyarat wajib: `counter_prasasti_perbatasan_read == 3` dari KL-M03.

## Trigger
- `flag_kl_m03_complete == true` DAN `counter_prasasti_perbatasan_read == 3` (prasyarat eksplisit — TIDAK bisa diakses sebelum KL-M03 selesai penuh)
- Ditemukan K4-K6

## Flag
- `flag_lidah_watu_recruited`

## Struktur
- **Tidak ada investigasi prasasti baru** — misi ini melanjutkan LANGSUNG dari 3 prasasti yang sudah dibaca pemain di KL-M03. Lidah Watu muncul di lokasi prasasti terakhir yang dibaca, menunggu.
- Konfrontasi dialog: Lidah Watu mengakui bahwa tugasnya (mengutuk negara sendiri demi melindunginya) "terlalu baik dilakukan" — inilah alasan sejarah kerajaan terhapus
- Battle: 1 battle konfrontasi, **HP 4985 — dikoreksi hasil audit Combat Math Global (temuan asli yang memulai audit ini: sebelumnya 1000, jauh di bawah Super Rare-tier Level~32 Kalamrtu yang seharusnya)**. Pasif kanon Lidah Watu ("Bekerja pada Semua Orang": debuff yang ia terapkan +1 ronde durasi, TERMASUK ke timnya sendiri) — sebagai musuh, ini berarti debuff yang party terima darinya bertahan lebih lama, tapi tidak relevan untuk timnya sendiri (ia solo di battle ini)
- Drop: Kitab Juru Kutuk Negara (DI §3.6)
- `flag_lidah_watu_recruited = true` — Lidah Watu bergabung (Super Rare, Ghost/Akasa/CC)

## Fail State
- Party wipe: retry battle
- Jika pemain mencoba akses sebelum `counter_prasasti_perbatasan_read == 3`: lokasi menunjukkan Lidah Watu belum "siap ditemukan" — soft-block, bukan fail

---

# KL-S04 · YANG TIDAK PERNAH BERHENTI MELOMPAT (TITAH SEKAR KEMARUNG)

## Trigger
- `flag_kl_m03_complete == true`
- Ditemukan K5

## Flag
- `counter_lompatan_observed` (0-3)
- `flag_sekar_kemarung_recruited`

## Struktur
- **0 battle** — murni observasi
- Temukan sungai tempat Sekar Kemarung melompat mengejar peti buangan
- Saksikan siklus "melompat menyelamatkan" 3x lewat mini-game observasi (timing-based, perhatikan pola sebelum lompatan ke-4)
- Ikut melompat bersamanya di lompatan keempat — echo tema "tindakan menyelamatkan yang tak pernah berhenti"
- Drop: Kitab Yang Tidak Pernah Berhenti Melompat (DI §3.6)
- `flag_sekar_kemarung_recruited = true` — Sekar Kemarung bergabung (Ultra Rare, Human/Apah/Support)

## Fail State
- Tidak ada — observasi bisa diulang tanpa batas sampai timing tepat

---

# KL-S05 · YANG TAK BISA DITAHAN LAGI (TITAH RAHIB ABU)

**Catatan implementasi khusus — DIKOREKSI TOTAL:** Kanon GK #92 eksplisit menyatakan ini rantai 5 tahap yang menelusuri jejak Rahib Kalpa (#44), BUKAN misi berdiri sendiri. **Prasyarat wajib: KL-H04 (Rahib Kalpa) harus selesai lebih dulu.**

## Trigger
- `flag_kl_h04_complete == true` (Rahib Kalpa sudah direkrut/diselesaikan — lihat bagian Hidden Mission)
- Ditemukan K6-K7

## Flag
- `counter_prasasti_rahib_kalpa` (0-4) — 4 prasasti sisa peninggalannya
- `flag_rahib_abu_seal_choice` (enum: RESEALED / FREED — hanya mengubah dialog, TIDAK mengubah recruitment)
- `flag_rahib_abu_recruited`

## Struktur

### Beat 1-4 — Telusuri 4 Prasasti Peninggalan Rahib Kalpa
- 4 tahap terpisah, tiap tahap 1 prasasti tersebar K6-K7, masing-masing mengungkap sedikit tentang bagaimana Rahib Kalpa "menghilang" dan apa yang ia tinggalkan
- Setiap prasasti: puzzle aksara ringan + 1 encounter kecil menjaga lokasi (`[PLACEHOLDER]` HP 700-900, meningkat tiap tahap)

### Beat 5 — Menemukan Rahib Abu & Pilihan Segel
- Trigger: 4/4 prasasti selesai
- Rahib Abu (#92) ditemukan di tahap akhir — kanon lore: "dulu penjaga, kini kutukan"
- **Dialog Branch (flavor-only, TIDAK mengubah hasil recruitment):**
  - `[Segel kembali]` → `flag_rahib_abu_seal_choice = RESEALED`. Dialog pembuka battle: nada penyesalan/kewajiban
  - `[Biarkan bebas]` → `flag_rahib_abu_seal_choice = FREED`. Dialog pembuka battle: nada penerimaan/pembebasan
- **PENTING implementasi:** kedua pilihan mengarah ke battle YANG SAMA dan hasil recruitment YANG SAMA — hanya 1 baris dialog pembuka yang berbeda. Sistem tidak boleh membuat 2 jalur battle terpisah untuk ini (pemborosan development effort untuk perbedaan yang sangat kecil)

### Beat 6 — Battle Final
- **Battle Params:**
  - Musuh: Rahib Abu — HP **5980 — dikoreksi hasil audit Combat Math Global, Ultra Rare-tier di-skala ke Level~32 Kalamrtu**
  - Pasif kanon "Dulu Penjaga, Kini Kutukan": setiap kali ia menerima damage dari SEKUTU SENDIRI (dari skill-nya sendiri yang salah sasaran — relevan pasca-recruitment, tidak aktif sebagai musuh solo di sini), ia +10% ATK permanen. Sebagai musuh solo tanpa sekutu, pasif ini TIDAK terpicu — dicatat untuk referensi pasca-recruitment
  - Spesial kanon "Kutukan yang Lolos": AoE 120% ke seluruh lawan (yaitu PARTY, karena ia musuh) — sebagai musuh, tidak ada mekanik "mengenai sekutu sendiri" karena ia tidak punya sekutu di battle ini
  - Kondisi menang: HP 0%

### Beat 7 — Recruitment & Reward
- `flag_rahib_abu_recruited = true` — Rahib Abu bergabung (Ultra Rare, Human/Bayu/Attacker)
- Drop: Senjata Yang Tak Bisa Ditahan Lagi (DI §3.6)

## Fail State
- Party wipe di tahap manapun (1-4 atau battle final): retry tahap/battle spesifik, prasasti yang sudah selesai tidak reset

---

# KL-S06 · SATU BARIS YANG KABUR (TITAH SIDHAYATRI)

*(BARU — gap-fill, karakter sebelumnya tidak punya misi sama sekali)*

## Trigger
- `flag_kl_m01_complete == true`
- Ditemukan K1-K3

## Flag
- `array_kalimat_fragmen` (3 fragmen dari 3 prasasti berbeda)
- `flag_sidhayatri_recruited`

## Struktur
- Sidhayatri (#39) — satu baris kalimat yang kabur dari batunya sebelum kutukan dijatuhkan, tidak bisa membaca dirinya sendiri, mencari 900 tahun
- Puzzle: kumpulkan 3 fragmen kalimat dari 3 prasasti berbeda K1-K3, susun jadi 1 kalimat utuh (mini-game susun aksara, echo mekanik region tapi dengan tujuan personal/karakter, bukan investigasi kerajaan)
- **Karakteristik unik untuk battle:** Sidhayatri "berubah susunan saat ditatap terlalu lama" (kanon) — jika pemain menunda battle terlalu lama (observasi berlebihan), posisinya di battle acak berubah tiap giliran (implementasi flavor, dampak mekanik minor)
- Battle: encounter ringan berbasis Akasa, HP **2061 — dikoreksi Common-tier Level~32**
- Drop: Kitab Satu Baris yang Kabur (DI §3.6)
- `flag_sidhayatri_recruited = true` — Sidhayatri bergabung (Common, Spirit/Akasa/Support)

## Fail State
- Party wipe: retry battle, fragmen tidak reset

---

# KL-S07 · PERJALANAN YANG BELUM SELESAI (TITAH KELASI WIRA)

*(BARU — gap-fill)*

## Trigger
- `flag_kl_m01_complete == true`
- Ditemukan K1-K2 (echo lokasi KL-M01 — pelabuhan)

## Flag
- `counter_daftar_diperiksa` (0-3: berangkat/kembali/hilang)
- `flag_kelasi_wira_recruited`

## Struktur
- Kelasi Wira (#40) — namanya ada di celah antara 3 daftar (berangkat/kembali/hilang), masih "mendayung" karena berhenti berarti mengakui perjalanannya selesai
- Puzzle investigasi: periksa 3 daftar awak kapal di reruntuhan pelabuhan K1-K2, temukan bahwa namanya TIDAK ADA di ketiganya — ia ada di celah, bukan di salah satu kategori
- Battle: standar Bayu, HP **2061 — dikoreksi Common-tier Level~32**. Pasif kanon "Tidak Ada di Daftar" relevan (Spesial: damage 170%, ×1.5 jika belum kena damage sama sekali di battle ini) — sebagai musuh, jika party tidak berhasil damage dia di ronde awal, ia jadi lebih berbahaya di ronde berikutnya (insentif taktis untuk alpha strike)
- Drop: Senjata Perjalanan yang Belum Selesai (DI §3.6)
- `flag_kelasi_wira_recruited = true` — Kelasi Wira bergabung (Common, Human/Bayu/Attacker)

## Fail State
- Party wipe: retry battle, progres daftar tidak reset

---

# KL-S08 · PERNAH ADA YANG MEMULAI (TITAH WATU SEMA)

*(BARU — gap-fill)*

## Trigger
- `flag_kl_m02_complete == true`
- Ditemukan K2-K3

## Flag
- `counter_persembahan_dibawa` (0-3)
- `flag_watu_sema_recruited`

## Struktur
- Watu Sema (#41) — batu berukir leluhur pendiri, nama di dadanya sudah aus, tidak ingat namanya sendiri, hanya ingat kewajiban menjaga tempat ini "pernah berarti bagi seseorang"
- Puzzle: bawa 3 persembahan simbolis dari 3 zona berbeda (K1, K2, K3 — 1 dari masing-masing) ke batu berukirnya, membuktikan tempat ini MASIH berarti bagi seseorang (pemain)
- Battle: tank/defensif, HP **3033 — dikoreksi Uncommon-tier Level~32**. Pasif kanon "Nama yang Aus" (+60% DEF diri 3 ronde + kebal 1 debuff; tiap debuff ditahan beri tim +5% DEF) — sebagai musuh, battle ini butuh kesabaran, bukan burst damage
- Drop: Pusaka Pernah Ada yang Memulai (DI §3.6)
- `flag_watu_sema_recruited = true` — Watu Sema bergabung (Uncommon, Spirit/Pertiwi/Tank)

## Fail State
- Party wipe: retry battle, persembahan yang sudah dibawa tidak reset

---

# KL-H01 · PRASASTI KETUJUH

## Trigger
- `flag_kl_m03_complete == true` (Area Tersembunyi K5, WB §5.12)

## Flag
- `flag_kl_h01_complete`

## Struktur
- Prasasti ketujuh yang bertentangan dengan 6 lainnya (6 prasasti dari KL-M01-M03 gabungan) — puzzle rekonsiliasi: pemain harus menjelaskan KENAPA prasasti ini berbeda (bukan memilih salah satu sebagai "benar", tapi memahami konteks yang membuat keduanya valid — echo pola KD-H01 Sanggar Luh Sari)
- Battle: 1 encounter opsional, `[PLACEHOLDER]` HP 1100, tidak wajib untuk reward utama
- Reward: 2 entri Ensiklopedia eksklusif

## Fail State
- Tidak ada — eksplorasi bebas

---

# KL-H02 · ANGIN YANG TAK MEMBEDAKAN (TITAH KIJANG PRASASTI)

## Trigger
- `flag_kl_m03_complete == true`
- Ditemukan K4-K6

## Flag
- `flag_serbuk_aksara_tracked`
- `flag_kijang_prasasti_recruited`

## Struktur
- Puzzle pelacakan: ikuti serbuk aksara yang tertiup angin dari prasasti yang hancur, menuju sumbernya
- Battle: HP **4045 — dikoreksi Rare-tier Level~32**. Pasif kanon Kijang Prasasti ("Membawa Tanpa Memilih": setiap kali menerapkan debuff ke lawan, 15% peluang debuff sama juga menempel padanya) — echo eksplisit tema Kutukan Dua Arah region, sebagai musuh ini berarti pemain bisa MENGAMATI musuh kadang mendebuff dirinya sendiri secara acak
- Drop: Senjata Angin yang Tak Membedakan (DI §3.6)
- `flag_kijang_prasasti_recruited = true` — Kijang Prasasti bergabung (Rare, Beast/Bayu/Attacker)

## Fail State
- Party wipe: retry battle, pelacakan tidak reset

---

# KL-H03 · VERSI YANG DIKUBUR (TITAH DAYANG RINDANG)

## Trigger
- `flag_kl_m02_complete == true`
- Ditemukan K3-K4

## Flag
- `array_lapisan_gali` (5 lapisan — echo pola SM-S05 Watu Gambut, Smarana)
- `flag_dayang_rindang_recruited`

## Struktur
- Puzzle arkeologi: gali "versi terkubur" sejarah TANPA merusak (echo peringatan desain WB §4.7 soal situs cagar budaya — di sini diterapkan sebagai mekanik: gali terlalu cepat/paksa = artefak rusak, harus gali pelan dengan timing tepat)
- Battle: 1 encounter "versi terkubur", HP **3033 — dikoreksi Uncommon-tier Level~32**. Pasif kanon Dayang Rindang ("Yang Menunggu": tiap ronde TIDAK menyerang, +25% ACC & +15% efek CC ronde berikutnya, tumpuk 2) — sebagai musuh, ia lebih berbahaya jika party membiarkan battle berlarut tanpa memaksanya bertindak
- Drop: Kitab Versi yang Dikubur (DI §3.6)
- `flag_dayang_rindang_recruited = true` — Dayang Rindang bergabung (Uncommon, Ghost/Teja/CC)

## Fail State
- Gali terlalu cepat: artefak rusak, TIDAK fail permanen — hanya kehilangan 1 clue kecil, puzzle tetap bisa diselesaikan dengan clue tersisa
- Party wipe: retry battle

---

# KL-H04 · MEMBUKTIKAN ILMUNYA (TITAH RAHIB KALPA)

**Catatan implementasi khusus:** Misi ini sekarang PRASYARAT WAJIB untuk KL-S05 (Rahib Abu) — lihat bagian Side Mission.

## Trigger
- `flag_kl_m04_complete == true`
- Ditemukan K5-K6

## Flag
- `flag_kl_h04_complete` — **dipakai sebagai prasyarat KL-S05**
- `flag_rahib_kalpa_recruited`

## Struktur
- Rahib Kalpa (#44) ingin "membuktikan ilmunya" — pemain HARUS membiarkan ia bertarung sendirian, tidak boleh membantu (puzzle: jika party menyerang musuh yang sama, Rahib Kalpa protes dan damage-nya berkurang sementara — insentif untuk pasif membiarkan)
- **Battle Params:**
  - Musuh: yang diuji Rahib Kalpa (echo Kutukan Berjalan versi kuat) — HP **4045 — dikoreksi Rare-tier Level~32**
  - Rahib Kalpa (ally dipinjam sementara) memakai kit kanon: Spesial "Yang Dihapus" (damage 180% + hilangkan 1 skill acak musuh 2 ronde), Pamungkas "Membuktikan Ilmunya" (damage tunggal 300%, tapi ia kehilangan 25% HP maks permanen SISA BATTLE — battle jadi taruhan besar di akhir)
  - Pasif kanon "Tidak Ada yang Bisa Ditanya": setiap lawan tumbang, tim +1 Prana DAN Rahib Kalpa +15% ATK permanen — relevan jika battle punya multiple target/gelombang
  - Kondisi menang: HP musuh 0%, TANPA party memberikan damage langsung (party hanya boleh heal/buff Rahib Kalpa, tidak menyerang)

### Reward
- Drop: Senjata Membuktikan Ilmunya (DI §3.6)
- `flag_rahib_kalpa_recruited = true` — Rahib Kalpa bergabung (Rare, Human/Teja/Attacker)
- `flag_kl_h04_complete = true` — **membuka akses KL-S05 (Rahib Abu)**

## Fail State
- Party menyerang musuh yang sama dengan Rahib Kalpa: tidak fail, hanya damage Rahib Kalpa berkurang sementara (insentif negatif, bukan blocking)
- Party wipe: retry battle

---

# RINGKASAN DEPENDENCY GRAPH — REGION 5

```
KL-M01 (Muara Wira) ──┬──→ KL-S01 (Antumuara)
   ↓                   ├──→ KL-S06 (Sidhayatri, BARU)
   ↓                   └──→ KL-S07 (Kelasi Wira, BARU)
KL-M02 (Pulau Dua Nama) ──┬──→ KL-H03 (Dayang Rindang)
   ↓                       └──→ KL-S08 (Watu Sema, BARU)
KL-M03 (Aksara yang Berbicara) ──[counter_prasasti_perbatasan_read]──┬──→ KL-S02 (Naga Wira)
   ↓                                                                  ├──→ KL-S03 (Lidah Watu) — WAJIB lanjutan KL-M03, bukan independen
   ↓                                                                  ├──→ KL-S04 (Sekar Kemarung)
   ↓                                                                  ├──→ KL-H01 (Prasasti Ketujuh)
   ↓                                                                  └──→ KL-H02 (Kijang Prasasti)
KL-M04 (Sisi Kelam Kerajaan) ──[flag_kl_resolution_path]──→ KL-H04 (Rahib Kalpa) ──[WAJIB]──→ KL-S05 (Rahib Abu)
   ↓
KL-M05 (Pelabuhan Pralaya)
   ↓
KL-M06 (Sang Wiranata) ──[echo flag_kl_resolution_path dari KL-M04]
```

## Titik Kritis Dependency

1. **KL-S03 (Lidah Watu) TIDAK BISA diakses sebelum KL-M03 selesai penuh** — berbeda dari kebanyakan Side Mission lain yang independen. Prasyarat `counter_prasasti_perbatasan_read == 3` eksplisit dicek.

2. **KL-H04 → KL-S05 adalah HARD DEPENDENCY baru** — Rahib Abu benar-benar tidak bisa direkrut tanpa menyelesaikan Rahib Kalpa dulu, mengikuti kanon "Cara Didapat" secara ketat. Ini pola serupa WN-M05→WN-M06 (Niniak Belang→Sang Lengang), tapi di sini levelnya Side/Hidden Mission, bukan Main Mission.

3. **`flag_kl_resolution_path` (dari KL-M04) di-echo di KL-M06** tapi TIDAK mengubah struktur battle KL-M06 secara mekanis (berbeda dari `flag_kd_resolution_path` yang mengubah battle Sang Werdi) — di sini pengaruhnya murni pada framing dialog. Perlu dipastikan ini disengaja, bukan terlewat — echo naratif tanpa konsekuensi mekanis adalah pilihan valid, tapi sebaiknya dikonfirmasi.

---

# ITEM TINDAK LANJUT — STATUS SETELAH KEPUTUSAN

1. **HP Sang Wiranata — ✅ FINAL.** Dikonfirmasi 5400 (bukan lagi placeholder). Diterapkan di KL-M06 Beat 2.

2. **`flag_kl_resolution_path` konsekuensi mekanis — ✅ FINAL, dikonfirmasi.** REVEALED: +1 add "Manifestasi Kekejaman" (battle lebih sulit) + 1 entri Ensiklopedia eksklusif. CONCEALED: pasif "Beban Kerajaan" +50% efektivitas (Sang Wiranata lebih tangguh menanggung beban sendirian). Diterapkan di KL-M06 Beat 3.

3. **Pasukan pendamping tematik — ✅ FINAL, ditambahkan.** 2x Penjaga Prasasti Bisu (kanon, di-scale ke level akhir) sebagai "penjaga setia terakhir kerajaan" — memberi Spesial "Menahan Kedaton" fungsi nyata alih-alih dorman. Diterapkan di KL-M06 Beat 2.

4. **Combat math placeholder** — status sama seperti R1-R4: direvisi setelah Quest Script 9 region selesai. (HP Penjaga Prasasti Bisu versi scaled di KL-M06 tetap placeholder 1800, beda dari HP Sang Wiranata sendiri yang sudah dikonfirmasi final.)

---

*Quest Script Region 5 — Draf v0.2 · September 2026*
*Status: 18/18 misi Kalamrtu di-script detail (6 Main + 8 Side + 4 Hidden). 0 monster region baru tanpa alasan. 2 masalah "Cara Didapat"/kontinuitas ditemukan & diperbaiki (Rahib Abu, Lidah Watu). Sang Wiranata diverifikasi selaras kanon sejak awal. Seluruh 3 item tindak lanjut v0.1 SELESAI: HP dikonfirmasi (5400), konsekuensi mekanis resolution_path ditetapkan (add musuh vs pasif diperkuat), pasukan pendamping tematik ditambahkan (2x Penjaga Prasasti Bisu). 1 item sisa (combat math global) tetap ditunda sesuai kebijakan lintas-region. Belum diimplementasi, belum playtest.*
