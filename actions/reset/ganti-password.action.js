const ResetPassword  = require("../../models/reset-password.model")
const ShowPassword = require("./show-password.action")
const User = require("../../models/user.model")
const bcrypt = require("bcryptjs")
const Notif = require("../notifications/Notif.action")

class Reset {
    constructor(password, token ) {
        this.password = password,
        this.token = token
    }

    async exec() {

        try{
        let data = await new ShowPassword({
            token : this.token
        }).exec()

        let password = bcrypt.hashSync(this.password, 8) 
        let user = await User.findOne({
            email: data.email
        }).exec()
        
        if(user === null) {
            throw new Error("User Not found lur")
        }
        
        let created_changePassword_at = Date.now()

        let updateUser = await User.findOneAndUpdate({
            _id: user._id
        },{ 
            created_at: created_changePassword_at,
            password,
        }).exec()

        await ResetPassword.findOneAndDelete({
            token: this.token
        }).exec()

        /// Notif Untuk User telah ganti password.
        let notif_data = {
            title : "ganti password",
            message : "user telah mengganti passwordnya",
            user_id : data._id
        }

        await new Notif(notif_data).exec()

        return updateUser
    }catch(err) { 
    throw err
        }
    }
}

module.exports = Reset