# SKEMA FLAG & COUNTER GLOBAL
# PUSAKA: GEMA NAWANTARA

**Tanggal:** September 2026
**Tujuan:** Konsolidasi seluruh variabel state (`flag_`, `counter_`, `array_`) dari 9 Quest Script jadi 1 skema data save-file, plus audit bentrok nama
**Sumber:** 9 dokumen `QUEST_SCRIPT_R1-R9.md`

---

# RINGKASAN EKSEKUTIF

| Metrik | Nilai |
|---|---|
| Total kemunculan variabel (termasuk duplikat referensi silang) | 363 |
| Total variabel UNIK | **341** |
| Bentrok nama SUNGGUHAN ditemukan | **0** |
| Variabel dipakai lintas-region (referensi disengaja) | 14 |

**Kesimpulan utama: tidak ada bug penamaan.** 14 variabel yang muncul di lebih dari 1 file SEMUANYA referensi silang yang disengaja (flag penyelesaian region jadi prasyarat region lain, flag resolusi jadi input formula ending Anawil) — bukan kecelakaan penamaan. Detail di §2.

---

# §1 — VARIABEL PER REGION (341 Total)

Dikelompokkan per region, dan di dalam tiap region per KATEGORI FUNGSI (bukan urutan alfabetis mentah) supaya lebih berguna untuk desain skema database.

## 1.1 — Nirwasita (42 variabel)

**Progress Misi:** `flag_nr_m01_started`, `flag_nr_m01_complete`, `flag_nr_m02_complete`, `flag_nr_m03_complete`, `flag_nr_m04_complete`, `flag_nr_m05_complete`, `flag_nr_m06_complete`

**Rekrutmen Karakter:** `flag_lampah_sinaru_recruited`, `flag_tandaraga_recruited`, `flag_lare_wengi_recruited`, `flag_kayuri_sindu_recruited`, `flag_nggarindu_recruited`, `flag_wira_senja_recruited`, `flag_saras_pertiwi_recruited`, `flag_nirsmara_recruited`

**Resolusi/Pilihan:** `flag_adi_dialogue_choice`, `flag_adi_resolution_path`, `flag_region_resolution_nirwasita`, `flag_rahib_abu_seal_choice` *(catatan: nama ini muncul juga di Kalamrtu — cek §2.3, BUKAN bentrok, karakter berbeda kebetulan pola nama mirip)*

**Counter/Progress Puzzle:** `counter_dialog_patience`, `counter_wrong_turns`, `counter_patience_rounds`, `counter_gudang_correct_matches`, `counter_nggarindu_fragments`, `counter_dig_temptation_resisted`, `counter_restricted_battles`

**Array:** `array_mural_order`, `array_memorized_baits`

**Sistem/UI:** `flag_compass_tutorial_seen`, `flag_hud_compass_disabled`

**Lain-lain (item/state khusus):** `flag_adi_met`, `flag_ranaya_song_stage`, `flag_fragment_sanra_ranu`, `flag_fragment_vendor`, `flag_fragment_elder`, `flag_kalung_jalan_pulang_obtained`, `flag_rumah_ranaya_lama_unlocked`, `flag_sanra_ranu_buff_permanent`, `flag_ensiklopedia_sacrificed_nggarindu`, `flag_used_memory_restore_item`, `flag_misi_gagal_permanent_playthrough`, `flag_kayuri_dialogue_tone`

## 1.2 — Kadewan (40 variabel)

**Progress Misi:** `flag_kd_m01_started`, `flag_kd_m01_complete`, `flag_kd_m02_complete`, `flag_kd_m03_complete`, `flag_kd_m04_complete`, `flag_kd_m05_complete`, `flag_kd_m06_complete` ⚠️*dirujuk 5×lintas-file*, `flag_kd_h01_complete`

**Rekrutmen Karakter:** `flag_juru_wangsuh_recruited`, `flag_bharwang_kesari_recruited`, `flag_rarwang_celeng_recruited`, `flag_lembujaga_recruited`, `flag_rarasunyi_recruited`, `flag_randu_girang_recruited`, `flag_sang_werdi_recruited`, `flag_kidang_belantik_recruited`, `flag_kala_sesari_recruited`

