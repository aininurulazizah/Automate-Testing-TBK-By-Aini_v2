## Automated Testing - Reservasi Tiket Bus - Trans Berjaya Khatulistiwa (TBK)
### Deskripsi
Proyek ini automasi testing untuk proses pemesanan tiket bus pada beberapa penyedia layanan di TBK : Daytrans, Baraya, Aragon, dan Jackal.

### Tools
- Playwright
- Visual Studio Code
### Cara Menjalankan
1. Install dependensi yang dibutuhkan
2. Menjalankan test semua website :
    ```
    npx playwright test ./reservasi_test.spec.js --project=chromium --headed --workers=1
    ```
4. Menjalankan test pada mitra tertentu :
    ```
    npx playwright test ./reservasi_test.spec.js --project=chromium --headed --workers=1 --grep '@[nama_mitra]'
    ```
    Contoh melakukan testing pada Daytrans :
    ```
    npx playwright test ./reservasi_test.spec.js --project=chromium --headed --workers=1 --grep '@Daytrans'
    ```
5. Menjalankan test untuk kondisi case tertentu, misalnya jalankan test case reservasi dengan kondisi pulang pergi (Rountrip) :
    ```
    npx playwright test ./reservasi_test.spec.js --project=chromium --headed --workers=1 --grep '[kondisi]'
    ```
    Contoh melakukan testing reservasi pulang pergi : 
    ```
    npx playwright test ./reservasi_test.spec.js --project=chromium --headed --workers=1 --grep 'Round Trip'
    ```
    Ini akan dijalankan di semua mitra yang memiliki kondisi yang case tersebut.
7. Menjalankan test spesifik (kondisi tertentu pada mitra tertentu) :
    ```
    npx playwright test ./reservasi_test.spec.js --project=chromium --headed --workers=1 --grep '[nama test case spesifik]'
    ```
    Contoh melakukan testing connecting reservation pada BTM :
    ```
    npx playwright test ./reservasi_test.spec.js --project=chromium --headed --workers=1 --grep '@Btm - Test Case 3 - Connecting Reservation'
    ```
    Daftar nama test case dapat dilihat di [Daftar Test Case](#daftar-test-case)

   Note : 
    `--project-chromium` jika ingin menggunakan webdriver tertentu, disini menggunakan chrome.
    `--headed` menampilkan proses automate testing berjalan. Hapus jika ingin membiarkan proses berjalan di latar belakang.
    `--workers=1` menentukan berapa jendela browser yang akan dijalankan. Default jendela browser adalah dua dan dijalankan secara paralel.
   
### Daftar Test Case
   | Mitra    | Case                   | Nama Test Case                                   |
   |----------|------------------------|--------------------------------------------------|
   | Daytrans | One Way Trip           | @daytrans - Test Case 1 - One Way Trip           |
   | Daytrans | Connecting Reservation | @daytrans - Test Case 3 - Connecting Reservation |  
   | Baraya   | One Way Trip           | @baraya - Test Case 1 - One Way Trip             |
   | Baraya   | Round Way Trip         | @baraya - Test Case 2 - Round Trip               |
   | Aragon   | One Way Trip           | @aragon - Test Case 1 - One Way Trip             |
   | Jackal   | One Way Trip           | @jackal - Test Case 1 - One Way Trip             |
   | Jackal   | Round Way Trip         | @jackal - Test Case 2 - Round Trip               |
   | Btm      | One Way Trip           | @btm - Test Case 1 - One Way Trip                |
   | Btm      | Connecting Reservation | @btm - Test Case 3 - Connecting Reservation      |

### Notes
- [Belum ada catatan untuk saat ini]
