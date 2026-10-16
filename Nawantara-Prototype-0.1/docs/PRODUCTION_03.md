# Produksi 0.3 — party per karakter dan quest graph Nirwasita

Tanggal: 18 September 2026. Dasar kelanjutan: pengguna sudah menguji produksi 0.2 dan meminta pekerjaan dilanjutkan. Fase utama: Production; fase pendamping: Testing & QA. Keputusan C01–C14 tetap berlaku.

## Hasil increment

- Party 1–4 karakter, dua slot depan dan dua belakang. Susunan dapat diubah melalui **Ensiklopedia Sukma → Atur party** di luar battle dan tersimpan dalam save.
- HP, Prana 0–5, target, giliran SPD, cooldown dan status per unit. Urutan SPD dibekukan pada awal ronde; tie ally dahulu lalu ID. Guard memberi 1 Prana dan mengurangi damage masuk 50% hingga giliran berikutnya. Skill spesial 2 Prana/CD2; pamungkas 4 Prana/CD3. CD menghitung giliran pemilik berikutnya, termasuk giliran yang dilewati.
- Kit level 1 Lampah Sinaru, Tandaraga, Nirsmara, Saras Pertiwi dan kit baseline Pengelana. Common ally tidak memperoleh passive; passive Awaken belum aktif pada semua karakter level 1. Stat empat karakter diperiksa terhadap registry hasil ekstraksi Guide Karakter.
- Hit, crit, damage floor setelah seluruh multiplier, RNG berseed, validasi target sebelum biaya, refresh status tanpa stacking, shield, skip, Sesat, penurunan SPD/ACC, untargetable dan pemulihan tanpa revival.
- Tandaraga menghitung **ronde seluruh party**, bukan klik tombol. Upaya serangan mereset kesabaran. Penjaga Menara membutuhkan tiga ronde genap yang berbeda untuk membuka tiga segel. Nirsmara memiliki larangan debuff berulang, penalti ACC fase 2, HP lock fase 3 dan penyelesaian lagu. Save lama dengan lagu tidak lengkap menggunakan dua penyelesaian puzzle dan tidak menerima Kalung Jalan Pulang.
- Quest graph mengeksekusi prasyarat dan reward enam main quest. Transaksi reward, rekrutmen, Kepeng, checkpoint dan completion disimpan bersama melalui commit yang sudah ada. Event duplikat/out-of-order ditolak. Jurnal menampilkan status cabang Adi dan Saras dari keputusan aktual, termasuk terlewat/gagal permanen. Lima quest lain masih ditandai belum diimplementasikan.
- **Latihan party** tersedia dari pengaturan party, termasuk setelah NR-M06. Latihan tidak memberi reward atau memajukan quest.

## Save dan UI

Schema tetap versi 2 dengan field `party` opsional untuk kompatibilitas 0.2. Loader menambahkan Pengelana dan maksimal tiga karakter supported pertama jika field belum ada. Nilai party yang duplikat, kosong, lebih dari empat, belum direkrut, atau belum memiliki kit ditolak. Tidak ada reward retrospektif ketika mengimpor save lama.

Panel battle menunjukkan karakter aktif, HP/Prana individual, formasi, target lawan/pemulihan, cooldown dan nama efek. Tombol 1–4 adalah Dasar, Bertahan, Spesial, Pamungkas. Target lawan dan target pemulihan dipilih terpisah; skill area/self tidak memerlukan pilihan target. Layout 640px memakai kartu dua kolom dan panel yang dapat digulir. Fokus modal dan input eksplorasi tetap memakai pengamanan 0.2.

## Binding sumber dan baseline tuning

Sumber konten hanya Markdown yang diminta pengguna. Runtime subset merujuk Guide Karakter #01/#02/#09/#85, Quest Script R1 NR-M01–M06/NR-S03/NR-H03 dan kontrak Combat Math/C08. Sumber asli tidak diubah.

