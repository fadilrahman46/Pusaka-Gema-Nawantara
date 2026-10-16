# DOKUMEN ITEM
# PUSAKA: GEMA NAWANTARA

**Versi:** v1.0 — Konsolidasi Final
**Status:** 🟢 LENGKAP — seluruh 9 region, 100 karakter, dan 9 Item Spesial punya konten; sudah melalui 1 pass balancing sistematis. Belum playtest. Lihat Bagian 4 untuk item yang masih butuh tindak lanjut manusia.
**Rujukan kanon:** `World_Bible_Pusaka_Gema_Nawantara_md.docx` (REKAP FINAL v5.0) · `GUIDE_KARAKTER_100_Nawantara_FINAL_md.docx` (100 entri karakter, dibaca dan diparsing penuh untuk lore, skill, dan "Cara Didapat")
**Tidak dirujuk:** GDD v3.0 (akan diupdate setelah dokumen ini final, sesuai arahan awal proyek)
**Tanggal:** September 2026

---

## RINGKASAN ISI

| Bagian | Isi |
|---|---|
| 0 | Sistem umum: 5 tingkat item, 4 kategori, aturan drop location |
| 1 | Katalog item umum — 5 tingkat × 9 region (45 item) |
| 2 | 9 Item Spesial region (detail syarat & efek penuh) |
| 3 | Item unik untuk 100 karakter — kondisi Level + Titah (misi bernama), efek mekanis spesifik per karakter |
| 4 | Item tindak lanjut untuk manusia — bukan lagi "pertanyaan terbuka" desain, tapi tugas administratif/validasi yang tersisa |

## CATATAN DESAIN — ANAWIL

Region Anawil (Bagian 1.9, 2, 3.12) sempat terkunci menunggu prasyarat konsultan budaya (World Bible §9.0). Prasyarat itu dinyatakan terpenuhi — konsultan **Arief** terlibat dengan cakupan review "Misi dan Karakter Anawil", tanggal **08-08-2026**. Catatan ini tercatat di sini; **masih perlu disalin manual ke World Bible §9.0** karena itu dokumen sumber yang lebih otoritatif untuk prasyarat produksi (lihat Bagian 4 poin 1).

Dua prinsip lain di §9.0/§9.5 tetap dijaga penuh di seluruh konten Anawil, terlepas dari status konsultan: **tidak menggunakan mitos mesianis sumber inspirasi secara langsung**, dan **tidak mereproduksi artefak ritual spesifik** — seluruh item/misi Anawil dirancang abstrak-universal (ingatan sebelum bahasa, insting, komunikasi tanpa kata), konsisten dengan gaya lore 11 karakternya sendiri di Guide Karakter FINAL.

---

# BAGIAN 0 — SISTEM UMUM

## 0.1 Lima Tingkat Item

| Tingkat | Drop Rate (dari drop item apa pun) | Level Gate Disarankan | Wangsa Karakter Terkait |
|---|---|---|---|
| Common | 45% | Sejak awal | Common–Uncommon |
| Uncommon | 28% | Lv 10+ | Uncommon–Rare |
| Rare | 16% | Lv 20+ | Rare–Super Rare |
| Super Rare | 8% | Lv 35+ | Super Rare–Ultra Rare |
| Ultra Rare | 3% | Lv 45+ | Ultra Rare–Legendary |

Total 100%. Item Spesial region (Bagian 2) dan Item Unik karakter (Bagian 3) **tidak masuk pool drop rate ini** — keduanya syarat pasti (deterministik), bukan RNG, konsisten dengan prinsip "kesulitan mendapatkan, bukan peluang" yang sudah berlaku untuk akuisisi karakter di Guide Karakter.

## 0.2 Empat Kategori Item

| Kategori | Fungsi Umum | Region yang Menjadikannya Signature |
|---|---|---|
| **Senjata** | Bonus ofensif (ATK/CRT/damage tunggal atau AoE) | Nirwasita, Wanasunya, Himagiri |
| **Jimat** | Bonus utility ringan (buff/debuff kecil, resist, orientasi) | Nirwasita, Kalamrtu |
| **Pusaka** | Efek berat/kondisional, sering terikat ke karakter Legendary atau tema region | Kadewan, Rajawani, Jaladri |
| **Kitab** | Efek pasif acak atau interaksi sistem (Aksara Kutukan, Ritual Otomatis) — hanya relevan di region dengan mekanik berbasis "bacaan/pengetahuan" | Kadewan, Kalamrtu |

## 0.3 Drop Location

Drop location memakai kode zona region (mis. N1-N7 untuk Nirwasita) dari World Bible §IX-B.2. Aturan umum: **tingkat item naik seiring TG (Tingkat Kesulitan) zona naik** — Common banyak muncul di zona TG1, Ultra Rare hampir selalu di zona TG3+ atau zona boss.

---

# BAGIAN 1 — KATALOG ITEM UMUM PER REGION

*Seluruh 9 region.*

## 1.1 Nirwasita — tema "navigasi dipersulit, kesabaran, kompas"

| Tingkat | Nama | Kategori | Deskripsi | Drop Location |
|---|---|---|---|---|
| Common | Penunjuk Basah | Jimat | Kompas kayu yang selalu lembap — sedikit mengurangi distorsi arah dari Mekanik Signature. | N1-N2 |
| Uncommon | Tongkat Perantau | Senjata | Tongkat pejalan tua; efeknya menguat tiap ronde pemakainya tidak menyerang duluan — echo tema "enam puluh tahun menunggu". | N3 |
| Rare | Kompas Karat | Jimat | Jarumnya tidak pernah berhenti bergetar, tapi arahnya sering benar. Mengurangi gangguan kompas Jalan yang Menutup Kembali secara nyata. | N4-N5 |
| Super Rare | Lentera Nenek Ranaya | Pusaka | Menandai satu jalur yang sudah dilalui secara permanen di minimap zona tempat ia didapat. | N6 |
| Ultra Rare | Peta yang Tidak Pernah Selesai | Pusaka | Menunjukkan satu jalur benar sesaat sebelum kabut menutupnya kembali. | N7 |

## 1.2 Kadewan — tema "bentuk tanpa makna, ritual, kitab dibaca tanpa dipahami"

| Tingkat | Nama | Kategori | Deskripsi | Drop Location |
|---|---|---|---|---|
| Common | Lembar Doa Usang | Kitab | Halaman doa yang sudah tidak ada yang ingat cara membacanya dengan benar — efek pasif acak ringan tiap battle, echo Ritual Otomatis. | D1 |
| Uncommon | Mantra yang Dilupakan Artinya | Kitab | Efek pasif acak sedang; hasilnya konsisten kuat, artinya tidak pernah konsisten. | D2-D3 |
| Rare | Genta Tanpa Suara | Pusaka | Terlihat sakral dan berat, efeknya justru sederhana — heal kecil tetap. Ironi visual-fungsi yang disengaja. | D4 |
| Super Rare | Kitab Seribu Ulangan | Kitab | Efek pasif acak kuat, berubah tiap battle — dibaca ribuan kali, dipahami nol kali. | D5 |
| Ultra Rare | Restu yang Menguat dalam Diam | Pusaka | Heal/buff tim menguat kalau tim sengaja tidak beraksi 1 ronde. | D6-D7 |

## 1.3 Smarana — tema "harga, nilai tukar, menjual bukan menyimpan"

| Tingkat | Nama | Kategori | Deskripsi | Drop Location |
|---|---|---|---|---|
| Common | Kalung Gadai | Jimat | Efek kecil yang menguat tiap Batu Gema yang **dijual**, bukan dikumpulkan — kebalikan pola item region lain. | S1 |
| Uncommon | Pisau Penaksir | Senjata | Dipakai menaksir barang sebelum lelang; bonus damage skala jumlah Batu Gema terjual pemain. | S2-S3 |
| Rare | Neraca Kecil | Pusaka | Buff tim ringan, skala total Batu Gema terjual musim berjalan. | S4 |
| Super Rare | Timbangan Juragan Ananta | Pusaka | Efek kuat, terikat langsung ke sistem Neraca Dagang. | S5 |
| Ultra Rare | Segel Balai Lelang | Pusaka | Hanya didapat lewat jalur menjual Batu Gema tingkat tinggi — efek terkuat kategori Pusaka Smarana. | S6-S7 |

## 1.4 Wanasunya — tema "menghilang, tidak terlacak, penyamaran"

