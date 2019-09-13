const User = require ("../../models/user.model")
const Role = require ("../../models/role.models")

class GetDetailUser {
    constructor(id){
        this.id = id
    }
    
    async exec() {
        try {
            let data = await User.findOne({
                _id: this.id
            }).populate([
                {
                    path: 'role_id',
                    model: Role
                }
            ]).exec()

        return data
    } catch(err) {
        throw err
    }
}
}

module.exports = GetDetailUser