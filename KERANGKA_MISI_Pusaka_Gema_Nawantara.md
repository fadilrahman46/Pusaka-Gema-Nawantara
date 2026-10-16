# KERANGKA MISI
# PUSAKA: GEMA NAWANTARA

**Versi:** Draf v0.1 — Kerangka Review
**Status:** 🟡 KERANGKA — belum detail quest script, belum playtest
**Rujukan kanon:**
- `World_Bible_Pusaka_Gema_Nawantara_v5.1.md` (struktur region, mekanik, NPC, zona, resolusi)
- `GUIDE_KARAKTER_100_Nawantara_FINAL_v1.1.md` (lore karakter, skill, Cara Didapat)
- `DOKUMEN_ITEM_Pusaka_Gema_Nawantara_FINAL_v1.md` (Titah karakter, Item Spesial, katalog item)
**Tidak dirujuk:** GDD v3.0
**Tanggal:** September 2026

---

## KONVENSI DOKUMEN

### Kode Misi

| Prefiks | Arti |
|---|---|
| `NR` / `KD` / `SM` / `WN` / `KL` / `HM` / `RJ` / `JL` / `AW` | Region (Nirwasita / Kadewan / Smarana / Wanasunya / Kalamrtu / Himagiri / Rajawani / Jaladri / Anawil) |
| `-M##` | Main Mission |
| `-S##` | Side Mission |
| `-H##` | Hidden Mission |

### Struktur Tiap Misi

Setiap misi wajib punya **dua komponen gameplay**:
- **Battle** — pertarungan dengan kondisi menang/kalah yang terikat ke narasi, bukan sekadar "habiskan HP lawan"
- **Teka-teki** — puzzle lingkungan, observasi, dialog bercabang, mini-game, atau tantangan non-combat yang terikat ke mekanik signature region

### Rujukan Silang

