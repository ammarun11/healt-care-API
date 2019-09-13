const notification = require("../../models/notification.model")
// const ShowAllHospital = require("../hospital/show-all.action")
// const UserModel = require("../../models/user.model")

class Notif {
    constructor(params) {
        this.title   = params.title,
        this.message = params.message,
        this.user_id = params.user_id
    }

    async exec() {
        try {
            let Data = new notification({
                title : this.title,
                message: this.message,
                user_id : this.user_id
            })

            await Data.save();  
            console.log(`Notif untuk user ${Data}`)

            return Data;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Notif