**Resolusi/Pilihan:** `flag_kd_resolution_path` ⚠️*dirujuk 4×lintas-file*, `flag_kd_m02_path`, `flag_doa_line_identified`

**Counter/Progress Puzzle:** `counter_upacara_answer`, `counter_neutral_rounds`, `counter_fajar_observed`, `counter_family_convinced`, `counter_testimoni_collected`, `counter_kala_sesari_fragments`

**Array:** `array_doa_lines_eliminated`, `array_upacara_points_visited`, `array_cuci_steps_performed`, `array_dance_gestures_interpreted`, `array_beban_distribution`

**Sistem/UI:** `flag_ritual_otomatis_tutorial_seen`

**Lain-lain:** `flag_jero_mangku_chain_stage`, `flag_jero_mangku_recruited_as_npc`, `flag_genta_makna_obtained`, `flag_ghost_evidence_found`, `flag_sanggar_luh_sari_unlocked`, `flag_upacara_duka_followed`, `flag_rarwang_titah_complete`

## 1.3 — Smarana (45 variabel — TERBANYAK, konsisten dengan region berdurasi terpanjang)

**Progress Misi:** `flag_sm_m01_complete` s/d `flag_sm_m06_complete` ⚠️*m06 dirujuk 3×lintas-file*

**Rekrutmen Karakter:** `flag_bandar_ilung_recruited`, `flag_antuwan_melayang_recruited`, `flag_watu_gambut_recruited`, `flag_jatawira_recruited`, `flag_wadyan_salunai_recruited`, `flag_tinggang_intan_recruited`, `flag_sagara_buih_recruited`, `flag_datu_kalimpan_recruited`, `flag_juragan_larung_recruited`, `flag_juragan_larung_recruited_late`, `flag_talapak_embun_recruited`, `flag_bandar_timbangan_recruited`

**Resolusi/Pilihan:** `flag_sm_m03_night_path`, `flag_sm_m05_declined_path`, `flag_jatawira_izin_path`, `flag_lelang_won`

**Counter/Progress:** `counter_doa_pelayaran_found`, `counter_entries_redeemed`, `counter_gudang_identified`, `counter_kuli_adds_defeated`, `counter_neraca_dagang_transactions_lifetime`, `counter_origin_stories`, `counter_transaksi_diobservasi`, `counter_unique_npc_talked`

**Array:** `array_brankas_opened`, `array_lapisan_tanah`, `array_lost_encyclopedia_entries`, `array_market_prices`, `array_segel_terbuka`

**Sistem/Mekanik Khusus (Neraca Dagang):** `flag_neraca_dagang_tutorial_seen`, `flag_first_batu_gema_sold` — **PENTING: ini terhubung ke NR-S04 (lintas-region, lihat §2.2)**

**Lain-lain:** `flag_antuwan_encountered`, `flag_balai_lelang_tersembunyi_found`, `flag_gudang_bawah_gudang_unlocked`, `flag_pusaka_gema_fragment_smarana_revealed`, `flag_timbangan_terakhir_obtained`, `flag_timbangan_terakhir_progress`, `flag_tinggang_intan_protected`

## 1.4 — Wanasunya (41 variabel)

**Progress Misi:** `flag_wn_m01_complete` s/d `flag_wn_m06_complete` ⚠️*m06 dirujuk 3×*, `flag_wn_h02_complete`, `flag_wn_h03_complete`

**Rekrutmen Karakter:** `flag_puti_lengang_recruited`, `flag_lasik_kubang_recruited`, `flag_rangkiang_batu_recruited`, `flag_sindaka_rimbo_recruited`, `flag_uhang_sunyi_recruited`, `flag_bundo_sarikaso_recruited`, `flag_niniak_belang_recruited`, `flag_sambilan_talago_recruited`, `flag_sang_lengang_recruited`, `flag_suara_tanwujud_recruited`, `flag_tapak_ghaib_recruited`

