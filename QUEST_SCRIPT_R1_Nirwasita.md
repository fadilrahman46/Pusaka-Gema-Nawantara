# QUEST SCRIPT — REGION 1: NIRWASITA
# PUSAKA: GEMA NAWANTARA

**Versi:** Draf v0.1 — Quest Script Detail
**Status:** 🟡 SIAP REVIEW TEKNIS — belum diimplementasi, belum playtest
**Rujukan kanon:**
- `World_Bible_Pusaka_Gema_Nawantara_v5.1.md` §BAB 1 (Nirwasita)
- `GUIDE_KARAKTER_100_Nawantara_FINAL_v1.1.md` #01-09, #84-85
- `DOKUMEN_ITEM_Pusaka_Gema_Nawantara_FINAL_v1.md` §1.1, §2, §3.2, §3.10
- `KERANGKA_MISI_Pusaka_Gema_Nawantara.md` v0.2 (kerangka sumber — 13 misi Nirwasita)
**Tanggal:** September 2026

---

## KONVENSI SCRIPT

| Elemen | Format |
|---|---|
| **Flag** | `flag_nama_snake_case` — boolean atau counter, disimpan per save file |
| **Trigger** | Kondisi yang mengaktifkan misi/dialog/event |
| **NPC State** | Kondisi NPC yang berubah berdasarkan flag |
| **Battle Params** | HP multiplier, jumlah musuh, kondisi menang/kalah eksplisit |
| **Dialog Branch** | Ditandai `[opsi]` dengan hasil masing-masing |
| **Fail State** | Apa yang terjadi jika pemain gagal — soft-lock harus dihindari |

Semua nomor stat (HP musuh, durasi ronde, dll.) adalah **estimasi desain awal** — akan disesuaikan sistem balancing global saat implementasi, bukan angka final.

---

# NR-M01 · KABUT PERTAMA

## Trigger
- Auto-trigger setelah cutscene pembuka (kematian kakek, TL 117 Srawana 1) selesai
- Prasyarat: tidak ada (misi pertama game)

## Flag yang Dipakai
- `flag_nr_m01_started` (set true saat trigger)
- `flag_nr_m01_complete` (set true saat selesai)
- `flag_compass_tutorial_seen` (set true setelah tutorial kompas ditampilkan — dipakai untuk skip tutorial re-explain di NR-M02+)

## Struktur

### Beat 1 — Tiba di N1 Teluk Ranaya (0-3 menit)
- Cutscene pendek: pemain (karakter custom/silent protagonist sesuai GDD, TIDAK dirujuk di sini karena di luar cakupan dokumen ini) turun dari kapal
- NPC generik memberi 1 baris dialog: "Kabut akan turun sebentar lagi. Jangan berhenti terlalu lama begitu masuk hutan."
- Ini FORESHADOWING eksplisit untuk mekanik signature — tidak boleh dihapus meski terlihat kecil

### Beat 2 — Tutorial Kompas (3-13 menit)
- Trigger: pemain masuk N2 Wana Sanu
- UI popup: "Kompas akan berputar acak jika kamu berhenti bergerak lebih dari 5 detik."
- **Mekanik teknis:** timer 5 detik mulai saat velocity karakter = 0. Setelah 5 detik, kompas HUD rotasi ±15°-45° acak, berulang tiap 3 detik selanjutnya sampai pemain bergerak lagi.
- Tutorial dianggap selesai (`flag_compass_tutorial_seen = true`) setelah pemain: (a) berhenti sengaja 1x untuk melihat efeknya, DAN (b) berhasil mencapai 1 checkpoint memakai penanda visual (bukan kompas)
- **Penanda visual N2:** pohon dengan bekas potongan berbentuk V, terlihat dari radius 15m, dipasang di 3 titik sepanjang jalur ke checkpoint

### Beat 3 — Battle Tutorial (13-23 menit)
- Trigger: pemain lewati checkpoint pertama
- **Battle Params:**
  - Musuh: 2x "Bayang Penjaga" (monster kanon Umum, WB §1.8 — sisa penjaga lama yang patroli tanpa tujuan, cocok tematik untuk encounter pengenalan)
  - HP Bayang Penjaga: **970 (dikoreksi — hasil audit Combat Math Global, formula: Common-tier HP di Level~8 × 0.75 untuk Umum tutorial)**
  - Kondisi menang: kalahkan kedua musuh ATAU capai titik ekstraksi (opsi kabur untuk pemain yang kewalahan di tutorial — mencegah soft-lock)
  - Kondisi khusus: jika party berhenti bergerak >5 detik selama battle (di luar giliran normal), 1 musuh tambahan spawn dari kabut — ini mengajarkan bahwa mekanik signature aktif bahkan di battle
  - Respawn musuh: TIDAK — hanya 1 gelombang untuk tutorial

### Beat 4 — Reward & Transisi
- Drop otomatis (bukan RNG untuk tutorial): 1x Penunjuk Basah (Common Jimat, DI §1.1)
- Dialog penutup NPC: arahkan ke N3 (implisit, lewat marker peta — HUD masih penuh di misi ini)
- Set `flag_nr_m01_complete = true`
- Unlock NR-M02

## Fail State
- Battle tidak bisa "kalah permanen" — jika HP party = 0, auto-revive dengan HP 30% + pesan "Kabut belum siap mengambilmu" (naratif softening untuk game over di tutorial)

---

# NR-M02 · SUARA DI BALIK DANAU

## Trigger
- `flag_nr_m01_complete == true`
- Pemain masuk radius 50m dari N3 Danu Sanu

## Flag yang Dipakai
- `flag_ranaya_song_stage` (integer 0-4, tracking rantai lagu Nenek Ranaya lintas-misi — dipakai lagi di NR-M05)
- `flag_lampah_sinaru_recruited`
- `counter_dialog_patience` (untuk cabang dialog "tanya vs dengarkan")

## Struktur

