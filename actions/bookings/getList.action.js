const Booking = require("../../models/booking.model")
const Users = require("../../models/user.model")
const Poly = require("../../models/poly.model")

class getListBooking {
    constructor (req) {
        this.query = req.query
    }
    async getList() {
        let { code, user_id, poly_id, page, limit } = this.query
        let params = { 
            deleted_at: null
        }

        if (code) {
            params.code = code
        }

        if (user_id) {
            params.user_id = user_id
        }

        if (poly_id) {
            params.poly_id = poly_id
        }

        if(page) {
            params.page = page
        }
        if (limit) {
            params.limit = limit
        }

            let options = {
                populate: [
                    {
                        path: 'user_id',
                        model: Users
                    },
                    {
                        path: 'poly_id',
                        model: Poly
                    }
                ],
                page: parseInt(params.page) || 1, 
                limit: parseInt(params.limit) || 10
            };
        
            let query = await Booking.paginate({}, options)
            return query;
        }catch (err) {
            console.log(err)
            throw err;
        }
    }

module.exports = getListBooking

        
