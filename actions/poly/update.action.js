const Poly = require("../../models/poly.model");
const Hospital = require("../../models/hospital.model");


class UpdatePoly {
    constructor(id, req) {
        (this.id = id),
            (this.code = req.body.code),
            (this.name = req.body.name),
            (this.diseases = req.body.diseases),
            (this.description = req.body.description),
            (this.hospital_id = req.body.hospital_id),
            (this.price = req.body.price);
           
    }

    async update() {
        try {

            let data = {
                _id: this.id,
                code: this.code,
                name: this.name,
                diseases: this.diseases,
                description: this.description,
                hospital_id: this.hospital_id,
                price: this.price,
                rate: this.rate,
                updated_at: Date.now()
            };
            let check_hospital = await Hospital.findOne({
                _id: this.hospital_id
            }).exec()

            if (check_hospital === null) {
                throw new Error("Hospital not found")
            }

        
            let query = await Poly.findOneAndUpdate(
                {
                    _id: this.id
                },
                data
            ).exec();

            return query;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UpdatePoly;
