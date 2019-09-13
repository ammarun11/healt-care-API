const City = require("../../models/city.model");

class deleteCity {
    constructor(id) {
        this.id = id;
    }

    async delete() {
        try {
            //let delete_at = Date.now();
            let query = await City.findOneAndUpdate(
                {
                    _id: this.id
                },
                {
                    name: null,
                    description: null,
                    alias_name: null,
                    parent: null,
                    delete_at: Date.now()
                }
            ).exec();

            return query;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = deleteCity;
