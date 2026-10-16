# QUEST SCRIPT — REGION 3: SMARANA
# PUSAKA: GEMA NAWANTARA

**Versi:** Draf v0.2 — Quest Script Detail (koreksi pasif Juragan Larung, riddle SM-H01, penamaan Pasca-Region, sequencing Jatawira)
**Status:** 🟡 SIAP REVIEW TEKNIS — belum diimplementasi, belum playtest
**Rujukan kanon:**
- `World_Bible_Pusaka_Gema_Nawantara_v5.1.md` §BAB 3 (Smarana)
- `GUIDE_KARAKTER_100_Nawantara_FINAL_v1.1.md` #20-28, #87-88
- `DOKUMEN_ITEM_Pusaka_Gema_Nawantara_FINAL_v1.md` §1.3, §2, §3.4, §3.10
- `KERANGKA_MISI_Pusaka_Gema_Nawantara.md` v0.6 (kerangka sumber — 17 misi Smarana)
**Tanggal:** September 2026

**Verifikasi pra-scripting (pelajaran dari R1 & R2):**
- **Monster:** WB §3.8 sudah punya "Kuli Pelabuhan Bayang" (Umum) dan "Penagih Utang Lama" (Elite) — dipakai langsung, tidak ada duplikasi.
- **Item/Titah:** Seluruh 11 karakter roster Smarana (#20-28, #87-88) di-cross-check ke DI §3.4 SEBELUM menulis script. Ditemukan 2 gap (Antuwan Melayang #21, Jatawira #23) — **sudah diperbaiki di Kerangka Misi v0.5** sebelum dokumen ini disusun (lihat SM-M03 revisi dan SM-S06 baru). Seluruh 11 karakter sekarang punya jalur rekrutmen eksplisit.

---

## KONVENSI SCRIPT

Sama seperti Quest Script R1/R2 — lihat dokumen tersebut untuk definisi Flag/Trigger/Battle Params/Dialog Branch/Fail State. Angka HP non-kanon tetap `[PLACEHOLDER — akan direvisi]`.

**Catatan khusus Region 3:** Smarana adalah region PERTAMA dengan struktur "bebas urutan" (Season 2, tidak linear seperti Nirwasita/Kadewan). Ini berarti trigger tidak bisa mengasumsikan urutan misi sebelumnya dalam region yang sama — hanya bergantung pada prasyarat within-region yang eksplisit, dan status Season 1 selesai.

---

# SM-M01 · MUARA YANG MENERIMA SEMUANYA

## Trigger
- `flag_kd_m06_complete == true` (Season 1 selesai, Season 2 terbuka: Smarana ATAU Wanasunya bisa dipilih duluan)
- Pemain memilih masuk Smarana dari peta Season 2

## Flag
- `flag_sm_m01_complete`
- `flag_neraca_dagang_tutorial_seen`
- `flag_first_batu_gema_sold` (menandai item mana yang dijual — dipakai lintas dokumen untuk NR-S04/SM-M07 sistem terpadu)

## Struktur

### Beat 1 — Tiba di Pelabuhan
- Cutscene: pemain tiba di S1 Muara Larung, kontras visual jelas dengan Kadewan (kota ramai, transaksional, bukan sunyi/ritual)
- Juragan Ananta (NPC guide sistem, bawahan Juragan Larung) menyambut, memperkenalkan konsep Neraca Dagang

### Beat 2 — Tutorial Neraca Dagang
- UI popup: "Menjual Batu Gema memberimu akses/item/informasi — tapi yang dijual hilang permanen dari Ensiklopedia. Bisa ditebus lewat cara lain di kemudian hari."
- **PENTING implementasi:** kalimat terakhir ("bisa ditebus lewat cara lain") WAJIB ada di tutorial ini — ini keputusan lintas-dokumen dari Quest Script R1 (NR-S04 terhubung ke SM-M07). Tutorial yang tidak menyebutkan ini akan membuat pemain mengira kehilangan itu permanen tanpa harapan, padahal tidak.
- Pemain diberi 3 Batu Gema starter (terpisah dari currency Kepeng — Batu Gema adalah representasi entri Ensiklopedia yang bisa dijual, bukan mata uang biasa)
- Pemain HARUS menjual 1 dari 3 untuk membuka jalur ke S2 (wajib, sesuai WB §3.6 "min 1 misi paksa jual Batu Gema")
- **Pilihan Batu Gema yang dijual disimpan di `flag_first_batu_gema_sold`** — salah satu dari 3 pilihan berisi clue tersembunyi untuk SM-H01 (Hidden Mission) nanti

**Riddle petunjuk (BARU — ditambahkan agar SM-H01 bisa ditemukan lewat observasi, bukan tebakan buta):** saat pemain memeriksa (bukan langsung menjual) tiap Batu Gema sebelum memilih, masing-masing menampilkan 1 baris inskripsi pendek. 2 dari 3 baris murni deskriptif/flavor. **1 baris (pada Batu Gema yang benar) berupa riddle:**

> *"Suatu tempat menyimpan tempat lain — bukan disembunyikan oleh kunci, tapi oleh telinga yang tak pernah berhenti mendengarkan suara yang sama."*

Riddle ini secara halus menunjuk ke mekanik SM-H01 (brankas ditemukan lewat perbedaan gema saat diketuk — "telinga yang mendengarkan" adalah petunjuk literal ke solusi puzzle itu), tanpa menyebut lokasi atau nama misi secara eksplisit. Pemain yang teliti membaca ketiga inskripsi sebelum memilih (bukan asal klik) punya kesempatan wajar menebak Batu Gema mana yang "benar" — ini mengubah SM-H01 dari "RNG tersembunyi murni" menjadi "rahasia yang bisa ditemukan lewat observasi", konsisten dengan prinsip desain puzzle region lain di game ini.

**Implementasi UI:** popup "Periksa" harus terpisah dari popup "Jual" — pemain HARUS diberi opsi melihat inskripsi dulu sebelum transaksi final, bukan dipaksa menjual langsung dari daftar tanpa deskripsi.

### Beat 3 — Battle Tutorial
- Trigger: setelah transaksi pertama selesai
- **Battle Params:**
  - Musuh: 2x Kuli Pelabuhan Bayang (kanon Umum, WB §3.8) — HP **1210 (dikoreksi hasil audit Combat Math Global — Level~18, Smarana adalah region pertama S2)**
  - **Mekanik malam hari (WB §3.12) tidak aktif di sini** — SM-M01 dijamin terjadi siang hari (tutorial, tidak boleh kena variabel harga malam yang membingungkan pemain baru)
  - Kondisi menang: HP 0%

### Beat 4 — Reward
- Drop: Kalung Gadai (Common Jimat, DI §1.3)
- `flag_sm_m01_complete = true`, akses S2 terbuka

## Fail State
- Party wipe: auto-revive 30% HP (pola tutorial standar)

---

# SM-M02 · HARGA HARI INI

## Trigger
- `flag_sm_m01_complete == true`
- Pemain masuk S2 Rawa Kelam

## Flag
- `flag_bandar_ilung_recruited`
- `array_market_prices` (5 barang, harga berubah tiap "hari"/ronde, siklus 3-hari)
- `flag_sm_m02_complete`

## Struktur

### Beat 1 — Pengenalan Bandar Ilung
- Trigger: masuk area pasar S2
- Bandar Ilung (#20) menunjukkan sistem harga fluktuatif — 5 barang, harga berubah tiap hari mengikuti pola siklus 3-hari (barang A: murah-sedang-mahal-ulang; barang B: pola berbeda, dst.)
- UI: tabel harga real-time ditampilkan, pemain bisa observasi pola sebelum bertransaksi

### Beat 2 — Mini-Game Perdagangan
- Pemain BISA membeli rendah, jual tinggi — TAPI setiap transaksi (beli ATAU jual) menghapus 1 entri Ensiklopedia sebagai "biaya" transaksi bertema Neraca Dagang
- **Tujuan:** beli info lokasi pecahan Pusaka Gema dengan BIAYA MINIMAL (paling sedikit entri yang hilang) — puzzle optimasi, bukan sekadar transaksi acak
- Pola 3-hari HARUS bisa diprediksi lewat observasi murni (tidak ada RNG tersembunyi) — ini prasyarat supaya "puzzle: temukan pola harga" benar-benar solvable, bukan tebak-tebakan

### Beat 3 — Battle: Penagih Utang Lama
- Trigger: setelah transaksi info lokasi pecahan Pusaka Gema selesai
- **Battle Params:**
  - Musuh: Penagih Utang Lama (kanon Elite, WB §3.8) — HP **2420 (dikoreksi hasil audit Combat Math Global — Level~18, formula ×1.5 dari Common)**
  - **Mekanik debuff ekonomi:** party kehilangan Kepeng (currency, BUKAN Ensiklopedia) tiap ronde selama battle — jumlah `[PLACEHOLDER]` 5% dari total Kepeng per ronde, mendorong pemain menyelesaikan battle cepat
  - Kondisi menang: HP 0%

### Beat 4 — Reward
- Drop: Pisau Penaksir (Uncommon Senjata, DI §1.3)
- Lokasi pecahan Pusaka Gema terungkap (dipajang di S7 Bale Adol — dicatat sebagai flag global `flag_pusaka_gema_fragment_smarana_revealed = true`, dipakai SM-M05)
- `flag_bandar_ilung_recruited = true`, Titah Bandar Ilung selesai
- `flag_sm_m02_complete = true`

## Fail State
- Party wipe: retry battle, harga pasar tidak reset (progres mini-game tetap)

---

# SM-M03 · YANG TERTINGGAL ENTAH DI MANA

**Catatan implementasi khusus:** Ini misi yang DIREVISI dari draf Kerangka Misi awal — sekarang eksplisit merekrut Antuwan Melayang (#21), bukan hanya menyelamatkan NPC generik.

## Trigger
- `flag_sm_m02_complete == true`
- Pemain masuk S3 Wana Sunya

## Flag
- `counter_gudang_identified` (0-3)
- `flag_antuwan_melayang_recruited`
- `flag_sm_m03_night_path` (boolean — apakah pemain menempuh jalur malam S4)

## Struktur

### Beat 1 — Investigasi Gudang
- 3 "barang tak bertuan" di gudang S3, masing-masing dengan clue (nama terukir, kota asal, alasan terlupakan)
- Clue ke-3 (dari 3) SECARA KHUSUS menunjukkan sesuatu yang TIDAK seperti barang — lentera kain berjumbai yang bergerak sendiri sesekali (petunjuk visual halus, bukan quest marker eksplisit, bahwa ini bukan barang biasa)
- Identifikasi 2 barang pertama: NPC manusia (nama, cerita standar "terlupakan"). Identifikasi barang ke-3: memicu Beat 2 khusus

### Beat 2 — Mengenali Antuwan Melayang
- Trigger: pemain berinteraksi dengan lentera kain berjumbai
- Ia tidak merespons pertanyaan langsung (echo lore GK #21: "tidak pernah menjawab") — hanya melayang gelisah, lebih tinggi jika didekati terlalu cepat
- **Puzzle kecil:** pemain harus mendekat PELAN (tidak spam interaksi) — 3x percobaan mendekat dengan jeda, baru Antuwan "membiarkan" dirinya dikenali
- Setelah dikenali: ia tidak bicara, tapi mengikuti pemain secara pasif (flag `flag_antuwan_encountered = true`, bukan recruited — recruitment penuh terjadi di Beat 4)

### Beat 3 — Pilihan Jalur & Battle
- **Dialog Branch:**
  - `[Beli kebebasan lewat Batu Gema]` → transaksi cepat, 2 NPC manusia + Antuwan Melayang langsung bebas, TIDAK ada battle tambahan
  - `[Jalur alternatif — tanpa menjual]` → 2 encounter tambahan wajib (battle melawan penjaga gudang generik yang menahan mereka secara paksa, `[PLACEHOLDER]` HP 900 masing-masing)
- Trigger malam S4 (opsional, WB §3.12): jika pemain menunda ke malam hari, jalur khusus S4 Pasar Tanhana terbuka dengan barang langka tambahan — TIDAK wajib untuk progres SM-M03, murni bonus eksplorasi
- **Battle Utama (kedua jalur bertemu di sini):** encounter pedagang bayang yang mengklaim kepemilikan atas ketiganya
  - `[Membeli balik dari pedagang bayang]` → transaksi, 0 battle tambahan
  - `[Menolak]` → battle langsung, musuh `[PLACEHOLDER]` HP 1300, party harus menang untuk membebaskan ketiganya

### Beat 4 — Recruitment & Reward
- `flag_antuwan_melayang_recruited = true` — Antuwan Melayang bergabung (Common, Ghost/Bayu/Attacker)
- 2 NPC manusia lain → entri Ensiklopedia (bukan roster karakter, murni lore)
- Drop: Neraca Kecil (Rare Pusaka, DI §1.3) + Senjata Yang Tertinggal Entah Di Mana (DI §3.4, Titah Antuwan Melayang)
- `flag_sm_m03_complete = true`

## Fail State
- Party wipe di battle manapun: retry battle spesifik, progres identifikasi 3 barang tidak reset

---

# SM-M04 · GUDANG TIRTA

## Trigger
- `flag_sm_m03_complete == true`
- Pemain masuk S5 Gudang Tirta

## Flag
- `array_segel_terbuka` (0-7)
- `flag_timbangan_terakhir_progress` (Item Spesial, dilacak lintas beberapa misi Smarana)
- `flag_sm_m04_complete`

## Struktur

### Beat 1 — 7 Segel
- 4 segel terbuka dari kunci yang didapat misi sebelumnya (SM-M01-M03 masing-masing menyumbang), 3 sisanya di S5 sendiri
- Tiap segel terbuka: 1 fakta tentang Smarana terungkap (makin gelap tiap fakta — dari "kota dagang biasa" ke "kota yang memperdagangkan orang")
- Puzzle terakhir (segel ke-7): susun 7 fakta jadi narasi koheren — UI drag/pilih urutan, TIDAK ada 1 urutan "benar" tunggal (beberapa urutan logis diterima, sistem mengecek koherensi kausal dasar, bukan urutan persis)

### Beat 2 — 3 Battle Bertingkat (Bawah Air)
- **Modifikasi zona:** semua karakter non-Apah -20% SPD selama battle di S5 (elemen advantage eksplisit)
- Battle 1-2: encounter generik bawah air (`[PLACEHOLDER]` HP 1000 masing-masing)
- Battle 3 (final): "Penjaga Gudang" — Elite khusus, **hanya bisa di-damage oleh karakter yang sudah "menjual" sesuatu di Neraca Dagang** (flag check: karakter mana pun di party yang terhubung ke `flag_first_batu_gema_sold` atau transaksi Neraca Dagang manapun sepanjang playthrough dapat damage normal; karakter yang belum pernah menjual apa pun dapat damage -75% terhadap musuh ini — mekanik tematik: hanya yang paham "harga" bisa menembus pertahanannya)
- HP Penjaga Gudang: `[PLACEHOLDER]` 1800

### Beat 3 — Reward
- Drop: Timbangan Juragan Ananta (Super Rare Pusaka, DI §1.3)
- `flag_timbangan_terakhir_progress` bertambah (dipakai untuk syarat Item Spesial DI §2, dicek lengkap di SM-M06)
- `flag_sm_m04_complete = true`

## Fail State
- Party wipe: retry battle individual (1-3), segel yang sudah terbuka tidak reset
- Jika seluruh party tidak pernah menjual apa pun di Neraca Dagang (kemungkinan kecil tapi mungkin bagi pemain yang sangat menghindari sistem ini): Battle 3 tetap bisa dimenangkan, hanya lebih lama (bukan soft-lock)

---

# SM-M05 · BALAI LELANG

## Trigger
- `flag_sm_m04_complete == true` DAN `flag_pusaka_gema_fragment_smarana_revealed == true` (dari SM-M02)
- Pemain masuk S7 Bale Adol

## Flag
- `flag_lelang_won`
- `flag_sm_m05_declined_path` (jika pemain pilih opsi tersembunyi "tolak membeli")
- `flag_sm_m05_complete`

## Struktur

### Beat 1 — Sistem Lelang
- Pecahan Pusaka Gema dipajang, harga: entri Ensiklopedia TERBESAR yang dimiliki pemain (sistem harus mengurutkan entri berdasarkan "nilai naratif" — implementasi teknis: tag prioritas per entri, ditentukan tim writing, di luar cakupan dokumen ini)
- NPC lain ikut menawar — mini-game lelang: pemain bisa `[Naikkan tawaran]` (bayar lebih banyak entri) atau `[Sabotase]` (temukan kelemahan penawar lain lewat dialog, memerlukan observasi sebelumnya di S6-S7)
- **Opsi tersembunyi:** `[Tolak membeli]` — TIDAK muncul di menu utama, hanya terbuka jika pemain sudah bicara ke minimal 3 NPC berbeda di S6 sebelumnya (soft-gate eksplorasi)

### Beat 2A — Jalur Menang Lelang
- `flag_lelang_won = true`
- Lanjut ke Beat 2 battle seperti biasa

### Beat 2B — Jalur Tolak Membeli (opsional)
- `flag_sm_m05_declined_path = true`
- Trigger akses jalur panjang SM-M06 alternatif (lihat catatan di SM-M06 Beat 1) — TIDAK kehilangan progres, hanya rute berbeda menuju resolusi region

### Beat 3 — Battle: Gema Smarana
- **Battle Params — battle environment unik:**
  - Musuh bukan sosok tunggal — kota itu sendiri. Sistem harus membagi HP jadi beberapa "bagian" independen: Lantai (`[PLACEHOLDER]` HP 600), Dinding (`[PLACEHOLDER]` HP 700), Langit-langit (`[PLACEHOLDER]` HP 500) — total 3 target terpisah, bisa diserang dalam urutan apa pun
  - **Konsekuensi tematik:** tiap bagian yang dihancurkan memicu 1 baris dialog/notifikasi "1 NPC kota kehilangan mata pencaharian" — ini TIDAK mempengaruhi mekanik battle, murni bobot naratif (memberi pemain jeda untuk merasakan biaya kemenangan, echo tema region "kemenangan mahal")
  - Kondisi menang: seluruh 3 bagian HP 0%

### Beat 4 — Reward
- Drop: Segel Balai Lelang (Ultra Rare Pusaka, DI §1.3)
- `flag_sm_m05_complete = true`, akses S7 dalam (ruang Juragan Larung) terbuka

## Fail State
- Party wipe: retry battle, ketiga bagian HP tidak reset ke penuh (progres per-bagian tersimpan — battle lingkungan besar tidak adil untuk full-reset)

---

# SM-M06 · KEMAKMURAN YANG RUNTUH

## Trigger
- `flag_sm_m05_complete == true`
- Pemain masuk ruang dalam S7

## Flag
- `flag_juragan_larung_recruited`
- `flag_timbangan_terakhir_obtained` (Item Spesial — syarat: `flag_timbangan_terakhir_progress` dari SM-M04 mencapai nilai penuh DAN pembongkaran gudang selesai)
- `flag_sm_m06_complete`
- `counter_kuli_adds_defeated` (battle-scoped, reset tiap battle attempt — jumlah add yang gugur DALAM battle ini, dipakai pasif kanon Juragan Larung)

## Struktur

### Beat 1 — Konfrontasi Juragan Larung
- Battle dimulai dengan atau tanpa `flag_sm_m05_declined_path` — kedua jalur bertemu di sini, hanya framing dialog pembuka yang berbeda (jalur declined: Juragan Larung menyindir pemain "sok suci tapi tetap di sini")

### Beat 2 — Battle
**Koreksi penting:** draf sebelumnya salah mengutip pasif Juragan Larung sebagai "+5% ATK per Batu Gema terjual seumur playthrough" — ini TIDAK ADA di Guide Karakter, murni salah kutip saat penyusunan draf pertama. Pasif kanon sebenarnya (GK #28): **"Kemakmuran dari yang Hilang" — setiap kali seorang lawan memudar, Juragan Larung +15% ATK permanen dan tim +1 Prana.** Ini pasif stacking-per-kill dalam SATU battle, bukan akumulasi lintas-playthrough.

- **Battle Params:**
  - Musuh utama: Juragan Larung (GK #28, Legendary Human/Bayu/Attacker) — **HP 5000 (dikonfirmasi final dari tabel kanon, bukan lagi placeholder)**
  - **Musuh tambahan (BARU — diperlukan agar pasif kanon relevan):** pasif "setiap kali seorang lawan memudar" tidak akan pernah aktif di battle 1v1 solo. Battle ini didesain ulang memakai **add wave**: Juragan Larung memanggil 4x Kuli Pelabuhan Bayang (kanon Umum, WB §3.8 — reuse monster region yang sama, tematik pas karena mereka "pekerja yang dilupakan namanya, kini hanya angka di buku besar", cocok jadi pasukan bawahannya) sepanjang battle, muncul bertahap (1 di awal, 1 tiap kali HP Juragan Larung turun 20%)
  - **Penerapan pasif dengan cap khusus encounter ini:** setiap Kuli Pelabuhan Bayang gugur → Juragan Larung +15% ATK permanen untuk battle ini (sesuai kanon), +1 Prana tim pemain (sesuai kanon — pasif ini menguntungkan SIAPA PUN yang membuat lawan gugur, termasuk musuh gugur karena serangan party, jadi tim pemain tetap dapat Prana meski buff ATK masuk ke musuh). **Total stacking ATK dari pasif ini di-cap pada +55% untuk encounter SM-M06 secara spesifik** (setara ~3-4 Kuli Pelabuhan Bayang gugur) — cap ini HANYA berlaku untuk desain battle ini, TIDAK mengubah teks pasif kanon di Guide Karakter (yang tetap tidak di-cap untuk konteks lain, misalnya jika Juragan Larung dipakai sebagai ally di battle lain setelah direkrut — itu keputusan combat math global yang terpisah, di luar cakupan boss fight ini)
  - Basis Pamungkas 270% (kanon)

### Beat 3 — Fase Akhir: Penawaran Terakhir
- Trigger: HP Juragan Larung <= 20%
- UI: "Beli kembali 1 ingatan yang sudah kau jual?"
- **Dialog Branch:**
  - `[Terima]` → 1 entri Ensiklopedia kembali (pemain pilih yang mana), TAPI Juragan Larung lolos (battle berakhir tanpa battle dimenangkan penuh — ia kabur, HP tidak mencapai 0%)
  - `[Tolak]` → battle lanjut sampai HP 0%, ingatan tetap hilang, TAPI Juragan Larung benar-benar dikalahkan dan bergabung

### Beat 4 — Recruitment & Reward
- HANYA jika `[Tolak]` dipilih: `flag_juragan_larung_recruited = true`
- Jika `[Terima]` dipilih: Juragan Larung TIDAK bergabung di playthrough ini (bisa direkrut lewat SM-H02, lihat bagian Hidden Mission — jalur pemulihan)
- Drop (kedua jalur): Timbangan Terakhir (Item Spesial, DI §2) — JIKA `flag_timbangan_terakhir_progress` dari SM-M04 sudah penuh
- `flag_sm_m06_complete = true`, Resolusi Region dievaluasi
- Trigger: akses SM-M07 (Penebusan, Pasca-Region) terbuka SEKARANG (bukan menunggu seluruh game tamat — nama sudah dikoreksi dari "Pasca-Tamat" ke "Pasca-Region" agar tidak disalahpahami sebagai pasca-tamat seluruh game)

## Fail State
- Party wipe: retry dari awal battle (fase penawaran terakhir harus dicapai ulang)

---

# SM-M07 · PENEBUSAN (PASCA-REGION)

**Catatan istilah:** Judul misi ini **sudah dikoreksi** dari "Penebusan (Pasca-Tamat)" menjadi **"Penebusan (Pasca-Region)"** di seluruh dokumen (Kerangka Misi v0.6, Quest Script R1, Quest Script R3) — nama lama berpotensi disalahpahami sebagai "setelah SELURUH game tamat", padahal maksudnya "setelah region Smarana selesai" (`flag_sm_m06_complete`), tersedia sejak pertengahan game.

## Trigger
- `flag_sm_m06_complete == true`
- Tersedia SELAMANYA setelah ini (tidak ada window waktu terbatas)

## Flag
- `array_lost_encyclopedia_entries` (dari SEMUA sumber — Neraca Dagang Smarana + NR-S04 Nirwasita, sesuai keputusan sinkronisasi sebelumnya)
- `counter_entries_redeemed`

## Struktur

### Beat 1 — Cek Entri Hilang
- Sistem scan `array_lost_encyclopedia_entries` — daftar SEMUA entri yang hilang lewat mekanisme apa pun sepanjang playthrough sejauh ini (termasuk entri yang mungkin hilang di region SETELAH Smarana jika pemain kembali ke sini nanti — sistem harus re-scan tiap kali misi ini diakses, bukan snapshot sekali saat trigger pertama)

### Beat 2 — Puzzle Per Entri
- Untuk TIAP entri di daftar: temukan orang/tempat asli terkait, selesaikan 1 puzzle unik (implementasi puzzle spesifik bervariasi per entri — di luar cakupan generic script ini, perlu breakdown per-entri terpisah jika jumlah entri growing berarti konten bertambah signifikan)
- Battle per entri: "Ingatan yang Sudah Berubah Bentuk" — **HP variabel BY DESIGN (dikonfirmasi, bukan placeholder terbuka)** — skala dengan level karakter saat itu (bukan fixed number, karena misi ini bisa diakses kapan saja sepanjang sisa game; implementasi: `HP = HP_lookup(tier_entri, level_party_saat_ini)` mengikuti tabel §4.2 Combat Math Global)

### Beat 3 — Reward
- Entri Ensiklopedia kembali dengan catatan "dipulihkan" (teks sedikit berbeda dari versi asli — implementasi butuh 2 versi teks per entri yang bisa hilang: versi asli + versi "dipulihkan")
- `counter_entries_redeemed` bertambah per entri

## Fail State
- Party wipe: retry battle per-entri, tidak mempengaruhi entri lain yang sedang/sudah ditebus

---

# SM-S01 · BUKAN ALASANMU (TITAH SAGARA BUIH)

## Trigger
- `flag_sm_m02_complete == true`
- Ditemukan lewat eksplorasi S2-S5

## Flag
- `counter_origin_stories` (0-3)
- `flag_sagara_buih_recruited`

## Struktur
- 3 versi cerita asal-usul kerajaan yang saling kontradiktif, tersebar S2-S5
- Puzzle: temukan 1 nama yang muncul di ketiga versi meski detail lain berbeda (nama tersembunyi di detail kecil tiap versi, butuh cross-reference manual pemain)
- Battle: dasar pasar terapung S5, lawan menyerang lewat "argumen" — debuff bertema narasi (`[PLACEHOLDER]` HP 1100, pola serangan berupa "pernyataan" yang mengurangi 1 stat acak per ronde alih-alih damage langsung)
- Drop: Jimat Bukan Alasanmu (DI §3.4)

## Fail State
- Tidak ada — bisa retry kapan saja

---

# SM-S02 · BALAI LELANG (TITAH DATU KALIMPAN)

## Trigger
- `counter_neraca_dagang_transactions_lifetime >= 10` (akumulatif, bisa dari misi mana pun yang melibatkan Neraca Dagang)
- Ditemukan di S6

## Flag
- `flag_datu_kalimpan_recruited`
- `flag_balai_lelang_tersembunyi_found`

## Struktur
- Balai lelang tersembunyi di "titik jatuh" S6 (lokasi tanpa marker, ditemukan lewat pola visual — area yang terlihat "collapsed"/runtuh dari sudut pandang tertentu)
- Di penawaran: pemain DITAWARI membeli kembali 1 ingatan — **HARUS TOLAK** untuk melanjutkan (berbeda dari SM-M06 di mana menerima adalah pilihan valid — di sini menolak adalah SATU-SATUNYA jalur, karena ini tentang Datu Kalimpan menguji komitmen pemain terhadap sistem, bukan tawaran naratif terbuka)
- Battle: penjaga balai lelang, `[PLACEHOLDER]` HP 1000, dengan aturan "tidak boleh memakai item" selama battle (echo tema menolak transaksi — battle ini secara mekanis mencerminkan pilihan naratif)
- Drop: Jimat Balai Lelang (DI §3.4)

## Fail State
- Jika pemain terima tawaran (bukan tolak): misi tidak gagal permanen, tapi Datu Kalimpan menghilang untuk sesi ini — kembali lagi nanti untuk retry dialog

---

# SM-S03 · LENTERA YANG TAK PADAM (TITAH TALAPAK EMBUN)

## Trigger
- `flag_sm_m04_complete == true`
- Ditemukan di S5

## Flag
- `flag_talapak_embun_recruited`

## Struktur
- 5 lentera menyala di Gudang Bawah Air, ikuti embun/uap panasnya ke sumber (puzzle pelacakan visual, jejak uap sebagai penanda arah)
- Battle: monster berbasis Teja di area bawah air (disadvantage elemen — S5 dominan Apah), `[PLACEHOLDER]` HP 900, pendek tapi intens (damage tinggi kedua arah)
- Drop: Jimat Lentera yang Tak Padam (DI §3.4)

## Fail State
- Tidak ada — battle bisa diulang bebas

---

# SM-S04 · HARGA YANG DITANGGUNG BERSAMA (TITAH BANDAR TIMBANGAN)

## Trigger
- `flag_sm_m04_complete == true`
- Ditemukan S4-S5

## Flag
- `counter_transaksi_diobservasi` (0-3)
- `flag_bandar_timbangan_recruited`

## Struktur
- Saksikan 3 transaksi Neraca Dagang NPC lain yang berujung konflik (observasi pasif, tidak perlu interaksi langsung)
- Puzzle mediasi: pemain PILIH 1 dari 3 transaksi untuk diselesaikan tanpa memihak — dialog bercabang, solusi harus menguntungkan KEDUA pihak (sistem cek: pilihan yang murni menguntungkan 1 sisi dianggap gagal, pemain diminta ulang dengan opsi berbeda)
- Battle: 2v2 (pembeli vs penjual NPC sebagai musuh sementara), kondisi menang KHUSUS — akhiri battle TANPA ada pihak yang tumbang (battle berbasis debuff/CC, bukan damage-to-zero, mengikat tematik mediasi)
- Drop: Pusaka Harga yang Ditanggung Bersama (DI §3.4)

## Fail State
- Pilihan mediasi gagal (memihak): kembali ke pilihan, tidak ada penalti permanen
- Battle: jika salah satu pihak NPC tumbang (bukan party): battle dianggap "gagal" secara naratif meski secara HP mungkin menang — retry battle dari awal dengan strategi CC yang lebih baik

---

# SM-S05 · ENAM RATUS TAHUN DI BAWAH (TITAH WATU GAMBUT)

## Trigger
- `flag_sm_m01_complete == true`
- Ditemukan di S2

## Flag
- `array_lapisan_tanah` (5 lapisan, artefak per era)
- `flag_watu_gambut_recruited`

## Struktur
- Puzzle penggalian: 5 lapisan tanah, tiap lapisan 1 artefak dari era berbeda (sistem waktu in-game — era paling dalam = paling tua)
- Susun kronologi dari 5 artefak (drag/urutkan berdasarkan clue visual — gaya seni/material yang berubah antar era)
- Battle: encounter di kedalaman, monster bertambah kuat tiap lapisan (`[PLACEHOLDER]` HP 700/900/1100/1300/1500 — makin dalam makin berbahaya, echo tema "makin tua")
- Drop: Pusaka Enam Ratus Tahun di Bawah (DI §3.4)

## Fail State
- Party wipe di lapisan manapun: retry lapisan itu saja (bukan reset ke lapisan 1)

---

# SM-S06 · YANG TIDAK MENGUCAP IZIN (TITAH JATAWIRA)

**Catatan implementasi khusus:** Misi ini BARU ditambahkan saat penyusunan dokumen ini — mengisi gap rekrutmen Jatawira (#23) yang sebelumnya tidak terhubung ke misi apa pun di Kerangka Misi.

## Trigger
- `flag_sm_m01_complete == true` (S1 accessible)
- Ditemukan di S1 Muara Larung — TIDAK memerlukan progres misi lain, tersedia sejak awal region

## Flag
- `counter_doa_pelayaran_found` (0-3)
- `flag_jatawira_izin_path` (boolean — apakah pemain mengucap izin sebelum menyeberang ke S2)
- `flag_jatawira_recruited`

## Struktur

### Beat 1 — Kumpul 3 Doa Pelayaran
- 3 kapal karam di S1, masing-masing menyimpan fragmen doa pelayaran lama yang menyebut nama Jatawira
- Tidak ada quest marker eksplisit untuk ketiganya — 1 kapal terlihat jelas (dekat dermaga utama), 2 lainnya butuh eksplorasi (mengapung lebih jauh, sebagian tenggelam)

### Beat 2 — Titik Keputusan (Lokasi Terpisah dari Jalur Utama S1→S2)
**Koreksi sequencing:** draf sebelumnya menaruh titik keputusan ini di "batas air menuju S2" — lokasi yang SAMA dengan jalur utama progres SM-M02, berisiko memaksa SETIAP pemain (termasuk yang tidak mengerjakan SM-S06 sama sekali) melalui trigger ini. Diperbaiki: titik keputusan Jatawira sekarang berada di **kuil/altar terpisah di tepi sungai S1**, bukan di jalur penyeberangan utama. Jalur utama menuju S2 (dipakai SM-M02) TIDAK melewati lokasi ini sama sekali — pemain yang tidak pernah mendekati altar Jatawira secara fisik tidak akan pernah memicu SM-S06, dan bisa lanjut ke SM-M02 tanpa gangguan.
- Trigger: pemain SENGAJA mendekati altar Jatawira (lokasi tersembunyi ringan — terlihat dari jalur utama tapi butuh belokan singkat untuk didekati, bukan dilewati otomatis)
- **Dialog Branch:**
  - `[Ucap izin]` (hanya muncul jika `counter_doa_pelayaran_found == 3`) → `flag_jatawira_izin_path = true`
  - `[Lewati tanpa mengucap]` → `flag_jatawira_izin_path = false`, battle otomatis trigger (lihat Beat 3B)
  - Jika `counter_doa_pelayaran_found < 3` (belum kumpul semua doa): opsi "Ucap izin" tidak tersedia, hanya bisa lewat tanpa mengucap (battle otomatis) ATAU kembali mencari fragmen sisa
  - **Opsi keempat (BARU):** `[Tinggalkan altar, jangan diganggu]` — pemain bisa menjauh tanpa trigger battle sama sekali, MENUNDA SM-S06 tanpa konsekuensi. Ini memastikan misi benar-benar opsional, bukan "sekali dekat, wajib battle"

### Beat 3A — Battle Jinak (jalur izin lengkap)
- **Battle Params:**
  - Jatawira menguji lewat battle ringan — menahan arus, bukan menyerang mematikan
  - Kondisi menang: bertahan 3 ronde (pola kesabaran yang sudah jadi motif region-lintas — echo NR-M03, KD-H02)
  - Musuh tidak menyerang mematikan, hanya efek "arus deras" (debuff SPD, bukan damage besar)

### Beat 3B — Battle Penuh (jalur tanpa izin)
- **Battle Params:**
  - Jatawira full power (GK #23 kanon: Tank, pasif "Tata Cara" — jika bertindak lebih dulu dari seluruh sekutu ronde itu, tim (dia + sekutu jika ada) +12% DEF)
  - HP **2422 — dikoreksi hasil audit Combat Math Global, Uncommon-tier di-skala ke Level~19 Smarana** (Tank, lebih tinggi dari Elite standar karena ini karakter roster recruitable, bukan monster generik)
  - Kondisi menang: HP 0% — battle konvensional, lebih sulit dari jalur 3A karena tidak ada "belas kasihan" dari mekanik ujian

### Beat 4 — Recruitment
- Kedua jalur: `flag_jatawira_recruited = true` — Jatawira bergabung terlepas dari jalur (bedanya hanya tingkat kesulitan battle, bukan hasil akhir, konsisten dengan pola KD-M06 "kedua jalur tetap merekrut")
- Drop: Pusaka Yang Tidak Mengucap Izin (DI §3.4)

## Fail State
- Party wipe di battle 3A: retry, TIDAK downgrade ke 3B (jalur izin tetap dihormati meski battle diulang)
- Party wipe di battle 3B: retry battle konvensional

---

# SM-H01 · GUDANG BAWAH GUDANG

## Trigger
- `flag_sm_m04_complete == true` DAN `flag_first_batu_gema_sold` cocok dengan Batu Gema spesifik yang berisi clue (dari SM-M01 Beat 2 — hanya 1 dari 3 pilihan awal yang membuka ini)

## Flag
- `flag_gudang_bawah_gudang_unlocked`
- `array_brankas_opened` (0-3)

## Struktur
- Ruang tersembunyi di dalam S5, bahkan Juragan Larung tidak tahu keberadaannya
- Puzzle: buka 3 brankas tanpa kunci — observasi pola retakan di dinding (visual puzzle murni, tidak ada kombinasi angka/kode eksplisit — lebih ke "temukan brankas yang gemanya berbeda saat diketuk", implementasi audio-visual)
- Battle: "Barang yang Lupa Dirinya Barang" — battle filosofis, lawan bertanya tiap ronde (UI pilihan jawaban), jawab benar = damage berkurang. HP **2420 — dikoreksi Elite ×1.5 Level~19 Smarana**
- Reward: 3 item langka (Batu Gema + 1 Kitab eksklusif) + 2 entri Ensiklopedia

## Fail State
- Tidak ada — jika pemain menjual Batu Gema yang salah di SM-M01, misi ini permanen tidak terbuka untuk playthrough ini (TIDAK ada fail state di sini, tapi ada CONSEQUENCE di misi sebelumnya — dicatat sebagai desain, bukan bug)

---

# SM-H02 · YANG TAK LAGI DICARI (LANJUTAN JURAGAN LARUNG)

## Trigger
- `flag_sm_m06_complete == true` DAN Juragan Larung TIDAK direkrut (`flag_juragan_larung_recruited == false`, yaitu pemain pilih `[Terima]` di SM-M06 Beat 3)
- Ini SATU-SATUNYA jalur untuk tetap mendapatkan Juragan Larung jika pemain sudah memilih menerima penawaran terakhirnya

## Flag
- `flag_juragan_larung_recruited_late`

## Struktur
- Eksplorasi terdalam Gudang Bawah Air (area yang sama SM-M04, tapi bagian yang belum terjelajahi)
- "Sisa Juragan Larung" — echo yang masih berdagang meski kalah/kabur dari region
- Battle opsional: `[PLACEHOLDER]` HP 2000 (lebih tinggi dari battle utama karena ini "kesempatan kedua", harus terasa lebih berat sebagai konsekuensi memilih jalur `[Terima]` sebelumnya)
- Menang → `flag_juragan_larung_recruited_late = true`, Juragan Larung bergabung (terlambat, tapi tetap didapat)
- Drop: Senjata Yang Tak Lagi Dicari (DI §3.4) versi penuh

## Fail State
- Party wipe: retry battle, tidak ada penalti tambahan

---

# SM-H03 · YANG HAFAL SEMUA NAMA (TITAH WADYAN SALUNAI)

## Trigger
- Bicara ke 15 NPC unik di seluruh Smarana (S1-S7, akumulatif across semua misi lain)

## Flag
- `counter_unique_npc_talked` (0-15)
- `flag_wadyan_salunai_recruited`

## Struktur
- Wadyan Salunai (#24) menghafal nama semua orang yang pernah lewat Smarana
- Setelah 15/15 NPC: ia menyebut 10 nama, pemain harus temukan 3 yang masih hidup di kota (investigasi sosial — tanya NPC lain untuk konfirmasi status masing-masing nama)
- **0 battle** — murni investigasi sosial
- Drop: Jimat Yang Hafal Semua Nama (DI §3.4) + 3 entri Ensiklopedia eksklusif

## Fail State
- Tidak ada — counter NPC persisten, tidak bisa "gagal", hanya butuh waktu

---

# SM-H04 · PARUH YANG TERLALU TERANG (TITAH TINGGANG INTAN)

## Trigger
- `flag_sm_m03_complete == true` (S4-S5 accessible)

## Flag
- `flag_tinggang_intan_protected`
- `flag_tinggang_intan_recruited`

## Struktur
- Tinggang Intan (#25) — enggang dengan paruh bercahaya, tidak bisa bersembunyi
- Puzzle: bantu ia menemukan tempat di Smarana yang TIDAK ADA yang melihat (zona yang semua orang hindari — butuh eksplorasi area "mati" S4-S5)
- Battle: predator tertarik cahaya paruhnya, 3 gelombang meningkat, kondisi menang KHUSUS — lindungi Tinggang Intan (ia BUKAN anggota tim selama battle, jika HP Tinggang Intan 0% battle gagal meski party masih hidup)
- HP predator per gelombang: `[PLACEHOLDER]` 800/1000/1200
- Drop: Senjata Paruh yang Terlalu Terang (DI §3.4)

## Fail State
- Tinggang Intan HP 0%: battle gagal (BUKAN party wipe standar) — retry dari gelombang 1, dengan hint tambahan opsional muncul untuk membantu positioning defensif

---

# RINGKASAN DEPENDENCY GRAPH — REGION 3

```
[Season 2 terbuka — Smarana bisa diambil sebelum/sesudah Wanasunya]

SM-M01 (Muara yang Menerima Semuanya) ──┬──→ SM-S05 (Enam Ratus Tahun di Bawah)
   ↓                                     └──→ SM-S06 (Jatawira, BARU — lokasi terpisah dari jalur utama S1→S2, sepenuhnya independen)
SM-M02 (Harga Hari Ini) ──┬──→ SM-S01 (Bukan Alasanmu)
   ↓                       └──→ [flag_pusaka_gema_fragment_smarana_revealed]
SM-M03 (Yang Tertinggal — Antuwan Melayang) [DIREVISI]
   ↓
SM-M04 (Gudang Tirta) ──┬──→ SM-S03 (Lentera yang Tak Padam)
   ↓                     ├──→ SM-S04 (Harga yang Ditanggung Bersama)
   ↓                     └──→ SM-H01 (Gudang Bawah Gudang) [kondisional flag_first_batu_gema_sold]
SM-M05 (Balai Lelang) ──[flag_pusaka_gema_fragment_smarana_revealed wajib]
   ↓
SM-M06 (Kemakmuran yang Runtuh) ──┬──→ [Terima] → SM-H02 (jalur pemulihan Juragan Larung)
   ↓                               └──→ [Tolak] → Juragan Larung langsung direkrut
SM-M07 (Penebusan) ── tersedia kapan saja setelah SM-M06, TIDAK terikat tamat game

[Independen dari chain Main Mission: SM-S02 (10 transaksi akumulatif), SM-H03 (15 NPC akumulatif)]
```

## Titik Kritis Dependency

1. **SM-M06 Beat 3 (`[Terima]` vs `[Tolak]`) adalah percabangan TERBESAR di region ini** — mempengaruhi apakah Juragan Larung didapat langsung atau lewat SM-H02. Kedua jalur valid, tapi UI harus jelas bahwa `[Terima]` bukan "gagal", hanya rute berbeda.

2. **SM-S06 (Jatawira) sekarang sepenuhnya independen dari SM-M02** — titik keputusannya dipindah ke altar terpisah di S1, bukan di jalur penyeberangan utama menuju S2. Pemain yang tidak sengaja mendekati altar tidak akan pernah memicu misi ini, dan progres SM-M02 tidak terpengaruh sama sekali.

3. **SM-H01 punya prasyarat TERSEMBUNYI dari SM-M01** — pilihan Batu Gema pertama yang dijual pemain (dari 3 pilihan tutorial) menentukan apakah SM-H01 bisa diakses SAMA SEKALI. Ini pola "hidden consequence" yang belum pernah muncul di R1/R2 — perlu dipastikan tidak terasa tidak adil (pemain baru tidak mungkin tahu pilihan tutorial mereka menentukan akses Hidden Mission nanti).

---

# ITEM TINDAK LANJUT — STATUS SETELAH KEPUTUSAN

## 1. Pasif Juragan Larung — ✅ SELESAI, koreksi mendasar

**Temuan:** Deskripsi awal pasif ("+5% ATK per Batu Gema terjual seumur playthrough") **tidak pernah ada di kanon** — murni salah kutip saya. Pasif asli (GK #28, "Kemakmuran dari yang Hilang"): +15% ATK permanen + tim +1 Prana, setiap kali SATU LAWAN GUGUR DALAM BATTLE INI (bukan akumulasi lintas-game).

**Konsekuensi desain yang mengikuti:** karena pasif berbasis "lawan gugur dalam battle", battle 1v1 solo (desain awal) membuatnya tidak pernah aktif. Battle didesain ulang dengan gelombang add (4x Kuli Pelabuhan Bayang, kanon, dipanggil bertahap) agar pasif relevan. **Cap +55% diterapkan** — bukan pada teks pasif kanon di Guide Karakter (tidak disentuh), melainkan sebagai batas stacking spesifik untuk encounter SM-M06 ini saja. Detail lengkap ada di bagian SM-M06 Beat 2 di atas.

**Kerangka Misi juga dikoreksi** — deskripsi battle SM-M06 di sana sebelumnya mengandung kutipan pasif yang sama-sama salah, sudah diperbaiki.

## 2. SM-H01 — ✅ SELESAI, riddle ditambahkan

Riddle petunjuk ditambahkan di SM-M01 Beat 2: baris inskripsi kriptis pada Batu Gema yang benar, ditampilkan lewat popup "Periksa" terpisah dari popup "Jual". Riddle mengarah ke mekanik SM-H01 (perbedaan gema saat mengetuk dinding) tanpa membocorkan lokasi/nama misi secara eksplisit. Mekanik dasar SM-H01 (prasyarat tersembunyi dari pilihan SM-M01) **tetap seperti semula** sesuai instruksi — hanya ditambah jalan wajar untuk menebaknya lewat observasi.

## 3. Penamaan "Pasca-Tamat" → "Pasca-Region" — ✅ SELESAI

Diganti di seluruh 3 dokumen yang mereferensikannya: Kerangka Misi (judul misi + tabel durasi), Quest Script R3 (judul section, catatan istilah, trigger di SM-M06). Quest Script R1 tidak menyebut nama lengkap misi ini (hanya kode "SM-M07"), jadi tidak ada yang perlu diubah di sana.

## 4. Sequencing Jatawira/Antuwan Melayang — ✅ SELESAI (Jatawira), ✅ TIDAK ADA MASALAH (Antuwan Melayang)

**Jatawira (SM-S06):** titik keputusan dipindah dari "jalur penyeberangan utama S1→S2" (berbagi lokasi dengan progres SM-M02) ke **altar terpisah di S1** yang butuh belokan sengaja untuk didekati. Ditambah opsi keempat `[Tinggalkan altar]` agar pemain bisa menunda tanpa battle otomatis. SM-M02 sekarang sepenuhnya tidak terpengaruh oleh keberadaan SM-S06.

**Antuwan Melayang (SM-M03):** dicek ulang khusus untuk memastikan tidak ada kutipan pasif keliru seperti kasus Juragan Larung. Kutipan "Selalu Kurang Satu — +25% CRT saat HP di bawah 50%" **tidak pernah muncul di badan Quest Script ini** (hanya di rencana penulisan yang tidak jadi dipakai) — jadi tidak ada koreksi yang diperlukan. Tidak ada masalah lain ditemukan untuk karakter ini.

## 5. Sinkronisasi Dokumen — ✅ SELESAI

Kerangka Misi (v0.5→v0.6) dan Quest Script R3 (v0.1→v0.2) saling konsisten sekarang. Guide Karakter **tidak disentuh** — pasif Juragan Larung di sana sudah benar sejak awal, saya yang salah mengutipnya di dokumen turunan.

## 6. Combat Math Placeholder — 🟡 status tetap

Tidak berubah: direvisi setelah Quest Script 9 region selesai. HP Juragan Larung masih `[PLACEHOLDER — verifikasi kanon]` karena saya tidak menemukan angka HP eksplisit untuk Legendary tier ini di scan awal — perlu diverifikasi manual ke tabel progresi stat lengkapnya.

---

*Quest Script Region 3 — Draf v0.2 · September 2026*
*Status: 17/17 misi Smarana di-script detail. 0 monster baru tanpa alasan. 0 item baru — 2 gap (Antuwan Melayang, Jatawira) diperbaiki di Kerangka Misi sebelum scripting. 5 keputusan FINAL dieksekusi: pasif Juragan Larung dikoreksi total (bukan cuma diubah angkanya — ternyata salah kutip dari awal) dengan cap +55% khusus encounter, riddle SM-H01 ditambahkan, penamaan Pasca-Region diterapkan di 3 dokumen, sequencing Jatawira didesain ulang agar independen dari SM-M02, Antuwan Melayang dikonfirmasi bersih tanpa masalah. 1 item masih placeholder: HP Juragan Larung butuh verifikasi manual (bukan kesalahan kutip, hanya belum ditemukan angkanya). Belum diimplementasi, belum playtest.*
