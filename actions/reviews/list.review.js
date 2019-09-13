const ReviewModel = require ("../../models/review.model")
const HospitalModel = require("../../models/hospital.model")
const UserModel = require("../../models/user.model")

class GetListReview {
    constructor(query) {
        this.query = query
    }

    async getAll() {
        try {
            let query = await ReviewModel.find(this.query)
                .populate([
                    {
                        path: 'hospital_id',
                        model: HospitalModel
                    },
                    {
                        path: 'user_id',
                        model: UserModel
                    }

                ]).exec()

            return query
        } catch(err) {
            throw err
        }
    }
}

module.exports = GetListReview