Kolom `Koneksi Dokumen` menunjukkan dari mana elemen misi diambil:
- **WB** = World Bible (§ section)
- **GK** = Guide Karakter (# nomor karakter)
- **DI** = Dokumen Item (§ bagian)

---

# REGION 1 — NIRWASITA · Kota yang Bersembunyi Supaya Selamat

**Season:** S1 (wajib pertama, linear) · **Mekanik Signature:** Jalan yang Menutup Kembali (kompas berputar saat diam >5 detik)
**Estimasi:** 13 misi (6 Main + 4 Side + 3 Hidden) · **NPC Kunci:** Nenek Ranaya, Adi
**Prinsip misi WB §1.6:** min 1 misi tanpa HUD kompas; rantai Nenek Ranaya 3-4 tahap; 1 misi opsional Adi

---

## Main Mission

### NR-M01 · Kabut Pertama
**Zona:** N1 Teluk Ranaya → N2 Wana Sanu
**Deskripsi:** Pemain tiba di pesisir Nirwasita setelah kematian kakek (TL 117, Srawana 1). Kabut turun, kompas mulai berputar — tutorial mekanik signature.
**Teka-teki:** Navigasi dari N1 ke N2 menggunakan penanda visual lingkungan (pohon berbekas, batu bertanda), bukan HUD. Pemain belajar bahwa berhenti >5 detik = kompas berputar lebih cepat.
**Battle:** 2-3 encounter Penari Kabut (monster umum region) di N2. Kondisi menang: tiba di titik tujuan, bukan membunuh semua — lawan respawn tanpa batas kalau pemain diam terlalu lama.
**Reward:** Penunjuk Basah (Common Jimat, DI §1.1) sebagai drop pertama — mengurangi distorsi kompas sedikit.
**Koneksi Dokumen:** WB §1.1 (Storyline pembuka), WB §1.2 (tutorial Mekanik Signature), WB §IX-C.5 (TL 117 Srawana 1), DI §1.1 (item Common Nirwasita)

### NR-M02 · Suara di Balik Danau
**Zona:** N2 Wana Sanu → N3 Danu Sanu
**Deskripsi:** Pemain mendengar nyanyian lagu dari seberang danau. Menemukan Nenek Ranaya untuk pertama kali — ia tidak mau bicara, hanya bernyanyi, dan lagu-lagunya adalah petunjuk arah.
**Teka-teki:** Dengarkan 3 bait lagu Nenek Ranaya; tiap bait menyebut penanda alam (mis. "sungai yang belok dua kali"). Pemain harus menemukan lokasi yang cocok di N3. Dialog bercabang: tanya langsung (ia menolak) vs dengarkan sampai habis (ia memberi clue zona berikutnya).
**Battle:** Encounter Lampah Sinaru (#01, GK) sebagai NPC pertarungan tutorial — karakter ini "menuntun ke tempat yang bukan tujuan", jadi pemain harus menolak mengikutinya setelah menang. Kondisi menang: kalahkan Lampah Sinaru TANPA berhenti bergerak (mekanik signature aktif).
**Reward:** Lampah Sinaru bergabung (Common, Ghost/Bayu/CC). Sloka Misi untuk skill Lampah Sinaru.
**Koneksi Dokumen:** WB §1.6 (rantai Nenek Ranaya tahap 1), WB §1.7 (NPC Nenek Ranaya), GK #01 (lore Lampah Sinaru), DI §3.2 (Titah Lampah Sinaru — "Titah Rombongan yang Tak Sampai")

### NR-M03 · Enam Puluh Tahun Menunggu
**Zona:** N3 Danu Sanu → N4 Lembah Diam
**Deskripsi:** Pemain bertemu Tandaraga (#02) — penjaga yang enam puluh tahun berlatih untuk perang yang tak pernah datang. Ia mengira pemain adalah ancaman. Harus dibuktikan pemain datang untuk memulihkan, bukan menyerang.
**Teka-teki:** Puzzle "kesabaran mekanis" — pemain dihadapkan 3 ronde battle di mana ia TIDAK BOLEH menyerang duluan. Tiap ronde, Tandaraga menguji dengan serangan yang bisa dihindari lewat positioning. Jika pemain menyerang duluan, battle reset.
**Battle:** Tandaraga sebagai sparring — bukan dikalahkan, tapi ditahan 5 ronde tanpa menyerang. Kondisi menang berbasis durasi, bukan damage. Echo lore "perang yang tak datang" dan efek item Tongkat Perantau (DI §1.1 Uncommon: "menguat tiap ronde pemakainya tidak menyerang duluan").
**Reward:** Tandaraga bergabung (Common, Human/Teja/Attacker). Tongkat Perantau drop dari zona N3.
**Koneksi Dokumen:** WB §1.1 (tema 60 tahun), GK #02 (lore Tandaraga), DI §1.1 (Tongkat Perantau), DI §3.2 (Titah Tandaraga)

### NR-M04 · Adi dan Gerbang Terbuka
**Zona:** N4 Lembah Diam → N5 Kabut Kelambu
**Deskripsi:** Pemain bertemu Adi, anak ±10 tahun, satu-satunya penduduk Nirwasita yang ingin dunia luar datang. Ia tahu jalan menembus Kabut Kelambu, tapi warga melarangnya bicara ke orang luar.
**Teka-teki:** Misi tanpa HUD kompas SEPENUHNYA (syarat WB §1.6). Adi memberikan petunjuk lewat gestur (menunjuk, menggeleng) — bukan teks. Pemain harus menavigasi N5 hanya dari gerakan Adi dan suara lingkungan (burung, air). 3 persimpangan, salah pilih = kembali ke awal persimpangan itu.
**Battle:** Di ujung N5, encounter 1 Penyesat Jalan (Elite monster) yang menyamar jadi Adi palsu. Puzzle mid-battle: identifikasi mana Adi asli lewat perilaku (Adi asli tidak pernah berhenti bergerak — echo mekanik signature). Serang yang salah = Adi asli terluka, misi gagal.
**Reward:** Akses ke N6 Kuta Wisata. Kompas Karat (Rare Jimat, DI §1.1) drop dari boss.
**Koneksi Dokumen:** WB §1.1 (Adi sebagai titik balik), WB §1.6 (misi tanpa HUD kompas), WB §1.10 (Resolusi Region — misi Adi penentu ending), DI §1.1 (Kompas Karat)

### NR-M05 · Lagu Perjalanan Tua
**Zona:** N6 Kuta Wisata → N7 Menara Pandu
**Deskripsi:** Nenek Ranaya mengajarkan lagu terakhir — lagu yang dipakai untuk membuka jalan ke Menara Pandu. Tapi lagunya tidak lengkap; 1 bait hilang. Pemain harus menemukan bait terakhir dari fragmen yang tersebar.
**Teka-teki:** Kumpulkan 3 fragmen bait lagu dari NPC berbeda di N6 (Sanra Ranu, vendor Sanra Buri, seorang tetua tanpa nama). Setiap fragmen hanya bisa didapat lewat interaksi spesifik — salah satu butuh pemain menyanyikan bait sebelumnya dengan benar (mini-game ritme/urutan). Jawaban benar = gabungan 3 fragmen yang membentuk bait terakhir.
**Battle:** Penjaga Menara (Elite) yang hanya bisa dikalahkan sambil "bernyanyi" — mekanik: tiap 2 ronde, pemain harus memilih 1 dari 3 baris lagu yang benar. Salah = boss heal penuh. Benar = boss kehilangan 1 fase perisai.
**Reward:** Akses Menara Pandu. Lentera Nenek Ranaya (Super Rare Pusaka, DI §1.1) — menandai jalur permanen.
**Koneksi Dokumen:** WB §1.6 (rantai Nenek Ranaya tahap 3-4), WB §1.7 (Nenek Ranaya), WB §1.9 (Item Spesial — syarat "seluruh lagu perjalanan"), DI §1.1 (Lentera Nenek Ranaya), DI §2 (Kalung Jalan Pulang — Item Spesial)

### NR-M06 · Kabut Terbuka
**Zona:** N7 Menara Pandu
**Deskripsi:** Konfrontasi dengan Nirsmara (#09, Legendary). Pemain tidak mengalahkannya lewat kekerasan — ia harus "diingatkan". Battle berakhir saat Nirsmara "diingatkan", bukan dihabisi HP-nya.
**Teka-teki:** Battle 3 fase. Fase 1-2: pertarungan biasa (belajar pola). Fase 3: pemain harus berhenti menyerang dan menyanyikan lagu perjalanan tua (memilih urutan bait benar dari 4 opsi). Ini SATU-SATUNYA cara mengakhiri fase 3 — damage normal tidak mengurangi HP Nirsmara di fase ini. Pasif Nirsmara (GK #09: "lawan tidak bisa menerapkan debuff yang sama dua kali") aktif penuh — pemain tidak bisa spam satu strategi.
**Battle:** Nirsmara — Legendary Ghost/Akasa/Tank. HP pool besar, pasif anti-repetisi. Fase 1: konvensional. Fase 2: ia memanggil kabut (seluruh tim pemain kehilangan akurasi 50%). Fase 3: transisi ke mekanik lagu.
**Reward:** Nirsmara bergabung. Peta yang Tidak Pernah Selesai (Ultra Rare Pusaka, DI §1.1). Kalung Jalan Pulang (Item Spesial region, DI §2) jika rantai Nenek Ranaya selesai penuh.
**Koneksi Dokumen:** WB §1.1 (ending region), WB §1.10 (Resolusi), GK #09 (Nirsmara pasif), DI §2 (Kalung Jalan Pulang), DI §3.2 (Titah Nirsmara §3.10)

---

## Side Mission

### NR-S01 · Gudang Barang Tertinggal
**Zona:** N3-N4
**Deskripsi:** Lare Wengi (#05) mengajak pemain ke gudang barang yang ditinggalkan penduduk saat Nirwasita menutup diri. Di dalamnya ada kenangan — dan bahaya.
**Teka-teki:** Identifikasi 5 barang yang punya "pemilik" dari clue lingkungan (nama terukir, bau tertentu, ukuran). Salah pasangkan = monster muncul dari barang itu.
**Battle:** 3 encounter bertingkat, makin sulit tiap salah pasang. Benar semua = 0 battle, langsung reward.
**Reward:** Lare Wengi Titah selesai ("Titah Gudang Barang Tertinggal"). Jimat Gudang Barang Tertinggal (DI §3.2).
**Koneksi Dokumen:** GK #05 (lore Lare Wengi), DI §3.2 (Titah & item Lare Wengi)

### NR-S02 · Empat Ratus Bait
**Zona:** N4-N5
**Deskripsi:** Kayuri Sindu (#06) menyimpan 400 bait syair perlindungan. Ia percaya jika seluruhnya dibacakan tanpa jeda, kabut akan terbuka selamanya. Tapi ia hanya hafal 398.
**Teka-teki:** Mini-game memori: pemain mendengar 10 bait, lalu harus mengulang urutannya. 2 bait terakhir harus "diciptakan" — pemain memilih dari 4 opsi yang masing-masing punya nuansa berbeda (perlindungan/pengampunan/keberanian/kepasrahan). Tidak ada jawaban salah, tapi pilihan mempengaruhi dialog Kayuri Sindu.
**Battle:** Encounter "Syair yang Menyerang" — 400 fragmen yang jadi entitas. Kondisi menang: bertahan 4 ronde (1 ronde per 100 bait), bukan membunuh.
**Reward:** Kayuri Sindu Titah selesai ("Titah Empat Ratus Bait"). Jimat Empat Ratus Bait (DI §3.2).
**Koneksi Dokumen:** GK #06 (lore Kayuri Sindu — "400 bait"), DI §3.2 (Titah & item Kayuri Sindu)

### NR-S03 · Misi Opsional Adi — Dunia Luar
**Zona:** N6 Kuta Wisata
**Deskripsi:** Adi meminta pemain menceritakan dunia luar. Pemain bisa jujur (dunia luar berbahaya) atau memberi harapan. Keputusan ini menentukan Resolusi Region.
**Teka-teki:** Dialog bercabang 3 lapis. Tiap jawaban mengubah reaksi Adi dan NPC sekitar. Di akhir, Adi meminta pemain untuk TIDAK menyerangnya di titik konflik — ia menghalangi jalan ke N7 karena takut hasilnya. Pemain harus memilih: lewati paksa (Adi menganggap dunia luar mengecewakan) atau tunggu sampai ia siap (Adi ikut sebagai NPC pendukung di Padepokan pasca-region).
**Battle:** Jika pemain lewati paksa: 1 encounter Adi (bukan battle lethal — ia hanya menghalangi, HP rendah, tumbang dalam 1 hit). Jika pemain menunggu: 0 battle, tapi harus selesaikan 1 puzzle navigasi tambahan tanpa Adi.
**Reward:** Resolusi Region. Jalur 1: Adi tetap menganggap dunia luar buruk. Jalur 2: Adi ikut ke Padepokan.
**Koneksi Dokumen:** WB §1.1 (Adi, titik balik), WB §1.6 (misi opsional Adi), WB §1.10 (Resolusi Region)

### NR-S04 · Harga Perlindungan (Titah Nggarindu)
**Zona:** N5-N7
**Deskripsi:** Titah Super Rare. Nggarindu (#08) adalah "kenangan yang direlakan penduduk" — ditemukan lewat fragmen ingatan tersembunyi.
**Teka-teki:** Temukan 5 fragmen "kenangan yang dilupakan" di N5-N7. Tiap fragmen tersembunyi di lokasi yang hanya terlihat saat kompas berhenti berputar sesaat (jendela waktu sempit). Di altar kabut N7: pilih untuk "merelakan" — serahkan 1 entri Ensiklopedia (tidak permanen, berbeda dari Nirsmara).
**Battle:** Manifestasi kabut — 3 fase battle di mana lawan menyerap kenangan pemain (menghapus 1 skill dari 1 karakter per fase sementara). Kondisi menang: selesaikan tanpa item pemulih ingatan.
**Reward:** Nggarindu bergabung (Super Rare, Spirit/Bayu/Tank). Pusaka Harga Perlindungan (DI §3.2).
**Koneksi Dokumen:** DI §3.10 (Titah Nggarindu penuh — 3 tahap), GK #08 (lore), DI §3.2 (item unik)

---

## Hidden Mission

### NR-H01 · Rumah Ranaya Lama
**Zona:** N2 Wana Sanu (Area Tersembunyi WB §1.12)
**Deskripsi:** Setelah seluruh dialog Nenek Ranaya selesai, pondok tersembunyi muncul di balik N2. Di dalamnya: cerita lengkap kenapa Nirwasita memilih bersembunyi. Bukan pertarungan — tapi ingatan.
**Teka-teki:** 5 mural di dinding pondok, urutannya teracak. Susun kronologi kejadian dari clue visual (tanpa teks). Urutan benar = Nenek Ranaya menceritakan versi lengkap, membuka 3 entri Ensiklopedia eksklusif.
**Battle:** 1 encounter opsional — "Kenangan Ranaya Muda" (battle melawan versi muda Nenek Ranaya sebagai sparring nostalgia, bukan ancaman — ia memberi buff permanen ke Sanra Ranu jika dimenangkan).
**Reward:** Batu Gema langka (3 buah). 3 entri Ensiklopedia eksklusif. Buff permanen Sanra Ranu (#03) jika battle dimenangkan.
**Koneksi Dokumen:** WB §1.12 (Area Tersembunyi — Rumah Ranaya Lama), GK #03 (Sanra Ranu)

### NR-H02 · Musuh yang Sebenarnya (Titah Wira Senja)
**Zona:** N6-N7
**Deskripsi:** Titah Ultra Rare. Wira Senja (#84) adalah "kelanjutan tematik Tandaraga" — penjaga yang menghadapi lawan yang bukan perang.
**Teka-teki:** Selesaikan 3 battle di N6-N7 di mana Wira Senja TIDAK BOLEH menyerang lebih dari 1x per battle. Pemain harus micro-manage agar Wira Senja bertindak sebagai tank/support, bukan attacker — bertentangan dengan role Attacker-nya. Puzzle bertema "kekuatan yang tidak dipakai."
**Battle:** Battle akhir melawan Sang Sunyi (manifestasi) — lawan TIDAK menyerang balik. Kondisi menang: bertahan X ronde tanpa menyerang. Kemenangan taktis tidak berlaku.
**Reward:** Wira Senja bergabung (Ultra Rare, Human/Teja/Attacker). Senjata Musuh yang Sebenarnya (DI §3.2).
**Koneksi Dokumen:** DI §3.10 (Titah Wira Senja penuh — 3 tahap), GK #84 (lore), WB §1.1 (NPC pendukung)

### NR-H03 · Yang Tertanam Selamat (Titah Saras Pertiwi)
**Zona:** N4-N6
**Deskripsi:** Titah Super Rare. Saras Pertiwi (#85) — ditemukan dengan TIDAK menggali titik penguburan ingatan.
**Teka-teki:** Temukan 3 "titik penguburan ingatan" di N4-N6. Di tiap titik, game menampilkan opsi "Gali" yang menggoda (dengan preview reward palsu). Pemain harus pilih "Tidak" di ketiga titik. Jika menggali salah satu = misi gagal permanen di playthrough ini.
**Battle:** 0 battle jika berhasil tidak menggali. Saras Pertiwi muncul di titik ketiga — ia bergabung karena dihormati kesenyapannya.
**Reward:** Saras Pertiwi bergabung (Super Rare, Spirit/Pertiwi/Support). Jimat Yang Tertanam Selamat (DI §3.2).
**Koneksi Dokumen:** DI §3.10 (Titah Saras Pertiwi penuh — 3 tahap), GK #85 (lore — "bicara berarti mengeluarkan sesuatu yang seharusnya tetap terkubur")

---

# REGION 2 — KADEWAN · Yang Masih Dipanggil, Tak Lagi Dimengerti

**Season:** S1 (wajib kedua, linear) · **Mekanik Signature:** Ritual Otomatis (buff/debuff acak tiap 3 ronde)
**Estimasi:** 15 misi (6 Main + 6 Side + 3 Hidden) · **NPC Kunci:** Jero Mangku, Luh Sari
**Prinsip misi WB §2.6:** min 1 misi efisiensi vs makna; rantai Jero Mangku; misi dualitas Bharwang-Randu

---

## Main Mission

### KD-M01 · Upacara Pagi
**Zona:** D1 Sawah Laras
**Deskripsi:** Pemain tiba di Kadewan, menyaksikan upacara pagi yang dijalankan sempurna — tapi tidak ada yang tahu artinya. Tutorial Ritual Otomatis: battle pertama menunjukkan efek buff/debuff acak tiap 3 ronde.
**Teka-teki:** Observasi 3 gerakan upacara. Jero Mangku bertanya: "Apa artinya?" — 4 opsi jawaban, semuanya salah. Ini disengaja: poinnya bukan menjawab benar, tapi menyadari bahwa jawabannya memang hilang.
**Battle:** 2 encounter Penari Kosong (monster umum, WB §2.8) di D1. Ritual Otomatis terpicu — pemain belajar merencanakan di sekitar ketidakpastian.
**Reward:** Lembar Doa Usang (Common Kitab, DI §1.2). Jero Mangku memberi akses ke D2.
**Koneksi Dokumen:** WB §2.1 (Storyline), WB §2.2 (tutorial Ritual Otomatis), WB §2.7 (Jero Mangku), DI §1.2 (Lembar Doa Usang)

### KD-M02 · Dua yang Satu
**Zona:** D2 Wana Wanara → D3 Bale Ombak
**Deskripsi:** Pertarungan ganda Bharwang Kesari (#13) vs Rarwang Celeng (#14) — keduanya tidak bisa dimenangkan tanpa merugikan kedua pihak.
**Teka-teki:** Battle khusus: kedua karakter bertarung satu sama lain. Pemain harus MEMILIH siapa yang dibantu — tapi membantu satu = merugikan yang lain. Opsi ketiga tersembunyi: tidak membantu siapa pun selama 5 ronde → keduanya kelelahan dan berhenti sendiri. Puzzle: sadari bahwa "menang" berarti tidak ikut campur.
**Battle:** 2v2 encounter — Bharwang Kesari & Rarwang Celeng sebagai NPC bermusuhan. Jika pemain memilih sisi: battle 3 ronde mudah. Jika diam: battle 5 ronde tanpa aksi ofensif (bertahan saja), tapi kedua karakter bergabung.
**Reward:** Bharwang Kesari + Rarwang Celeng bergabung. Jalur "diam" memberi keduanya, jalur "pilih" hanya satu.
**Koneksi Dokumen:** WB §2.1 (dualitas), WB §2.6 (misi dualitas Bharwang-Randu), GK #13 & #14 (lore), DI §3.3 (Titah kedua karakter)

### KD-M03 · Doa yang Salah Satu Barisnya Benar
**Zona:** D3 Bale Ombak → D5 Griya Sunya
**Deskripsi:** Rantai Jero Mangku tahap 2 — ia menemukan bahwa 1 baris dari doa harian ternyata BENAR, tapi ia tidak tahu yang mana. 7 baris, salah satunya bermakna.
**Teka-teki:** Investigasi 7 baris doa. Tiap baris punya clue di lokasi berbeda (D3-D5). Pemain mengumpulkan bukti, lalu menebak baris mana yang asli. Mini-game eliminasi: setiap bukti mengeliminasi 1-2 baris. Jawaban akhir harus tepat; salah = harus kumpulkan bukti lagi.
**Battle:** Di D5, Sesaji Berjalan (Elite, WB §2.8) — persembahan yang bergerak sendiri — menjaga salah satu clue. Battle dengan Ritual Otomatis aktif di malam hari (tiap 2 ronde, bukan 3 — WB §2.12).
**Reward:** Progres rantai Jero Mangku. Mantra yang Dilupakan Artinya (Uncommon Kitab, DI §1.2).
**Koneksi Dokumen:** WB §2.6 (rantai Jero Mangku), WB §2.7 (Jero Mangku lokasi D3, D7), WB §2.8 (Sesaji Berjalan), DI §1.2

### KD-M04 · Efisiensi atau Makna
**Zona:** D5 Griya Sunya → D6 Nusa Gersang
**Deskripsi:** Misi pilihan inti region (WB §2.6). Pemain menemukan bahwa Sang Werdi (#19) — wujud kolektif ritual — masih memberi bonus mekanis (heal/buff +20%) meskipun ritual kosong. Jero Mangku menawari pemain: pulihkan makna 1 baris doa (bonus Sang Werdi turun 5%), atau biarkan kosong (bonus utuh).
**Teka-teki:** Dialog bercabang 4 lapis — TIDAK ADA jawaban yang "benar secara moral". Pemain diberi data mekanis nyata (bonus 20% vs 15%) dan data naratif (Jero Mangku tersenyum vs kecewa). Pilihan ini menentukan Resolusi Region.
**Battle:** Encounter "Ritual yang Memberontak" — jika pemain pilih memulihkan makna, ritual melawan (battle 3 fase). Jika biarkan kosong, 0 battle tapi Jero Mangku tidak bergabung.
**Reward:** Resolusi Region ditentukan. Jalur makna: Jero Mangku bergabung sebagai NPC, Sang Werdi -5%. Jalur efisiensi: tidak ada NPC tambahan, Sang Werdi utuh.
**Koneksi Dokumen:** WB §2.1 (konflik efisiensi vs makna), WB §2.6 (syarat misi), WB §2.10 (Resolusi Region), GK #19 (pasif Sang Werdi — "selama hidup, seluruh heal & buff tim +20%")

### KD-M05 · Sembilan Ratus Tahun Terakhir
**Zona:** D6 Nusa Gersang → D7 Puncak Laras
**Deskripsi:** Persiapan ke Puncak Laras. Pemain harus melewati zona terisolasi tempat upacara sudah diulang 900 tahun tanpa audiens.
**Teka-teki:** Puzzle lingkungan — ikuti jejak upacara yang benar di D6 (4 titik harus dikunjungi dalam urutan sesuai pola yang hanya terlihat dari satu sudut pandang tertentu). Salah urutan = debuff Ritual Otomatis tambahan.
**Battle:** 3 encounter bertingkat di D6 — monster makin kuat tiap ronde ganjil (echo "Ritual Otomatis makin intens di malam hari"). Genta Tanpa Suara (Rare Pusaka, DI §1.2) drop dari encounter terakhir.
**Reward:** Akses D7. Genta Tanpa Suara.
**Koneksi Dokumen:** GK #11 (Kala Sesari — lore "900 tahun"), DI §1.2 (Genta Tanpa Suara)

### KD-M06 · Rasa yang Kembali
**Zona:** D7 Puncak Laras
**Deskripsi:** Konfrontasi dengan Sang Werdi (#19, Legendary). Bukan pertarungan melawan kejahatan — pemain harus memilih apakah memulihkan makna ritual atau membiarkannya berfungsi tanpa pemahaman.
**Teka-teki:** Battle akhir yang tergantung pilihan KD-M04. Jalur makna: Sang Werdi melemah (hanya 2 fase, bukan 3), tapi pemain harus menjawab "mengapa ritual dilakukan" (bukan mengulang gerakannya). Jawaban dari clue yang dikumpulkan sepanjang rantai Jero Mangku. Jalur efisiensi: Sang Werdi full power (3 fase), battle konvensional.
**Battle:** Sang Werdi — Legendary Spirit/Teja/Support. Pasif aktif: selama ia hidup, seluruh heal & buff tim +20% (ini membantu TIM PEMAIN juga, ironi: "mengalahkan" dia = kehilangan buff sendiri). Fase terakhir jalur makna: Sang Werdi "diingatkan" lewat baris doa benar — echo mekanik Nirsmara.
**Reward:** Sang Werdi bergabung. Genta Makna (Item Spesial region, DI §2) jika rantai Jero Mangku selesai. Restu yang Menguat dalam Diam (Ultra Rare Pusaka, DI §1.2).
**Koneksi Dokumen:** WB §2.1 (ending region), WB §2.9 (Genta Makna), GK #19 (Sang Werdi), DI §2 (Genta Makna), DI §3.10 (Titah Sang Werdi — adaptasi Cara Didapat kanon)

---

## Side Mission

### KD-S01 · Urutan yang Diwariskan (Titah Juru Wangsuh)
**Zona:** D1-D2
**Teka-teki:** Ikuti urutan cuci ritual Juru Wangsuh (#10) — 7 langkah, pemain harus mengulang persis. Twist: langkah ke-5 sengaja salah (ia sendiri tidak tahu).
**Battle:** Encounter air tercemar di D2 — monster berbasis Apah, lemah terhadap Teja.
**Reward:** Titah selesai. Kitab Urutan yang Diwariskan (DI §3.3).
**Koneksi Dokumen:** GK #10 (lore), DI §3.3

### KD-S02 · Lupa Bentuk Asli (Titah Rarwang Celeng)
**Zona:** D2-D3
**Teka-teki:** Rarwang Celeng tidak ingat bentuk aslinya. Pemain menemukan 3 lukisan lama yang masing-masing menggambarkan wujud berbeda — identifikasi mana yang asli lewat cross-reference dengan lore Bharwang Kesari.
**Battle:** Encounter "Bayangan Bentuk Lama" — 3 monster yang masing-masing meniru 1 wujud. Hanya 1 yang bisa dikalahkan tanpa konsekuensi.
**Reward:** Titah selesai. Senjata Lupa Bentuk Asli (DI §3.3).
**Koneksi Dokumen:** GK #14 (lore), DI §3.3

### KD-S03 · Sumber yang Diulang (Titah Kidang Belantik)
**Zona:** D1-D3
**Teka-teki:** Ikuti Kidang Belantik ke sumber air upacara setiap fajar (3 hari in-game). Catat perubahan ritualnya — puzzle observasi (apa yang berbeda tiap pagi?).
**Battle:** Di hari ke-3, sumber air "merespons" — encounter monster air yang memakai pola yang sama dengan ritual Kidang Belantik. Pemain harus memprediksi pola serangannya dari observasi 2 hari sebelumnya.
**Reward:** Titah selesai. Senjata Sumber yang Diulang (DI §3.3).
**Koneksi Dokumen:** GK #86 (lore — "minum dari sumber air upacara setiap fajar"), DI §3.3

### KD-S04 · Penari yang Melihat Roh (Rantai Luh Sari)
**Zona:** D1-D2
**Deskripsi:** Luh Sari, penari muda yang bisa melihat roh, dianggap sakit oleh keluarganya. Pemain harus membuktikan kemampuannya nyata tanpa membuat keluarganya takut.
**Teka-teki:** Dialog bercabang — bicara ke keluarga Luh Sari (3 NPC) dan ke Luh Sari sendiri. Kunci: temukan roh yang hanya Luh Sari bisa lihat, lalu buat bukti tanpa Luh Sari terlibat langsung.
**Battle:** Encounter roh yang hanya bisa di-target karakter Ghost di tim. Kalau tidak punya Ghost: puzzle alternatif lewat item Kitab.
**Reward:** Akses Sanggar Luh Sari (Area Tersembunyi, WB §2.12). Sloka Misi.
**Koneksi Dokumen:** WB §2.7 (NPC Luh Sari), WB §2.12 (Sanggar Luh Sari)

### KD-S05 · Tidak Ada yang Menanggung Semuanya (Titah Lembujaga)
**Zona:** D4 Kawah Bara
**Teka-teki:** Lembujaga (#16) menahan seluruh beban spiritual Kadewan sendirian. Puzzle: distribusikan beban ke 5 penjaga yang masing-masing hanya sanggup menanggung 1 jenis. Mini-game alokasi resource.
**Battle:** Encounter di D4 melawan manifestasi beban yang gagal didistribusi — battle makin mudah proporsional dengan seberapa baik pemain mendistribusi.
**Reward:** Titah selesai. Kitab Tidak Ada yang Menanggung Semuanya (DI §3.3).
**Koneksi Dokumen:** GK #16 (lore), DI §3.3

### KD-S06 · Titah Sembilan Ratus Tahun (Kala Sesari)
**Zona:** D6 Nusa Gersang
**Deskripsi:** *(Ditambahkan v0.3 — mengisi gap rekrutmen yang ditemukan saat Quest Script R2: Kala Sesari direferensikan lore-nya di KD-M05 tapi sebelumnya tidak punya jalur rekrutmen eksplisit.)* Kala Sesari (#11) adalah tumpukan persembahan yang terkumpul 900 tahun tanpa jeda, kini bergerak sendiri — tapi ia tidak tahu ia seharusnya untuk siapa. Pemain menemukannya di titik yang sama tempat 3 battle bertingkat KD-M05 terjadi, SETELAH region itu selesai — ia baru "tenang" cukup untuk didekati setelah upacara 900 tahun itu disaksikan penuh oleh seseorang (pemain).
**Teka-teki:** Investigasi catatan persembahan tertua di D6 — 3 fragmen sejarah tersembunyi (berbeda dari 4 titik upacara KD-M05, ini catatan tertulis/terukir yang terpisah) mengungkap SIAPA penerima persembahan yang asli, yang sudah lama dilupakan Kadewan sendiri. Puzzle investigasi murni, tanpa battle di tahap ini.
**Battle:** Setelah 3/3 fragmen terkumpul, Kala Sesari "goyah" — 900 tahun kebiasaan yang tiba-tiba diberi jawaban menyebabkan gejolak sesaat. Battle singkat (bukan melawan untuk mengalahkan, tapi menstabilkan): kondisi menang adalah bertahan 3 ronde tanpa menyerang balik (echo pola kesabaran yang sudah jadi motif berulang region ini), sampai ia tenang.
**Reward:** Kala Sesari bergabung (Common, Ghost/Teja/CC). Kitab Sembilan Ratus Tahun (item KANON — sudah tercatat di DI §3.3 sebelum misi ini dibuat; ternyata Dokumen Item sudah mengantisipasi Titah ini duluan, hanya belum ada misi yang menyalurkannya).
**Koneksi Dokumen:** GK #11 (lore — "ia tidak tahu ia seharusnya untuk siapa", terjawab lewat misi ini), WB §2.6 (rantai tematik 900 tahun, echo KD-M05), DI §3.3 (item baru)

---

## Hidden Mission

### KD-H01 · Sanggar Luh Sari
**Zona:** D2 (Area Tersembunyi — WB §2.12)
**Syarat buka:** Selesaikan KD-S04 penuh.
**Teka-teki:** Di sanggar, Luh Sari menari — pemain menyaksikan versi alternatif sejarah Kadewan yang hanya terlihat lewat tarian. Puzzle: interpretasi 5 gerakan tari jadi 5 kata kunci, susun jadi kalimat yang menjawab "mengapa ritual dilakukan."
**Battle:** Encounter opsional — Sukma Kera Wanara versi lore alternatif. Bukan wajib untuk reward.
**Reward:** Jawaban "mengapa ritual dilakukan" — bisa dipakai di KD-M06 jalur makna. 1 entri Ensiklopedia eksklusif.
**Koneksi Dokumen:** WB §2.12 (Sanggar Luh Sari), WB §2.6 (rantai Jero Mangku)

### KD-H02 · Duka yang Tak Dirasakan (Titah Rarasunyi)
**Zona:** D5-D6
**Teka-teki:** Ikuti 1 upacara duka NPC TANPA skip dialog. Temukan sumber duka "tanpa alamat" lewat clue lingkungan. Observasi murni — tidak ada quest marker.
**Battle:** Battle melawan "akumulasi duka" — kondisi menang: tidak menyerang duluan selama 3 ronde. Echo tema Nirwasita (kesabaran), tapi di konteks berbeda (empati, bukan navigasi).
**Reward:** Rarasunyi bergabung (Super Rare, Ghost/Akasa/CC). Kitab Duka yang Tak Dirasakan (DI §3.3).
**Koneksi Dokumen:** DI §3.10 (Titah Rarasunyi penuh), GK #17 (lore)

### KD-H03 · Yang Lebih Mudah Daripada Mendengarkan (Titah Randu Girang)
**Zona:** D3-D5
**Teka-teki:** Kumpulkan 3 kesaksian NPC — 2 menyebut Randu Girang "monster", 1 menyebut nama perempuannya. Puzzle: temukan kesaksian ketiga (tersembunyi, tidak ada quest marker). Dialog akhir: pilih memanggil namanya, bukan sebutannya.
**Battle:** 0 battle. Seluruh misi berbasis investigasi dan dialog. Randu Girang bergabung karena "diingat" untuk pertama kali dalam berabad-abad.
**Reward:** Randu Girang bergabung (Ultra Rare, Ghost/Teja/CC). Kitab Yang Lebih Mudah Daripada Mendengarkan (DI §3.3).
**Koneksi Dokumen:** DI §3.10 (Titah Randu Girang penuh), GK #18 (lore — "raksasa perempuan yang tidak pernah dipanggil namanya")

---

# REGION 3 — SMARANA · Kota yang Menjual Kelupaan

**Season:** S2 (bebas urutan, TG1) · **Mekanik Signature:** Neraca Dagang (menjual Batu Gema = hilang dari Ensiklopedia)
**Estimasi:** 17 misi (7 Main + 6 Side + 4 Hidden) · **NPC Kunci:** Kapten Lamalu, Juragan Ananta
**Prinsip misi WB §3.6:** min 1 misi paksa jual Batu Gema; 1 misi penebusan pasca-tamat

---

## Main Mission

### SM-M01 · Muara yang Menerima Semuanya
**Zona:** S1 Muara Larung
**Deskripsi:** Pemain tiba di pelabuhan Smarana. Tutorial Neraca Dagang: Juragan Ananta menjelaskan sistem — Batu Gema bisa dijual untuk akses/item/informasi, tapi yang dijual hilang permanen dari Ensiklopedia.
**Teka-teki:** Puzzle ekonomi: pemain diberi 3 Batu Gema awal. 1 harus dijual untuk membuka jalur ke S2 (wajib). Pilih mana yang dijual — tiap Batu Gema punya info berbeda. Satu berisi clue untuk Hidden Mission nanti.
**Battle:** 2 encounter Kuli Pelabuhan Bayang (monster umum, WB §3.8). Battle di malam hari = harga Neraca Dagang naik 20% (WB §3.12).
**Reward:** Akses S2. Kalung Gadai (Common Jimat, DI §1.3).
**Koneksi Dokumen:** WB §3.2 (Neraca Dagang), WB §3.7 (Juragan Ananta), WB §3.12 (siklus malam), DI §1.3

### SM-M02 · Harga Hari Ini
**Zona:** S2 Rawa Kelam → S3 Wana Sunya
**Deskripsi:** Bandar Ilung (#20) menunjukkan "pasar" di rawa — tempat barang yang nilainya berubah tiap hari. Pemain harus memahami fluktuasi untuk membeli info tentang lokasi pecahan Pusaka Gema.
**Teka-teki:** Mini-game perdagangan: harga 5 barang berubah tiap "hari" (ronde). Beli rendah, jual tinggi — tapi setiap transaksi menghapus 1 entri. Puzzle: temukan pola harga (setiap barang punya siklus 3-hari) dan beli info tanpa kehilangan entri kritis.
**Battle:** Encounter Penagih Utang Lama (Elite, WB §3.8) di S3 — menagih "hutang" yang sudah dilupakan siapa yang berhutang. Battle dengan mekanik debuff ekonomi (pemain kehilangan Kepeng tiap ronde).
**Reward:** Lokasi pecahan Pusaka Gema terungkap (dipajang di Bale Adol, S7). Pisau Penaksir (Uncommon Senjata, DI §1.3).
**Koneksi Dokumen:** WB §3.1 (pecahan dipajang di balai lelang), GK #20 (lore Bandar Ilung), DI §1.3, DI §3.4 (Titah Bandar Ilung)

### SM-M03 · Yang Tertinggal Entah Di Mana
**Zona:** S3 Wana Sunya → S4 Pasar Tanhana
**Deskripsi:** *(Dikoreksi — judul misi ini SUDAH sama persis dengan Titah kanon Antuwan Melayang #21 di Dokumen Item §3.4, tapi versi sebelumnya tidak menghubungkannya secara eksplisit. Diperbaiki saat penyusunan Quest Script R3.)* Pemain menemukan orang-orang yang "tidak dicari siapa pun" di gudang Smarana — secara hukum kota, mereka barang tak bertuan. Salah satunya BUKAN manusia — Antuwan Melayang (#21), Ghost yang melayang tiap malam mencari sesuatu yang ia yakin tertinggal, tapi tidak ingat apa.
**Teka-teki:** Investigasi — identifikasi 3 "barang tak bertuan" di gudang dari clue (nama terukir di barang, kota asal, alasan mereka terlupakan). Puzzle moral: pemain bisa "membeli" kebebasan mereka dengan menjual Batu Gema, atau mencari jalur alternatif yang lebih panjang (tidak menjual apa pun tapi harus selesaikan 2 encounter tambahan). Salah satu dari 3 clue mengarah ke lentera kain berjumbai yang melayang sendiri — ini Antuwan Melayang, bukan barang biasa.
**Battle:** Di S4 (Pasar Tanhana) malam hari — jalur khusus terbuka, barang langka muncul (WB §3.12). Encounter pedagang bayang yang menjual "orang" — battle moral: pemain bisa membeli atau menolak. Menolak = battle langsung. Antuwan Melayang ikut battle di sisi pemain begitu diidentifikasi (dipinjam sementara sebagai ally, echo pasif "Selalu Kurang Satu" — +25% CRT saat HP di bawah 50%).
**Reward:** Antuwan Melayang bergabung (Common, Ghost/Bayu/Attacker). 2 NPC manusia lain terselamatkan → entri Ensiklopedia. Neraca Kecil (Rare Pusaka, DI §1.3). Senjata Yang Tertinggal Entah Di Mana (DI §3.4).
**Koneksi Dokumen:** WB §3.1 (titik balik — ada orang di gudang), WB §3.12 (malam S4), DI §1.3, GK #21 (Antuwan Melayang), DI §3.4 (Titah Yang Tertinggal Entah Di Mana — kanon, judul misi ini sudah sama sejak awal)

### SM-M04 · Gudang Tirta
**Zona:** S5 Gudang Tirta
**Deskripsi:** Pembongkaran gudang bawah air — jantung operasi Smarana. Pemain harus membuka 7 segel untuk mengungkap inventaris penuh kota.
**Teka-teki:** 7 segel, masing-masing butuh "kunci" berbeda — 4 kunci didapat dari misi sebelumnya, 3 sisanya di S5 sendiri. Setiap segel terbuka mengungkap 1 fakta tentang Smarana yang makin gelap. Puzzle terakhir: susun 7 fakta jadi narasi koheren.
**Battle:** 3 encounter bertingkat di S5 (bawah air — modifikasi: semua karakter non-Apah -20% SPD). Encounter terakhir: Penjaga Gudang (Elite khusus — hanya bisa di-damage oleh karakter yang sudah "menjual" sesuatu di Neraca Dagang).
**Reward:** Inventaris terbuka. Timbangan Juragan Ananta (Super Rare Pusaka, DI §1.3). Progres Timbangan Terakhir (Item Spesial, DI §2).
**Koneksi Dokumen:** WB §3.9 (Timbangan Terakhir — "dari rantai misi menyelesaikan pembongkaran gudang"), DI §1.3, DI §2

### SM-M05 · Balai Lelang
**Zona:** S6 Kuta Manik → S7 Bale Adol
**Deskripsi:** Pecahan Pusaka Gema dipajang di balai lelang. Harganya: ingatan terbesar yang dimiliki pemain (entri Ensiklopedia paling berharga).
**Teka-teki:** Sistem lelang mini-game: NPC lain juga menawar. Pemain bisa naikkan harga (bayar lebih banyak ingatan) atau sabotase peserta lain lewat puzzle sosial (temukan kelemahan tiap penawar lewat dialog). Opsi tersembunyi: tolak membeli — akses jalur panjang misi SM-M06.
**Battle:** Encounter "Gema Smarana" — bukan sosok, tapi kota itu sendiri melawan. Battle unik: environment menyerang (lantai, dinding, langit-langit punya HP terpisah). Setiap bagian yang dihancurkan = 1 NPC kota kehilangan mata pencaharian.
**Reward:** Pecahan Pusaka Gema. Segel Balai Lelang (Ultra Rare Pusaka, DI §1.3).
**Koneksi Dokumen:** WB §3.1 (pecahan di balai lelang), DI §1.3 (Segel Balai Lelang)

### SM-M06 · Kemakmuran yang Runtuh
**Zona:** S7 Bale Adol
**Deskripsi:** Konfrontasi Juragan Larung (#28, Legendary). Pemain memaksa kota membuka daftar inventaris — kemakmuran runtuh semalam. Ratusan penduduk tak bersalah kehilangan penghidupan.
**Teka-teki:** Fase akhir: Juragan Larung menawari 1 kesempatan terakhir — "beli kembali 1 ingatan yang sudah kau jual". Pemain bisa terima (dapat 1 entri Ensiklopedia kembali tapi Juragan Larung lolos) atau tolak (Juragan Larung bertarung, tapi ingatan tetap hilang). Ini TIDAK ADA jawaban benar.
**Battle:** Juragan Larung — Legendary Human/Bayu/Attacker. Basis 270%, pasif kanon "Kemakmuran dari yang Hilang" (GK #28): setiap lawan gugur dalam battle ini, ia +15% ATK permanen + tim +1 Prana. *(Dikoreksi — deskripsi sebelumnya keliru menyebut pasif berbasis akumulasi Batu Gema seumur playthrough; itu tidak ada di kanon. Battle didesain ulang dengan gelombang add Kuli Pelabuhan Bayang agar pasif ini relevan — lihat Quest Script R3 untuk detail, termasuk cap +55% khusus encounter ini.)*
**Reward:** Juragan Larung bergabung. Timbangan Terakhir (Item Spesial, DI §2). Resolusi Region.
**Koneksi Dokumen:** WB §3.1 (ending — kemenangan mahal), WB §3.10 (Resolusi), GK #28 (Juragan Larung), DI §2, DI §3.10 (Titah Juragan Larung — adaptasi Cara Didapat kanon)

### SM-M07 · Penebusan (Pasca-Region)
**Zona:** S1-S7 (kembali)
**Deskripsi:** Misi penebusan pasca-tamat (WB §3.6). Pemain bisa menebus kembali ingatan yang hilang — lewat mekanisme APA PUN yang menghilangkannya (Neraca Dagang di Smarana ATAU pengorbanan sukarela seperti NR-S04 "Harga Perlindungan" di Nirwasita) — tapi harganya bukan Batu Gema, melainkan aksi nyata. *(Diperbarui: cakupan diperluas dari semula hanya Neraca Dagang, mengikuti keputusan lintas-region saat scripting Quest Script R1 Nirwasita — lihat catatan koneksi dokumen di bawah.)*
**Teka-teki:** Untuk setiap entri Ensiklopedia yang hilang, pemain harus menemukan orang/tempat asli yang terkait dan menyelesaikan 1 puzzle unik per entri. Penebusan 1 entri = ~15 menit gameplay. Jumlah bervariasi per pemain, tergantung berapa banyak entri yang hilang di seluruh region yang sudah dimainkan — bukan hanya Smarana.
**Battle:** 1 encounter per entri — "Ingatan yang Sudah Berubah Bentuk" (monster unik per entri yang hilang).
**Reward:** Entri Ensiklopedia kembali (dengan catatan "dipulihkan" — narasi yang sedikit berbeda dari versi asli, karena ingatan yang kembali tidak pernah persis sama).
**Koneksi Dokumen:** WB §3.6 (1 misi penebusan pasca-tamat), WB §3.2 (Neraca Dagang — hilang permanen, tapi bisa ditebus), Quest Script R1 Nirwasita §NR-S04 (sumber kehilangan tambahan — entri yang direlakan lewat Titah Nggarindu kini terhubung ke sistem pemulihan yang sama)

**Catatan implementasi sistem:** Karena SM-M07 sekarang menebus entri dari lebih dari 1 sumber kehilangan, sistem tracking Ensiklopedia butuh 1 skema tag terpadu untuk "entri hilang yang bisa ditebus" — bukan 2 sistem terpisah (1 untuk Neraca Dagang, 1 untuk NR-S04). Ini catatan teknis untuk tim sistem/tools, bukan perubahan desain lebih lanjut.

---

## Side Mission

### SM-S01 · Bukan Alasanmu (Titah Sagara Buih)
**Zona:** S2-S5
**Teka-teki:** Kumpulkan 3 versi cerita asal-usul kerajaan yang saling kontradiktif. Puzzle: temukan kesamaan dari 3 versi yang berbeda — 1 nama yang muncul di ketiganya.
**Battle:** Encounter di dasar pasar terapung S5 — 1 battle dialog-heavy di mana lawan menyerang lewat "argumen" (debuff bertema narasi).
**Reward:** Sagara Buih bergabung (Super Rare). Jimat Bukan Alasanmu (DI §3.4).
**Koneksi Dokumen:** DI §3.10 (Titah Sagara Buih), GK #26

### SM-S02 · Balai Lelang (Titah Datu Kalimpan)
**Zona:** S6
**Teka-teki:** Jual 10 item/lore di Neraca Dagang (akumulatif). Temukan balai lelang tersembunyi di "titik jatuh" S6. Di penawaran, tolak membeli kembali 1 ingatan.
**Battle:** Encounter penjaga balai lelang — battle dengan aturan "tidak boleh memakai item" (echo tema menolak transaksi).
**Reward:** Datu Kalimpan bergabung (Ultra Rare). Jimat Balai Lelang (DI §3.4).
**Koneksi Dokumen:** DI §3.10 (Titah Datu Kalimpan), GK #27

### SM-S03 · Lentera yang Tak Padam (Titah Talapak Embun)
**Zona:** S5
**Teka-teki:** Temukan 5 lentera menyala di Gudang Bawah Air. Ikuti embun/uap panasnya ke sumber — puzzle pelacakan visual.
**Battle:** Encounter monster berbasis Teja di area bawah air (disadventage elemen). Pendek tapi intens.
**Reward:** Talapak Embun bergabung (Super Rare). Jimat Lentera yang Tak Padam (DI §3.4).
**Koneksi Dokumen:** DI §3.10 (Titah Talapak Embun), GK #87

### SM-S04 · Harga yang Ditanggung Bersama (Titah Bandar Timbangan)
**Zona:** S4-S5
**Teka-teki:** Saksikan 3 transaksi Neraca Dagang yang berujung konflik. Puzzle mediasi: selesaikan 1 tanpa memihak — temukan solusi yang kedua pihak bisa terima.
**Battle:** Encounter 2v2 (pembeli vs penjual) — pemain harus mengakhiri battle tanpa ada pihak yang tumbang.
**Reward:** Bandar Timbangan bergabung (Ultra Rare). Pusaka Harga yang Ditanggung Bersama (DI §3.4).
**Koneksi Dokumen:** DI §3.10 (Titah Bandar Timbangan), GK #88

### SM-S05 · Enam Ratus Tahun di Bawah (Titah Watu Gambut)
**Zona:** S2
**Teka-teki:** Watu Gambut (#22) terkubur 600 tahun di bawah rawa. Puzzle penggalian: 5 lapisan tanah, tiap lapisan punya artefak dari era berbeda. Susun kronologi.
**Battle:** Encounter di kedalaman — monster bertambah kuat tiap lapisan (echo: makin dalam, makin tua, makin berbahaya).
**Reward:** Titah selesai. Pusaka Enam Ratus Tahun di Bawah (DI §3.4).
**Koneksi Dokumen:** GK #22 (lore), DI §3.4

### SM-S06 · Yang Tidak Mengucap Izin (Titah Jatawira)
**Zona:** S1 Muara Larung
**Deskripsi:** *(Ditambahkan saat Quest Script R3 — Jatawira #23 punya Titah kanon lengkap di Dokumen Item §3.4, tapi Kerangka Misi sebelumnya tidak pernah menghubungkannya ke misi apa pun. Gap serupa Kala Sesari di Region 2.)* Jatawira menjaga muara sejak sebelum Smarana ada — ia tidak keberatan kota dibangun di atas kepalanya, ia keberatan kota berhenti menyebut namanya di doa pelayaran. Ia menahan arus untuk siapa pun yang "mengucap izin", dan menenggelamkan siapa pun yang lupa.
**Teka-teki:** Pemain harus menemukan doa pelayaran lama yang menyebut nama Jatawira — tersebar di 3 kapal karam di S1 (echo tema Smarana: barang yang terlupakan). Sebelum menyeberang ke S2, pemain HARUS mengucapkan doa itu (pilihan dialog, bukan sekadar lewat) — melewati tanpa mengucap = battle otomatis dengan Jatawira sebagai musuh penuh (bukan gagal, hanya jalur lebih sulit).
**Battle:** Jika mengucap izin dengan benar (3/3 doa ditemukan): battle jinak — Jatawira menguji lewat 1 battle ringan (menahan arus, bukan menyerang mematikan), menang dengan bertahan 3 ronde. Jika tidak mengucap izin: battle penuh, Jatawira full power (Tank, pasif "Tata Cara" aktif — +12% DEF tim lawan jika bertindak lebih dulu).
**Reward:** Jatawira bergabung (Uncommon, Beast/Apah/Tank). Pusaka Yang Tidak Mengucap Izin (DI §3.4).
**Koneksi Dokumen:** GK #23 (lore Jatawira — "kota berhenti menyebut namanya di doa pelayaran"), DI §3.4 (Titah Yang Tidak Mengucap Izin — kanon, belum pernah terhubung ke misi sebelum ini)

---

## Hidden Mission

### SM-H01 · Gudang Bawah Gudang
**Zona:** S5 (Area Tersembunyi — WB §3.12)
**Syarat buka:** Selesaikan SM-M04 + temukan clue dari Batu Gema yang dijual di SM-M01 (jika pemain menjual yang "benar").
**Teka-teki:** Ruang tersembunyi di dalam S5 — item yang bahkan Juragan Larung tidak tahu ada. Puzzle: buka 3 brankas tanpa kunci (observasi pola retakan di dinding).
**Battle:** 1 encounter "Barang yang Lupa Dirinya Barang" — battle filosofis (lawan bertanya tiap ronde, jawab benar = damage berkurang).
**Reward:** 3 item langka (Batu Gema + 1 Kitab eksklusif). 2 entri Ensiklopedia.
**Koneksi Dokumen:** WB §3.12 (Gudang Bawah Gudang)

### SM-H02 · Yang Tak Lagi Dicari (Titah Juragan Larung — tahap tersembunyi)
**Zona:** S5-S7
**Syarat buka:** Selesaikan SM-M06 + jangan beli kembali ingatan di penawaran terakhir.
**Teka-teki:** "Jual" cukup banyak lore untuk buka Gudang Bawah Air bagian terdalam. Penawaran terakhir: 1 ingatan yang TIDAK BOLEH dibeli kembali.
**Battle:** Battle opsional melawan "Sisa Juragan Larung" — echo yang masih berdagang meski kalah.
**Reward:** Menyelesaikan Titah kanon Juragan Larung sepenuhnya. Senjata Yang Tak Lagi Dicari (DI §3.4) upgrade ke versi penuh.
**Koneksi Dokumen:** DI §3.10 (Titah Juragan Larung — adaptasi Cara Didapat kanon, tahap 2-3)

### SM-H03 · Yang Hafal Semua Nama
**Zona:** S1-S4
**Syarat buka:** Bicara ke 15 NPC unik di seluruh Smarana.
**Teka-teki:** Wadyan Salunai (#24) menghafal nama semua orang yang pernah lewat Smarana. Puzzle: ia menyebut 10 nama, pemain harus menemukan 3 di antaranya yang masih hidup di kota.
**Battle:** 0 battle. Murni investigasi sosial.
**Reward:** Titah selesai. Jimat Yang Hafal Semua Nama (DI §3.4). 3 entri Ensiklopedia eksklusif.
**Koneksi Dokumen:** GK #24 (lore), DI §3.4

### SM-H04 · Paruh yang Terlalu Terang (Titah Tinggang Intan)
**Zona:** S4-S5
**Teka-teki:** Tinggang Intan (#25) — enggang dengan paruh bercahaya yang menarik perhatian semua orang. Ia tidak bisa bersembunyi. Puzzle: bantu ia menemukan tempat di Smarana yang TIDAK ADA yang melihat — zona yang semua orang hindari.
**Battle:** Encounter predator yang tertarik cahaya paruhnya — 3 gelombang, makin kuat tiap gelombang. Kondisi menang: lindungi Tinggang Intan (ia bukan anggota tim selama battle).
**Reward:** Tinggang Intan bergabung. Senjata Paruh yang Terlalu Terang (DI §3.4).
**Koneksi Dokumen:** GK #25 (lore), DI §3.4

---

# REGION 4 — WANASUNYA · Mereka yang Memilih Pergi

**Season:** S2 (bebas urutan, TG1) · **Mekanik Signature:** Jejak yang Menutup (jalur tertutup setelah 3 ronde, maks 5 Penanda)
**Estimasi:** 17 misi (6 Main + 8 Side + 3 Hidden) · **NPC Kunci:** Upiak
**Prinsip misi WB §4.6:** 1 misi pilihan tanpa jawaban benar (memberi tahu keluarga Upiak atau tidak)

---

## Main Mission

### WN-M01 · Ladang Terakhir
**Zona:** W1 Ladang Terakhir
**Deskripsi:** Tutorial Jejak yang Menutup. Pemain belajar menaruh Penanda dan mengandalkan avatar Beast untuk mengendus jalur.
**Teka-teki:** Navigasi labirin alam yang berubah — jalur tertutup setelah 3 ronde siang (5 ronde WB §4.12 siang). Pemain harus menentukan 5 Penanda di posisi strategis. Puzzle optimasi resource.
**Battle:** 2 encounter Pemburu Tersesat (monster umum, WB §4.8).
**Reward:** Serat Daun Sunyi (Common Jimat, DI §1.4). Puti Lengang muncul sebagai vendor (WB §4.12).
**Koneksi Dokumen:** WB §4.2 (Mekanik Signature), WB §4.12 (vendor Puti Lengang), DI §1.4

### WN-M02 · Empat Puluh Tahun
**Zona:** W2 Rimba Batas → W3 Danau Bening
**Deskripsi:** Pemain mulai menemukan tanda-tanda penghuni: bekas api unggun, dinding rotan, jebakan lembut (tidak berbahaya, hanya menghalangi). Mereka di sini karena MEMILIH, bukan karena tersesat.
**Teka-teki:** Ikuti 5 tanda keberadaan penghuni — setiap tanda mengarah ke clue berikutnya. Puzzle pelacakan: tanda ke-3 sengaja menyesatkan (jebakan). Pemain harus membedakan tanda asli dari jebakan lewat observasi (tanda asli selalu menghadap matahari terbenam).
**Battle:** Encounter Rimba Bersuara (Elite, WB §4.8) — hutan menyerang siapa yang memaksa masuk. Battle dengan mekanik Jejak yang Menutup aktif (arena battle berubah tiap 3 ronde — posisi pemain bergeser).
**Reward:** Cakar Tersembunyi (Uncommon Senjata, DI §1.4). Akses ke W4.
**Koneksi Dokumen:** WB §4.1 (Kaum Lengang), WB §4.8 (Rimba Bersuara), DI §1.4

### WN-M03 · Rumah Upiak
**Zona:** W4 Lembah Musna
**Deskripsi:** Pemain bertemu Upiak — masuk hutan 40 tahun lalu, memilih tetap tinggal. Keluarganya masih mencari. Titik keputusan moral region (WB §4.6, §4.10).
**Teka-teki:** Dialog bercabang kompleks (4 lapis). Upiak bercerita kenapa ia pergi. Pemain diberi 2 opsi akhir: BERI TAHU keluarganya (Upiak keluar hutan, tidak pernah benar-benar bahagia lagi) atau JANGAN (Upiak tetap, pemain membawa rahasia). Tidak ada petunjuk mana yang "benar." Puzzle: sebelum memilih, pemain harus menemukan 3 bukti di W4 yang memperkuat masing-masing sisi — baru boleh memilih setelah melihat keduanya.
**Battle:** 0 battle di misi ini. Murni dialog dan eksplorasi. Ini disengaja — keputusan moral tidak perlu justifikasi lewat pertarungan.
**Reward:** Resolusi Region ditentukan. Topeng Rimbo (Rare Jimat, DI §1.4) dari eksplorasi W4. Akses Rumah Upiak (Area Tersembunyi, WB §4.12).
**Koneksi Dokumen:** WB §4.1 (titik balik — Upiak), WB §4.6 (misi pilihan tanpa jawaban benar), WB §4.10 (Resolusi), WB §4.12 (Rumah Upiak), DI §1.4

### WN-M04 · Hutan Belang
**Zona:** W5 Kampung Lengang → W6 Hutan Belang
**Deskripsi:** Pemain mendekati wilayah penjaga terdalam Wanasunya. Hutan makin gelap; Penanda makin cepat tertutup (3 ronde → 2 ronde di W6 malam, WB §4.12).
**Teka-teki:** Puzzle "di mana garis batasnya" — pemain harus menemukan batas hutan terakhir yang tidak boleh dilalui. 7 pohon penanda, hanya 1 yang asli (yang lain jebakan). Petunjuk: pohon asli tidak pernah diganti posisinya oleh mekanik Jejak yang Menutup.
**Battle:** Encounter Elite bertingkat di W6 — hutan sendiri menyerang. Battle di malam hari: Jejak tertutup dalam 2 ronde, avatar Beast krusial.
**Reward:** Jejak yang Tak Pernah Ada (Super Rare Pusaka, DI §1.4). Akses W7.
**Koneksi Dokumen:** WB §4.12 (siklus malam Wanasunya), DI §1.4

### WN-M05 · Empat Ratus Tahun Bertanya (Titah Niniak Belang)
*(Dipromosikan dari Hidden Mission ke Main Mission — Opsi C, keputusan restrukturisasi rantai Sang Lengang. Niniak Belang #35 sekarang direkrut lewat jalur cerita utama, bukan opsional.)*
**Zona:** W7 Puncak Lengang (gerbang terluar)
**Deskripsi:** Pemain bertemu Niniak Belang (#35, Super Rare) — penjaga batas yang hanya punya satu pertanyaan, diulang pada setiap orang yang tiba selama 400 tahun: *"Apakah kau datang untuk mengambil?"* Ia sudah mendengar jawaban jujur hanya tiga kali sepanjang itu.
**Teka-teki:** Pemain harus MEMBUKTIKAN jujur lewat aksi, bukan sekadar memilih dialog — selesaikan 3 aksi restoratif di W5-W7 (memulihkan, bukan mengambil sesuatu dari hutan) sebagai bukti sebelum menjawab pertanyaannya.
**Battle:** Niniak Belang menguji lewat pertarungan (kanon GK #35: pasif "Batas Terakhir" — barisan belakang tim -30% damage selama ia hidup; Spesial "Satu Pertanyaan" menumpuk *Jawaban* dari serangan yang ia terima). Jika 3 aksi restoratif sudah lengkap: battle singkat 0 ronde serangan wajib dari party (bertahan saja, echo pola KD-H02/NR-M03). Jika belum lengkap: battle penuh 3 ronde sampai Niniak Belang puas dengan ketahanan party.
**Reward:** Niniak Belang bergabung (Super Rare, Beast/Pertiwi/Tank). Pusaka Empat Ratus Tahun Bertanya (DI §3.5 katalog + §3.10 detail — struktur 3-langkah Titah-nya SUDAH kanon sejak awal dan cocok persis dengan restrukturisasi Opsi C ini, tidak perlu diubah).
**Koneksi Dokumen:** GK #35 (lore & pasif — dikutip persis, bukan campuran dengan karakter lain), DI §3.5

### WN-M06 · Belantara Menelan
*(Direvisi total — Opsi C. Sang Lengang TIDAK dilawan langsung, sesuai kanon "Cara didapat". Battle yang ada adalah tontonan/spectator, bukan partisipasi pemain.)*
**Zona:** W7 Puncak Lengang (ruang dalam)
**Deskripsi:** Setelah Niniak Belang yakin akan kejujuran pemain (WN-M05 selesai), hutan itu sendiri — Sang Lengang (#37, Legendary) — memilih menampakkan diri. Bukan untuk diuji lagi, tapi untuk membuktikan pada dirinya sendiri bahwa kejujuran itu nyata.
**Teka-teki:** Tidak ada puzzle tradisional — pemain menyaksikan sebuah pertarungan yang BUKAN melibatkan party mereka.
**Battle (spectator, bukan partisipatif):** Niniak Belang (kini ally, baru direkrut) berhadapan dengan **Bayangan** — manifestasi niat jahat/kebohongan yang MUNGKIN dibawa pemain, tapi tidak. Party pemain diset ke mode "tidak bisa beraksi" (tombol serang/skill dinonaktifkan selama sekuens ini — implementasi: battle UI tetap tampil untuk ketegangan visual, tapi input party di-lock). Niniak Belang bertarung sendirian melawan Bayangan dan menang (hasil telah ditentukan naratif, bukan bergantung stat pemain) — mengonfirmasi kejujuran pemain dengan mengalahkan representasi ketidakjujuran itu sendiri. Sang Lengang menyaksikan dari kejauhan sepanjang battle, lalu mendekat setelah Bayangan lenyap.
**Reward:** Sang Lengang bergabung (Legendary, Beast/Pertiwi/CC — pasif kanon "Memilih Tak Terdengar": +25% penghindaran AoE tim, 30% peluang musuh "kehilangan jalur" saat pertama beraksi). Gerbang Kaum Lengang (Ultra Rare Pusaka, DI §1.4). Penanda Terakhir (Item Spesial region, DI §2).
**Koneksi Dokumen:** WB §4.1 (ending), WB §4.9 (Penanda Terakhir), GK #37 (lore & pasif — dikoreksi dari draf sebelumnya yang salah kutip), GK #35 (Niniak Belang sebagai partisipan battle spectator), DI §2, DI §3.10 (Titah Sang Lengang — struktur 3-langkah SUDAH kanon: selesaikan Titah Niniak Belang → buktikan intensi W1-W7 → hutan menampakkan diri sekali, disaksikan bukan dilawan. Elaborasi "Bayangan" sebagai lawan spectator Niniak Belang adalah penambahan Opsi C, tidak bertentangan dengan struktur kanon)

---

## Side Mission

*(Ditulis ulang v0.6 — draf sebelumnya menstub bagian ini dengan placeholder generik dan melewatkan 3 karakter Common (#29-31) sama sekali. Kini 8 Side Mission penuh, 1 per karakter, mencakup seluruh roster Wanasunya yang belum direkrut lewat Main/Hidden Mission.)*

### WN-S01 · Yang Memilih Pergi (Titah Puti Lengang)
**Zona:** W1 Ladang Terakhir
**Deskripsi:** Puti Lengang (#29) bukan makhluk halus — perempuan yang pergi ke hutan usia 19 tahun dan memutuskan tidak dicari. Ia sudah muncul sebagai vendor Penanda (WB §4.12), tapi merekrutnya sebagai anggota tim adalah hal terpisah dari berdagang dengannya.
**Teka-teki:** Puzzle "mendekat tanpa membuatnya pergi" — echo tema region: jika pemain mendekat terlalu cepat/langsung (spam interaksi), ia menghilang sebentar dan harus dicari ulang di titik berbeda W1. Mendekat pelan (jeda antar-interaksi, mirip pola Antuwan Melayang di Smarana) membuatnya akhirnya bicara.
**Battle:** Encounter ringan — 1 monster yang "mencarinya" tanpa sadar mengganggu (echo tema "orang berhenti mencari" — battle ini melambangkan gangguan terakhir dari dunia luar). HP `[PLACEHOLDER]` 800.
**Reward:** Puti Lengang bergabung (Common, Human/Bayu/Support). Jimat Yang Memilih Pergi (DI §3.5).
**Koneksi Dokumen:** GK #29 (lore), DI §3.5, WB §4.12 (peran vendor tetap terpisah dari recruitment)

### WN-S02 · Genangan yang Tak Pernah Kering (Titah Lasik Kubang)
**Zona:** W2-W3
**Deskripsi:** Lasik Kubang (#30) — genangan air hitam yang tidak pernah kering, haus dengan cara yang tak bisa diselesaikan.
**Teka-teki:** Temukan kubangan-kubangan kering lain yang pernah "diminumnya" — puzzle pelacakan, ikuti pola kubangan yang mengering berurutan menuju sumbernya.
**Battle:** Musuh dengan lifesteal (heal diri 30% dari damage, sesuai pasif dasarnya) — battle mengajarkan pemain memakai burst damage untuk mengalahkan regenerasi, bukan damage bertahap. HP `[PLACEHOLDER]` 900.
**Reward:** Lasik Kubang bergabung (Common, Ghost/Apah/Attacker). Senjata Genangan yang Tak Pernah Kering (DI §3.5).
**Koneksi Dokumen:** GK #30 (lore), DI §3.5

### WN-S03 · Cukup untuk Semua (Titah Rangkiang Batu)
**Zona:** W3-W4
**Deskripsi:** Rangkiang Batu (#31) — lumbung terakhir di kampung kosong, menolak kosong, menghitung ulang isinya tiap tahun untuk keluarga yang tidak akan datang.
**Teka-teki:** Puzzle hitung: cocokkan jumlah isi lumbung dengan jumlah keluarga yang pernah tinggal di kampung (data dari nisan/penanda rumah kosong di sekitar W3-W4) — selalu "cukup", tapi pemain harus membuktikan lewat penghitungan, bukan diberi tahu.
**Battle:** Tank dengan tarik aggro (sesuai pasif dasarnya) — battle defensif, party harus bertahan sementara Rangkiang Batu "diuji" ketahanannya. HP `[PLACEHOLDER]` 1100.
**Reward:** Rangkiang Batu bergabung (Common, Spirit/Pertiwi/Tank). Pusaka Cukup untuk Semua (DI §3.5).
**Koneksi Dokumen:** GK #31 (lore), DI §3.5

### WN-S04 · Kesepakatan Lama (Titah Sindaka Rimbo)
**Zona:** W1-W2
**Deskripsi:** Sindaka Rimbo (#32) — pelindung kampung terikat kesepakatan lama: hutan melindungi, kampung tidak pernah menyebut namanya keras-keras. Kesepakatan dipatuhi terlalu sempurna — sekarang tidak ada yang tahu ia masih ada.
**Teka-teki:** Puzzle dialog — pemain HARUS menghindari menyebut namanya langsung di seluruh dialog investigasi (opsi dialog yang menyebut nama secara eksplisit membuatnya makin menjauh; opsi yang merujuknya secara tidak langsung — "pelindung", "yang dijaga kesepakatan" — membuka progres).
**Battle:** Attacker sulit ditarget (echo lore "tidak pernah menampakkan diri lebih dari 2 detik") — battle dengan mekanik dodge/stealth tinggi, party harus memakai AoE atau prediksi pola alih-alih target langsung. HP `[PLACEHOLDER]` 950.
**Reward:** Sindaka Rimbo bergabung (Uncommon, Beast/Bayu/Attacker). Senjata Kesepakatan Lama (DI §3.5).
**Koneksi Dokumen:** GK #32 (lore), DI §3.5

### WN-S05 · Berjalan Mundur Semalaman (Titah Uhang Sunyi)
**Zona:** W2-W4
**Deskripsi:** Uhang Sunyi (#33) — "tukang sapu" yang menghapus jalur baru dengan berjalan mundur semalaman sampai jejaknya hilang.
**Teka-teki:** Puzzle navigasi terbalik — ikuti jejak kaki yang mengarah MUNDUR (pemain harus menavigasi jalur dengan membaca urutan terbalik dari jejak yang ditemukan, bukan mengikuti arah normal) untuk menemukannya di titik awal jalur yang dihapus.
**Battle:** Crowd Control (dorong ke barisan belakang, sesuai pasif dasar) — battle mengajarkan pemain mengelola posisi party saat diserang CC berulang. HP `[PLACEHOLDER]` 850.
**Reward:** Uhang Sunyi bergabung (Uncommon, Beast/Bayu/CC). Jimat Berjalan Mundur Semalaman (DI §3.5).
**Koneksi Dokumen:** GK #33 (lore), DI §3.5

### WN-S06 · Sembilan Meter Daftar (Titah Bundo Sarikaso)
**Zona:** W4-W5
**Deskripsi:** Bundo Sarikaso (#34) — tetua yang memutuskan Wanasunya akan menghilang, menyimpan daftar sembilan meter berisi semua yang mereka relakan.
**Teka-teki:** Baca fragmen daftar (echo mekanik "400 bait" Kayuri Sindu di Nirwasita, skala lebih kecil) — 5 fragmen tersebar W4-W5, susun untuk memahami APA yang direlakan Wanasunya saat memilih menghilang (jawaban ini memperkaya pemahaman WN-M03 jika belum dikerjakan, atau menjadi konteks tambahan jika sudah).
**Battle:** Support enemy — musuh yang mem-buff dirinya sendiri tiap ronde (echo peran Support Bundo Sarikaso sendiri, battle sebagai "cerminan" kemampuannya). HP `[PLACEHOLDER]` 1000.
**Reward:** Bundo Sarikaso bergabung (Rare, Human/Teja/Support). Jimat Sembilan Meter Daftar (DI §3.5).
**Koneksi Dokumen:** GK #34 (lore), DI §3.5, echo tematik WN-M03

### WN-S07 · Ke Sini, Ikuti Suaraku (Titah Suara Tanwujud)
**Zona:** W5-W6
**Deskripsi:** Suara Tanwujud (#89) — dulu punya nama yang diucapkan berulang oleh pencarinya, sekarang hanya suara tanpa wujud, menenangkan siapa pun yang tersesat.
**Teka-teki:** Puzzle navigasi audio murni — TANPA HUD arah (echo mekanik Nirwasita, disengaja sebagai foreshadowing ringan untuk Anawil), ikuti suaranya yang terdengar dari arah berbeda-beda tiap kali bicara. Pemain harus mendengarkan pola (suara makin dekat = arah benar) untuk menemukannya.
**Battle:** Support ringan — 1 encounter yang bisa dimenangkan lebih cepat jika party memakai heal (echo peran healer Suara Tanwujud sendiri). HP `[PLACEHOLDER]` 700.
**Reward:** Suara Tanwujud bergabung (Rare, Ghost/Pertiwi/Support). Jimat Ke Sini, Ikuti Suaraku (DI §3.5).
**Koneksi Dokumen:** GK #89 (lore), DI §3.5

### WN-S08 · Rute yang Diulang (Titah Tapak Ghaib)
**Zona:** W6 Hutan Belang
**Deskripsi:** Tapak Ghaib (#90) — jejak kaki di tanah becek yang tidak pernah kering, mengulang rute yang sama tanpa pemiliknya.
**Teka-teki:** Ikuti loop jejak kaki berulang, temukan titik di mana rute itu MENYIMPANG dari pola normalnya (1 titik anomali di antara puluhan pengulangan identik) — puzzle observasi pola/deteksi anomali.
**Battle:** Attacker 2-target (sesuai pasif dasar "Injak Basah") — battle standar tier Rare. HP `[PLACEHOLDER]` 1050.
**Reward:** Tapak Ghaib bergabung (Rare, Spirit/Apah/Attacker). Senjata Rute yang Diulang (DI §3.5).
**Koneksi Dokumen:** GK #90 (lore), DI §3.5

---

## Hidden Mission

*(WN-H01 "Empat Ratus Tahun Bertanya" — Niniak Belang — DIPINDAH ke Main Mission sebagai WN-M05, Opsi C restrukturisasi rantai Sang Lengang. 3 Hidden Mission tersisa, dinomori ulang.)*

### WN-H01 · Air Naik (Titah Sambilan Talago)
**Zona:** W6
**Teka-teki:** Dengar 9 versi cerita malam pengusiran di kawah W6. Puzzle: jangan memihak satu versi sebagai "yang benar". Mekanik: tiap versi memberi clue parsial. Gabungkan tanpa menyatakan ada yang salah.
**Battle:** 1 encounter "Danau yang Mengingat" — battle berbasis elemen Apah. Kondisi menang: bertahan 9 ronde (1 per versi).
**Reward:** Sambilan Talago bergabung (Ultra Rare). Jimat Air Naik (DI §3.5).
**Koneksi Dokumen:** DI §3.10 (Titah Sambilan Talago), GK #36

### WN-H02 · Rumah Upiak
**Zona:** W4 Lembah Musna (Area Tersembunyi, WB §4.12)
**Trigger:** `flag_wn_m03_complete == true` (rantai Upiak selesai penuh, kedua jalur resolusi — sesuai WB §4.12 "hanya muncul setelah rantai misi Upiak selesai penuh")
**Deskripsi:** Rumah fisik Upiak, tersembunyi di dalam Lembah Musna. Isinya berbeda tergantung jalur resolusi WN-M03 yang diambil pemain.
**Teka-teki:** Jelajahi rumah — barang-barang pribadi menceritakan versi hidupnya SEBELUM masuk hutan (kontras dengan versi yang ia ceritakan langsung di WN-M03). Puzzle: 4 objek personal, masing-masing mengungkap 1 detail yang TIDAK disebutkan Upiak sendiri — pemain menyusun potret yang lebih lengkap daripada yang Upiak mau akui.
**Battle:** 0 battle — murni eksplorasi dan refleksi, konsisten dengan WN-M03 yang juga 0 battle.
**Reward:** 4 entri Ensiklopedia eksklusif (berbeda isi tergantung `flag_wn_resolution_path` dari WN-M03 — jalur "beri tahu keluarga" vs "jangan").
**Koneksi Dokumen:** WB §4.12 (Area Tersembunyi Rumah Upiak), WB §4.6 (misi pilihan tanpa jawaban benar), WB §4.10 (Resolusi Region)

### WN-H03 · Yang Tersisa dari Pilihan
**Zona:** W1 (jalur "beri tahu") ATAU W4 Rumah Upiak (jalur "jangan")
**Trigger:** `flag_wn_h02_complete == true` DAN Resolusi Region WN-M03 sudah dievaluasi
**Deskripsi:** Misi lanjutan pasca-Resolusi (disebutkan sebagai konsep di kerangka awal, kini diberi konten penuh). Isinya bercabang total tergantung pilihan pemain di WN-M03.
**Teka-teki (Jalur "Beri Tahu Keluarga"):** Seorang anggota keluarga Upiak muncul di W1, mencari konfirmasi. Dialog bercabang: pemain bisa menceritakan detail (dari WN-H02) atau menahan sebagian. Tidak ada puzzle mekanis — murni pilihan naratif tentang seberapa banyak kebenaran yang dibagikan.
**Teka-teki (Jalur "Jangan"):** Pemain kembali ke Rumah Upiak beberapa waktu kemudian — sesuatu terasa berbeda (echo/gestur halus, bukan hantu literal) — momen refleksi hening tentang rahasia yang dibawa pemain sendirian.
**Battle:** 0 battle di kedua jalur — misi penutup yang murni emosional/naratif, konsisten dengan nada WN-M03 dan WN-H02.
**Reward:** 1 entri Ensiklopedia final region (berbeda teks per jalur) + closure naratif. Tidak ada item mekanis — reward misi ini murni naratif.
**Koneksi Dokumen:** WB §4.10 (Resolusi Region), WN-M03 (jalur resolusi menentukan konten), WN-H03 (prasyarat)

---

# REGION 5–9 — POLA STRUKTURAL IDENTIK

Demi konsistensi panjang dokumen review ini, region 5-9 disajikan dalam format ringkas. Setiap region mengikuti pola yang sama: **Main Mission** mengikuti arc storyline World Bible, **Side Mission** terikat ke Titah karakter dari Dokumen Item, **Hidden Mission** terikat ke Area Tersembunyi dari World Bible §X.12.

---

# REGION 5 — KALAMRTU · Kerajaan yang Hilang dari Catatan

**Season:** S3 (TG2) · **Mekanik:** Aksara Kutukan · **NPC:** Juru Laklak · **Estimasi:** 18 misi (6M + 8S + 4H) — *(direvisi dari 15 misi, 3 gap-fill ditemukan: Sidhayatri, Kelasi Wira, Watu Sema tidak punya misi di draf awal)*

| ID | Tipe | Nama | Zona | Battle | Teka-teki | Reward Utama | Koneksi |
|---|---|---|---|---|---|---|---|
| KL-M01 | Main | Muara Wira | K1 | Penjaga Prasasti Bisu ×3 | Tutorial mini-game susun aksara | Serpihan Prasasti (C Jimat) | WB §5.2, DI §1.5 |
| KL-M02 | Main | Pulau Dua Nama | K2 | Kutukan Berjalan (Elite) | 2 nama pulau yang saling kontradiktif — identifikasi yang asli lewat prasasti | Catatan Juru Laklak (U Kitab) | WB §5.3, DI §1.5 |
| KL-M03 | Main | Aksara yang Berbicara | K3-K5 | 3 encounter bertingkat | Baca 3 prasasti perbatasan — menemukan kutukan juga menghapus sejarah sendiri | Batu Penahan Kutuk (R Jimat) | WB §5.6, DI §1.5 |
| KL-M04 | Main | Sisi Kelam Kerajaan | K5-K6 | Kutukan Dua Arah (battle di mana debuff juga mengenai tim sendiri) | Investigasi — temukan bukti kekejaman historis kerajaan. Puzzle moral: ungkap atau tidak | Resolusi Region ditentukan | WB §5.6, §5.10 |
| KL-M05 | Main | Pelabuhan Pralaya | K6 | Elite ×2 (prasasti aktif menambah debuff) | Nonaktifkan prasasti kutukan terakhir — mini-game aksara paling sulit | Kitab Aksara yang Hilang (SR Kitab) | DI §1.5 |
| KL-M06 | Main | Dihapus Demi Selamat | K7 | Sang Wiranata (Legendary) — 3 fase, fase akhir: "menyaksikan, bukan mengalahkan" | Pilihan moral: memulihkan kejayaan = membangkitkan kekejaman. Pilih menyaksikan titah penutupnya | Sang Wiranata + Aksara yang Tersisa (Item Spesial) + Mahkota Sang Wiranata (UR Pusaka) | WB §5.1, §5.9, GK #47, DI §2, §3.10 |
| KL-S01 | Side | Kebiasaan Bukan Niat (Antumuara) | K1-K2 | Encounter berbasis Apah | Puzzle observasi kebiasaan NPC | Kitab Kebiasaan Bukan Niat | GK #38, DI §3.6 |
| KL-S02 | Side | Delapan Ratus Tahun (Naga Wira) | K4-K5 | Battle melawan sisa imperium | Puzzle kronologi — susun 800 tahun dari fragmen | Pusaka Delapan Ratus Tahun | GK #43, DI §3.6 |
| KL-S03 | Side | Juru Kutuk Negara (Lidah Watu) | K4-K6 | Konfrontasi dialog + 1 battle | *(Dikoreksi — kelanjutan langsung KL-M03, bukan investigasi terpisah: 3 prasasti perbatasan yang sama dibaca di KL-M03 mengarah ke Lidah Watu di sini)* Puzzle moral: akui bahwa tugas Lidah Watu "terlalu baik" | Kitab Juru Kutuk Negara | DI §3.10, GK #45, KL-M03 (prasasti sumber) |
| KL-S04 | Side | Yang Tidak Pernah Berhenti Melompat (Sekar Kemarung) | K5 | 0 battle — observasi | Mini-game observasi 3 siklus lompat + ikut melompat ke-4 | Kitab Yang Tidak Pernah Berhenti Melompat | DI §3.10, GK #46 |
| KL-S05 | Side | Yang Tak Bisa Ditahan Lagi (Rahib Abu) | K6-K7 | *(Dikoreksi — kanon GK #92 "Cara Didapat" eksplisit: rantai 5 tahap MENELUSURI JEJAK RAHIB KALPA lewat 4 prasasti tersisa, BUKAN misi berdiri sendiri. Prasyarat: KL-H04 selesai.)* 5 tahap: telusuri 4 prasasti sisa peninggalan Rahib Kalpa satu per satu + battle final | Di ujung rantai: pilih menyegel kembali ATAU membiarkan bebas — **kanon: kedua pilihan sama-sama memberikan karakter ini, hanya mengubah 1 baris dialog pembuka battle pertama dengannya** | Senjata Yang Tak Bisa Ditahan Lagi | DI §3.10, GK #92, KL-H04 (prasyarat wajib) |
| KL-S06 | Side | Satu Baris yang Kabur (Sidhayatri) | K1-K3 | *(baru — gap-fill)* Encounter ringan berbasis Akasa | Bantu ia "membaca dirinya sendiri" — susun fragmen kalimat yang kabur dari 3 prasasti berbeda jadi 1 kalimat utuh | Kitab Satu Baris yang Kabur | GK #39, DI §3.6 |
| KL-S07 | Side | Perjalanan yang Belum Selesai (Kelasi Wira) | K1-K2 | *(baru — gap-fill)* Battle standar Bayu | Investigasi 3 daftar awak kapal (berangkat/kembali/hilang) — temukan namanya di celah ketiganya, di pelabuhan K1 (echo lokasi KL-M01) | Senjata Perjalanan yang Belum Selesai | GK #40, DI §3.6 |
| KL-S08 | Side | Pernah Ada yang Memulai (Watu Sema) | K2-K3 | *(baru — gap-fill)* Battle tank/defensif | Puzzle: buktikan tempat ini "masih berarti bagi seseorang" — bawa 3 persembahan simbolis dari zona berbeda ke batu berukirnya | Pusaka Pernah Ada yang Memulai | GK #41, DI §3.6 |
| KL-H01 | Hidden | Prasasti Ketujuh | K5 (Area Tersembunyi) | 1 encounter opsional | Prasasti yang bertentangan dengan 6 lainnya — puzzle rekonsiliasi | 2 entri Ensiklopedia eksklusif | WB §5.12 |
| KL-H02 | Hidden | Angin yang Tak Membedakan (Kijang Prasasti) | K4-K6 | Battle dengan debuff dua arah | Puzzle pelacakan — ikuti serbuk aksara | Senjata Angin yang Tak Membedakan | GK #91, DI §3.6 |
| KL-H03 | Hidden | Versi yang Dikubur (Dayang Rindang) | K3-K4 | 1 encounter "versi terkubur" | Puzzle arkeologi — gali tanpa merusak | Kitab Versi yang Dikubur | GK #42, DI §3.6 |
| KL-H04 | Hidden | Membuktikan Ilmunya (Rahib Kalpa) | K5-K6 | Battle 300% damage — Rahib Kalpa membuktikan diri | Puzzle: biarkan ia membuktikan sendiri, jangan bantu | Senjata Membuktikan Ilmunya + **prasyarat wajib KL-S05 (Rahib Abu)** | GK #44, DI §3.6 |

---

# REGION 6 — HIMAGIRI · Istana yang Menolak Mengakui Ia Sudah Runtuh

**Season:** S3 (TG2) · **Mekanik:** Tata Krama (Kelancangan meter) · **NPC:** Sabdaguna · **Estimasi:** 14 misi (5M + 5S + 4H)

**Mekanik Reset Kelancangan (BARU — Opsi D):** "Ritual Penyucian" tersedia di lokasi tetap dekat Abdi Dalem Tua (vendor kanon WB §6.12). Mengonsumsi 1x "Kain Sembah" (item baru, dibeli dari Abdi Dalem Tua — vendor yang tadinya hanya "menurunkan kenaikan" Kelancangan, sekarang juga menjual alat reset) + hanya bisa dipakai 1x per siklus siang-malam (WB §6.12: Tata Krama nonaktif malam hari — ritual ini dilakukan saat transisi malam→pagi). Efek: reset meter Kelancangan ke 0 penuh. Ini berlaku untuk SEMUA syarat berbasis Kelancangan di region ini (HM-M04 DAN HM-H01), memberi pemain jalan pemulihan nyata dari kesalahan — bukan cuma mitigasi laju kenaikan seperti sebelumnya.

| ID | Tipe | Nama | Zona | Battle | Teka-teki | Reward Utama | Koneksi |
|---|---|---|---|---|---|---|---|
| HM-M01 | Main | Lereng yang Menjaga | H1-H2 | Abdi Dalem Bayang ×3 | Tutorial Tata Krama — pelajari 3 aturan dasar istana, pelanggaran = Kelancangan naik | Untaian Waktu Tertunda (C Jimat) | WB §6.2, DI §1.6 |
| HM-M02 | Main | Pasar Hantu | H4 | Upacara yang Mengeras (Elite) | *(Direvisi — Pasarwengi #49 adalah pasar ini, bukan karakter terpisah)* Temukan Pasar Lengang — penduduk yang sudah menerima semuanya berakhir. Puzzle: bicara ke 5 NPC hantu tanpa melanggar tata krama (tiap respons salah = +Kelancangan). Kelimanya adalah fragmen 1 entitas — setelah 5/5 didengar tanpa pelanggaran, mereka menyatu | Keris Pengulang (U Senjata) + **Pasarwengi bergabung** (Common, Ghost/Akasa/CC) + Jimat Menunggu Pengumuman (DI §3.7, kanon — Titah "Menunggu Pengumuman", cocok persis lore "masih menunggu pengumuman itu") | WB §6.1 (Pasar Lengang), DI §1.6, GK #49, DI §3.7 |
| HM-M03 | Main | Lima Ratus Pagi | H4-H5 | 2 encounter bertingkat (Tata Krama aktif — hasil ditentukan Kelancangan) | *(Direvisi — Sabdaguna #51 adalah sosok yang mengucap "Kerajaan ini sudah berakhir, Tuanku" tiap pagi selama 500 tahun)* Puzzle dialog dua kalender: pemain dan Wisesa Girinatha menyebut tahun berbeda untuk hari yang sama. Sadari ia hidup di Tarikh Girinata, bukan Tarikh Laras. Di pagi ke-500 (puncak puzzle), pemain — bukan Wisesa Girinatha — akhirnya benar-benar MENDENGARKAN kalimat Sabdaguna | Segel Pembeku Kecil (R Jimat) + **Sabdaguna bergabung** (Uncommon, Spirit/Pertiwi/Support) + Jimat Lima Ratus Pagi (DI §3.7, kanon) | WB §IX-C.2 (dua kalender), DI §1.6, GK #51, DI §3.7 |
| HM-M04 | Main | Upacara Terakhir | H6-H7 | Wisesa Girinatha (Legendary) — 3 fase, MENYEDIHKAN bukan epik. Fase 3: pilih TIDAK menyerang = menjadi saksi | *(Opsi D — syarat dilonggarkan)* Menjadi saksi upacara penutup tanpa bertarung. Syarat Kelancangan: **HANYA dicek dari HM-M03 s/d HM-M04** (2 misi terakhir), BUKAN sepanjang region — berbeda dari HM-H01 yang tetap ketat. Puzzle: hadir sampai akhir tanpa aksi ofensif | Wisesa Girinatha + Regalia Terakhir (Item Spesial) + Regalia Upacara Terakhir (UR Pusaka) | WB §6.1, §6.6, §6.9, GK #56, DI §2, §3.10 |
| HM-M05 | Main | Keraton Kosong (Pasca-Upacara) | H7 | 1 encounter opsional "Kenangan Terakhir" (echo Abdi Dalem Bayang versi lampau — tidak wajib diselesaikan untuk lanjut) | Puzzle: jelajahi keraton SETELAH upacara berakhir — semua NPC menghilang. 5 ruangan berisi kenangan, susun kronologi keruntuhan dari artefak | Entri Ensiklopedia, closure | WB §6.1 (ending) |
| HM-S01 | Side | Menahan Waktu (Sang Giripawana) | H6 | 1 battle di titik "pagi yang tidak berubah jadi siang" | Puzzle: temukan izin yang tidak pernah datang lewat arsip istana. Sadari izin sudah gugur bersama kerajaan | Jimat Menahan Waktu | DI §3.10, GK #55 |
| HM-S02 | Side | Genta yang Tak Berhenti (Tabuh Senja) | H5 | *(Dikoreksi — kanon GK #93 "Cara Didapat": 4 tahap dalam 1 siklus siang-malam PENUH, bukan 3 hari berturut)* 4 tahap: ikuti ritme tabuhannya sepanjang 1 siklus siang-malam utuh (pagi/siang/senja/malam — echo Elemen Standar Worldmap Himagiri) + 1 encounter di menara di tahap akhir | Temukan gentanya secara harfiah menahan senja agar tidak pernah berubah jadi malam | Senjata Genta yang Tak Berhenti | DI §3.10, GK #93 |
| HM-S03 | Side | Menunggu Kesempatan Berikutnya (Sabda Tertunda) | H4 | 0 battle | Puzzle arsip: kumpulkan konteks kenapa kalimat ke-500 tak terucap, lalu ucapkan untuk-nya | Jimat Menunggu Kesempatan Berikutnya | DI §3.10, GK #94 |
| HM-S04 | Side | Menari untuk Sembilan (Ratri Kemuning) | H3-H4 | 1 encounter tari-battle | Mini-game ritme — tiru 9 gerakan tari berurutan | Senjata Menari untuk Sembilan | GK #53, DI §3.7 |
| HM-S05 | Side | Ikuti Saja (Jalak Girindra) | H1-H2 | 2 encounter ringan | Puzzle: ikuti jalak tanpa bertanya arah — navigasi murni observasi burung | Jimat Ikuti Saja | GK #48, DI §3.7 |
| HM-H01 | Hidden | Ruang Semedi Sabdaguna | H3 (Area Tersembunyi) | 0 battle | Syarat TETAP KETAT (Opsi D — tidak dilonggarkan): Kelancangan 0 sepanjang region, TAPI sekarang bisa dicapai lewat Ritual Penyucian jika sempat melanggar sebelumnya (lihat mekanik reset di atas). Dialog eksklusif tentang Wisesa Girinatha muda | 2 entri Ensiklopedia | WB §6.12 |
| HM-H02 | Hidden | Tetap Menyala (Wanaspati Giri) | H3 | 1 encounter berbasis Teja | Puzzle: temukan api yang tidak padam di hutan pinus bisu — ikuti cahaya | Senjata Tetap Menyala | GK #52, DI §3.7 |
| HM-H03 | Hidden | Hutan yang Tidak Berbunyi (Gandarwa Pinus) | H3-H4 | 1 encounter berbasis Bayu (**wajib**, sebelumnya opsional) | Puzzle: navigasi hutan yang DIAM sempurna — identifikasi arah dari vibrasi tanah, bukan suara | Pusaka Hutan yang Tidak Berbunyi | GK #54, DI §3.7 |
| HM-H04 | Hidden | Tidak Ada yang Membatalkan (Kurawatu) | H2-H3 | 1 encounter berbasis Pertiwi | Puzzle: temukan keputusan yang tidak bisa dibatalkan — pilih 1 dari 3 pintu, sisanya tertutup permanen | Pusaka Tidak Ada yang Membatalkan | GK #50, DI §3.7 |

---

# REGION 7 — RAJAWANI · Diingat sebagai Barang, Dilupakan sebagai Bangsa

**Season:** S4 (TG3) · **Mekanik:** Yang Tak Terjual (Warisan) · **NPC:** Momola · **Estimasi:** 16 misi (6M + 6S + 4H) — *(direvisi dari 15 misi, 1 gap-fill: Sawangi Pala tidak punya misi di draf awal)*

| ID | Tipe | Nama | Zona | Battle | Teka-teki | Reward Utama | Koneksi |
|---|---|---|---|---|---|---|---|
| RJ-M01 | Main | Pelabuhan Rempah | R1-R2 | Pedagang Bayang ×3 | Tutorial Warisan — pelajari beda "barang yang bisa dijual" vs "Warisan yang tidak bisa dijual" | Pita Timbangan (C Jimat) | WB §7.2, DI §1.7 |
| RJ-M02 | Main | Kebun yang Dipetik Habis | R3-R4 | 3 encounter bertingkat | Puzzle: temukan 3 Warisan (syair, aturan adat, nama anak) tersembunyi di kebun yang sudah dipetik habis. Setiap Warisan disebarkan ke NPC = Sang Harga melemah 1 fase | Parang Pedagang (U Senjata) + 3 Warisan | WB §7.2, DI §1.7 |
| RJ-M03 | Main | Danau Diam | R5 | Timbangan Serakah (Elite) — battle di malam hari (cahaya hijau zona, WB §7.12) | Puzzle: menyelam ke reruntuhan desa terkutuk di bawah danau (hanya akses malam). Temukan 5 Warisan dari desa tenggelam | 5 Warisan + Kalung Rempah Palsu (R Pusaka) | WB §7.12 (Desa di Bawah Danau Diam), DI §1.7 |
| RJ-M04 | Main | Tujuh Ribu Catatan | R4-R5 | 1 encounter arsip | Puzzle investigasi: cari 1 surat kenegaraan atas nama Nyai Bokira dari 7000 catatan (ternyata tidak ada). Bantu ia "menagih" | Nyai Bokira bergabung (SR). Senjata Tujuh Ribu Catatan | DI §3.10, GK #63 |
| RJ-M05 | Main | Yang Tak Bisa Ditawar | R6-R7 | Sang Harga (Legendary) — fase berkurang sesuai jumlah Warisan tersebar. Battle unik: setiap "barang" yang pemain bawa memperkuat Sang Harga | Puzzle: hadapkan Sang Harga pada sesuatu yang benar-benar tidak berharga. Jawaban dari Warisan yang dikumpulkan | Sang Harga bergabung + Warisan yang Tak Ternilai (Item Spesial) | WB §7.1, §7.9, GK #65, DI §2, §3.10 |
| RJ-M06 | Main | Para Pemimpin Mencatat | R7 Bale Caturnata | 0 battle | Puzzle: susun catatan yang BENAR dari seluruh bukti yang dikumpulkan sepanjang region. Ending region | Resolusi Region + entri Ensiklopedia | WB §7.1 (ending — "mencatat") |
| RJ-S01 | Side | Tiga Puluh Tahun Menebang (Datu Honggi) | R4-R6 | 1 encounter | Puzzle penanaman: mini-game menanam kembali benih + akui bersama bahwa itu tidak cukup | Senjata Tiga Puluh Tahun Menebang | DI §3.10, GK #64 |
| RJ-S02 | Side | Yang Tak Bisa Dibeli (Penjaga Polos) | R1-R2 (gerbang terluar) | *(Dikoreksi — kanon GK #96 "Cara Didapat": rantai 3 tahap, bertahan SENDIRIAN dari 3 gelombang di gerbang terluar Rajawani, BUKAN dialog godaan barang mewah di R6-R7)* 3 tahap: 3 gelombang serangan di gerbang terluar. Penjaga Polos bertahan TANPA bantuan siapa pun — party HANYA menyaksikan, tidak boleh ikut menyerang (echo pola spectator, tapi di sini karena ia menolak dibantu, bukan karena kanon melarang battle) | Diberikan langsung tanpa item perantara di akhir tahap ke-3 (sesuai kanon — bukan Pusaka Yang Tak Bisa Dibeli sebagai Titah reward, item itu tetap didapat tapi bukan lewat "Serpihan" bertahap) | DI §3.10, GK #96 |
| RJ-S03 | Side | Keadilan yang Tersisa (Sukma Penimbang) | R4-R5 | 1 encounter neraca | Puzzle keadilan: seimbangkan 5 timbangan yang masing-masing "menipu" ke 1 arah | Jimat Keadilan yang Tersisa | GK #95, DI §3.8 |
| RJ-S04 | Side | Peringatan Terakhir (Sowahi Bara) | R3-R4 | 1 encounter vulkanik | Puzzle: dekode peringatan terakhir dari gunung api yang terukir di lereng | Jimat Peringatan Terakhir | GK #60, DI §3.8 |
| RJ-S05 | Side | Setia pada Tembok (Bala Karangkasa) | R2-R3 | 1 encounter benteng | Puzzle: pertahankan benteng dari 3 gelombang — resource management mini-game | Pusaka Setia pada Tembok | GK #59, DI §3.8 |
| RJ-S06 | Side | Ratusan Tahun Memetik (Sawangi Pala) | R2-R3 | *(baru — gap-fill)* Encounter CC berbasis Bayu — musuh menghapus Prana, echo pasif kanon "Sebelum Matang" | Temukan 3 hal di kebun R2-R3 yang "dipetik sebelum matang" — rencana, kesepakatan, keberanian yang tidak pernah sempat selesai (echo tema RJ-M02, kebun yang dipetik habis) | Jimat Ratusan Tahun Memetik | GK #58, DI §3.8 |
| RJ-H01 | Hidden | Desa di Bawah Danau Diam | R5 (Area Tersembunyi) | 2 encounter bawah air | Puzzle: rekonstruksi sejarah desa yang tenggelam dari artefak di dasar danau | 5 Warisan langka + entri Ensiklopedia | WB §7.12 |
| RJ-H02 | Hidden | Yang Punya Nama (Juru Cengkih) | R1-R2 | 1 encounter | Puzzle identitas: bantu Juru Cengkih menemukan namanya sendiri di balik label komoditas | Jimat Yang Punya Nama | GK #57, DI §3.8 |
| RJ-H03 | Hidden | Tidak Beriak (Talaga Diam) | R5 | 0 battle | Puzzle meditasi: duduk diam di tepi danau 3 ronde tanpa input — game menguji kesabaran | Jimat Tidak Beriak | GK #61, DI §3.8 |
| RJ-H04 | Hidden | Bahan Baku (Bikusagari) | R4-R5 | 1 encounter beast | Puzzle: identifikasi "bahan baku" yang tidak boleh diolah jadi komoditas | Pusaka Bahan Baku | GK #62, DI §3.8 |

---

# REGION 8 — JALADRI · Yang Pecah agar Tak Menjadi Milik Siapa Pun

**Season:** S4 (TG3) · **Mekanik:** Yang Tersebar (serpihan avatar) · **NPC:** Kapten Ndiru · **Estimasi:** 16 misi (6M + 6S + 4H) — *(direvisi dari 15 misi, 1 gap-fill: Abu Tembara tidak punya misi di draf awal)*

| ID | Tipe | Nama | Zona | Battle | Teka-teki | Reward Utama | Koneksi |
|---|---|---|---|---|---|---|---|
| JL-M01 | Main | Pantai Selatan | J1-J2 | Serpihan Hanyut ×3 | Tutorial Yang Tersebar — belajar mengumpulkan serpihan avatar (3-7 per avatar) | Pecahan Karang (C Jimat) | WB §8.2, DI §1.8 |
| JL-M02 | Main | Sawah Terasering | J3-J4 | 3 encounter bertingkat | Puzzle: identifikasi serpihan mana milik avatar mana (warna, bentuk, resonansi elemen). Salah gabung = monster muncul | Serpihan Anjala Kecil (U Pusaka) + progres 30/40 | WB §8.2, DI §1.8 |
| JL-M03 | Main | Laut Sahasra | J5 | Ombak Tak Bertuan (Elite) — battle malam lebih mudah (cahaya, WB §8.12) | Event mingguan J5 (WB §8.2). Puzzle: navigasi laut bercahaya — ikuti pola cahaya biologis untuk menemukan serpihan yang terkubur | Serpihan Anjala Sedang (R Pusaka) + progres | WB §8.12 (Laut Sahasra malam), DI §1.8 |
| JL-M04 | Main | Padang Abu | J6 | 2 encounter berat — peta terhapus tiap keluar (WB §8.2) | Puzzle: navigasi zona yang menghapus tanda peta permanen. Kapten Ndiru memandu. Pemain harus menggambar peta sendiri (figuratif — memori posisi antar sesi) | Serpihan Anjala Besar (SR Pusaka) + progres | WB §8.2 (Padang Abu), WB §8.7 (Kapten Ndiru), DI §1.8 |
| JL-M05 | Main | Kerajaan Terkubur | J7 | Naga Sasra (Legendary) — Beast/Bayu/Attacker, 320% Pamungkas. Bukan makhluk berkehendak — sisa bencana | Pilihan akhir region: satukan Anjala Nirmala (#73) atau biarkan tersebar. Tidak bisa keduanya. Puzzle dialog 3 cabang (echo 5 kerajaan yang meminang) | Naga Sasra bergabung + Serpihan Terakhir (Item Spesial, jika 30/40 terkumpul) | WB §8.1, §8.9, §8.10, GK #74, DI §2, §3.10 |
| JL-M06 | Main | Seribu Jadi Satu atau Seribu Tetap Seribu | J7 | Battle akhir bergantung pilihan JL-M05. Satukan: battle vs Anjala Nirmala utuh (kuat). Biarkan: battle vs Naga Sasra final (berbeda) | Puzzle filosofis: tidak ada jawaban benar — game secara eksplisit menunjukkan konsekuensi kedua jalur | Anjala Nirmala bergabung (jika disatukan) ATAU Sukma tersedia untuk finale (jika tersebar) | WB §8.10, WB X.3 (Resolusi Jaladri), GK #73 |
| JL-S01 | Side | Seribu Bagian (Mandarasmi) | J4-J6 | 1 encounter per bagian | Puzzle dialog cabang — simulasi pilihan 5 kerajaan. Pilih opsi ke-6: "membagi diri" | Jimat Seribu Bagian | DI §3.10, GK #71 |
| JL-S02 | Side | Seribu Orang Menahan Satu Ombak (Penjaga Gelombang) | J4-J5 | 3 gelombang mini-game timing | Puzzle: bantu penjaga pantai + berdiri bersamanya di gelombang ke-4 | Pusaka Seribu Orang Menahan Satu Ombak | DI §3.10, GK #97 |
| JL-S03 | Side | Seribu Menyahut Satu (Gema Ganda) | J1-J7 (5 titik tersebar) | *(Dikoreksi — kanon GK #98 "Cara Didapat": rantai 5 tahap, jumlah tahap TERBANYAK di antara 7 UR baru, mengumpulkan pantulan suara di 5 titik berbeda SEBELUM menyatu — bukan "1 encounter" di J7 saja)* 5 tahap: kumpulkan pantulan suara di 5 titik berbeda seluruh region, tiap titik 1 encounter akustik ringan. Di titik ke-5: teriakkan nama ke laut, terima seluruh pantulan tanpa memilih "yang asli" — kelimanya menyatu | Jimat Seribu Menyahut Satu | DI §3.10, GK #98 |
| JL-S04 | Side | Satu Batu untuk Ibu (Dayan Nadha) | J3-J4 | 1 encounter emosional | Puzzle: temukan 1 batu spesifik di antara ribuan — clue dari lore | Senjata Satu Batu untuk Ibu | GK #69, DI §3.9 |
| JL-S05 | Side | Bagian yang Tak Diinginkan (Cupaka Loba) | J4-J5 | 1 encounter | Puzzle: identifikasi serpihan yang TIDAK ADA yang menginginkan — justru itu yang paling penting | Jimat Bagian yang Tak Diinginkan | GK #72, DI §3.9 |
| JL-S06 | Side | Satu Malam (Abu Tembara) | J6 Padang Abu | *(baru — gap-fill, zona J6 sudah cocok tematik dengan namanya)* Encounter Attacker berbasis Teja — echo Spesial kanon "Cetakan" (membatukan target) | 3 kerajaan kecil terhapus dalam satu malam, terawetkan sebagai cetakan di bawah abu. Temukan bentuk terakhir ketiganya, persis posisi terakhir mereka | Senjata Satu Malam | GK #68, DI §3.9 |
| JL-H01 | Hidden | Karang Kapten Ndiru | J4 (Area Tersembunyi) | 2 encounter bawah air | Puzzle: rekonstruksi bangkai kapal dari fragmen — mini-game assembly | Warisan langka + entri Ensiklopedia | WB §8.12 |
| JL-H02 | Hidden | Empat Ratus Jabat Tangan (Padu Rotan) | J2-J3 | 1 encounter | Puzzle sosial: jabat tangan 400 NPC (figuratif — interaksi berulang bertema kepercayaan) | Pusaka Empat Ratus Jabat Tangan | GK #67, DI §3.9 |
| JL-H03 | Hidden | Sejuta Ekor (Sekar Nyalu) | J1-J2 | 1 encounter beast | Puzzle: hitung ikan yang melewati terumbu dalam waktu terbatas — mini-game observasi | Jimat Sejuta Ekor | GK #66, DI §3.9 |
| JL-H04 | Hidden | Dinding yang Menutup (Sagaranak) | J3-J4 | 1 encounter | Puzzle lingkungan: temukan dinding tersembunyi yang menutup — echo mekanik region | Pusaka Dinding yang Menutup | GK #70, DI §3.9 |

---

# REGION 9 — ANAWIL · Ingatan yang Lebih Tua daripada Bahasa

**Season:** FINALE (wajib 8 region selesai, TG4-5) · **Mekanik:** Tanpa Kata (HUD hilang progresif A4-A7)
**NPC:** Tidak ada NPC bicara (gestur) · **Estimasi:** 12 misi (5M + 3S + 4H)
**Catatan:** Seluruh misi region ini mengikuti prinsip konsultan (WB §9.0): tidak menggunakan mitos mesianis, tidak mereproduksi artefak ritual, konten dirancang abstrak-universal.

| ID | Tipe | Nama | Zona | Battle | Teka-teki | Reward Utama | Koneksi |
|---|---|---|---|---|---|---|---|
| AW-M01 | Main | Karst Warana | A1-A2 | Telapak Berjalan (umum) ×3 | Tutorial Tanpa Kata fase 1: HUD masih ada tapi beberapa elemen mulai hilang. Navigasi lewat lukisan tangan di dinding | Jejak Kasuari (C Jimat) | WB §9.2, DI §1.9 |
| AW-M02 | Main | Hutan Purba | A2-A3 | 2 encounter Beast purba | Puzzle observasi murni: ikuti pola migrasi fauna tanpa HUD arah (echo Titah Pari Lampur #78). Komunikasi lewat suara lingkungan | Serat Anyaman Tanpa Pengrajin (U Jimat) | WB §9.2, DI §1.9, DI §3.12 (#78) |
| AW-M03 | Main | Laguna Tenang | A3-A4 | Suara Sebelum Kata (Elite) — berkomunikasi lewat getaran, bukan bahasa | Transisi ke zona A4: dialog teks MULAI MENGHILANG. Puzzle: pahami instruksi NPC dari gestur + warna + suara. Mini-game gestur (bukan pilihan dialog) | Cadik yang Tahu Arahnya Sendiri (R Senjata) | WB §9.2 (A4 mulai tanpa teks), DI §1.9 |
| AW-M04 | Main | Dinding Telapak | A4-A5 | 2 encounter TANPA informasi teks (HP bar tanpa angka, skill tanpa nama) | Zona A4-A5: dialog teks HILANG TOTAL. Puzzle: interaksi penuh di zona tanpa dialog teks (syarat Item Spesial "Telapak Keenam", DI §2). Mini-game gestur + warna | Pigmen Tangan Pertama (SR Pusaka) + progres Telapak Keenam | WB §9.2, DI §1.9, DI §2 (Telapak Keenam) |
| AW-M05 | Main | Telapak Pertama — Gema Purba | A6-A7 | *(Dikoreksi — DI §3.12 punya catatan revisi EKSPLISIT: recruitment Gema Purwa di sini "berisiko memicu/terkunci bareng flow ending" dan sengaja DIPINDAH ke AW-H02. Reward karakter dihapus dari misi ini)* Zona final tanpa battle karakter — murni klimaks naratif. A7: HUD hilang TOTAL. Puzzle: pemain mendengar "gema" dari 8 region sebelumnya (audio callback). 3 ending global (WB §9.10): Kabut Yang Kembali / Yang Mengingat / Laras — ditentukan oleh akumulasi keputusan pemain di seluruh region | Gema yang Tak Pernah Direkam (UR Pusaka) + Telapak Keenam (Item Spesial, jika syarat A4-A5 terpenuhi) + 3-Ending Global. **TIDAK ADA rekrutmen karakter di misi ini** | WB §9.1, §9.10, DI §1.9, §2 |
| AW-S01 | Side | Empat Puluh Tahun Tanpa Kata (Kalana Sauyan) | A3-A4 | 1 encounter mode tanpa teks | Ikuti NPC, tunjuk 3 titik lewat gestur pemain, berdiri di posisi benar tanpa diberi tahu lewat teks | Senjata Empat Puluh Tahun Tanpa Kata | DI §3.12, GK #82 |
| AW-S02 | Side | Tanpa Berniat Memiliki (Nin Waiam) | A5 | 1 encounter rawat makhluk asing | Puzzle: rawat makhluk tanpa info jenisnya (tanpa teks) — gestur perawatan | Jimat Tanpa Berniat Memiliki | DI §3.12, GK #81 |
| AW-S03 | Side | Yang Tidak Pernah Diajarkan (Wai Cendra) | A4 | 1 encounter tari | Mini-game gestur: tiru gerakan tari tanpa tutorial teks | Senjata Yang Tidak Pernah Diajarkan | DI §3.12, GK #80 |
| AW-H01 | Hidden | Telapak Kedelapan | A4 (Area Tersembunyi) | 0 battle | Cap tangan tambahan yang tidak disebut di legenda manapun. Puzzle: temukan tanpa clue teks — murni observasi visual | 1 entri Ensiklopedia (tanpa teks — hanya ikon) | WB §9.12 |
| AW-H02 | Hidden | Gema yang Menunggu Diketuk (Titah Gema Purwa) | A1 (ceruk tersembunyi di Karst Warana — ZONA PEMBUKA, bukan penutup) | 1 encounter non-lethal (1 giliran "diam bersama", bukan battle) | Syarat: seluruh entri Ensiklopedia 8 region lain (Nirwasita-Jaladri) terkumpul — side-objective lintas-region, BUKAN bagian climax. Temukan ceruk tanpa quest marker — clue lingkungan saja. **Bisa diselesaikan KAPAN SAJA setelah Anawil dibuka** (termasuk SEBELUM AW-M01-M05 sekalipun, karena lokasinya A1) — sepenuhnya independen dari AW-M05 dan pilihan 3 ending mana pun (WB §9.10). Ini SATU-SATUNYA jalur rekrutmen Gema Purwa | Gema Purwa bergabung + Pusaka Yang Tersisa Ketika Semua Gagal (kunci akun, bukan gear — pasifnya sendiri "Tidak Pernah Tersimpan" melarang ia diberi perlengkapan) | DI §3.12 (Titah Gema Purwa — revisi eksplisit dari versi lama yang ditolak karena bentrok dengan flow ending), GK #83 |
| AW-H03 | Hidden | Titah Penunggu Sunyi (#99) | A5 Palung Purwa | **⚔️⚔️ Heavy — 3 gelombang survival tanpa dialog bantuan, tanpa HP bar/status lawan terlihat (reklasifikasi dari Mixed)** | Lindungi NPC tanpa nama, bertahan tanpa sekutu tumbang. Bergabung tanpa notifikasi teks | Penunggu Sunyi bergabung + Pusaka reward (nama per ending, DI §3.13) | DI §3.12, §3.13, GK #99 |
| AW-H04 | Hidden | Titah Tanpa Rupa (#100) | A6 Pulau Ketujuh | 0 battle — observasi | Ikuti jejak 2→4→2 kaki, pilih "tidak memilih" (opsi diam muncul jika pemain tidak menekan tombol) | Tanpa Rupa bergabung + Jimat reward (nama per ending, DI §3.13) | DI §3.12, §3.13, GK #100 |

---

# BAGIAN PENUTUP — STATISTIK & VALIDASI SILANG

## Ringkasan Jumlah Misi

| Region | Main | Side | Hidden | Total | Mekanik Terintegrasi |
|---|---|---|---|---|---|
| Nirwasita | 6 | 4 | 3 | 13 | ✅ Jalan yang Menutup Kembali — aktif di semua misi navigasi |
| Kadewan | 6 | 6 | 3 | 15 | ✅ Ritual Otomatis — aktif di semua battle |
| Smarana | 7 | 6 | 4 | 17 | ✅ Neraca Dagang — pilihan jual/tidak jual di 4 misi |
| Wanasunya | 6 | 8 | 3 | 17 | ✅ Jejak yang Menutup — aktif di semua eksplorasi |
| Kalamrtu | 6 | 8 | 4 | 18 | ✅ Aksara Kutukan — debuff aktif, mini-game aksara di 3 misi |
| Himagiri | 5 | 5 | 4 | 14 | ✅ Tata Krama — Kelancangan meter aktif sepanjang region |
| Rajawani | 6 | 6 | 4 | 16 | ✅ Yang Tak Terjual — Warisan di 4 misi utama |
| Jaladri | 6 | 6 | 4 | 16 | ✅ Yang Tersebar — serpihan di 4 misi utama |
| Anawil | 5 | 3 | 4 | 12 | ✅ Tanpa Kata — HUD hilang progresif A4-A7 |
| **TOTAL** | **53** | **52** | **33** | **138** | **9/9 mekanik terintegrasi** |

## Validasi Cakupan

| Elemen | Target | Tercakup | Status |
|---|---|---|---|
| 100 karakter punya minimal 1 misi terkait | 100 | 100 — 89 via misi mandiri/Titah, 11 Anawil tier rendah via sub-objective di Main Mission (keputusan desain, bukan gap) | ✅ |
| 9 Item Spesial punya syarat misi eksplisit | 9 | 9 | ✅ |
| 31 Titah tier tinggi (DI §3.10 + §3.12) punya misi | 31 | 31 | ✅ |
| 9 Area Tersembunyi (WB §X.12) punya Hidden Mission | 9 | 9 | ✅ |
| 9 Resolusi Region punya misi penentu | 9 | 9 | ✅ |
| Min 1 misi tanpa HUD kompas (Nirwasita) | 1 | 1 (NR-M04) | ✅ |
| Min 1 misi efisiensi vs makna (Kadewan) | 1 | 1 (KD-M04) | ✅ |
| Min 1 misi jual Batu Gema (Smarana) | 1 | 2 (SM-M01 wajib, SM-M05 opsional) | ✅ |
| 1 misi penebusan pasca-tamat (Smarana) | 1 | 1 (SM-M07) | ✅ |
| 1 misi pilihan tanpa jawaban benar (Wanasunya) | 1 | 1 (WN-M03) | ✅ |
| 1 misi membuka sisi kelam (Kalamrtu) | 1 | 1 (KL-M04) | ✅ |
| 1 misi "menjadi saksi" tanpa pertarungan (Himagiri) | 1 | 1 (HM-M04 fase 3) | ✅ |
| Rantai Warisan sebagai jalur utama (Rajawani) | 1 | 3 misi utama (RJ-M02, M03, M05) | ✅ |
| Rantai serpihan Anjala Nirmala (Jaladri) | 1 | 4 misi utama (JL-M01 s/d M05) | ✅ |
| Min 1 misi tanpa dialog teks (Anawil) | 1 | 3 (AW-M04, M05, + seluruh Hidden) | ✅ |

## Keputusan Desain — Anawil Tier Rendah

**DIPUTUSKAN:** 7 karakter Common/Uncommon Anawil (#75 Kaswari Tanahwil, #76 Tapak Nirbahasa, #77 Karang Wayahan, #78 Pari Lampur, #79 Sampara Wene, #80 Wai Cendra, #81 Nin Waiam) **cukup sebagai sub-objective di Main Mission**, bukan Side Mission mandiri.

Alasan:
- Mekanik Tanpa Kata membuat dialog-driven Side Mission tidak koheren di Anawil — setiap misi tambahan yang butuh teks merusak premis region
- Titah tier rendah (#75-#81, DI §3.12) semuanya 1 tahap, cukup singkat untuk diintegrasikan ke flow Main Mission
- Anawil sengaja minimalis — menambah 7 Side Mission mengubahnya dari "finale yang padat makna" jadi "region standar dengan skin berbeda"

**Implementasi di Main Mission:**

| Karakter | Sub-objective di Misi | Aksi |
|---|---|---|
| #75 Kaswari Tanahwil | AW-M01 | Tanam ulang benih di Hutan Purba tanpa dialog bantuan |
| #76 Tapak Nirbahasa | AW-M01 | Sentuh replika jejak tangan di Karst Warana tanpa baca teks |
| #77 Karang Wayahan | AW-M02 | Amati formasi karang di Laguna Tenang 1 siklus penuh tanpa dialog |
| #78 Pari Lampur | AW-M02 | Ikuti jalur migrasi tanpa HUD arah (Laguna Tenang–Dinding Telapak) |
| #79 Sampara Wene | AW-M03 | Berada di titik transisi fajar, jendela sempit tanpa notifikasi |
| #80 Wai Cendra | AW-S03 (sudah ada) | Mini-game tiru gerakan tari tanpa tutorial teks |
| #81 Nin Waiam | AW-S02 (sudah ada) | Rawat makhluk tanpa info jenisnya |

---

# ANALISIS A — ESTIMASI DURASI PER MISI

## Asumsi Profil Pemain Casual

| Parameter | Nilai |
|---|---|
| Kecepatan baca dialog | Tidak skip, baca semua |
| Kegagalan puzzle | Rata-rata 1-2 kali sebelum berhasil |
| Kemampuan combat | Sedang — tidak min-max build, kadang kalah di boss percobaan pertama |
| Eksplorasi | Menjelajah area yang terlihat menarik, tapi tidak 100% setiap zona |
| Sesi bermain | 30-90 menit per sesi |
| Frekuensi | 3-5 sesi per minggu |

## Referensi Jam dari World Bible §II.1

| Season | Region | Jam Total (WB) | Alokasi Misi (~65%) | Alokasi Non-Misi (~35%: eksplorasi, grinding, travel) |
|---|---|---|---|---|
| S1 | Nirwasita + Kadewan | 20 jam | ~13 jam | ~7 jam |
| S2 | Smarana + Wanasunya | 14 jam | ~9 jam | ~5 jam |
| S3 | Kalamrtu + Himagiri | 14 jam | ~9 jam | ~5 jam |
| S4 | Rajawani + Jaladri | 14 jam | ~9 jam | ~5 jam |
| Finale | Anawil | 10 jam | ~6.5 jam | ~3.5 jam |
| **Total** | **9 region** | **72 jam** | **~46.5 jam** | **~25.5 jam** |

Rasio 65/35 dipilih karena game ini story-driven RPG dengan mekanik signature — pemain casual menghabiskan lebih banyak waktu di misi dibanding grinding, tapi masih butuh waktu cukup untuk eksplorasi zona dan leveling karakter.

## Durasi Per Misi — Tabel Lengkap 128 Misi

### Region 1 — Nirwasita (alokasi misi: ~6.5 jam)

| ID | Tipe | Nama | Durasi (menit) | Komposisi Waktu |
|---|---|---|---|---|
| NR-M01 | Main | Kabut Pertama | 30 | Tutorial mekanik 10' + Navigasi 10' + Battle 10' |
| NR-M02 | Main | Suara di Balik Danau | 35 | Dialog Nenek Ranaya 10' + Puzzle lokasi 10' + Battle tutorial 10' + Eksplorasi 5' |
| NR-M03 | Main | Enam Puluh Tahun Menunggu | 30 | Dialog 5' + Puzzle kesabaran battle 20' + Transisi 5' |
| NR-M04 | Main | Adi dan Gerbang Terbuka | 40 | Navigasi tanpa-HUD 15' + Puzzle identifikasi Adi 10' + Battle 10' + Dialog 5' |
| NR-M05 | Main | Lagu Perjalanan Tua | 45 | Kumpul fragmen 15' + Mini-game ritme 10' + Battle penjaga 15' + Dialog 5' |
| NR-M06 | Main | Kabut Terbuka | 50 | Battle fase 1-2: 20' + Puzzle lagu fase 3: 15' + Cutscene 10' + Retry boss ~5' |
| NR-S01 | Side | Gudang Barang Tertinggal | 25 | Puzzle identifikasi 10' + Battle 0-15' (tergantung salah) |
| NR-S02 | Side | Empat Ratus Bait | 25 | Mini-game memori 10' + Battle 10' + Dialog 5' |
| NR-S03 | Side | Misi Opsional Adi | 30 | Dialog bercabang 15' + Puzzle/Battle 10' + Resolusi 5' |
| NR-S04 | Side | Harga Perlindungan (Titah Nggarindu) | 35 | Kumpul fragmen 15' + Battle 3 fase 15' + Dialog 5' |
| NR-H01 | Hidden | Rumah Ranaya Lama | 25 | Puzzle mural 10' + Battle opsional 10' + Cutscene 5' |
| NR-H02 | Hidden | Musuh yang Sebenarnya (Titah Wira Senja) | 35 | 3 restricted battle 20' + Battle akhir non-damage 10' + Transisi 5' |
| NR-H03 | Hidden | Yang Tertanam Selamat (Titah Saras Pertiwi) | 20 | Eksplorasi 3 titik 15' + Cutscene 5' + Battle 0' |
| | | **SUBTOTAL NIRWASITA** | **425' (~7.1 jam)** | **Target WB DIREVISI: ~7.17 jam (rata-rata misi S1 baru: 14.33 jam ÷ 2 region) → ✅ SESUAI, hampir pas** |

### Region 2 — Kadewan (alokasi misi: ~6.5 jam)

| ID | Tipe | Nama | Durasi (menit) | Komposisi Waktu |
|---|---|---|---|---|
| KD-M01 | Main | Upacara Pagi | 30 | Tutorial Ritual Otomatis 10' + Observasi 5' + Battle 10' + Dialog 5' |
| KD-M02 | Main | Dua yang Satu | 40 | Dialog setup 5' + Puzzle "diam vs pilih" battle 25' + Cutscene 10' |
| KD-M03 | Main | Doa yang Salah Satu Barisnya Benar | 35 | Investigasi 7 baris 15' + Kumpul bukti 10' + Battle Elite 10' |
| KD-M04 | Main | Efisiensi atau Makna | 35 | Dialog bercabang 15' + Battle 0-15' (tergantung jalur) + Resolusi 5' |
| KD-M05 | Main | Sembilan Ratus Tahun Terakhir | 30 | Puzzle urutan upacara 10' + 3 Battle bertingkat 15' + Transisi 5' |
| KD-M06 | Main | Rasa yang Kembali | 50 | Battle Sang Werdi 25' + Puzzle jawaban ritual 10' + Cutscene 10' + Retry ~5' |
| KD-S01 | Side | Urutan yang Diwariskan | 20 | Puzzle urutan 10' + Battle 5' + Dialog 5' |
| KD-S02 | Side | Lupa Bentuk Asli | 20 | Puzzle identifikasi 10' + Battle 5' + Dialog 5' |
| KD-S03 | Side | Sumber yang Diulang | 25 | Observasi 3 hari 10' + Battle prediksi pola 10' + Dialog 5' |
| KD-S04 | Side | Penari yang Melihat Roh | 25 | Dialog investigasi 10' + Battle/puzzle 10' + Cutscene 5' |
| KD-S05 | Side | Tidak Ada yang Menanggung Semuanya | 20 | Mini-game alokasi 10' + Battle 5' + Dialog 5' |
| KD-S06 | Side | Titah Sembilan Ratus Tahun (Kala Sesari) | 25 | Investigasi 3 fragmen 15' + Battle stabilisasi 3 ronde 10' |
| KD-H01 | Hidden | Sanggar Luh Sari | 25 | Puzzle interpretasi tari 15' + Battle opsional 5' + Dialog 5' |
| KD-H02 | Hidden | Duka yang Tak Dirasakan (Titah Rarasunyi) | 30 | Observasi upacara 10' + Clue lingkungan 10' + Battle 10' |
| KD-H03 | Hidden | Yang Lebih Mudah Daripada Mendengarkan (Titah Randu Girang) | 25 | Investigasi kesaksian 15' + Dialog akhir 10' + Battle 0' |
| | | **SUBTOTAL KADEWAN** | **435' (~7.25 jam)** | **Target WB DIREVISI: ~7.17 jam (rata-rata misi S1 baru) → ✅ SESUAI, hampir pas** |

### Region 3 — Smarana (alokasi misi: ~4.5 jam)

| ID | Tipe | Nama | Durasi (menit) | Komposisi Waktu |
|---|---|---|---|---|
| SM-M01 | Main | Muara yang Menerima Semuanya | 25 | Tutorial Neraca 10' + Puzzle pilih Batu Gema 5' + Battle 10' |
| SM-M02 | Main | Harga Hari Ini | 25 | Mini-game perdagangan 10' + Battle Penagih Utang 10' + Dialog 5' |
| SM-M03 | Main | Yang Tertinggal Entah Di Mana | 35 | Investigasi gudang 10' + Puzzle moral 10' + Identifikasi & recruit Antuwan Melayang 5' + Battle 10' |
| SM-M04 | Main | Gudang Tirta | 35 | 7 segel puzzle 15' + 3 Battle bawah air 15' + Narasi 5' |
| SM-M05 | Main | Balai Lelang | 30 | Mini-game lelang 10' + Battle Gema Smarana 15' + Dialog 5' |
| SM-M06 | Main | Kemakmuran yang Runtuh | 40 | Battle Juragan Larung 20' + Puzzle penawaran terakhir 10' + Cutscene 10' |
| SM-M07 | Main | Penebusan (Pasca-Region) | 15/entri | Variabel — 1-5 entri × 15 menit. Estimasi rata-rata: 45 menit total (3 entri) |
| SM-S01 | Side | Bukan Alasanmu (Sagara Buih) | 20 | Kumpul 3 versi 10' + Battle dialog 10' |
| SM-S02 | Side | Balai Lelang (Datu Kalimpan) | 20 | Jual 10 item (akumulatif) 5' + Puzzle tolak beli 5' + Battle 10' |
| SM-S03 | Side | Lentera yang Tak Padam (Talapak Embun) | 15 | Pelacakan visual 5' + Battle 10' |
| SM-S04 | Side | Harga yang Ditanggung Bersama (Bandar Timbangan) | 20 | Observasi 3 transaksi 5' + Puzzle mediasi 10' + Battle 2v2 5' |
| SM-S05 | Side | Enam Ratus Tahun di Bawah (Watu Gambut) | 20 | Puzzle penggalian 10' + Battle bertingkat 10' |
| SM-S06 | Side | Yang Tidak Mengucap Izin (Jatawira) | 20 | Kumpul 3 doa pelayaran 10' + Battle (jinak/penuh tergantung jalur) 10' |
| SM-H01 | Hidden | Gudang Bawah Gudang | 20 | Puzzle brankas 10' + Battle 5' + Reward 5' |
| SM-H02 | Hidden | Yang Tak Lagi Dicari (lanjutan Juragan Larung) | 25 | Eksplorasi terdalam 10' + Battle opsional 10' + Dialog 5' |
| SM-H03 | Hidden | Yang Hafal Semua Nama | 20 | Investigasi sosial 15' + Dialog 5' |
| SM-H04 | Hidden | Paruh yang Terlalu Terang (Tinggang Intan) | 20 | Puzzle pelacakan 5' + Battle 3 gelombang 10' + Dialog 5' |
| | | **SUBTOTAL SMARANA** | **375' (~6.25 jam) — termasuk SM-M07 variabel** | **Target WB DIREVISI: ~6.0-6.5 jam untuk region S2 (dari ~4.5 jam) → ✅ SESUAI, dalam rentang baru** |

**⚠️ Smarana over budget 1.3 jam.** SM-M07 (Penebusan) bersifat variabel — pemain yang tidak menjual Batu Gema di Smarana DAN tidak mengambil NR-S04 di Nirwasita akan melewatkan misi ini sepenuhnya. Jika SM-M07 dianggap opsional (hanya relevan bagi pemain yang kehilangan entri lewat salah satu dari kedua mekanisme), maka durasi efektif turun ke ~305 menit (~5.1 jam), mendekati target. **Catatan tambahan pasca-update cakupan:** pemain yang menempuh KEDUA mekanisme kehilangan (Neraca Dagang di Smarana + Titah Nggarindu di Nirwasita) berpotensi punya lebih banyak entri untuk ditebus dibanding estimasi awal (3 entri) — durasi rata-rata bisa naik ke 4-5 entri (~60-75 menit) untuk pemain semacam ini. Tetap perlu dipantau di playtest, terutama untuk profil pemain yang aktif di kedua region.

### Region 4 — Wanasunya (alokasi misi: ~4.5 jam) — **Tabel penuh, sebelumnya di tabel ringkas, sekarang detail karena Side Mission sudah lengkap 8/8**

| ID | Tipe | Nama | Durasi (menit) | Komposisi Waktu |
|---|---|---|---|---|
| WN-M01 | Main | Ladang Terakhir | 30 | Tutorial Jejak yang Menutup 10' + Puzzle Penanda 10' + Battle 10' |
| WN-M02 | Main | Empat Puluh Tahun | 30 | Pelacakan 5 tanda 15' + Battle Elite 15' |
| WN-M03 | Main | Rumah Upiak | 35 | Dialog bercabang 4 lapis 20' + Eksplorasi bukti 15' + Battle 0' |
| WN-M04 | Main | Hutan Belang | 35 | Puzzle 7 pohon 15' + Battle Elite malam 20' |
| WN-M05 | Main | Empat Ratus Tahun Bertanya (Niniak Belang) | 30 | 3 aksi restoratif 15' + Battle 0-10' (tergantung kejujuran) + Dialog 5' |
| WN-M06 | Main | Belantara Menelan (Sang Lengang, spectator) | 25 | Battle spectator (Niniak Belang vs Bayangan) 15' + Cutscene reveal 10' |
| WN-S01 | Side | Yang Memilih Pergi (Puti Lengang) | 20 | Puzzle mendekat pelan 10' + Battle ringan 10' |
| WN-S02 | Side | Genangan yang Tak Pernah Kering (Lasik Kubang) | 20 | Pelacakan kubangan 8' + Battle lifesteal 12' |
| WN-S03 | Side | Cukup untuk Semua (Rangkiang Batu) | 20 | Puzzle hitung 10' + Battle tank 10' |
| WN-S04 | Side | Kesepakatan Lama (Sindaka Rimbo) | 20 | Puzzle dialog hindari nama 10' + Battle dodge-heavy 10' |
| WN-S05 | Side | Berjalan Mundur Semalaman (Uhang Sunyi) | 20 | Puzzle navigasi terbalik 10' + Battle CC 10' |
| WN-S06 | Side | Sembilan Meter Daftar (Bundo Sarikaso) | 20 | Kumpul 5 fragmen 12' + Battle support 8' |
| WN-S07 | Side | Ke Sini, Ikuti Suaraku (Suara Tanwujud) | 20 | Puzzle navigasi audio tanpa HUD 12' + Battle ringan 8' |
| WN-S08 | Side | Rute yang Diulang (Tapak Ghaib) | 20 | Puzzle deteksi anomali 10' + Battle 10' |
| WN-H01 | Hidden | Air Naik (Sambilan Talago) | 25 | Dengar 9 versi 10' + Battle 9 ronde survival 15' |
| WN-H02 | Hidden | Rumah Upiak | 20 | Eksplorasi 4 objek personal 20' + Battle 0' |
| WN-H03 | Hidden | Yang Tersisa dari Pilihan | 15 | Dialog naratif murni (bercabang jalur) 15' + Battle 0' |
| | | **SUBTOTAL WANASUNYA** | **395' (~6.58 jam)** | **Target WB DIREVISI: ~6.0-6.5 jam untuk region S2 (dari ~4.5 jam) → ✅ SESUAI, dalam rentang baru (sedikit di atas batas atas, dalam toleransi wajar)** |

**Catatan Wanasunya — KEPUTUSAN FINAL:** Region ini sebelumnya distub di Kerangka Misi awal (hanya 5 Side Mission placeholder generik, 3 karakter Common tanpa misi sama sekali). Setelah ditulis penuh menjadi 8 Side Mission + restrukturisasi Opsi C, durasi final 395 menit (~6.58 jam). **Keputusan:** target WB §II.1 untuk region S2 DIREVISI dari ~4.5 jam menjadi ~6.0-6.5 jam per region — bukan memangkas konten. Alasan: Smarana (S2 lainnya, sudah selesai) mendarat di ~6.25 jam dengan pola serupa (over-budget signifikan dari target lama) — ini menunjukkan target awal terlalu rendah untuk region S2 yang dikerjakan penuh, bukan masalah spesifik Wanasunya. Memangkas konten akan berarti menghapus jalur rekrutmen karakter nyata atau mengorbankan kualitas puzzle yang sudah dirancang matang.

### Region 5–9 — Estimasi Ringkas

| Region | Misi | Durasi Est. | Target WB | Selisih | Status |
|---|---|---|---|---|---|
| Kalamrtu | 18 | ~370' (6.17 jam) | ~5.4 jam (rata-rata misi S3 baru: 10.83 jam ÷ 2 region) | +0.77 jam | ✅ Dekat target baru, dalam toleransi |
| Himagiri | 14 | ~280' (4.7 jam) | ~5.4 jam (rata-rata misi S3 baru) | -0.7 jam | ✅ Di bawah target baru, toleransi luas |
| Rajawani | 16 | ~340' (5.67 jam) | ~5.6 jam (rata-rata misi S4 baru: 11.25 jam ÷ 2 region) | +0.07 jam | ✅ Sangat dekat target baru |
| Jaladri | 16 | ~335' (5.58 jam) | ~5.6 jam (rata-rata misi S4 baru) | -0.02 jam | ✅ Nyaris pas target baru |
| Anawil | 12 | ~400' (6.7 jam) | ~6.67 jam (Finale = 1 region, target = aktual) | +0.03 jam | ✅ Nyaris pas, Finale target disesuaikan ke aktual |

**Catatan Anawil:** Durasi per misi lebih panjang (~33 menit rata-rata vs ~20 menit di region lain) karena tanpa teks guidance, pemain casual butuh waktu lebih lama untuk orientasi. Ini BUKAN masalah desain — ini konsekuensi mekanik Tanpa Kata yang harus dikomunikasikan ke pemain sebelum masuk Anawil.

### Rangkuman Durasi Total — ✅ FINAL setelah revisi WB §II.1

| Metrik | Nilai |
|---|---|
| Total durasi misi (semua region) | ~3.425 menit (~57.08 jam) |
| Target dari WB (BARU, direvisi — 65% dari 86 jam) | ~55.9 jam |
| Selisih total | **+1.18 jam (2% over) — dalam toleransi wajar** |
| Status per-region | Seluruh 9 region sekarang berstatus ✅ SESUAI terhadap target masing-masing (lihat tabel durasi per-region di atas) — tidak ada lagi region berstatus "over-budget" |

**✅ SELESAI DIEKSEKUSI:** World Bible §II.1 sudah direvisi (lihat dokumen World Bible v5.2) — total game naik dari 72 jam ke **~86 jam** (+19%). Metodologi: durasi misi AKTUAL tiap season (dari Quest Script detail 9 region) dibagi rasio 65% (misi) : 35% (non-misi), konsisten dengan rasio yang dipakai sejak awal proyek.

**Breakdown per-season (angka final):**
- S1 (Nirwasita+Kadewan): 20 → **22 jam**
- S2 (Smarana+Wanasunya): 14 → **19.75 jam**
- S3 (Kalamrtu+Himagiri): 14 → **16.5 jam**
- S4 (Rajawani+Jaladri): 14 → **17.5 jam**
- Finale (Anawil): 10 → **10.5 jam**

**Kenapa revisi ini ditunda sampai sekarang (bukan dieksekusi bertahap tiap region):** keputusan sebelumnya untuk menunda terbukti tepat — 7 dari 9 region ternyata punya gap konten signifikan (karakter tanpa misi, kesalahan "Cara Didapat", 1 bug struktural) yang HANYA ketahuan setelah proses Quest Script detail. Kalau WB direvisi lebih awal (mis. setelah S2 saja), angka itu harus direvisi ulang berkali-kali seiring temuan region berikutnya. Menunggu sampai seluruh 9 region selesai memastikan 1 revisi yang stabil dan final.



---

# ANALISIS B — VALIDASI DIFFICULTY CURVE

## Skala Kesulitan Puzzle (1-5)

| Level | Deskripsi | Contoh | Frekuensi Gagal (est. casual) |
|---|---|---|---|
| 1 — Tutorial | Pemain diberi jawaban dan diminta mengulangi | Mini-game susun aksara dengan template (KL-M01) | 0-1x |
| 2 — Guided | Clue eksplisit, 1 langkah logika | Navigasi lewat penanda visual jelas (NR-M01) | 0-1x |
| 3 — Standard | Clue tersembunyi tapi fair, 2-3 langkah logika | Identifikasi baris doa dari bukti (KD-M03), puzzle urutan upacara (KD-M05) | 1-2x |
| 4 — Complex | Multi-step, butuh observasi dari misi sebelumnya | Mini-game perdagangan Smarana (SM-M02), mediasi tanpa memihak (SM-S04), navigasi tanpa HUD (NR-M04) | 2-3x |
| 5 — Expert | Tidak ada clue teks, timing sempit, atau syarat lintas-region | Seluruh Anawil A4+ (tanpa teks), Titah Gema Purwa (seluruh Ensiklopedia 8 region) | 3+x |

## Skala Kesulitan Battle (1-5)

| Level | Deskripsi | Contoh |
|---|---|---|
| 1 — Tutorial | Encounter pengenalan, musuh lemah, pola sederhana | NR-M01 Penari Kabut, KD-M01 Penari Kosong |
| 2 — Standard | Encounter biasa, musuh punya 1-2 pola | Side mission encounter tier rendah |
| 3 — Challenging | Elite monster, mekanik signature aktif, 2-3 fase | Penjaga Menara (NR-M05), Sesaji Berjalan (KD-M03) |
| 4 — Hard | Boss region, multi-fase, kondisi menang non-konvensional | Nirsmara fase 3 (NR-M06), Sang Werdi (KD-M06) |
| 5 — Endgame | Legendary boss penuh kekuatan, mekanik unik | Naga Sasra 320% (JL-M05), Gema Smarana environment-battle (SM-M05) |

## Pemetaan Difficulty Curve per Season

### S1 — Nirwasita + Kadewan (Tutorial)

| Misi | Puzzle | Battle | Rata-rata | Catatan |
|---|---|---|---|---|
| NR-M01 | 2 | 1 | 1.5 | Tutorial penuh |
| NR-M02 | 2 | 1 | 1.5 | Tutorial + dialog |
| NR-M03 | 3 | 2 | 2.5 | Puzzle kesabaran pertama |
| NR-M04 | 4 | 3 | 3.5 | **⚠️ SPIKE — misi tanpa HUD di region tutorial** |
| NR-M05 | 3 | 3 | 3.0 | Rantai Nenek Ranaya klimaks |
| NR-M06 | 4 | 4 | 4.0 | Boss region, wajar |
| NR-S01 s/d S04 | 2-3 | 2-3 | 2.5 avg | Standar side mission |
| NR-H01 s/d H03 | 3-4 | 1-3 | 2.5 avg | Hidden = lebih sulit puzzle, tidak selalu lebih sulit battle |
| KD-M01 | 2 | 1 | 1.5 | Tutorial Ritual Otomatis |
| KD-M02 | 3 | 2 | 2.5 | Puzzle "diam" pertama |
| KD-M03 | 3 | 3 | 3.0 | Investigasi + Elite |
| KD-M04 | 3 | 2 | 2.5 | Pilihan moral, bukan puzzle keras |
| KD-M05 | 3 | 3 | 3.0 | Puzzle + battle bertingkat |
| KD-M06 | 4 | 4 | 4.0 | Boss region |
| **Rata-rata S1** | **2.9** | **2.4** | **2.6** | |

**⚠️ TEMUAN: NR-M04 (Adi dan Gerbang Terbuka) punya difficulty spike ke 3.5 di tengah region tutorial.** Misi ini memaksa navigasi tanpa HUD — ini syarat WB §1.6, tapi penempatannya di misi ke-4 (dari 6 Main) mungkin terlalu dini. Pemain casual baru main ~2 jam dan belum terbiasa mekanik.

**Opsi perbaikan:**
- (A) Pindahkan NR-M04 ke posisi NR-M05, beri pemain 1 misi tambahan untuk terbiasa sebelum kehilangan HUD
- (B) Beri hint visual yang lebih kuat di NR-M04 (sedikit mengurangi kesulitan dari 4 ke 3)
- (C) Biarkan — spike disengaja sebagai "tes apakah pemain sudah paham mekanik"

**KEPUTUSAN FINAL: Opsi (B) dipilih.** NR-M04 tetap di posisi ke-4 dari 6 Main Mission — tidak dipindah. Perubahan implementasi:

- Adi memberi **hint visual lebih kuat** selama misi tanpa-HUD — silhouette-nya bercahaya samar (efek partikel redup) yang tetap terlihat tanpa bergantung pada teks/HUD, konsisten dengan prinsip "penanda visual di dunia" yang sudah jadi aturan Mekanik Signature Nirwasita (WB §1.2)
- Difficulty puzzle NR-M04 turun dari Level 4 ke **Level 3.5** (bukan 3, karena inti tantangan — navigasi tanpa HUD — tetap harus terasa nyata sebagai tutorial pertama untuk pemain menghadapi kondisi serupa yang lebih berat di Anawil nanti)
- 3 persimpangan tetap ada, tapi persimpangan pertama diberi 1 clue tambahan (jejak kaki Adi yang lebih jelas) — persimpangan ke-2 dan ke-3 tidak diubah, mempertahankan kurva kesulitan naik dalam misi itu sendiri

Ini menjaga tujuan pedagogis (pemain harus benar-benar belajar mengandalkan visual, bukan HUD) sambil mengurangi risiko frustrasi di titik pertama kali mekanik ini diuji penuh.

### S2 — Smarana + Wanasunya (TG1)

| Metrik | Puzzle Avg | Battle Avg | Rata-rata |
|---|---|---|---|
| Smarana Main | 3.1 | 3.0 | 3.1 |
| Smarana Side/Hidden | 2.5 | 2.3 | 2.4 |
| Wanasunya Main | 3.2 | 2.8 | 3.0 |
| Wanasunya Side/Hidden | 2.8 | 2.0 | 2.4 |
| **Rata-rata S2** | **2.9** | **2.5** | **2.7** |

S2 rata-rata hampir sama dengan S1. Ini **bisa jadi masalah** — pemain yang sudah melewati S1 mengharapkan tantangan naik. Tapi karena S2 bebas urutan dan bisa dimainkan langsung setelah S1, curve-nya tidak boleh terlalu jauh dari S1.

**Rekomendasi:** Biarkan. S2 adalah transisi dari linear (S1) ke open-world. Pemain perlu waktu adaptasi ke kebebasan memilih region — difficulty yang stabil membantu.

### S3 — Kalamrtu + Himagiri (TG2)

| Metrik | Puzzle Avg | Battle Avg | Rata-rata |
|---|---|---|---|
| Kalamrtu Main | 3.5 | 3.3 | 3.4 |
| Kalamrtu Side/Hidden | 3.0 | 2.8 | 2.9 |
| Himagiri Main | 3.3 | 2.8 | 3.1 |
| Himagiri Side/Hidden | 2.8 | 1.8 | 2.3 |
| **Rata-rata S3** | **3.2** | **2.7** | **2.9** |

**⚠️ TEMUAN: Himagiri Side/Hidden battle terlalu rendah (1.8).** Banyak misi "0 battle" atau "1 encounter ringan". Ini konsisten dengan lore (region tentang kesabaran, bukan kekerasan), tapi membuat S3 terasa unbalanced — Kalamrtu penuh debuff berat, Himagiri hampir tanpa pertarungan.

**Rekomendasi:** Tambahkan 1-2 encounter opsional di Himagiri Side Missions (bukan wajib, tapi tersedia bagi pemain yang ingin combat). Misalnya HM-S04 (Menari untuk Sembilan) dan HM-S05 (Ikuti Saja) bisa ditingkatkan dari 1 encounter ringan ke 2 encounter menengah.

### S4 — Rajawani + Jaladri (TG3)

| Metrik | Puzzle Avg | Battle Avg | Rata-rata |
|---|---|---|---|
| Rajawani Main | 3.5 | 3.5 | 3.5 |
| Rajawani Side/Hidden | 3.0 | 2.8 | 2.9 |
| Jaladri Main | 3.7 | 3.8 | 3.8 |
| Jaladri Side/Hidden | 3.0 | 2.5 | 2.8 |
| **Rata-rata S4** | **3.3** | **3.2** | **3.3** |

Naik dari S3 (2.9). Wajar. Jaladri sedikit lebih sulit dari Rajawani (serpihan + boss Naga Sasra 320%). Tidak ada spike yang tidak wajar.

### Finale — Anawil (TG4-5)

| Metrik | Puzzle Avg | Battle Avg | Rata-rata |
|---|---|---|---|
| Anawil Main | 4.6 | 3.4 | 4.0 |
| Anawil Side/Hidden | 4.2 | 2.5 | 3.4 |
| **Rata-rata Finale** | **4.4** | **3.0** | **3.7** |

**⚠️ TEMUAN: Puzzle jauh lebih sulit dari battle.** Puzzle rata-rata 4.4 (hampir Expert), battle rata-rata 3.0 (Challenging tapi bukan Hard). Ini BENAR secara desain — Anawil tentang "komunikasi tanpa kata", bukan "pertarungan terkuat". Tapi jeda antara puzzle dan battle terlalu lebar (1.4 poin). Pemain combat-oriented mungkin merasa battle Anawil anticlimactic setelah Naga Sasra di Jaladri.

**Rekomendasi:** Naikkan battle difficulty AW-M04 dan AW-M05 dari 3 ke 4. Bukan dengan menambah HP musuh, tapi dengan membuat battle tanpa informasi teks lebih menantang secara taktis (tidak bisa lihat HP lawan, elemen tersembunyi, dll.). Ini menaikkan rata-rata battle ke 3.4 tanpa merusak tema.

### Kurva Keseluruhan

| Season | Puzzle Avg | Battle Avg | Combined | Kenaikan dari Season Sebelumnya |
|---|---|---|---|---|
| S1 (Tutorial) | 2.9 | 2.4 | 2.6 | — |
| S2 (TG1) | 2.9 | 2.5 | 2.7 | +0.1 (datar, by design) |
| S3 (TG2) | 3.2 | 2.7 | 2.9 | +0.2 |
| S4 (TG3) | 3.3 | 3.2 | 3.3 | +0.4 |
| Finale (TG4-5) | 4.4 | 3.0 | 3.7 | +0.4 |

**Validasi kurva: LULUS DENGAN CATATAN.**
- Tren naik konsisten S1 → S4 → Finale ✅
- S2 datar terhadap S1 — by design (transisi open world) ✅
- Finale punya puzzle spike yang SANGAT tinggi (4.4) — ini bisa frustrasi pemain casual yang tidak siap. Perlu warning eksplisit sebelum masuk Anawil (misalnya NPC di Padepokan yang bilang "region ini berbeda dari semua yang kamu kenal")
- Battle Himagiri dan Anawil di bawah rata-rata season-nya — rekomendasi perbaikan sudah di atas

---

# ANALISIS C — DISTRIBUSI BATTLE BALANCE

## Klasifikasi Battle per Misi

Setiap misi diklasifikasikan berdasarkan porsi battle terhadap total durasi misi:

| Kategori | Definisi | Ikon |
|---|---|---|
| **Heavy Battle** | >50% durasi misi adalah combat | ⚔️⚔️ |
| **Mixed** | 30-50% combat, sisanya puzzle/dialog | ⚔️🧩 |
| **Light Battle** | 10-30% combat, dominan puzzle/dialog | 🧩⚔️ |
| **Zero Battle** | 0% combat — murni puzzle, dialog, observasi | 🧩🧩 |

## Distribusi per Region

### Nirwasita (13 misi)

| Kategori | Misi | Jumlah | % |
|---|---|---|---|
| ⚔️⚔️ Heavy | NR-M06 (boss), NR-H02 (Wira Senja) | 2 | 15% |
| ⚔️🧩 Mixed | NR-M02, M03, M04, M05, NR-S01, S02, S04 | 7 | 54% |
| 🧩⚔️ Light | NR-H01, NR-S03 | 2 | 15% |
| 🧩🧩 Zero | NR-H03 (Saras Pertiwi) | 1 | 8% |
| **Dominan: Mixed** | | | **Seimbang ✅** |

### Kadewan (15 misi)

| Kategori | Misi | Jumlah | % |
|---|---|---|---|
| ⚔️⚔️ Heavy | KD-M06 (boss) | 1 | 7% |
| ⚔️🧩 Mixed | KD-M01, M02, M03, M05, KD-S01, S02, S03, S05, KD-H02 | 9 | 60% |
| 🧩⚔️ Light | KD-S04, KD-H01, KD-S06 (baru) | 3 | 20% |
| 🧩🧩 Zero | KD-M04 (jalur efisiensi), KD-H03 (Randu Girang) | 2 | 13% |
| **Dominan: Mixed** | | | **Seimbang ✅** |

### Smarana (17 misi)

| Kategori | Jumlah | % |
|---|---|---|
| ⚔️⚔️ Heavy | 2 (SM-M05, M06) | 12% |
| ⚔️🧩 Mixed | 8 | 47% |
| 🧩⚔️ Light | 5 (+SM-S06 baru) | 29% |
| 🧩🧩 Zero | 2 (SM-H03, SM-M07 sebagian) | 12% |
| **Dominan: Mixed** | | **Seimbang ✅** |

### Wanasunya (17 misi) — **Diperbarui setelah ekspansi Side Mission + restrukturisasi Opsi C (rantai Sang Lengang)**

| Kategori | Jumlah | % |
|---|---|---|
| ⚔️⚔️ Heavy | 0 | 0% |
| ⚔️🧩 Mixed | 10 (WN-M01, M02, M04, M05, S02, S03, S04, S05, S08, H01) | 59% |
| 🧩⚔️ Light | 4 (WN-M06, S01, S06, S07) | 24% |
| 🧩🧩 Zero | 3 (WN-M03, H02, H03) | 18% |
| **⚠️ Heavy Battle 0% — by design, bukan gap** | | **Konsekuensi Opsi C: klimaks region (WN-M06) sengaja spectator, bukan battle partisipatif. Pola serupa Anawil (finale tanpa Heavy Battle karena alasan tematik) — TIDAK direkomendasikan "diperbaiki" dengan menambah battle paksa, karena akan melanggar kanon "Cara didapat" Sang Lengang** |

### Kalamrtu (18 misi) — **Diperbarui setelah 3 gap-fill (Sidhayatri, Kelasi Wira, Watu Sema)**

| Kategori | Jumlah | % |
|---|---|---|
| ⚔️⚔️ Heavy | 2 (KL-M06 boss, KL-S05 Rahib Abu) | 11% |
| ⚔️🧩 Mixed | 10 (+KL-S07, KL-S08 baru) | 56% |
| 🧩⚔️ Light | 4 (+KL-S06 baru) | 22% |
| 🧩🧩 Zero | 2 (KL-S04 Sekar Kemarung, +1) | 11% |
| **Dominan: Mixed** | | **Seimbang ✅** |

### Himagiri (14 misi) — **DIPERBARUI setelah keputusan balance**

| Kategori | Jumlah | % |
|---|---|---|
| ⚔️⚔️ Heavy | 1 (HM-M04 boss) | 7% |
| ⚔️🧩 Mixed | 4 | 29% |
| 🧩⚔️ Light | 7 (+HM-M05, +HM-H03 dikonversi dari Zero) | 50% |
| 🧩🧩 Zero | 2 (HM-S03, HM-H01) | 14% |
| **✅ Zero Battle turun dari 29% ke 14%** | | **Sesuai keputusan — lihat Analisis C** |

### Rajawani (15 misi)

| Kategori | Jumlah | % |
|---|---|---|
| ⚔️⚔️ Heavy | 2 (RJ-M05 boss, RJ-M03) | 13% |
| ⚔️🧩 Mixed | 7 | 47% |
| 🧩⚔️ Light | 4 | 27% |
| 🧩🧩 Zero | 2 (RJ-M06, RJ-H03) | 13% |
| **Dominan: Mixed** | | **Seimbang ✅** |

### Jaladri (16 misi) — **Diperbarui setelah gap-fill Abu Tembara**

| Kategori | Jumlah | % |
|---|---|---|
| ⚔️⚔️ Heavy | 3 (JL-M05, M06, JL-S02) | 19% |
| ⚔️🧩 Mixed | 8 (+JL-S06 baru) | 50% |
| 🧩⚔️ Light | 4 | 25% |
| 🧩🧩 Zero | 1 (JL-H02) | 6% |
| **Heavy Battle tertinggi di game (19%)** | | **By design — endgame S4 ✅** |

### Anawil (12 misi) — **DIPERBARUI setelah keputusan balance**

| Kategori | Jumlah | % |
|---|---|---|
| ⚔️⚔️ Heavy | 1 (AW-H03 direklasifikasi dari Mixed) | 8% |
| ⚔️🧩 Mixed | 3 | 25% |
| 🧩⚔️ Light | 4 | 33% |
| 🧩🧩 Zero | 4 (AW-H01, H04, AW-S02 sebagian, AW-M05 encounter non-lethal) | 33% |
| **✅ Heavy Battle sekarang ada 1 (8%)** | | **Sesuai keputusan — lihat Analisis C** |

## Tabel Ringkasan Distribusi — **DIPERBARUI setelah 3 keputusan balance**

| Region | ⚔️⚔️ Heavy | ⚔️🧩 Mixed | 🧩⚔️ Light | 🧩🧩 Zero | Battle Density |
|---|---|---|---|---|---|
| Nirwasita | 15% | 54% | 15% | 8% | **Tinggi** |
| Kadewan | 7% | 60% | 20% | 13% | **Tinggi** |
| Smarana | 12% | 47% | 29% | 12% | **Sedang-Tinggi** |
| Wanasunya | 0% | 59% | 24% | 18% | **Sedang-Tinggi (0% Heavy by design — spectator finale)** |
| Kalamrtu | 11% | 56% | 22% | 11% | **Sedang-Tinggi** |
| Himagiri | 7% | 29% | **50%** | **14%** | **✅ Sedang (diperbaiki dari Rendah)** |
| Rajawani | 13% | 50% | 25% | 13% | **Sedang-Tinggi (+RJ-S06 gap-fill, Mixed)** |
| Jaladri | **19%** | 50% | 25% | 6% | **Tinggi** |
| Anawil | **8%** | 25% | 33% | **33%** | **Sedang (Heavy Battle hadir, Zero tetap tinggi by design)** |
| **Rata-rata** | **10%** | **47%** | **27%** | **15%** | |

**Catatan:** Zero Battle Anawil tetap 33% — ini TIDAK diturunkan lebih lanjut karena keputusan hanya mencakup reklasifikasi AW-H03 (Mixed→Heavy), bukan konversi misi Zero lainnya. 3 misi Zero Battle Anawil (AW-H01 Telapak Kedelapan, AW-H04 Tanpa Rupa, AW-M05 encounter non-lethal Gema Purwa) tetap dipertahankan tanpa combat — ini inti dari tema "bukan lawan" yang eksplisit di WB §9.1 untuk Gema Purwa, dan tidak boleh dikompromikan demi angka statistik.

## Temuan & Rekomendasi Battle Balance

### Masalah 1 — Himagiri Zero Battle 29% ✅ DISELESAIKAN

Hampir sepertiga misi Himagiri tidak punya pertarungan sama sekali. Ini konsisten dengan tema "menjadi saksi, bukan pemenang" — tapi pemain yang baru dari Kalamrtu (53% Mixed) akan merasakan penurunan drastis.

**Keputusan diambil:** Konversi 2 dari 4 misi Zero Battle menjadi Light Battle:
- HM-M05 (Keraton Kosong) — ditambahkan 1 encounter "Kenangan Terakhir" opsional (tidak wajib untuk selesai misi, tapi tersedia bagi pemain combat-oriented)
- HM-H03 (Hutan yang Tidak Berbunyi) — encounter yang sudah ada dinaikkan dari opsional ke **wajib**

**Hasil:** Zero Battle turun dari 29% ke 14%, Light Battle naik dari 36% ke 50%. Perubahan sudah diterapkan di tabel misi region Himagiri (bagian atas dokumen) dan tabel distribusi.

### Masalah 2 — Anawil Zero Heavy Battle ✅ DISELESAIKAN (sebagian)

Anawil tidak punya satu pun Heavy Battle. Sebagai FINALE game, ini bisa terasa anticlimactic bagi pemain combat-oriented — mereka baru menghadapi Naga Sasra (320%, endgame) di Jaladri, lalu masuk region tanpa tantangan combat berat.

**Keputusan diambil:** Reklasifikasi **AW-H03 (Titah Penunggu Sunyi)** dari Mixed ke **Heavy** — 3 gelombang survival tanpa dialog bantuan, tanpa HP bar/status lawan terlihat. Battle ini sudah secara inherent berat (survival + kebutaan informasi), reklasifikasi ini mengakui bobot yang sudah ada, bukan menambah konten baru.

**Yang TIDAK diubah (di luar cakupan keputusan ini):**
- AW-M04 (Dinding Telapak) tetap Mixed — usulan menaikkannya ke "Mixed-Hard" tidak dieksekusi dalam keputusan ini, tetap sebagai catatan terbuka jika playtest menunjukkan perlu
- 4 misi Zero Battle Anawil lainnya (AW-H01, AW-H04, AW-M05 encounter non-lethal Gema Purwa, sebagian AW-S02) **sengaja dipertahankan tanpa combat** — terutama AW-M05, karena WB §9.1 eksplisit menyatakan Gema Purwa "bukan lawan" dan pertarungan dengannya "tidak bisa dimenangkan dengan damage". Mengubah ini akan melanggar prinsip desain inti Anawil.

**Hasil:** Heavy Battle Anawil naik dari 0% ke 8%. Zero Battle tetap 33% — dipertahankan sebagai keputusan sadar, bukan gap yang belum diperbaiki.

### Masalah 3 — S3 Internal Imbalance

Kalamrtu (53% Mixed, 13% Heavy) vs Himagiri (29% Mixed, 7% Heavy) — dua region di season yang sama tapi terasa seperti game berbeda. Pemain yang main Kalamrtu dulu akan shock di Himagiri, dan sebaliknya.

**Rekomendasi:** Ini BISA dibiarkan sebagai fitur ("S3 sengaja kontras — penghapusan brutal vs penyangkalan halus"), tapi perlu dikomunikasikan. Opsi: NPC di Padepokan antara Kalamrtu dan Himagiri yang bilang "Himagiri bukan tempat untuk pedang. Siapkan kesabaranmu."

### Kurva Battle Density per Season

| Season | Heavy+Mixed | Light+Zero | Rasio Combat:Non-Combat |
|---|---|---|---|
| S1 | 70% | 30% | 2.3:1 |
| S2 | 57% | 43% | 1.3:1 |
| S3 | 51% | 49% | ~1:1 |
| S4 | 63% | 37% | 1.7:1 |
| Finale | 33% | 67% | 1:2 |

**Kurva ini membentuk pola "V terbalik" — combat density naik di S1, turun di S2-S3, naik lagi di S4, lalu turun drastis di Finale.** Ini BUKAN kurva naik konsisten. Apakah ini masalah?

**Argumen "bukan masalah":** Pola ini mencerminkan arc naratif. S1 = aksi (belajar dunia). S2-S3 = pemahaman (mekanik lebih dalam, dialog lebih berat). S4 = klimaks aksi. Finale = resolusi (bukan aksi, tapi makna). Ini pola standar struktur tiga babak.

**Argumen "masalah":** Pemain game RPG terbiasa difficulty curve yang NAIK terus. Finale yang lebih "ringan" secara combat bisa terasa underwhelming — "aku grinding 60 jam untuk INI?"

**Rekomendasi akhir:** Biarkan pola V-terbalik, tapi pastikan Finale punya **emotional difficulty** yang menggantikan combat difficulty. AW-M05 (Gema Purba) harus terasa seperti klimaks meskipun bukan Heavy Battle — lewat skala cutscene, callback audio 8 region, dan bobot pilihan 3 ending. Ini bukan sesuatu yang bisa diukur di spreadsheet — ini tugas director/writer.

---

# ANALISIS D — KEPUTUSAN TITAH GEMA PURWA (AW-H02)

Syarat saat ini: **SELURUH entri Ensiklopedia 8 region** (Nirwasita–Jaladri). Ini berarti pemain harus menyelesaikan 100% konten Side Mission dan Hidden Mission di 8 region — SEBELUM bahkan masuk Anawil.

**Analisis realistis:**

| Metrik | Nilai |
|---|---|
| Total misi non-Anawil | 116 |
| Misi yang menghasilkan entri Ensiklopedia | ~90 (estimasi — beberapa misi tidak memberi entri baru) |
| Estimasi waktu 100% completion 8 region | ~65 jam (termasuk non-misi) |
| % pemain casual yang 100% sebelum finale | <5% (berdasarkan benchmark industri RPG serupa) |

**Ini terlalu berat untuk pemain casual.** Gema Purwa (#83, Legendary) akan menjadi karakter yang hampir tidak ada yang dapat tanpa walkthrough — yang secara desain mungkin OK (Legendary = langka), tapi secara lore BERMASALAH karena Gema Purwa adalah apex region Anawil dan seharusnya bisa dialami oleh pemain yang sudah menyelesaikan 8 region.

**Opsi yang dipertimbangkan:**

| Opsi | Syarat | Pro | Kontra |
|---|---|---|---|
| A — 100% (saat ini) | Seluruh Ensiklopedia | Paling ekslusif, sesuai "gema purba" | <5% pemain dapat, perlu walkthrough |
| B — 90% | 90% entri Ensiklopedia | Masih sangat berat, tapi memberi margin error | 90% masih ~59 jam, masih butuh walkthrough |
| C — 80% + syarat kualitas | 80% entri + selesaikan 8/8 Main Mission chain + 5/8 Item Spesial | Realistis untuk pemain dedicated (~50 jam), masih eksklusif | Kurang "sempurna" dari versi asli |
| D — Per-region Ensiklopedia | Min 15 entri per region (bukan total) | Distribusi lebih merata, pemain tidak bisa skip 1 region | Kurang menantang |

**Rekomendasi: Opsi C.** Syarat menjadi: "Kumpulkan 80% entri Ensiklopedia + selesaikan seluruh 8 Main Mission chain + dapatkan minimal 5 dari 8 Item Spesial region." Ini masih sangat berat (~50 jam konten sebelum Anawil), tapi realistis tanpa walkthrough. Mempertahankan eksklusivitas Legendary tanpa membuatnya mustahil.

**KEPUTUSAN FINAL: Opsi A dipertahankan.** Syarat 100% Ensiklopedia 8 region **tidak diubah**. Ini desain intentional — Gema Purwa adalah karakter Legendary apex Anawil, dan kelangkaannya (secara desain, <5% pemain casual akan mendapatkannya tanpa walkthrough) konsisten dengan posisinya sebagai "gema pertama/purba" yang menurut lore memang seharusnya nyaris mustahil ditemukan.

**Konsekuensi yang harus diterima:**
- Karakter ini secara efektif menjadi "achievement karakter" bagi pemain yang benar-benar 100% completion, bukan karakter yang bisa didapat dalam playthrough normal
- Dokumen Walkthrough (lihat §Tahap Berikutnya) WAJIB mendokumentasikan jalur ini secara eksplisit dan lengkap — karena tanpa panduan, karakter ini secara praktis tidak akan pernah didapat pemain mana pun
- Ini TIDAK dianggap sebagai gap desain — ini pilihan sadar bahwa 1 dari 100 karakter boleh berada di luar jangkauan pemain casual sepenuhnya

---

# BAGIAN PENUTUP

## Item Tindak Lanjut — Diperbarui

| # | Item | Status | Prioritas |
|---|---|---|---|
| 1 | 7 Anawil tier rendah sebagai sub-objective di Main Mission | ✅ DIPUTUSKAN | — |
| 2 | Estimasi durasi per misi | ✅ SELESAI — lihat Analisis A | — |
| 3 | Validasi difficulty curve | ✅ SELESAI — lihat Analisis B. 3 temuan, 3 rekomendasi | Sedang |
| 4 | Analisis distribusi battle balance | ✅ SELESAI — lihat Analisis C. 3 masalah, rekomendasi per masalah | Sedang |
| 5 | Dokumen walkthrough | 🟡 MENUNGGU — dibuat setelah dokumen misi difinalkan | Rendah (setelah playtest S1) |
| 6 | Syarat Titah Gema Purwa (AW-H02) — 100% Ensiklopedia | ✅ FINAL — dipertahankan sebagai desain intentional (lihat Analisis D). Walkthrough wajib dokumentasikan jalur ini | — |
| 7 | NR-M04 difficulty spike di S1 | ✅ FINAL — Opsi B dipilih: posisi tetap, Adi beri hint visual lebih kuat, puzzle turun ke Level 3.5 | — |
| 8 | Himagiri battle balance | ✅ FINAL — HM-M05 +encounter opsional, HM-H03 encounter jadi wajib. Zero Battle 29%→14% | — |
| 9 | Anawil battle reklasifikasi | ✅ FINAL (sebagian) — AW-H03 Mixed→Heavy. AW-M04 tidak diubah (di luar cakupan keputusan). 4 misi Zero Battle Anawil sengaja dipertahankan | — |
| 10 | Smarana over-budget 1.3 jam — perlu dipantau playtest | 🟡 MENUNGGU playtest S2 | Rendah |
| 11 | S3 internal imbalance (Kalamrtu vs Himagiri) — komunikasi ke pemain | 🟡 MENUNGGU keputusan narrative | Rendah |
| 12 | AW-M04 upgrade ke "Mixed-Hard" — dicatat tapi tidak dieksekusi | 🟡 CATATAN TERBUKA — tunggu hasil playtest Anawil | Rendah |
| 13 | KD-S06 item reward — SEMULA dikira perlu item baru | ✅ SELESAI — ternyata **sudah kanon**: Dokumen Item §3.3 sudah mencatat "Titah Sembilan Ratus Tahun" / "Kitab Sembilan Ratus Tahun" untuk Kala Sesari SEBELUM KD-S06 dibuat. Nama misi & item dikoreksi mengikuti kanon, bukan menciptakan item baru | — |
| 14 | Durasi Wanasunya (final: ~6.58 jam) vs target WB lama (~4.5 jam) | ✅ FINAL — target region S2 direvisi manual jadi ~6.0-6.5 jam (bukan pangkas konten), didukung data Smarana yang polanya sama (~6.25 jam). Konsekuensi matematis ke total season S2 WB §II.1 (14 jam→~19.75 jam) DITUNDA sampai 9 region selesai di-Quest-Script — lihat catatan di Rangkuman Durasi Total | — |
| 15 | Revisi resmi WB §II.1 (total jam per-season + total 72 jam keseluruhan) | ✅ SELESAI — direvisi ke ~86 jam total (dari 72 jam, +19%). Breakdown per-season: S1 22h, S2 19.75h, S3 16.5h, S4 17.5h, Finale 10.5h. Metodologi: durasi misi aktual ÷ rasio 65/35, konsisten sejak awal | — |

## Tahap Berikutnya

Setelah seluruh keputusan di atas dijawab:
1. **Update Kerangka Misi ke v0.2** — integrasikan keputusan ✅ SELESAI
2. **Detail Quest Script Region 1 (Nirwasita)** — ✅ SELESAI (v0.2)
3. **Detail Quest Script Region 2 (Kadewan)** — ✅ SELESAI (v0.3), termasuk KD-S06 (Kala Sesari) sebagai tambahan gap-fill
4. **Detail Quest Script Region 3 (Smarana)** — ✅ SELESAI, 2 gap ditemukan & diperbaiki sebelum scripting
5. **Detail Quest Script Region 4 (Wanasunya)** — 🟡 SEDANG DIKERJAKAN. **Gap TERBESAR sejauh ini ditemukan**: Kerangka Misi awal menstub seluruh Side Mission region ini (placeholder generik) dan melewatkan 3 karakter Common sepenuhnya. Diperbaiki dengan menulis 8 Side Mission penuh (dari 5 stub) + 2 Hidden Mission baru (dari stub). Durasi region naik dari ~4.9 jam ke ~6.83 jam — **butuh keputusan: terima durasi lebih panjang, atau pangkas jumlah Side Mission** (lihat Item Tindak Lanjut #14).
6. **Playtest Region 1-4** — belum dilakukan
7. **Buat Dokumen Walkthrough** — setelah quest script dan playtest seluruh region
8. **Detail Quest Script Region 4 (Wanasunya)** — ✅ SELESAI. Kesalahan struktural besar ditemukan & diperbaiki (identitas Niniak Belang/Sang Lengang tercampur, dikoreksi lewat Opsi C).
9. **Revisi resmi WB §II.1 total jam** — 🟡 DITUNDA sengaja sampai 9 region selesai (lihat Item #15)
10. **Detail Quest Script Region 5 (Kalamrtu)** — ✅ SELESAI. 3 gap ditemukan & diperbaiki (Sidhayatri, Kelasi Wira, Watu Sema). KL-M06 (Sang Wiranata) diverifikasi selaras kanon.
11. **Detail Quest Script Region 6 (Himagiri)** — ✅ SELESAI. Opsi D dieksekusi, 2 Main Mission direvisi (Pasarwengi, Sabdaguna), 1 koreksi Cara Didapat (Tabuh Senja).
12. **Detail Quest Script Region 7 (Rajawani)** — ✅ SELESAI. 1 gap diperbaiki (Sawangi Pala), 1 koreksi Cara Didapat besar (Penjaga Polos), HP Sang Harga dikonfirmasi (5350), tingkatan fase Warisan ditambahkan.
13. **Detail Quest Script Region 8 (Jaladri)** — ✅ SELESAI. 1 gap diperbaiki (Abu Tembara), 1 koreksi Cara Didapat (Gema Ganda), HP Naga Sasra dikonfirmasi (5500), bonus Serpihan Terakhir jalur SCATTERED ditambahkan.
14. **Detail Quest Script Region 9 (Anawil)** — ✅ SELESAI. **Bug struktural serius ditemukan & diperbaiki**: AW-M05 dan AW-H02 sama-sama mengklaim merekrut Gema Purwa lewat mekanik bertentangan. Dokumen Item §3.12 sudah punya catatan revisi eksplisit yang menolak skema lama (terikat ending) — AW-M05 dikoreksi jadi murni klimaks naratif tanpa rekrutmen, AW-H02 jadi satu-satunya jalur Gema Purwa.

---

# 🎉 SELURUH 9 REGION SELESAI DI-QUEST-SCRIPT

| Region | Quest Script | Misi | Temuan Utama |
|---|---|---|---|
| 1. Nirwasita | v0.2 | 13 | — |
| 2. Kadewan | v0.3 | 15 | Kala Sesari (rekrutmen) |
| 3. Smarana | v0.2 | 17 | Antuwan Melayang, Jatawira |
| 4. Wanasunya | v0.1 | 17 | 8 karakter stub + Opsi C (Sang Lengang) |
| 5. Kalamrtu | v0.2 | 18 | 3 karakter + Rahib Abu, Lidah Watu |
| 6. Himagiri | v0.1 | 14 | Opsi D (Wisesa Girinatha) + Pasarwengi, Sabdaguna, Tabuh Senja |
| 7. Rajawani | v0.2 | 16 | Sawangi Pala + Penjaga Polos |
| 8. Jaladri | v0.2 | 16 | Abu Tembara + Gema Ganda |
| 9. Anawil | v0.1 | 12 | Bug struktural Gema Purwa |
| **TOTAL** | | **138** | **9/9 region, setiap satu punya minimal 1 temuan nyata** |

## Tahap Berikutnya (Diperbarui — v1.5)

1. **Revisi resmi WB §II.1 total jam** — ✅ SELESAI (lihat Item #15). Total game sekarang ~86 jam.
2. **Formula ending global Anawil** — ✅ SELESAI (lihat Quest Script R9 AW-M05 Beat 3-3.5). Catatan: GDD v3 §5.5 yang dirujuk WB ternyata purwarupa usang (2-region/30-karakter) — formula final adalah desain baru berdasar esensi tematik, belum direview tim writing.
3. **Pass combat math global** — seluruh angka `[PLACEHOLDER]` di 9 Quest Script sekarang bisa direvisi sekaligus, karena kurva kesulitan lintas-region sudah lengkap terlihat. Belum dikerjakan.
4. **Playtest Region 1 (Nirwasita)** sebagai titik mulai — validasi estimasi durasi, difficulty curve, battle balance sebelum lanjut ke region berikutnya.
5. **Dokumen Walkthrough** — setelah playtest awal memvalidasi bahwa struktur dasar bekerja.

---

*Kerangka Misi — Draf v1.5 · September 2026*
*Status: 138 misi terkerangka (53 Main + 52 Side + 33 Hidden) — SELESAI PENUH, seluruh 9 region. Seluruh 9 mekanik signature terintegrasi. 31 Titah tier tinggi tercakup + gap-fill dan koreksi Cara Didapat di 8 dari 9 region. Restrukturisasi Opsi C (Sang Lengang) dan Opsi D (Wisesa Girinatha) selesai. 1 bug struktural serius diperbaiki (Gema Purwa, Anawil). **Durasi & target WB SELESAI DIREVISI PENUH**: total game 72→~86 jam (+19%), seluruh 9 region kini berstatus SESUAI terhadap target masing-masing (tidak ada lagi "over-budget"). Formula ending global (Connection Score, 8 keputusan region) ditambahkan ke AW-M05 — desain baru karena GDD v3 lama yang dirujuk WB ternyata purwarupa usang. Estimasi total durasi misi ~57.08 jam, target baru ~55.9 jam (+2% over, dalam toleransi). Sisa tahap: pass combat math global, playtest, Dokumen Walkthrough.*
