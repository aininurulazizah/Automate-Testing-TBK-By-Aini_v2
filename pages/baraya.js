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
        this.add_dewasa_btn = page.locator('#btnPlusDewasa');
        this.add_bayi_btn = page.locator('#btnPlusBayi');
        this.simpan_penumpang_btn = page.locator('button:has-text("Simpan")');
        this.cari_btn = page.locator('#submit'); 
        this.pilihjadwal_btn_first = page.locator('button:has-text("Pilih")').first();

        this.nama_pemesan = page.locator('#pemesan');
        this.email_pemesan = page.locator('#email');
        this.nohp_pemesan = page.locator('[name="telepon"]');
        this.nama_penumpang = page.locator('#penumpang1');
        this.carikursi_btn = page.locator('button:has-text("Pilih Kursi")');

        this.kursi_tersedia = page.locator('div.seat-blank');
        this.pembayaran_btn = page.locator('button:has-text("Pembayaran")');
    }

    getNamaPenumpang(i) {
        return this.page.locator(`#penumpang${i}`);
    }

    getNamaBayi(i) {
        return this.page.locator(`#bayi${i}`);
    }

    getPlatformBayar(platform) { // Untuk mendapatkan platform pembayaran setelah pilih metode bayar
        return this.page.locator(`img[alt=${platform}]`);
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

    async isiJumlahPenumpang(value) {
        let value_dewasa = Number(await this.page.locator('#inputDewasa').getAttribute('value'));
        let value_bayi = Number(await this.page.locator('#inputBayi').getAttribute('value'));
        await this.jumlah_penumpang.click();
        while(value_dewasa !== value.Dewasa){
            await this.add_dewasa_btn.click();
            value_dewasa++;
        }
        while(value_bayi !== value.Bayi){
            await this.add_bayi_btn.click();
            value_bayi++;
        }
        await this.simpan_penumpang_btn.click();
    }

    async cariTiket() {
        await this.cari_btn.click();
    }

    async pilihJadwal(){
        await this.pilihjadwal_btn_first.click();
    }

    async isiDataPenumpang(jml_penumpang, pemesan, penumpang) {
        const jml_dewasa = jml_penumpang.Dewasa;
        const jml_bayi = jml_penumpang.Bayi;
        const penumpang_dewasa = penumpang.PenumpangDewasa;
        const penumpang_bayi = penumpang.PenumpangBayi;
        await this.nama_pemesan.fill(pemesan.NamaPemesan);
        await this.email_pemesan.fill(pemesan.Email);
        await this.nohp_pemesan.fill(pemesan.NoHP);
        for(let i = 0; i < jml_dewasa; i++){
            await this.getNamaPenumpang(i+1).fill(penumpang_dewasa[`Penumpang_${i+1}`].NamaPenumpang); 
        }
        for(let i = 0; i < jml_bayi; i++){
            await this.getNamaBayi(i+1).fill(penumpang_bayi[`PenumpangBayi_${i+1}`].NamaPenumpang); 
        }
    }

    async cariKursi() {
        await this.carikursi_btn.click();
    }

    async pilihKursi(jml_penumpang) {
        const jml_dewasa = jml_penumpang.Dewasa;
        for(let i = 0; i < jml_dewasa; i++) {
            await this.kursi_tersedia.nth(i).click();
            console.log("Berhasil pilih kursi");
        }
        await this.pembayaran_btn.click();
        await this.page.waitForTimeout(5000);
    }

    async pilihMetodePembayaran(metode_bayar, platform_bayar){
        await this.getPlatformBayar(platform_bayar).click();
    }
}