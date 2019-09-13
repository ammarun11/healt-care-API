const express = require("express");
const router = express.Router();
const CreatePoly = require("../actions/poly/create.action");
const PolyAll = require("../actions/poly/list.action");
const ShowPoly = require("../actions/poly/detail.action");
const UpdatePoly = require("../actions/poly/update.action");
const DeletePoly = require("../actions/poly/delete.action");

router.post("/create", async (req, res, next) => {
    try {
        let data = await new CreatePoly(req).exec();

        return res.status(201).json({
            status: "success",
            data,
            message: "Poly created successfully"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

router.get("/", async (req, res, next) => {
    try {
        let { code, name, diseases, page, limit } = req.query;
        let params = {
            deleted_at: null
        };

        if (name) {
            params.name = name;
        }

        if (code) {
            params.code = code;
        }

        if (diseases) {
            params.diseases = diseases;
        }

        if (page) {
            params.page = page;
        }

        if (limit) {
            params.limit = limit;
        }
        console.log(`Params ${JSON.stringify(params)}`);

        let data = await new PolyAll.getAllPoly(params).getAll();

        return res.status(200).json({
            status: "success",
            data: data.docs,
            meta: {
                total: data.total,
                limit: data.limit,
                page: data.page,
                pages: data.pages
            },
            message: "Get all Hospital"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await new ShowPoly(id).exec();
        console.log(`Type of detailpoly is ${typeof detailPoly}`);

        return res.status(200).json({
            status: "success",
            data,
            message: "Get detail of hospital"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let data = await new UpdatePoly(id, req).update();
        return res.status(201).json({
            status: "success",
            data,
            message: "Poly updated successfully"
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
        let data = await new DeletePoly(id).delete();

        return res.status(201).json({
            status: "success",
            data,
            message: "poly delete successfully"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

module.exports = router;
