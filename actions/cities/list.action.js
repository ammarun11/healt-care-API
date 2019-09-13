const City = require("../../models/city.model");

class listCity {
  constructor(req) {
    this.query = req.query;
  }
  async getAll() {
    let { name, page, limit } = this.query;
    let params = {
      deleted_at: null
    };

    if (name) {
      params.name = name;
    }

    if (page) {
      params.page = page;
    }
    if (limit) {
      params.limit = limit;
    }

    let options = {
      page: parseInt(params.page) || 1,
      limit: parseInt(params.limit) || 1
    };

    let query1 = await City.paginate({}, options);
    return query1;
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}
module.exports = listCity;
// class getAllCity {
//   constructor(query) {
//     this.query = query;
//   }

//   async getAll() {
//     try {
//       let query = await City.find(this.query).exec();

//       return query;
//     } catch (err) {
//       throw err;
//     }
//   }

//   hello() {
//     return "Hello City";
//   }
// }
