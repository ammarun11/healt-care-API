const BookingModel = require("../../models/booking.model");

class deleteBooking {
    constructor(id) {
        this.id = id;
    }
    async delete() {
        try {
            let query = await BookingModel.findOneAndUpdate(
                {
                    _id: this.id
                },
                {
                    code: null,
                    user_id: null,
                    description: null,
                    poly_id: null,
                    booked_at: null,
                    paid_at: null,
                    deleted_at: Date.now()
                }
            ).exec();

            return query;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = deleteBooking;
