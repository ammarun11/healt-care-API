const HospitalModel = require("../../models/hospital.model")
const CityModel = require("../../models/city.model")

class UpdateHospital {
    static async update(id, updated_data) {
        let { name, address, phone, city_id, fresh } = updated_data
        let opts = {
            new: fresh === "true" ? false : true
        }
        let data = {
            name,
            address,
            phone,
            city_id,
            updated_at: Date.now()
        }

        try {

            let check = await CityModel.findOne({
                _id: city_id
            }).exec()

            if (check === null) {
                throw new Error("City_id not found")
            }


            let query = await HospitalModel.findOneAndUpdate({
                _id: id
            }, data, opts).exec()

            return query
        } catch (err) {
            throw err
        }

    }
}

module.exports = UpdateHospital