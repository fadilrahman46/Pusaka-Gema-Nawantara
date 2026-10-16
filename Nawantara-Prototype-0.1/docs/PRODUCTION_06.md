# Produksi 0.6 — sela kabut dan navigasi M04

Tanggal: 21 September 2026. Fase Production / QA. Sumber: Quest Script R1 M01/M02/M04, UI UX Nirwasita dan kontrak combat C08.

## Implementasi

- M01/M02 memiliki sela pergerakan setelah ronde lengkap. WASD/panah atau tombol Langkah ke samping menggerakkan posisi dunia aktual, dengan batas dua unit dari titik battle. Gerakan yang tertahan collider tidak dihitung sebagai bergerak.
- Diam lebih dari lima detik pada sela tutorial memunculkan tepat satu Bayang tambahan HP970, Ghost/Apah. Ia dimasukkan ke antrean dan visual battle; setelah itu tutorial tidak memunculkan gelombang lain.
- Pada Lampah, diam pada sela menerapkan slow30% selama satu ronde penuh menurut kontrak durasi C08. Efek slow yang sudah ada mengikuti refresh magnitude/duration C08. AI Lampah kini memakai spesial slow20%/dua ronde, dengan cooldown dua giliran sendiri; angka20% adalah baseline skill yang sebelumnya dipakai kit ally.
- Timer tidak berjalan pada pilihan aksi biasa, modal/detail skill, tab tersembunyi atau window tanpa fokus. Mode aksesibilitas meniadakan sela berwaktu. Ini **asumsi adapter turn-based** untuk frasa sumber "bergerak di luar giliran normal", bukan klaim kontrak real-time final.
- M04 mengganti urutan tombol awal dengan tiga landmark dunia: barat→timur→barat. Interaksi setiap landmark menyimpan progres atomik. Kompas benar-benar disembunyikan selama navigasi normal; mode aksesibilitas tetap mempertahankannya.
- Setelah tiga landmark, sosok asli terus bergerak kecil; sosok tiruan berhenti berkala. Salah menyerang sosok asli mencatat kesalahan tanpa membunuh Adi atau mengulang perjalanan. Sosok tiruan membuka encounter Kabut Bersuara.

## Batas yang masih terbuka

Landmark memakai geometri placeholder dan label; belum jalur bercabang dengan collision/arah salah yang lengkap. Hint masih teks/gerak prosedural sederhana, belum gesture bertingkat atau audio air terarah. Salah sasaran ditampilkan melalui feedback teks, bukan animasi benturan. Sumber narasi tetap menjadi target, sedangkan animasi/desain 3D final dijadwalkan menggunakan Unity/Blender.

Timer battle bersifat sementara per attempt dan tidak disimpan sebagai battle snapshot. Save menyimpan progres dunia/quest; reload mengikuti perilaku retry battle existing. Uji kit tamu/latihan tidak memakai sela berwaktu.

## QA

62 tes domain PASS; termasuk pause/movement/timer, satu spawn maksimum, masuk antrean, slow skill Lampah, penalti idle dan seluruh regresi sebelumnya. Build berhasil. Bukti browser dan hash penerimaan akhir ditambahkan setelah route selesai.

## Kelanjutan

Lengkapi M05: vendor mengingat penolakan, pertemuan kembali dengan Ranaya, serta konsistensi stage lagu. Lanjutkan kualitas navigasi M04 (percabangan/arah salah dan audio), jalur rekrutmen/item, Titis Ulang dan ekonomi progression. Increment ini belum menutup M1 penuh maupun gate launch.

## Penerimaan akhir

Browser target PASS: pause detail skill, timeout dengan satu spawn, traversal tiga landmark, reload di tengah jalur, salah sasaran lalu retry. Walkthrough NR-M01–M06, save/reload, dan pembatalan pilihan Saras PASS pada hash yang sama. Bukti: `qa/navigation-06.json`, `qa/playthrough-06.json`, `qa/production-summary-06.json`. SHA256 HTML: `2792efe022515cd7682bbe0d222b6176f10c7af715a264db62db46f2056055d3`. G3/G4 lulus sesuai cakupan increment; G2 penuh dan launch tetap terbuka.