**Resolusi/Pilihan:** `flag_wn_resolution_path` ⚠️*dirujuk 2×*

**Counter/Progress:** `counter_aksi_restoratif`, `counter_approach_attempts`, `counter_bukti_beri_tahu`, `counter_bukti_jangan`, `counter_daftar_fragmen`, `counter_kubangan_kering_found`, `counter_penanda_placed`, `counter_tanda_found`, `counter_versi_cerita`

**Array:** `array_objek_personal`, `array_pohon_penanda`

**Sistem/UI:** `flag_jejak_tutorial_seen`

**Lain-lain:** `flag_anomaly_point_found`, `flag_audio_navigation_complete`, `flag_dialog_avoided_name`, `flag_hitungan_lumbung_correct`, `flag_penanda_terakhir_obtained`, `flag_reverse_navigation_complete`, `flag_upiak_met`

**Referensi masuk dari region lain:** `flag_kd_m06_complete`, `flag_kd_resolution_path` (prasyarat/echo dari Kadewan)

## 1.5 — Kalamrtu (40 variabel)

**Progress Misi:** `flag_kl_m01_complete` s/d `flag_kl_m06_complete` ⚠️*m06 dirujuk 2×*, `flag_kl_h01_complete`, `flag_kl_h04_complete`

**Rekrutmen Karakter:** `flag_antumuara_recruited`, `flag_naga_wira_recruited`, `flag_lidah_watu_recruited`, `flag_sekar_kemarung_recruited`, `flag_sang_wiranata_recruited`, `flag_kijang_prasasti_recruited`, `flag_rahib_abu_recruited`, `flag_dayang_rindang_recruited`, `flag_rahib_kalpa_recruited`, `flag_sidhayatri_recruited`, `flag_kelasi_wira_recruited`, `flag_watu_sema_recruited`

**Resolusi/Pilihan:** `flag_kl_resolution_path` ⚠️*dirujuk 2×*, `flag_rahib_abu_seal_choice` *(nama mirip flag Nirwasita, karakter beda — lihat §2.3)*

**Counter/Progress:** `counter_bukti_kekejaman`, `counter_daftar_diperiksa`, `counter_lompatan_observed`, `counter_persembahan_dibawa`, `counter_prasasti_dinonaktifkan`, `counter_prasasti_perbatasan_read`, `counter_prasasti_rahib_kalpa`

**Array:** `array_kalimat_fragmen`, `array_kronologi_fragmen`, `array_lapisan_gali`

**Sistem/UI:** `flag_aksara_tutorial_seen`

**Lain-lain:** `flag_aksara_yang_tersisa_obtained`, `flag_nama_pulau_identified`, `flag_serbuk_aksara_tracked`

**Referensi masuk:** `flag_sm_m06_complete`, `flag_wn_m06_complete` (prasyarat Season)

## 1.6 — Himagiri (36 variabel)

**Progress Misi:** `flag_hm_m01_complete` s/d `flag_hm_m05_complete`, `flag_hm_h01_complete`, `flag_hm_s02_complete` ⚠️*flag_hm_m04_complete dirujuk 2× (juga dipakai Anawil)*

**Rekrutmen Karakter:** `flag_jalak_girindra_recruited`, `flag_gandarwa_pinus_recruited`, `flag_kurawatu_recruited`, `flag_pasarwengi_recruited`, `flag_ratri_kemuning_recruited`, `flag_sabda_tertunda_recruited`, `flag_sabdaguna_recruited`, `flag_sang_giripawana_recruited`, `flag_tabuh_senja_recruited`, `flag_wanaspati_giri_recruited`, `flag_wisesa_girinatha_recruited`

**Sistem Mekanik Khusus (Tata Krama — PALING KOMPLEKS, 2 sistem paralel):** `flag_kelancangan_meter` (histori penuh region), `flag_kelancangan_since_hm_m03` (checkpoint terpisah), `flag_kain_sembah_owned`, `flag_ritual_penyucian_used_this_cycle`

