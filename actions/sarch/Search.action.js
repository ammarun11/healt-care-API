/**
 * HASIL DATA PENCARIAN BERDASARKAN QUERY YANG DI INPUTKAN PADA URL
 * Parameter yang di gunakan ( city, poly, diseases) 
 * Kendala:
 * Belum Fix params (book_date, city dengan alias_name)
 */

const HospitaModel = require("../../models/hospital.model")
const PolyModel = require("../../models/poly.model")
const CityModel = require("../../models/city.model")
// const ShowCity = require("../cities/detailCity.action")
// const showpoly = require("../poly/detail.action")

class HospitalSearch {
    constructor(req) {
        this.query = req.query
    }

    async exec() {
            let { city, book_date, poly , diseases } = this.query
            let params = { 
                deleted_at: null
            }

            if (city) {
                params.city = city
            }

            if (book_date) {
                params.book_date = book_date
            }
    
            if (poly) {
                params.poly = poly
            }

            if (diseases) {
                params.diseases = diseases
            }

            console.log(`Params ${JSON.stringify(params)}`)
            try {
                
                // pencarian berdasarkan nama kota alias *belum jadi
                // --- yang di tampilkan hanya data city saja  ----
                let query1 = await CityModel.findOne({
                    alias_name : this.query.city
                }).exec()


                // pencarian sesuai penykit yang ada
                let Querydiseases = await PolyModel.find({
                    diseases : this.query.diseases
                }).populate([
                    {
                        path: 'hospital_id',
                        model: HospitaModel
                    }
                ]).exec()


                 // pencarian sesuai poly yang ada
                let Querypoly= await PolyModel.find({
                    name : this.query.poly
                })
                .populate([
                    {
                        path: 'hospital_id',
                        model: HospitaModel
                    }
                ])
                .exec()


                //Pencarian Rumah sakit sesuai kota
                //NOTE : Untuk pencarian dgn nama alias belum berhasil
                let Querycity = await HospitaModel.find({
                    address: this.query.city
                })
                .populate([
                    {
                        path: 'city_id',
                        model: CityModel
                    }
                ])
                .exec()

                let newdata = {
                    // query1,
                    Querydiseases,
                    Querypoly,
                    Querycity
                }

                return newdata
        } catch(err) {
            throw err
        }
    }
}

module.exports = HospitalSearch