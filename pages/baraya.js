export class Baraya {
    constructor(page){
        this.page = page;
        this.close_popup = page.locator('.close-pop-info');
        this.keberangkatan = page.locator('#dropdownOutlet');
        this.tujuan = page.locator('.col-12 .mx-0 .px-0 .btn-group #dropdownOutlet2');
        this.dropdown_tujuan = page.locator('#dropdown-outlet2');
        this.search_lokasi = page.locator('#dropdown-outlet2 #searchQuery');
        this.tanggal_pergi = page.locator('#tanggal');
        this.next_month_btn = page.locator('.flatpickr-next-month');
        this.checklist_tanggal_pulang = page.locator('#is_pp');
        this.tanggal_pulang = page.locator('#tanggal_pulang');
        this.jumlah_penumpang = page.locator('#penumpangInput');
        this.cari_btn = page.locator('#submit'); 
        this.pilihjadwal_btn_first = page.locator('button:has-text("Pilih")').first();

        this.nama_pemesan = page.locator('#pemesan');
        this.email_pemesan = page.locator('#email');
        this.nohp_pemesan = page.locator('[name="telepon"]');
        this.nama_penumpang = page.locator('#penumpang1');
        this.carikursi_btn = page.locator('button:has-text("Pilih Kursi")');

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
        await this.page.locator(`text=${value}`).first().click();
    }

    async isiTujuan(value) {
        await this.search_lokasi.fill(value);
        await this.page.waitForTimeout(1000);
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

    async isiDataPenumpang(value) {
        await this.nama_pemesan.fill(value.NamaPemesan);
        await this.nohp_pemesan.fill(value.NoHP);
        await this.email_pemesan.fill(value.Email);
        await this.nama_penumpang.fill(value.NamaPenumpang);
    }

    async cariKursi() {
        await this.carikursi_btn.click();
    }

    async pilihKursi() {
        await this.kursi_first.click();
    }
}