const User = require("../../models/user.model")
const bcrypt = require("bcryptjs")
const { randomKey } = require("../../lib/generatorkey")
const SendMailtrap = require("../emails/sendemail")
const AktivToken = require("../../models/reset-password.model")
const token = randomKey(50, 'aA#')

class CreateUser {
    constructor(req) {
        this.name = req.body.name,
            this.email = req.body.email,
            this.username = req.body.username,
            this.password = req.body.password,
            this.phone = req.body.phone,
            this.gender = req.body.gender,
            this.activation_token = token,
            this.role_id = JSON.parse(req.body.role_id)
    }

    async create() {
        try {
            let password = bcrypt.hashSync(this.password, 8); // Enkripsi passworte


            await dataCreate.save();

            let request_data = {
                to: this.email,
                subject: "aktivasi token",
                text: `Token mu untuk aktivasi lur: ${token}`
            };

            await new SendMailtrap(request_data).exec();

            let insert_data = {
                name: this.name,
                email: this.email,
                phone: this.phone,
                username: this.username,
                phone: this.phone,
                gender: this.gender,
                password,
                role_id: (this.role_id),
                activation_token: token
            }

            let query = new User(insert_data);
            await query.save();

            return query
        } catch (err) {
            throw err;
        }
    }
}

module.exports = CreateUser;
