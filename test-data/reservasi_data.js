
function getTanggal(bulan) {
    const today = new Date();
    const day = today.getDate(); //Ambil tanggal di hari ini
    today.setDate(1); //Set tanggal jadi 1 agar tidak overflow
    today.setMonth(today.getMonth() + bulan); //Set bulan ke bulan setelah berapa 'bulan'
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); //Set tanggal terakhir di bulan tujuan
    today.setDate(Math.min(day,lastDay)); //Membandingkan tanggal hari ini (yang akan dipilih) dengan tanggal terakhir di bulan tujuan (misal tgl sekarang 31, tanggal terakhir di bulan target 28, maka yang dipilih 28)
    return today.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}); //Mengembalikan nilai tanggal tujuan
}

export const testData = {

    Daytrans: {
        Keberangkatan: "Dipatiukur",
        Tujuan: "Bekasi",
        TanggalPergi: getTanggal(1),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS",
        ConnectingReservation: {
            Keberangkatan: "Alfamart Prambanan",
            Tujuan: "Dipatiukur"
        },
        BiayaLainnya: {
            Potongan: [
                'potongan'
            ],
            Tambahan: [
                'biaya_admin',
                'biaya_asuransi',
                'biaya_cancellation',
                'biaya_missconnecting'
            ]  
        }
    },

    Baraya: {
        Keberangkatan: "Buah Batu",
        Tujuan: "Cibubur",
        TanggalPergi: getTanggal(1),
        TanggalPulang: getTanggal(2),
        JumlahPenumpang: {
            Dewasa: 2,
            Bayi: 0
        },
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS",
        BiayaLainnya: {

        }
    },

    Aragon: {
        Keberangkatan: "Bandung",
        Tujuan: "Jakarta",
        TanggalPergi: getTanggal(1),
        JumlahPenumpang : 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "qrissp"
    },

    Jackal: {
        Keberangkatan: "DIPATIUKUR 89 SEBRANG UNIKOM",
        Tujuan: "LIPPO CIKARANG",
        TanggalPergi: getTanggal(1),
        TanggalPulang: getTanggal(2),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Btm: {
        Keberangkatan: "PASTEUR (KUNAFE PUSAT OLEH-OLEH )",
        Tujuan: "BTM PANDEGLANG",
        TanggalPergi: getTanggal(1),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS",
        ConnectingReservation: {
            Keberangkatan: "BAYAH",
            Tujuan: "SUCI (HOTEL NINDYA BIODISTRICT )"
        }
    },

    Semeru: {
        Keberangkatan: "KALIDERES PERTAMINA",
        Tujuan: "BEKASI",
        TanggalPergi: getTanggal(1),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Joglosemar: {
        Keberangkatan: "BANJARNEGARA ALFAMART PRIGI [VIRTUAL POINT]",
        Tujuan: "NEX KOPI KLAMPOK [VIRTUAL POINT]",
        TanggalPergi: getTanggal(1),
        TanggalPulang: (() => {
            const d = new Date(getTanggal(2));  // Dua bulan dari hari ini
            d.setDate(d.getDate() - 1);         // Dikurang 1 hari
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric',});
        })(),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS",
        BiayaLainnya: {

        }
    },

    Kruzz: {
        Keberangkatan: "KRUZZ BANDUNG CIKAPAYANG",
        Tujuan: "KRUZZ SOREANG",
        TanggalPergi: (() => {
            const d = new Date(getTanggal(1));  // Satu bulan dari hari ini
            d.setDate(d.getDate() - 7);         // Dikurangi 7 hari
            const bulan = d.toLocaleDateString('id-ID', { month: 'long',});
            return  `${bulan} ${d.getDate()}, ${d.getFullYear()}`   // Format bulan saja dalam ID
        })(),
        TanggalPulang: (() => {
            const d = new Date(getTanggal(1));  // Satu bulan dari hari ini
            const bulan = d.toLocaleDateString('id-ID', { month: 'long',});
            return  `${bulan} ${d.getDate()}, ${d.getFullYear()}`   // Format bulan saja dalam ID
        })(),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS",
        BiayaLainnya: {

        }
    },

    Gracias: {
        Keberangkatan: "BALTOS",
        Tujuan: "BEKASI (MEGA BEKASI HYPERMALL)",
        TanggalPergi: (() => {
            const d = new Date(getTanggal(1));  // Satu bulan dari hari ini
            d.setDate(d.getDate() - 7);         // Dikurangi 7 hari
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric',});
        })(),
        TanggalPulang: (() => {
            const d = new Date(getTanggal(1));  // Satu bulan dari hari ini
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric',});
        })(),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS",
        BiayaLainnya: {

        }
    },

    Kpm: {
        Keberangkatan: "BALTOS",
        Tujuan: "PERINTIS",
        TanggalPergi: (() => {
            const d = new Date(getTanggal(1));  // Satu bulan dari hari ini
            d.setDate(d.getDate() - 7);         // Dikurangi 7 hari
            const bulan = d.toLocaleDateString('id-ID', { month: 'long',});
            return  `${bulan} ${d.getDate()}, ${d.getFullYear()}`   // Format bulan saja dalam ID
        })(),
        TanggalPulang: (() => {
            const d = new Date(getTanggal(1));  // Satu bulan dari hari ini
            const bulan = d.toLocaleDateString('id-ID', { month: 'long',});
            return  `${bulan} ${d.getDate()}, ${d.getFullYear()}`   // Format bulan saja dalam ID
        })(),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS",
        BiayaLainnya: {

        }
    },

    Wbtrans: {
        Keberangkatan: "BUAH BATU",
        Tujuan: "JABABEKA",
        TanggalPergi: (() => {
            const d = new Date(getTanggal(1));  // Satu bulan dari hari ini
            d.setDate(d.getDate() - 7);         // Dikurangi 7 hari
            const bulan = d.toLocaleDateString('id-ID', { month: 'long',});
            return  `${bulan} ${d.getDate()}, ${d.getFullYear()}`   // Format bulan saja dalam ID
        })(),
        TanggalPulang: (() => {
            const d = new Date(getTanggal(1));  // Satu bulan dari hari ini
            const bulan = d.toLocaleDateString('id-ID', { month: 'long',});
            return  `${bulan} ${d.getDate()}, ${d.getFullYear()}`   // Format bulan saja dalam ID
        })(),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS",
        BiayaLainnya: {

        }
    },

    Sadya: {
        Keberangkatan: "Bandung",
        Tujuan: "Bandar lampung",
        TanggalPergi: (() => {
            const d = new Date(getTanggal(1));  // Satu bulan dari hari ini
            d.setDate(d.getDate() - 7);         // Dikurangi 7 hari
            const bulan = d.toLocaleDateString('id-ID', { month: 'long',});
            return  `${bulan} ${d.getDate()}, ${d.getFullYear()}`   // Format bulan saja dalam ID
        })(),
        TanggalPulang: (() => {
            const d = new Date(getTanggal(1));  // Satu bulan dari hari ini
            const bulan = d.toLocaleDateString('id-ID', { month: 'long',});
            return  `${bulan} ${d.getDate()}, ${d.getFullYear()}`   // Format bulan saja dalam ID
        })(),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS",
        BiayaLainnya: {

        }
    },

    Mstrans: {
        Keberangkatan: "BUAH BATU",
        Tujuan: "BANJARAN",
        TanggalPergi: (() => {
            const d = new Date(getTanggal(1));  // Satu bulan dari hari ini
            d.setDate(d.getDate() - 7);         // Dikurangi 7 hari
            const bulan = d.toLocaleDateString('id-ID', { month: 'long',});
            return  `${bulan} ${d.getDate()}, ${d.getFullYear()}`   // Format bulan saja dalam ID
        })(),
        TanggalPulang: (() => {
            const d = new Date(getTanggal(1));  // Satu bulan dari hari ini
            const bulan = d.toLocaleDateString('id-ID', { month: 'long',});
            return  `${bulan} ${d.getDate()}, ${d.getFullYear()}`   // Format bulan saja dalam ID
        })(),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS",
        BiayaLainnya: {

        }
    },

    Pemesan1: {
        NamaPemesan: "Pemesan",
        Email: "pemesan@harakirimail.com",
        NoHP: "0812345678901",
        Alamat: "Bandung"
    },

    Pemesan2: {
        NamaPemesan: "Pemesan",
        Email: "pemesan2@harakirimail.com",
        NoHP: "0812345678902",
        Alamat: "Bandung"
    },

    Penumpang: {
        PenumpangDewasa: {
            Penumpang_1: {
                NamaPenumpang: "Penumpang Satu",
                JenisKelamin: "Laki-laki"
            },
            Penumpang_2: {
                NamaPenumpang: "Penumpang Dua",
                JenisKelamin: "Perempuan"
            },
            Penumpang_3: {
                NamaPenumpang: "Penumpang Tiga",
                JenisKelamin: "Perempuan"
            },
            Penumpang_4: {
                NamaPenumpang: "Penumpang Empat",
                JenisKelamin: "Laki-laki"
            },
            Penumpang_5: {
                NamaPenumpang: "Penumpang Lima",
                JenisKelamin: "Laki-laki"
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