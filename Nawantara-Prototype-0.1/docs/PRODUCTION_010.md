# Produksi 0.10 — Titah Nirsmara dan Sloka/Mandala

23 September 2026. Pengguna mengonfirmasi problem 5 dan 6 sebagai **Titah item Nirsmara** serta **Sloka/Mandala**. Cakupan produksi dan QA melanjutkan 0.9; animasi/aset final tetap tahap Unity/Blender.

## Titah Dilupakan Demi Selamat

Setelah M06, temui **Altar Kesepakatan** di Menara Pandu (x0, z−189), atau buka Jurnal → Titah Nirsmara. Syarat: Nirsmara dimiliki, Lv55, dan sekurangnya 15 entri Nirwasita yang masih dimiliki.

**Catatan Nirwasita** tersedia melalui Ensiklopedia atau Jurnal. Registry berisi 27 kartu: tujuh zona, enam main quest, sebelas karakter dan tiga entri Rumah Ranaya Lama. Teks karakter berasal dari paragraf Lore Guide; kartu zona/quest merupakan ringkasan World Bible dan Quest Script. Setiap kartu menampilkan sumber. Konten H01 merangkum tema sumber sebagai adaptasi tiga entri yang diminta script, bukan sejarah baru.

- Zona terbuka setelah dikunjungi; karakter setelah direkrut; perjalanan setelah quest selesai; tiga kartu H01 setelah puzzle rumah selesai.
- Pemain membaca dan memilih **Simpan catatan** untuk kartu baru. ID main quest/H01 yang sudah dimiliki memperoleh tampilan teks tanpa reward ganda.
- Enam quest utama + tujuh zona + lore Lampah/Tandaraga/Nirsmara menyediakan 16 entri tanpa mewajibkan side quest. Kehilangan satu entri untuk Nggarindu masih menyisakan jalur ke 15. Koleksi maksimal 27, dengan alternatif dari karakter/side quest.
- Hitungan memakai ID dikenal, unik, terbuka dan masih dimiliki; ID sintetis/duplikat tidak memenuhi syarat.
- Pemilihan entri diikuti layar **Pengorbanan permanen**, dengan judul, teks dan konsekuensi sebelum tombol konfirmasi. Batal tidak mengubah save.
- Konfirmasi menghapus satu entri dari koleksi dan memberikan **Pusaka Dilupakan Demi Selamat** dalam satu commit. Rekrutmen Nirsmara melalui lagu (C02) tetap berlaku.
- `nirsmaraSacrifice` hanya menyimpan ID sebagai penanda kehilangan permanen, sumber dan status; teks tidak disimpan sebagai koleksi. Kartu tidak dapat dicatat ulang. Metadata ini terpisah dari `lostEntries` NR-S04 yang kelak dapat ditebus di Smarana. Tidak ada jalur penebusan untuk pengorbanan Nirsmara.
- Item hanya dipasang oleh Nirsmara Lv55 sesudah Titah. **ASSUMPTION efek role heal:** Pamungkas pertama setiap battle memulihkan 8% HP maks sekutu yang masih hidup. Tidak revive dan tidak menambah durasi tak tersasar. Bonus sekali direset pada battle baru.

Syarat level, nama, kategori dan bonus +8% sesuai Dokumen Item §3.2; altar/15 entri/pengorbanan sesuai §3.10. Pemisahan item dari rekrutmen mengikuti keputusan C02 dan baseline yang telah disetujui.

## Sloka dan Mandala

Buka **Pusaka & bekal → Mandala & Sloka**, atau **Perkembangan & equipment → Upgrade skill & Sloka**. Mandala fisik berada di Danu Sanu (x0, z−75), setelah M02.

Batas 33 skill dari 11 karakter diekstrak langsung dari tabel Level Skill Guide. Level awal 1; Pamungkas Common, Nirsmara dan Wira tetap maksimum 1. Pasif tidak ditingkatkan dengan Sloka; Common tetap tanpa pasif. Pengelana tidak diberi progression skill baru karena tidak memiliki tabel sumber.

**ASSUMPTION ekonomi:**

| Sumber / transaksi | Aturan baseline |
|---|---|
| Pemakaian aktif | 1 Sloka Umum per 60 detik untuk karakter aktif; akumulasi pecahan waktu disimpan |
| Mandala setelah M02 | 20 Kepeng → 3 Sloka Umum untuk karakter terpilih; konfirmasi dan pembatalan tersedia |
| Quest terkait | 4 Sloka Misi per karakter terkait, sekali per quest |
| Boss cerita | M05 +1, M06 +2, NR-S04 +1 Sloka Boss |
| Penjaga Mandala setelah M05 | Kemenangan +2 Sloka Boss, boleh diulang; kalah/keluar tidak memberi reward |
| Dasar naik ke level N | 2N Sloka Umum |
| Spesial naik ke level N | 2N Sloka Umum +1 Sloka Misi |
| Pamungkas naik level | 2 Sloka Boss |

Umum/Misi terikat karakter, Boss dipakai bersama. M02 → Lampah; M03 → Tandaraga; M05 → Sanra/Watu/Tobelang; M06 → Nirsmara; S01/S02/S04/H02/H03 → Lare/Kayuri/Nggarindu/Wira/Saras. Material M05 dapat disimpan sebelum pemilik direkrut. Penjaga Mandala memakai HP4500, ATK550, DEF400 sebagai encounter latihan boss tambahan, bukan quest kanon. Pertemuan ini tidak memberi XP, Kepeng atau Serpihan Sukma.

