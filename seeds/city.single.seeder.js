require("dotenv").config();
require("../db");
const City = require("../models/city.model");

const single_datas = [
    {
        name: "jakarta",
        description: "",
        parent: "",
        alias_name: ["dki", "batavia", "Jakarta"]
    },
    {
        name: "bogor",
        description: "",
        parent: "",
        alias_name: ["kota hujan", "kota beriman", "Bogor"]
    },
    {
        name: "depok",
        description: "",
        parent: "",
        alias_name: ["Depok"]
    },
    {
        name: "tangerang",
        description: "",
        parent: "",
        alias_name: ["Tangerang"]
    },
    {
        name: "bekasi",
        description: "",
        parent: "",
        alias_name: ["Bekasi"]
    }
];

const seed = async (single_datas) => {
    console.log("Seed running city single")
    console.log('=====================')
    
    let data = await City.findOne({
        name: "jabodetabek"
    }).exec()

    let cities = []
    single_datas.forEach(async(el) => {
        el.parent=data._id
    let insert = new City(el)
    try {
        await insert.save()
        console.log(insert)
        cities.push(insert._id)
    } catch(err) {
        console.log('=====================')
        console.error(err.message)
        setTimeout(() => {
            process.exit(0)
        }, 1000)
    }
    if(single_datas.length === cities.length) {
        console.log('=====================')
        console.log('Seed success')
        setTimeout(() => {
            process.exit(0)
        }, 1000)
    }
})}
module.exports = seed(single_datas)