**Counter/Progress:** `counter_fragmen_pasar_heard`, `counter_pagi_disaksikan`, `counter_siklus_tahap`

**Array:** `array_ruangan_kenangan`

**Sistem/UI:** `flag_tata_krama_tutorial_seen`

**Lain-lain:** `flag_api_tidak_padam_found`, `flag_dua_kalender_understood`, `flag_izin_arsip_found`, `flag_konteks_kalimat_500_found`, `flag_navigasi_burung_complete`, `flag_navigasi_sunyi_complete`, `flag_pintu_dipilih`, `flag_regalia_terakhir_obtained`, `flag_tarian_9_gerakan_complete`

## 1.7 — Rajawani (33 variabel)

**Progress Misi:** `flag_rj_m01_complete` s/d `flag_rj_m06_complete` ⚠️*m06 dirujuk 2×*, `flag_rj_h01_complete`

**Rekrutmen Karakter:** `flag_bala_karangkasa_recruited`, `flag_bikusagari_recruited`, `flag_datu_honggi_recruited`, `flag_juru_cengkih_recruited`, `flag_nyai_bokira_recruited`, `flag_penjaga_polos_recruited`, `flag_sang_harga_recruited`, `flag_sawangi_pala_recruited`, `flag_sowahi_bara_recruited`, `flag_sukma_penimbang_recruited`, `flag_talaga_diam_recruited`

**Sistem Mekanik Khusus (Warisan):** `counter_warisan_total` ⚠️*dirujuk lintas-region ke Jaladri & Anawil, lihat §2.2*, `counter_warisan_danau`, `counter_warisan_kebun`, `flag_warisan_tak_ternilai_obtained`, `flag_warisan_tutorial_seen`

**Counter/Progress lain:** `counter_dipetik_dini`, `counter_gelombang_benteng`, `counter_gelombang_bertahan`, `counter_timbangan_seimbang`

**Array:** `array_bukti_dikumpulkan`

**Lain-lain:** `flag_bahan_baku_identified`, `flag_meditasi_complete`, `flag_nama_asli_found`, `flag_peringatan_didecode`, `flag_surat_kenegaraan_searched`

## 1.8 — Jaladri (37 variabel)

**Progress Misi:** `flag_jl_m01_complete` s/d `flag_jl_m06_complete` ⚠️*m06 dirujuk 2×*, `flag_jl_h01_complete`

**Rekrutmen Karakter:** `flag_abu_tembara_recruited`, `flag_anjala_nirmala_recruited`, `flag_cupaka_loba_recruited`, `flag_dayan_nadha_recruited`, `flag_gema_ganda_recruited`, `flag_mandarasmi_recruited`, `flag_naga_sasra_recruited`, `flag_padu_rotan_recruited`, `flag_penjaga_gelombang_recruited`, `flag_sagaranak_recruited`, `flag_sekar_nyalu_recruited`

**Resolusi/Pilihan:** `flag_jl_unity_choice` ⚠️*dirujuk 2× (juga di Anawil)* — **PALING PERMANEN di seluruh game, tidak bisa diubah bahkan lewat retry**

**Sistem Mekanik Khusus (Yang Tersebar):** `counter_serpihan_total`, `counter_serpihan_j2`, `counter_serpihan_j3`, `counter_serpihan_j4`, `flag_serpihan_tutorial_seen`, `flag_serpihan_terakhir_obtained`, `flag_serpihan_tak_diinginkan_identified`

**Counter/Progress lain:** `counter_cetakan_kerajaan`, `counter_gelombang_timing`, `counter_jabat_tangan`, `counter_kerajaan_simulasi`, `counter_pantulan_suara`

**Array:** `array_bangkai_fragmen`

**Lain-lain:** `flag_batu_spesifik_found`, `flag_dinding_tersembunyi_found`, `flag_ikan_dihitung`, `flag_peta_mental_progress`

**Referensi masuk (flavor-only, TIDAK terhubung mekanis — lihat §2.2):** `counter_warisan_total`

