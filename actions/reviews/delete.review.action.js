const Review = require("../../models/review.model")

class DeleteReview {
    static async destroy(id) {
        try {

            let data = await Review.findOneAndUpdate({
                _id: id
            }, {
                hospital_id: null,
                rate: null,
                comment: null,
                user_id: null,
                    deleted_at: Date.now()

                }).exec()

            return data
        } catch (err) {
            throw err
        }
    }
}
module.exports = DeleteReview