const City = require("../../models/city.model");

class updateCity {
    constructor(id, req) {
        (this.id = id),
            (this.name = req.body.name),
            (this.description = req.body.description),
            (this.alias_name = JSON.parse (req.body.alias_name)),
            (this.parent = req.body.parent);
    }

    async update() {
        try {
            let data = {
                _id: this.id,
                name: this.name,
                description: this.description,
                alias_name: this.alias_name,
                parent: this.parent,
                updated_at: Date.now()
            };
            let check = await City.findOne({
              parent: this.parent 
            }).exec()

            if (check === null){
                throw new Error ("city not found")
            }

            let query = await City.findOneAndUpdate(
                {
                    _id: this.id
                },
                data
            ).exec();
            
            return query;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = updateCity;