| Tingkat | Nama | Kategori | Deskripsi | Drop Location |
|---|---|---|---|---|
| Common | Serat Daun Sunyi | Jimat | Mengurangi 1 Penanda yang dibutuhkan untuk menjaga jalur. | W1-W2 |
| Uncommon | Cakar Tersembunyi | Senjata | Peluang kecil membuat pemakainya tak-bisa-ditarget 1 ronde. | W3 |
| Rare | Topeng Rimbo | Jimat | Menyamarkan elemen pemakai sesaat di awal battle. | W4 |
| Super Rare | Jejak yang Tak Pernah Ada | Pusaka | Tak-bisa-jadi-target 1 ronde penuh; cooldown panjang. | W5-W6 |
| Ultra Rare | Gerbang Kaum Lengang | Pusaka | Seluruh avatar Beast di tim bisa mengendus jalur tertutup tanpa Penanda. | W7 |

## 1.5 Kalamrtu — tema "membaca/menahan kutukan, prasasti"

| Tingkat | Nama | Kategori | Deskripsi | Drop Location |
|---|---|---|---|---|
| Common | Serpihan Prasasti | Jimat | Sedikit mengurangi debuff global dari Aksara Kutukan zona. | K1-K2 |
| Uncommon | Catatan Juru Laklak | Kitab | Mempercepat mini-game menyusun aksara. | K3 |
| Rare | Batu Penahan Kutuk | Jimat | Imun sebagian debuff prasasti selama 2 ronde. | K4-K5 |
| Super Rare | Kitab Aksara yang Hilang | Kitab | Human-only. Membaca sebagian aksara tanpa mini-game — echo avatar Human+Kitab di Mekanik Signature. | K6 |
| Ultra Rare | Mahkota Sang Wiranata | Pusaka | Menahan kutukan sepenuhnya di 1 zona selama battle berlangsung. | K7 |

## 1.6 Himagiri — tema "penundaan, pembekuan, mengulang"

| Tingkat | Nama | Kategori | Deskripsi | Drop Location |
|---|---|---|---|---|
| Common | Untaian Waktu Tertunda | Jimat | Menunda 1 debuff musuh selama 1 ronde. | H1-H2 |
| Uncommon | Keris Pengulang | Senjata | Peluang kecil mengulang skill Dasar. | H3 |
| Rare | Segel Pembeku Kecil | Jimat | Freeze ringan pada musuh dengan SPD terendah. | H4-H5 |
| Super Rare | Payung Kerajaan yang Tak Pernah Dilipat | Pusaka | Menunda giliran 1 musuh kuat. | H6 |
| Ultra Rare | Regalia Upacara Terakhir | Pusaka | Membekukan 1 musuh penuh selama 1 ronde — echo upacara Wisesa Girinatha. | H7 |

## 1.7 Rajawani — tema "nilai/harga, barang bukan cerita"

| Tingkat | Nama | Kategori | Deskripsi | Drop Location |
|---|---|---|---|---|
| Common | Pita Timbangan | Jimat | Efek kecil, skala jumlah item yang dibawa tim. | R1-R2 |
| Uncommon | Parang Pedagang | Senjata | Bonus damage skala jumlah Warisan yang sudah disebar pemain. | R3 |
| Rare | Kalung Rempah Palsu | Pusaka | Efek sedang, skala jumlah item unik yang dibawa tim. | R4 |
| Super Rare | Neraca Sang Harga | Pusaka | Efek kuat — menguat drastis makin banyak item dibawa tim (echo skill pamungkas Sang Harga). | R5-R6 |
| Ultra Rare | Warisan Momola | Pusaka | Melemahkan Sang Harga permanen 1 fase per pemakaian. | R7 |

## 1.8 Jaladri — tema "pecahan, serpihan"

Sesuai rekomendasi World Bible v3.0 §8.5 ("kalau mekanik pecahan-diri hanya berlaku untuk Anjala Nirmala, cukup 1 set item Pusaka bertema serpihan"), katalog Jaladri didominasi kategori Pusaka:

| Tingkat | Nama | Kategori | Deskripsi | Drop Location |
|---|---|---|---|---|
| Common | Pecahan Karang | Jimat | Efek kecil; satu-satunya item non-Pusaka di katalog Jaladri. | J1-J2 |
| Uncommon | Serpihan Anjala (Fragmen Kecil) | Pusaka | Buff support ringan. | J3 |
| Rare | Serpihan Anjala (Fragmen Sedang) | Pusaka | Heal ringan 1x per battle. | J4-J5 |
| Super Rare | Serpihan Anjala (Fragmen Besar) | Pusaka | Revive otomatis 1 sekutu, 1x per battle. | J6 |
| Ultra Rare | Serpihan Anjala Nirmala (Utuh Sebagian) | Pusaka | Revive + heal tim; hanya didapat lewat progres rantai misi 30/40 serpihan. | J7 |

## 1.9 Anawil — tema "ingatan sebelum bahasa, jejak tanpa niat, komunikasi tanpa kata"

*Material fisik diambil dari daftar "Elemen Budaya" World Bible §9.11 (rumah panggung, perahu bercadik, lukisan batu, anyaman, kasuari, pari manta) — bentuk dan makna ritualnya sengaja tidak direproduksi; efek dan deskripsi berputar di tema abstrak universal, bukan simbol budaya spesifik.*

| Tingkat | Nama | Kategori | Deskripsi | Drop Location |
|---|---|---|---|---|
| Common | Jejak Kasuari | Jimat | Bekas kaki yang ditinggalkan tanpa niat meninggalkan apa pun — sedikit mengurangi kebutuhan HUD arah di zona bermekanik Tanpa Kata. | Karst Warana |
| Uncommon | Serat Anyaman Tanpa Pengrajin | Jimat | Pola yang terulang begitu sering hingga terlihat seperti dirancang, padahal tidak. Efek pasif ringan, bertambah tiap ronde berjalan. | Hutan Purba |
| Rare | Cadik yang Tahu Arahnya Sendiri | Senjata | Bagian perahu yang tetap seimbang tanpa pernah diajari kenapa. Bonus akurasi/kestabilan serangan. | Laguna Tenang |
| Super Rare | Pigmen Tangan Pertama | Pusaka | Bukan lukisan siapa pun tertentu — jejak niat paling awal manusia untuk mengatakan "aku ada di sini". Efek presence/aggro kuat. | Dinding Telapak |
| Ultra Rare | Gema yang Tak Pernah Direkam | Pusaka | Suara yang ada sebelum ada alat untuk menyimpan suara. Buff tim besar, tidak bisa dihapus lawan. | Palung Purwa |

---

# BAGIAN 2 — SEMBILAN ITEM SPESIAL REGION (Detail Statistik)

World Bible sudah menamai 9 item ini di §1.9–§9.9 tapi menandai "*(Detail: Dokumen Item — belum ditulis)*" di 8 darinya. Bagian ini mengisi utang tersebut.

| Region | Nama | Kategori | Syarat Dapat | Efek |
|---|---|---|---|---|
| Nirwasita | **Kalung Jalan Pulang** | Jimat | Selesaikan rantai misi Nenek Ranaya (pelajari seluruh lagu perjalanan tua) | Menetralkan penuh Mekanik Signature Jalan yang Menutup Kembali untuk pemakainya di seluruh Nirwasita |
| Kadewan | **Genta Makna** | Kitab/Pusaka | Selesaikan rantai misi Jero Mangku (pulihkan 1 baris doa) | Efek pasif acak dari Ritual Otomatis menjadi bisa dipilih (bukan acak) untuk pemakainya |
| Smarana | **Timbangan Terakhir** | Pusaka | Selesaikan pembongkaran Gudang Tirta (S5) | 1x transaksi Neraca Dagang tanpa kehilangan ingatan permanen dari Ensiklopedia |
| Wanasunya | **Penanda Terakhir** | Jimat | Temukan seluruh Penanda yang pernah hilang | +2 slot Penanda maksimum, permanen |
| Kalamrtu | **Aksara yang Tersisa** | Kitab | Nonaktifkan seluruh prasasti kutukan di Kalamrtu | Membaca seluruh Aksara Kutukan otomatis, tanpa mini-game, di seluruh region |
| Himagiri | **Regalia Terakhir** | Pusaka | Misi "menjadi saksi" upacara penutup Wisesa Girinatha tanpa menyerang | Status "Kelancangan nol" permanen untuk pemakai di Himagiri |
| Rajawani | **Warisan yang Tak Ternilai** | Pusaka | Sebarkan 20 atau lebih Warisan | Sang Harga kehilangan 1 fase tambahan otomatis di awal battle final |
| Jaladri | **Serpihan Terakhir** | Pusaka | Kumpulkan 30 dari 40 serpihan Anjala Nirmala | Anjala Nirmala (kalau disatukan) mendapat 1 skill tambahan unik |
| Anawil | **Telapak Keenam** | Pusaka | Selesaikan 1 interaksi penuh di zona A4-A7 tanpa dialog teks sama sekali (mode wordless dari mekanik Tanpa Kata) | Tim mendapat +10% RES terhadap Bisu/Segel permanen di seluruh Anawil; status effect ditampilkan sebagai ikon murni tanpa teks bagi pemakainya — echo tema komunikasi tanpa kata |

