export class Jackal{
    constructor(page){
        this.page = page;
        this.keberangkatan = page.locator('#keberangkatan');
        this.tujuan = page.locator('#tujuan');
        this.tanggal_pergi = page.locator('input.tgl_berangkat[type="text"]');;
        this.next_month_btn = page.locator('.flatpickr-next-month');
        this.jumlah_penumpang = page.locator('.ss-main .ss-single-selected span:has-text("Orang")');
        this.cari_btn = page.locator('button:has-text("Cari Tiket")');
        this.pilihjadwal_btn_first = page.locator('a:has-text("Pilih")').first();

        this.nama_pemesan = page.locator('#pemesan');
        this.email_pemesan = page.locator('#email');
        this.nohp_pemesan = page.locator('#nohp');
        this.alamat_pemesan = page.locator('#alamat');
        this.carikursi_btn = page.locator('button:has-text("Selanjutnya")');

        this.kursi_tersedia = page.locator('div.seat-blank');
        this.pembayaran_btn = page.locator('button:has-text("Selanjutnya")');
    }

    getNamaPenumpang(i) {
        return this.page.locator(`#penumpang${i}`);
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

    async isiJumlahPenumpang(value) {
        const selected = await this.page.locator('.ss-single-selected span:has-text("Orang")').innerText();
        if (selected !== `${value} Orang`) {
            await this.jumlah_penumpang.click();
            await this.page.locator(`.ss-option:has-text("${value}")`).click();
            await this.page.locator('body').click({ force: true }); // klik body untuk menutup dropdown setelah pilih opsi
        }
    }

    async cariTiket() {
        await this.cari_btn.click();
    }

    async pilihJadwal() {
        await this.pilihjadwal_btn_first.click();
    }
    
    async isiDataPenumpang(jml_penumpang, pemesan, penumpang) {
        const penumpang_dewasa = penumpang.PenumpangDewasa;
        await this.nama_pemesan.fill(pemesan.NamaPemesan);
        await this.email_pemesan.fill(pemesan.Email);
        await this.nohp_pemesan.fill(pemesan.NoHP);
        await this.alamat_pemesan.fill(pemesan.Alamat);
        for(let i = 0; i < jml_penumpang; i++){
            await this.getNamaPenumpang(i+1).fill(penumpang_dewasa[`Penumpang_${i+1}`].NamaPenumpang); 
        }
    }

    async cariKursi() {
        await this.carikursi_btn.click();
    }

    async pilihKursi(jml_penumpang) {
        for(let i = 0; i < jml_penumpang; i++){
            await this.kursi_tersedia.nth(i).click();
        }
        await this.pembayaran_btn.click();
    }

    async pilihMetodePembayaran(metode_bayar, platform_bayar){
        await this.getPlatformBayar(platform_bayar).click();
    }
}