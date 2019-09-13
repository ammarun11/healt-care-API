const express = require("express");
const router = express.Router();
const CreateRole = require("../actions/roles/create.role");
const deleteRole = require("../actions/roles/delete.role");
const RoleList = require("../actions/roles/getList.role");
const updateRole = require("../actions/roles/update.role");
const ShowRole = require("../actions/roles/detail.role");
// const RoleSearch = require("../actions/roles/search.role")

router.post("/", async (req, res, next) => {
    try {
        let data = await new CreateRole(req).exec();

        return res.status(201).json({
            status: "success",
            data,
            message: "Role created successfully"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await new deleteRole(id).delete();

        return res.status(200).json({
            status: "success",
            data,
            message: "Role data deleted successfully!"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

// router.get("/", async (req, res, next) => {
//   try {
//     let { name } = req.query;
//     let params = {
//       deleted_at: null
//     };

//     if (name) {
//       params.name = name;
//     }

//     console.log(`Params ${JSON.stringify(params)}`);

//     let data = await new RoleList(params).getAll();

//     return res.status(200).json({
//       status: "success",
//       data,
//       message: "Get all Role"
//     });
//   } catch (err) {
//     return res.status(400).json({
//       status: "error",
//       message: err.message
//     });
//   }
// });

router.get("/:page", async (req, res, next) => {
    try {
        let data = await new RoleList(req).exec();

        return res.status(201).json({
            status: "success",
            data: data.docs,
            meta: {
                total: data.total,
                limit: data.limit,
                page: data.page,
                pages: data.pages
            },
            message: "Get Data Request"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

// router.get("/search", async (req, res, next) => {
//     try {
//         let data = await new RoleSearch(req).exec()

//         return res.status(201).json({
//             status: "success",
//             data,
//             message: "Get search Role"
//         })
//     } catch(err) {
//         return res.status(400).json({
//             status: "error",
//             message: err.message
//         })
//     }
// })

router.get("/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await new ShowRole(id).exec();
        console.log(`Type of ShowRole is ${typeof ShowRole}`);

        return res.status(200).json({
            status: "success",
            data,
            message: "Get detail of Role"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await new updateRole(id, req).update();

        return res.status(201).json({
            status: "success",
            data,
            message: "Role data updated successfully!"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

module.exports = router;
