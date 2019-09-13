const NotifModel = require("../../models/notification.model")


class detailNotif {
    constructor(id) {
        this.id = id
    }

    async exec() {
        try {

            let data_user = await NotifModel.findOne({
                _id: this.id
            }).exec()

            if (data_user === null ) {
                throw new Error("Notif ga ada lur")
            }

            let user_data = await NotifModel.findOneAndUpdate({
                _id:data_user._id
            }, {
                is_read : true,
                updated_at: Date.now()
            }, {new : true}).exec()
            
            //console.log(`Heii kau sudah baca notif yaa ${user_data}`)

            return user_data; 
        } catch (err) {
            throw err;
            
        }
    }

}

module.exports = detailNotif