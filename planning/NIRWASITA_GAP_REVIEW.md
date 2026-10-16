# Review kelengkapan Region 1 — Nirwasita

> Status konsolidasi 24 September 2026: [Review backlog 0.11](REVIEW_BACKLOG_011.md). Tabel baseline dan delta di bawah dipertahankan sebagai riwayat.

Tanggal: 21 September 2026. Baseline: build 0.5. Review statis terhadap kode aktual, sumber Markdown yang diizinkan, keputusan C01–C14, dan bukti QA tersimpan. Tidak menjalankan playtest baru atau mengubah gameplay dalam review ini.

## Kesimpulan

Nirwasita sudah menjadi vertical slice yang bisa ditamatkan, belum region lengkap sesuai seluruh script. Semua 13 quest memiliki jalur/adaptasi runtime (6 main, 4 side, 3 hidden), tetapi jumlah quest tersedia tidak sama dengan semua beat selesai. Sebelas kit aktif tersedia; delapan karakter dapat direkrut melalui gameplay, tiga lainnya hanya tersedia sebagai tamu latihan. Tujuh passive non-Common aktif, satu menunggu Titis Ulang.

Nama karakter #04 yang benar adalah **Watu Palindra**. Penyebutan "Watu Nala" dalam komentar/laporan terdahulu adalah kekeliruan penamaan, bukan karakter tambahan.

## P1 — perbedaan aturan yang perlu dibereskan dahulu

**Pembaruan 0.5.1:** keempat temuan di bawah sudah diperbaiki; tes domain dan browser target PASS. Tabel dipertahankan sebagai rekam temuan awal. [Laporan perbaikan](../Nawantara-Prototype-0.1/docs/PRODUCTION_051.md).

| Temuan | Bukti sumber dan implementasi | Tindak lanjut |
|---|---|---|
| Identitas beberapa encounter tidak sesuai World Bible | WB §1.8: Bayang Penjaga Ghost/Apah, Kabut Bersuara Spirit/Akasa, Penjaga Menara Spirit/Akasa. `src/combat.js` memakai tutorial Akasa, mist bertipe Ghost, tower Pertiwi. | Koreksi registry encounter dan tes tipe/elemen. Ini memengaruhi damage elemental serta bonus Wira terhadap tipe. |
| Reduksi per segel Menara berbeda | NR-M05 menyebut 33% per lapis; runtime `1 - seals × .28` menghasilkan 28% per lapis. | Selaraskan angka atau dokumentasikan keputusan override yang eksplisit; bukan sekadar tuning tanpa jejak. |
| NR-S03 yang sudah dimulai masih dapat ditinggal sebelum resolusi | Script titik kritis mewajibkan S03 selesai sebelum M06, kecuali seluruh S03 dilewati. UI Nirsmara hanya memeriksa `adi.pending`; menjawab dialog lalu menutup sebelum memilih jalur belum memblokir M06. Graph encounter juga belum memeriksa state Adi. | Tetapkan started/completed/skipped secara konsisten pada UI dan domain; tambah tes dialog parsial → boss. Ini temuan analisis kode, belum direproduksi browser pada review ini. |
| Bantuan tetua setelah gagal tiga kali belum ada | NR-M05 mengharuskan fragmen diberikan setelah tiga kegagalan. Puzzle runtime hanya mengulang dan menaikkan counter umum. | Counter lokal mini-game, fallback reward idempoten, tes gagal tiga kali dan reload. |

## P2 — kelengkapan quest dan pengalaman bermain

**Pembaruan0.6:** sela idle M01/M02, spesial slow Lampah, traversal tiga landmark dan identifikasi dua sosok M04 sudah terintegrasi. Percabangan/gesture/audio final masih terbuka. Tabel berikut adalah temuan baseline0.5; lihat [laporan0.6](../Nawantara-Prototype-0.1/docs/PRODUCTION_06.md) untuk status delta.

