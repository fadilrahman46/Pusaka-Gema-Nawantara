# QUEST SCRIPT — REGION 7: RAJAWANI
# PUSAKA: GEMA NAWANTARA

**Versi:** Draf v0.1 — Quest Script Detail
**Status:** 🟡 SIAP REVIEW TEKNIS — belum diimplementasi, belum playtest
**Rujukan kanon:**
- `World_Bible_Pusaka_Gema_Nawantara_v5.1.md` §BAB 7 (Rajawani)
- `GUIDE_KARAKTER_100_Nawantara_FINAL_v1.1.md` #57-65, #95-96
- `DOKUMEN_ITEM_Pusaka_Gema_Nawantara_FINAL_v1.md` §1.7, §2, §3.8, §3.10
- `KERANGKA_MISI_Pusaka_Gema_Nawantara.md` v1.2 (kerangka sumber — 16 misi Rajawani, sudah termasuk 1 gap-fill + 1 koreksi Cara Didapat)
**Tanggal:** September 2026

**Verifikasi pra-scripting (checklist established R1-R6):**
- **Monster:** WB §7.8 sudah punya "Pedagang Bayang" (Umum) dan "Timbangan Serakah" (Elite) — dipakai langsung.
- **Item/Titah:** Seluruh 10 karakter roster Rajawani (#57-65, #95-96) di-cross-check ke DI §3.8. **1 gap ditemukan** (Sawangi Pala #58 — tidak punya misi) — diperbaiki di Kerangka Misi v1.2.
- **"Cara Didapat" Legendary (Sang Harga #65) diverifikasi SEBELUM scripting** — dikonfirmasi selaras Kerangka Misi, tidak perlu restrukturisasi seperti Sang Lengang.
- **Ditemukan 1 "Cara Didapat" kanon tambahan yang TIDAK cocok draf awal:** Penjaga Polos (#96) — kanon rantai 3 tahap bertahan sendirian dari 3 gelombang di gerbang terluar, BUKAN dialog godaan barang mewah seperti draf awal. Dikoreksi di Kerangka Misi sebelum dokumen ini ditulis.
- **Ditemukan sinergi tematik kanon** antara Sang Harga (#65, +5% ATK per gear Rare+ di SELURUH lapangan), Sukma Penimbang (#95, buff untuk gear termurah di tim), dan Penjaga Polos (#96, kebal mekanik "baca gear") — dimanfaatkan di desain battle RJ-M05.

---

## KONVENSI SCRIPT

Sama seperti Quest Script R1-R6. Angka HP non-kanon tetap `[PLACEHOLDER — akan direvisi]`. Pasif/skill dikutip dari GK ditandai `(kanon)`.

**Catatan khusus Region 7:** Mekanik signature Yang Tak Terjual (Warisan) — item non-tradeable yang dikumpulkan sepanjang region, jumlahnya menentukan kekuatan Sang Harga di battle final (DI §2 Item Spesial: 20+ Warisan = Sang Harga kehilangan 1 fase otomatis). Ini BERBEDA dari Neraca Dagang Smarana — di Smarana pemain KEHILANGAN entri dengan menjual, di sini pemain MENGUMPULKAN Warisan yang justru MELEMAHKAN musuh akhir, murni akumulasi positif tanpa trade-off.

---

# RJ-M01 · PELABUHAN REMPAH

## Trigger
- Season 4 terbuka (S3 selesai penuh) DAN pemain memilih Rajawani (bisa sebelum/sesudah Jaladri)

## Flag
- `flag_rj_m01_complete`
- `flag_warisan_tutorial_seen`
- `counter_warisan_total` (global region, dipakai sepanjang RJ-M01 s/d RJ-M05, dan syarat Item Spesial DI §2)

## Struktur

### Beat 1 — Tiba di Pelabuhan Rempah
- Cutscene: kontras dengan region sebelumnya — Rajawani penuh kemakmuran DAGANG, tapi kemakmuran itu dibangun di atas penghapusan identitas ("diingat sebagai barang, dilupakan sebagai bangsa")

### Beat 2 — Tutorial Warisan
- UI popup: "Warisan — syair, aturan adat, nama penduduk — TIDAK BISA diperdagangkan. Berbeda dari barang biasa, mengumpulkannya justru melemahkan kekuatan yang mengukur segalanya lewat harga."
- Momola (NPC guide) menunjukkan 1 Warisan pertama (syair sederhana) sebagai demonstrasi

### Beat 3 — Battle Tutorial
- **Battle Params:**
  - Musuh: 3x Pedagang Bayang (kanon Umum, WB §7.8) — HP **1864 (dikoreksi hasil audit Combat Math Global — Level~43, Rajawani region pertama S4)**
  - Kondisi menang: HP 0%

### Beat 4 — Reward
- Drop: Pita Timbangan (Common Jimat, DI §1.7)
- `flag_rj_m01_complete = true`

## Fail State
- Party wipe: auto-revive 30% HP (pola tutorial standar)

---

# RJ-M02 · KEBUN YANG DIPETIK HABIS

## Trigger
- `flag_rj_m01_complete == true`
- Pemain masuk R3-R4

## Flag
- `counter_warisan_kebun` (0-3, subset dari `counter_warisan_total`)
- `flag_rj_m02_complete`

## Struktur

### Beat 1 — 3 Encounter Bertingkat
- Kebun yang sudah dipetik habis — 3 titik tersembunyi menyimpan Warisan (syair, aturan adat, nama anak yang pernah tinggal di sini)
- **Battle Params (×3):**
  - HP **2542/2542/2542 (progresif, Common-tier Level~44) — dikoreksi hasil audit Combat Math Global**
  - Kondisi menang tiap battle: HP 0%

### Beat 2 — Temukan & Sebarkan Warisan
- Tiap Warisan ditemukan → `counter_warisan_kebun += 1`, `counter_warisan_total += 1`
- **Mekanik unik:** pemain bisa "menyebarkan" tiap Warisan ke NPC di kebun (bukan menyimpan untuk diri sendiri) — setiap Warisan disebarkan, Sang Harga (belum bertemu langsung, tapi mekanik globalnya aktif sejak sekarang) melemah 1 fase secara permanen untuk battle final RJ-M05 nanti

### Beat 3 — Reward
- Drop: Parang Pedagang (Uncommon Senjata, DI §1.7) + 3 Warisan (tercatat di `counter_warisan_total`)
- `flag_rj_m02_complete = true`

## Fail State
- Party wipe di battle manapun: retry battle individual, Warisan yang sudah ditemukan tidak reset

---

# RJ-M03 · DANAU DIAM

## Trigger
- `flag_rj_m02_complete == true`
- Pemain masuk R5

## Flag
- `counter_warisan_danau` (0-5)
- `flag_rj_m03_complete`

## Struktur

### Beat 1 — Akses Malam (WB §7.12)
- Reruntuhan desa terkutuk di bawah danau HANYA bisa diakses malam hari (cahaya hijau zona khas)
- Jika pemain tiba siang hari: harus menunggu siklus berganti (tidak ada cara mempercepat selain menunggu, sesuai desain "sabar" region ini)

### Beat 2 — Menyelam & Temukan 5 Warisan
- 5 Warisan tersebar di reruntuhan desa tenggelam — puzzle eksplorasi bawah air (echo pola SM-M04 Gudang Tirta, Smarana, tapi tema berbeda: bukan gudang dagang, tapi desa yang tenggelam karena kutukan)
- `counter_warisan_danau` naik tiap ditemukan, otomatis ditambahkan ke `counter_warisan_total`

### Beat 3 — Battle: Timbangan Serakah
- **Battle Params:**
  - Musuh: Timbangan Serakah (kanon Elite, WB §7.8 — "neraca yang sudah lupa cara menimbang adil") — HP **3728 (dikoreksi hasil audit Combat Math Global — Level~43, formula ×1.5 dari Common)**
  - Battle malam hari — cahaya hijau zona memberi party +10% RES (buff lingkungan tematik, bukan dari karakter manapun)
  - Kondisi menang: HP 0%

### Beat 4 — Reward
- Drop: Kalung Rempah Palsu (Rare Pusaka, DI §1.7) + 5 Warisan
- `flag_rj_m03_complete = true`

## Fail State
- Party wipe: retry battle, Warisan yang sudah ditemukan tidak reset

---

# RJ-M04 · TUJUH RIBU CATATAN (TITAH NYAI BOKIRA)

## Trigger
- `flag_rj_m03_complete == true`
- Pemain masuk R4-R5

## Flag
- `flag_surat_kenegaraan_searched`
- `flag_nyai_bokira_recruited`

## Struktur

### Beat 1 — Investigasi Arsip
- Trigger: bicara ke Nyai Bokira (#63), ia meminta bantuan mencari 1 surat kenegaraan atas namanya dari 7000 catatan arsip
- **Encounter arsip:** bukan battle biasa — mini-game pencarian dokumen (filter/sortir dari kategori besar ke kecil, echo skala "7000" lewat UI yang menunjukkan volume arsip masif)

### Beat 2 — Twist: Surat Itu Tidak Ada
- Setelah pencarian menyeluruh: surat yang dicari TIDAK PERNAH ADA — namanya sengaja dihapus dari catatan kenegaraan
- Nyai Bokira, alih-alih putus asa, ingin "menagih" — bukan mencari kompensasi finansial, tapi pengakuan

### Beat 3 — Battle
- **Battle Params:**
  - Musuh: manifestasi birokrasi yang menghapusnya — `[PLACEHOLDER]` HP 1400
  - Nyai Bokira (ally dipinjam sementara) memakai kit kanon: Spesial "Tagihan" (damage 190% + Tercatat, +25% damage susulan 3 ronde), Pasif "Berhenti Marah" (+10% ATK permanen per debuff diterima, maks 6 — TIDAK pernah membersihkan debuff sendiri, jadi ia makin kuat makin lama battle berlangsung meski makin terdebuff)
  - Kondisi menang: HP 0%

### Beat 4 — Reward
- Drop: Senjata Tujuh Ribu Catatan (DI §3.10)
- `flag_nyai_bokira_recruited = true` — Nyai Bokira bergabung (Super Rare, Human/Akasa/Attacker)
- `flag_rj_m04_complete = true`

## Fail State
- Party wipe: retry battle, progres pencarian arsip tidak reset

---

# RJ-M05 · YANG TAK BISA DITAWAR (TITAH SANG HARGA)

**Catatan implementasi khusus:** Struktur SUDAH selaras kanon DI §3.10 sejak Kerangka Misi awal. 3 langkah kanon: (1) kumpulkan Warisan, (2) Warisan melemahkan Sang Harga permanen, (3) hadapkan ia pada sesuatu yang benar-benar tidak berharga.

## Trigger
- `flag_rj_m04_complete == true`
- Pemain masuk R6-R7

## Flag
- `flag_sang_harga_recruited`
- `flag_warisan_tak_ternilai_obtained` (Item Spesial, DI §2 — syarat: `counter_warisan_total >= 20`)
- `flag_rj_m05_complete`

## Struktur

### Beat 1 — Fase Otomatis Berkurang (Langkah 1-2 Kanon) — DIPERBARUI: tingkatan lengkap ditambahkan
- Trigger: masuk battle
- **Struktur battle dasar: 3 fase total** (Fase 1 → Fase 2 → Fase Akhir/"hadapkan yang tak berharga"). `counter_warisan_total` menentukan berapa banyak dari Fase 1-2 di-skip otomatis di awal battle — Fase Akhir TIDAK PERNAH di-skip (selalu jadi penutup, sesuai kanon langkah 3).
- **Tingkatan (BARU — sebelumnya hanya 1 ambang, sekarang berjenjang):**

| `counter_warisan_total` | Fase yang di-skip | Battle dimulai di | Catatan |
|---|---|---|---|
| 0-19 | 0 (tidak ada) | Fase 1 (penuh) | Battle standar 3 fase |
| 20-29 | 1 fase (Fase 1) | Fase 2 | Sesuai DI §2 baseline ("20+ = 1 fase hilang") |
| 30-39 | 2 fase (Fase 1+2) | Fase Akhir langsung | Battle konvensional nyaris tidak ada — party langsung ke momen "hadapkan Warisan" setelah encounter singkat pembuka |
| 40+ | 2 fase (Fase 1+2) + HP Fase Akhir dikurangi 25% | Fase Akhir langsung, versi lebih lemah | Cap di sini — TIDAK ada tingkatan lebih lanjut di atas 40, mencegah battle jadi terlalu trivial/tidak ada tantangan sama sekali |

- Ini bukan sesuatu yang dilakukan mid-battle — battle DIMULAI dengan fase yang sudah berkurang, mencerminkan "Warisan yang dikumpulkan MELEMAHKAN SECARA PERMANEN" (progres tercatat, bukan sekali battle, sesuai kanon)
- **Catatan desain:** tingkatan 30+ dan 40+ membuat battle konvensional nyaris hilang — ini DISENGAJA sebagai hadiah untuk pemain yang benar-benar berkomitmen mengumpulkan Warisan sepanjang region (echo tema: dedikasi pada yang tak ternilai secara harfiah membuat "harga" kehilangan kekuatannya). Cap di 40 mencegah battle jadi 0% tantangan sama sekali.

### Beat 2 — Battle Utama
- **Battle Params:**
  - Musuh: Sang Harga (GK #65, Legendary Human/Bayu/Attacker kanon) — **HP 5350 (dikonfirmasi final, bukan lagi placeholder)**
  - **Pasif kanon "Lahir dari Ketamakan":** +5% ATK untuk SETIAP perlengkapan Rare+ di SELURUH lapangan (party maupun dirinya sendiri) — battle ini secara mekanis MENGHUKUM party yang datang dengan gear mewah lengkap. Party yang membawa gear minim/Common justru menghadapi Sang Harga versi lebih lemah
  - **Sinergi tematik kanon (dimanfaatkan eksplisit di sini):** jika Sukma Penimbang (#95, dari RJ-S03) ada di party, pasifnya ("Mengukur Tanpa Menghakimi" — +10% seluruh stat untuk gear termurah di tim) secara alami MELAWAN strategi Sang Harga — sinergi build yang sudah dirancang berlawanan sejak level kit karakter, bukan kebetulan
  - Dasar kanon "Patok Harga": +8% damage per gear Rare+ yang dipakai TARGET spesifik — battle mendorong party mempertimbangkan gear strategis, bukan asal pakai terbaik
  - Kondisi menang Fase 1-2 (jika dimainkan penuh/sebagian): HP turun ke threshold tertentu (`[PLACEHOLDER]` 30%, sebelum masuk Fase Akhir)

### Beat 3 — Fase Akhir: Hadapkan pada yang Tak Berharga (Langkah 3 Kanon)
- Trigger: HP Sang Harga rendah (atau langsung di sini jika `counter_warisan_total >= 30`, lihat tabel tingkatan Beat 1)
- UI: pemain memilih 1 dari Warisan yang dikumpulkan untuk "dihadapkan" ke Sang Harga — sesuatu yang secara harfiah TIDAK PUNYA HARGA (bukan barang, bukan bisa dijual)
- Memilih Warisan manapun (tidak ada pilihan "salah" — SEMUA Warisan valid karena semuanya sudah oleh definisi tidak bisa diperdagangkan) → Sang Harga "memudar" (bukan HP 0% konvensional — echo bahasa kanon "ia memudar dan bergabung")
- **Jika `counter_warisan_total == 0` (skenario ekstrem, pemain skip semua Warisan sepanjang region):** opsi ini TIDAK tersedia — pemain harus mengalahkan Sang Harga lewat damage konvensional sampai HP 0%. Ini fallback untuk mencegah soft-lock, TIDAK didesain sebagai jalur utama

### Beat 4 — Recruitment & Reward
- `flag_sang_harga_recruited = true` — Sang Harga bergabung (Legendary, Human/Bayu/Attacker)
- Drop: Jimat Yang Tak Bisa Ditawar (DI §3.8/§3.10, item kanon)
- **Cek Item Spesial:** Warisan yang Tak Ternilai (DI §2) — jika `counter_warisan_total >= 20`: `flag_warisan_tak_ternilai_obtained = true`
- `flag_rj_m05_complete = true`

## Fail State
- Party wipe Fase 1-2: retry dari awal battle (fase yang sudah berkurang dari Warisan TETAP berkurang — tidak reset ke fase penuh)
- Fase akhir: tidak ada wipe condition dari jalur "hadapkan Warisan" (Sang Harga tidak menyerang mematikan di momen ini)

---

# RJ-M06 · PARA PEMIMPIN MENCATAT

## Trigger
- `flag_rj_m05_complete == true`
- Pemain masuk R7 Bale Caturnata

## Flag
- `array_bukti_dikumpulkan` (seluruh bukti sepanjang region — Warisan, entri Ensiklopedia terkait, dll.)
- `flag_rj_m06_complete`

## Struktur

### Beat 1 — Susun Catatan yang Benar
- **0 battle** — puzzle murni: susun catatan sejarah Rajawani yang BENAR dari seluruh bukti yang dikumpulkan sepanjang region (Warisan, temuan RJ-M01-M05, entri Side/Hidden Mission jika sudah dikerjakan)
- Semakin banyak Warisan/bukti yang dikumpulkan pemain sepanjang region, semakin LENGKAP catatan yang bisa disusun (tidak ada "gagal", hanya tingkat kelengkapan berbeda)

### Beat 2 — Reward & Resolusi
- Resolusi Region (WB §7.10 — sudah kondisional by design berdasarkan jumlah Warisan, tidak perlu ending binary tambahan)
- Entri Ensiklopedia final region
- `flag_rj_m06_complete = true`
- Trigger: Season 4 region kedua (Jaladri) terbuka jika belum, atau lanjut ke Season berikutnya jika Jaladri sudah selesai

## Fail State
- Tidak ada — puzzle penyusunan tidak bisa gagal, hanya bervariasi kelengkapannya

---

# RJ-S01 · TIGA PULUH TAHUN MENEBANG (TITAH DATU HONGGI)

## Trigger
- `flag_rj_m02_complete == true`
- Ditemukan R4-R6

## Flag
- `flag_datu_honggi_recruited`

## Struktur
- Puzzle penanaman: mini-game menanam kembali benih di lahan yang ditebang habis 30 tahun
- Setelah selesai: pemain dan Datu Honggi (#64) sama-sama mengakui bahwa penanaman kembali TIDAK CUKUP untuk memulihkan 30 tahun kerusakan — momen jujur tanpa penyelesaian palsu
- Battle: 1 encounter, HP **7376 — dikoreksi Ultra Rare-tier Level~44**. Pasif kanon "Karung yang Tak Pernah Penuh" (tim heal 12% tiap ia mengalahkan lawan, tapi ia -5% ATK permanen tiap kali — echo tema "menebang" yang melemahkan diri sendiri tiap kemenangan)
- Drop: Senjata Tiga Puluh Tahun Menebang (DI §3.10)
- `flag_datu_honggi_recruited = true` — Datu Honggi bergabung (Ultra Rare, Beast/Pertiwi/Attacker)

## Fail State
- Party wipe: retry battle

---

# RJ-S02 · YANG TAK BISA DIBELI (TITAH PENJAGA POLOS)

**Catatan implementasi khusus — DIKOREKSI TOTAL:** Kanon GK #96 "Cara Didapat" eksplisit: rantai 3 tahap, bertahan SENDIRIAN dari 3 gelombang di gerbang terluar Rajawani. Draf awal (dialog godaan barang mewah di R6-R7) TIDAK sesuai kanon sama sekali — sudah dikoreksi di Kerangka Misi sebelum script ini ditulis.

## Trigger
- `flag_rj_m01_complete == true` (R1-R2 accessible — gerbang terluar, echo lokasi awal region)

## Flag
- `counter_gelombang_bertahan` (0-3)
- `flag_penjaga_polos_recruited`

## Struktur

### Beat 1-3 — 3 Gelombang, Party Hanya Menyaksikan
- Penjaga Polos (#96) berjaga di gerbang terluar R1-R2, menolak bantuan
- **Battle Params (×3 gelombang, spectator):**
  - Party di-set TANPA INPUT selama sekuens ini (mirip mekanik WN-M06 Sang Lengang, tapi alasannya berbeda: di sini karena Penjaga Polos secara eksplisit MENOLAK dibantu, bukan karena kanon melarang battle partisipatif sepenuhnya)
  - Gelombang 1: `[PLACEHOLDER]` 2 musuh ringan (echo Pedagang Bayang, HP 600 masing-masing)
  - Gelombang 2: `[PLACEHOLDER]` 3 musuh sedang (HP 750 masing-masing)
  - Gelombang 3: `[PLACEHOLDER]` 1 musuh berat (HP 1400)
  - Penjaga Polos bertahan sendirian memakai kit kanon: Spesial "Tak Ternilai" (+45% DEF diri, MENGUAT +20% tambahan jika ia tidak memakai gear Rare+ — sebagai NPC bertarung, ia secara default tidak bergear, jadi bonus ini otomatis aktif penuh)
  - Hasil PASTI (bukan RNG) — Penjaga Polos menang ketiga gelombang, party murni menyaksikan ketangguhannya

### Beat 4 — Recruitment & Reward
- Trigger: 3/3 gelombang selesai
- **Sesuai kanon:** karakter "diberikan langsung tanpa Serpihan di akhir tahap ke-3" — tidak ada item perantara bertahap, langsung recruitment penuh
- `flag_penjaga_polos_recruited = true` — Penjaga Polos bergabung (Ultra Rare, Beast/Pertiwi/Tank)
- Drop: Pusaka Yang Tak Bisa Dibeli (DI §3.10)

## Fail State
- Tidak ada — battle spectator dengan hasil pasti, tidak bisa gagal (party tidak berpartisipasi)

---

# RJ-S03 · KEADILAN YANG TERSISA (TITAH SUKMA PENIMBANG)

## Trigger
- `flag_rj_m03_complete == true`
- Ditemukan R4-R5

## Flag
- `counter_timbangan_seimbang` (0-5)
- `flag_sukma_penimbang_recruited`

## Struktur
- Puzzle keadilan: seimbangkan 5 timbangan yang masing-masing "menipu" ke 1 arah (echo lore kanon Sukma Penimbang, dinamai sesuai peran menyeimbangkan)
- Battle neraca: HP **4988 — dikoreksi Rare-tier Level~44**. Pasif kanon "Mengukur Tanpa Menghakimi" (+10% seluruh stat untuk gear termurah di tim) — battle ini secara halus mendorong party TIDAK selalu memakai gear terbaik di semua slot
- Drop: Jimat Keadilan yang Tersisa (DI §3.8)
- `flag_sukma_penimbang_recruited = true` — Sukma Penimbang bergabung (Rare, Spirit/Pertiwi/Support)

## Fail State
- Timbangan tidak seimbang: bisa dicoba ulang, tidak ada penalti keras
- Party wipe: retry battle

---

# RJ-S04 · PERINGATAN TERAKHIR (TITAH SOWAHI BARA)

## Trigger
- `flag_rj_m02_complete == true`
- Ditemukan R3-R4

## Flag
- `flag_peringatan_didecode`
- `flag_sowahi_bara_recruited`

## Struktur
- Puzzle: dekode peringatan terakhir dari gunung api yang terukir di lereng (echo lore vulkanik region)
- Battle: HP **3741 — dikoreksi Uncommon-tier Level~44**. Pasif kanon "Ke Arah Laut yang Kosong" (jika tim MENGABAIKAN peringatannya — tidak ada yang bertahan/menghindar saat warning muncul — ia heal tim 10% sebagai kompensasi) — sebagai musuh, mekanik "tampilkan skill lawan berikutnya" dari Spesial-nya jadi fitur unik: battle ini secara eksplisit mengajarkan membaca telegraf serangan
- Drop: Jimat Peringatan Terakhir (DI §3.8)
- `flag_sowahi_bara_recruited = true` — Sowahi Bara bergabung (Uncommon, Beast/Teja/Support)

## Fail State
- Party wipe: retry battle, dekode tidak reset

---

# RJ-S05 · SETIA PADA TEMBOK (TITAH BALA KARANGKASA)

## Trigger
- `flag_rj_m01_complete == true`
- Ditemukan R2-R3

## Flag
- `counter_gelombang_benteng` (0-3)
- `flag_bala_karangkasa_recruited`

## Struktur
- Puzzle: pertahankan benteng dari 3 gelombang — resource management mini-game (alokasi pertahanan terbatas ke titik-titik rawan)
- Battle: HP **2542 — dikoreksi Common-tier Level~44**. Pasif kanon "Tidak Pindah Posisi" (+20% HP maks jika di barisan depan sejak awal battle) — battle mendorong party mempertahankan formasi, bukan reposisi konstan
- Drop: Pusaka Setia pada Tembok (DI §3.8)
- `flag_bala_karangkasa_recruited = true` — Bala Karangkasa bergabung (Common, Human/Pertiwi/Tank)

## Fail State
- Gelombang benteng gagal: benteng rusak sebagian, TIDAK fail permanen — battle tetap bisa dilanjutkan dengan sedikit kerugian kosmetik

---

# RJ-S06 · RATUSAN TAHUN MEMETIK (TITAH SAWANGI PALA)

*(BARU — gap-fill, karakter sebelumnya tidak punya misi sama sekali)*

## Trigger
- `flag_rj_m02_complete == true` (echo tematik dengan RJ-M02 — kebun yang dipetik habis)
- Ditemukan R2-R3

## Flag
- `counter_dipetik_dini` (0-3: rencana/kesepakatan/keberanian)
- `flag_sawangi_pala_recruited`

## Struktur
- Sawangi Pala (#58) — bunga pala yang dipetik sebelum waktunya ribuan kali selama ratusan tahun, sampai kebiasaan itu sendiri belajar terbang. Ia "memetik lebih dulu" — mengambil hal-hal sebelum sempat matang
- Puzzle: temukan 3 hal di kebun R2-R3 yang "dipetik sebelum matang" — 1 rencana yang tidak pernah selesai, 1 kesepakatan yang digagalkan terlalu dini, 1 tindakan berani yang diredam sebelum terjadi (echo tema RJ-M02, perluasan kontekstual)
- Battle: CC berbasis Bayu, HP **2542 — dikoreksi Common-tier Level~44**. Pasif kanon "Sebelum Matang" (Spesial: 1 lawan kehilangan seluruh Prana dan tidak bisa mengumpulkan Prana 2 ronde) — sebagai musuh, battle ini secara mekanis "memetik" resource party sebelum sempat dipakai
- Drop: Jimat Ratusan Tahun Memetik (DI §3.8)
- `flag_sawangi_pala_recruited = true` — Sawangi Pala bergabung (Common, Ghost/Bayu/CC)

## Fail State
- Party wipe: retry battle, progres 3 temuan tidak reset

---

# RJ-H01 · DESA DI BAWAH DANAU DIAM

## Trigger
- `flag_rj_m03_complete == true` (Area Tersembunyi R5, WB §7.12)

## Flag
- `flag_rj_h01_complete`

## Struktur
- Rekonstruksi sejarah desa yang tenggelam dari artefak di dasar danau — perluasan konten RJ-M03 (5 Warisan utama sudah didapat di Main Mission, area ini berisi konten TAMBAHAN, bukan duplikat)
- 2 encounter bawah air, HP **2542/2879 (Common+Uncommon progresif, echo skala kanon) — dikoreksi hasil audit Combat Math Global**
- Reward: 5 Warisan langka (tambahan ke `counter_warisan_total`) + entri Ensiklopedia

## Fail State
- Party wipe: retry battle

---

# RJ-H02 · YANG PUNYA NAMA (TITAH JURU CENGKIH)

## Trigger
- `flag_rj_m01_complete == true`
- Ditemukan R1-R2

## Flag
- `flag_nama_asli_found`
- `flag_juru_cengkih_recruited`

## Struktur
- Puzzle identitas: bantu Juru Cengkih (#57) menemukan namanya sendiri di balik label komoditas (echo tema region — "diingat sebagai barang, dilupakan sebagai bangsa", di sini diwujudkan literal: ia hanya dikenal lewat nama produk yang ia hasilkan)
- Battle: HP **2542 — dikoreksi Common-tier Level~44**. Pasif kanon "Umur Setiap Pohon" (heal +6% per ronde berlalu, maks +30%) — battle lebih lama = healing-nya makin kuat, insentif taktis untuk burst damage awal
- Drop: Jimat Yang Punya Nama (DI §3.8)
- `flag_juru_cengkih_recruited = true` — Juru Cengkih bergabung (Common, Human/Pertiwi/Support)

## Fail State
- Party wipe: retry battle

---

# RJ-H03 · TIDAK BERIAK (TITAH TALAGA DIAM)

## Trigger
- `flag_rj_m03_complete == true`
- Ditemukan R5

## Flag
- `flag_meditasi_complete`
- `flag_talaga_diam_recruited`

## Struktur
- **0 battle** — puzzle meditasi: duduk diam di tepi danau 3 ronde TANPA INPUT (echo pasif kanon "Berjanji": +15% RES tiap ronde tanpa ada unit tumbang — di sini diterjemahkan jadi syarat literal "tidak melakukan apa pun")
- Game menguji kesabaran pemain — UI menampilkan timer visual, godaan untuk skip/interupsi harus ditahan
- Drop: Jimat Tidak Beriak (DI §3.8)
- `flag_talaga_diam_recruited = true` — Talaga Diam bergabung (Uncommon, Spirit/Apah/Support)

## Fail State
- Interupsi sebelum 3 ronde selesai: mulai ulang hitungan, tidak ada penalti permanen

---

# RJ-H04 · BAHAN BAKU (TITAH BIKUSAGARI)

## Trigger
- `flag_rj_m02_complete == true`
- Ditemukan R4-R5

## Flag
- `flag_bahan_baku_identified`
- `flag_bikusagari_recruited`

## Struktur
- Puzzle: identifikasi "bahan baku" yang TIDAK BOLEH diolah jadi komoditas — di antara berbagai sumber daya R4-R5, temukan yang punya nilai non-ekonomi (echo tema Warisan region, versi hewani/alami)
- Battle berbasis Beast, HP **4988 — dikoreksi Rare-tier Level~44**. Pasif kanon "Tidak Pernah Bertelur" (kebal efek salin/curi/tiru, lawan yang mencoba menyalin skill-nya kehilangan 1 Prana) — battle unik untuk party yang mengandalkan skill copy/mimic (jika sistem seperti itu ada di game, di luar cakupan dokumen ini)
- Drop: Pusaka Bahan Baku (DI §3.8)
- `flag_bikusagari_recruited = true` — Bikusagari bergabung (Rare, Beast/Bayu/Attacker)

## Fail State
- Party wipe: retry battle, identifikasi tidak reset

---

# RINGKASAN DEPENDENCY GRAPH — REGION 7

```
RJ-M01 (Pelabuhan Rempah) ──┬──→ RJ-S02 (Penjaga Polos, spectator 3 gelombang)
   ↓                         ├──→ RJ-S05 (Bala Karangkasa)
   ↓                         └──→ RJ-H02 (Juru Cengkih)
RJ-M02 (Kebun yang Dipetik Habis) ──┬──→ RJ-S01 (Datu Honggi)
   ↓                                 ├──→ RJ-S04 (Sowahi Bara)
   ↓                                 ├──→ RJ-S06 (Sawangi Pala, BARU)
   ↓                                 └──→ RJ-H04 (Bikusagari)
RJ-M03 (Danau Diam) ──┬──→ RJ-S03 (Sukma Penimbang)
   ↓                   ├──→ RJ-H01 (Desa di Bawah Danau Diam)
   ↓                   └──→ RJ-H03 (Talaga Diam)
RJ-M04 (Nyai Bokira)
   ↓
RJ-M05 (Sang Harga) ──[counter_warisan_total menentukan fase awal & Item Spesial]
   ↓
RJ-M06 (Para Pemimpin Mencatat) ── 0 battle, closure
```

## Titik Kritis Dependency

1. **`counter_warisan_total` adalah counter PALING BERPENGARUH di region** — dikumpulkan dari RJ-M02, RJ-M03, RJ-H01, mempengaruhi jumlah fase awal Sang Harga (RJ-M05) DAN syarat Item Spesial Warisan yang Tak Ternilai (butuh 20+). Implementasi harus memastikan counter ini persisten dan akurat lintas seluruh misi yang berkontribusi.

2. **RJ-S02 (Penjaga Polos) battle spectator dengan HASIL PASTI** — berbeda dari WN-M06 (Sang Lengang) yang juga spectator tapi untuk alasan naratif kanon, di sini alasannya adalah karakter yang menolak dibantu. Kedua battle spectator di game ini punya JUSTIFIKASI NARATIF BERBEDA meski mekanik implementasinya mirip (party tanpa input) — penting dicatat agar tidak dianggap "pola yang sama diulang" tanpa alasan.

3. **Sinergi Sang Harga vs Sukma Penimbang/Penjaga Polos** (RJ-M05 Beat 2) adalah fitur build-crafting yang sudah dirancang di level kit karakter kanon — pemain yang membawa kedua karakter counter ini ke battle final akan punya pengalaman berbeda signifikan dari yang tidak. Ini bagus untuk replay value, tapi perlu dipastikan battle TETAP fair untuk party yang TIDAK membawa mereka (bukan hard-locked di belakang kepemilikan karakter spesifik).

---

# ITEM TINDAK LANJUT — STATUS SETELAH KEPUTUSAN

1. **HP Sang Harga — ✅ FINAL.** Dikonfirmasi 5350 (bukan lagi placeholder). Diterapkan di RJ-M05 Beat 2.

2. **Tingkatan fase berdasarkan `counter_warisan_total` — ✅ FINAL, tingkatan lengkap ditambahkan.** 4 tingkat: 0-19 (normal), 20-29 (skip 1 fase, sesuai DI §2 baseline), 30-39 (skip 2 fase, langsung Fase Akhir), 40+ (skip 2 fase + HP Fase Akhir -25%, DI-CAP di sini agar battle tidak trivial sepenuhnya). Diterapkan di RJ-M05 Beat 1.

3. **RJ-S02 (Penjaga Polos) HP musuh generik** — masih placeholder kasar (600/750/1400), belum melalui pass balancing.

4. **Combat math placeholder** — status sama seperti R1-R6: direvisi setelah Quest Script 9 region selesai.

---

*Quest Script Region 7 — Draf v0.2 · September 2026*
*Status: 16/16 misi Rajawani di-script detail (6 Main + 6 Side + 4 Hidden). 0 monster region baru tanpa alasan. 1 gap-fill (Sawangi Pala) + 1 koreksi "Cara Didapat" besar (Penjaga Polos). Sang Harga diverifikasi selaras kanon. Sinergi tematik kanon (Sang Harga vs Sukma Penimbang/Penjaga Polos) dimanfaatkan eksplisit di battle final. Seluruh 2 item tindak lanjut prioritas dari v0.1 SELESAI: HP dikonfirmasi (5350), tingkatan fase Warisan ditambahkan (4 tingkat, di-cap di 40+). 2 item sisa (HP musuh generik RJ-S02, combat math global) tetap ditunda sesuai kebijakan lintas-region. Belum diimplementasi, belum playtest.*
