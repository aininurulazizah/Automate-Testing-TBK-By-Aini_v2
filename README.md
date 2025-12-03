## Automated Testing - Reservasi Tiket Bus - Trans Berjaya Khatulistiwa (TBK)
### Deskripsi
Proyek ini automasi testing untuk proses pemesanan tiket bus pada beberapa penyedia layanan di TBK : Daytrans, Baraya, Aragon, dan Jackal.

### Tools
- Playwright

### Cara Menjalankan
1. Install dependensi yang dibutuhkan
2. Menjalankan test semua website :
    ```
    npx playwright test ./reservasi_test.spec.js --project=chromium --headed
    ```
4. Menjalankan test tertentu :
    ```
    npx playwright test ./reservasi_test.spec.js --project=chromium --headed --grep '@[nama_website]'
    ```
    Contoh melakukan testing pada Daytrans
    ```
    npx playwright test ./reservasi_test.spec.js --project=chromium --headed --grep '@Daytrans'
    ```
    `--project-chromium` jika ingin menggunakan satu webdriver yaitu chrome.
    `--headed` menampilkan proses automate testing berjalan. Hapus jika ingin membiarkan proses berjalan di latar belakang.

### Notes
- Saat ini setiap test case dijalankan diberikan `await page.pause();` agar jendela tidak langsung di-close untuk melihat hasil akhir. Akan muncul jendela debug, close untuk melanjutkan test di website lain
- Aragon masih dalam pengerjaan sehingga hasil testing failed
