const ReviewModel = require("../../models/review.model")
const HospitalModel = require("../../models/hospital.model")
const UserModel = require("../../models/user.model")

class Review {
    constructor(req) {
        this.hospital_id = req.body.hospital_id,
            this.rate = req.body.rate,
            this.comment = req.body.comment,
            this.user_id = req.body.user_id
    }

    async exec() {
        try {
            let user = await UserModel.findOne({
                _id: this.user_id
            }).exec();

            console.log(user);

            let hospital = await HospitalModel.findOne({
                _id: this.hospital_id
            }).exec();

            console.log(hospital);

            let query = new ReviewModel({
                hospital_id: hospital._id,
                rate: this.rate,
                comment: this.comment,
                user_id: user._id
            });
            await query.save();

            return query;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Review;