## 1.9 — Anawil (49 variabel — TERBANYAK, konsisten sebagai finale dengan formula ending kompleks)

**Progress Misi:** `flag_aw_m01_complete` s/d `flag_aw_m05_complete`, `flag_aw_h01_complete`, `flag_aw_h02_complete`

**Rekrutmen Karakter:** `flag_kalana_sauyan_recruited`, `flag_nin_waiam_recruited`, `flag_wai_cendra_recruited`, `flag_gema_purwa_recruited`, `flag_penunggu_sunyi_recruited`, `flag_tanpa_rupa_recruited`

**Sub-objective (BUKAN rekrutmen, 5 karakter Common):** `flag_kaswari_subobjective_complete`, `flag_tapak_nirbahasa_subobjective_complete`, `flag_karang_wayahan_subobjective_complete`, `flag_pari_lampur_subobjective_complete`, `flag_sampara_wene_subobjective_complete`

**Sistem Mekanik Khusus (Tanpa Kata — degradasi HUD 3 tingkat):** `flag_dialog_teks_disabled`, `flag_battle_ui_teks_disabled`, `flag_hud_total_disabled`, `flag_tanpa_kata_tutorial_seen`

**Formula Ending Global (PALING KOMPLEKS di seluruh game):** `flag_ending_global`, `counter_encyclopedia_8_region`, `counter_encyclopedia_percentage`, `counter_karakter_direkrut_total`

**Counter/Progress lain:** `counter_gelombang_survival`, `counter_titik_ditunjuk`, `flag_hp_threshold_no_ally_down`, `flag_pilihan_biner_diam`, `flag_rawat_makhluk_complete`, `flag_tarian_gestur_complete`, `flag_telapak_keenam_progress`, `flag_yang_tersisa_ketika_semua_gagal_obtained`

**Array:** `array_gema_8_region`, `array_jejak_kaki_pattern`

**Referensi masuk dari SEMUA 8 region lain (input formula ending, lihat §2.1):** `flag_hm_m04_complete`, `flag_jl_m06_complete`, `flag_jl_unity_choice`, `flag_kd_m06_complete`, `flag_kd_resolution_path`, `flag_kl_m06_complete`, `flag_kl_resolution_path`, `flag_region_resolution_nirwasita`, `flag_rj_m06_complete`, `flag_sm_m06_complete`, `flag_wn_m06_complete`, `flag_wn_resolution_path`, `counter_warisan_total`

---

# §2 — ANALISIS REFERENSI LINTAS-REGION (Bukan Bentrok, Tapi Butuh Perhatian Arsitektur)

## 2.1 — Kategori 1: Flag Prasyarat Season (7 flag, PALING SERING dirujuk)

`flag_kd_m06_complete`, `flag_sm_m06_complete`, `flag_wn_m06_complete`, `flag_kl_m06_complete`, `flag_hm_m04_complete`, `flag_rj_m06_complete`, `flag_jl_m06_complete` — masing-masing DIDEFINISIKAN di file region asalnya, DIBACA (bukan ditulis ulang) oleh region berikutnya sebagai syarat akses, dan SEMUANYA dibaca ulang oleh Anawil untuk formula ending.

**Implikasi arsitektur:** sistem save-file harus punya 1 GLOBAL STATE TABLE yang bisa diakses read-only dari region manapun — bukan state yang terkunci per-region-scene. Ini pola umum di RPG (global quest flags), tapi perlu eksplisit didesain sejak awal, bukan diasumsikan otomatis oleh engine.

## 2.2 — Kategori 2: Flag Resolusi Region (Input Formula Ending)

`flag_kd_resolution_path`, `flag_wn_resolution_path`, `flag_kl_resolution_path`, `flag_jl_unity_choice`, `flag_region_resolution_nirwasita`, `counter_warisan_total` — 6 variabel ini secara spesifik jadi INPUT ke formula Connection Score di Anawil (`QUEST_SCRIPT_R9` AW-M05 Beat 3). **Ini paling kritis untuk diverifikasi tidak hilang/ter-reset sebelum pemain mencapai Anawil** — karena formula ending butuh SEMUA 8 nilai ini utuh dari playthrough sejak awal game.

