# Review dan produksi 0.4.1 — 21 September 2026

## Keputusan fase

Produksi bertahap dapat dilanjutkan. Increment 0.4 (quest, 11 kit Nirwasita, leveling dan equipment) sudah memiliki bukti penerimaan; review ini melanjutkannya dengan perbaikan status combat. Gate M1 penuh dan launch belum ditutup. Tidak ada perluasan sumber konten di luar kategori Markdown yang diizinkan.

## Temuan dan perbaikan

| Temuan | Prioritas | Hasil |
|---|---|---|
| Spesial Lare tetap mengubah cooldown ketika Bingung ditolak oleh kekebalan atau anti-pengulangan Nirsmara | Medium | Cooldown hanya berubah setelah status berhasil diterapkan |
| Penolakan karena kebal debuff sudah mencatat status sebagai pernah diterapkan kepada Nirsmara | Medium | Pemeriksaan kekebalan dilakukan sebelum pencatatan penerapan pertama |
| Kekebalan Takut Kayuri hanya tercatat sebagai efek, belum menolak status Takut | Medium | Takut diklasifikasikan sebagai debuff, ditolak oleh kekebalan terkait dan dapat dibersihkan; label UI tersedia |

Dasar: Guide Karakter #05 spesial Lare, #06 spesial Kayuri, dan Quest Script R1 baris 284 untuk anti-pengulangan Nirsmara. Return boolean pada penerapan efek membuat konsekuensi status bergantung pada hasil penerapannya. Tidak ada perubahan format save.

## Verifikasi

- 46/46 tes domain PASS: suite 43 tes sebelumnya ditambah tiga regresi yang memeriksa penerapan/penolakan, cooldown, pencatatan pertama, masa berlaku kekebalan dan cleanse.
- `npm run build` PASS; versi paket dan layar judul 0.4.1.
- Browser Chrome headless PASS: migrasi party lama, edit empat anggota, urutan SPD, target heal/shield Saras, Prana, kontrol 640 × 640, latihan tanpa reward quest, save/reload. Hasil disalin ke `qa/party-browser-041.json`.
- Verifikasi keputusan sumber PASS: 100 karakter/rarity, anchor contoh, 248 evidence HP, 138 quest dan 14 keputusan. Ini bukan pengujian seluruh encounter runtime.
- HTML SHA256: `80942763bbfe2acc578ccae2c316f52726ee85b59fdaad72982cec7a4a3308de`.

Suite domain dijalankan dengan `node --test --test-isolation=none` untuk menghindari pembatasan subprocess sandbox. Walkthrough seluruh quest 0.4 tidak diulang pada patch ini; hasil tersebut tetap bukti historis build 0.4. Musuh Nirwasita saat ini belum menghasilkan Takut: penolakan/cleanse status diverifikasi pada kernel, bukan klaim encounter baru atau perilaku serangan Takut lengkap. Balance dan minimum hardware belum disertifikasi.

## Urutan pekerjaan berikutnya

1. Lengkapi dialog berlapis dan resolusi Adi sesuai NR-S03, dengan tes kedua cabang serta kompatibilitas save yang sudah memilih.
2. Tautkan rekrutmen Sanra/Watu/Tobelang hanya setelah jalur sumber atau keputusan desain eksplisit tersedia; uji kit tamu tidak berarti ownership.
3. Lanjutkan Awaken/passive non-Common dan Sloka/Mandala sebelum penutupan M1.

Fase 1–2: keputusan sumber tetap berlaku; kelengkapan pra-produksi masih terbuka. Fase 3: patch terintegrasi. Fase 4: cakupan patch lulus. Fase 5–6: belum dijalankan.
