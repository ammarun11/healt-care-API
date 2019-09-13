const HospitalModel = require("../../models/hospital.model")
const City = require("../../models/city.model")

class ShowAllHospital {
    constructor (req) {
        this.query = req.query
    }
    async getAll() {
        let { name, phone, city_id, page, limit } = this.query
        let params = { 
            deleted_at: null
        }

        if (name) {
            params.name = name
        }

        if (phone) {
            params.phone = phone
        }

        if (city_id) {
            params.city_id = city_id
        }

        if(page) {
            params.page = page
        }
        if (limit) {
            params.limit = limit
        }

            let options = {
                populate: 
                    {
                        path: 'city_id',
                        model: City
                    },
                page: parseInt(params.page) || 1, 
                limit: parseInt(params.limit) || 1
            };
        
            let query1 = await HospitalModel.paginate({}, options)
            return query1;
        }catch (err) {
            console.log(err)
            throw err;
        }
    }

module.exports = ShowAllHospital

        
