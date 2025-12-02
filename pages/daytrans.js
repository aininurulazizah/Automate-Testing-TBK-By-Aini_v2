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
        this.carikursi_btn = page.locator('#submitModal');
        this.carikursi_confirm_btn = page.locator('#confirmSubmit');

        this.kursi_tersedia = page.locator('div.seat-blank');
        this.pembayaran_btn = page.locator('button:has-text("pembayaran")');
    }

    getNamaPenumpang(i) { // Untuk mendapatkan object data penumpang dari data test
        return this.page.locator(`#penumpang${i}`);
    }

    getPenumpangTerdaftar(i) { // Untuk mendapatkan data penumpang setelah isi data untuk memilih kursi
        return this.page.locator(`[data-passenger-index="${i}"]`);
    }

    getMetodeBayar(metode) { // Untuk mendapatkan metode pembayaran sesuai data test
        return this.page.locator(`#container-payment p:has-text("${metode}")`);
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
            await this.page.locator('body').click({ force: true }); // klik body untuk menutup dropdown setelah pilih opsi
        }
    }

    async cariTiket() {
        await this.cari_btn.click();
    }

    async pilihJadwal(){
        await this.carijadwal_btn_first.click();
        await this.pilihjadwal_btn_first.click();
    }

    async isiDataPenumpang(jml_penumpang, pemesan, penumpang) {
        const penumpang_dewasa = penumpang.PenumpangDewasa;
        await this.nama_pemesan.fill(pemesan.NamaPemesan);
        await this.email_pemesan.fill(pemesan.Email);
        await this.nohp_pemesan.fill(pemesan.NoHP);
        for(let i = 0; i < jml_penumpang; i++){
            await this.getNamaPenumpang(i+1).fill(penumpang_dewasa[`Penumpang_${i+1}`].NamaPenumpang); 
        }
    }

    async cariKursi() {
        await this.carikursi_btn.click();
        await this.carikursi_confirm_btn.click();
    }

    async pilihKursi(jml_penumpang) {
        for(let i = 0; i < jml_penumpang; i++){
            await this.getPenumpangTerdaftar(i+1).click();
            await this.kursi_tersedia.nth(i).click();
        }
        await this.pembayaran_btn.click();
    }

    async pilihMetodePembayaran(metode_bayar, platform_bayar){
        await this.getMetodeBayar(metode_bayar).click();
        await this.getPlatformBayar(platform_bayar).click();
    }
}
