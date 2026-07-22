# 🎭 Playwright QC Runner

Sebuah *tool* CLI untuk menyederhanakan jalannya otomatisasi reservasi menggunakan Playwright.

Daripada harus mengingat perintah Playwright yang panjang seperti:

```bash
npx playwright test ./reservasi_test.spec.js --project=chromium --headed --workers=1 --grep "@kruzz - Test Case 1 - One Way Trip"
```

QC Runner dynamic menyediakan menu interaktif untuk memilih:

*   **Klien** (*Client*)
*   **Skenario** (*Scenario*)
*   **Browser**

dan secara otomatis akan menghasilkan perintah Playwright yang tepat.

---

## 🚀 Fitur (Features)

### Fitur Saat Ini
*   ✅ **Memilih satu atau beberapa klien**
*   ✅ **Menyaring skenario** yang tidak didukung secara otomatis
*   ✅ **Memilih satu atau beberapa skenario**
*   ✅ **Memilih browser**
*   ✅ **Memilih mode eksekusi** (Headed / Headless)
*   ✅ **Membuka laporan HTML secara otomatis** setelah pengujian selesai
*   ✅ **Pratinjau perintah (*command preview*)** yang interaktif dan informatif
*   ✅ **Pencarian klien** (*Client search*)
*   ✅ **Preset konfigurasi** (*Presets*)
*   ✅ **Menyimpan pilihan sebelumnya & Quick Run** (*Save previous selections*)
*   ✅ **Menghasilkan perintah Playwright** secara otomatis
*   ✅ **Menjalankan Playwright** secara langsung

### Fitur yang Direncanakan
*   🔌 Arsitektur plugin
*   📦 Paket skenario kustom (*custom scenario packs*)
*   👥 Konfigurasi tim

---

## 📋 Persyaratan (Requirements)

*   Node.js 20+
*   npm
*   Playwright sudah terinstal

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

atau klik dua kali pada file:
```
Playwright QC Runner.bat
```

---

## 📂 Struktur Proyek (Project Structure)

```
qc/
├── config/
│   ├── clients.js
│   └── scenarios.js
├── prompts.js
├── runner.js
└── index.js
```

---

## ⚙️ Konfigurasi (Configuration)

### `clients.js`
Digunakan untuk mendefinisikan setiap klien yang didukung.

**Contoh:**
```javascript
{
    id: "jackal",
    name: "Jackal",
    tag: "@jackal",
    oneWay: true,
    roundTrip: true,
    connecting: false
}
```

**Penjelasan Kolom:**

| Kolom (*Field*) | Deskripsi |
| :--- | :--- |
| **id** | Pengenal internal |
| **name** | Nama yang ditampilkan pada menu |
| **tag** | Tag *grep* Playwright |
| **oneWay** | Mendukung reservasi satu arah (*one way*) |
| **roundTrip** | Mendukung reservasi pulang-pergi (*round trip*) |
| **connecting** | Mendukung reservasi transit (*connecting*) |

---

### `scenarios.js`
Digunakan untuk mendefinisikan setiap skenario reservasi.

**Contoh:**
```javascript
{
    id: "roundTrip",
    name: "Round Trip",
    grep: "Round Trip",
    supports: client => client.roundTrip
}
```

> 💡 Fungsi `supports()` digunakan untuk menentukan apakah klien yang dipilih mendukung skenario tersebut atau tidak.

---

## 🔄 Cara Kerja (How it Works)

```
Pilih Klien
        │
        ▼
Pilih Skenario
        │
        ▼
Pilih Browser
        │
        ▼
Hasilkan Perintah Playwright
        │
        ▼
Konfirmasi Jalankan
        │
        ▼
Eksekusi Playwright
```

---

## ➕ Menambahkan Klien Baru (Adding a New Client)

1. Buka file:
   ```
   qc/config/clients.js
   ```
2. Tambahkan kode berikut:
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

*Tidak diperlukan perubahan kode lainnya di file lain.*

---

## ➕ Menambahkan Skenario Baru (Adding a New Scenario)

1. Buka file:
   ```
   qc/config/scenarios.js
   ```
2. Tambahkan contoh kode berikut:
   ```javascript
   {
       id: "promo",
       name: "Promo",
       grep: "Promo",
       supports: () => true
   }
   ```

Skenario baru ini akan langsung muncul secara otomatis di menu CLI.

---

## 🗺️ Rencana Pengembangan (Roadmap)

### v1.0 ✅
*   [x] Pemilihan Klien
*   [x] Pemilihan Skenario
*   [x] Pemilihan Browser
*   [x] Menjalankan Playwright langsung dari CLI

### v1.1 ✅
*   [x] Mode Headed / Headless
*   [x] Membuka laporan HTML otomatis setelah *test* selesai
*   [x] Pratinjau perintah (*command preview*) yang lebih interaktif

### v1.2 ✅
*   [x] Fitur pencarian nama klien
*   [x] Fitur *Presets*
*   [x] Menyimpan pilihan terakhir yang digunakan

### v2.0
*   [ ] Arsitektur plugin
*   [ ] Paket skenario kustom (*custom scenario packs*)
*   [ ] Konfigurasi tim
