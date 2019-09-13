require("dotenv").config();
require("../db");
const { randomKey } = require("../lib/generatorkey")
const code = randomKey(50, 'aA#')
const Poly = require("../models/poly.model");
const Hospital = require("../models/hospital.model");

// sumber: http://web.rshs.or.id/fasilitas/pelayanan-medis/instalasi-rawat-jalan/

const poly_datas = [
    {
        code: "",
        name: "Kebidanan dan Kandungan",
        diseases: ["USG Kebidanan", "USG Onkologi", "USG Ginekologi"],
        description: "Poly dengan harga promo setiap awal bulan",
        hospital_id: "",
        price: "900000",
        daily_capacity: "30",
    },
    {
        code: "",
        name: "Anak",
        diseases: ["Infeksi", "Nefrologi", "Endokrinologi"],
        description: "Poly terbaik di kotamu",
        hospital_id: "",
        price: "500000",
        daily_capacity: "20",
    },
    {
        code: "",
        name: "Saraf",
        diseases: ["Saraf Anak", "Saraf Tepi", "CVD"],
        description: "Bayar dengan OVO pasti dapat diskon",
        hospital_id: "",
        price: "700000",
        daily_capacity: "10",
    },
    {
        code: "",
        name: "Orthopaedi",
        diseases: ["Tulang Belakang", "Cedera Olahraga", "Tangan"],
        description: "Pre Order untuk mendapatkan pelayanan maksimal",
        hospital_id: "",
        price: "100000",
        daily_capacity: "30",
    },
    {
        code: "",
        name: "Kedokteran Jiwa",
        diseases: ["Psikiatri Dewasa", "Psikiatri Anak dan Remaja", "Psikiatri Adiksi"],
        description: "Poly sedang dalam tahap pengembangan, harap sesuaikan dengan jadwal terbaru",
        hospital_id: "",
        price: "125000",
        daily_capacity: "25",
    },
    {
        code: "",
        name: "Kulit dan Kelamin",
        diseases: ["Kosmetik Medik", "Venereology", "Infeksi bakteri & parasit"],
        description: "Pelayanan prima dengan harga murah",
        hospital_id: "",
        price: "250000",
        daily_capacity: "5",
    },
    {
        code: "",
        name: "THT-KL",
        diseases: ["Rinologi", "Audiologi-vestibuler", "Otologi"],
        description: "Khusus wanita ada harga spesial setiap akhir bulan",
        hospital_id: "",
        price: "175000",
        daily_capacity: "45",
    },
    {
        code: "",
        name: "Bedah Saraf",
        diseases: ["Skull Base", "Infeksi dan Fungsional", "Onkologi"],
        description: "Konsultasi bisa melalui Whatsapp dan Facebook tanpa ada tambahan biaya",
        hospital_id: "",
        price: "125000",
        daily_capacity: "25",
    },
    {
        code: "",
        name: "IGD",
        diseases: ["Umum", "Khusus", "Spesial"],
        description: "Pelayanan cepat dan tepat",
        hospital_id: "",
        price: "650000",
        daily_capacity: "100",
    }
];

const seed = async (poly_datas) => {
    console.log("Seed running poly");
    console.log("=====================");
    await Poly.remove({}).exec();
    let polies = [];
    let data1 = await Hospital.findOne({
        name: "RSU Harapan Bunda"
    }).exec()
    let data2 = await Hospital.findOne({
        name: "RSU Mitra Keluarga"
    }).exec()
    let data3 = await Hospital.findOne({
        name: "RSI Husada"
    }).exec()

    poly_datas.forEach(async (el) => {
        if (el.name === "Kebidanan dan Kandungan" || el.name === "Anak" || el.name === "Saraf") {
            el.hospital_id = data1._id;
        } else if (el.name === "Orthopaedi" || el.name === "Kedokteran Jiwa" || el.name === "Kulit dan Kelamin") {
            el.hospital_id = data2._id;
        } else if (el.name === "THT-KL" || el.name === "Bedah Saraf" || el.name === "IGD") {
            el.hospital_id = data3._id;
        }
    })

    poly_datas.forEach(async (el) => {
        el.code = code;
        let insert = new Poly(el);

        try {
            await insert.save();
            console.log(insert);
            polies.push(insert._id);
        } catch (err) {
            console.log("=====================");
            console.error(err.message);
            setTimeout(() => {
                process.exit(0);
            }, 40000);
        }
    });
};

module.exports = seed(poly_datas);
