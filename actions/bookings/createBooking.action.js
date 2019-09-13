const BookingModel = require("../../models/booking.model");
const PolylModel = require("../../models/poly.model");
const UserModel = require("../../models/user.model");

class createBooking {
    constructor(req) {
        (this.code = req.body.code),
            (this.user_id = req.body.user_id),
            (this.description = req.body.description),
            (this.poly_id = req.body.poly_id),
            (this.booked_at = req.body.booked_at),
            (this.paid_at = req.body.paid_at);
    }

    async exec() {
        try {
            let user = await UserModel.findOne({
                _id: this.user_id
            }).exec();
            console.log(user);

            let poly = await PolylModel.findOne({
                _id: this.poly_id
            }).exec();
            console.log(poly);

            let query = new BookingModel({
                code: this.code,
                user_id: this.user_id,
                description: this.description,
                poly_id: this.poly_id,
                booked_at: this.booked_at,
                paid_at: this.paid_at
            });

            await query.save();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = createBooking;