---

# BAGIAN 3 — ITEM UNIK KARAKTER (100 Karakter, 1 Item per Karakter)

## 3.1 Metodologi & Aturan Kondisi

**Span Duration dihapus.** Seluruh karakter (semua tier) sekarang memakai satu kondisi: **Level + Titah (misi bernama)**.

| Tier | Level Minimum |
|---|---|
| Common | Lv 20 |
| Uncommon | Lv 25 |
| Rare | Lv 35 |
| Super Rare | Lv 45 |
| Ultra Rare | Lv 50 |
| Legendary | Lv 55 |

**Dua kedalaman Titah, dibedakan berdasarkan tier:**
- **Common/Uncommon/Rare (57 karakter):** Titah 1 tahap, nama diambil langsung dari judul skill **Pamungkas** karakter tsb (mis. "Titah Perang yang Tak Datang" untuk Tandaraga). Tabel di §3.2-3.9.
- **Super Rare/Ultra Rare/Legendary (31 karakter):** Titah 2-3 tahap, ditulis penuh di §3.10 — 8 di antaranya adaptasi dari "Cara Didapat" kanon yang memang sudah ada di Guide Karakter FINAL (Nirsmara, Sang Werdi, Juragan Larung, Sang Lengang, Sang Wiranata, Wisesa Girinatha, Sang Harga, Naga Sasra), 23 sisanya ditulis baru berdasar paragraf Lore masing-masing.

**Nama & efek item — metodologi:**
- **Nama item** = [Kategori] + judul skill **Pamungkas** verbatim dari Guide Karakter FINAL.
- **Efek mekanis** diekstrak dari angka nyata di deskripsi Pamungkas masing-masing karakter — bukan angka template rata untuk semua karakter di role yang sama: kalau Pamungkas punya basis persentase (mis. damage 260%), item menambah sebagian dari basis itu sebagai bonus; kalau berbasis durasi ronde, item menambah durasinya; kalau tidak keduanya, item mengurangi cooldown. Ini menghasilkan angka yang berbeda-beda dan proporsional ke kekuatan asli skill tiap karakter.

**Pass balancing:** boost mentah (8% dari basis) dibatasi ke rentang **5-15 poin persen** — mencegah karakter berbasis sangat tinggi (mis. Naga Sasra 320%) mendapat bonus tidak proporsional dibanding karakter Legendary lain di tier sama. 18 karakter berbasis ≥200% seragam di +15, batas atas yang sama untuk semua. Untuk bonus berbasis durasi ronde: kalau basisnya cuma 1 ronde, menggandakannya jadi 2 ronde penuh (contoh: Penunggu Sunyi — "tim tidak bisa tumbang") dianggap terlalu kuat untuk sekadar bonus item, jadi diganti +8% stat sekali pakai. **Ini pass rule-based, bukan tuning tangan per karakter satu-satu** — kalau playtest nanti menunjukkan 2 karakter di tier sama masih terasa timpang, itu perlu pass kedua yang lebih manual (lihat Bagian 4).

## 3.2 — 3.9 Tabel per Region

## 3.2 Nirwasita

| # | Nama | Tier | Level | Titah (Misi) | Item Unik (Kategori) | Efek Mekanis Spesifik |
|---|---|---|---|---|---|---|
| 01 | Lampah Sinaru | Common | Lv20 | Titah Rombongan yang Tak Sampai | Jimat Rombongan yang Tak Sampai | Pamungkas 'Rombongan yang Tak Sampai' — basis 25%, +5 poin persen |
| 02 | Tandaraga | Common | Lv20 | Titah Perang yang Tak Datang | Senjata Perang yang Tak Datang | Pamungkas 'Perang yang Tak Datang' — basis 260%, +15 poin persen |
| 03 | Sanra Ranu | Common | Lv20 | Titah Yang Masih Hafal | Jimat Yang Masih Hafal | Pamungkas 'Yang Masih Hafal' — basis 45%, +5 poin persen |
| 04 | Watu Palindra | Uncommon | Lv25 | Titah Sampai Sini Saja | Pusaka Sampai Sini Saja | Pamungkas 'Sampai Sini Saja' — basis 1 ronde (terlalu pendek untuk diperpanjang aman) → diganti +8% ATK/DEF/Heal (sesuai role) sekali pakai, bukan +1 ronde |
| 05 | Lare Wengi | Uncommon | Lv25 | Titah Gudang Barang Tertinggal | Jimat Gudang Barang Tertinggal | Pamungkas 'Gudang Barang Tertinggal' — cooldown -1 penggunaan saat item dipakai |
| 06 | Kayuri Sindu | Rare | Lv35 | Titah Empat Ratus Bait | Jimat Empat Ratus Bait | Pamungkas 'Empat Ratus Bait' — cooldown -1 penggunaan saat item dipakai |
| 07 | Tobelang | Rare | Lv35 | Titah Yang Tak Bisa Digambarkan | Senjata Yang Tak Bisa Digambarkan | Pamungkas 'Yang Tak Bisa Digambarkan' — basis 90%, +7 poin persen |
| 08 | Nggarindu | Super Rare | Lv45 | Lihat §3.10 (misi penuh) | Pusaka Harga Perlindungan | Pamungkas 'Harga Perlindungan' — basis 40%, +5 poin persen |
| 09 | Nirsmara | Legendary | Lv55 | Lihat §3.10 (misi penuh) | Pusaka Dilupakan Demi Selamat | Pamungkas 'Dilupakan Demi Selamat' — basis 1 ronde (terlalu pendek untuk diperpanjang aman) → diganti +8% ATK/DEF/Heal (sesuai role) sekali pakai, bukan +1 ronde |
| 84 | Wira Senja | Ultra Rare | Lv50 | Lihat §3.10 (misi penuh) | Senjata Musuh yang Sebenarnya | Pamungkas 'Musuh yang Sebenarnya' — basis 270%, +15 poin persen |
| 85 | Saras Pertiwi | Super Rare | Lv45 | Lihat §3.10 (misi penuh) | Jimat Yang Tertanam Selamat | Pamungkas 'Yang Tertanam Selamat' — basis 40%, +5 poin persen |

## 3.3 Kadewan

| # | Nama | Tier | Level | Titah (Misi) | Item Unik (Kategori) | Efek Mekanis Spesifik |
|---|---|---|---|---|---|---|
| 10 | Juru Wangsuh | Common | Lv20 | Titah Urutan yang Diwariskan | Kitab Urutan yang Diwariskan | Pamungkas 'Urutan yang Diwariskan' — basis 40%, +5 poin persen |
| 11 | Kala Sesari | Common | Lv20 | Titah Sembilan Ratus Tahun | Kitab Sembilan Ratus Tahun | Pamungkas 'Sembilan Ratus Tahun' — basis 130%, +10 poin persen |
| 12 | Dedali Kesuma | Common | Lv20 | Titah Tidak Ada yang Pulang | Senjata Tidak Ada yang Pulang | Pamungkas 'Tidak Ada yang Pulang' — basis 250%, +15 poin persen |
| 13 | Bharwang Kesari | Uncommon | Lv25 | Titah Dua yang Satu | Pusaka Dua yang Satu | Pamungkas 'Dua yang Satu' — basis 50%, +5 poin persen |
| 14 | Rarwang Celeng | Uncommon | Lv25 | Titah Lupa Bentuk Asli | Senjata Lupa Bentuk Asli | Pamungkas 'Lupa Bentuk Asli' — basis 200%, +15 poin persen |
| 15 | Basumitra | Rare | Lv35 | Titah Seribu Petak | Pusaka Seribu Petak | Pamungkas 'Seribu Petak' — basis 35%, +5 poin persen |
| 16 | Lembujaga | Rare | Lv35 | Titah Tidak Ada yang Menanggung Semuanya | Kitab Tidak Ada yang Menanggung Semuanya | Pamungkas 'Tidak Ada yang Menanggung Semuanya' — basis 3 ronde, +1 ronde saat item dipakai |
| 17 | Rarasunyi | Super Rare | Lv45 | Lihat §3.10 (misi penuh) | Kitab Duka yang Tak Dirasakan | Pamungkas 'Duka yang Tak Dirasakan' — basis 170%, +14 poin persen |
| 18 | Randu Girang | Ultra Rare | Lv50 | Lihat §3.10 (misi penuh) | Kitab Yang Lebih Mudah Daripada Mendengarkan | Pamungkas 'Yang Lebih Mudah Daripada Mendengarkan' — basis 210%, +15 poin persen |
| 19 | Sang Werdi | Legendary | Lv55 | Lihat §3.10 (misi penuh) | Kitab Rasa yang Kembali | Pamungkas 'Rasa yang Kembali' — basis 50%, +5 poin persen |
| 86 | Kidang Belantik | Rare | Lv35 | Titah Sumber yang Diulang | Senjata Sumber yang Diulang | Pamungkas 'Sumber yang Diulang' — basis 240%, +15 poin persen |

