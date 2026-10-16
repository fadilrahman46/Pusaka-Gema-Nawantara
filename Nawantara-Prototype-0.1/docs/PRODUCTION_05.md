# Produksi 0.5 — deskripsi skill dan Awaken

Tanggal: 21 September 2026. Production / Testing & QA.

## Hasil

- Detail skill tersedia di perkembangan karakter dan saat battle, termasuk biaya Prana dan cooldown. Teks karakter diekstrak dari Guide Karakter, bukan konten baru. Common tidak ditampilkan seolah memiliki passive.
- Awaken dapat diaktifkan untuk karakter dimiliki mulai level40 melalui menu Perkembangan & equipment. Pengelana tidak mendapat Awaken. Aktivasi sekali, di luar battle, disimpan atomik; save lama tanpa field awakened tetap valid.
- Sebanyak 22 anchor Awaken level40/60 untuk 11 karakter Nirwasita diverifikasi terhadap Markdown. Di antara anchor, gunakan normal(level) + selisih Awaken40 − normal40 sesuai C01; level60 memakai tabel persis, tanpa bonus ganda.
- Tujuh passive aktif setelah Awaken: Lare, Kayuri, Tobelang, Nggarindu, Nirsmara, Wira, dan Saras. Common Lampah/Tandaraga/Sanra tetap tanpa passive menurut C03, walaupun mendapat stat Awaken.
- Watu mendapat stat Awaken, tetapi passive secara eksplisit ditampilkan belum aktif karena trigger Titis Ulang belum terikat ke runtime. Tidak ada klaim seluruh passive selesai.

## Aturan runtime dan asumsi

Sumber utama: Guide Karakter #01–#09/#84/#85; keputusan C01/C03/C08. Tidak ada perubahan pada dokumen sumber asli.

ASSUMPTION ekonomi preview: aktivasi Awaken tidak memotong material. Guide menyebut Serpihan Sukma, tetapi biaya/pasokan belum ditentukan dalam subset sumber yang digunakan. Tombol diberi label preview. Ini bukan ekonomi rilis final.

| Passive | Perilaku runtime |
|---|---|
| Lare | Jumlah hidup ganjil: ACC +20 poin persentase dan SPD ×1,15. ACC diperbarui saat serangan; urutan giliran tetap snapshot ronde. Tidak ditumpuk berulang. |
| Kayuri | Setelah pamungkas sekutu (termasuk dirinya), sekutu hidup pulih 8% HP maks masing-masing. Kayuri tumbang tidak memicu heal. |
| Tobelang | Setiap percobaan serangan memutar resistensi Bayu→Pertiwi→Apah→Teja. Serangan pertama memakai Bayu; faktor 0,75 diterapkan sebelum floor damage akhir. Urutan sebelum hit dan pemicu per-hit adalah asumsi untuk preview. |
| Nggarindu | Kematian sekutu: DEF dirinya +20% dari basis Awaken per tumpuk, maksimum tiga. ATK seluruh tim +10% permanen dan tidak menumpuk, sesuai default C08. Tidak memicu dari kematiannya sendiri. |
| Nirsmara | Debuff yang berhasil diterapkan dicatat per dirinya; pengulangan ditolak. Awal ronde menghapus satu debuff dari satu sekutu hidup. Urutan deterministik party lalu status tertua karena sumber tidak menetapkan pemilihan. |
| Wira | Mulai dengan 1 Prana. Setiap tiga ronde penuh tanpa pamungkas memberi +1, maksimum dua pemberian per battle; pamungkas mereset hitungan ronde, bukan kuota pemberian. Cap Prana tetap5. |
| Saras | Transfer durasi tanpa rekursi. ASSUMPTION pembulatan: ceil(20% durasi), dibatasi agar target masih mendapat minimal satu ronde penuh. Status satu ronde tidak ditransfer. Status serupa pada Saras diperpanjang; jika belum ada, dicoba diterapkan dengan pemeriksaan kekebalan biasa. |

Skill aktif dan angka baseline increment sebelumnya masih berlaku; skill upgrade Sloka belum diimplementasikan. Passive Titis Ulang Watu membutuhkan kontrak trigger dan frekuensi yang jelas sebelum dapat dinyatakan selesai.

## Verifikasi

- 57/57 tes domain PASS. Delapan tes baru mencakup 22 anchor, delta level41, batas level/ownership, save/reload/penolakan data rusak, Common tanpa passive, serta tujuh passive.
- Build `npm run build` PASS.
- Browser Awaken PASS: aktivasi level40, deskripsi skill, aktivasi ulang tidak tersedia, reload, passive pada battle, detail skill tanpa konsumsi giliran. Bukti `qa/awaken-05.json`.
- Browser regresi party normal PASS: impor save, edit party, urutan SPD, heal/shield Saras, Prana, kontrol 640px dan reload.
- Screenshot `qa/awaken-05.png` diperiksa pada 640 × 640; tombol dan teks terlihat.
- Walkthrough semua quest tidak diulang pada increment ini; bukti walkthrough 0.4.2 tetap historis. Hardware minimum dan balance pengguna belum disertifikasi.

## Gate dan langkah berikutnya

Planning: tetap sesuai scope sumber. Pre-production: asumsi di atas dinyatakan, ekonomi Awaken dan Titis Ulang belum ditutup. Production: subset 0.5 terintegrasi. QA: cakupan increment lulus. Launch/LiveOps belum dijalankan; M1 penuh masih terbuka.

Lanjut kontrak Titis Ulang/biaya Awaken, kemudian Sloka/Mandala dan binding rekrutmen yang masih kosong. Animasi dan desain 3D dijadwalkan kemudian memakai Unity dan Blender sesuai instruksi pengguna. Prototipe Three.js tetap digunakan sekarang untuk validasi mekanik/UI; belum ada keputusan migrasi seluruh aplikasi ke Unity.

Hash HTML penerimaan: `c457be44d4caefbc34b25e15c7eb3a8bab6ff618ce0f5641ef63941bd37a8208`. Ringkasan bukti: `qa/production-summary-05.json`.
