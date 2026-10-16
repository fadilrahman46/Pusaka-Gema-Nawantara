# QUEST SCRIPT — REGION 8: JALADRI
# PUSAKA: GEMA NAWANTARA

**Versi:** Draf v0.1 — Quest Script Detail
**Status:** 🟡 SIAP REVIEW TEKNIS — belum diimplementasi, belum playtest
**Rujukan kanon:**
- `World_Bible_Pusaka_Gema_Nawantara_v5.1.md` §BAB 8 (Jaladri)
- `GUIDE_KARAKTER_100_Nawantara_FINAL_v1.1.md` #66-74, #97-98
- `DOKUMEN_ITEM_Pusaka_Gema_Nawantara_FINAL_v1.md` §1.8, §2, §3.9, §3.10, §3.11
- `KERANGKA_MISI_Pusaka_Gema_Nawantara.md` v1.3 (kerangka sumber — 16 misi Jaladri, sudah termasuk 1 gap-fill + 1 koreksi Cara Didapat)
**Tanggal:** September 2026

**Verifikasi pra-scripting (checklist established R1-R7):**
- **Monster:** WB §8.8 sudah punya "Serpihan Hanyut" (Umum) dan "Ombak Tak Bertuan" (Elite) — dipakai langsung.
- **Item/Titah:** Seluruh 10 karakter roster standar Jaladri (#66-72, #74, #97-98) di-cross-check ke DI §3.9. **1 gap ditemukan** (Abu Tembara #68 — tidak punya misi) — diperbaiki di Kerangka Misi v1.3.
- **Anjala Nirmala (#73) dikonfirmasi BUKAN gap** — DI §3.11 eksplisit menyatakan "Opsi (a)": ia sengaja tidak punya item/Titah individual, direpresentasikan sepenuhnya lewat Item Spesial "Serpihan Terakhir" (30/40 progres) dan Pusaka "Serpihan Anjala Nirmala (Utuh Sebagian)".
- **"Cara Didapat" Legendary (Naga Sasra #74) diverifikasi SEBELUM scripting** — dikonfirmasi selaras Kerangka Misi (bergabung lewat jalur "biarkan tetap banyak/tersebar", BUKAN jalur "satukan").
- **Ditemukan 1 "Cara Didapat" kanon tambahan yang TIDAK cocok draf awal:** Gema Ganda (#98) — kanon rantai 5 tahap (terbanyak di antara 7 Ultra Rare baru, sejalan tema "memilih menjadi banyak"), mengumpulkan pantulan suara di 5 titik berbeda, BUKAN "1 encounter" seperti draf awal. Dikoreksi di Kerangka Misi sebelum dokumen ini ditulis.
- **Ditemukan benang merah mekanik lintas-karakter:** banyak karakter Jaladri (Sekar Nyalu #66, Naga Sasra #74, Penjaga Gelombang #97, Gema Ganda #98) punya pasif yang menguat/melemah berdasarkan JUMLAH SEKUTU REGION JALADRI di party — "kuat saat banyak, lemah saat sendirian", echo tema region "Yang Pecah agar Tak Menjadi Milik Siapa Pun". Dimanfaatkan eksplisit di desain battle.

---

## KONVENSI SCRIPT

Sama seperti Quest Script R1-R7. Angka HP non-kanon tetap `[PLACEHOLDER — akan direvisi]`. Pasif/skill dikutip dari GK ditandai `(kanon)`.

**Catatan khusus Region 8:** Mekanik signature Yang Tersebar — 40 serpihan avatar Anjala Nirmala tersebar seluruh region, dikumpulkan progresif (3-7 per avatar berbeda). Progres `counter_serpihan_total` dipakai lintas JL-M01-M04, menentukan akses ke Item Spesial (30/40) dan konten JL-M05-M06.

---

# JL-M01 · PANTAI SELATAN

## Trigger
- Season 4 region kedua terbuka (Rajawani sudah dimulai, atau pemain memilih Jaladri duluan)

## Flag
- `flag_jl_m01_complete`
- `flag_serpihan_tutorial_seen`
- `counter_serpihan_total` (global region, 0-40, dipakai sepanjang JL-M01-M04 dan syarat Item Spesial)

## Struktur

### Beat 1 — Tiba di Pantai Selatan
- Cutscene: pecahan-pecahan avatar tersebar di sepanjang pantai — kontras visual dengan region lain, di sini KEHANCURAN itu sendiri adalah bentuk perlindungan (echo judul region "Yang Pecah agar Tak Menjadi Milik Siapa Pun")

### Beat 2 — Tutorial Kumpul Serpihan
- UI popup: "Setiap avatar tersebar jadi 3-7 serpihan. Kumpulkan semuanya untuk memulihkan sebagian kekuatannya."
- Tutorial: 1 avatar sederhana, 3 serpihan, mudah ditemukan berdekatan

### Beat 3 — Battle Tutorial
- **Battle Params:**
  - Musuh: 3x Serpihan Hanyut (kanon Umum, WB §8.8) — HP **2117 (dikoreksi hasil audit Combat Math Global — Level~49, Jaladri region kedua S4)**
  - Kondisi menang: HP 0%

### Beat 4 — Reward
- Drop: Pecahan Karang (Common Jimat, DI §1.8)
- `flag_jl_m01_complete = true`

## Fail State
- Party wipe: auto-revive 30% HP (pola tutorial standar)

---

# JL-M02 · SAWAH TERASERING

## Trigger
- `flag_jl_m01_complete == true`
- Pemain masuk J3-J4

## Flag
- `counter_serpihan_j2` (subset counter_serpihan_total)
- `flag_jl_m02_complete`

## Struktur

### Beat 1 — 3 Encounter Bertingkat
- Sawah terasering menyimpan lebih banyak serpihan, tapi TERCAMPUR dari beberapa avatar berbeda
- **Battle Params (×3):** HP **2879/2879/2879 (progresif, Common-tier Level~50) — dikoreksi hasil audit Combat Math Global**

### Beat 2 — Puzzle Identifikasi
- Tiap serpihan harus diidentifikasi milik avatar mana lewat warna, bentuk, resonansi elemen (mini-game matching, bukan sekadar kumpul)
- **Salah gabung serpihan dari avatar berbeda → monster muncul** (penalti aktif, bukan cuma soft-block — mendorong ketelitian)

### Beat 3 — Reward
- Drop: Serpihan Anjala Kecil (Uncommon Pusaka, DI §1.8)
- `counter_serpihan_total` bertambah signifikan (menuju progres 30/40)
- `flag_jl_m02_complete = true`

## Fail State
- Salah gabung serpihan: battle penalti muncul, tapi TIDAK menghapus serpihan yang sudah benar — hanya kehilangan waktu, bukan progres

---

# JL-M03 · LAUT SAHASRA

## Trigger
- `flag_jl_m02_complete == true`
- Pemain masuk J5

## Flag
- `counter_serpihan_j3`
- `flag_jl_m03_complete`

## Struktur

### Beat 1 — Event Mingguan (WB §8.2)
- Laut Sahasra punya window waktu spesifik (event mingguan in-game) — di luar window ini, area masih bisa dimasuki tapi serpihan tersembunyi tidak muncul

### Beat 2 — Puzzle Navigasi Cahaya Biologis
- Ikuti pola cahaya biologis (bioluminesensi) untuk menemukan serpihan yang terkubur di dasar laut
- **Battle malam lebih mudah** (WB §8.12) — cahaya alami membantu navigasi, sistem harus memberi bonus visibility/petunjuk lebih jelas malam hari dibanding siang

### Beat 3 — Battle: Ombak Tak Bertuan
- **Battle Params:**
  - Musuh: Ombak Tak Bertuan (kanon Elite, WB §8.8) — HP **4235 (dikoreksi hasil audit Combat Math Global — Level~49, formula ×1.5 dari Common)**
  - Kondisi menang: HP 0%

### Beat 4 — Reward
- Drop: Serpihan Anjala Sedang (Rare Pusaka, DI §1.8)
- `flag_jl_m03_complete = true`

## Fail State
- Party wipe: retry battle, progres serpihan tidak reset

---

# JL-M04 · PADANG ABU

## Trigger
- `flag_jl_m03_complete == true`
- Pemain masuk J6

## Flag
- `counter_serpihan_j4`
- `flag_peta_mental_progress` (implementasi figuratif, lihat catatan)
- `flag_jl_m04_complete`

## Struktur

### Beat 1 — Zona yang Menghapus Peta
- **Mekanik unik (WB §8.2):** peta yang digambar pemain terhapus PERMANEN tiap kali keluar-masuk J6 — implementasi: HUD peta untuk zona ini di-reset tiap loading screen masuk/keluar J6, memaksa pemain benar-benar mengingat, bukan mengandalkan marker persisten
- Kapten Ndiru (NPC guide) memandu, tapi TIDAK bisa menggambar ulang peta untuk pemain — ia hanya memberi hint verbal

### Beat 2 — 2 Encounter Berat
- **Battle Params (×2):** HP **2879/4238 (Common+Uncommon progresif) — dikoreksi hasil audit Combat Math Global** — "berat" sesuai deskripsi kerangka asli, lebih tinggi dari battle J1-J5

### Beat 3 — Reward
- Drop: Serpihan Anjala Besar (Super Rare Pusaka, DI §1.8)
- `flag_jl_m04_complete = true`
- **Cek progres:** total `counter_serpihan_total` dari JL-M01-M04 seharusnya mendekati/mencapai 30/40 di titik ini bagi pemain yang mengerjakan seluruh Main Mission — sisa serpihan (menuju 40 penuh) tersedia lewat Side/Hidden Mission

## Fail State
- Party wipe: retry battle, peta tetap terhapus sesuai mekanik (bukan reset tambahan, ini memang perilaku normal zona)

---

# JL-M05 · KERAJAAN TERKUBUR

**Catatan implementasi khusus:** Titik keputusan biner PALING PENTING region — "satukan" vs "biarkan tersebar", TIDAK BISA diubah setelah dipilih (permanen untuk playthrough, mirip pola KD-M04).

## Trigger
- `flag_jl_m04_complete == true`
- Pemain masuk J7

## Flag
- `flag_jl_unity_choice` (enum: UNIFIED / SCATTERED) — **PALING PENTING di region**, menentukan JL-M06 sepenuhnya
- `flag_jl_m05_complete`

## Struktur

### Beat 1 — Puzzle Dialog 3 Cabang
- Echo 5 kerajaan yang pernah meminang Anjala Nirmala (lore historis region) — pemain diberi konteks lewat 3 cabang dialog dengan echo/fragmen ingatan berbeda
- Ini BUKAN penentu pilihan akhir — murni membangun konteks emosional sebelum Beat 2

### Beat 2 — Pilihan Biner Permanen
- **Dialog Branch (PERMANEN, tidak bisa diubah setelah dipilih):**
  - `[Satukan — demi kekuatan]` → `flag_jl_unity_choice = UNIFIED`
  - `[Biarkan tetap banyak — demi kedamaian]` → `flag_jl_unity_choice = SCATTERED`
- **UI WAJIB menampilkan peringatan eksplisit** sebelum konfirmasi akhir (pola sama NR-H03 Nirwasita) — ini keputusan besar dengan konsekuensi recruitment berbeda total, pemain harus sadar penuh sebelum memilih

### Beat 3 — Battle Awal (Sebelum Percabangan Penuh)
- **Battle Params:**
  - Musuh: manifestasi awal Naga Sasra — **HP 2750 — dikoreksi hasil audit Combat Math Global, ditetapkan 50% dari HP penuh Legendary (5500) karena ini eksplisit "belum battle final"** (battle pembuka, BELUM battle final — battle final penuh ada di JL-M06)
  - Kondisi menang: HP turun ke threshold (`[PLACEHOLDER]` 50%), lalu transisi ke JL-M06

### Beat 4 — Reward Sementara
- Drop: progres menuju Item Spesial (dicek penuh di JL-M06)
- `flag_jl_m05_complete = true`

## Fail State
- Party wipe: retry battle, pilihan `flag_jl_unity_choice` TIDAK reset (sekali dipilih, permanen bahkan lewat wipe/retry)

---

# JL-M06 · SERIBU JADI SATU ATAU SERIBU TETAP SERIBU

**Catatan implementasi khusus:** Battle bercabang total berdasarkan `flag_jl_unity_choice` dari JL-M05. Ini bukan variasi kecil — dua battle yang SUBSTANSIAL berbeda.

## Trigger
- `flag_jl_m05_complete == true`
- Lanjutan langsung dari JL-M05 (tidak ada gap zona)

## Flag
- `flag_anjala_nirmala_recruited`
- `flag_naga_sasra_recruited`
- `flag_serpihan_terakhir_obtained` (Item Spesial, DI §2 — syarat: `counter_serpihan_total >= 30`)
- `flag_jl_m06_complete`

## Struktur

### Beat 1A — Jalur UNIFIED (Satukan)
- **Battle Params:**
  - Musuh: Anjala Nirmala versi utuh — **HP 4800 (dikonfirmasi final — nilai bespoke di antara Ultra Rare Level 1 dan Legendary Level 1, karena ia tidak punya baseline tier resmi per DI §3.11 Opsi (a); lebih rendah dari Naga Sasra karena ini bukan Legendary tier, meski "utuh")**
  - **Kekuatannya bergantung `counter_serpihan_total`:** jika `>= 30`, ia dapat 1 skill tambahan unik (sesuai DI §2 "Anjala Nirmala kalau disatukan mendapat 1 skill tambahan unik") — implementasi: 1 Spesial tambahan di luar kit dasar kanonnya (Spesial "Yang Tidak Jadi", Pamungkas "Perang yang Tak Jadi Dimulai")
  - Battle konvensional, tidak ada mekanik spectator

### Beat 1B — Jalur SCATTERED (Biarkan Tersebar)
- **Battle Params:**
  - Musuh: Naga Sasra (GK #74, Legendary Beast/Bayu/Attacker kanon) — **HP 5500 (dikonfirmasi final, bukan lagi placeholder)**
  - **Pasif kanon "Yang Memilih Banyak":** kebal SELURUH Crowd Control selama ada ≥3 sekutu hidup ("terlalu tersebar untuk ditangkap"); saat sekutu hidup turun di bawah 3, ia +40% ATK ("memusat") — **interpretasi dikonfirmasi FINAL:** pasif ini merujuk ke SEKUTU PARTY PEMAIN yang masih hidup (bukan sekutunya sendiri, karena ia solo) — ironi tematik, Naga Sasra "membaca" kondisi party, echo tema ia adalah cerminan dari kondisi "tersebar"
  - **Battle jadi lebih sulit jika party kehilangan anggota** (turun di bawah 3 hidup memicu +40% ATK Naga Sasra) — mendorong strategi defensif/preservasi party, bukan agresif/all-in
  - Basis Pamungkas 320% (kanon, tertinggi di antara seluruh karakter game — dicatat eksplisit di DI §3 sebagai kasus khusus pass balancing)
  - **Bonus Serpihan Terakhir jalur SCATTERED (BARU — paralel dengan bonus Anjala Nirmala di jalur UNIFIED, tapi berlawanan tema):** jika `counter_serpihan_total >= 30`, Naga Sasra mendapat pasif tambahan **"Sisa yang Tersebar"** — ambang batas pasif "Yang Memilih Banyak" diperlebar: kebal CC sekarang aktif selama ≥2 sekutu party hidup (turun dari ≥3, lebih mudah dipertahankan), DAN kondisi "memusat" (+40% ATK) sekarang baru terpicu saat sekutu turun ke 0 (bukan <3, jadi lebih sulit dipicu). **Tema:** makin lengkap serpihan yang dikumpulkan pemain, makin sulit Naga Sasra "dipaksa menyatu/memusat" — dedikasi pemain terhadap keberagaman fragmennya membuatnya makin teguh tersebar, cerminan langsung dari pilihan SCATTERED itu sendiri

### Beat 2 — Recruitment & Reward (Kedua Jalur)
- Jalur UNIFIED: `flag_anjala_nirmala_recruited = true` — Anjala Nirmala bergabung. **TIDAK ada item unik individual** (sesuai DI §3.11 Opsi (a) — representasinya lewat Item Spesial saja)
- Jalur SCATTERED: `flag_naga_sasra_recruited = true` — Naga Sasra bergabung. Drop: Senjata Seribu Jadi Satu (DI §3.9/§3.10, item kanon)
- **Cek Item Spesial (KEDUA jalur):** Serpihan Terakhir (DI §2) — jika `counter_serpihan_total >= 30`: `flag_serpihan_terakhir_obtained = true`. **Efek sekarang DIKONFIRMASI FINAL untuk kedua jalur:** UNIFIED = Anjala Nirmala dapat skill tambahan "Yang Tidak Jadi"/"Perang yang Tak Jadi Dimulai" (sudah kanon DI §2). SCATTERED = Naga Sasra dapat pasif tambahan "Sisa yang Tersebar" (BARU, lihat Beat 1B) — kedua jalur SAMA-SAMA memberi hadiah nyata untuk pemain yang mengumpulkan 30+ serpihan, tidak ada jalur yang "dirugikan" karena idak dapat bonus
- `flag_jl_m06_complete = true`

## Fail State
- Party wipe jalur UNIFIED: retry battle konvensional
- Party wipe jalur SCATTERED: retry battle, `flag_jl_unity_choice` tetap SCATTERED (tidak bisa ganti pilihan lewat wipe/retry)

---

# JL-S01 · SERIBU BAGIAN (TITAH MANDARASMI)

## Trigger
- `flag_jl_m02_complete == true`
- Ditemukan J4-J6

## Flag
- `counter_kerajaan_simulasi` (0-5)
- `flag_mandarasmi_recruited`

## Struktur
- Puzzle dialog cabang: simulasi pilihan 5 kerajaan yang pernah meminang Anjala Nirmala (echo langsung konteks JL-M05 Beat 1) — pemain menjalani skenario "bagaimana jika salah satu kerajaan berhasil"
- Di akhir simulasi: pilih opsi ke-6 yang TIDAK ada di antara 5 pilihan asli — "membagi diri" (foreshadowing eksplisit tema JL-M05-M06)
- Battle: 1 encounter per bagian (5 encounter ringan, 1 per skenario kerajaan), HP **2879 — dikoreksi Common-tier Level~50** masing-masing. Pasif kanon "Menghitung, Bukan Berkorban" (+1 Prana tim per 2 kali damage dicegah lewat pembagian/penghindaran) — battle mengajarkan mekanik damage-sharing sebelum party menghadapi battle serupa di JL-M06 jalur UNIFIED
- Drop: Jimat Seribu Bagian (DI §3.10)
- `flag_mandarasmi_recruited = true` — Mandarasmi bergabung (Super Rare, Human/Akasa/Support)

## Fail State
- Party wipe di encounter manapun: retry individual, skenario yang sudah dijalani tidak reset

---

# JL-S02 · SERIBU ORANG MENAHAN SATU OMBAK (TITAH PENJAGA GELOMBANG)

## Trigger
- `flag_jl_m03_complete == true`
- Ditemukan J4-J5

## Flag
- `counter_gelombang_timing` (0-3)
- `flag_penjaga_gelombang_recruited`

## Struktur
- Mini-game timing: 3 gelombang, bantu penjaga pantai menahan masing-masing
- Di gelombang ke-4 (klimaks): pemain berdiri BERSAMANYA, bukan menggantikannya — echo tema "seribu orang menahan satu ombak" (kolektif, bukan individual heroik)
- Battle: HP **6965 — dikoreksi Super Rare-tier Level~50**. Pasif kanon "Lemah Sendiri, Kuat Bersama" (-10% stat dengan 0-1 sekutu Jaladri, +20% dengan 3+ sekutu Jaladri) — battle secara mekanis lebih mudah jika party sudah membawa beberapa karakter Jaladri lain yang sudah direkrut
- Drop: Pusaka Seribu Orang Menahan Satu Ombak (DI §3.10)
- `flag_penjaga_gelombang_recruited = true` — Penjaga Gelombang bergabung (Super Rare, Human/Apah/Tank)

## Fail State
- Timing gelombang gagal: bisa diulang, tidak ada penalti permanen
- Party wipe: retry battle

---

# JL-S03 · SERIBU MENYAHUT SATU (TITAH GEMA GANDA)

**Catatan implementasi khusus — DIKOREKSI TOTAL:** Kanon GK #98 "Cara Didapat": rantai 5 tahap (TERBANYAK di antara 7 UR baru, sengaja mencerminkan tema "memilih menjadi banyak"), mengumpulkan pantulan suara di 5 titik berbeda SEBELUM bisa menyatu.

## Trigger
- `flag_jl_m01_complete == true` (tersedia sejak awal region, tersebar seluruh zona)

## Flag
- `counter_pantulan_suara` (0-5, tersebar J1-J7)
- `flag_gema_ganda_recruited`

## Struktur

### Beat 1-5 — 5 Titik Pantulan Suara
- 5 lokasi tersebar seluruh region (J1, J2-J3, J4, J5, J7 — 1 titik per zona utama), masing-masing 1 encounter akustik ringan
- Tiap titik: pemain "berteriak" (input UI, bukan literal suara mikrofon) dan menerima 1 pantulan — pantulan-pantulan ini adalah fragmen Gema Ganda yang belum menyatu
- **Battle Params (×5, ringan):** HP **2879 (Common-tier Level~50, flat tiap titik — bukan boss, hanya fragmen persiapan)** per titik, meningkat sedikit tiap titik berikutnya

### Beat 6 — Penyatuan di Titik Terakhir
- Trigger: 5/5 pantulan terkumpul
- Di titik ke-5 (J7, lokasi final): teriakkan nama ke laut, terima SELURUH pantulan sekaligus TANPA memilih "yang asli" — kelima fragmen menyatu jadi 1 entitas utuh
- **Battle Params (final):**
  - Musuh: Gema Ganda utuh — HP **8356 — dikoreksi hasil audit Combat Math Global, Ultra Rare-tier di-skala ke Level~50 Jaladri**
  - Pasif kanon "Tak Ada yang Asli" (40% peluang CC yang mengenainya "menyahut"/tersalin ke 1 lawan acak durasi setengah) — sebagai musuh, battle ini punya elemen RNG defensif yang membuat CC murni kurang reliable, mendorong damage campuran
  - Kondisi menang: HP 0%

### Beat 7 — Recruitment & Reward
- Drop: Jimat Seribu Menyahut Satu (DI §3.10)
- `flag_gema_ganda_recruited = true` — Gema Ganda bergabung (Ultra Rare, Ghost/Akasa/CC)

## Fail State
- Party wipe di battle titik manapun (1-5 atau final): retry battle spesifik, pantulan yang sudah terkumpul tidak reset

---

# JL-S04 · SATU BATU UNTUK IBU (TITAH DAYAN NADHA)

## Trigger
- `flag_jl_m02_complete == true`
- Ditemukan J3-J4

## Flag
- `flag_batu_spesifik_found`
- `flag_dayan_nadha_recruited`

## Struktur
- Puzzle emosional: temukan 1 batu spesifik di antara ribuan — clue dari lore (Dayan Nadha #69 mencari batu yang jadi penanda makam simbolis untuk ibunya, tenggelam bersama desa)
- Battle: HP **4238 — dikoreksi Uncommon-tier Level~50**. Pasif kanon "Tambahan Orang Lain" (+50% efek buff ATK yang diterima, TAPI -25% heal yang diterima) — battle mengajarkan trade-off build (ia bagus di-buff ATK, buruk di-heal, party harus menyesuaikan strategi dukungan)
- Drop: Senjata Satu Batu untuk Ibu (DI §3.9)
- `flag_dayan_nadha_recruited = true` — Dayan Nadha bergabung (Uncommon, Human/Apah/Attacker)

## Fail State
- Party wipe: retry battle, progres pencarian batu tidak reset

---

# JL-S05 · BAGIAN YANG TAK DIINGINKAN (TITAH CUPAKA LOBA)

## Trigger
- `flag_jl_m02_complete == true`
- Ditemukan J4-J5

## Flag
- `flag_serpihan_tak_diinginkan_identified`
- `flag_cupaka_loba_recruited`

## Struktur
- Puzzle: identifikasi serpihan yang TIDAK ADA yang menginginkan di antara berbagai serpihan tersebar — justru itu yang paling penting (echo lore Cupaka Loba #72: menyerap apa yang orang lain tolak)
- Battle: HP **5651 — dikoreksi Rare-tier Level~50**. Pasif kanon "Ia Setuju" (tidak bisa dibersihkan dari debuff, TIAP debuff aktif padanya +8% HP maks & +6% ATK) — battle unik di mana men-debuff dia justru memperkuatnya, mendorong party menghindari CC/debuff terhadapnya dan fokus damage murni
- Drop: Jimat Bagian yang Tak Diinginkan (DI §3.9)
- `flag_cupaka_loba_recruited = true` — Cupaka Loba bergabung (Rare, Ghost/Teja/Attacker)

## Fail State
- Party wipe: retry battle, identifikasi tidak reset

---

# JL-S06 · SATU MALAM (TITAH ABU TEMBARA)

*(BARU — gap-fill, karakter sebelumnya tidak punya misi sama sekali)*

## Trigger
- `flag_jl_m04_complete == true` (J6 Padang Abu accessible — zona sudah cocok tematik dengan nama karakter)

## Flag
- `counter_cetakan_kerajaan` (0-3)
- `flag_abu_tembara_recruited`

## Struktur
- Abu Tembara (#68) — abu yang jatuh di atas tiga kerajaan kecil dalam satu malam, menyimpan bentuk mereka sebagai cetakan, bukan penghancur — semua yang ada di bawah masih terawetkan dalam posisi terakhirnya
- Puzzle: temukan 3 "cetakan" kerajaan di bawah abu J6 — bentuk terakhir yang terawetkan, persis posisi terakhir mereka (echo puzzle observasi/arkeologi, tapi fokus pada momen BEKU, bukan kronologi seperti puzzle serupa di region lain)
- **Catatan implementasi:** ini TIDAK bertentangan dengan mekanik "peta terhapus" JL-M04 — cetakan yang ditemukan di sini adalah temuan permanen (bukan navigasi), berbeda dari sistem peta sementara J6
- Battle: Attacker berbasis Teja, HP **2879 — dikoreksi Common-tier Level~50**. Pasif kanon "Cetakan" via Spesial (damage 180% + *Membatu* 1 ronde, durasi 2 ronde jika target sudah berdebuff) — battle mendemonstrasikan stacking CC, party harus memperhatikan urutan debuff yang diterapkan
- Drop: Senjata Satu Malam (DI §3.9)
- `flag_abu_tembara_recruited = true` — Abu Tembara bergabung (Common, Ghost/Teja/Attacker)

## Fail State
- Party wipe: retry battle, cetakan yang sudah ditemukan tidak reset

---

# JL-H01 · KARANG KAPTEN NDIRU

## Trigger
- `flag_jl_m04_complete == true` (Area Tersembunyi J4, WB §8.12)

## Flag
- `array_bangkai_fragmen` (assembly puzzle)
- `flag_jl_h01_complete`

## Struktur
- Rekonstruksi bangkai kapal Kapten Ndiru dari fragmen — mini-game assembly (susun potongan jadi bentuk kapal utuh, visual puzzle)
- 2 encounter bawah air, HP **4238/5651 (Uncommon+Rare progresif) — dikoreksi hasil audit Combat Math Global**
- Reward: Warisan langka (lintas-tematik dengan Rajawani — item Warisan bisa muncul di region manapun sebagai lore-flavor, TIDAK secara mekanis terhubung ke `counter_warisan_total` Rajawani kecuali sistem global dirancang lintas-region, di luar cakupan dokumen ini) + entri Ensiklopedia

## Fail State
- Party wipe: retry battle, assembly tidak reset

---

# JL-H02 · EMPAT RATUS JABAT TANGAN (TITAH PADU ROTAN)

## Trigger
- `flag_jl_m01_complete == true`
- Ditemukan J2-J3

## Flag
- `counter_jabat_tangan` (implementasi figuratif, TIDAK literal 400 interaksi — lihat catatan)
- `flag_padu_rotan_recruited`

## Struktur
- Puzzle sosial: "jabat tangan 400 NPC" — figuratif, diimplementasi sebagai interaksi berulang bertema kepercayaan (mirip pola "500 pagi" Sabdaguna di Himagiri — TIDAK literal 400 iterasi, tapi direpresentasikan lewat beberapa interaksi kunci yang mewakili skala besar)
- **0 battle** di bagian puzzle utama
- Battle: 1 encounter setelah puzzle sosial selesai, HP **2879 — dikoreksi Common-tier Level~50**. Pasif kanon "Darah untuk Hujan" (tiap 25% HP maks hilang, tim heal 8%) — battle mengajarkan bahwa membiarkan dia sedikit terluka justru menguntungkan tim, kontra-intuitif dari insting "lindungi semua unit"
- Drop: Pusaka Empat Ratus Jabat Tangan (DI §3.9)
- `flag_padu_rotan_recruited = true` — Padu Rotan bergabung (Common, Beast/Pertiwi/Tank)

## Fail State
- Party wipe: retry battle, puzzle sosial tidak reset

---

# JL-H03 · SEJUTA EKOR (TITAH SEKAR NYALU)

## Trigger
- `flag_jl_m01_complete == true`
- Ditemukan J1-J2

## Flag
- `flag_ikan_dihitung`
- `flag_sekar_nyalu_recruited`

## Struktur
- Puzzle observasi: hitung ikan yang melewati terumbu dalam waktu terbatas — mini-game observasi cepat (echo lore "sejuta ekor", diimplementasi sebagai estimasi/counting game, bukan hitungan literal jutaan)
- Battle berbasis Beast, HP **2879 — dikoreksi Common-tier Level~50**. Pasif kanon "Bukan Kehilangan" (saat tumbang, seluruh buff aktif padanya berpindah ke tim) — battle mendemonstrasikan bahwa kehilangan dia di tengah battle TIDAK sepenuhnya merugikan, buff-nya tetap berguna
- Drop: Jimat Sejuta Ekor (DI §3.9)
- `flag_sekar_nyalu_recruited = true` — Sekar Nyalu bergabung (Common, Spirit/Apah/Support)

## Fail State
- Hitungan ikan salah: bisa dicoba ulang, tidak ada penalti keras
- Party wipe: retry battle

---

# JL-H04 · DINDING YANG MENUTUP (TITAH SAGARANAK)

## Trigger
- `flag_jl_m02_complete == true`
- Ditemukan J3-J4

## Flag
- `flag_dinding_tersembunyi_found`
- `flag_sagaranak_recruited`

## Struktur
- Puzzle lingkungan: temukan dinding tersembunyi yang menutup — echo mekanik region (Yang Tersebar, tapi di sini diwujudkan sebagai penghalang fisik alih-alih serpihan avatar)
- Battle: HP **4238 — dikoreksi Uncommon-tier Level~50**. Pasif kanon "Tahanan, Bukan Penjaga" (tidak bisa berpindah barisan/mundur, sebagai gantinya +35% HP maks) — battle mengajarkan positioning permanen, party harus merencanakan formasi sebelum battle dimulai karena tidak bisa diubah pasca-mulai
- Drop: Pusaka Dinding yang Menutup (DI §3.9)
- `flag_sagaranak_recruited = true` — Sagaranak bergabung (Uncommon, Ghost/Pertiwi/CC)

## Fail State
- Party wipe: retry battle, temuan dinding tidak reset

---

# RINGKASAN DEPENDENCY GRAPH — REGION 8

```
JL-M01 (Pantai Selatan) ──┬──→ JL-S03 (Gema Ganda, 5 titik tersebar seluruh region)
   ↓                       ├──→ JL-H02 (Padu Rotan)
   ↓                       └──→ JL-H03 (Sekar Nyalu)
JL-M02 (Sawah Terasering) ──┬──→ JL-S01 (Mandarasmi)
   ↓                         ├──→ JL-S04 (Dayan Nadha)
   ↓                         ├──→ JL-S05 (Cupaka Loba)
   ↓                         └──→ JL-H04 (Sagaranak)
JL-M03 (Laut Sahasra) ──┬──→ JL-S02 (Penjaga Gelombang)
   ↓                     
JL-M04 (Padang Abu) ──┬──→ JL-S06 (Abu Tembara, BARU)
   ↓                   └──→ JL-H01 (Karang Kapten Ndiru)
JL-M05 (Kerajaan Terkubur) ──[flag_jl_unity_choice PERMANEN]──→
JL-M06 (Seribu Jadi Satu / Tetap Seribu) ──[battle total berbeda per jalur]
```

## Titik Kritis Dependency

1. **`flag_jl_unity_choice` (JL-M05) adalah keputusan PALING permanen di region** — tidak bisa diubah bahkan lewat party wipe/retry, berbeda dari kebanyakan flag region lain yang minimal bisa dipertimbangkan ulang sebelum battle dimulai. UI warning WAJIB sangat eksplisit.

2. **JL-S03 (Gema Ganda) tersebar di SELURUH region** (5 titik, J1 sampai J7) — berbeda dari kebanyakan Side Mission yang terkonsentrasi di 1-2 zona. Ini butuh perhatian khusus di level design agar 5 titik tidak terasa seperti fetch-quest generik, tapi benar-benar terasa sebagai perjalanan menyatukan sesuatu yang tersebar (tematik dengan region).

3. **Benang merah "kuat saat banyak sekutu Jaladri"** mempengaruhi MINIMAL 4 karakter (Sekar Nyalu, Naga Sasra, Penjaga Gelombang, Gema Ganda) — pemain yang secara sengaja membangun "tim Jaladri" akan punya sinergi berbeda signifikan dari party campuran. Ini bagus untuk build diversity, tapi perlu dipastikan tidak jadi wajib/hard-meta untuk menyelesaikan battle manapun.

---

# ITEM TINDAK LANJUT — STATUS SETELAH KEPUTUSAN

1. **HP Naga Sasra — ✅ FINAL.** Dikonfirmasi 5500 (bukan lagi placeholder). Diterapkan di JL-M06 Beat 1B.

2. **Efek Serpihan Terakhir jalur SCATTERED — ✅ FINAL, ditambahkan.** Naga Sasra dapat pasif tambahan "Sisa yang Tersebar" — ambang batas "Yang Memilih Banyak" diperlebar (kebal CC dari ≥2 sekutu, "memusat" baru terpicu di 0 sekutu bukan <3). Paralel tematik dengan bonus Anjala Nirmala di jalur UNIFIED, tapi berlawanan arah (ia makin sulit disatukan, bukan makin kuat bersatu). Diterapkan di JL-M06 Beat 1B & Beat 2.

3. **Interpretasi pasif "Yang Memilih Banyak" — ✅ FINAL, dikonfirmasi.** Merujuk ke jumlah sekutu PARTY PEMAIN yang hidup (bukan sekutu Naga Sasra sendiri). Ditetapkan sebagai interpretasi resmi, bukan lagi asumsi terbuka.

4. **Combat math placeholder** — status sama seperti R1-R7: direvisi setelah Quest Script 9 region selesai.

---

*Quest Script Region 8 — Draf v0.2 · September 2026*
*Status: 16/16 misi Jaladri di-script detail (6 Main + 6 Side + 4 Hidden). 0 monster region baru tanpa alasan. 1 gap-fill (Abu Tembara) + 1 koreksi "Cara Didapat" besar (Gema Ganda). Naga Sasra diverifikasi selaras kanon. Anjala Nirmala dikonfirmasi memang sengaja tanpa item individual. Benang merah mekanik "kuat saat banyak sekutu Jaladri" dimanfaatkan di 4+ karakter. Seluruh 3 item tindak lanjut prioritas dari v0.1 SELESAI: HP dikonfirmasi (5500), bonus Serpihan Terakhir jalur SCATTERED ditambahkan (pasif "Sisa yang Tersebar"), interpretasi pasif Naga Sasra dikonfirmasi final. 1 item sisa (combat math global) tetap ditunda sesuai kebijakan lintas-region. Belum diimplementasi, belum playtest.*
