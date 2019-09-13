const NotifModel = require("../../models/notification.model")

class updateNotif {
    constructor(params) {
        this.title   = params.title,
        this.message = params.message,
        this.user_id = params.user_id
    // this.is_read = params.is_read,
    // this.updated_at = params.updated_at
    }

    async exec() {
        try {

            let Data = new NotifModel({
                title : this.title,
                message: this.message,
                user_id : this.user_id,
                is_read: true,
                updated_at : Date.now()
            })

            console.log(`Notif untuk user yang update ${Data}`)

            return Data; 
        } catch (err) {
            throw err;
            
        }
    }

}

module.exports = updateNotif