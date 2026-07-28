# 🎭 Playwright QC Runner

Sebuah *tool* CLI internal yang dirancang khusus untuk Quality Assurance (QA/QC) engineer guna menyederhanakan jalannya otomatisasi pengujian reservasi multi-klien menggunakan Playwright.

Daripada harus mengingat dan mengetik perintah Playwright yang panjang dan rumit:

```bash
npx playwright test --project=chromium --headed --workers=2 --retries=1 --grep "@jackal.*One Way|@daytrans.*(One Way|Connecting)"
```

**QC Runner** menyediakan menu interaktif CLI untuk memilih klien, menyaring skenario yang sesuai, menentukan opsi eksekusi, serta menghasilkan dan menjalankan perintah Playwright secara otomatis.

---

## 🚀 Fitur Utama (Features)

* ✅ **Pemilihan Klien Interaktif & Efisien**:
  * Daftar interaktif (*Interactive client list with real-time search*)
  * Cari / Tempel masal (*Search / Paste client list - single or batch input*)
  * Filter berdasarkan kapabilitas (*Capability filter*: RoundTrip / Connecting / OneWay) dengan jumlah klien per kategori
* ✅ **Pengalih Environment (Environment Switcher)**:
  * Default selalu `staging`.
  * Menu pengubah environment `🌐 Change target environment [Current: staging]` untuk beralih antara `staging` dan `production`.
  * Menginjeksi variabel `ENV=<selected_env>` secara otomatis ke lingkungan proses eksekusi `playwright.config.js`.
* ✅ **Penyaringan Skenario Otomatis**: Menyaring skenario yang tidak didukung oleh klien berdasarkan flag kapabilitas (`oneWay`, `roundTrip`, `connecting`).
* ✅ **Pilihan Browser & Mode Eksekusi**:
  * Browser: Chromium, Firefox, Microsoft Edge.
  * Mode: Headed (UI terlihat) atau Headless (Latar belakang).
* ✅ **Advanced Options (Opsional)**:
  * Diakses melalui menu konfirmasi saat akan menjalankan test.
  * Opsi Konkurensi Worker (`--workers=1, 2, 4`).
  * Opsi Percobaan Ulang Test (`--retries=0, 1, 2`).
  * Opsi Auto-Buka Laporan HTML (`yes/no`).
  * Default: `workers=1`, `retries=0`, `autoOpenReport=true` — tanpa perlu menjawab pertanyaan tambahan jika tidak diubah.
* ✅ **Dry-Run / Preview Command Only**: Pilihan untuk menampilkan/menyalin perintah tanpa langsung mengeksekusi test.
* ✅ **Manajemen Preset**:
  * *Quick Run*: Mengingat pilihan terakhir (`last_run.json`) untuk 1-klik re-run.
  * *Presets*: Menyimpan kombinasi konfigurasi test favorit (`presets.json`).
  * *Hapus Preset*: Menghapus preset yang tidak digunakan lagi langsung dari menu utama.
* ✅ **Sesi CLI Berkelanjutan & Penanganan Error**: Menangkap kode status eksekusi test secara rapi dan menyediakan menu opsi paska-test (*Return to Main Menu / Exit*) sehingga CLI tidak tertutup otomatis.

---

## 📋 Persyaratan (Requirements)

* Node.js 20+
* npm
* Playwright

### Instalasi Dependensi
```bash
npm install
```

---

## 🏃 Cara Menjalankan (Run)

Menggunakan npm:
```bash
npm run qc
```

atau klik dua kali pada file launcher (Windows):
```
QC Runner.bat
```

`QC Runner.bat` menyediakan menu interaktif dengan 3 pilihan:
| Tombol | Aksi | Perintah |
|--------|------|----------|
| `1` | Run QC Tests | `npm run qc` |
| `2` | Sync Clients | `npm run qc:sync` |
| `3` | Git Pull (Update Repo) | `git pull` |
| `0` | Exit | — |

Setelah setiap aksi selesai, menu akan ditampilkan kembali.

---

## 🔄 Sinkronisasi Klien (Sync Clients)

Script `sync-clients.js` mengotomatisasi sinkronisasi daftar klien dari sumber utama (`utils/sites.js`) ke konfigurasi QC Runner (`qc/config/clients.js`).

### Menjalankan Sync
```bash
npm run qc:sync
```
atau pilih opsi **[2] Sync Clients** dari menu `QC Runner.bat`.

### Cara Kerja
1. Membaca semua tag & kapabilitas (`roundTrip`, `connectingRes`) dari `utils/sites.js`
2. Membandingkan dengan `qc/config/clients.js` yang sudah ada
3. Melaporkan perubahan:
   - ➕ Klien **baru** yang belum ada di QC config
   - 🔀 Klien yang **kapabilitasnya berubah** (roundTrip / connecting)
   - ➖ Klien yang **dihapus** dari `sites.js`
4. Menulis ulang `qc/config/clients.js` secara otomatis

### Contoh Output
```
🔄 Syncing clients from utils/sites.js → qc/config/clients.js

➕ Klien BARU (2):
   + Nama Klien (@tag) | RT:true | CN:false

✅ qc/config/clients.js berhasil diperbarui!
   Total klien: 50
   Ditambah: 2 | Diubah: 0 | Dihapus: 0
```

### Display Name Override
Jika nama tampilan klien memerlukan format khusus, tambahkan di `DISPLAY_NAME_OVERRIDES` dalam `qc/sync-clients.js`:
```javascript
const DISPLAY_NAME_OVERRIDES = {
  "@aoshuttle": "AO Shuttle",
  "@harumbsi": "Harum BSI",
  // ... tambahkan sesuai kebutuhan
}
```

