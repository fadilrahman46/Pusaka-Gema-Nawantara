# Usulan binding rekrutmen, item dan ekonomi

Status per 22 September 2026: baseline **Ekonomi Awaken dan Titis Ulang ACCEPTED / IMPLEMENTED 0.8**, sesuai instruksi pengguna untuk menyelesaikan prioritas 1 dan 2. Rekrutmen tiga karakter dan lima Titah item sederhana ACCEPTED / IMPLEMENTED 0.9 atas instruksi pengguna menyelesaikan problem 3 dan 4. Titah item Nirsmara dan Sloka/Mandala dikonfirmasi pengguna sebagai problem 5–6, IMPLEMENTED 0.10 pada 23 September 2026; balance masih memerlukan playtest. Bagian usulan di bawah menyimpan alasan desain; status implementasi terbaru ada di [PRODUCTION_011.md](../Nawantara-Prototype-0.1/docs/PRODUCTION_011.md). Pada 0.11, latihan party menambah 10 Kepeng per kemenangan dan XP memakai level tiap karakter. Biaya Sloka tetap; audit material membuktikan semua cap spesial terjangkau, sementara durasi/fun menunggu playtest.

## Rekrutmen tiga karakter

Gunakan challenge tambahan di N6 setelah M05, ditandai **uji desain sementara**. Bukan penambahan ID quest kanon NR-M/S/H.

| Karakter | Tantangan usulan | Reward |
|---|---|---|
| Sanra Ranu | Party pinjaman mengatasi encounter dengan memakai Sebut Namanya untuk memulihkan satu sekutu terluka | Sanra direkrut sekali, tanpa item unik otomatis |
| Watu Palindra | Party pinjaman melindungi dua sekutu belakang selama tiga ronde dengan Menarik Batas | Watu direkrut sekali |
| Tobelang | Gunakan Tak Terjelaskan pada sasaran yang belum pernah disentuh Tobelang, lalu selesaikan encounter | Tobelang direkrut sekali |

Uji fail/retry, keluar tanpa reward, reward idempoten, party penuh, serta save/reload wajib. Jangan mengubah reward quest sumber yang sudah ada agar rekrutmen tidak diam-diam terpasang ke quest yang tidak menyebutnya.

## Enam item belum terikat

Nama, level, kategori dan bonus diambil dari Dokumen Item §3.2. Rancangan challenge baru diperlukan untuk lima Titah sederhana: Lampah, Tandaraga, Sanra, Watu, Tobelang. Syarat wajib ownership + level sumber + completion unik. Tidak cukup membeli item untuk melewati Titah.

Untuk Nirsmara, §3.10 menyebut15 entri dan pengorbanan entri permanen, sedangkan C02 sudah menetapkan rekrutmen melalui lagu. Pertahankan C02 untuk rekrutmen; bedakan **Titah item** dari rekrutmen. Usulan: altar item setelah M06, Lv55, 15 entri unik, konfirmasi pengorbanan khusus item dan metadata kehilangan terpisah dari NR-S04. Perlu tambahan konten lore untuk menyediakan15 entri yang bermakna; jangan mengisi entri sintetis agar lolos hitungan.

## Titis Ulang Watu

Guide hanya menjelaskan bahwa Titis Ulang miliknya tidak memulihkan HP, melainkan memberi tim DEF+25% permanen. Usulan pemicu: lethal pertama Watu yang sudah Awaken, satu kali per battle; Watu tetap tumbang, tim memperoleh bonus DEF25% dari basis, tidak menggandakan buff setiap kematian berikutnya. Ini asumsi pemicu/frekuensi, bukan kutipan aturan final. Perlu verifikasi interaksi revive Sanra, shield, immunity dan buff Nggarindu.

## Ekonomi Awaken

Usulan awal: Serpihan Sukma sebagai saldo terpisah dari entri Ensiklopedia/Serpihan Diri. Biaya10/15/20/25/30/50 untuk Common/Uncommon/Rare/Super Rare/Ultra Rare/Legendary, tetap minimumLv40. Quest utama memberi2 sekali; side/hidden memberi1 sekali; latihan biasa memberi1 per kemenangan, tamu tidak memberi. Jumlah adalah baseline tuning, bukan kanon.

Migrasi: Awaken yang sudah aktif tetap aktif dan tidak ditagih; saldo lama default0, tidak mengulang reward quest. UI menampilkan biaya dan kekurangan sebelum transaksi. Spend+awaken satu commit, batal/gagal save tidak mengurangi saldo. Uji economy pace sebelum menutup gate—terutama farming latihan yang terlalu mudah saat level tinggi.

Sloka/Mandala memerlukan tahap terpisah: registry batas level skill dari Guide, drop/biaya material, rumus upgrade tiap skill, dan aturan Mandala. Jangan menyamakan bonus stat Awaken dengan upgrade skill.

## Urutan pelaksanaan setelah keputusan baseline

1. Registry ekonomi + migrasi + transaksi Awaken, lalu test penerimaan.
2. Titis Ulang dan tes seluruh interaksi kematian/revive.
3. Tiga challenge rekrutmen.
4. Lima Titah item sederhana; Titah item Nirsmara menyusul sesudah konten15 entri tersedia.
5. Sloka/Mandala dan playtest balance. M1 penuh dan gate launch tetap terbuka.
