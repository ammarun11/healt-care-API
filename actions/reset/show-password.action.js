const LupaPassword = require("../../models/reset-password.model")

class ShowPassword {
    constructor(params) {
        this.params = params 
    }

    async exec() {
        try {
            let data = await LupaPassword.findOne(this.params).exec()
            if(data === null ) {
                throw new Error("Data ga ada lur")
            }

            return data
        } catch(err) {
            throw err
        }
    }
}

module.exports = ShowPassword