## 3.4 Smarana

| # | Nama | Tier | Level | Titah (Misi) | Item Unik (Kategori) | Efek Mekanis Spesifik |
|---|---|---|---|---|---|---|
| 20 | Bandar Ilung | Common | Lv20 | Titah Harga Hari Ini | Jimat Harga Hari Ini | Pamungkas 'Harga Hari Ini' — cooldown -1 penggunaan saat item dipakai |
| 21 | Antuwan Melayang | Common | Lv20 | Titah Yang Tertinggal Entah Di Mana | Senjata Yang Tertinggal Entah Di Mana | Pamungkas 'Yang Tertinggal Entah Di Mana' — basis 240%, +15 poin persen |
| 22 | Watu Gambut | Common | Lv20 | Titah Enam Ratus Tahun di Bawah | Pusaka Enam Ratus Tahun di Bawah | Pamungkas 'Enam Ratus Tahun di Bawah' — basis 30%, +5 poin persen |
| 23 | Jatawira | Uncommon | Lv25 | Titah Yang Tidak Mengucap Izin | Pusaka Yang Tidak Mengucap Izin | Pamungkas 'Yang Tidak Mengucap Izin' — basis 140%, +11 poin persen |
| 24 | Wadyan Salunai | Uncommon | Lv25 | Titah Yang Hafal Semua Nama | Jimat Yang Hafal Semua Nama | Pamungkas 'Yang Hafal Semua Nama' — basis 50%, +5 poin persen |
| 25 | Tinggang Intan | Rare | Lv35 | Titah Paruh yang Terlalu Terang | Senjata Paruh yang Terlalu Terang | Pamungkas 'Paruh yang Terlalu Terang' — basis 270%, +15 poin persen |
| 26 | Sagara Buih | Super Rare | Lv45 | Lihat §3.10 (misi penuh) | Jimat Bukan Alasanmu | Pamungkas 'Bukan Alasanmu' — basis 25%, +5 poin persen |
| 27 | Datu Kalimpan | Ultra Rare | Lv50 | Lihat §3.10 (misi penuh) | Jimat Balai Lelang | Pamungkas 'Balai Lelang' — basis 40%, +5 poin persen |
| 28 | Juragan Larung | Legendary | Lv55 | Lihat §3.10 (misi penuh) | Senjata Yang Tak Lagi Dicari | Pamungkas 'Yang Tak Lagi Dicari' — basis 270%, +15 poin persen |
| 87 | Talapak Embun | Super Rare | Lv45 | Lihat §3.10 (misi penuh) | Jimat Lentera yang Tak Padam | Pamungkas 'Lentera yang Tak Padam' — basis 35%, +5 poin persen |
| 88 | Bandar Timbangan | Ultra Rare | Lv50 | Lihat §3.10 (misi penuh) | Pusaka Harga yang Ditanggung Bersama | Pamungkas 'Harga yang Ditanggung Bersama' — basis 2 ronde, +1 ronde saat item dipakai |

## 3.5 Wanasunya

| # | Nama | Tier | Level | Titah (Misi) | Item Unik (Kategori) | Efek Mekanis Spesifik |
|---|---|---|---|---|---|---|
| 29 | Puti Lengang | Common | Lv20 | Titah Yang Memilih Pergi | Jimat Yang Memilih Pergi | Pamungkas 'Yang Memilih Pergi' — basis 40%, +5 poin persen |
| 30 | Lasik Kubang | Common | Lv20 | Titah Genangan yang Tak Pernah Kering | Senjata Genangan yang Tak Pernah Kering | Pamungkas 'Genangan yang Tak Pernah Kering' — basis 230%, +15 poin persen |
| 31 | Rangkiang Batu | Common | Lv20 | Titah Cukup untuk Semua | Pusaka Cukup untuk Semua | Pamungkas 'Cukup untuk Semua' — basis 30%, +5 poin persen |
| 32 | Sindaka Rimbo | Uncommon | Lv25 | Titah Kesepakatan Lama | Senjata Kesepakatan Lama | Pamungkas 'Kesepakatan Lama' — basis 80%, +6 poin persen |
| 33 | Uhang Sunyi | Uncommon | Lv25 | Titah Berjalan Mundur Semalaman | Jimat Berjalan Mundur Semalaman | Pamungkas 'Berjalan Mundur Semalaman' — basis 2 ronde, +1 ronde saat item dipakai |
| 34 | Bundo Sarikaso | Rare | Lv35 | Titah Sembilan Meter Daftar | Jimat Sembilan Meter Daftar | Pamungkas 'Sembilan Meter Daftar' — basis 18%, +5 poin persen |
| 35 | Niniak Belang | Super Rare | Lv45 | Lihat §3.10 (misi penuh) | Pusaka Empat Ratus Tahun Bertanya | Pamungkas 'Empat Ratus Tahun Bertanya' — basis 200%, +15 poin persen |
| 36 | Sambilan Talago | Ultra Rare | Lv50 | Lihat §3.10 (misi penuh) | Jimat Air Naik | Pamungkas 'Air Naik' — basis 40%, +5 poin persen |
| 37 | Sang Lengang | Legendary | Lv55 | Lihat §3.10 (misi penuh) | Jimat Belantara Menelan | Pamungkas 'Belantara Menelan' — basis 40%, +5 poin persen |
| 89 | Suara Tanwujud | Rare | Lv35 | Titah Ke Sini, Ikuti Suaraku | Jimat Ke Sini, Ikuti Suaraku | Pamungkas 'Ke Sini, Ikuti Suaraku' — basis 35%, +5 poin persen |
| 90 | Tapak Ghaib | Rare | Lv35 | Titah Rute yang Diulang | Senjata Rute yang Diulang | Pamungkas 'Rute yang Diulang' — basis 80%, +6 poin persen |

## 3.6 Kalamrtu

| # | Nama | Tier | Level | Titah (Misi) | Item Unik (Kategori) | Efek Mekanis Spesifik |
|---|---|---|---|---|---|---|
| 38 | Antumuara | Common | Lv20 | Titah Kebiasaan, Bukan Niat | Kitab Kebiasaan, Bukan Niat | Pamungkas 'Kebiasaan, Bukan Niat' — basis 30%, +5 poin persen |
| 39 | Sidhayatri | Common | Lv20 | Titah Satu Baris yang Kabur | Kitab Satu Baris yang Kabur | Pamungkas 'Satu Baris yang Kabur' — basis 2 ronde, +1 ronde saat item dipakai |
| 40 | Kelasi Wira | Common | Lv20 | Titah Perjalanan yang Belum Selesai | Senjata Perjalanan yang Belum Selesai | Pamungkas 'Perjalanan yang Belum Selesai' — basis 100%, +8 poin persen |
| 41 | Watu Sema | Uncommon | Lv25 | Titah Pernah Ada yang Memulai | Pusaka Pernah Ada yang Memulai | Pamungkas 'Pernah Ada yang Memulai' — basis 25%, +5 poin persen |
| 42 | Dayang Rindang | Uncommon | Lv25 | Titah Versi yang Dikubur | Kitab Versi yang Dikubur | Pamungkas 'Versi yang Dikubur' — basis 40%, +5 poin persen |
| 43 | Naga Wira | Rare | Lv35 | Titah Delapan Ratus Tahun | Pusaka Delapan Ratus Tahun | Pamungkas 'Delapan Ratus Tahun' — basis 40%, +5 poin persen |
| 44 | Rahib Kalpa | Rare | Lv35 | Titah Membuktikan Ilmunya | Senjata Membuktikan Ilmunya | Pamungkas 'Membuktikan Ilmunya' — basis 300%, +15 poin persen |
| 45 | Lidah Watu | Super Rare | Lv45 | Lihat §3.10 (misi penuh) | Kitab Juru Kutuk Negara | Pamungkas 'Juru Kutuk Negara' — basis 20%, +5 poin persen |
| 46 | Sekar Kemarung | Ultra Rare | Lv50 | Lihat §3.10 (misi penuh) | Kitab Yang Tidak Pernah Berhenti Melompat | Pamungkas 'Yang Tidak Pernah Berhenti Melompat' — basis 20%, +5 poin persen |
| 47 | Sang Wiranata | Legendary | Lv55 | Lihat §3.10 (misi penuh) | Pusaka Dihapus Demi Selamat | Pamungkas 'Dihapus Demi Selamat' — basis 30%, +5 poin persen |
| 91 | Kijang Prasasti | Rare | Lv35 | Titah Angin yang Tak Membedakan | Senjata Angin yang Tak Membedakan | Pamungkas 'Angin yang Tak Membedakan' — basis 250%, +15 poin persen |
| 92 | Rahib Abu | Ultra Rare | Lv50 | Lihat §3.10 (misi penuh) | Senjata Yang Tak Bisa Ditahan Lagi | Pamungkas 'Yang Tak Bisa Ditahan Lagi' — basis 200%, +15 poin persen |

