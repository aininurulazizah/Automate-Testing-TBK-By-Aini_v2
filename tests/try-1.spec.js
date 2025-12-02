const {test, expect} = require('@playwright/test')

test('My first test with playwright - Open Browser', async({page}) => {

    await page.goto('https://www.daytrans.co.id/')
    await expect(page).toHaveTitle('Travel Antar Kota Provinsi | Shuttle Antar Kota 2022 | Daytrans')

})