export class Btm{
    constructor(page) {
        this.page = page;
        this.keberangkatan = page.locator('.ss-single-selected').first();
        this.tujuan = page.locator('.ss-single-selected').nth(1);
        this.tanggal_pergi = page.locator('input.datepicker[readonly]');
        this.next_month_btn = page.locator('.flatpickr-next-month');
        this.jumlah_penumpang = page.locator('.ss-main .ss-single-selected span:has-text("Orang")');
        this.cari_btn = page.locator('button:has-text("Cari Tiket")');
        this.pilihjadwal_btn_first = page.locator('button:has-text("Pilih")').first();

        this.nama_pemesan = page.locator('#pemesan');
        this.email_pemesan = page.locator('#email');
        this.nohp_pemesan = page.locator('input[name="telepon"]');
        this.carikursi_btn = page.locator('button:has-text("Pilih Kursi")');

        this.kursi_tersedia = page.locator('div.seat-blank');
        this.total_kursi_perarmada = 0;
        this.pilih_next_kursi_btn = page.locator('button:has-text("Pilih Kursi Selanjutnya")');
        this.pembayaran_btn = page.locator('button:has-text("Pembayaran")');

        this.check_ketentuan_btn = page.locator('label[for="tandaicheck"]');
        this.konfirmasi_pembayaran_btn = page.locator('button:has-text("Konfirmasi ")').first();
        this.konfirmasi_pembayaran_btn_modal = page.locator('button:has-text("Konfirmasi ")').nth(1);
    }

    getNamaPenumpang(i) {
        return this.page.locator(`#penumpang${i}`);
    }

    getPenumpangTerdaftar(i) { // Untuk mendapatkan data penumpang setelah isi data untuk memilih kursi
        return this.page.locator(`[data-passenger-index="${i}"]`);
    }

    getJumlahPindahArmada() {
        return this.page.locator(`[data-passenger-index="1"]`).count();
    }

    getJumlahKursi() {
        return this.kursi_tersedia.count();
    }

    getPlatformBayar(platform) {
        return this.page.locator(`img[alt=${platform}]`);
    }

    async closePopup(value) {
        while (await value.isVisible()) {
            await value.click();
            await this.page.waitForTimeout (1000);
        }
    }

    async isiKeberangkatan(value) {
        await this.keberangkatan.click();
        await this.page.locator('.ss-option', { hasText: value }).first().click();
    }

    async isiTujuan(value) {
        await this.tujuan.click();
        await this.page.locator('.ss-option', { hasText: value }).nth(1).click();
    }

    async isiTanggalPergi(value) {
        const date = new Date(value);
        const bulan = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
        const hari = date.getDate();
        const tahun = date.getFullYear();
        const tanggal_target_id = `${bulan} ${hari}, ${tahun}`; // Convert tanggal ke Bahasa Indonesia

        const tanggal_target = this.page.locator(`[aria-label="${tanggal_target_id}"]`);
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
            await this.page.locator(`.ss-option:has-text("${value} Orang")`).click();
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
        for(let i = 0; i < jml_penumpang; i++){
            await this.getNamaPenumpang(i+1).fill(penumpang_dewasa[`Penumpang_${i+1}`].NamaPenumpang); 
        }
    }

    async cariKursi() {
        let path = new URL(this.page.url()).pathname;
        while (path !== "/book/pilihkursi") {
          await this.carikursi_btn.click();
          await this.page.waitForLoadState('networkidle'); //nunggu navigasi selesai load
          path = new URL(this.page.url()).pathname;
        }
      }
      

    async pilihKursi(jml_penumpang) {
        for(let i = 0; i < jml_penumpang; i++){
            await this.getPenumpangTerdaftar(i+1).click();
            await this.kursi_tersedia.nth(i).click();
        }
    }

    async pilihKursiConnRes(jml_penumpang, n) {
        await this.pilihKursi(jml_penumpang)
    }

    async pilihKursiNextArmada() {
        await this.pilih_next_kursi_btn.click();
        await this.page.waitForTimeout(3000);
    }

    async klikBayar() {
        await this.pembayaran_btn.click();
    }

    async pilihMetodePembayaran(metode_bayar, platform_bayar) {
        await this.getPlatformBayar(platform_bayar).click();
    }

    async checklistKetentuan() {
        await this.check_ketentuan_btn.click();
    }

    async konfirmasiPembayaran() {
        await this.konfirmasi_pembayaran_btn.click();
        await this.konfirmasi_pembayaran_btn_modal.click();
    }
}