| Quest | Yang masih kurang / masih berupa adaptasi |
|---|---|
| M01 | Intro/foreshadowing belum setara script; tutorial landmark tiga titik belum diverifikasi keterlihatannya. Ekstraksi berupa pilihan tombol, bukan mencapai titik. Spawn tambahan akibat idle battle belum ada. |
| M02 | Pencarian sungai dua tikungan dan kemunculan Lampah bersama dua NPC belum dibangun sebagai puzzle lingkungan. Idle battle >5 detik → SPD −30% satu ronde belum ada. AI Lampah belum memakai spesial slow; enemyTurn umumnya basic attack. Sloka Misi belum diberikan. Waktu mendengar dipadatkan menjadi 12 detik sebagai baseline preview. |
| M03 | Lima ronde sabar dan reset saat menyerang sudah ada. Teks/narasi final serta penyelarasan arti "reset ronde1" versus counter saja perlu dicatat; jangan merombak kontrak ronde C08 tanpa alasan. |
| M04 | Prioritas konten terbesar: tiga persimpangan, arah pandang/jejak Adi, petunjuk suara dan pemilihan Adi asli/palsu belum ada. Saat ini urutan tiga tombol lalu battle biasa. Salah menyerang Adi asli dan retry encounter belum tersedia. HUD dimatikan sesudah puzzle menu, belum sepanjang navigasi yang diminta. Ini kekurangan gameplay, bukan hanya animasi. |
| M05 | Vendor belum mengingat penolakan/harga naik; belum kembali ke Ranaya untuk menyatukan fragmen; song stage langsung menjadi4 pada fragmen ketiga. Tetua masih memakai penanda NPC generik. Puzzle segel memakai urutan simbol generik, belum baris lagu/distractor sesuai script. |
| M06 | Fase HP66%/33%, penalti akurasi, anti-debuff berulang dan solusi lagu sudah tersedia. Penyajian pilihan bait masih adaptasi simbol. Ringkasan resolusi region serta perpindahan nyata ke Kadewan belum tersedia. |
| S01 | Mekanik lima percobaan/battle salah/reward sudah ada, tetapi UI menyebut langsung nama pemilik; penalaran dari clue belum bermakna. Perlu clue barang yang berbeda tanpa memberi jawaban literal. |
| S02 | Sepuluh bait dan dua tone tersimpan; dialog reaktif berdasarkan tone belum dipakai. Urutan pilihan puzzle dirotasi secara tetap, belum shuffle. Audio/teks bait masih placeholder. |
| S03 | Dua jalur dan persistensi sudah ada. Tutup celah dialog parsial pada P1. Satu hit masih adegan DOM; navigasi WAITED hanya satu landmark lalu pilihan arah. Dukungan NPC Padepokan merupakan integrasi tahap berikutnya, bukan harus membangun seluruh Padepokan dalam R1. |
| S04 | Lima fragmen, sacrifice, tiga fase dan penyerapan skill tersedia. Perlu balance penyerapan, validasi pemulihan setelah kalah dan copy Ensiklopedia yang lebih jelas. Penebusan SM-M07 adalah dependensi region lain; metadata LOST sudah disiapkan. Item pemulih ingatan belum tersedia sehingga larangan penggunaannya belum menjadi alur nyata. |
| H01 | Mural masih urutan ikon dengan jawaban terlihat; narasi tiga entri belum menjadi lore card lengkap. Bonus Sanra 5% masih baseline. Trigger aktual song stage4 dapat tercapai sebelum mengalahkan Menara; sumber memiliki ketegangan antara trigger ini dan catatan "sesudah M05", perlu keputusan urutan eksplisit. |
| H02 | Rantai tiga latihan dan Sang Sunyi tersedia. Variasi latihan/AI serta balance masih baseline. Trigger setelah M06 sesuai bagian utama H02; catatan dependency lama yang menyebut M04 tidak dijadikan aturan baru tanpa rekonsiliasi. |
| H03 | Pilihan tinggalkan/gali, konfirmasi permanen dan reward tersedia. Penyajian ingatan serta kemunculan Saras masih placeholder visual/naratif. |

