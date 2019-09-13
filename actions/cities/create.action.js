const City = require("../../models/city.model");

class createCity {
    constructor(req) {
        (this.name = req.body.name),
            (this.description = req.body.description),
            (this.alias_name = JSON.parse(req.body.alias_name));
        (this.parent = req.body.parent);
    }

    async exec() {
        try {
            let city = await CityModel.findOne({
                _id: this.parent
            }).exec();

            let query = new City({
                name: this.name,
                description: this.description,
                alias_name: this.alias_name,
                parent: city._id
            });
            await query.save();

            return query;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = createCity;
