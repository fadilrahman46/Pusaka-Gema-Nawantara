# Produksi 0.9 — rekrutmen dan lima Titah item

22 September 2026. Pengguna meminta penyelesaian problem 3 dan 4 pada urutan PROGRESSION_BASELINE_PROPOSAL: tiga challenge rekrutmen dan lima Titah item sederhana. Fase utama: Production; verifikasi: Testing & QA.

## Cara bermain

Selesaikan M05, lalu temui penanda **Rekrutmen & Titah** di jalur Kuta Wisata (x0, z−160), atau buka **Jurnal → Rekrutmen & Titah**. Detail tantangan menampilkan syarat, tujuan dan reward. Tantangan ini diberi label **uji desain sementara**; tidak menambah ID quest kanon.

| Karakter | Syarat rekrutmen dalam battle |
|---|---|
| Sanra Ranu | Sebut Namanya benar-benar memulihkan sekutu terluka, lalu menang |
| Watu Palindra | Menarik Batas mengalihkan serangan dari dua sekutu belakang selama tiga ronde; kedua sekutu harus hidup |
| Tobelang | Tak Terjelaskan dipakai pada sasaran yang belum pernah diserang Tobelang, lalu menang |

Rekrutmen memakai party pinjaman Lv20 tanpa equipment. Sanra/Tobelang bersama Pengelana; Watu bersama Pengelana, Lampah dan Tandaraga. Ini tidak mengubah party/progression milik pemain. Karakter direkrut Lv1, masuk slot aktif hanya jika tersedia; party penuh tetap utuh. Pertemuan ulang karakter yang sudah dimiliki tidak memberi salinan/reward tambahan.

Titah menggunakan pemilik item bersama maksimal tiga anggota party aktif lainnya; Pengelana ditambahkan bila pemilik sendirian. Level dan equipment milik pemain berlaku. Tidak ada XP, Kepeng atau Serpihan Sukma dari tantangan ini.

## Lima item dari Dokumen Item §3.2

| Pemilik / level | Titah dan item | Tujuan tambahan | Efek item |
|---|---|---|---|
| Lampah / 20 | Titah Rombongan yang Tak Sampai → Jimat Rombongan yang Tak Sampai | Terapkan Bingung melalui Pamungkas lalu menang | Peluang Bingung 25% → 30% |
| Tandaraga / 20 | Titah Perang yang Tak Datang → Senjata Perang yang Tak Datang | Pamungkas sebelum serangan pertama Tandaraga, lalu menang | Basis damage 260% → 275%; bonus serangan pertama tetap berlaku |
| Sanra / 20 | Titah Yang Masih Hafal → Jimat Yang Masih Hafal | Pamungkas memulihkan sekutu terluka lalu menang | Heal sekutu hidup 45% → 50%; revive tetap 25% |
| Watu / 25 | Titah Sampai Sini Saja → Pusaka Sampai Sini Saja | Pamungkas menahan serangan ke sekutu lalu menang | Pamungkas pertama memberi DEF tim +8% sampai akhir battle; tidak bertumpuk |
| Tobelang / 35 | Titah Yang Tak Bisa Digambarkan → Senjata Yang Tak Bisa Digambarkan | Gunakan Pamungkas lalu menang | Setiap hit 90% → 97% |

Nama, kategori, minimum level dan besar bonus berasal dari tabel sumber. **ASSUMPTION:** isi challenge, encounter Bayang Ujian (HP2200/ATK350/DEF250) dan party pinjaman adalah desain preview. Untuk Watu, pemilihan DEF sesuai role serta persistensi sampai akhir battle adalah interpretasi baseline atas ketentuan stat +8% sekali pakai. Durasi kebal tidak diperpanjang. Bonus permanen DEF dihitung aditif dari basis: `1 + 0.08 item Watu + 0.25 Titis + 0.20 × stack Nggarindu`. Semua direset pada battle baru.

## Transaksi dan save

- Ownership, minimum level, M05 dan completion diperiksa pada awal serta sebelum commit reward.
- Menang tanpa memenuhi tujuan, kalah, atau keluar tidak memberi reward. Retry memakai battle baru dengan progres tantangan nol.
- Completion memakai flag ekstensi terpisah `ext_challenge_*_complete`. Reward dan flag disimpan bersama melalui candidate commit. Save gagal tidak mengubah state aktif; layar hasil menyediakan **Simpan hasil** untuk mencoba kembali.
- Item hanya dapat dipasang oleh pemilik pada kategori yang benar, setelah level dan completion terpenuhi. Memiliki nama item saja tidak melewati Titah.
- Schema tetap v2. Save lama tanpa flag ekstensi tetap berlaku; tidak ada rekrutmen/item retrospektif. Tidak ada perubahan terhadap pilihan permanen Adi, Saras atau Nggarindu.

## Verifikasi dan gate

- 77/77 tes domain PASS (`qa/domain-09.tap`), mencakup delapan challenge melalui aksi combat, gate level/ownership/M05, full party, reward idempoten, retry/reset, save lama, kegagalan storage, semua bonus item dan gabungan Pusaka Watu/Titis.
- Browser delapan challenge PASS: akses penanda dunia dan jurnal, gate M05, flee, menang tanpa syarat, retry, full party, tiga rekrutmen, lima Titah, equip seluruh item, completion dan equipment setelah reload.
- Fixture browser diimpor melalui UI: chapter5 untuk akses challenge; level minimum lima pemilik diatur lewat fixture berikutnya. Rekrutmen dan completion tidak diberikan melalui debug hook. Ini memverifikasi jalur challenge, bukan durasi grind leveling.
- Screenshot hub 960×720 dan daftar selesai 640×640 diperiksa: teks, tombol, fokus dan penutup modal terbaca.
- Build dan walkthrough M01–M06 PASS pada hash yang sama dengan browser challenge: reward ekonomi 13 Serpihan, save/reload dan pembatalan pilihan permanen tetap benar.
- Hasil final dan hash build dicatat dalam `qa/production-summary-09.json`. Bukti browser: `qa/challenges-09.json`; walkthrough utama: `qa/playthrough-09.json`.

G3/G4 untuk increment ini, bukan sertifikasi seluruh region. Problem 3 dan 4 selesai sesuai cakupan lima Titah dalam proposal. **Titah item Nirsmara** tetap tahap berikutnya: membutuhkan 15 entri bermakna dan pengorbanan khusus item; C02 rekrutmen Nirsmara melalui lagu tetap berlaku. Sloka/Mandala, tuning progression, presentasi M04, QA region penuh dan gate launch belum ditutup. Animasi/desain 3D menyusul melalui Unity/Blender.
