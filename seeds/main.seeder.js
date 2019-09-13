/*
Dimohon untuk memberi comment pada baris yang mau dieksekusi (run).
*/

const roleSeeder = require("./role.seeder");
const userSeeder = require("./user.seeder");
const citiesSeeder = require("./city.group.seeder")
const citiesSingle = require("./city.single.seeder");
//const hospitalSeeder = require("./hospital.seeder");
const polySeeder = require("./poly.seeder");

 roleSeeder;
 userSeeder;
 citiesSeeder;
 citiesSingle;
//hospitalSeeder;
polySeeder;

setTimeout(() => {
    process.exit(0);
}, 50000);