## 3.7 Himagiri

| # | Nama | Tier | Level | Titah (Misi) | Item Unik (Kategori) | Efek Mekanis Spesifik |
|---|---|---|---|---|---|---|
| 48 | Jalak Girindra | Common | Lv20 | Titah Ikuti Saja | Jimat Ikuti Saja | Pamungkas 'Ikuti Saja' — cooldown -1 penggunaan saat item dipakai |
| 49 | Pasarwengi | Common | Lv20 | Titah Menunggu Pengumuman | Jimat Menunggu Pengumuman | Pamungkas 'Menunggu Pengumuman' — basis 2 ronde, +1 ronde saat item dipakai |
| 50 | Kurawatu | Common | Lv20 | Titah Tidak Ada yang Membatalkan | Pusaka Tidak Ada yang Membatalkan | Pamungkas 'Tidak Ada yang Membatalkan' — basis 50%, +5 poin persen |
| 51 | Sabdaguna | Uncommon | Lv25 | Titah Lima Ratus Pagi | Jimat Lima Ratus Pagi | Pamungkas 'Lima Ratus Pagi' — basis 30%, +5 poin persen |
| 52 | Wanaspati Giri | Uncommon | Lv25 | Titah Tetap Menyala | Senjata Tetap Menyala | Pamungkas 'Tetap Menyala' — basis 150%, +12 poin persen |
| 53 | Ratri Kemuning | Rare | Lv35 | Titah Menari untuk Sembilan | Senjata Menari untuk Sembilan | Pamungkas 'Menari untuk Sembilan' — basis 55%, +5 poin persen |
| 54 | Gandarwa Pinus | Rare | Lv35 | Titah Hutan yang Tidak Berbunyi | Pusaka Hutan yang Tidak Berbunyi | Pamungkas 'Hutan yang Tidak Berbunyi' — basis 3 ronde, +1 ronde saat item dipakai |
| 55 | Sang Giripawana | Super Rare | Lv45 | Lihat §3.10 (misi penuh) | Jimat Menahan Waktu | Pamungkas 'Menahan Waktu' — basis 2 ronde, +1 ronde saat item dipakai |
| 56 | Wisesa Girinatha | Legendary | Lv55 | Lihat §3.10 (misi penuh) | Pusaka Upacara Penutup | Pamungkas 'Upacara Penutup' — basis 60%, +5 poin persen |
| 93 | Tabuh Senja | Ultra Rare | Lv50 | Lihat §3.10 (misi penuh) | Senjata Genta yang Tak Berhenti | Pamungkas 'Genta yang Tak Berhenti' — basis 170%, +14 poin persen |
| 94 | Sabda Tertunda | Super Rare | Lv45 | Lihat §3.10 (misi penuh) | Jimat Menunggu Kesempatan Berikutnya | Pamungkas 'Menunggu Kesempatan Berikutnya' — basis 2 ronde, +1 ronde saat item dipakai |

## 3.8 Rajawani

| # | Nama | Tier | Level | Titah (Misi) | Item Unik (Kategori) | Efek Mekanis Spesifik |
|---|---|---|---|---|---|---|
| 57 | Juru Cengkih | Common | Lv20 | Titah Yang Punya Nama | Jimat Yang Punya Nama | Pamungkas 'Yang Punya Nama' — basis 35%, +5 poin persen |
| 58 | Sawangi Pala | Common | Lv20 | Titah Ratusan Tahun Memetik | Jimat Ratusan Tahun Memetik | Pamungkas 'Ratusan Tahun Memetik' — basis 30%, +5 poin persen |
| 59 | Bala Karangkasa | Common | Lv20 | Titah Setia pada Tembok | Pusaka Setia pada Tembok | Pamungkas 'Setia pada Tembok' — basis 55%, +5 poin persen |
| 60 | Sowahi Bara | Uncommon | Lv25 | Titah Peringatan Terakhir | Jimat Peringatan Terakhir | Pamungkas 'Peringatan Terakhir' — basis 25%, +5 poin persen |
| 61 | Talaga Diam | Uncommon | Lv25 | Titah Tidak Beriak | Jimat Tidak Beriak | Pamungkas 'Tidak Beriak' — basis 3 ronde, +1 ronde saat item dipakai |
| 62 | Bikusagari | Rare | Lv35 | Titah Bahan Baku | Pusaka Bahan Baku | Pamungkas 'Bahan Baku' — basis 50%, +5 poin persen |
| 63 | Nyai Bokira | Super Rare | Lv45 | Lihat §3.10 (misi penuh) | Senjata Tujuh Ribu Catatan | Pamungkas 'Tujuh Ribu Catatan' — basis 240%, +15 poin persen |
| 64 | Datu Honggi | Ultra Rare | Lv50 | Lihat §3.10 (misi penuh) | Senjata Tiga Puluh Tahun Menebang | Pamungkas 'Tiga Puluh Tahun Menebang' — basis 260%, +15 poin persen |
| 65 | Sang Harga | Legendary | Lv55 | Lihat §3.10 (misi penuh) | Jimat Yang Tak Bisa Ditawar | Pamungkas 'Yang Tak Bisa Ditawar' — basis 40%, +5 poin persen |
| 95 | Sukma Penimbang | Rare | Lv35 | Titah Keadilan yang Tersisa | Jimat Keadilan yang Tersisa | Pamungkas 'Keadilan yang Tersisa' — basis 60%, +5 poin persen |
| 96 | Penjaga Polos | Ultra Rare | Lv50 | Lihat §3.10 (misi penuh) | Pusaka Yang Tak Bisa Dibeli | Pamungkas 'Yang Tak Bisa Dibeli' — basis 1 ronde (terlalu pendek untuk diperpanjang aman) → diganti +8% ATK/DEF/Heal (sesuai role) sekali pakai, bukan +1 ronde |

## 3.9 Jaladri

| # | Nama | Tier | Level | Titah (Misi) | Item Unik (Kategori) | Efek Mekanis Spesifik |
|---|---|---|---|---|---|---|
| 66 | Sekar Nyalu | Common | Lv20 | Titah Sejuta Ekor | Jimat Sejuta Ekor | Pamungkas 'Sejuta Ekor' — basis 40%, +5 poin persen |
| 67 | Padu Rotan | Common | Lv20 | Titah Empat Ratus Jabat Tangan | Pusaka Empat Ratus Jabat Tangan | Pamungkas 'Empat Ratus Jabat Tangan' — basis 40%, +5 poin persen |
| 68 | Abu Tembara | Common | Lv20 | Titah Satu Malam | Senjata Satu Malam | Pamungkas 'Satu Malam' — basis 190%, +15 poin persen |
| 69 | Dayan Nadha | Uncommon | Lv25 | Titah Satu Batu untuk Ibu | Senjata Satu Batu untuk Ibu | Pamungkas 'Satu Batu untuk Ibu' — basis 290%, +15 poin persen |
| 70 | Sagaranak | Uncommon | Lv25 | Titah Dinding yang Menutup | Pusaka Dinding yang Menutup | Pamungkas 'Dinding yang Menutup' — basis 60%, +5 poin persen |
| 71 | Mandarasmi | Super Rare | Lv45 | Lihat §3.10 (misi penuh) | Jimat Seribu Bagian | Pamungkas 'Seribu Bagian' — basis 30%, +5 poin persen |
| 72 | Cupaka Loba | Rare | Lv35 | Titah Bagian yang Tak Diinginkan | Jimat Bagian yang Tak Diinginkan | Pamungkas 'Bagian yang Tak Diinginkan' — basis 30%, +5 poin persen |
| 74 | Naga Sasra | Legendary | Lv55 | Lihat §3.10 (misi penuh) | Senjata Seribu Jadi Satu | Pamungkas 'Seribu Jadi Satu' — basis 320%, +15 poin persen |
| 97 | Penjaga Gelombang | Super Rare | Lv45 | Lihat §3.10 (misi penuh) | Pusaka Seribu Orang Menahan Satu Ombak | Pamungkas 'Seribu Orang Menahan Satu Ombak' — basis 30%, +5 poin persen |
| 98 | Gema Ganda | Ultra Rare | Lv50 | Lihat §3.10 (misi penuh) | Jimat Seribu Menyahut Satu | Pamungkas 'Seribu Menyahut Satu' — basis 180%, +14 poin persen |
## 3.10 Titah Lengkap — 31 Karakter Super Rare / Ultra Rare / Legendary

Untuk 8 karakter yang **sudah** punya "Cara Didapat" tertulis eksplisit di Guide Karakter FINAL, tahapan di bawah adalah adaptasi 2-3 tahap dari teks kanon tsb — bukan karangan baru. Untuk 23 sisanya (tidak ada "Cara Didapat" di dokumen sumber), tahapan ditulis baru berdasarkan paragraf Lore masing-masing, ditandai *(baru)*.

