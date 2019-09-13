const Role = require("../../models/role.models");

class RoleList {
  constructor(query) {
    this.query = query;
  }
  async exec(req) {
    try {
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
        limit: parseInt(params.limit) || 10
      };

      let query1 = await Role.paginate({}, options);
      return query1;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

module.exports = RoleList;
