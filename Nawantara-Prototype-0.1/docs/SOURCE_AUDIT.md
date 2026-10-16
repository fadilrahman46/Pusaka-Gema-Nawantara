# Audit sumber dan keputusan implementasi

Cakupan input: 16 file, 880.119 byte. Indeks judul, lokasi baris, SHA-256, dan placeholder tersedia di data/source-manifest.json. Roster: 100 ID unik dengan delapan stat dasar. Quest: 138 heading; seluruh kode misi Kerangka ditemukan pada heading script (termasuk tambahan dengan level heading berbeda).

## Temuan terverifikasi
| Temuan | Bukti | Keputusan |
|---|---|---|
| Cap lama 100 sudah dikoreksi | WB II.2; GK aturan level; Combat §0 | Cap 60; Awaken mulai 40 |
| Kurva level saling bertentangan | GK: +2% per level; Combat §1.3 interpolasi linier asumsi | Gunakan GK 1.02^(L-1) untuk stat; HP encounter khusus tetap dari script |
| Klaim zero placeholder tidak konsisten | Combat §4.3 mengatakan selesai dan belum diaudit; WN-M06, AW-S01 masih placeholder | Audit narasi lama tidak dianggap bukti angka final |
| Skema 341 tidak otomatis terkonfirmasi | Ekstraksi identifiers dari blok quest menghasilkan 338, regex belum mengembangkan rentang s/d | Simpan indeks terukur, jangan memaksakan 341 field bool |
| Enum resolusi Nirwasita tidak sama | R1 S03 menulis ADI_JOINS/NEUTRAL; R9 membaca WAITED/FORCED_PAST | Simpan dua field asli; adapter ending membaca flag_adi_resolution_path atau ADI_JOINS |
| HM/SM ending belum punya field kanon eksplisit | R9 tabel CS merujuk jalur/penawaran | Ekstensi typed pada modul ending; dicatat, tidak menebak dari completion flag |
| Durasi sumber merupakan estimasi desain | WB menyebut ~86h tanpa data playtest | Bukan bukti durasi playable |
| Roster Common memiliki deskripsi pasif tetapi tabel menyatakan tidak mendapat pasif | GK #01/#02 | Kit penuh dan aturan pasif ditunda untuk review; milestone tidak mengaktifkan pasif Common |
| Arah TG zona tidak sama dengan TG season | WB N2 TG1 meski S1 tutorial | Zona dikunci oleh quest, level mengikuti milestone |
| Gema Purwa bukan rekrutmen ending utama | R9 AW-M05, AW-H02 | Rekrutmen terpisah dalam desain expansion |
| Item Spesial memberi efek pasti | DI §2 Kalung Jalan Pulang | Netralisasi kompas setelah diperoleh |

## Catatan ekstraksi zona
Sebagian tabel WB §4.3–§9.3 merujuk nama yang tidak berubah secara ringkas; nama lengkap direkonstruksi dari tabel level §X.12 masing-masing region, menghasilkan 63 zona.

## Adaptasi prototipe (bukan kutipan kanon)
- Silent protagonist: stat uji; role aktif sekutu disederhanakan. Dialog diringkas; puzzle lagu memakai urutan empat simbol/nada instrumental baru.
- NR-M01: checkpoint dan battle dua Bayang Penjaga 970; ekstraksi selalu tersedia. Idle combat tidak menambah musuh pada build ini.
- NR-M02: 3 siklus mendengar dipersingkat; Lampah HP 1422. Gerak tactical realtime dalam battle belum ada.
- NR-M03: lima ronde guard/heal; reward dan rekrutmen mengikuti sumber.
- NR-M04: 3 percabangan disederhanakan menjadi puzzle landmark pada lokasi 3D; battle Kabut Bersuara tanpa animasi duplikasi.
- NR-M05: 3 fragmen NPC, recall empat simbol, guardian 2200 dengan tiga segel; bukan semua beat dan dialogue branching final.
- NR-M06: fase mekanis 5500/66%/33%, puzzle akhir, recruitment dan reward.
- NR-S03: dua pilihan resolusi; paksaan disajikan sebagai keputusan melewati jalan tanpa adegan menyerang NPC anak.
- NR-H03: tiga titik, konfirmasi irreversible, Saras bergabung jika semuanya ditinggalkan.
- Katalog 100 karakter berisi nama, tier, tipe, elemen, role dan stat dasar; kit dan rekrutmen seluruh roster belum implemented.
- R2–R9: peta/desain dan fondasi logika, bukan kampanye playable. Tidak ada cutscene Jaladri pada milestone ini.

## Inventaris 16 sumber
| Sumber | Baris | Fungsi verifikasi | Baris dengan placeholder/TBD |
|---|---:|---|---:|
| COMBAT_MATH_GLOBAL.md | 266 | Formula damage, elemen, crit, cap | 2 |
| DOKUMEN_ITEM_Pusaka_Gema_Nawantara_FINAL_v1.md | 589 | Kategori dan reward item | 0 |
| GUIDE_KARAKTER_100_Nawantara_FINAL_v1_1.md | 3726 | 100 karakter dan stat | 0 |
| KERANGKA_MISI_Pusaka_Gema_Nawantara.md | 1364 | Cakupan 138 misi | 9 |
| QUEST_SCRIPT_R1_Nirwasita.md | 610 | Urutan misi, kondisi menang, flag, fail/retry | 6 |
| QUEST_SCRIPT_R2_Kadewan.md | 532 | Urutan misi, kondisi menang, flag, fail/retry | 4 |
| QUEST_SCRIPT_R3_Smarana.md | 617 | Urutan misi, kondisi menang, flag, fail/retry | 14 |
| QUEST_SCRIPT_R4_Wanasunya.md | 571 | Urutan misi, kondisi menang, flag, fail/retry | 6 |
| QUEST_SCRIPT_R5_Kalamrtu.md | 583 | Urutan misi, kondisi menang, flag, fail/retry | 5 |
| QUEST_SCRIPT_R6_Himagiri.md | 501 | Urutan misi, kondisi menang, flag, fail/retry | 6 |
| QUEST_SCRIPT_R7_Rajawani.md | 515 | Urutan misi, kondisi menang, flag, fail/retry | 6 |
| QUEST_SCRIPT_R8_Jaladri.md | 508 | Urutan misi, kondisi menang, flag, fail/retry | 2 |
| QUEST_SCRIPT_R9_Anawil.md | 525 | Urutan misi, kondisi menang, flag, fail/retry | 4 |
| SKEMA_FLAG_COUNTER_GLOBAL.md | 227 | State lintas-region | 0 |
| UI_UX_SYSTEM_REQUIREMENTS.md | 219 | Sistem global | 0 |
| World_Bible_Pusaka_Gema_Nawantara_v5.3.md | 1492 | Tema, zona, gate, akuisisi | 0 |

## Pemetaan item
Ekstraksi katalog menghasilkan 45 item regional + 9 Item Spesial + 99 item unik individual. Ini bukan karakter yang hilang: §3.11 secara eksplisit menghapus item individual Anjala Nirmala (#73) dan merujukkannya ke Serpihan Terakhir. Satu referensi karakter-ke-item ditambahkan tanpa menduplikasi item. Gema Purwa #83 memakai kunci akun, bukan gear yang di-equip.
