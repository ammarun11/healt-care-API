const ResetPassword = require("../../models/reset-password.model");
const User = require("../../models/user.model");
const { randomKey } = require("../../lib/generatorkey");
const SendMailtrap = require("../emails/sendemail");
const Notif = require("../notifications/Notif.action");

class LupaPassword {
    constructor(email) {
        this.email = email;
    }

    async exec() {
        try {
            let user = await User.findOne({
                email: this.email
            }).exec();

            if (user === null) {
                throw new Error("User not found");
            }

            let token = randomKey(54, "aA#");
            let password = new ResetPassword({
                email: this.email,
                token
            });
            await password.save();

            let request_data = {
                to: this.email,
                subject: "Lupa Password lur",
                text: `Token mu untuk di reset lur: ${token}`
            };

            await new SendMailtrap(request_data).exec();

            /// Notif Untuk Lupa password.
            let notif_data = {
                title: "lupa password",
                message: "kirim token untuk reset password",
                user_id: user._id
            };

            await new Notif(notif_data).exec();
            return password;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = LupaPassword;
