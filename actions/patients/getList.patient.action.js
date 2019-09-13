const PatientsModel = require ("../../models/patient.model")


class GetListPatients {
    constructor(query) {
        this.query = query
    }

    async getAll() {
        try {
            let query = await PatientsModel.find(this.query)
                .populate([
                    {
                        path: 'book_id',
                        model: BookingModel
                    }

                ]).exec()

            return query
        } catch(err) {
            throw err
        }
    }
}

module.exports = GetListPatients