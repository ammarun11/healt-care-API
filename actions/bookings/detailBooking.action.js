const BookingModel = require("../../models/booking.model");
const PolyModel = require("../../models/poly.model");
const HospitalModel = require("../../models/hospital.model");

class getDetailBooking {
    constructor(id) {
        this.id = id;
    }
    async exec() {
        try {
            let query = await BookingModel.findOne({
                booking_id: this.id
            })
                .populate([
                    {
                        path: "hospital_id",
                        model: HospitalModel
                    },
                    {
                        path: "poly_id",
                        model: PolyModel
                    }
                ])
                .exec();

            return query;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = getDetailBooking;
