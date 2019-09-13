const PatientModel = require("../../models/patient.model");
const BookingModel = require("../../models/booking.model")

class DetailPatient {
  constructor(id) {
    this.id = id;
  }

  async exec() {
    try {
      let query = await PatientModel.findOne({
        _id: this.id
      })
        .populate([
          {
            path: "book_id",
            model: BookingModel
          }
        ])
        .exec();

      return query;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = DetailPatient;
