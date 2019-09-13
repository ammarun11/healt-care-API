const Hospital = require("../../models/hospital.model")

class DeleteHospital {
    static async destroy(id) {
        try {

            let data = await Hospital.findOneAndUpdate({
                _id: id
            }, {
                    deleted_at: Date.now()

                }).exec()

            return data
        } catch (err) {
            throw err
        }
    }
}
module.exports = DeleteHospital