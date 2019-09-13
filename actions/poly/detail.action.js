const PolyModel = require ("../../models/poly.model")
const HospitalModel = require("../../models/hospital.model")
const CityModel = require("../../models/city.model")

class ShowPoly {
    constructor(id) {
        this.id = id
    }

    async exec() {
        try {
            let query = await PolyModel.findOne({
                _id: this.id
            }).populate([
                    {
                        path: 'hospital_id',
                        model: HospitalModel
                    }
                ]).exec()

            return query
        } catch(err) {
            throw err
        }
    }
}

module.exports = ShowPoly