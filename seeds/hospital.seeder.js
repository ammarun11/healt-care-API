require("dotenv").config();
require("../db");
const City = require("../models/city.model");
const Hospital = require("../models/hospital.model");

const hospital_datas = [
    {
        name: "RSU Harapan Bunda",
        address: "Jalan Kalimalang No. 54",
        phone: "0812364456",
        city_id: ""
    },
    {
        name: "RSU Mitra Keluarga",
        address: "Jalan JatiAsih No. 78",
        phone: "0856897554",
        city_id: ""
    },
    {
        name: "RSI Husada",
        address: "Jalan Tambun Utara No. 03",
        phone: "0818478764",
        city_id: ""
    }
];

const seed = async (hospital_datas) => {
    console.log("Seed running hospital")
    console.log('=====================')
    await Hospital.remove({}).exec()
    let hospital = []
    let data = await City.findOne({
        name: "bekasi"
    }).exec()

    hospital_datas.forEach(async(el) => {
        el.city_id=data._id
    let insert = new Hospital(el)

    try {
        await insert.save()
        console.log(insert)
        hospital.push(insert._id)
    } catch(err) {
        console.log('=====================')
        console.error(err.message)
        setTimeout(() => {
            process.exit(0)
        }, 1000)
    }
    // if(hospital_datas.length === Hospital.length) {
    //     console.log('=====================')
    //     console.log('Seed success')
    //     setTimeout(() => {
    //         process.exit(0)
    //     }, 1000)
    // }
})

}


seed(hospital_datas)