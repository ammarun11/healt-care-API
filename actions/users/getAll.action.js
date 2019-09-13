const User = require("../../models/user.model");

class getAllUser {
    constructor(query) {
        this.query = query 
    }

    async getAll() {

        let options = {
            page: parseInt(this.query.page) || 1, 
            limit: parseInt(this.query.limit) || 1
        }

        try {
            let query = await User.paginate({},options);

            return query;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = {getAllUser};