| Komponen | Status |
|---|---|
| Stat empat karakter level 1 | Dari registry Guide Karakter; tes kesetaraan seluruh stat |
| HP encounter | Nilai prototype/R1 dipertahankan: 970×2, 1422, 1422, 2200, 2200, 5500 |
| Stat Pengelana, ATK/DEF/SPD musuh selain nilai eksplisit | **BASELINE DESIGN**, bukan kanon atau hasil balancing |
| Damage kecil 0,75×, besar 1,5×, heal kecil 10% | Baseline C08 |
| Pengelana: heal 30%, pamungkas 260% | Baseline untuk jalur playable, belum final |
| Lampah: SPD −20%; Nirsmara basic: ACC −10 poin selama 2 ronde | Besaran/durasi yang tidak disebut eksplisit sumber; tuningRequired |
| Tandaraga spesial | Baseline interpretasi `1,5 × (1 + 0,15 × ronde tanpa serang)`, cap lima ronde |
| Formasi musuh | AI basic memprioritaskan slot depan; baseline, belum sistem targeting seluruh kit |
| Penalti ACC fase 2 | −50 poin persentase mengikuti satuan ACC C08; diterapkan ke hit dan status roll |

Sisa duration dihitung pada akhir ronde penuh setelah ronde aplikasi. Debuff dengan base chance yang tidak disebut menggunakan baseline 100% × hit chance. RNG seed default tetap untuk encounter preview agar regresi dapat direproduksi; battle belum disimpan di tengah giliran.

## Verifikasi

- **29/29 tes domain PASS**: core, save, combat, graph. Meliputi independensi resource, invalid action tanpa mutasi, target mati, cooldown, duration, refresh, Prana cap, damage floor, RNG replay, sumber stat, boss lock, anti-repeat debuff, fallback lagu, migrasi party dan reward idempoten.
- Build esbuild **PASS**, dua HTML mandiri di `dist/`.
- Browser party **PASS**: impor 0.2, edit empat slot, urutan SPD, target heal/shield Saras, layout 1280×800 dan 640×640, latihan tanpa reward, reload party. Bukti `qa/party-browser-03.json`, `qa/party-desktop-03.png`, `qa/party-responsive-03.png`.
- Regresi save/UI **PASS**, enam pemeriksaan: movement/checkpoint, fokus, resize, invalid import, legacy backup, corrupt-save recovery. Bukti `qa/production-browser.json`.
- Keputusan Saras permanen **PASS**: cancel/confirm/reload/invalid import. Bukti `qa/permanent-choice.json`.
- Dua walkthrough legal NR-M01–M06 **PASS** selama integrasi, termasuk reload akhir. Bukti `qa/playthrough-03-1.json` dan `qa/playthrough-03-final.json`. Walkthrough penerimaan ketiga **PASS** pada HTML final; hash cocok dengan artefak distribusi. Bukti `qa/playthrough-03-release.json` dan `qa/production-summary-03.json`.
- Validator keputusan sumber **PASS**: 100 ID karakter, distribusi rarity, anchor contoh, 138 quest, registry evidence 248 baris, tautan 14 keputusan.

Lingkungan QA: Chrome headless Windows, software WebGL/SwiftShader. Bukti ini tidak menyertifikasi performa GPU/perangkat minimum, fun atau balancing.

## Gate dan pekerjaan berikut

| Fase | Verifikasi terhadap rencana |
|---|---|
| Planning | PASS untuk scope/keputusan yang tetap; tidak ada region baru ditambahkan |
| Pre-production | Kontrak party/quest subset dipakai; full G2 tetap terbuka untuk gesture/kit/branch lainnya |
| Production | Increment 0.3 terintegrasi; M1 penuh belum ditutup |
| Testing & QA | Domain dan browser di atas lulus; walkthrough penerimaan HTML final lulus |
| Deployment/Launch | Belum dijalankan; deliverable berupa preview lokal |
| Maintenance/LiveOps | Belum masuk fase ini |

Prioritas lanjut: lengkapi tujuh kit karakter Nirwasita lainnya dan lima quest yang belum dimainkan, ganti beat adaptasi yang tersisa dengan quest script lengkap, lalu leveling/equipment/progression serta gesture prototype. Kontrak C08 belum diklaim lengkap untuk semua konten. Passive Awaken, gear, Sloka/Mandala, leveling, R2–R9, kontrol sentuh dan final character art belum tersedia. Model dunia masih placeholder prosedural; party card tidak berarti empat model ally telah diimplementasikan di arena.

Tidak ditemukan blocker Critical/High dalam cakupan tes increment ini. Gate launch tetap terbuka karena cakupan kampanye, hardware dan balancing belum memenuhi rencana penuh.


SHA-256 HTML final: `4184b1971f9d6bbe376f9f2010b97fdbcf8db73692cc1a4babd4bddb90f9c095`. Kedua file HTML distribusi identik.
