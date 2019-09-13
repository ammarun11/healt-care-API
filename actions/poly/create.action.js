const Poly = require("../../models/poly.model")
const HospitalModel = require("../../models/hospital.model")

class CreatePoly {
    constructor (req) {
        this.code = req.body.code,
        this.name = req.body.name,
        this.diseases = JSON.parse(req.body.diseases),
        this.description = req.body.description,
        this.price = req.body.price,
        this.hospital_id = req.body.hospital_id
    }

    async exec() {
        try {
            let hospital = await HospitalModel.findOne({
                _id : this.hospital_id
            }).exec();
            console.log(hospital);
            
            if (hospital === null) {
                throw new Error("Hospital not found")
            }

            let query = new Poly ({
                code : this.code,
                name : this.name,
                diseases : this.diseases,
                description : this.description,
                price : this.price,
                hospital_id : this.hospital_id
            });

            await query.save()

            console.log(query);
            return query
        } catch (err) {
            throw err
        }
    }
}

module.exports = CreatePoly
