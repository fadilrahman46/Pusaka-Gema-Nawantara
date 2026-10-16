# Produksi 0.12 — prioritas 1–4 review

24 September 2026. Fase 3 Production dan Fase 4 QA. Scope: empat prioritas pada jawaban review 0.11; termasuk isyarat M04 yang pada daftar terperinci diberi ID RV-05. Bukan penomoran problem 1–4 lama tentang Awaken/rekrutmen.

## Rencana dan kontrak sumber

| Prioritas | Acuan Markdown | Implementasi dan acceptance |
|---|---|---|
| 1 — Lare | Quest R1 NR-S01: lima barang/clue, salah memicu battle, lima percobaan tetap selesai | Petunjuk ukuran/ukiran/aroma dibandingkan dengan catatan pencari barang; nama jawaban tidak lagi disebut langsung untuk barang aktif. Uji salah → battle → lanjut → reward. |
| 2 — Kayuri | NR-S02: sepuluh bait acak, dua tone memengaruhi dialog, survival empat ronde | Sepuluh kalimat dengan kata jangkar; pilihan di-shuffle. Dua baris flavor sesuai urutan tone, tersimpan dan dapat dibaca setelah rekrut. Uji semua 16 pasangan, reload sebelum battle dan dialog sesudah quest. |
| 3 — Lagu/mural | NR-M05 segel, NR-M06 urutan lagu, NR-H01 clue visual | Menara memilih baris lagu; Nirsmara memilih satu dari empat susunan bait. Mural lima panel visual dengan motif tepi yang dapat disambungkan, urutan diacak, tanpa jawaban urut tertulis. Uji salah/retry/reward dan tampilan 640px. |
| 4 — Cerita/eksplorasi | NR-M01 intro/ekstraksi; NR-M02 sungai dua tikungan; NR-M03 penutup; NR-M04 petunjuk; NR-M06 konsekuensi | Ekstraksi memerlukan perjalanan fisik; sungai memunculkan Lampah dan dua NPC; penutup per misi serta hasil Adi; jejak/pose arah prototipe M04. Uji main route baru, reload, pending extraction dan penutup jalur Adi. |

Keputusan adaptasi yang digunakan:

- Bait pertama Ranaya berasal langsung dari NR-M02: “Sungai yang belok dua kali, di sanalah jejak tersembunyi.” Script tidak menetapkan teks lengkap bait lainnya, clue pemilik, atau semua dialog. Kalimat baru di `src/story.js` adalah **penulisan adaptasi untuk prototipe**, bukan kutipan kanon yang ditemukan di sumber.
- NR-M05 menyebut tiga pilihan tetapi menjabarkan tiga fragmen + satu distractor. Per segel digunakan tiga kandidat: satu baris benar, satu baris dari fragmen lain, satu pengalih baru. Tiga segel mencakup ketiga fragmen; salah tetap heal 330 HP (15% dari 2200), benar melepas satu lapis. Angka combat tidak diubah.
- H01 memakai ilustrasi SVG skematis, motif sambungan dan simbol panel sebagai clue visual. Mode aksesibilitas menyediakan deskripsi teks; bukan penghilangan alternatif bagi pemain yang membutuhkan bantuan. Semua panel diberi nama aksesibel.
- Teks sepuluh bait Kayuri memakai kata jangkar yang sudah tersimpan di save. Struktur `array_memorized_baits` dan dua tone tetap kompatibel; tidak memigrasikan pilihan pemain.
- Lama mendengar Ranaya tetap 3 × 4 detik sebagai pemadatan preview terdahulu. Tidak diklaim sebagai durasi final script.

## Perubahan yang dapat dimainkan

Lare memperlihatkan ciri barang dan catatan lima pencari. Pemain mencocokkan petunjuk, bukan membaca jawaban literal. Salah masih menimbulkan pertemuan dan tidak mengulang percobaan yang telah selesai.

Kayuri membaca sepuluh bait. Tombol recall menggunakan kata jangkar dan Fisher–Yates shuffle; posisi tetap selama satu percobaan agar tidak meloncat saat diklik. Dua pilihan penutup menghasilkan dua respons terurut. Kayuri tetap dapat diajak bicara setelah direkrut tanpa memberi reward lagi.