**Kasus khusus `counter_warisan_total` di Jaladri:** ini BUKAN referensi mekanis — JL-H01 menyebut kata "Warisan" sebagai flavor text reward, sudah dicatat eksplisit sejak awal "TIDAK terhubung ke counter_warisan_total Rajawani". Rekomendasi: ganti nama item reward JL-H01 jadi sesuatu yang tidak memakai kata "Warisan" sama sekali (mis. "Peninggalan" atau istilah lain) untuk mencegah kebingungan developer yang membaca kode/dokumen tanpa konteks penuh.

## 2.3 — Kategori 3: Kemiripan Nama TANPA Referensi Silang (Bukan Bentrok, Tapi Berisiko Bingung)

`flag_rahib_abu_seal_choice` (Kalamrtu) — nama variabelnya generik ("seal_choice") dan SECARA KEBETULAN bisa terlihat mirip pola penamaan di region lain meski tidak ada flag lain yang benar-benar sama persis. Ini bukan bug, tapi rekomendasi: pertimbangkan prefix region eksplisit untuk SEMUA flag non-prasyarat-lintas-region (mis. `flag_kl_rahib_abu_seal_choice`) supaya audit visual sekilas jadi lebih mudah tanpa perlu grep lintas-file setiap kali.

---

# §3 — REKOMENDASI KONVENSI PENAMAAN UNTUK PRODUKSI

Berdasarkan pola yang SUDAH konsisten dipakai secara alami sepanjang 9 dokumen (baik):

1. **Flag region-scoped:** `flag_[kode_region]_[konteks]` — SUDAH konsisten (nr_, kd_, sm_, wn_, kl_, hm_, rj_, jl_, aw_)
2. **Flag rekrutmen:** `flag_[nama_karakter_snake_case]_recruited` — SUDAH 100% konsisten di 90+ karakter, TIDAK ada penyimpangan ditemukan
3. **Counter:** `counter_[deskripsi]` — konsisten sebagai integer/progress tracker
4. **Array:** `array_[deskripsi]` — dipakai untuk data terstruktur (urutan, kumpulan fragmen)

**1 rekomendasi perbaikan:** flag non-rekrutmen yang TIDAK dimaksudkan untuk dibaca lintas-region (mayoritas kasus) sebaiknya dapat prefix region eksplisit meski saat ini tidak ada bentrok — sebagai pencegahan untuk saat tim menambah konten baru di masa depan.

---

# §4 — IMPLIKASI TIPE DATA UNTUK SAVE-FILE

| Kategori | Tipe Data | Jumlah Perkiraan |
|---|---|---|
| `flag_xxx_complete` / `flag_xxx_recruited` | Boolean | ~180 |
| `flag_xxx_path` / `flag_xxx_choice` (enum bercabang) | String enum atau integer terbatas | ~12 |
| `counter_xxx` | Integer | ~85 |
| `array_xxx` | Array/List (ukuran bervariasi, 3-40 elemen) | ~20 |
| Flag numerik non-boolean (mis. `flag_kelancangan_meter`) | Integer 0-100 | ~5 |

**Total estimasi field save-file dari sistem quest saja: ~341** — BELUM termasuk data lain (inventaris, level karakter, posisi world, dll.) yang di luar cakupan Quest Script.

---

*Skema Flag & Counter Global · September 2026*
*Status: Audit lengkap 341 variabel unik dari 9 Quest Script. 0 bentrok nama sungguhan ditemukan. 14 variabel referensi lintas-region teridentifikasi dan diverifikasi SEMUA disengaja (7 flag prasyarat season, 6 flag input formula ending, 1 referensi flavor-only yang sudah terdokumentasi). 1 rekomendasi penamaan untuk konsistensi jangka panjang (prefix region eksplisit). Siap dipakai sebagai rujukan awal desain skema database save-file, TIDAK termasuk data non-quest (inventaris, world state, dll.).*
