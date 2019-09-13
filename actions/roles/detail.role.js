const Role = require("../../models/role.models")

class ShowRole {
    constructor(id) {
        this.id = id
    }

    async exec() {
        try {
            let query = await Role.findOne({
                _id: this.id
            }).exec()

            return query
        } catch(err) {
            throw err
        }
    }
}

module.exports = ShowRole