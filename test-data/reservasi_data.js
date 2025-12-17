const tanggalPergi = tanggalPlus2Bulan();

const tanggalPulang = tanggalPlus3Bulan();

function tanggalPlus2Bulan() {
    const today = new Date();
    today.setMonth(today.getMonth() + 2);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
}

function tanggalPlus3Bulan() {
    const today = new Date();
    today.setMonth(today.getMonth() + 3);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
}

export const testData = {

    Daytrans: {
        Keberangkatan: "Bandung",
        Tujuan: "Jakarta",
        TanggalPergi: tanggalPergi,
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Baraya: {
        Keberangkatan: "Buah Batu",
        Tujuan: "Cibubur",
        TanggalPergi: tanggalPergi,
        TanggalPulang: tanggalPulang,
        JumlahPenumpang: {
            Dewasa: 2,
            Bayi: 0
        },
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Aragon: {
        Keberangkatan: "Bandung",
        Tujuan: "Jakarta",
        TanggalPergi: tanggalPergi,
        JumlahPenumpang : 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "qrissp"
    },

    Jackal: {
        Keberangkatan: "BUAH BATU (POOL TRANSIT)",
        Tujuan: "CIBUBUR",
        TanggalPergi: tanggalPergi,
        TanggalPulang: tanggalPulang,
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Btm: {
        Keberangkatan: "PASTEUR (KUNAFE PUSAT OLEH-OLEH )",
        Tujuan: "BTM PANDEGLANG",
        TanggalPergi: tanggalPergi,
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Pemesan: {
        NamaPemesan: "Pemesan",
        Email: "pemesan@harakirimail.com",
        NoHP: "081234567890",
        Alamat: "Bandung"
    },

    Penumpang: {
        PenumpangDewasa: {
            Penumpang_1: {
                NamaPenumpang: "Penumpang Satu"
            },
            Penumpang_2: {
                NamaPenumpang: "Penumpang Dua"
            },
            Penumpang_3: {
                NamaPenumpang: "Penumpang Tiga"
            },
            Penumpang_4: {
                NamaPenumpang: "Penumpang Empat"
            },
            Penumpang_5: {
                NamaPenumpang: "Penumpang Lima"
            }
        },
        PenumpangBayi: {
            PenumpangBayi_1: {
                NamaPenumpang: "Penumpang Bayi Satu"
            },
            PenumpangBayi_2: {
                NamaPenumpang: "Penumpang Bayi Dua"
            },
            PenumpangBayi_3: {
                NamaPenumpang: "Penumpang Bayi Tiga"
            }
        }
    }

};