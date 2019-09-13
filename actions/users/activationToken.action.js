const User = require("../../models/user.model")
// const aktiv = require("../../models/reset.model")
// const getAll = require("../users/getall.action")

class AktivToken {
    constructor(token) {
        this.token =  token
    }

    async activated() {
        try {
            let data = await User.findOne({
                activation_token : this.token
            })

            let activated_at = Date.now()

            let updateUser = await User.findOneAndUpdate({
                _id : data._id
            },
            {
                activated_at,
                activation_token: null
            }
            ).exec()

            return updateUser

        } catch(err) {
            throw err
        }
    }
}

module.exports = AktivToken

