export class Jackal{
    constructor(page){
        this.page = page;
        this.keberangkatan = page.locator('#keberangkatan');
        this.tujuan = page.locator('#tujuan');
        this.tanggal_pergi = page.locator('input.tgl_berangkat[type="text"]');;
        this.next_month_btn = page.locator('.flatpickr-next-month');
        this.penumpang = page.locator('#penumpang');
        this.cari_btn = page.locator('button:has-text("Cari Tiket")');
        this.pilihjadwal_btn_first = page.locator('a:has-text("Pilih")').first();

        this.nama_pemesan = page.locator('#pemesan');
        this.email_pemesan = page.locator('#email');
        this.nohp_pemesan = page.locator('#nohp');
        this.alamat_pemesan = page.locator('#alamat');
        this.nama_penumpang = page.locator('#penumpang1');
        this.carikursi_btn = page.locator('button:has-text("Selanjutnya")');

        this.kursi_first = page.locator('table div[id]').first();
    }

    async closePopup(value) {
        while (await value.isVisible()) {
            await value.click(); 
            await this.page.waitForTimeout(1000);
        }
    }

    async isiKeberangkatan(value) {
        await this.page.selectOption('#keberangkatan', { label: value }, { force: true });
    }

    async isiTujuan(value) {
        await this.page.selectOption('#tujuan', { label: value }, { force: true });
    }

    async isiTanggalPergi(value) {
        const tanggal_target = this.page.locator(`[aria-label="${value}"]`);
        await this.tanggal_pergi.click();
        while(!(await tanggal_target.isVisible())){
            await this.next_month_btn.click();
        }
        await tanggal_target.click();
    }

    async cariTiket() {
        await this.cari_btn.click();
    }

    async pilihJadwal() {
        await this.pilihjadwal_btn_first.click();
    }
    
    async isiDataPenumpang(value) {
        await this.nama_pemesan.fill(value.NamaPemesan);
        await this.email_pemesan.fill(value.Email);
        await this.nohp_pemesan.fill(value.NoHP);
        await this.alamat_pemesan.fill(value.Alamat);
        await this.nama_penumpang.fill(value.NamaPenumpang);
    }

    async cariKursi() {
        await this.carikursi_btn.click();
    }

    async pilihKursi() {
        await this.kursi_first.click();
    }
}