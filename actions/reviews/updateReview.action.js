const Review = require("../../models/review.model");
const Hospital = require("../../models/hospital.model");
const User = require("../../models/user.model");

class UpdateReview {
    constructor(id, req) {
        (this.id = id),
            (this.hospital_id = req.body.hospital_id),
            (this.rate = req.body.rate),
            (this.comment = req.body.comment),
            (this.user_id = req.body.user_id);
    }

    async update() {
        try {

            let data = {
                _id: this.id,
                hospital_id: this.hospital_id,
                rate: this.rate,
                comment: this.comment,
                user_id: this.user_id,
                updated_at: Date.now()
            };
            let check_hospital = await Hospital.findOne({
                _id: this.hospital_id
            }).exec()

            if (check_hospital === null) {
                throw new Error("Hospital not found")
            }

            let check_user = await User.findOne({
                _id: this.user_id
            }).exec()

            if (check_user === null) {
                throw new Error("User not found")
            }

            let query = await Review.findOneAndUpdate(
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

module.exports = UpdateReview;
