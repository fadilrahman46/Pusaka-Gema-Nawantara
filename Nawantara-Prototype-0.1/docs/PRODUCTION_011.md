# Produksi 0.11 — ekonomi, jurnal, dan regresi Nirwasita

23 September 2026. Fase 3 produksi dan Fase 4 QA.

ASSUMPTION: nomor 7–8 merujuk backlog setelah problem 5–6: tuning ekonomi/skill serta penyempurnaan jurnal/QA region. Dokumen sebelumnya tidak menetapkan nomor tersebut. Pertanyaan klarifikasi dikirim; pekerjaan mengikuti backlog yang tersedia.

## Masalah 7: ekonomi dan progression

Mandala sebelumnya dapat menghabiskan Kepeng terakhir sebelum transaksi wajib vendor M05. Tidak ada sumber Kepeng berulang; save tersebut terhenti. Kemenangan latihan party sekarang memberi **10 Kepeng + 1 Serpihan Sukma + XP per karakter**. Dari nol, harga vendor normal memerlukan dua kemenangan; setelah penolakan, tiga. Latihan tamu, challenge, Penjaga Mandala, kalah, kabur, dan battle belum selesai tidak memberi paket ini. Reward tetap melalui candidate save atomik.

XP latihan dihitung `max(100, 50 × level karakter)`, menggantikan level tertinggi party. Anggota Lv1 mendapat 100 XP walaupun ditemani Lv60. Ini memperbaiki lonjakan XP tanpa mengganti formula leveling yang telah diterima.

Biaya/efek Sloka 0.10 dipertahankan setelah audit keterjangkauan material: semua 11 karakter memiliki reward Sloka Misi yang cukup untuk cap spesialnya. Sloka Umum memiliki jalur waktu aktif dan Mandala; Kepeng kini terbarukan. Boss tersedia berulang setelah M05. [Audit terukur](../qa/balance-011.json) mencatat biaya tiap karakter. Contoh Lampah: total dasar+spesial maksimum membutuhkan 74 Umum; setara 74 menit aktif atau 500 Kepeng jika seluruhnya lewat Mandala (50 kemenangan latihan dari saldo nol). Kedua sumber dapat berjalan bersamaan, sehingga ini bukan prediksi durasi bermain.

Simulasi latihan saja, tanpa XP quest: Lv40 setelah 27 kemenangan dan Lv60 setelah 38. Musuh latihan belum diskalakan menurut level; karakter kuat dapat menyelesaikannya cepat. Angka ini adalah baseline preview yang transparan, bukan sertifikasi balance atau rekomendasi grind wajib. Playtest durasi, tantangan, dan kesenangan tetap diperlukan.

## Masalah 8: jurnal dan QA region

Jurnal 13 quest menambahkan lokasi dan langkah sesuai state: penanda M04, fragmen/harga vendor M05, kembali ke Ranaya, pending Adi, gudang, hafalan, ingatan Nggarindu, latihan Wira, pusara Saras. Status terkunci, selesai, terlewat, dan gagal permanen tetap dibedakan. Panduan dapat mengarahkan pemain yang kehabisan Kepeng ke latihan tanpa mengubah state quest. Tombol rekrutmen, lore, dan Titah tetap tersedia.

Uji browser memakai input UI/keyboard dan inspector read-only. Main route dimulai dari permainan baru; suite cabang memakai impor fixture melalui UI. Cakupan 13 quest pada satu hash **bukan** satu playthrough yang menyelesaikan semua cabang sekaligus. Adi WAITED dan FORCED_PAST serta Saras berhasil/gagal memang memerlukan state terpisah.

## Verifikasi terhadap rencana

| Kriteria | Bukti |
|---|---|
| Save tanpa Kepeng dapat melanjutkan M05 | Domain dan browser: tiga kemenangan nyata → reload → beli vendor 30 Kepeng |
| Tidak ada reward ganda atau XP berdasarkan companion tertinggi | Tes domain paket reward dan fixture party Lv1/Lv60 |
| Material spesial cukup untuk 11 karakter | `tests/balance-audit.mjs` |
| Jurnal mencerminkan state dan muat pada 640px | Tes domain, browser, inspeksi screenshot `qa/journal-011.png` |
| Regresi region pada HTML identik | `qa/production-summary-011.json` memeriksa hash setiap laporan |
| Keputusan sumber tidak berubah | `planning/verify-decisions.mjs`: 100 karakter, 14 keputusan, 138 quest, registry 248 evidence HP |

Hasil final: **91/91 tes domain PASS; 11 suite browser dan 1 audit balance PASS**, seluruh 12 laporan cocok dengan SHA-256 HTML `f5724ab130d41697840975dea53829f22ad06e31c32b8906bb83c767c1abfa9c`. Kedua file HTML dist identik. Jalur Saras berhasil dan gagal permanen telah lulus. Suite browser: main M01–M06, lima quest tambahan, kedua jalur Adi, Saras, delapan challenge, lore/Sloka, ekonomi/Awaken, song/navigation, save/recovery/responsiveness.

## Batas penerimaan

G3/G4 lulus untuk increment ini. Kelengkapan beat naratif/presentasi M04, penerimaan pengguna, profil hardware/performa, dan balance menyeluruh tetap terbuka. Jurnal memberi panduan mekanik; ini bukan penulisan ulang semua dialog atau pengganti naskah sumber. M1 penuh, G2 penuh, dan gate launch belum ditutup. Animasi dan desain 3D tetap menunggu Unity/Blender sesuai instruksi pengguna.
