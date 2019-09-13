require("dotenv").config();
require("../db");
const City = require("../models/city.model");

const group_datas = [
    {
        name: "jabodetabek",
        description: "",
        parent: "",
        alias_name: [""]
    }
];

const cities = async group_datas => {
    await City.remove({}).exec();
    let id_cities = [];

    group_datas.forEach(async el => {
        let insert = new City(el);
        try {
            await insert.save();
            console.log(insert);
            id_cities.push(insert._id);
        } catch (err) {
            setTimeout(() => {
                process.exit(0);
            }, 1000);
        }
    });

};
module.exports = cities(group_datas);