### Nirwasita

**08 · Nggarindu — Titah Harga Perlindungan** *(baru)*
1. Temukan 5 fragmen "kenangan yang dilupakan" tersembunyi di zona N5-N7 (echo: Nggarindu ditenun dari kenangan yang direlakan penduduk).
2. Serahkan seluruhnya ke altar kabut di N7 — battle melawan manifestasi kabut yang menguji apakah pemain rela "melupakan" sesuatu.
3. Selesaikan tanpa memakai item pemulih ingatan — Nggarindu bergabung.

**09 · Nirsmara — Titah Dilupakan Demi Selamat** *(adaptasi dari Cara Didapat kanon)*
1. Kumpulkan minimal 15 entri Ensiklopedia Nirwasita.
2. Temui altar kesepakatan di N7.
3. **Relakan satu entri Ensiklopedia yang sudah dikumpulkan — dihapus permanen dari save.** Ini satu-satunya cara; tidak bisa didapat lewat pertarungan.

**84 · Wira Senja — Titah Musuh yang Sebenarnya** *(baru)*
1. Selesaikan 3 battle di N6-N7 tanpa Wira Senja menyerang lebih dari 1x per battle (echo tema "enam puluh tahun berlatih tak mengajarkan apa-apa").
2. Hadapi Sang Sunyi dalam battle khusus di mana lawan tidak menyerang balik.
3. Sadari kemenangan taktis tidak berlaku di sini — selesaikan lewat kondisi non-damage (bertahan X ronde). Wira Senja bergabung.

**85 · Saras Pertiwi — Titah Yang Tertanam Selamat** *(baru)*
1. Temukan 3 "titik penguburan ingatan" di N4-N6.
2. Di tiap titik, pilih untuk **tidak** menggali (echo: bicara berarti mengeluarkan sesuatu yang seharusnya tetap terkubur).
3. Selesaikan Titah tanpa membuka satu pun titik — Saras Pertiwi muncul justru karena dihormati kesenyapannya.

### Kadewan

**17 · Rarasunyi — Titah Duka yang Tak Dirasakan** *(baru)*
1. Ikuti 1 upacara duka NPC di Kadewan tanpa dialog dilewati (skip).
2. Temukan sumber duka yang "tidak beralamat" di D5-D6 lewat clue lingkungan.
3. Selesaikan battle melawan akumulasi duka tanpa menyerang duluan.

**18 · Randu Girang — Titah Yang Lebih Mudah Daripada Mendengarkan** *(baru)*
1. Kumpulkan 3 kesaksian NPC yang menyebutnya "monster" di D3-D5.
2. Temukan 1 kesaksian yang menyebut namanya sebagai perempuan, bukan monster.
3. Pilih dialog yang memanggilnya dengan nama, bukan sebutan monster — ia bergabung, "diingat" untuk pertama kali dalam berabad-abad.

**19 · Sang Werdi — Titah Rasa yang Kembali** *(adaptasi dari Cara Didapat kanon)*
1. Selesaikan rantai Titah Kadewan reguler (persembahan ritual harian).
2. Di persembahan terakhir, jawab dengan benar **mengapa** ritual itu dilakukan — bukan sekadar mengulang gerakannya.
3. Sang Werdi kembali; seluruh Kadewan "mengingat mengapa mereka pernah percaya."

### Smarana

**26 · Sagara Buih — Titah Bukan Alasanmu** *(baru)*
1. Kumpulkan 3 versi cerita asal-usul kerajaan yang saling kontradiktif di S2-S5.
2. Tunjukkan ketiganya padanya di dasar pasar terapung (S5).
3. Pilih dialog yang mengakui ia bukan sekadar alasan berdiri kerajaan — ia bergabung, menolak dipakai lagi sebagai mitos.

**27 · Datu Kalimpan — Titah Balai Lelang** *(baru)*
1. Jual 10 item/lore di Neraca Dagang.
2. Temukan balai lelangnya tersembunyi di "titik jatuh" S6.
3. Di penawaran, tolak membeli kembali 1 ingatan yang ditawarkan — ia menghormati keputusan itu dan bergabung.

**28 · Juragan Larung — Titah Yang Tak Lagi Dicari** *(adaptasi dari Cara Didapat kanon)*
1. "Jual" cukup banyak lore terkumpul untuk membuka akses Gudang Bawah Air.
2. Sampai ke penawaran terakhir di kedalaman gudang.
3. **Tolak membeli** ingatan terakhir yang ia tawarkan — pemain menunjukkan tidak semua bisa/harus ditukar.

**87 · Talapak Embun — Titah Lentera yang Tak Padam** *(baru)*
1. Temukan 5 lentera menyala tanpa henti di Gudang Bawah Air (S5).
2. Ikuti embun/uap panasnya ke sumbernya.
3. Bagikan air dingin (item Common Smarana) padanya — ia berhenti kepanasan sejenak dan bergabung.

**88 · Bandar Timbangan — Titah Harga yang Ditanggung Bersama** *(baru)*
1. Saksikan 3 transaksi Neraca Dagang yang berujung konflik pembeli-penjual.
2. Bantu menyelesaikan 1 transaksi tanpa memihak salah satu pihak.
3. Ia mengakui pemain paham beban neraca yang ia tanggung — bergabung.

### Wanasunya

**35 · Niniak Belang — Titah Empat Ratus Tahun Bertanya** *(baru)*
1. Temukan garis batas hutan terakhir di W5-W6.
2. Dihadapkan pertanyaannya: *"apakah kau datang untuk mengambil?"*
3. Jawab jujur bahwa pemain datang untuk memulihkan, bukan mengambil (pilihan dialog spesifik) — ini jawaban jujur keempat dalam 400 tahun; ia bergabung.

**36 · Sambilan Talago — Titah Air Naik** *(baru)*
1. Temukan tepi kawah W6 tempat sembilan orang diusir.
2. Dengar (lewat item pendengar/Kitab) sembilan versi cerita malam itu yang tidak pernah bercampur.
3. Selesaikan tanpa memihak satu versi sebagai "yang benar" — danau menerima pemain sebagai pendengar netral.

**37 · Sang Lengang — Titah Belantara Menelan** *(adaptasi dari Cara Didapat kanon)*
1. Selesaikan rantai Titah Niniak Belang (di atas) hingga tuntas.
2. Buktikan datang untuk memulihkan, bukan mengambil, di sepanjang W1-W7.
3. Hutan **menampakkan diri sekali** — pemain menyaksikan, tidak bertarung. Sang Lengang bergabung sebagai saksi, bukan pemenang.

### Kalamrtu

**45 · Lidah Watu — Titah Juru Kutuk Negara** *(baru)*
1. Baca 3 prasasti perbatasan bertuliskan kutukan di K4-K6.
2. Temukan bukti kutukan itu juga menghapus sejarah Kalamrtu sendiri.
3. Konfrontasi dialog: akui bahwa tugasnya "terlalu baik" — ia bergabung, membawa alasan kerajaannya hilang dari catatan dunia.

**46 · Sekar Kemarung — Titah Yang Tidak Pernah Berhenti Melompat** *(baru)*
1. Temukan sungai tempat ia melompat mengejar peti buangan (K5).
2. Saksikan siklus "melompat menyelamatkan" terulang 3x lewat mini-game observasi.
3. Ikut melompat bersamanya di lompatan keempat — echo "tindakan menyelamatkan yang tak pernah berhenti."

**47 · Sang Wiranata — Titah Dihapus Demi Selamat** *(adaptasi dari Cara Didapat kanon)*
1. Pulihkan Aksara yang Hilang (rantai Titah Kalamrtu reguler).
2. Hadapi pilihan moral: memulihkan kejayaan kerajaan juga membangkitkan kekejamannya.
3. Pilih **menyaksikan titah penutupnya**, bukan mengalahkannya — Sang Wiranata bergabung sebagai kehendak yang memilih tetap tenggelam.

**92 · Rahib Abu — Titah Yang Tak Bisa Ditahan Lagi** *(baru)*
1. Temukan abu perapian terakhir Rahib Kalpa (K6-K7).
2. Coba "menahan" kutukan yang lolos lewat 2 mini-game penyegelan gagal (disengaja gagal, bagian dari narasi).
3. Terima bahwa ia sudah lolos dan tidak bisa ditahan — Rahib Abu bergabung sebagai kutukan yang mengambil bentuk dari abu itu.

### Himagiri

**55 · Sang Giripawana — Titah Menahan Waktu** *(baru)*
1. Temukan titik di mana pagi tidak pernah berubah jadi siang (H6).
2. Cari izin yang tak pernah datang — telusuri arsip istana untuk tahu siapa yang harus memberi izin.
3. Sadari izin itu sudah gugur bersama runtuhnya kerajaan — bebaskan dia dari permintaan 500 tahun lalu. Ia bergabung.

