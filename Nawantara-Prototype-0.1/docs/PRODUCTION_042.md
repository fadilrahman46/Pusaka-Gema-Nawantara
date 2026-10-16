# Produksi 0.4.2 — quest Adi

Tanggal: 21 September 2026. Fase utama: Production; fase pendamping: Testing & QA.

## Review pekerjaan terakhir

Patch 0.4.1 memperbaiki tiga interaksi status combat. Ketiga regresinya tetap lulus dalam suite increment ini. Pekerjaan berikutnya yang memiliki jalur eksplisit dalam sumber adalah NR-S03; rekrutmen Sanra/Watu/Tobelang belum memiliki binding jalur yang dapat langsung diimplementasikan.

## Implementasi

- Adi tersedia di Kuta Wisata setelah M04 dan sebelum akhir M06. Dua pilihan dialog tersimpan satu per satu; lapis ketiga adalah kesimpulan Adi, bukan jawaban pemain tambahan.
- Pertanyaan kedua mengikuti tone jawaban pertama. Kesimpulan ditetapkan dari kedua jawaban dan disimpan sebagai `flag_adi_dialogue_choice`.
- Konflik gerbang tersedia setelah M05. WAITED membuka persimpangan yang harus didekati melalui pergerakan dunia; pilihan salah dapat diulang tanpa penalti permanen.
- FORCED_PAST membuka adegan simbolis dengan satu aksi hit. Adi mundur dan tetap hidup. Ini adapter naratif berbasis DOM, belum animasi pertarungan satu hit dalam arena 3D.
- Jalur yang sudah dimulai tersimpan sebagai pending, dapat dilanjutkan setelah reload, dan harus selesai sebelum melawan Nirsmara. Pilihan resolusi disimpan atomik sebelum UI menyatakan selesai.
- Kedua jalur tidak memberi item, XP, atau karakter party. WAITED menyediakan flag dukungan Padepokan; lokasi Padepokan belum diimplementasikan.
- Save lama dengan resolusi Adi tetap berlaku. Save tanpa field tambahan tetap valid; data dialog baru divalidasi saat impor dan penyimpanan.

Sumber: `QUEST_SCRIPT_R1_Nirwasita.md`, NR-S03 (baris 357–393), sequencing sebelum M06 (baris 541), dan keputusan C04 yang sudah diterima.

## Asumsi dan batas adaptasi

ASSUMPTION: bila dua jawaban berbeda, hasilnya MIXED; bila sama, hasil mengikuti keduanya. Sumber menyebut mayoritas tetapi tidak menentukan aturan seri untuk dua pilihan.

ASSUMPTION: teks pertanyaan lanjutan dan kesimpulan ditulis sebagai adaptasi tone sumber; bukan kutipan naskah final. Save yang sudah melewati N6 masih dapat menjalankan dialog saat menemui Adi di gerbang agar tidak kehilangan fitur baru. Pemain tetap boleh melewatkan seluruh quest dan mendapat NEUTRAL.

Persimpangan memakai landmark batu dan pilihan arah DOM sesudah traversal 3D. Gestur Adi, audio arah, animasi benturan, dan keseluruhan puzzle M04 belum dianggap final.

## Verifikasi per fase

1. Planning/Pre-production: lingkup ditautkan ke NR-S03 dan C04; asumsi seri dan adaptasi UI dinyatakan di atas.
2. Production: state, validasi save, dialog, interaksi dunia, dan resolusi terintegrasi pada build 0.4.2.
3. QA: 49/49 tes domain PASS, termasuk sembilan kombinasi tone, syarat bab, kedua jalur, reload data, larangan reward, save lama, dan penolakan data rusak. Build PASS; pemeriksaan diff tidak menemukan whitespace error.
4. Browser: kedua jalur PASS melalui impor fixture legal dan kontrol UI/keyboard. Uji mencakup reload di tengah dialog dan pending, salah arah lalu retry, gate Nirsmara saat pending, resolusi permanen dan tanpa reward. `qa/adi-042.json` menyimpan hash build. Screenshot 640 × 640 diperiksa: teks, tombol, dan fokus terlihat jelas.
5. Deployment/LiveOps: belum dijalankan. Ini preview lokal; full M1 dan kesiapan launch belum ditutup.

## Berikutnya

Lanjutkan feedback deskripsi skill dan binding Awaken/passive non-Common dengan anchor sumber serta tes batas level40/60. Rekrutmen tiga karakter memerlukan jalur sumber atau keputusan desain eksplisit. Beat M04, Sloka/Mandala, dan gesture Anawil tetap backlog.

Penerimaan akhir: walkthrough NR-M01–M06, save/reload, dan pembatalan pilihan permanen Saras PASS pada hash yang sama dengan uji kedua jalur Adi. Bukti: `qa/playthrough-042.json` dan `qa/production-summary-042.json`. SHA256 HTML: `72763665db3d4a3c09df7b6079253bfd956eac7271ad3ec1e4ba9b049e2ebd0d`.
