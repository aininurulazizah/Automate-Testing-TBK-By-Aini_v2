
function getTanggalBasedBulan(bulan) {
    const today = new Date();
    const day = today.getDate(); //Ambil tanggal di hari ini
    today.setDate(1); //Set tanggal jadi 1 agar tidak overflow
    today.setMonth(today.getMonth() + bulan); //Set bulan ke bulan setelah berapa 'bulan'
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); //Set tanggal terakhir di bulan tujuan
    today.setDate(Math.min(day,lastDay)); //Membandingkan tanggal hari ini (yang akan dipilih) dengan tanggal terakhir di bulan tujuan (misal tgl sekarang 31, tanggal terakhir di bulan target 28, maka yang dipilih 28)
    return today.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}); //Mengembalikan nilai tanggal tujuan
}

function getTanggalCustom({
    selang_bulan = 1,
    kurang_hari = 0,
    customMonthToIndo = false
}) {
    const d = new Date(getTanggalBasedBulan(selang_bulan));

    d.setDate(d.getDate() - kurang_hari);

    if (customMonthToIndo) {
        const namaBulan = d.toLocaleDateString('id-ID', { month: 'long' });
        return `${namaBulan} ${d.getDate()}, ${d.getFullYear()}`;

    } else {
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'});
    }
}

export const testData = {

    Daytrans: {
        Keberangkatan: "Dipatiukur",
        Tujuan: "Bekasi",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: false
        }),
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
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: false
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 2,
            kurang_hari: 0,
            customMonthToIndo: false
        }),
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
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: false
        }),
        JumlahPenumpang : 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "qrissp"
    },

    Jackal: {
        Keberangkatan: "DIPATIUKUR 89 SEBRANG UNIKOM",
        Tujuan: "LIPPO CIKARANG",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: false
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 2,
            kurang_hari: 0,
            customMonthToIndo: false
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Btm: {
        Keberangkatan: "PASTEUR (KUNAFE PUSAT OLEH-OLEH )",
        Tujuan: "BTM PANDEGLANG",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: false
        }),
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
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: false
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Joglosemar: {
        Keberangkatan: "BANJARNEGARA ALFAMART PRIGI [VIRTUAL POINT]",
        Tujuan: "NEX KOPI KLAMPOK [VIRTUAL POINT]",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: false
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 2,
            kurang_hari: 1,
            customMonthToIndo: false
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Kruzz: {
        Keberangkatan: "KRUZZ BANDUNG CIKAPAYANG",
        Tujuan: "KRUZZ SOREANG",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Gracias: {
        Keberangkatan: "BALTOS",
        Tujuan: "BEKASI (MEGA BEKASI HYPERMALL)",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: false
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: false
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Kpm: {
        Keberangkatan: "BALTOS",
        Tujuan: "PERINTIS",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Wbtrans: {
        Keberangkatan: "BUAH BATU",
        Tujuan: "JABABEKA",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Sadya: {
        Keberangkatan: "Bandung",
        Tujuan: "Bandar lampung",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Mstrans: {
        Keberangkatan: "BUAH BATU",
        Tujuan: "BANJARAN",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Raputri: {
        Keberangkatan: "BUAH BATU",
        Tujuan: "CIGANEA",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: false
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: false
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Mrtrans: {
        Keberangkatan: "Pasteur",
        Tujuan: "KEBON JERUK",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Sunjaya : {
        Keberangkatan: "BALIKPAPAN",
        Tujuan: "SANGATTA",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "GOPAY"
    },

    Binasarana : {
        Keberangkatan: "BINA SARANA PASTEUR KUNAFE",
        Tujuan: "BINASARANA X BURGERKING SAWANGAN",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Transkita : {
        Keberangkatan: "PASTEUR - KUNAFE SUPERMARKET OLEH-OLEH",
        Tujuan: "BALARAJA BARAT",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Cgtrans : {
        Keberangkatan: "CILACAP",
        Tujuan: "SEMARANG",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Ztrans : {
        Keberangkatan: "Tamansari",
        Tujuan: "Alfamart perumnas",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: false
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: false
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Putraremaja : {
        Keberangkatan: "Agen pr hotel candra kirana jogja",
        Tujuan: "4u cafe resto ungaran",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: false
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: false
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Banyumili : {
        Keberangkatan: "BALIKPAPAN BANDARA",
        Tujuan: "BONTANG (SIMPANG 3 BONTANG)",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 2,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Ctu : {
        Keberangkatan: "BAROS/ ALFAMART RAYA",
        Tujuan: "GARUT/ INDOMARET ALADIN",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Krakaline : {
        Keberangkatan: "BAROS",
        Tujuan: "AREA FATMAWATI",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Pelitamas : {
        Keberangkatan: "TANGKEL SURAMADU BANGKALAN",
        Tujuan: "TERMINAL RONGGOSUKOWATI PAMEKASAN",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Aoshuttle : {
        Keberangkatan: "AEON MALL DELTAMAS",
        Tujuan: "HALTE CITY TOUR MONAS",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: false
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 2,
            kurang_hari: 0,
            customMonthToIndo: false
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Adibuzz : {
        Keberangkatan: "BEKASI TIMUR",
        Tujuan: "EXIT TOL BOYOLALI",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Marita : {
        Keberangkatan: "PINTU TOL BAROS CIMAHI",
        Tujuan: "INDOMARET MUWARDI 50 CIANJUR",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Trikusuma : {
        Keberangkatan: "BANJARNEGARA",
        Tujuan: "PURWOKERTO",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS",
        BiayaLainnya: {
            Tambahan: [
                {
                    biaya_antar: 0,
                    biaya_jemput: 0 
                }
            ]  
        }
    },

    Wisatakomodo : {
        Keberangkatan: "KANTOR UBUNG",
        Tujuan: "T TIRTONADI",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Sariharum : {
        Keberangkatan: "SARI HARUM BANDUNG",
        Tujuan: "LAMPUNG ITERA KOTA BARU",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Ats : {
        Keberangkatan: "PONTIANAK",
        Tujuan: "SEKADAU",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 28,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 24,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Ans : {
        Keberangkatan: "LUBUK BASUNG",
        Tujuan: "KOPO",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: true
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: true
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Riyan : {
        Keberangkatan: "TERMINAL KLATEN",
        Tujuan: "BUNTU",
        TanggalPergi: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 7,
            customMonthToIndo: false
        }),
        TanggalPulang: getTanggalCustom({
            selang_bulan: 1,
            kurang_hari: 0,
            customMonthToIndo: false
        }),
        JumlahPenumpang: 2,
        MetodeBayar: "Pembayaran Instan",
        PlatformBayar: "QRIS"
    },

    Pemesan1: {
        NamaPemesan: "Pemesan",
        Email: "pemesan@harakirimail.com",
        NoHP: "0812345678901",
        Alamat: "Bandung",
        JenisAntarJemput : "Jemput - Antar",
        AlamatJemput: "Jl. Jemput",
        AlamatAntar: "Jl. Antar"
    },

    Pemesan2: {
        NamaPemesan: "Pemesan",
        Email: "pemesan2@harakirimail.com",
        NoHP: "0812345678902",
        Alamat: "Bandung",
        JenisAntarJemput : "Jemput - Antar",
        AlamatJemput: "Jl. Jemput",
        AlamatAntar: "Jl. Antar"
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