**56 · Wisesa Girinatha — Titah Upacara Penutup** *(adaptasi dari Cara Didapat kanon)*
1. Selesaikan seluruh urutan tata krama Himagiri tanpa satu pun Kelancangan.
2. Sampai ke fase terakhir upacara penutup.
3. Pilih **tidak menyerang** di fase terakhir — jadi saksi, bukan lawan. Wisesa Girinatha bergabung, mengizinkan kerajaannya akhirnya berduka.

**93 · Tabuh Senja — Titah Genta yang Tak Berhenti** *(baru)*
1. Dengar genta penanda senja berbunyi tepat waktu 3 hari berturut di H5.
2. Ikuti sumber bunyi ke menara kosong.
3. Beri tahu ia bahwa yang mendengarnya sekarang hanya gema dari dinding kosong — ia tetap memilih menabuh, dan bergabung karena dihormati kesetiaannya.

**94 · Sabda Tertunda — Titah Menunggu Kesempatan Berikutnya** *(baru)*
1. Temukan aula tempat kalimat pagi ke-500 tergantung tak terucap (H4).
2. Kumpulkan konteks kenapa raja tidak sanggup mendengarnya hari itu (lewat 2 dokumen arsip).
3. Ucapkan kalimat itu untuknya — kesempatan yang tak pernah datang, akhirnya datang lewat pemain.

### Rajawani

**63 · Nyai Bokira — Titah Tujuh Ribu Catatan** *(baru)*
1. Temukan arsip 7000 catatan pengiriman cengkeh di R4-R5.
2. Cari 1 dari 100 surat kenegaraan atas namanya yang tersimpan (ternyata tidak ada yang tersimpan).
3. Bantu ia "menagih" — selesaikan 1 misi penagihan simbolis — ia bergabung.

**64 · Datu Honggi — Titah Tiga Puluh Tahun Menebang** *(baru)*
1. Temukan kebun-kebun yang pernah ia tebang (R4-R6).
2. Bantu ia menanam kembali benih yang ia kumpulkan (mini-game penanaman).
3. Akui bersama bahwa itu tidak akan cukup — ia bergabung meski tahu penebusannya tidak sempurna.

**65 · Sang Harga — Titah Yang Tak Bisa Ditawar** *(adaptasi dari Cara Didapat kanon)*
1. Kumpulkan **Warisan** — syair, aturan adat, nama penduduk tenggelam — yang tidak bisa diperdagangkan.
2. Setiap Warisan yang dikumpulkan melemahkan Sang Harga secara permanen (progres tercatat, bukan sekali battle).
3. Hadapkan ia pada sesuatu yang benar-benar tidak berharga — ia memudar dan bergabung.

**96 · Penjaga Polos — Titah Yang Tak Bisa Dibeli** *(baru)*
1. Temukan gerbang terluar pelabuhan yang tak pernah diperindah (R6-R7).
2. Tawarkan padanya barang paling mewah yang dimiliki pemain (dialog, bukan transaksi nyata).
3. Ia menolak — kesederhanaannya terbukti kekuatan, bukan kekurangan. Bergabung.

### Jaladri

**71 · Mandarasmi — Titah Seribu Bagian** *(baru)*
1. Temukan 5 dari "seribu bagian" dirinya tersebar di J4-J6.
2. Simulasikan pilihan 5 kerajaan yang meminangnya lewat dialog cabang.
3. Pilih opsi keenam bersamanya — membagi diri alih-alih memilih satu — echo keputusan strategisnya sendiri.

**74 · Naga Sasra — Titah Seribu Jadi Satu** *(adaptasi dari Cara Didapat kanon)*
1. Kumpulkan seluruh Serpihan Diri (rantai Titah Jaladri, terhubung ke progres Anjala Nirmala/"Serpihan Terakhir").
2. Hadapi pilihan: menyatukan sang putri demi kekuatan, atau membiarkan ia tetap "banyak" demi kedamaian samudra.
3. Pilih membiarkannya tetap banyak — Naga Sasra, sebagai serpihan yang menolak mengecil, memilih pemain sebagai balasan.

**97 · Penjaga Gelombang — Titah Seribu Orang Menahan Satu Ombak** *(baru)*
1. Bantu penjaga pantai menahan 3 gelombang simbolis berturut (mini-game timing).
2. Saksikan ia tetap berdiri meski tahu satu orang tak bisa menahan laut.
3. Berdiri bersamanya di gelombang keempat — bergabung sebagai bagian dari "seribu orang" itu.

**98 · Gema Ganda — Titah Seribu Menyahut Satu** *(baru)*
1. Teriakkan 1 nama ke laut di J7 (interaksi lingkungan).
2. Dengar pantulannya bersahutan, masing-masing yakin dirinya asli.
3. Terima seluruh pantulan tanpa memilih mana yang "asli" — Gema Ganda bergabung sebagai kumpulan, bukan satu suara.

## 3.11 Anjala Nirmala (#73, Jaladri) — Konfirmasi Opsi (a)

Sesuai instruksi, item unik individual untuk Anjala Nirmala **dihapus** dari tabel §3.9. Rujukan itemnya sekarang tunggal: Item Spesial region **"Serpihan Terakhir"** (Bagian 2), yang syaratnya (kumpulkan 30/40 serpihan) memang secara naratif adalah dirinya sendiri. Tidak ada baris terpisah untuknya di tabel karakter.

## 3.12 Anawil (11 karakter)

**Catatan khusus #83 Gema Purwa:** Pasif-nya sendiri ("Tidak Pernah Tersimpan") menyatakan ia **tidak bisa diberi perlengkapan sama sekali**. Item unik untuknya karena itu **bukan gear yang dipakaikan ke dia** — melainkan Pusaka kunci yang tersimpan di inventaris akun sebagai penanda penyelesaian, tidak pernah di-equip.

**Catatan khusus #99 & #100:** kedua karakter ini sengaja tidak punya judul skill bertampilan teks (`[tanpa nama tampil]`) sebagai bagian dari mekanik Tanpa Kata. Nama item mereka mengikuti prinsip yang sama — tidak diberi judul tekstual, direpresentasikan lewat deskripsi visual sesuai catatan asli di Guide Karakter.

| # | Nama | Tier | Level | Titah (Misi) | Item Unik (Kategori) | Efek Mekanis Spesifik |
|---|---|---|---|---|---|---|
| 75 | Kaswari Tanahwil | Common | Lv20 | Titah Yang Ditinggalkan Tanpa Niat (1 tahap: tanam ulang benih tersembunyi di Hutan Purba tanpa dialog bantuan) | Pusaka Yang Ditinggalkan Tanpa Niat | Basis perisai 20% HP Kaswari → +5 poin persen saat item dipakai |
| 76 | Tapak Nirbahasa | Common | Lv20 | Titah Kalimat Pertama (1 tahap: sentuh replika jejak tangan di Karst Warana tanpa membaca petunjuk teks) | Jimat Kalimat Pertama | Basis revive 35% HP → +5 poin persen saat item dipakai |
| 77 | Karang Wayahan | Uncommon | Lv25 | Titah Tanpa Perancang (1 tahap: amati formasi karang di Laguna Tenang 1 siklus penuh tanpa dialog) | Pusaka Tanpa Perancang | Basis −45% damage diterima tim → +5 poin persen saat item dipakai |
| 78 | Pari Lampur | Uncommon | Lv25 | Titah Migrasi Tanpa Peta (1 tahap: ikuti jalur migrasi tanpa HUD arah, Laguna Tenang–Dinding Telapak) | Jimat Migrasi Tanpa Peta | Tidak ada basis %/ronde jelas → cooldown Pamungkas −1 penggunaan |
| 79 | Sampara Wene | Uncommon | Lv25 | Titah Celah Antara Dua Waktu (1 tahap: berada di titik tepat saat transisi fajar, jendela sempit tanpa notifikasi teks) | Senjata Celah Antara Dua Waktu | Basis lockout 2 ronde (downside) → berkurang jadi 1 ronde saat item dipakai (mengurangi kerugian, bukan basis buff) |
| 80 | Wai Cendra | Rare | Lv35 | Titah Yang Tidak Pernah Diajarkan (1 tahap: tiru gerakan tari berulang di Dinding Telapak tanpa tutorial teks) | Senjata Yang Tidak Pernah Diajarkan | +1 hit dasar tambahan pada Pamungkas, tanpa syarat jumlah sekutu Beast |
| 81 | Nin Waiam | Rare | Lv35 | Titah Tanpa Berniat Memiliki (1 tahap: rawat makhluk asing di Palung Purwa tanpa info jenisnya sampai sembuh) | Jimat Tanpa Berniat Memiliki | Perisai dari kelebihan heal +10% lebih besar dari basis |
| 82 | Kalana Sauyan ⭐ | Super Rare | Lv45 | Titah Empat Puluh Tahun Tanpa Kata (3 tahap, lihat di bawah) | Senjata Empat Puluh Tahun Tanpa Kata | +1 serangan Dasar gratis tambahan (total 2 serangan gratis untuk tim) |
| 83 | Gema Purwa 👑 | Legendary | Lv55 | Titah Gema yang Menunggu Diketuk (3 tahap, lihat di bawah) | Pusaka Yang Tersisa Ketika Semua Gagal *(kunci akun, bukan gear — lihat catatan di atas)* | Batas pemakaian Pamungkas per run +1 (dari sekali jadi dua kali) |
| 99 | Penunggu Sunyi | Ultra Rare | Lv50 | Titah tanpa judul teks (3 tahap, lihat di bawah) | Pusaka reward — nama bervariasi per ending, lihat §3.13 | Basis tidak-bisa-tumbang 1 ronde → diganti +8% DEF tim sekali pakai, bukan +1 ronde |
| 100 | Tanpa Rupa | Super Rare | Lv45 | Titah tanpa judul teks (3 tahap, lihat di bawah) | Jimat reward — nama bervariasi per ending, lihat §3.13 | Basis −30% ACC lawan → +5 poin persen |