Fragmen Sanra/vendor/tetua kini memuat baris lagu yang konsisten dengan reuni Ranaya. Jurnal memiliki tombol **Lagu perjalanan**; baris yang belum dipelajari tidak ditampilkan, kecuali save lama telah mencatat lagu lengkap. Di battle pemain bisa membuka kembali lagu, lalu kembali ke pertanyaan. Nirsmara tetap memakai fallback dua keberhasilan jika state lagunya belum lengkap.

M01: intro penjaga menyebut kabut, tiga tanda V dan cahaya menara. Memilih ekstraksi, termasuk kabur dari battle tutorial, menyimpan pending; reward baru diberikan ketika pemain berinteraksi di penanda keluar (3, −35). Pending bertahan setelah reload.

M02: sungai kecil di timur memiliki dua tikungan tajam. Setelah mendengar Ranaya, pemain memeriksa jejak pada (4, −62), memunculkan Lampah dan dua pengembara. Penemuan disimpan; Lampah belum dapat dihadapi dari UI sebelum jejak ditemukan. Save lama yang belum menyelesaikan M02 dapat melanjutkan lewat penanda baru; karakter/item yang sudah diperoleh tidak dihapus.

M01–M05 mendapat dialog penutup setelah reward tersimpan. M03 menampilkan Tandaraga yang menyadari perang tidak datang melalui pemain. Penutup M06 membedakan WAITED, FORCED_PAST dan Adi yang dilewati; tidak mengklaim Padepokan sudah playable.

M04: jejak kaki bercahaya dan pose menunjuk pada persimpangan pertama; pose menghadap arah pada persimpangan kedua. Kedua proxy tidak mengambil target interaksi. Persimpangan ketiga tetap memakai petunjuk lingkungan/audio dan alternatif visual yang sudah ada. Ini isyarat navigasi fungsional dengan geometri prototipe, bukan animasi final. HUD objective kini mengikuti langkah quest aktif, termasuk ekstraksi dan penemuan sungai.

## Verifikasi

Hasil final dan SHA-256 dicatat di [ringkasan QA](../qa/production-summary-012.json). Hasil penerimaan: **98/98 tes domain dan 7/7 suite browser PASS** pada satu HTML final yang identik dengan `dist/index.html`. SHA-256: `b610cf054200e4319b8a64381ce6d51e4c7a2652d970814e793724d5e4567462`. Pemeriksaan 14 keputusan/sumber dan tautan planning juga PASS.

- `story.test.mjs`: gate penemuan sungai; pending ekstraksi/lokasi/reload; 16 pasangan tone; katalog bait; tiga pilihan segel unik; shuffle; flavor pascarekrut tanpa mutasi; tiga kesimpulan Adi.
- `story-browser.mjs`: Lare salah dan reward, Kayuri recall/reload/survival/flavor, mural retry dan lore, Menara salah/heal/benar, Nirsmara salah/benar/penutup FORCED_PAST, ekstraksi nyata dan sungai M02. Fixture disiapkan melalui impor UI; tidak dipakai sebagai bukti durasi grind.
- `playthrough.mjs`: M01–M06 dari permainan baru, termasuk penemuan sungai, seluruh segel, lagu Nirsmara, WAITED, save/reload dan pembatalan pilihan permanen.
- `expansion-browser.mjs`: lima side/hidden quest, reward, progression/equipment, reload; `navigation-browser.mjs`: idle battle dan M04; `song-browser.mjs`: vendor/reuni/retry jalur; `production-browser.mjs`: keyboard/responsif/migrasi; `lore-skills-browser.mjs`: Nirsmara item/Sloka.
- Inspeksi screenshot: Lare, mural, pilihan Menara/Nirsmara dan sungai. Instruksi Nirsmara dipendekkan setelah pemeriksaan layar 640px; build final diuji ulang.

## Batas scope dan gate

Empat prioritas review dipenuhi pada tingkat mekanik/presentasi prototipe yang dijelaskan di atas. Ini bukan klaim seluruh beat script sudah identik: contoh sisa di luar increment ialah tutorial auto-revive 30%, koreografi/salinan Kabut Bersuara, waktu/narasi final, dan transisi Kadewan nyata. Tidak ada animasi atau aset 3D final Unity/Blender yang dikerjakan.

G3/G4 dinilai per increment. G2 penuh, penerimaan M1/M2, playtest balance pengguna, profiling hardware, serta gate launch tetap terbuka. Sumber Markdown asli dan keputusan C01–C14 tidak diubah.
