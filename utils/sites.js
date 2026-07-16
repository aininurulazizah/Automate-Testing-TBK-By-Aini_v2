import { Daytrans } from "../pages/daytrans";
import { Baraya } from "../pages/baraya";
import { Aragon } from "../pages/aragon";
import { Jackal } from "../pages/jackal";
import { Btm } from "../pages/btm";
import { Semeru } from "../pages/semeru"
import { Joglosemar } from "../pages/joglosemar";
import { Kruzz } from "../pages/kruzz";
import { Gracias } from "../pages/gracias";
import { Kpm } from "../pages/kpm";
import { Wbtrans } from "../pages/wbtrans";
import { Sadya } from "../pages/sadya";
import { Mstrans } from "../pages/mstrans";
import { Raputri } from "../pages/raputri";
import { Mrtrans } from "../pages/mrtrans";
import { Sunjaya } from "../pages/sunjaya";
import { Binasarana } from "../pages/binasarana";
import { Transkita } from "../pages/transkita";
import { Cgtrans } from "../pages/cgtrans";
import { Ztrans } from "../pages/ztrans";
import { Putraremaja } from "../pages/putraremaja";
import { Banyumili } from "../pages/banyumili";
import { Ctu } from "../pages/ctu";
import { Krakaline } from "../pages/krakaline";
import { Pelitamas } from "../pages/pelitamas";
import { Aoshuttle } from "../pages/aoshuttle";
import { Adibuzz } from "../pages/adibuzz";
import { Marita } from "../pages/marita";
import { Trikusuma } from "../pages/trikusuma";
import { Wisatakomodo } from "../pages/wisatakomodo";
import { Sariharum } from "../pages/sariharum";
import { Ats } from "../pages/ats";
import { Ans } from "../pages/ans";
import { Riyan } from "../pages/riyan";
import { Minanga } from "../pages/minanga";
import { Harumbsi } from "../pages/harumbsi";
import { Yantigroup } from "../pages/yantigroup";
import { Selamat } from "../pages/selamat";
import { Namaste } from "../pages/namaste";
import { Royalkencana } from "../pages/royalkencana";
import { Sabila } from "../pages/sabila";
import { Kupuayu } from "../pages/kupuayu";

import { testData } from "../test-data/reservasi_data";