### Titah Lengkap — 4 Karakter Tier Tinggi Anawil

**82 · Kalana Sauyan — Titah Empat Puluh Tahun Tanpa Kata**
1. Ikuti NPC pemimpin di Dinding Telapak selama misi yang dipaksa masuk mode tanpa teks (echo mekanik Tanpa Kata, dijalankan lebih awal dari zona A4 seharusnya, sebagai pengenalan).
2. Tunjukkan arah lewat gestur pemain sendiri (mini-game gestur, bukan pilihan dialog) ke 3 titik berurutan.
3. Berdiri di posisi benar tanpa diberi tahu lewat teks apa pun, hanya isyarat visual — Kalana Sauyan mengenali "yang paham tanpa kata" dan bergabung.

**83 · Gema Purwa — Titah Gema yang Menunggu Diketuk**
1. Kumpulkan seluruh entri Ensiklopedia dari **8 region lain** (Nirwasita-Jaladri) — bukan Anawil. Ini side-objective lintas-region, bukan bagian dari climax cerita utama.
2. Dari situ, temukan 1 lokasi **tersembunyi dan opsional** di Karst Warana (zona pembuka Anawil, bukan zona penutup) — sebuah ceruk kecil yang tidak disebut di misi utama mana pun, ditandai lewat clue lingkungan (bukan quest marker).
3. Di ceruk itu, alami encounter singkat non-lethal (bukan battle, bukan fase akhir cerita) — cukup 1 giliran "diam bersama", tidak menyerang. Gema Purwa bergabung di sini, sebagai pertemuan sampingan yang bisa terjadi **kapan saja setelah zona Anawil dibuka**, sepenuhnya independen dari 3 ending mana pun yang nanti dipilih pemain.

*Kenapa direvisi:* versi sebelumnya menempatkan recruitment di Telapak Pertama (zona penutup) dengan kondisi yang identik dengan salah satu dari 3 ending global (World Bible §9.10). Itu berisiko bikin 1 Titah karakter tanpa sengaja memicu atau terkunci bareng flow ending. Versi ini memindahkan seluruh recruitment ke lokasi & timing yang terpisah dari climax, supaya pemain bisa dapat Gema Purwa lepas dari ending mana yang akhirnya mereka pilih.

**99 · Penunggu Sunyi — Titah (tanpa judul teks)**
1. Lindungi 1 NPC tanpa nama di Palung Purwa dari 3 gelombang serangan tanpa dialog bantuan apa pun.
2. Bertahan sampai ambang HP tertentu tanpa ada sekutu yang tumbang.
3. "Sesuatu yang berdiri di belakangnya selamat" — ia bergabung tanpa memperkenalkan diri; bahkan notifikasi bergabungnya di UI disarankan tanpa teks nama, hanya ikon.

**100 · Tanpa Rupa — Titah (tanpa judul teks)**
1. Ikuti jejak kaki yang berubah dari 2 jadi 4 lalu kembali ke 2 di Pulau Ketujuh — mini-game observasi murni tanpa teks penjelas.
2. Saat dihadapkan pilihan biner "ia manusia / ia bukan-manusia", pilih untuk tidak memilih (opsi diam, muncul otomatis kalau pemain tidak menekan tombol dalam batas waktu).
3. Ia bergabung karena pemain tidak memaksakan kategori/batas padanya.

## 3.13 Item #99 & #100 sebagai Reward — Nama Bervariasi per Ending

Kedua item ini diperlakukan sebagai **reward**, bukan sekadar gear bertema "tanpa nama" seperti skill tempur mereka (skill tempur tetap `[tanpa nama tampil]` — itu prinsip terpisah dan tidak berubah). Nama item reward mengambil tujuan besar game (memulihkan/mengingat perjanjian dunia) dan mencerminkan salah satu dari 3 ending yang tercatat di World Bible §9.10 (Kabut Yang Kembali / Yang Mengingat / Laras) — nama final ditentukan oleh ending yang dicapai pemain saat item diberikan, disimpan di save file sebagai varian teks, bukan 3 item terpisah.

**99 · Penunggu Sunyi** (basis makna: penjaga tanpa nama yang berdiri di antara bahaya dan yang lemah, sejak sebelum ada kata untuk "menjaga")

| Ending Dicapai | Nama Item |
|---|---|
| Kabut Yang Kembali | **Pusaka Penjaga yang Membiarkan Kabut Kembali** |
| Yang Mengingat | **Pusaka Penjaga yang Akhirnya Diingat** |
| Laras | **Pusaka Penjaga yang Menemukan Laras** |

**100 · Tanpa Rupa** (basis makna: berjalan di antara kategori tanpa perlu memilih, sejak sebelum ada batas jelas manusia/bukan-manusia)

| Ending Dicapai | Nama Item |
|---|---|
| Kabut Yang Kembali | **Pusaka Tanpa Batas yang Menerima Kabut** |
| Yang Mengingat | **Pusaka Tanpa Batas yang Diingat Tanpa Rupa** |
| Laras | **Pusaka Tanpa Batas yang Menemukan Laras** |

**Catatan jujur:** saya hanya tahu 3 nama ending ini dari satu baris di World Bible §9.10 (yang merujuk ke GDD §5.5 untuk detail) — saya tidak tahu isi/nuansa tiap ending karena GDD sengaja tidak saya rujuk. Nama di atas dibuat dari judul ending saja, bukan dari isi cerita tiap ending. Kalau nuansa 3 ending itu ternyata jauh berbeda dari yang tersirat dari judulnya, nama-nama ini perlu direvisi oleh yang pegang detail GDD.

# BAGIAN 4 — TINDAK LANJUT UNTUK MANUSIA

Bukan lagi pertanyaan desain terbuka — ini tugas administratif/validasi yang tersisa sebelum dokumen ini bisa dipakai penuh di produksi:

1. **Salin catatan konsultan Anawil (Arief, 08-08-2026, "Misi dan Karakter Anawil") ke World Bible §9.0 sendiri.** Dokumen Item bukan tempat penyimpanan permanen untuk prasyarat produksi — World Bible adalah sumbernya.
2. **Pass balancing di Bagian 3 masih rule-based** (cap 5-15 poin persen, bukan tuning tangan per karakter). Kalau playtest menunjukkan 2 karakter di tier sama terasa timpang, itu perlu pass kedua yang lebih manual.
3. **UI untuk item tanpa nama teks (#99, #100 — skill tempur, bukan item reward)** — pastikan tampilan battle-nya tidak terlihat seperti bug (mis. ikon khusus, bukan field kosong).
4. **Nama reward per-ending di §3.13** — dibuat hanya dari judul 3 ending (Kabut Yang Kembali/Yang Mengingat/Laras) tanpa tahu isi ceritanya (GDD sengaja tidak dirujuk untuk dokumen ini). Perlu dicek oleh yang pegang detail GDD supaya nuansanya tidak salah.
5. **23 dari 31 Titah tier tinggi di §3.10** ditulis baru dari paragraf Lore (bukan dari "Cara Didapat" kanon yang sudah ada) — draf pertama, belum divalidasi lewat implementasi teknis nyata.

---

*Dokumen Item — v1.0 Konsolidasi Final · September 2026*
*Status: Seluruh 9 region, 100 karakter, 9 Item Spesial punya konten lengkap. 1 pass balancing sistematis sudah diterapkan (bukan playtest). 5 item tindak lanjut di atas adalah langkah tersisa sebelum dokumen ini siap dipakai penuh di produksi.*
