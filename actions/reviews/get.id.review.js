const ReviewModel = require ("../../models/review.model")
const HospitalModel = require("../../models/hospital.model")
const UserModel = require("../../models/user.model")

class GetReview {
    constructor(id) {
        this.id = id
    }

    async exec() {
        try {
            let query = await ReviewModel.findOne({
                hospital_id: this.id
            })
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

module.exports = GetReview