const City = require("../../models/city.model");

class getDetail {
    constructor(id) {
        this.id = id;
    }

    async exec() {
        try {
            let query = await City.findOne({
                _id: this.id
            }).exec();

            return query;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = getDetail;
