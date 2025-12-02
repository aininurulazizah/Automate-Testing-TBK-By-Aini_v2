import { test, expect } from "@playwright/test"
import { Daytrans } from "../pages/daytrans";
import { Baraya } from "../pages/baraya";
import { Aragon } from "../pages/aragon";
import { Jackal } from "../pages/jackal";
import { testData } from "../test-data/reservasi_data";

const sites = [
    {tag: '@daytrans', url: 'https://www.daytrans.co.id/', locator: Daytrans, data: testData.Daytrans},
    {tag: '@baraya', url: 'https://www.baraya-travel.com/', locator: Baraya, data: testData.Baraya},
    {tag: '@aragon', url: 'https://www.aragontrans.com/', locator: Aragon, data: testData.Aragon},
    {tag: '@jackal', url: 'https://www.jackalholidays.com/', locator: Jackal, data: testData.Jackal}
]

const data_Pemesan = testData.Pemesan;

const data_Penumpang = testData.Penumpang;

for (const site of sites) {

    test(`${site.tag} - Test Case 1 - Normal Flow`, async({page}) => {

        const web = new site.locator(page);
    
        await page.goto(site.url); // Buka url
        
        if(web.close_popup){ // Close popup jika ada
            await web.closePopup(web.close_popup);
        }

        await web.isiKeberangkatan(site.data.Keberangkatan); // Isi field keberagkatan

        await web.isiTujuan(site.data.Tujuan); // Isi field tujuan

        await web.isiTanggalPergi(site.data.TanggalPergi); // Isi field tanggal pergi

        if(web.jumlah_penumpang){
            await web.isiJumlahPenumpang(site.data.JumlahPenumpang); // Isi jumlah penumpang
        }

        await web.cariTiket(); // Cari tiket

        await web.pilihJadwal(); // Pilih Jadwal Keberangkatan

        const path = new URL(page.url()).pathname;

        if(path === "/book/pemesan") {
            console.log("Isi data dulu");
            await web.isiDataPenumpang(site.data.JumlahPenumpang, data_Pemesan, data_Penumpang);
            await web.cariKursi();
            await web.pilihKursi(site.data.JumlahPenumpang);
        } 
        
        else if(path === "/book/pilihkursi") {
            console.log("Isi kursi dulu");
            await web.pilihKursi();
            await web.lanjutIsiData();
            // await web.isiDataPenumpang(data_Penumpang.Penumpang_1);
        }

        await web.pilihMetodePembayaran(site.data.MetodeBayar, site.data.PlatformBayar);

        await page.waitForTimeout(2000);
        
    })

}