export const sites = [
    {
        tag: '@daytrans', 
        urls: {
            production: 'https://www.daytrans.co.id/',
            staging: 'https://daytrans-web.asmat.app/'
        },
        locator: Daytrans, 
        data: testData.Daytrans, 
        roundTrip: false, 
        connectingRes: true
    },
    {
        tag: '@baraya',  
        urls: {
            production: 'https://www.baraya-travel.com/',
            staging: 'https://baraya-web.asmat.app/'
        },
        locator: Baraya, 
        data: testData.Baraya, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@aragon',  
        urls: {
            production: 'https://www.aragontrans.com/',
            staging: 'https://aragon-web.asmat.app/'
        },
        locator: Aragon, 
        data: testData.Aragon, 
        roundTrip: false, 
        connectingRes: false
    },
    {
        tag: '@jackal',  
        urls: {
            production: 'https://www.jackalholidays.com/',
            staging: 'https://jackal-web.asmat.app/'
        },
        locator: Jackal, 
        data: testData.Jackal, 
        roundTrip: true, 
        connectingRes: false
    },
    {  
        tag: '@btm',  
        urls: {
            production: 'https://www.btmshuttle.id/',
            staging: 'https://btm-web.asmat.app/'
        },
        locator: Btm, 
        data: testData.Btm, 
        roundTrip: false, 
        connectingRes: true
    },
    {
        tag: '@semeru',  
        urls: {
            production: 'https://www.semerutrans.com/',
            staging: 'https://semeru-web.asmat.app/'
        },
        locator: Semeru, 
        data: testData.Semeru, 
        roundTrip: false, 
        connectingRes: false
    },
    {
        tag: '@joglosemar', 
        urls: {
            production: 'https://www.joglosemarbus.com/',
            staging: 'https://joglosemar-web.asmat.app/'
        },
        locator: Joglosemar, 
        data: testData.Joglosemar, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@kruzz',  
        urls: {
            production: 'https://www.kruzz.id/',
            staging: 'https://kruzz-web.asmat.app/'
        },
        locator: Kruzz, 
        data: testData.Kruzz, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@gracias', 
        urls: {
            production: 'https://www.graciasshuttle.co.id/',
            staging: 'https://gracias-web.asmat.app/'
        },
        locator: Gracias, 
        data: testData.Gracias, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@kpm', 
        urls: {
            production: 'https://www.kpmtrans.id/',
            staging: 'https://kpm-web.asmat.app/'
        },
        locator: Kpm, 
        data: testData.Kpm, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@wbtrans',  
        urls: {
            production: 'https://www.wbtrans.id/',
            staging: 'https://wbtrans-web.asmat.app/'
        },
        locator: Wbtrans, 
        data: testData.Wbtrans, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@sadya', 
        urls: {
            production: 'https://booking.sadyatrans.com/',
            staging: 'https://sadyatrans-web.asmat.app/'
        },
        locator: Sadya, 
        data: testData.Sadya, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@mstrans',  
        urls: {
            production: 'https://www.mstrans.id/',
            staging: 'https://mstrans-web.asmat.app/'
        },
        locator: Mstrans, 
        data: testData.Mstrans, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@raputri', 
        urls: {
            production: 'https://www.raputri.com/',
            staging: 'https://raputri-web.asmat.app/'
        },
        locator: Raputri, 
        data: testData.Raputri, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@mrtrans', 
        urls: {
            production: 'https://www.mrtrans.co.id/',
            staging: 'https://mrtrans-web.asmat.app/'
        },
        locator: Mrtrans, 
        data: testData.Mrtrans, 
        roundTrip: false, 
        connectingRes: false
    },
    {
        tag: '@sunjaya',  
        urls: {
            production: 'https://www.sunjayaabadi.com/',
            staging: 'https://sunjaya-web.asmat.app/'
        },
        locator: Sunjaya, 
        data: testData.Sunjaya, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@binasarana', 
        urls: {
            production: 'https://www.booking.binasarana.co.id/',
            staging: 'https://binasarana-web.asmat.app/'
        },
        locator: Binasarana, 
        data: testData.Binasarana, 
        roundTrip: false, 
        connectingRes: false
    },
    {
        tag: '@transkita', 
        urls: {
            production: 'https://www.transkitashuttle.co.id/',
            staging: 'https://transkita-web.asmat.app/'
        },
        locator: Transkita, 
        data: testData.Transkita, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@cgtrans', 
        urls: {
            production: 'https://www.cgtrans.co.id/',
            staging: 'https://cgtrans-web.asmat.app/'
        },
        locator: Cgtrans, 
        data: testData.Cgtrans, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@ztrans', 
        urls: {
            production: 'https://www.ztrans.id/',
            staging: 'https://ztrans-web.asmat.app/'
        },
        locator: Ztrans, 
        data: testData.Ztrans, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@putraremaja', 
        urls: {
            production: 'https://shuttle.putraremaja.co.id/',
            staging: 'https://putraremaja-web.asmat.app/'
        },
        locator: Putraremaja, 
        data: testData.Putraremaja, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@banyumili',  
        urls: {
            production: 'https://www.banyumilitravel.id/',
            staging: 'https://banyumili-web.asmat.app/'
        },
        locator: Banyumili, 
        data: testData.Banyumili, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@ctu',  
        urls: {
            production: 'https://www.ctu-shuttle.com/',
            staging: 'https://ctu-web.asmat.app/'
        },
        locator: Ctu, 
        data: testData.Ctu, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@krakaline',  
        urls: {
            production: 'https://www.krakaline.com/',
            staging: 'https://krakaline-web.asmat.app/'
        },
        locator: Krakaline, 
        data: testData.Krakaline, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@pelitamas',  
        urls: {
            production: 'https://www.pelitamas.id/',
            staging: 'https://pelitamas-web.asmat.app/'
        },
        locator: Pelitamas, 
        data: testData.Pelitamas, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@aoshuttle',  
        urls: {
            production: 'https://web.aotransportbus.com/',
            staging: 'https://aoshuttle-web.asmat.app/'
        },
        locator: Aoshuttle, 
        data: testData.Aoshuttle, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@adibuzz',  
        urls: {
            production: 'https://www.adi-buzz.com/',
            staging: 'https://adibuzz-web.asmat.app/'
        },
        locator: Adibuzz, 
        data: testData.Adibuzz, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@marita',  
        urls: {
            production: 'https://www.maritatrans.com/',
            staging: 'https://marita-web.asmat.app/'
        },
        locator: Marita, 
        data: testData.Marita, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@trikusuma',  
        urls: {
            production: 'https://www.trikusuma.com/',
            staging: 'https://trikusuma-web.asmat.app/'
        },
        locator: Trikusuma, 
        data: testData.Trikusuma, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@wisatakomodo',  
        urls: {
            production: 'https://www.buswisatakomodo.com/',
            staging: 'https://wiskom-web.asmat.app/'
        },
        locator: Wisatakomodo, 
        data: testData.Wisatakomodo, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@sariharum', 
        urls: {
            production: 'https://www.sariharum.com/',
            staging: 'https://sariharum-web.asmat.app/'
        },
        locator: Sariharum, 
        data: testData.Sariharum, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@ats',  
        urls: {
            production: 'https://www.bus-ats.id/',
            staging: 'https://ats-web.asmat.app/'
        },
        locator: Ats, 
        data: testData.Ats, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@ans',  
        urls: {
            production: 'https://www.bus-ans.com/',
            staging: 'https://ans-web.asmat.app/'
        },
        locator: Ans, 
        data: testData.Ans, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@riyan',  
        urls: {
            production: 'https://www.riyantransport.com/',
            staging: 'https://riyantrans-web.asmat.app/'
        },
        locator: Riyan, 
        data: testData.Riyan, 
        roundTrip: true, 
        connectingRes: false //Round-trip true tapi belum ditemukan rute-nya
    }, 
    {
        tag: '@minanga',  
        urls: {
            production: 'https://www.minangaexpress.id/',
            staging: 'https://minanga-web.asmat.app/'
        },
        locator: Minanga, 
        data: testData.Minanga, 
        roundTrip: true, 
        connectingRes: false},
    {
        tag: '@harumbsi',  
        urls: {
            production: 'https://www.harumbsi.com/',
            staging: 'https://harumbsi-web.asmat.app/'
        },
        locator: Harumbsi, 
        data: testData.Harumbsi, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@yantigroup',  
        urls: {
            production: 'https://www.yantigroup.com/',
            staging: 'https://yantigroup-web.asmat.app/'
        },
        locator: Yantigroup, 
        data: testData.Yantigroup, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@selamat',  
        urls: {
            production: 'https://www.selamattrans.co.id/reservasi',
            staging: 'https://selamat-web.asmat.app/reservasi'
        },
        locator: Selamat, 
        data: testData.Selamat, 
        roundTrip: false, 
        connectingRes: false
    },
    {
        tag: '@namaste',  
        urls: {
            production: 'https://www.namasteshuttle.com/',
            staging: 'https://namaste-web.asmat.app/'
        },
        locator: Namaste, 
        data: testData.Namaste, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@royalkencana',  
        urls: {
            production: 'https://www.royalkencanabus.id/',
            staging: 'https://royalkencana-web.asmat.app/'
        },
        locator: Royalkencana, 
        data: testData.Royalkencana, 
        roundTrip: true, 
        connectingRes: false
    },
    {
        tag: '@sabila',  
        urls: {
            production: 'https://booking.sabilashuttle.co.id/',
            staging: 'https://sabila-web.asmat.app/'
        },
        locator: Sabila, 
        data: testData.Sabila, 
        roundTrip: false, 
        connectingRes: false // Round trip true tapi belum ditemukan rute tersedia
    }, 
    {
        tag: '@kupuayu',  
        urls: {
            production: 'https://www.kupuayutrans.com/',
            staging: 'https://kka-web.asmat.app/'
        },
        locator: Kupuayu, 
        data: testData.Kupuayu, 
        roundTrip: true, 
        connectingRes: false
    },
]