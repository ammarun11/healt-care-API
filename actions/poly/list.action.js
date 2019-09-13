const Poly = require("../../models/poly.model");

class getAllPoly {
    constructor(query) {
        this.query = query 
    }

    async getAll() {

        let options = {
            page: parseInt(this.query.page) || 1, 
            limit: parseInt(this.query.limit) || 8
        }

        try {
            let query = await Poly.paginate({},options);

            return query;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = {getAllPoly};
