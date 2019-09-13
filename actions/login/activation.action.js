const User = require("../../models/user.model")
const Notif = require("../notifications/Notif.action")
// var date_now = Date.now();
// var token_after = null;
class Activation {
    constructor(token) {
        // this.password = password
        this.token = token
    }

    async exec() {
        try {

            let data = await User.findOne({
                activation_token: this.token
            }).exec()

            if(data === null) {
                throw new Error("Data not found")
            }

            // let data = await new ShowPassword({
            //     token: this.token
            // }).exec()

            // let password = bcrypt.hashSync(this.password, 8)
            // let user = await User.findOne({
            //     email: data.email
            // }).exec()

            // if(user === null) {
            //     throw new Error("User not found")
            // }

            let updateUser = await User.findOneAndUpdate({
                _id: data._id
            }, {
                activated_at : Date.now(),
                activation_token : null
                
            }).exec()

            /// Notif Bila user telah sukses aktivasi.
            let notif_data = {
                title : "Aktivasi User",
                message : "User Telah Aktiv",
                user_id : data._id
            }

            await new Notif(notif_data).exec()

            return updateUser
        } catch(err) {
            throw err
        }
    }
}

module.exports = Activation