Waktu aktif dihitung saat bergerak di eksplorasi atau selama lima detik setelah input aksi battle valid, hanya pada tab fokus. Menu, diam tanpa aktivitas, background, tamu dan challenge party pinjaman tidak menghasilkan Sloka. Saat battle, hanya anggota yang masih hidup dihitung. Sistem tidak menggunakan perubahan jam perangkat untuk memberikan material.

## Efek upgrade

**ASSUMPTION:** Guide menetapkan level maksimum dan jenis material, tetapi belum memiliki tabel besaran per level. Baseline saat ini memakai faktor `1 + 0.05 × (level skill − 1)` untuk damage/heal Dasar dan besaran utama Spesial: slow Lampah, damage Tandaraga/Tobelang/Wira, heal Sanra, DEF Watu, haste Kayuri, shield Nggarindu, serta heal/shield Saras. Faktor Pamungkas diterapkan pada damage Tobelang, reduksi Nggarindu dan heal Saras.

Skill tanpa besaran yang dapat diskalakan mendapat aturan eksplisit:

- Spesial Lare: tambahan peluang penerapan lock 5 poin persen per level, dibatasi 100%; kekebalan target tetap diperiksa.
- Spesial Nirsmara: pemulihan diri 3% HP maks per level di atas 1.
- Pamungkas Watu: shield tambahan 5% HP maks Watu per level di atas 1, untuk sekutu hidup. Durasi kebal tetap satu ronde.
- Pamungkas Lare: jumlah buff dibagikan = setengah hasil curian dibulatkan ke bawah + level−1, dibatasi hasil curian.
- Pamungkas Kayuri: level+1 Prana per sekutu, tetap maksimum 5.

Biaya Prana, cooldown dan durasi sumber tidak berubah. Bonus equipment diterapkan sebelum faktor skill yang relevan; passive/Awaken tetap sistem terpisah. UI menunjukkan level/cap, saldo, biaya, efek saat ini dan berikutnya sebelum upgrade. Detail skill menyertakan teks Guide, baseline upgrade dan deskripsi equipment terpasang.

## Save dan transaksi

Schema tetap v2 dengan field opsional `sloka` dan `nirsmaraSacrifice`. Save lama: skill dimulai Lv1, Umum 0; Sloka Misi/Boss untuk quest yang sudah selesai dikreditkan sekali menggunakan ledger baru. Kebijakan catch-up ini khusus material baru; tidak menambah XP, Serpihan Sukma, item atau rekrutmen. Backup pra-Sloka disimpan sekali sebelum save lama ditimpa.

Validasi menolak saldo negatif/pecahan, waktu invalid, level melebihi cap, skill pada karakter tak dimiliki, duplikat klaim dan kembalinya entri yang dihapus permanen. Upgrade, pembayaran dan sacrifice memakai candidate commit: kegagalan storage tidak mengubah state aktif. Reward boss hanya satu kali per instance battle selesai.

## Verifikasi per fase

| Fase | Hasil pada cakupan ini |
|---|---|
| Planning / sumber | Syarat Nirsmara, 33 cap skill dan 11 teks lore diperiksa terhadap Markdown; C02 tetap dipertahankan |
| Pre-production | Aturan biaya, waktu aktif, efek upgrade dan interpretasi item ditandai sebagai baseline di laporan ini |
| Production | Catatan, altar, material, Mandala, upgrade dan combat terintegrasi pada build 0.10 |
| Testing / QA | 87 tes domain PASS; browser fitur baru, regresi delapan challenge dan walkthrough M01–M06 PASS pada hash yang sama |
| Launch / LiveOps | Tidak dibuka dalam increment ini; M1 penuh dan launch tetap belum ditutup |

Bukti: `qa/domain-010.tap`, `qa/lore-skills-010.json`, `qa/challenges-010.json`, `qa/playthrough-010.json`, `qa/production-summary-010.json`. Screenshot pengorbanan permanen dan menu skill diperiksa pada 640×640. Browser fitur baru memakai fixture chapter6/level55 yang diimpor melalui UI; pengumpulan 15 kartu, transaksi, boss, equip dan reload dilakukan lewat UI, bukan mutasi debug. Domain mencakup pemisahan NR-S04, kegagalan storage, cap semua skill, bonus combat dan reset item per battle.

Balance belum disertifikasi oleh playtest pengguna: Dasar Common dari Lv1 ke Lv8 memerlukan 70 Umum, setara 70 menit pemakaian aktif atau 480 Kepeng untuk 24 paket Mandala (sisa 2 Umum). Ini target tuning, bukan klaim bahwa durasi tersebut sudah ideal. M1 masih memerlukan penyempurnaan beat/presentasi quest, QA region lengkap, hardware/browser target dan tahap visual Unity/Blender.

## Penerimaan final

SHA-256 HTML: `88f419b69efdefba422dc2ab628724a1c700712f9aebf5044131aa543197a32d`. Kedua file distribusi identik. Tiga laporan browser cocok dengan hash ini. Alur utama mengonfirmasi 13 Serpihan Sukma, reward Sloka quest/boss dan save/reload.
