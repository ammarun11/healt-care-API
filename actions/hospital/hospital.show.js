const Hospital = require("../../models/hospital.model")
const City = require("../../models/city.model");
class ShowHospital {
    constructor(id) {
        this.id = id
    }

    async exec() {
        try {
            let query = await Hospital.findOne({
                _id: this.id
            })
                .populate([
                    {
                        path: 'city_id',
                        model: City
                    }
                ]).exec()

            return query
        } catch(err) {
            throw err
        }
    }
}

module.exports = ShowHospital
