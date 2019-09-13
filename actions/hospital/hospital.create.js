const HospitalModel = require("../../models/hospital.model")
const CityModel = require("../../models/city.model")

class Hospital {
    constructor(req) {
        this.name = req.body.name,
        this.address = req.body.address,
        this.phone = req.body.phone
        this.images_path = req.files
    }

    async exec() {
        try {
            let user = await CityModel.findOne({
                name: this.address
            }).exec();

            // console.log(typeof this.images)
            // console.log(this.images);
            let query = new HospitalModel({
                name: this.name,
                address: this.address,
                phone: this.phone,
                images_path: this.images_path,
                city_id: user._id
            });
            await query.save();

            return query;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Hospital;

/// Tak modif pakai class maap, untuk di pake ke middleware JWT

// const HospitalModel = require("../../models/hospital.model")
// class Hospital {
//     static async create(req) {
//         try {
//             let { name, address, phone, city_id } = req.body
//             let data = new HospitalModel({
//                 name,
//                 address,
//                 phone,
//                 city_id
//             })

//             await data.save()

//             return data
//         } catch(err) {
//             throw err
//         }
//     }

//     static async all() {
//         try {
//             let data = await HospitalModel.find({}).exec()

//             return data
//         } catch(err) {
//             throw err
//         }
//     }

// }

// module.exports = Hospital