Idle battle M01/M02 memerlukan desain input/timing yang cocok untuk turn-based: sumber menyebut pemain bergerak di luar giliran, sedangkan runtime sekarang menghentikan traversal saat combat. Jangan sekadar menghukum pemain yang sedang membaca menu; tentukan kontraknya dahulu.

## Karakter, item, progression dan UI

- **Rekrutmen belum lengkap:** Sanra Ranu, Watu Palindra dan Tobelang belum mempunyai jalur gameplay permanen. Bonus H01 untuk Sanra sudah dapat tersimpan, tetapi pemain baru belum bisa merekrutnya secara normal.
- **Enam item unik belum terikat:** Jimat Rombongan yang Tak Sampai, Senjata Perang yang Tak Datang, Jimat Yang Masih Hafal, Pusaka Sampai Sini Saja, Senjata Yang Tak Bisa Digambarkan, Pusaka Dilupakan Demi Selamat. Dokumen Item §3.2 memuat nama, level dan Titah; jalur perolehan/quest runtime belum tersedia. Lima item unik lainnya sudah terikat. Slot Kitab kosong bukan otomatis bug: katalog Nirwasita tidak menyediakan drop Kitab.
- **Awaken:** stat tersedia, tetapi biaya/perolehan Serpihan Sukma belum dibangun; aktivasi gratis hanya preview. Passive Watu/Titis Ulang belum aktif. Aturan pembulatan Saras, rotasi Tobelang, pemilihan cleanse Nirsmara dan batas Prana Wira masih asumsi terdokumentasi yang perlu playtest.
- **Skill progression:** level skill, Sloka, sumber material, biaya upgrade dan Mandala belum tersedia. Tidak sama dengan leveling karakter 1–60 yang sudah berjalan.
- **Balance:** kurva XP, XP latihan tanpa batas, angka non-HP encounter dan bonus tertentu masih baseline. Level60/Awaken dapat dicoba di R1 tetapi bukan bukti pacing region sudah tepat.
- **Jurnal:** hanya judul/status; belum tujuan langkah aktif, lokasi, counter, syarat gagal, dan ringkasan reward untuk membantu menuntaskan side quest.
- **Ensiklopedia:** roster referensi tersedia; koleksi yang dikorbankan masih sering berupa ID quest, belum halaman lore yang memberi konteks dan bobot naratif.
- **Deskripsi skill:** menggunakan teks Guide dengan catatan baseline global. Belum seluruhnya menunjukkan angka efektif setelah equipment, passive, cooldown modifikasi atau alasan skill terkunci.
- **World systems:** siang–malam (kompas dua kali lebih sering dan pergantian encounter elite N2–N4), variasi monster/penjelajahan, serta toko/vendor penuh belum tersedia. Jalur tujuh zona masih koridor prototipe, belum level design final.

## Visual yang memang ditunda

Sesuai instruksi pengguna: mesh, rig, animasi karakter, gesture, cutscene, VFX, desain lingkungan dan integrasi visual final akan dikerjakan dengan Unity/Blender. Audio/musik region juga masih perlu produksi; tidak diasumsikan otomatis selesai oleh pembuatan model 3D. Bentuk landmark dan letak persimpangan tetap perlu dirancang sekarang sebagai fungsi gameplay sebelum aset final dibuat.

## QA dan batas bukti

Build0.5 memiliki 57 tes domain serta browser Awaken/party yang lulus. Walkthrough enam main quest terakhir pada0.4.2; route lima quest tambahan pada0.4. Semua itu bukti increment masing-masing, bukan end-to-end penuh pada hash0.5. Belum ada satu matriks penerimaan final yang mencakup seluruh13 quest, kedua resolusi, gagal permanen Saras, sacrifice/retry, load lama dan semua build0.5 sekaligus. Minimum hardware, browser target lain, balance dengan pengguna dan pemeriksaan lore/budaya belum disertifikasi.

