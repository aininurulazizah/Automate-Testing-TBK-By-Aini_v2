# 🎭 Playwright QC Runner

Sebuah *tool* CLI internal yang dirancang khusus untuk Quality Assurance (QA/QC) engineer guna menyederhanakan jalannya otomatisasi pengujian reservasi multi-klien menggunakan Playwright.

Daripada harus mengingat dan mengetik perintah Playwright yang panjang dan rumit:

```bash
npx playwright test --project=chromium --headed --workers=2 --retries=1 --grep "@jackal.*One Way|@daytrans.*(One Way|Connecting)"
```

**QC Runner** menyediakan menu interaktif CLI untuk memilih klien, menyaring skenario yang sesuai, menentukan opsi eksekusi (*workers*, *retries*, *browser*, mode *headed*/*headless*), serta menghasilkan dan menjalankan perintah Playwright secara otomatis.

---

## 🚀 Fitur Utama (Features)

* ✅ **Pemilihan Klien Interaktif & Efisien**:
  * Daftar interaktif (*Interactive client list with real-time search*)
  * Cari / Tempel masal (*Search / Paste client list - single or batch input*)
  * Filter berdasarkan kapabilitas (*Capability filter*: RoundTrip / Connecting / OneWay)
* ✅ **Pengalih Environment (Environment Switcher)**:
  * Default selalu `staging`.
  * Menu pengubah environment `🌐 Change target environment [Current: staging]` untuk beralih antara `staging` dan `production`.
  * Menginjeksi variabel `ENV=<selected_env>` secara otomatis ke lingkungan proses eksekusi `playwright.config.js`.
* ✅ **Penyaringan Skenario Otomatis**: Menyaring skenario yang tidak didukung oleh klien berdasarkan flag kapabilitas (`oneWay`, `roundTrip`, `connecting`).
* ✅ **Pilihan Browser & Mode Eksekusi**:
  * Browser: Chromium, Firefox, WebKit (Safari), Microsoft Edge.
  * Mode: Headed (UI terlihat) atau Headless (Latar belakang).
  * Opsi Konkurensi Worker (`--workers=1, 2, 4`).
  * Opsi Percobaan Ulang Test (`--retries=0, 1, 2`).
* ✅ **Dry-Run / Preview Command Only**: Pilihan untuk menampilkan/menyalin perintah tanpa langsung mengeksekusi test.
* ✅ **Manajemen Preset & Ekspor/Impor**:
  * *Quick Run*: Mengingat pilihan terakhir (`last_run.json`) untuk 1-klik re-run.
  * *Presets*: Menyimpan kombinasi konfigurasi test favorit (`presets.json`).
  * *Ekspor / Impor*: Bagikan file preset JSON antar anggota tim QA.
* ✅ **Validasi Konfigurasi Otomatis**: Memeriksa integritas file `clients.js` dan `scenarios.js` saat aplikasi dimulai.
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

---

## 📂 Struktur Proyek (Project Structure)

```
qc/
├── config/
│   ├── clients.js        # Definisi klien & flag kapabilitas
│   ├── scenarios.js      # Definisi skenario & aturan pendukung supports()
│   └── validator.js      # Validasi skema konfigurasi
├── data/                 # Penyimpanan lokal (gitignored)
│   ├── last_run.json     # Parameter eksekusi terakhir
│   └── presets.json      # Preset yang tersimpan
├── prompts.js            # Modul UI prompt interaktif (@inquirer/prompts)
├── runner.js             # Engine builder & pembuat perintah Playwright
├── storage.js            # Perantara penyimpanan data lokal JSON
├── index.js              # Alur pengatur CLI (Orchestration)
└── README.md             # Dokumentasi
```

---

## ⚙️ Konfigurasi & Ekstensibilitas

### Menambahkan Klien Baru
Buka `qc/config/clients.js` dan tambahkan objek baru:
```javascript
{
  id: "newclient",
  name: "New Client",
  tag: "@newclient",
  oneWay: true,
  roundTrip: false,
  connecting: true
}
```

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

### v1.4 ✅ (Peningkatan Fitur QC Runner Terkini)
* [x] **Pengoptimalan Menu Klien**: Menyederhanakan opsi pencarian dan paste menjadi 1 langkah cepat (*Search / Paste client list*)
* [x] **Environment Switcher**: Pilihan environment target (`staging` vs `production`) bawaan default `staging` yang secara otomatis menginjeksi variabel `ENV` ke `playwright.config.js`
* [x] **Filter Kapabilitas Klien**: Penyaringan masal klien berdasarkan fitur (`RoundTrip`, `Connecting`, `OneWay`)
* [x] **Opsi Konkurensi Worker**: Pengaturan jumlah worker Playwright (`--workers=1, 2, 4`)
* [x] **Opsi Retries**: Pengaturan percobaan ulang test yang gagal (`--retries=0, 1, 2`)
* [x] **Dukungan Browser WebKit**: Penambahan WebKit (Desktop Safari) bersama Chromium, Firefox, dan Microsoft Edge
* [x] **Mode Dry-Run**: Pilihan untuk menampilkan dan menyalin perintah Playwright tanpa langsung mengeksekusi test
* [x] **Ekspor & Impor Preset**: Fitur untuk menyimpan dan berbagi file preset JSON antar tim QA
* [x] **Validasi Konfigurasi Startup**: Pengecekan otomatis integritas file `clients.js` dan `scenarios.js` (`validator.js`)
* [x] **Sesi CLI Berkelanjutan**: Opsi paska-test (*Return to Main Menu / Exit*) agar CLI tidak langsung tertutup setelah eksekusi
