const PatientModel = require("../../models/patient.model");
const { randomKey } = require("../../lib/generatorkey");
const BookingModel = require("../../models/booking.model")
const code = randomKey(50, "aA#");

class Patient {
    constructor(req) {
        this.code = code,
            this.id_number = id_number,
            this.id_type = id_type,
            this.title = title,
            this.name = req.body.name,
            this.gender = req.body.gender,
            this.dob = dob,
            this.age = req.body.age,
            this.address = req.body.address,
            this.book_id = req.body.book_id
    }

    async exec() {
        try {

            let book = await BookingModel.findOne({
                _id: this.book_id
            }).exec();

            console.log(book);

            if (book === null) {
                throw new Error("Book_id not found")
            }

            let CODE = this.code.toUpperCase();

            let query = new PatientModel({
                code: CODE,
                id_number: this.id_number,
                id_type: this.id_type,
                title: this.title,
                name: this.name,
                gender: this.gender,
                dob: this.dob,
                age: this.age,
                address: this.address,
                book_id: book._id

            });
            await query.save();

            console.log(query);


            return query
        } catch (err) {
            throw err;
        }
    }
}


module.exports = Patient;
