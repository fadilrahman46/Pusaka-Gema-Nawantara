# Produksi 0.7 — M05 dan percabangan M04

Tanggal:21 September2026. Production/QA. Tidak menutup M1 penuh atau gate launch.

## Implementasi

- Vendor Sanra Buri mengingat **Tolak tawaran** setelah reload. Harga dasar20 menjadi30 Kepeng setelah pernah ditolak; besaran kenaikan adalah baseline karena sumber tidak menentukan angka. **Lihat nanti**/menutup modal tidak menghitung penolakan. Pembelian dan pemberian fragmen menjadi satu transaksi tersimpan, menolak saldo kurang dan pembelian ulang.
- Lagu M05: mulai stage1, satu fragmen→2, dua/tiga fragmen→3. Setelah tiga fragmen pemain kembali ke Ranaya di Danu Sanu melalui jalur/fast travel existing. Interaksi bait terakhir menetapkan stage4 dan membuka Menara. Empat nada diputar sebagai feedback; presentasi lagu/cutscene final belum dibuat.
- Stage4 lama dipertahankan untuk kompatibilitas, tanpa memaksa pemain mengulang reunifikasi yang pada versi lama otomatis. Save M05 parsial dengan stage<4 dinormalisasi menurut jumlah fragmen saat dimuat. Syarat Menara diperiksa pada domain dan UI.
- M04 memiliki cabang benar/salah pada tiap titik dengan penanda dan sambungan jalur placeholder. Memilih jalur salah mengembalikan pemain ke persimpangan terakhir dan menyimpan counter kesalahan; landmark yang sudah dicapai tidak dihapus. Kesalahan tidak mengubah reward.
- Di titik terakhir, bunyi aliran sintetis dengan stereo pan menuju sisi barat diputar berkala. Label visual tetap tersedia bila audio mati/aksesibilitas. Audio berhenti dijadwalkan saat modal, unfocus, atau di luar tahap tersebut. Ini petunjuk audio prototype, bukan rekaman ambient final atau gestur karakter final.

## Sumber dan batas

Quest Script R1 M05: vendor mengingat penolakan, fragmen paralel, kembali ke Ranaya sebelum Menara. M04: persimpangan dengan petunjuk bertingkat dan retry aman. Stage2/3 dipetakan berdasarkan jumlah fragmen sebagai implementasi urutan bebas; stage4 hanya melalui reuni pada alur baru.

Jalur rekrutmen/item, Titis Ulang dan biaya progression yang belum eksplisit telah dirinci dalam [usulan baseline](../../planning/PROGRESSION_BASELINE_PROPOSAL.md), **belum diimplementasikan** pada0.7. Pertanyaan pilihan baseline masih menunggu jawaban pengguna. Tidak ada perubahan pada Common passive, biaya Awaken preview atau reward rekrutmen existing.

## Verifikasi

64 tes domain PASS: semua enam urutan fragmen, gate Menara, reuni idempoten, harga setelah reload, saldo kurang tanpa mutasi, transaksi tunggal dan kompatibilitas stage4 lama, ditambah suite regresi sebelumnya. Build berhasil. Bukti browser dan hash final dicatat setelah penerimaan selesai.

## Catatan berikutnya

Selesaikan keputusan baseline dan implementasi dari dokumen usulan; tetap pisahkan data sumber dari angka tuning. Animasi/desain3D final memakai Unity/Blender sesuai arahan pengguna. Level design placeholder belum dianggap visual final.

## Penerimaan final

Browser target vendor/Ranaya/reload/arah salah dan walkthrough M01–M06/save/reload/pembatalan Saras PASS pada hash yang sama. Bukti: `qa/song-07.json`, `qa/playthrough-07.json`, `qa/production-summary-07.json`. SHA256: `4328d96797d34e48d0d0c212da3a133987b98bda2c13bb9cece126f7541b5fe5`. Audio baru diuji tidak error pada browser, belum validasi pendengaran pengguna. G3/G4 subset ini lulus; M1 penuh dan launch tetap terbuka.
