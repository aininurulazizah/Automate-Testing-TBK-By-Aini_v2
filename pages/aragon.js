import { expect } from '@playwright/test';

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

        this.kursi_tersedia = page.locator('div.seat-blank[onclick]');
        this.isidata_btn = page.locator('button:has-text("Selanjutnya")');

        this.nama_pemesan = page.locator('input#pemesan');
        this.email_pemesan = page.locator('#email');
        this.nohp_pemesan = page.locator('[name="telepon"]');
        this.nama_penumpang = page.locator('#penumpang1');
        // this.pembayaran_btn = page.locator('button:has-text("Selanjutnya")');
    }

    getNamaPenumpang(i) { // Untuk mendapatkan object data penumpang dari data test
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
        console.log("button pesan diklik")
    }

    async pilihKursi(jml_penumpang) {
        for(let i = 0; i < jml_penumpang; i++) {
            // await this.kursi_tersedia.nth(i).waitFor({ state: 'visible' });
            // await this.kursi_tersedia.nth(i).click();
            // await expect(this.kursi_tersedia.nth(i)).toHaveClass(/seat-select/);
            const kursi = this.kursi_tersedia.nth(i);
            await kursi.waitFor({ state: 'visible' });
            await kursi.click();
            await expect(kursi).toHaveClass(/seat seat-blank flex-center/);
            console.log("Kursi terpilih");
        }
        await this.isidata_btn.click();
        console.log("Pilih kursi berhasil, sekarang isi data");
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

    async pilihPembayaran() {
        await this.pembayaran_btn.click();
    }

    async pilihMetodePembayaran(metode_bayar, platform_bayar){
        await this.getPlatformBayar(platform_bayar).click();
    }
}