const User = require("../../models/user.model");

class deleteUser {
    constructor(id) {
        this.id = id;
    }

    async delete() {
        try {
            let query = await User.findOneAndUpdate(
                {
                    _id: this.id
                },
                {
                    name: null,
                    description: null,
                    deleted_at: Date.now()
                }
            ).exec();

            return query;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = deleteUser;