> **Catatan**: QC Runner juga menampilkan **peringatan otomatis** saat startup jika mendeteksi klien baru di `sites.js` yang belum tersinkronisasi.

---

## 📂 Struktur Proyek (Project Structure)

```
qc/
├── config/
│   ├── clients.js        # Definisi klien & flag kapabilitas (auto-generated)
│   └── scenarios.js      # Definisi skenario & aturan pendukung supports()
├── data/                 # Penyimpanan lokal (gitignored)
│   ├── last_run.json     # Parameter eksekusi terakhir
│   └── presets.json      # Preset yang tersimpan
├── sync-clients.js       # Script sinkronisasi klien dari utils/sites.js
├── prompts.js            # Modul UI prompt interaktif (@inquirer/prompts)
├── runner.js             # Engine builder & pembuat perintah Playwright
├── storage.js            # Perantara penyimpanan data lokal JSON
├── index.js              # Alur pengatur CLI (Orchestration)
└── README.md             # Dokumentasi
```

---

## ⚙️ Konfigurasi & Ekstensibilitas

### Menambahkan Klien Baru
Tambahkan klien baru di `utils/sites.js` (sumber utama), lalu jalankan sinkronisasi (lihat bagian **🔄 Sinkronisasi Klien** di atas).

### Menambahkan Skenario Baru
Buka `qc/config/scenarios.js` dan tambahkan objek skenario:
```javascript
{
  id: "promoTrip",
  name: "Promo Trip",
  grep: "Promo Trip",
  supports: client => client.oneWay
}
```

---

## 🗺️ Rencana Pengembangan (Roadmap Update)

### v1.0 ✅ (Fitur Dasar CLI)
* [x] Pemilihan Klien interaktif (Checkbox list)
* [x] Pemilihan Skenario dengan penyaringan kompatibilitas otomatis
* [x] Pemilihan Browser (Chromium)
* [x] Generasi & Eksekusi Perintah Playwright otomatis dari CLI

### v1.1 ✅ (Mode Eksekusi & Laporan)
* [x] Mode Eksekusi Headed (UI Terlihat) / Headless (Latar Belakang)
* [x] Pembukaan Laporan HTML Playwright (`npx playwright show-report`) secara otomatis setelah test selesai
* [x] Pratinjau perintah (*command preview*) dan spanduk informasi test sebelum eksekusi

### v1.2 ✅ (Pencarian & State Persistence)
* [x] Fitur Pencarian Klien berdasarkan kata kunci (nama, ID, tag)
* [x] Fitur Preset Konfigurasi Test yang dapat disimpan (`presets.json`)
* [x] Quick Run Pilihan Terakhir (`last_run.json`) untuk 1-klik re-run

### v1.3 ✅ (Pengecekan Masal & Input Ekspres)
* [x] Batch Requests / Quick Paste daftar klien dari aplikasi chat (Slack/Teams) dengan pembagian koma, spasi, atau baris baru

### v1.4 ✅ (Peningkatan Fitur)
* [x] **Pengoptimalan Menu Klien**: Menyederhanakan opsi pencarian dan paste menjadi 1 langkah cepat (*Search / Paste client list*)
* [x] **Environment Switcher**: Pilihan environment target (`staging` vs `production`) bawaan default `staging`
* [x] **Filter Kapabilitas Klien**: Penyaringan masal klien berdasarkan fitur (`RoundTrip`, `Connecting`, `OneWay`)
* [x] **Mode Dry-Run**: Pilihan untuk menampilkan dan menyalin perintah Playwright tanpa langsung mengeksekusi test
* [x] **Sesi CLI Berkelanjutan**: Opsi paska-test (*Return to Main Menu / Exit*) agar CLI tidak langsung tertutup setelah eksekusi

### v1.5 ✅ (Penyederhanaan & Pembersihan)
* [x] **Hapus WebKit Browser**: WebKit bukan target browser nyata pada Windows — hanya emulasi Playwright
* [x] **Hapus Konfirmasi Setelah Pilih Klien**: Menghilangkan klik ekstra yang tidak perlu setelah memilih dari daftar interaktif
* [x] **Hapus Config Validator**: Validasi startup dihilangkan — Playwright sendiri akan gagal jika konfigurasi salah
* [x] **Hapus Ekspor/Impor Preset**: Fitur ini terlalu kompleks untuk *tool* internal — preset cukup dibuat ulang
* [x] **Advanced Options Opsional**: Workers, Retries, dan Auto Report digabung menjadi 1 menu opsional `⚙️ Advanced Options` di halaman konfirmasi — default langsung dipakai tanpa pertanyaan tambahan
* [x] **Jumlah Klien di Filter Kapabilitas**: Menampilkan jumlah klien per kategori kapabilitas (misal: `Round Trip (35 clients)`)
* [x] **Hapus Preset Langsung dari Menu Utama**: Menghilangkan submenu Preset Manager — hapus preset langsung dari menu utama
* [x] **Auto-Sync Klien (`npm run qc:sync`)**: Script otomatis untuk sinkronisasi daftar klien dari `utils/sites.js` ke `qc/config/clients.js` — tidak perlu lagi *double input*
* [x] **Peringatan Sync di Startup**: QC Runner otomatis mendeteksi klien baru di `sites.js` dan menampilkan peringatan `npm run qc:sync`
