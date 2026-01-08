import { test, expect } from "@playwright/test"
import { Daytrans } from "../pages/daytrans";
import { Baraya } from "../pages/baraya";
import { Aragon } from "../pages/aragon";
import { Jackal } from "../pages/jackal";
import { Btm } from "../pages/btm";
import { testData } from "../test-data/login_data";

const sites = [
    {tag: '@daytrans', url: 'https://www.daytrans.co.id/', locator: Daytrans, data: testData.Daytrans, emailLogin: true},
    {tag: '@baraya', url: 'https://www.baraya-travel.com/', locator: Baraya, data: testData.Baraya, emailLogin: true},
    {tag: '@aragon', url: 'https://www.aragontrans.com/', locator: Aragon, data: testData.Aragon, emailLogin: false},
    {tag: '@jackal', url: 'https://www.jackalholidays.com/', locator: Jackal, data: testData.Jackal, emailLogin: true},
    {tag: '@btm', url: 'https://www.btmshuttle.id/', locator: Btm, data: testData.Btm, emailLogin: true}
]

for (const site of sites) {

    test.setTimeout(60000);

    test(`${site.tag} - Test Case 1 - Login Via Nomor Telepon`, async({page}) => {

        const web = new site.locator(page);

        await page.goto(site.url);

        if(web.close_popup){ // Close popup jika ada
            await web.closePopup(web.close_popup);
        }

        await web.klikButtonLogin();

        await web.pilihViaTelepon();

        await web.isiNoTelp(site.data.NoTelepon);

        await web.submitNoTelp();

        await web.isiOTP(); // Step Manual

        await web.submitOTP();

        const path_regis = new URL(page.url()).pathname;

        console.log(`path: ${path_regis}`);

        if(path_regis === "/daftar") { // Belum tau domain web lain apa
            const byTelpOrEmail = "byTelp"
            await web.isiDataRegistrasi(site.data, byTelpOrEmail);
        }

        await page.pause();

    })

    if(site.emailLogin) {

        test(`${site.tag} - Test Case 2 - Login Via Email`, async({page}) => {

            const web = new site.locator(page);
    
            await page.goto(site.url);
    
            if(web.close_popup){ // Close popup jika ada
                await web.closePopup(web.close_popup);
            }
    
            await web.klikButtonLogin();
    
            await web.pilihViaEmail();
    
            await web.isiEmail(site.data.Email);
    
            await web.submitEmail();
    
            await web.isiOTP(); // Step Manual
    
            await web.submitOTP();

            const path_regis = new URL(page.url()).pathname;

            if(path_regis === "/daftar") {
                const byTelpOrEmail = "byEmail";
                await web.isiDataRegistrasi(site.data, byTelpOrEmail);
            }
    
            await page.pause();
    
        })

    }

    test(`${site.tag} - Test Case 3 - Login Via Google Account`, async({page}) => {

        const web = new site.locator(page);

        await page.goto(site.url);

        if(web.close_popup){ // Close popup jika ada
            await web.closePopup(web.close_popup);
        }

        await web.klikButtonLogin();

        await web.pilihViaGoogle();

        await web.pilihAkun(); // Step Manual

        await page.pause();

    })

}