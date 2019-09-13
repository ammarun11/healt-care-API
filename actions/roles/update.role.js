const Role = require("../../models/role.models")

class UpdateRole {
    constructor (id, req) {
        this.id = id,
        this.name = req.body.name,
        this.permissions = JSON.parse(req.body.permissions)
    }

    async update() {
        try {
            let data = {
                _id: this.id,
                name: this.name,
                permissions:(this.permissions),
                updated_at: Date.now()
            }

            let query = await Role.findOneAndUpdate(
                {
                _id:this.id
            },
            data
        ).exec()

            return query
            } catch(err) {
                throw err
            }
        }
}

module.exports = UpdateRole
