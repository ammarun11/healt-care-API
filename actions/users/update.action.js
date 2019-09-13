const User = require("../../models/user.model")
const bcrypt = require("bcryptjs")
const Role = require('../../models/role.models')


class UpdateUser {
    constructor(id,req) {
        (this.id = id),
        (this.name = req.body.name),
        (this.email = req.body.email),
        (this.username = req.body.username),
        (this.password = req.body.password),
        (this.phone = req.body.phone),
        (this.gender = req.body.gender),
        (this.role_id = JSON.parse(req.body.role_id))
    }
    // update
    async update() {
        try {
            let password = bcrypt.hashSync(this.password, 8) // params: password, salt
    
            let data1 = await Role.find({
                _id : {
                    '$in' : this.role_id // $in: Returns a boolean indicating whether a specified value is in an array.
                }
           
            }).exec();
           
            if (data1.length == 0 ) {
                throw Error("Role not found");
            }

            let data = {
                name: this.name,
                email: this.email,
                username: this.username,
                password,
                phone: this.phone,
                gender: this.gender,
                role_id: this.role_id,
                updated_at: Date.now()
            }
            
            let query = await User.findOneAndUpdate({
              _id: this.id
            },
             data,
                {
                    new: true
                }

            ).exec()

            return query
        } catch(err) {
            throw err
        }
    }
}

module.exports = UpdateUser
