# 🎭 Playwright QC Runner

Sebuah *tool* CLI internal yang dirancang khusus untuk Quality Assurance (QA/QC) engineer guna menyederhanakan jalannya otomatisasi pengujian reservasi multi-klien menggunakan Playwright.

Daripada harus mengingat dan mengetik perintah Playwright yang panjang dan rumit:

```bash
npx playwright test --project=chromium --headed --workers=2 --retries=1 --grep "@jackal.*One Way|@daytrans.*(One Way|Connecting)"
```

**QC Runner** menyediakan menu interaktif CLI untuk memilih klien, menyaring skenario yang sesuai, menentukan opsi eksekusi (*workers*, *retries*, *browser*, mode *headed*/*headless*), serta menghasilkan dan menjalankan perintah Playwright secara otomatis.

---

## 🚀 Fitur Utama (Features)

* ✅ **Pemilihan Klien Interaktif**:
  * Daftar lengkap (*Full list checkbox*)
  * Pencarian kata kunci (*Search keyword*)
  * Filter berdasarkan kapabilitas (*Capability filter*: RoundTrip / Connecting / OneWay)
  * Input masal / *Batch paste* dari pesan chat (Slack/Teams)
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
* ✅ **Penanganan Hasil Test**: Menangkap kode status eksekusi test (*pass/fail*) dengan ringkasan yang rapi tanpa memunculkan error *stack trace* mentah.

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

## 🗺️ Rencana Pengembangan (Roadmap)

### v1.0 - v1.3 ✅
* [x] Pemilihan Klien, Skenario, Browser, dan Mode Executed
* [x] Auto-Open HTML Report
* [x] Client Search & Batch Paste Request
* [x] State Persistence & Presets

### v1.4 ✅
* [x] Filter Klien Berdasarkan Kapabilitas (*Capability Filter*)
* [x] Konfigurasi Worker Concurrency (`--workers`) & Retries (`--retries`)
* [x] Dukungan Browser WebKit (Safari)
* [x] Mode Dry-Run / Output Command Only
* [x] Preset Export & Import JSON File Sharing
* [x] Validasi Otomatis Konfigurasi Startup (`validator.js`)
* [x] Penanganan Error & Ringkasan Eksekusi Test Terformat
