const Role = require("../../models/role.models")

class DeleteRole {
    constructor(id) {
        this.id = id
    }

    async delete() {
        try {
            let delete_at = Date.now()
            let query = await Role.findOneAndUpdate(
                {
                _id: this.id
                },
                {
                    name: null,
                    permissions: null,
                    delete_at
                }
            ).exec()
            
            return query
        } catch (err) {
            throw err
        }
    }
}

module.exports = DeleteRole
