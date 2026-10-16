# Review pekerjaan berjalan — 29 September 2026

Fase: Production / Testing & QA. Review ini memisahkan build terverifikasi dari source yang belum dirilis. Tidak ada perubahan runtime pada sesi review ini.

## Bukti

- `package.json` masih 0.12.0. SHA-256 `dist/Nawantara-3D.html` masih `b610cf054200e4319b8a64381ce6d51e4c7a2652d970814e793724d5e4567462`, sesuai laporan penerimaan 0.12.
- Penerimaan historis 0.12: 98 tes domain dan 7 suite browser lulus. Browser tidak dijalankan ulang dalam review ini.
- Review 29 September menjalankan ulang seluruh 98 tes domain pada source saat ini: 98 lulus, 0 gagal. Belum ada tes khusus `region-world` atau penerimaan browser fitur baru. Laporan `qa/domain-013.tap` berasal dari sesi 24 September; bukan laporan browser/build 0.13.
- Tidak ditemukan laporan produksi atau penerimaan browser 0.13. Perubahan source belum masuk HTML distribusi.

## Prioritas 5–9

| Prioritas | Sudah ditulis pada source | Belum selesai |
|---|---|---|
| 5 — UI quest/equipment (RV-06) | Prasyarat/hadiah jurnal; nama dan pagination catatan altar Nggarindu; stat unit, biaya Prana, cooldown dan alasan skill terkunci pada detail battle. | Verifikasi akurasi seluruh reward; seluruh angka efek setelah modifier; QA browser, layar sempit, pagination, keyboard dan regresi pengorbanan. |
| 6 — Balance (RV-07) | Musuh latihan baru dengan stat yang menyesuaikan party; ekonomi dan audit keterjangkauan dari increment sebelumnya tetap ada. | Simulasi baseline baru; waktu menuju Lv40/60, Awaken/Sloka/item; pengukuran durasi pertarungan; playtest kesulitan/grind pengguna dan tuning. |
| 7 — QA penerimaan (RV-08) | Suite lama tersedia; tes expansion disesuaikan untuk judul catatan altar. | Satu perjalanan baru seluruh konten kompatibel tanpa impor progres; seluruh rekrutmen/item; cabang eksklusif terpisah; reload/retry/kalah pada build baru dan bukti hash yang sama. |
| 8 — Sistem dunia (RV-09) | Jam siang/malam tersimpan, pencahayaan, frekuensi kompas malam; marker encounter opsional awal; hadiah XP/Kepeng/item; vendor bekal, ramuan dan persiapan bengkel. | Audit kesesuaian sumber/probabilitas drop; katalog dan encounter wilayah penuh; tes transaksi, gagal simpan, pemakaian/reload; desain tujuh zona masih greybox. |
| 9 — Performa/aksesibilitas (RV-10) | Mode ringan/standar dan pengurangan sebagian gerakan dekoratif; validasi opsi save. Target pengguna telah diterima. | Profil FPS/frame time/GPU/memori/loading; Chrome/Firefox/Edge; perangkat minimum nyata; context-loss; zoom, keyboard, audio mati dan cakupan reduced-motion. |

Angka siklus, harga/effect bekal dan scaling latihan merupakan baseline preview, belum hasil validasi balance. Tabel ini bukan pernyataan bahwa prioritas 5–9 selesai.

## Target perangkat pengguna

Chrome, Mozilla Firefox atau Microsoft Edge; CPU 1 GHz; RAM 512 MB–2 GB, rekomendasi 4 GB; penyimpanan sekitar 500 MB. Dicatat sebagai sasaran yang belum tersertifikasi. Versi browser, OS, GPU dan kemampuan WebGL2 belum ditetapkan. Penurunan kualitas render atau kelulusan tes logika tidak membuktikan kecukupan RAM/CPU tersebut.

## Pekerjaan terdahulu yang tetap berlaku

Build 0.12 telah memuat fondasi party/11 kit Nirwasita, leveling/equipment, ekonomi Awaken, Titis Ulang Watu, rekrutmen/Titah, item Nirsmara, Sloka/Mandala; perbaikan cerita/puzzle/navigasi prioritas 1–4 tercatat di `PRODUCTION_012.md`. Status ini tunduk pada batas laporan tiap increment, bukan sertifikasi seluruh kombinasi.

Sisa di luar paket ini: beberapa beat script (contoh auto-revive tutorial 30% dan koreografi/salinan Kabut), aset/animasi final yang ditunda ke Unity/Blender, konten R2–R9, penerimaan M1 penuh dan gate launch.

## Urutan kelanjutan

1. Audit dan tambah tes fitur source baru, khususnya transaksi bekal, jam dunia, drop, serta scaling latihan.
2. Bangun kandidat baru dan uji browser UI/gameplay/save; jangan memakai bukti browser 0.12 untuk source baru.
3. Jalankan perjalanan penerimaan dari awal dan pengukuran balance.
4. Profil tiga browser/perangkat target dan tutup temuan aksesibilitas.
5. Perbarui versi, laporan dan gate hanya berdasarkan bukti yang lulus.
