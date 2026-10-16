# Produksi 0.5.1 — empat perbaikan P1 Nirwasita

Tanggal: 21 September 2026. Produksi dan QA, mengikuti prioritas review region yang disetujui pengguna.

## Perbaikan

1. **Gate Adi pada M06.** Satu jawaban dialog yang sudah tersimpan menandai S03 telah dimulai. Selama resolusi belum dipilih/diselesaikan, UI Nirsmara mengarahkan pemain untuk melanjutkan Adi. Aturan domain juga menolak memulai maupun menyelesaikan M06, tanpa mutasi reward. Melewatkan seluruh dialog tetap sah; resolusi lama tetap dipertahankan. Save tamat dari versi sebelumnya tidak dibatalkan secara retrospektif.
2. **Bantuan tetua.** Kegagalan urutan disimpan pada counter khusus, tidak bergantung counter puzzle global. Setelah tiga kesalahan, tetua memberi fragmen tepat sekali. Sukses normal tetap tersedia. Perubahan disimpan atomik; reload setelah kegagalan pertama/kedua melanjutkan hitungan. Pemberian fragmen ketiga tetap menyelesaikan song stage4 sesuai alur preview yang ada.
3. **Identitas encounter.** Bayang Penjaga: Ghost/Apah; Kabut Bersuara: Spirit/Akasa; Penjaga Menara: Spirit/Akasa, sesuai World Bible §1.8.
4. **Segel Menara.** Reduksi damage setiap lapis menjadi33%, sehingga tiga lapis mengurangi99%, dua66%, satu33%. Floor damage dan syarat semua segel terbuka tetap berlaku. Sesuai NR-M05, bukan28% baseline sebelumnya.

Referensi: World Bible §1.8, Quest Script R1 NR-M05 dan titik kritis NR-S03 sebelum M06. Dokumen sumber asli tidak diubah.

## Verifikasi

- 60/60 tes domain PASS, termasuk blok entry/completion Adi pada empat tahap parsial, tanpa reward/mutasi; bantuan tetua normal/gagal/reload/idempoten; validasi counter; identitas encounter dan damage aktual pada 0–3 segel.
- Build0.5.1 PASS; `git diff --check` tanpa whitespace error.
- Browser target P1 PASS: dua kegagalan tetua → reload → gagal ketiga → reward; dialog Adi parsial → boss diblokir → selesaikan FORCED_PAST → boss dapat dimulai. Bukti `qa/p1-051.json` dengan hash HTML.
- Pemeriksaan ini tidak mengubah mekanik idle battle atau keseluruhan puzzle M04/M05. Itu pekerjaan berikutnya, bukan bagian yang diklaim selesai.

## Gate dan kelanjutan

Empat temuan P1 dari review region telah diimplementasikan dan diverifikasi pada cakupan di atas. G3/G4 increment dapat ditutup setelah penerimaan walkthrough utama. G2 penuh, M1 penuh dan launch masih terbuka. Berikutnya: kontrak idle battle M01/M02 serta navigasi/puzzle Adi M04, lalu kelengkapan narasi/vendor M05. Animasi dan aset final tetap dijadwalkan pada tahap Unity/Blender.

## Penerimaan final

Walkthrough permainan baru NR-M01–M06, save/reload, dan pembatalan pilihan permanen Saras PASS. Uji P1 dan main route memakai hash HTML yang sama: `0cbf1c89230714187650752f0960245e2dbe994d049923b476b2da2ec2fc8dd9`. Kedua file distribusi identik. Bukti: `qa/playthrough-051.json`, `qa/production-summary-051.json`. G3/G4 untuk increment ini lulus; kelengkapan region tetap belum ditutup.
