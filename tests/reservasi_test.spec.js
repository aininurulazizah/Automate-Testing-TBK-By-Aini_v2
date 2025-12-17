import { test, expect } from "@playwright/test"
import { Daytrans } from "../pages/daytrans";
import { Baraya } from "../pages/baraya";
import { Aragon } from "../pages/aragon";
import { Jackal } from "../pages/jackal";
import { Btm } from "../pages/btm";
import { testData } from "../test-data/reservasi_data";

const sites = [
    {tag: '@daytrans', url: 'https://www.daytrans.co.id/', locator: Daytrans, data: testData.Daytrans, roundTrip: false},
    {tag: '@baraya', url: 'https://www.baraya-travel.com/', locator: Baraya, data: testData.Baraya, roundTrip: true},
    {tag: '@aragon', url: 'https://www.aragontrans.com/', locator: Aragon, data: testData.Aragon, roundTrip: false},
    {tag: '@jackal', url: 'https://www.jackalholidays.com/', locator: Jackal, data: testData.Jackal, roundTrip: true},
    {tag: '@btm', url: 'https://www.btmshuttle.id/', locator: Btm, data: testData.Btm, roundTrip: false}
]

const data_Pemesan = testData.Pemesan;

const data_Penumpang = testData.Penumpang;

for (const site of sites) {

    test(`${site.tag} - Test Case 1 - One Way Trip`, async({page}) => {

        test.setTimeout(60000);

        const web = new site.locator(page);
    
        await page.goto(site.url);
        
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
            await web.isiDataPenumpang(site.data.JumlahPenumpang, data_Pemesan, data_Penumpang);
            await web.cariKursi();
            await web.pilihKursi(site.data.JumlahPenumpang);
        } 
        
        if(path === "/book/pilihkursi") {
            await web.pilihKursi(site.data.JumlahPenumpang);
            await web.isiDataPenumpang(site.data.JumlahPenumpang, data_Pemesan, data_Penumpang);
        }

        await web.pilihMetodePembayaran(site.data.MetodeBayar, site.data.PlatformBayar);

        await web.checklistKetentuan();

        await web.konfirmasiPembayaran();

        await expect(page.locator('body')).toBeVisible();

        // await page.pause();
        
    })

    if(site.roundTrip) {

        test(`${site.tag} - Test Case 2 - Round Trip`, async({page}) => {
        
            test.setTimeout(60000);
    
            const web = new site.locator(page);
    
            await page.goto(site.url);
    
            if(web.close_popup) {
                await web.closePopup(web.close_popup);
            }
    
            await web.isiKeberangkatan(site.data.Keberangkatan);
    
            await web.isiTujuan(site.data.Tujuan);
    
            await web.isiTanggalPergi(site.data.TanggalPergi);
    
            await web.checklistPP();  
    
            await web.isiTanggalPulang(site.data.TanggalPulang);
    
            if(web.jumlah_penumpang){
                await web.isiJumlahPenumpang(site.data.JumlahPenumpang); // Isi jumlah penumpang
            }
    
            await web.cariTiket(); // Cari tiket
    
            await web.pilihJadwal(); // Pilih Jadwal Keberangkatan
    
            await web.pilihJadwalPulang(); // Pilih Jadwal Pulang

            await web.isiDataPenumpang(site.data.JumlahPenumpang, data_Pemesan, data_Penumpang);
                
            await web.cariKursi();
                
            await web.pilihKursi(site.data.JumlahPenumpang);
                
            await web.pilihKursiPulang(site.data.JumlahPenumpang);
    
            await web.pilihMetodePembayaran(site.data.MetodeBayar, site.data.PlatformBayar);
    
            await web.checklistKetentuan();
    
            await web.konfirmasiPembayaran();
    
            await expect(page.locator('body')).toBeVisible();
    
        })

    }

}