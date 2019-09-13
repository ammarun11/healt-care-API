const BookingModel = require("../../models/booking.model");

class editBooking {
    constructor(id, req) {
        (this.id = id),
            (this.code = req.body.code),
            (this.user_id = req.body.user_id),
            (this.description = req.body.description),
            (this.poly_id = req.body.poly_id),
            (this.booked_at = req.body.booked_at),
            (this.paid_at = req.body.paid_at);
    }

    async exec() {
        try {
            let data = {
                code: this.code,
                user_id: this.user_id,
                description: this.description,
                poly_id: this.paid_id,
                booked_at: this.booked_at,
                paid_at: this.paid_at
            };
            let query = await BookingModel.findOneAndUpdate(
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

module.exports = editBooking;
