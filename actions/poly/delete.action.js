const Poly = require("../../models/poly.model");

class DeletePoly {
    constructor(id) {
        this.id = id
    }
    async delete() {
        try {
            let delete_at = Date.now()
            let query = await Poly.findOneAndUpdate(
                {
                _id: this.id
                },
                {
                    code: null,
                    name: null,
                    diseases: null,
                    description: null,
                    price: null,
                    hospital_id: null,
                    delete_at
                }
            ).exec()
            
            return query
        } catch (err) {
            throw err
        }
    }

}
module.exports = DeletePoly