## Urutan rekomendasi

1. Tutup empat temuan P1: registry encounter, angka segel, gate Adi parsial dan fallback tetua.
2. Lengkapi kontrak idle battle serta gameplay M04/M05 memakai placeholder yang dapat dimainkan; tidak perlu menunggu aset final.
3. Tetapkan jalur rekrutmen tiga karakter dan enam Titah item; bedakan data sumber yang tersedia dari desain jalur yang harus diputuskan.
4. Lengkapi Titis Ulang, ekonomi Awaken, Sloka/Mandala dan balance region.
5. Perbaiki jurnal/Ensiklopedia, lalu satu putaran QA region pada satu hash build final.
6. Tahap Unity/Blender untuk presentasi final, diikuti QA integrasi ulang.

Jangan menyatakan persentase selesai tanpa bobot backlog yang disepakati. Status yang dapat dipertanggungjawabkan saat ini: **alur region playable; kelengkapan konten, aturan dan penerimaan region belum ditutup**.


## Delta 0.8 — 22 September 2026

Ekonomi Awaken dan Titis Ulang Watu tidak lagi backlog implementasi. Biaya per tier, reward quest/latihan, migrasi save, transaksi, trigger sekali dan interaksi revive/perlindungan/Nggarindu telah diuji. Balance ekonomi tetap membutuhkan playtest. Rekrutmen tiga karakter, enam item, Sloka/Mandala dan QA seluruh region masih terbuka.

[Laporan 0.8](../Nawantara-Prototype-0.1/docs/PRODUCTION_08.md).


## Delta 0.9 — 22 September 2026

Jalur rekrutmen Sanra/Watu/Tobelang serta lima Titah item Lampah/Tandaraga/Sanra/Watu/Tobelang selesai sebagai challenge desain sementara setelah M05. Lima efek equipment berfungsi, dengan gate level/ownership/completion dan reward sekali. Item Nirsmara masih membutuhkan konten 15 entri dan pengorbanan khusus. Sloka/Mandala, tuning dan QA region penuh belum ditutup.

[Laporan 0.9](../Nawantara-Prototype-0.1/docs/PRODUCTION_09.md).


## Delta 0.10 — 23 September 2026

Titah item Nirsmara, 27 kartu lore, Sloka/Mandala dan level skill 11 karakter selesai. Semua 11 item unik R1 kini memiliki jalur perolehan dan efek runtime; 11 karakter memiliki jalur rekrutmen. Entri permanen Nirsmara terpisah dari kehilangan NR-S04. Tuning ekonomi/skill, kualitas beat quest, jurnal langkah/counter lengkap dan QA region menyeluruh masih terbuka.

[Laporan 0.10](../Nawantara-Prototype-0.1/docs/PRODUCTION_010.md).

## Delta 0.11 — 23 September 2026

Ekonomi Kepeng terbarukan menutup buntu vendor; XP latihan memakai level per karakter. Jurnal 13 quest memuat lokasi/langkah/counter. Audit material Sloka dan regresi region dijalankan pada satu hash (main baru dan fixture cabang terpisah). 91 tes domain PASS. G3/G4 increment diverifikasi; balance pengguna, presentasi naratif, hardware, M1 penuh dan launch tetap terbuka. [Laporan](../Nawantara-Prototype-0.1/docs/PRODUCTION_011.md).

## Increment 0.12 — 24 September 2026

Clue Lare, reaksi tone Kayuri, puzzle bait/mural, ekstraksi fisik, penemuan sungai, isyarat M04 prototipe dan penutup cerita terintegrasi. Verifikasi per prioritas, batas adaptasi dan QA akhir dicatat dalam [laporan0.12](../Nawantara-Prototype-0.1/docs/PRODUCTION_012.md). G3/G4 per increment; gate penuh M1/M2 dan launch tetap terbuka.