### Beat 1 — Pertemuan Pertama Nenek Ranaya
- Trigger: pemain masuk area sekitar Nenek Ranaya (NPC stasioner di tepi danau N3)
- Ia sedang bernyanyi — TIDAK merespons interaksi normal selama bernyanyi (durasi ~20 detik in-game)
- **Dialog Branch:**
  - `[Interupsi — tanya langsung]` → Nenek Ranaya berhenti bernyanyi, menatap pemain, tidak bicara, lanjut bernyanyi dari awal. `counter_dialog_patience` tidak naik. Tidak ada progres.
  - `[Tunggu sampai selesai]` → `counter_dialog_patience += 1`. Setelah 3 kali menunggu penuh (~60 detik total, bisa dipercepat lewat skip-tapi-tetap-nunggu), Nenek Ranaya berbicara untuk pertama kali.
- **Desain sengaja:** ini mengajarkan pola interaksi Nenek Ranaya SEBELUM rantai misi utamanya dimulai — pemain yang tidak sabar akan frustrasi sebentar, lalu belajar.

### Beat 2 — Bait Pertama & Puzzle Lokasi
- Setelah `counter_dialog_patience >= 3`: Nenek Ranaya menyanyikan Bait 1: *"Sungai yang belok dua kali, di sanalah jejak tersembunyi."*
- `flag_ranaya_song_stage = 1`
- **Puzzle:** pemain harus menemukan titik di N3 yang cocok — sungai kecil dengan 2 tikungan tajam berturut-turut (landmark unik, tidak berulang di zona lain)
- Di titik itu: interaksi lingkungan memunculkan Lampah Sinaru (#01) untuk pertama kali — ia sedang "menuntun" 2 NPC hantu generik ke arah yang salah

### Beat 3 — Battle: Lampah Sinaru
- **Battle Params:**
  - Musuh: Lampah Sinaru (**HP 1422 — dikoreksi hasil audit Combat Math Global: Common-tier di-skala ke Level~12 Nirwasita, bukan flat Level 1 kanon 1070**, ATK/DEF diskalakan proporsional dari GK #01)
  - **Kondisi menang KHUSUS:** kalahkan Lampah Sinaru TANPA party berhenti bergerak >5 detik selama battle (mekanik signature dipaksa aktif). Jika party diam >5 detik, seluruh party kena debuff "Tersesat" 1 ronde (SPD -30%) — bukan instant-fail, hanya penalti, supaya tidak frustrasi
  - Skill Lampah Sinaru yang aktif: Dasar (Sapaan Jauh), Spesial (Jalan yang Menutup — -SPD party 2 ronde)
  - HP threshold menang: 0% (battle konvensional, hanya kondisi tambahan di atas)

### Beat 4 — Recruitment & Reward
- Battle menang → Lampah Sinaru "berhenti menuntun", cutscene pendek: ia mengenali pemain sebagai "yang tidak tersesat"
- `flag_lampah_sinaru_recruited = true` → Lampah Sinaru masuk roster (Common)
- Sloka Misi diberikan (jumlah: TBD sistem ekonomi, di luar cakupan)
- Nenek Ranaya memberi clue arah ke N4 (bukan HUD marker penuh — hint lisan: "Ikuti batu yang diam sambil bergerak")
- Set `flag_nr_m02_complete = true`

## Fail State
- Jika pemain skip dialog Nenek Ranaya berulang tanpa menunggu (>10x interupsi), tambahkan dialog opsional darinya: "Kau terburu-buru. Aku bisa menunggu lebih lama darimu." — tidak mengubah progres, murni flavor text agar pemain tidak merasa stuck tanpa penjelasan.

---

# NR-M03 · ENAM PULUH TAHUN MENUNGGU

## Trigger
- `flag_nr_m02_complete == true`
- Pemain masuk N4 Lembah Diam

## Flag yang Dipakai
- `flag_tandaraga_recruited`
- `counter_patience_rounds` (battle-scoped, reset tiap battle attempt)

## Struktur

### Beat 1 — Konfrontasi Tandaraga
- Trigger: pemain masuk area pusat N4
- Tandaraga (#02) berdiri dalam pose siaga, tidak menyerang — ia MENGIRA pemain ancaman
- Dialog singkat (tidak bercabang, linear): "Enam puluh tahun aku berlatih untuk hari ini. Buktikan kau bukan yang aku tunggu."

### Beat 2 — Battle "Kesabaran"
- **Battle Params:**
  - Musuh: Tandaraga (**HP 1422 — dikoreksi hasil audit Combat Math Global: Common-tier di-skala ke Level~12 Nirwasita**)
  - **Kondisi menang UNIK:** party harus BERTAHAN 5 ronde TANPA menyerang Tandaraga sama sekali. Jika party menyerang di ronde manapun, `counter_patience_rounds` reset ke 0 dan battle mulai ulang dari ronde 1 (BUKAN restart battle penuh — HP tetap, hanya counter reset)
  - Tandaraga menyerang tiap ronde dengan pola yang predictable dan avoidable lewat positioning (bukan RNG murni) — damage sedang, tidak one-shot kill dari HP normal Level 20
  - Party HANYA boleh: bertahan (guard), heal, buff — TIDAK boleh damage skill apa pun
  - UI indikator: counter visual "X/5 ronde tanpa menyerang" ditampilkan jelas selama battle ini SAJA (fitur battle khusus, bukan default UI)
- **Echo naratif:** ini secara mekanis MEWAKILI tema "60 tahun menunggu" — pemain literally harus menunggu tanpa bertindak

### Beat 3 — Recruitment
- 5 ronde tercapai → Tandaraga berhenti menyerang, cutscene: ia menyadari perangnya tidak pernah datang, dan tidak akan datang lewat pemain
- `flag_tandaraga_recruited = true`
- Drop: Tongkat Perantau (Uncommon Senjata, DI §1.1) — TIDAK dari battle RNG, tapi guaranteed reward misi ini (echo tematik: item yang "menguat tiap ronde tidak menyerang duluan" cocok persis dengan mekanik battle yang baru dilalui pemain)

## Fail State
- Jika pemain terus-menerus reset (gagal >5x), tambahkan dialog opsional dari sistem (bukan Tandaraga): tooltip "Ingat: jangan menyerang sama sekali selama 5 ronde." — bantuan aksesibilitas tanpa merusak tema

---

# NR-M04 · ADI DAN GERBANG TERBUKA

**Catatan implementasi khusus:** Ini misi dengan keputusan desain final dari Kerangka Misi v0.2 — posisi tetap di M04, Adi memberi hint visual (silhouette bercahaya samar), puzzle difficulty diturunkan dari Level 4 ke 3.5.

## Trigger
- `flag_tandaraga_recruited == true`
- Pemain masuk N4 area utara, dekat N5 gate

## Flag yang Dipakai
- `flag_adi_met`
- `flag_hud_compass_disabled` (scoped ke misi ini saja — HUD kompas dinonaktifkan total selama beat navigasi)
- `counter_wrong_turns` (tracking untuk analytics playtest, bukan mempengaruhi gameplay)
- `flag_nr_m04_complete`

## Struktur

### Beat 1 — Pertemuan Adi
- Adi (NPC anak ±10 tahun) muncul, TIDAK bicara verbal panjang — 1 baris pengantar: "Warga melarangku bicara ke orang luar. Tapi aku akan menunjukkan jalan. Ikuti aku — jangan tanya, cukup lihat."
- Ini justifikasi naratif kenapa HUD dimatikan dan komunikasi jadi gestur

### Beat 2 — Navigasi Tanpa HUD (implementasi Opsi B)
- Trigger: pemain melewati gate masuk N5
- `flag_hud_compass_disabled = true` — kompas HUD hilang total dari layar (bukan hanya berputar seperti mekanik signature biasa — total hilang untuk misi ini, tutorial untuk kondisi serupa yang lebih berat di Anawil nanti)
- **Adi's visual hint (implementasi Keputusan B):** Adi bergerak di depan pemain dengan efek partikel cahaya redup (opacity rendah, tidak mengganggu art direction gelap N5) yang tetap terlihat dari jarak hingga 20m — memastikan pemain tidak benar-benar "buta", hanya kehilangan HUD digital
- **3 Persimpangan:**
  1. **Persimpangan 1 (mudah — sesuai penyesuaian Opsi B):** Adi berhenti dan menunjuk jelas ke 1 arah dengan jejak kaki bercahayanya terlihat jelas di tanah (clue tambahan baru). Toleransi kesalahan: pemain bisa salah jalan tanpa penalti besar — hanya kembali ke titik sebelumnya.
  2. **Persimpangan 2 (sedang — tidak diubah dari draf original):** Adi menunjuk lebih samar (gestur menoleh, bukan menunjuk eksplisit). Pemain harus mengikuti arah pandangnya.
  3. **Persimpangan 3 (sulit — tidak diubah, mempertahankan puncak kurva dalam misi ini sendiri):** Adi TIDAK memberi petunjuk langsung — pemain harus mengandalkan suara lingkungan (air mengalir dari arah tertentu, burung dari arah lain) untuk menebak jalur yang Adi ambil (ia sudah lebih dulu jalan, tidak menunggu di titik ini).
- Salah pilih jalur = kembali ke persimpangan itu (BUKAN kembali ke awal N5 — soft-lock harus dihindari, ini prinsip krusial)
- `counter_wrong_turns` dicatat untuk telemetri playtest, tidak mempengaruhi reward

### Beat 3 — Puzzle Identifikasi Adi Palsu
- Trigger: pemain tiba di ujung N5
- Encounter: "Kabut Bersuara" (Elite monster kanon, WB §1.8 — kumpulan suara tersesat yang meniru suara dan gestur) menyamar sebagai Adi kedua, memakai kemampuan meniru gesturnya untuk menciptakan sosok visual palsu
- **Puzzle logic:** Adi ASLI tidak pernah berhenti bergerak sepenuhnya (echo mekanik signature — bahkan NPC "aman" tunduk pada aturan dunia ini). Adi PALSU akan diam sempurna sesekali (tanda AI/animasi statis).
- Pemain harus OBSERVASI selama ~10 detik sebelum memilih target battle
- **Battle Params jika salah target (serang Adi asli):**
  - Adi "asli" tidak mati (invulnerable, tapi menerima 1 hit visual — screen shake + suara sakit), misi TIDAK gagal permanen, tapi battle harus diulang dari awal encounter (bukan dari awal N5)
- **Battle Params jika benar target (Kabut Bersuara):**
  - HP: **2200 (dikoreksi — Elite di Level~14, formula: Common-tier × 1.5, hasil audit Combat Math Global)**
  - Pola serangan: menyamar terus selama battle, sesekali split jadi 2 visual (asli + salinan) — pemain harus terus observasi pola diam untuk tahu mana yang nyata (mekanik damage: menyerang salinan = 0 damage, menyerang yang bergerak = damage penuh)
  - Kondisi menang: HP 0%

### Beat 4 — Reward & Transisi
- Menang → akses ke N6 Kuta Wisata terbuka
- Drop: Kompas Karat (Rare Jimat, DI §1.1) dari encounter Kabut Bersuara
- `flag_adi_met = true`, `flag_nr_m04_complete = true`
- `flag_hud_compass_disabled = false` (HUD kembali normal setelah keluar N5)
- Ini TIDAK memicu NR-S03 (misi opsional Adi) — itu trigger terpisah di N6

## Fail State
- Tidak ada soft-lock: setiap kesalahan (persimpangan salah, target battle salah) mengembalikan pemain ke titik terakhir, bukan reset total

---

# NR-M05 · LAGU PERJALANAN TUA

## Trigger
- `flag_nr_m04_complete == true`
- Pemain masuk N6 Kuta Wisata DAN sudah bicara ke minimal 1 NPC di N6 (soft-gate, mencegah pemain rush lewat N6 tanpa explore sama sekali)

## Flag yang Dipakai
- `flag_ranaya_song_stage` (lanjutan dari NR-M02, sekarang naik ke 2, 3, 4)
- `flag_fragment_sanra_ranu`, `flag_fragment_vendor`, `flag_fragment_elder` (3 fragmen bait terakhir)
- `flag_nr_m05_complete`

## Struktur

### Beat 1 — Kumpul 3 Fragmen (paralel, tidak wajib berurutan)

**Fragmen A — Sanra Ranu (#03):**
- Trigger: bicara ke Sanra Ranu di N6
- Ia memberi fragmen langsung setelah 1 dialog pendek (paling mudah dari 3) — echo lore-nya sebagai Human/Apah/Support yang kooperatif
- `flag_fragment_sanra_ranu = true`

**Fragmen B — Vendor Sanra Buri:**
- Trigger: bicara ke Sanra Buri (NPC Vendor, WB §1.12)
- **Syarat khusus:** vendor ini "mengingat penolakan" — jika pemain sebelumnya PERNAH menolak Titah Sampingannya (di luar cakupan region ini jika ada crossover, TAPI untuk Region 1 murni: jika pemain menolak transaksi apa pun darinya sebelumnya), harga fragmen naik (butuh Kepeng tambahan) — bukan blocking, hanya lebih mahal
- `flag_fragment_vendor = true` setelah transaksi

**Fragmen C — Tetua Tanpa Nama (mini-game ritme):**
- Trigger: temukan NPC tetua di sudut N6 (tidak ada marker peta — butuh eksplorasi, ini elemen "temukan sendiri" pertama di region tutorial, mempersiapkan pemain untuk Hidden Mission)
- **Mini-game:** tetua menyanyikan bait sebelumnya (dari Beat 2 NR-M02, `flag_ranaya_song_stage` harus >= 1), pemain harus mengulang urutan nada (4 nada, sequence recall — sederhana, mengingat maks 4 elemen sesuai prinsip aksesibilitas)
- Gagal 3x = tetua memberi fragmen tetap (tidak ada penalti permanen, hanya mengulur waktu ~2 menit ekstra)
- `flag_fragment_elder = true`

### Beat 2 — Gabungkan Fragmen
- Trigger: `flag_fragment_sanra_ranu && flag_fragment_vendor && flag_fragment_elder` semua true
- Kembali ke Nenek Ranaya (sekarang di N6, ia sudah "pindah" mengikuti alur cerita — atau tetap di N3 dengan fast travel, keputusan level design di luar cakupan dokumen ini)
- Ia menyanyikan bait terakhir menggunakan 3 fragmen — `flag_ranaya_song_stage = 4` (lengkap)
- Ini melengkapi syarat Item Spesial "Kalung Jalan Pulang" (DI §2: "Selesaikan rantai misi Nenek Ranaya — pelajari seluruh lagu perjalanan tua")

### Beat 3 — Battle: Penjaga Menara
- Trigger: pemain masuk N7 Menara Pandu
- **Battle Params:**
  - Musuh: "Penjaga Menara" (Elite kanon, WB §1.8 — HP: **2200, dikoreksi hasil audit Combat Math Global — Level~14, formula Elite ×1.5 dari Common**)
  - **Mekanik unik:** tiap 2 ronde, UI menampilkan 3 pilihan baris lagu (dari 3 fragmen yang sudah dikumpulkan + 1 baris salah sebagai distractor)
    - Pilih benar → Penjaga Menara kehilangan 1 dari 3 lapis perisai (masing-masing lapis = 33% max HP sebagai damage reduction, bukan HP langsung)
    - Pilih salah → Penjaga Menara heal 15% HP (penalti, bukan instant fail)
  - Kondisi menang: HP 0% DAN seluruh 3 lapis perisai sudah terlepas (mencegah pemain brute-force damage tanpa puzzle)

### Beat 4 — Reward
- Menang → akses N7 dalam (Menara Pandu ruang utama, tempat NR-M06 terjadi)
- Drop: Lentera Nenek Ranaya (Super Rare Pusaka, DI §1.1)
- `flag_nr_m05_complete = true`

## Fail State
- Battle Penjaga Menara: jika party wipe, retry dari awal battle (fragmen tidak hilang, `flag_ranaya_song_stage` tidak reset)

---

# NR-M06 · KABUT TERBUKA

## Trigger
- `flag_nr_m05_complete == true`
- Pemain masuk ruang utama N7

## Flag yang Dipakai
- `flag_nirsmara_recruited`
- `flag_nr_m06_complete`
- `flag_kalung_jalan_pulang_obtained` (Item Spesial — syarat: `flag_ranaya_song_stage == 4`)

## Struktur

### Beat 1 — Fase 1-2 (Battle Konvensional)
- **Battle Params Fase 1:**
  - Musuh: Nirsmara (GK #09: Legendary, **HP 5500 — dikoreksi dari kesalahan sebelumnya yang memakai 3442 (itu angka Common tier Level 60, bukan Legendary — salah kutip di draf paling awal proyek ini, ditemukan saat audit Combat Math Global)**)
  - Pasif aktif: "lawan tidak bisa menerapkan debuff yang sama dua kali" — sistem harus track debuff apa saja yang sudah dipakai party terhadap Nirsmara selama battle ini, block reapply
  - Kondisi transisi ke Fase 2: HP Nirsmara turun ke 66%

- **Battle Params Fase 2:**
  - Nirsmara memanggil kabut: seluruh party -50% akurasi selama fase ini (durasi: sampai HP turun ke 33%)
  - Kondisi transisi ke Fase 3: HP Nirsmara turun ke 33%

### Beat 2 — Fase 3 (Puzzle Lagu)
- Trigger: HP Nirsmara <= 33%
- **PENTING:** damage normal TIDAK mengurangi HP lebih lanjut di fase ini — sistem harus mem-block damage reduction dari HP Nirsmara sampai kondisi puzzle terpenuhi (mencegah pemain brute force lewat fase naratif)
- UI menampilkan 4 opsi urutan bait (dari `flag_ranaya_song_stage` — jika = 4/lengkap, opsi benar tersedia; jika pemain entah bagaimana sampai sini tanpa rantai lengkap — TIDAK MUNGKIN by design karena NR-M05 prasyarat linear, tapi sistem tetap harus punya fallback: jika song stage < 4, tampilkan versi "lagu tidak lengkap" yang tetap bisa dipakai tapi butuh 2x percobaan alih-alih 1x)
- Pemain pilih urutan bait yang benar → Nirsmara "diingatkan", battle berakhir (bukan HP 0%, tapi trigger cutscene end-battle)

### Beat 3 — Recruitment & Reward
- `flag_nirsmara_recruited = true`
- Drop: Peta yang Tidak Pernah Selesai (Ultra Rare Pusaka, DI §1.1)
- **Cek Item Spesial:** jika `flag_ranaya_song_stage == 4` → berikan Kalung Jalan Pulang (Item Spesial, DI §2), set `flag_kalung_jalan_pulang_obtained = true`
- `flag_nr_m06_complete = true`
- Trigger: buka akses Kadewan (Region 2) — sesuai S1 linear structure (WB §II.1)
- Trigger: Resolusi Region dievaluasi (lihat NR-S03 untuk hasil final)

## Fail State
- Party wipe di Fase 1-2: retry dari awal Fase 1 (bukan dari awal region)
- Party wipe di Fase 3: TIDAK MUNGKIN by design — fase ini tidak ada damage masuk dari Nirsmara (ia "menunggu diingatkan", bukan menyerang). Jika desain berubah nanti dan fase 3 tetap ada damage, perlu ditambahkan retry logic terpisah.

---

# NR-S01 · GUDANG BARANG TERTINGGAL

## Trigger
- `flag_nr_m02_complete == true` (tersedia sejak N3-N4 dibuka, tidak terikat linear progress lebih jauh)
- Bicara ke Lare Wengi (#05, ditempatkan sebagai NPC opsional di N3)

## Flag
- `flag_lare_wengi_recruited`
- `counter_gudang_correct_matches` (0-5)

## Struktur
- 5 barang, 5 clue (nama terukir, bau — direpresentasikan lewat UI text/icon, ukuran)
- Pemain assign barang ke "pemilik" lewat drag-drop atau dialog pilihan (implementasi UI di luar cakupan)
- Tiap match SALAH → 1 monster spawn (battle ringan, HP `[PLACEHOLDER — akan direvisi]` 600, tidak berbahaya tapi memperlambat)
- Tiap match BENAR → tidak ada battle untuk item itu
- Selesai (5/5 attempted, regardless of correct count) → Lare Wengi Titah selesai
- `flag_lare_wengi_recruited = true`
- Drop: Jimat Gudang Barang Tertinggal (DI §3.2)

## Fail State
- Tidak ada — bisa selesai meski semua salah (hanya lebih banyak battle)

---

# NR-S02 · EMPAT RATUS BAIT

## Trigger
- `flag_nr_m03_complete == true` (setelah N4 dibuka)
- Bicara ke Kayuri Sindu (#06) di N4-N5

## Flag
- `flag_kayuri_sindu_recruited`
- `array_memorized_baits` (menyimpan urutan yang diingat pemain)

## Struktur
- Mini-game: dengar 10 bait berurutan (audio/text sequence), ulangi urutannya (UI: pilih dari kumpulan bait yang di-shuffle)
- 2 bait terakhir: pemain PILIH dari 4 opsi tematik (perlindungan/pengampunan/keberanian/kepasrahan) — tidak ada jawaban salah, tapi disimpan sebagai `flag_kayuri_dialogue_tone` untuk mempengaruhi 1-2 baris dialog reaktif Kayuri Sindu selanjutnya (flavor, bukan mekanik)
- Battle "Syair yang Menyerang": 4 ronde survival (1 ronde = 100 bait secara naratif), party hanya perlu bertahan, tidak perlu damage aktif untuk menang
- Selesai → `flag_kayuri_sindu_recruited = true`
- Drop: Jimat Empat Ratus Bait (DI §3.2)

## Fail State
- Party wipe saat battle survival: retry battle, mini-game memori tidak perlu diulang (progres tersimpan)

---

# NR-S03 · MISI OPSIONAL ADI — DUNIA LUAR

**Catatan:** Ini misi PENENTU Resolusi Region (WB §1.10) — implementasi harus hati-hati karena hasilnya permanen untuk playthrough ini.

## Trigger
- `flag_adi_met == true` (dari NR-M04)
- Pemain masuk N6, bicara ke Adi (sekarang muncul di N6, mengikuti alur cerita)

## Flag
- `flag_adi_dialogue_choice` (enum: HONEST / HOPEFUL / MIXED — tracking 3 lapis dialog)
- `flag_adi_resolution_path` (enum: FORCED_PAST / WAITED — menentukan hasil akhir)
- `flag_region_resolution_nirwasita` (enum: NEUTRAL / ADI_JOINS — dipakai WB §1.10)

## Struktur

### Beat 1 — Dialog Bercabang 3 Lapis
- Lapis 1: "Bagaimana dunia luar?" → `[Jujur — berbahaya]` / `[Beri harapan]` / `[Campuran]`
- Lapis 2 (bercabang dari lapis 1, isi disesuaikan tone): pertanyaan lanjutan Adi, makin spesifik
- Lapis 3: Adi menyimpulkan sendiri kesan tentang dunia luar berdasarkan akumulasi 2 lapis sebelumnya
- `flag_adi_dialogue_choice` diset berdasarkan mayoritas pilihan (bukan pilihan terakhir saja — mencegah "gaming" sistem dengan asal pilih di akhir)

### Beat 2 — Titik Konflik (Gerbang N7)
- Trigger: pemain menuju N7 (sebelum NR-M06, atau bisa juga jadi gate untuk masuk M06 — keputusan sequencing di luar cakupan, disarankan: SETELAH NR-M05, SEBELUM masuk ruang utama N7 di NR-M06)
- Adi menghalangi jalan, takut hasil pertemuan dengan Nirsmara
- **Dialog Branch:**
  - `[Lewati paksa]` → Battle ringan 1 hit (Adi HP rendah, tidak benar-benar bisa "kalah" secara naratif — battle ini simbolis, 1 hit dan Adi mundur). `flag_adi_resolution_path = FORCED_PAST`
  - `[Tunggu sampai ia siap]` → Puzzle navigasi tambahan tanpa Adi (versi mini dari puzzle NR-M04, tapi lebih pendek — 1 persimpangan saja). `flag_adi_resolution_path = WAITED`

### Beat 3 — Resolusi
- Jika `FORCED_PAST`: `flag_region_resolution_nirwasita = NEUTRAL` — Adi tetap menganggap dunia luar mengecewakan. Tidak ada NPC tambahan pasca-region.
- Jika `WAITED`: `flag_region_resolution_nirwasita = ADI_JOINS` — Adi bergabung sebagai NPC pendukung di Padepokan pasca-region (implementasi Padepokan di luar cakupan dokumen region ini)
- Kedua jalur: misi selesai, tidak ada reward item (murni naratif — sesuai kerangka asli, tidak ada item terkait NR-S03)

## Fail State
- Tidak ada battle yang bisa gagal secara mekanis di sini — kedua jalur dijamin selesai

---

# NR-S04 · HARGA PERLINDUNGAN (TITAH NGGARINDU)

## Trigger
- `flag_nr_m04_complete == true` (N5-N7 sudah bisa diakses)
- Ditemukan lewat eksplorasi — TIDAK ada NPC yang memberi quest secara eksplisit (echo tema Nggarindu — "kenangan yang direlakan", ditemukan bukan diberi)

## Flag
- `counter_nggarindu_fragments` (0-5)
- `flag_nggarindu_recruited`
- `flag_ensiklopedia_sacrificed_nggarindu` (tracking entri mana yang direlakan — untuk sistem Ensiklopedia global)

## Struktur

### Beat 1 — Kumpul 5 Fragmen
- 5 fragmen "kenangan yang dilupakan" tersembunyi di N5-N7
- **Mekanik unik:** fragmen hanya terlihat/interaktif dalam jendela waktu SAAT kompas berhenti berputar sesaat (mekanik signature Nirwasita — window ini muncul acak, durasi ~3 detik, frekuensi ~1x per 15 detik saat pemain diam di dekat lokasi fragmen)
- Ini SATU-SATUNYA momen di region di mana "diam" adalah strategi yang diperlukan, bukan dihindari — kontras disengaja dengan mekanik signature utama

### Beat 2 — Altar Kabut & Puzzle "Merelakan"
- Trigger: 5/5 fragmen terkumpul
- Altar muncul di N7 (area terpisah dari ruang utama boss)
- UI menampilkan daftar entri Ensiklopedia yang sudah dimiliki pemain — pemain harus PILIH 1 untuk "direlakan" (dihapus TIDAK permanen — beda dari mekanik Nirsmara §3.10 yang permanen; ini bisa dipulihkan lewat cara lain jika ada sistem terkait, TBD desain global)
- `flag_ensiklopedia_sacrificed_nggarindu = [entri yang dipilih]`

### Beat 3 — Battle 3 Fase (Manifestasi Kabut)
- **Battle Params:**
  - Fase 1: musuh menyerap 1 skill acak dari 1 karakter party (skill tidak bisa dipakai sisa battle fase ini)
  - Fase 2: musuh menyerap 1 skill dari karakter lain
  - Fase 3: musuh menyerap skill terakhir — party harus menang HANYA dengan skill yang tersisa
  - Kondisi menang: HP musuh 0% DAN party TIDAK memakai item pemulih ingatan (jika item semacam itu ada di sistem — flag khusus `flag_used_memory_restore_item` harus false di akhir battle, atau battle dianggap gagal secara naratif meski menang secara HP)

### Beat 4 — Recruitment
- `flag_nggarindu_recruited = true`
- Drop: Pusaka Harga Perlindungan (DI §3.2)

## Fail State
- Jika party wipe: retry battle, fragmen dan altar choice tidak reset
- Jika pemain memakai item pemulih ingatan (melanggar kondisi): battle tetap selesai secara HP, tapi Nggarindu TIDAK bergabung — dialog: "Kau tidak benar-benar rela." Pemain harus retry seluruh battle dari awal fase 1 tanpa item tersebut.

---

# NR-H01 · RUMAH RANAYA LAMA

## Trigger
- `flag_ranaya_song_stage == 4` (rantai Nenek Ranaya selesai penuh, dari NR-M05)
- Area Tersembunyi terbuka otomatis di N2 (WB §1.12)

## Flag
- `flag_rumah_ranaya_lama_unlocked`
- `array_mural_order` (5 mural, urutan benar tersimpan sebagai referensi)
- `flag_sanra_ranu_buff_permanent`

## Struktur
- Puzzle mural: 5 gambar di dinding, urutan acak. Pemain drag/pilih urutan berdasarkan clue visual murni (tidak ada teks — ini persiapan tematik ringan untuk Anawil nanti, meski Nirwasita bukan region "tanpa kata")
- Urutan benar → Nenek Ranaya (versi memori/cutscene) bercerita versi lengkap kenapa Nirwasita bersembunyi
- 3 entri Ensiklopedia eksklusif diberikan
- Battle opsional: "Kenangan Ranaya Muda" — sparring, HP `[PLACEHOLDER — akan direvisi]` 1200, TIDAK ada penalti jika kalah (battle ini murni bonus flavor, bukan gate)
- Menang battle opsional → Sanra Ranu (#03) dapat buff permanen (+X% stat, angka TBD sistem balancing)
- `flag_sanra_ranu_buff_permanent = true` jika menang

## Fail State
- Tidak ada — seluruh komponen misi ini opsional/bonus, tidak ada state gagal permanen

---

# NR-H02 · MUSUH YANG SEBENARNYA (TITAH WIRA SENJA)

## Trigger
- `flag_nr_m06_complete == true` (Nirsmara sudah dikalahkan — Wira Senja sebagai "kelanjutan tematik Tandaraga" baru relevan setelah pemain memahami penuh tema region)
- Ditemukan di N6-N7 lewat eksplorasi

## Flag
- `counter_restricted_battles` (0-3)
- `flag_wira_senja_recruited`

## Struktur

### Beat 1 — 3 Battle Terbatas
- 3 encounter terpisah di N6-N7
- **Kondisi khusus tiap battle:** Wira Senja (di party sementara sebagai unit dipinjam, atau NPC ally — implementasi tergantung sistem party-swap) TIDAK BOLEH menyerang lebih dari 1x per battle
- Jika Wira Senja menyerang 2x: battle tidak otomatis gagal, tapi `counter_restricted_battles` untuk battle itu tidak bertambah — pemain harus retry battle spesifik itu
- Battle didesain agar party BISA menang tanpa mengandalkan Wira Senja sama sekali (ia Attacker, tapi battle ini butuh dia jadi off-tank/support sementara — echo "kekuatan yang tidak dipakai")

### Beat 2 — Battle Akhir: Sang Sunyi (Manifestasi)
- Trigger: `counter_restricted_battles == 3`
- **Battle Params:**
  - Lawan TIDAK menyerang balik sama sekali (0 damage output dari musuh)
  - Kondisi menang: bertahan X ronde (disarankan 5, konsisten dengan pola NR-M03) TANPA menyerang — mirror pattern dari Tandaraga di NR-M03, tapi sekarang pemain paham polanya sejak awal (tidak perlu tutorial ulang)
  - Jika party menyerang: TIDAK ada penalti reset (beda dari NR-M03) — battle ini tentang MEMILIH untuk tidak menyerang meski BISA, bukan dipaksa oleh mekanik. Menyerang hanya membuat battle berlangsung lebih lama tanpa progres menuju "menang."

### Beat 3 — Recruitment
- `flag_wira_senja_recruited = true`
- Drop: Senjata Musuh yang Sebenarnya (Ultra Rare, DI §3.2)

## Fail State
- Battle restricted (Beat 1): retry per-battle individual, tidak reset seluruh chain 3 battle
- Battle akhir (Beat 2): tidak ada wipe condition (musuh tidak menyerang) — hanya butuh waktu, tidak bisa gagal secara teknis, hanya bisa "belum selesai"

---

# NR-H03 · YANG TERTANAM SELAMAT (TITAH SARAS PERTIWI)

## Trigger
- `flag_nr_m04_complete == true` (N4-N6 accessible)
- Ditemukan lewat eksplorasi murni (tidak ada NPC quest giver)

## Flag
- `counter_dig_temptation_resisted` (0-3)
- `flag_saras_pertiwi_recruited`
- `flag_misi_gagal_permanent_playthrough` (jika pemain menggali salah satu — dicatat agar tidak bisa retry di playthrough yang sama, sesuai kerangka asli "gagal permanen di playthrough ini")

## Struktur
- 3 "titik penguburan ingatan" di N4-N6
- Di tiap titik: UI menampilkan opsi "Gali" (dengan preview reward PALSU — item bagus yang sebenarnya tidak akan didapat, ini SENGAJA menyesatkan sebagai bagian dari puzzle) vs "Tinggalkan"
- **Pilih "Gali" di titik manapun:** `flag_misi_gagal_permanent_playthrough = true` — misi ini terkunci untuk sisa playthrough (pemain harus new game+ atau reload save lama untuk retry)
- **Pilih "Tinggalkan" di ketiga titik:** `counter_dig_temptation_resisted = 3` → Saras Pertiwi muncul di titik ketiga, bergabung
- 0 battle di seluruh misi ini
- Drop: Jimat Yang Tertanam Selamat (DI §3.2)

## Fail State
- **PENTING — Ini satu-satunya misi Nirwasita dengan fail state PERMANEN by design.** Harus ada konfirmasi UI eksplisit sebelum pemain menggali ("Apakah kamu yakin? Tindakan ini tidak bisa dibatalkan.") untuk mencegah kehilangan konten karena klik tidak sengaja — ini catatan implementasi WAJIB, bukan opsional.

---

# RINGKASAN DEPENDENCY GRAPH — REGION 1

```
NR-M01 (Kabut Pertama)
   ↓
NR-M02 (Suara di Balik Danau) ──→ NR-S01 (Gudang Barang Tertinggal, tersedia)
   ↓
NR-M03 (Enam Puluh Tahun Menunggu) ──→ NR-S02 (Empat Ratus Bait, tersedia)
   ↓
NR-M04 (Adi dan Gerbang Terbuka) ──┬──→ NR-S03 (Misi Opsional Adi)
   ↓                                ├──→ NR-S04 (Harga Perlindungan)
   ↓                                └──→ NR-H03 (Yang Tertanam Selamat)
NR-M05 (Lagu Perjalanan Tua) ──→ [flag_ranaya_song_stage=4] ──→ NR-H01 (Rumah Ranaya Lama)
   ↓
NR-M06 (Kabut Terbuka) ──→ NR-H02 (Musuh yang Sebenarnya)
   ↓
[Region 2 Kadewan terbuka]
[Resolusi Region dievaluasi dari flag_region_resolution_nirwasita]
```

## Titik Kritis Dependency

1. **NR-S03 HARUS diselesaikan sebelum NR-M06 selesai penuh** — karena titik konflik di Beat 2 NR-S03 ada di gerbang N7, sebelum ruang utama boss. Jika pemain skip NR-S03 sepenuhnya (tidak bicara ke Adi di N6 sama sekali), `flag_region_resolution_nirwasita` harus punya default value (`NEUTRAL`) agar tidak undefined state.

2. **NR-H01 terkunci di belakang `flag_ranaya_song_stage == 4`** — yang hanya bisa dicapai lewat NR-M05. Ini berarti NR-H01 TIDAK BISA diselesaikan sebelum NR-M05, meski secara fisik N2 (lokasinya) sudah bisa diakses sejak NR-M01. Perlu UI/marker yang jelas agar pemain tidak bingung kenapa area terlihat tapi tidak bisa diakses.

3. **NR-H02 dan NR-H03 keduanya butuh `flag_nr_m04_complete`** tapi TIDAK saling bergantung satu sama lain — bisa dikerjakan dalam urutan apa pun atau paralel.

---

# ITEM TINDAK LANJUT — STATUS SETELAH KEPUTUSAN

## 1. Monster Nirwasita — ✅ SELESAI, dengan koreksi penting

**Temuan saat eksekusi:** World Bible §1.8 **sudah punya 2 monster kanon** yang saya lewatkan saat menulis draf pertama script ini — "Bayang Penjaga" (Umum, N1-N3) dan "Kabut Bersuara" (Elite, N5). Keduanya cocok persis dengan zona yang saya butuhkan untuk NR-M01 dan NR-M04. Alih-alih menciptakan monster duplikat, saya:

- **NR-M01:** Ganti "Penari Kabut" (ciptaan saya) → **Bayang Penjaga** (kanon)
- **NR-M04:** Ganti "Penyesat Jalan" (ciptaan saya) → **Kabut Bersuara** (kanon, konsepnya "meniru suara dan gestur" secara alami cocok dengan puzzle menyamar-jadi-Adi tanpa perlu monster baru)
- **NR-M05:** "Penjaga Menara" **benar-benar baru** (tidak ada entri N7 non-boss di kanon sebelumnya) — ini satu-satunya monster yang benar ditambahkan ke World Bible §1.8

**Soal "dokumen karakter" (Guide Karakter):** Saya TIDAK menambahkan Penjaga Menara ke Guide Karakter. Dokumen itu terstruktur khusus untuk 100 karakter PLAYABLE (Common-Legendary, bisa direkrut ke roster) — monster Elite/Umum seperti ini adalah NPC musuh murni, tidak pernah direkrut, dan menambahkannya akan merusak penomoran serta struktur 100-karakter yang sudah baku. Bayang Penjaga dan Kabut Bersuara yang sudah ada di kanon pun tidak muncul di Guide Karakter — jadi konsistensi tetap terjaga dengan menaruh Penjaga Menara HANYA di World Bible §1.8, sesuai pola yang sudah ada.

Jika kamu memang menginginkan monster tercatat di tempat lain (misal dokumen bestiary terpisah), itu perlu dibuat sebagai dokumen baru — bukan dipaksakan masuk Guide Karakter.

## 2. Sistem Combat Math Global — 🟡 DITUNDA, status ditandai eksplisit

Seluruh angka HP/damage di Quest Script ini (800, 1200, 1500, 2200, dst.) **tetap dipakai sebagai acuan sementara**. Ditandai ulang di seluruh dokumen sebagai `[PLACEHOLDER — akan direvisi]` agar tidak ada ambiguitas saat tim lain membaca dokumen ini sebelum sistem combat math global selesai.

**Keputusan resmi:** Revisi menyeluruh angka-angka ini akan dilakukan **setelah Quest Script seluruh 9 region selesai** — bukan per-region. Ini konsisten karena combat math global butuh visibilitas penuh ke seluruh kurva kesulitan lintas-region (S1-Finale) sebelum bisa dikalibrasi dengan benar, bukan region demi region yang berisiko inkonsisten.

## 3. NR-H03 Konfirmasi UI — ✅ FINAL, wajib implementasi

Requirement UI konfirmasi "tindakan tidak bisa dibatalkan" untuk aksi "Gali" di NR-H03 **dikonfirmasi sebagai spesifikasi wajib**, bukan sekadar catatan desain. Redaksi final:

> **Popup konfirmasi (wajib, tidak bisa di-skip lewat setting "skip confirmation"):**
> "Menggali di sini akan mengubah sesuatu yang seharusnya tetap terkubur. Tindakan ini TIDAK BISA DIBATALKAN untuk sisa playthrough ini. Lanjutkan?"
> `[Ya, Gali]` / `[Tidak, Tinggalkan]`

Ini satu-satunya popup konfirmasi permanen di seluruh Region 1 — implementasi harus memastikan ini tidak tertimpa oleh setting aksesibilitas "skip semua konfirmasi" yang mungkin ada di sistem global, karena konsekuensinya permanen per-playthrough.

## 4. Sequencing NR-S03 — ✅ FINAL

Dikonfirmasi: **titik konflik Beat 2 (gerbang N7) terjadi SETELAH NR-M05 selesai, SEBELUM pemain masuk ruang utama N7 di NR-M06.** Ini bukan lagi asumsi — ditetapkan sebagai urutan resmi. Flag dependency di bagian "Ringkasan Dependency Graph" sudah mencerminkan ini dan tidak perlu diubah lebih lanjut.

## 5. NR-S04 (Nggarindu) — Entri Ensiklopedia Bisa Dipulihkan — ✅ FINAL

`flag_ensiklopedia_sacrificed_nggarindu` **DIKONFIRMASI bisa dipulihkan** lewat mekanik lain — secara spesifik disebut SM-M07 (Penebusan, Smarana) sebagai jalur pemulihan yang sudah ada di Kerangka Misi v0.2. Ini berarti:

- Entri yang "direlakan" di NR-S04 TIDAK hilang permanen — statusnya sama dengan entri yang terjual lewat Neraca Dagang di Smarana
- Sistem harus men-tag entri yang hilang lewat NR-S04 dengan cara yang SAMA seperti entri yang hilang lewat Neraca Dagang, supaya SM-M07 bisa mendeteksi dan memulihkan keduanya lewat 1 sistem terpadu, bukan 2 sistem terpisah
- **Implikasi untuk Kerangka Misi:** SM-M07 perlu direvisi deskripsinya — saat ini hanya menyebut "Neraca Dagang" sebagai sumber kehilangan, padahal sekarang juga mencakup NR-S04. Saya tandai ini sebagai perubahan yang perlu diteruskan ke dokumen Kerangka Misi (lihat catatan di bawah).

**Tindak lanjut lintas-dokumen:** Kerangka Misi v0.2 §SM-M07 perlu diperbarui deskripsinya menjadi "Untuk setiap entri Ensiklopedia yang hilang **lewat mekanisme apa pun (Neraca Dagang ATAU pengorbanan sukarela seperti NR-S04)**, pemain bisa menebus lewat puzzle unik per entri." Saya rekomendasikan update ini dieksekusi di Kerangka Misi, tapi tidak saya lakukan otomatis di sini karena itu file terpisah — konfirmasi jika kamu mau saya update sekarang.

---

# STATUS SISA — TIDAK ADA LAGI ITEM TERBUKA UNTUK REGION 1

Kelima item tindak lanjut sudah diputuskan dan dieksekusi. Region 1 Nirwasita sekarang punya:
- ✅ 13 misi ter-script detail (trigger, flag, dialog, battle params, fail state)
- ✅ 3 monster region terverifikasi kanon (2 existing + 1 baru, tidak ada duplikasi)
- ✅ Placeholder combat math ditandai eksplisit, jadwal revisi ditetapkan (pasca 9 region)
- ✅ 1 fail state permanen (NR-H03) dengan spesifikasi UI final
- ✅ Sequencing lintas-misi (NR-S03) dikonfirmasi
- ✅ Mekanisme pemulihan Ensiklopedia (NR-S04) terhubung ke sistem lintas-region yang sudah ada

**Satu item administratif tersisa (bukan keputusan desain):** update deskripsi SM-M07 di Kerangka Misi untuk mencerminkan sumber kehilangan ganda (Neraca Dagang + NR-S04). Ini murni sinkronisasi dokumen, menunggu konfirmasi kamu untuk dieksekusi.

---

*Quest Script Region 1 — Draf v0.2 · September 2026*
*Status: 13/13 misi Nirwasita di-script detail. Seluruh 5 item tindak lanjut v0.1 sudah diputuskan dan dieksekusi. 3 monster region terverifikasi konsisten dengan World Bible §1.8 (2 kanon existing + 1 baru ditambahkan). 1 item sinkronisasi lintas-dokumen menunggu konfirmasi (update SM-M07). Belum diimplementasi, belum playtest.*
