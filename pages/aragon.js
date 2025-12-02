export class Aragon {
    constructor(page){
        this.page = page;
        this.close_popup = page.locator('.close-pop-info')
        this.layanan_shuttle = page.locator('text=Shuttle');
        this.layanan_travel = page.locator('text=Travel');
        this.keberangkatan = page.locator('#berangkat');
        this.tujuan = page.locator('#tujuan');
        this.dropdown_tujuan = page.locator('#dropdown-outlet2');
        this.tanggal_pergi = page.locator('#tgl_berangkat');
        this.next_month_btn = page.locator('.flatpickr-calendar.animate.open > .flatpickr-months > .flatpickr-next-month');
        this.cari_btn = page.locator('#btn-send');
        this.pilihjadwal_btn_first = page.locator('a:has-text("Pesan")').first();

        // this.kursi_first = page.locator('td div[id]').first();
        this.kursi_first = page.locator('.seat-blank').first();
        this.isidata_btn = page.locator('button:has-text("Selanjutnya")');

        this.nama_pemesan = page.locator('#pemesan');
        this.email_pemesan = page.locator('#email');
        this.nohp_pemesan = page.locator('[name="telepon"]');
        this.nama_penumpang = page.locator('#penumpang1');
        // this.pembayaran_btn = page.locator('button:has-text("Selanjutnya")');
    }

    async closePopup(value) {
        while (await value.isVisible()) {
            await value.click(); 
            await this.page.waitForTimeout(1000);
        }
    }

    async isiKeberangkatan(value) {
        await this.keberangkatan.click();
        await this.page.locator(`text=${value}`).first().click();
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

    async cariTiket() {
        await this.cari_btn.click();
    }

    async pilihJadwal(){
        await this.pilihjadwal_btn_first.click();
    }

    async pilihKursi() {
        await this.kursi_first.click();
        console.log("Kursi terpilih");
    }

    async lanjutIsiData() {
        await this.isidata_btn.click();
        console.log("Button selanjutnya abis milih kursi terpilih");
    }

    async isiDataPenumpang(value) {
        await this.nama_pemesan.fill(value.NamaPemesan);
        await this.email_pemesan.fill(value.Email);
        await this.nohp_pemesan.fill(value.NoHP);
        await this.nama_penumpang.fill(value.NamaPenumpang);
    }

    async pilihPembayaran() {
        await this.pembayaran_btn.click();
    }
}