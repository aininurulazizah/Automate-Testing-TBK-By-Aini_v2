export class Daytrans{
    constructor(page) {
        this.page = page;
        this.close_popup = page.locator('.close-pop-info');
        this.keberangkatan = page.locator('#berangkat');
        this.tujuan = page.locator('#tujuan');
        this.dropdown_keberangkatan = page.locator('#dropdown-outlet');
        this.dropdown_tujuan = page.locator('#dropdown-outlet2');
        this.tanggal_pergi = page.locator('#tgl_berangkat');
        this.next_month_btn = page.locator('.flatpickr-next-month');
        this.jumlah_penumpang = page.locator('.ss-main .ss-single-selected'); // tidak pakai id karena display none
        this.cari_btn = page.locator('.btn-search');
        this.carijadwal_btn_first = page.locator('.btn-list-jadwal').first();
        this.pilihjadwal_btn_first = page.locator('button:has-text("Beli")').first();

        this.nama_pemesan = page.locator('#pemesan');
        this.email_pemesan = page.locator('#email');
        this.nohp_pemesan = page.locator('[name="telepon"]');
        this.nama_penumpang = page.locator('#penumpang1');
        this.carikursi_btn = page.locator('#submitModal');
        this.carikursi_confirm_btn = page.locator('#confirmSubmit');

        this.kursi_first = page.locator('table div[id]').first();
    }

    async closePopup(value) {
        while (await value.isVisible()) {
            await value.click(); 
            await this.page.waitForTimeout(1000);
        }
    }

    async isiKeberangkatan(value) {
        await this.keberangkatan.click();
        await this.dropdown_keberangkatan.locator(`text=${value}`).first().click();
    }

    async isiTujuan(value) {
        await this.tujuan.click();
        await this.dropdown_tujuan.locator(`text=${value}`).first().click();
    }

    async isiTanggalPergi(value) {
        const tanggal_target = this.page.locator(`[aria-label="${value}"]`);
        await this.tanggal_pergi.click();
        while(!(await tanggal_target.isVisible())){
            await this.next_month_btn.click();
        }
        await tanggal_target.click();
    }

    async isiJumlahPenumpang(value) {
        const selected = await this.page.locator('.ss-single-selected span:has-text("Orang")').innerText();
        if (selected !== `${value} Orang`) {
            await this.jumlah_penumpang.click();
            await this.page.locator(`.ss-option:has-text("${value}")`).click();
            await this.page.mouse.click(5, 5); // klik random untuk menutup dropdown setelah pilih opsi
        }
    }

    async cariTiket() {
        await this.cari_btn.click();
    }

    async pilihJadwal(){
        await this.carijadwal_btn_first.click();
        await this.pilihjadwal_btn_first.click();
    }

    async isiDataPenumpang(value) {
        await this.nama_pemesan.fill(value.NamaPemesan);
        await this.email_pemesan.fill(value.Email);
        await this.nohp_pemesan.fill(value.NoHP);
        await this.nama_penumpang.fill(value.NamaPenumpang);
    }

    async cariKursi() {
        await this.carikursi_btn.click();
        await this.carikursi_confirm_btn.click();
    }

    async pilihKursi() {
        await this.kursi_first.click();
    }
}
