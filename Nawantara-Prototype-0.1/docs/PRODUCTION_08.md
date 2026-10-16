# Produksi 0.8 — Ekonomi Awaken dan Titis Ulang

22 September 2026. Prioritas 1 dan 2 diminta pengguna; baseline ekonomi dan pemicu Titis dari proposal diterapkan. Angka ekonomi adalah baseline tuning, bukan angka kanon dari sumber.

## Implementasi

- Serpihan Sukma merupakan saldo terpisah dari Kepeng dan koleksi naratif. Enam main quest memberi 2 masing-masing; empat side dan tiga hidden quest memberi 1 masing-masing, sekali per quest. Total sumber quest Nirwasita: 19. Latihan biasa memberi 1 per kemenangan; tamu, kalah dan keluar tidak memberi. Latihan dapat diulang tanpa batas harian.
- Awaken membutuhkan ownership, Lv40, di luar battle, dan saldo cukup. Biaya Common/Uncommon/Rare/Super Rare/Ultra Rare/Legendary: 10/15/20/25/30/50. UI menampilkan biaya, penolakan saldo kurang, konfirmasi saldo tersisa dan pembatalan. Spend dan aktivasi disimpan dalam satu candidate commit; save gagal tidak mengurangi saldo aktif.
- Save lama dimigrasikan ke saldo 0, klaim quest selesai ditandai tanpa reward retrospektif, dan Awaken lama dipertahankan tanpa tagihan. Backup pra-ekonomi disimpan sekali. Saldo negatif, pecahan, string, overflow serta klaim duplikat ditolak.
- Watu Palindra yang sudah Awaken memicu Titis Ulang saat pertama kali tumbang dalam battle: Watu tetap tumbang, DEF seluruh tim +25% dari basis sampai battle berakhir. Sekutu yang kemudian direvive tetap mendapat bonus. Kematian Watu berikutnya tidak menggandakan bonus; battle baru meresetnya.
- Bonus permanen DEF dihitung `baseDef × (1 + 0.25 jika Titis + 0.20 × stack Nggarindu)`. Shield/immunity yang mencegah tumbang tidak memicu Titis. Common tetap tanpa passive.

## Verifikasi

- Domain: 70/70 PASS, termasuk enam tier biaya, reward sekali, migrasi/backup, kegagalan save, Titis + revive Sanra + stack Nggarindu, perlindungan dan reset battle.
- Build HTML PASS. Browser transaksi PASS: saldo kurang, kemenangan latihan nyata, batal, spend tepat, reload, serta passive Watu aktif. Screenshot konfirmasi diperiksa pada 640×640.
- Walkthrough M01�M06 PASS: 13 Serpihan dari enam main dan resolusi Adi, save/reload serta pembatalan pilihan permanen. Ringkasan hash: lihat `qa/production-summary-08.json`. Bukti browser ekonomi: `qa/economy-08.json`; screenshot: `qa/economy-confirm-08.png`.
- Pengujian browser memakai fixture legal yang diimpor lewat UI untuk Watu Lv40. Ini bukan bukti jalur rekrutmen Watu sudah tersedia.

## Gate dan batas

G3/G4 hanya cakupan increment. M1 penuh dan gate launch belum ditutup. Rekrutmen Sanra/Watu/Tobelang, enam item unik belum terikat, Sloka/Mandala dan QA menyeluruh 13 quest tetap backlog. Animasi/desain 3D menunggu Unity/Blender.

Balance ekonomi belum disertifikasi melalui playtest pengguna. Quest menyediakan 19 Serpihan; Legendary membutuhkan 50, sehingga tanpa pengeluaran lain perlu 31 kemenangan latihan tambahan. Latihan level tinggi mudah difarm; ini konsekuensi baseline yang perlu dituning, bukan klaim progression sudah seimbang.
