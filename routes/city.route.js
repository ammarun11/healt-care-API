const express = require("express");
const router = express.Router();
const createCity = require("../actions/cities/create.action");
const deleteCity = require("../actions/cities/delete.action");
const listCity = require("../actions/cities/list.action");
const editCity = require("../actions/cities/edit.action");
const detailCity = require("../actions/cities/detail.action");

router.post("/create", async (req, res, next) => {
    try {
        let data = await new createCity(req).exec();

        return res.status(201).json({
            status: "success",
            data,
            message: "City created successfully"
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
        let data = await new listCity(req).getAll();

        return res.status(200).json({
            status: "success",
            data: data.docs,
            meta: {
                total: data.total,
                limit: data.limit,
                page: data.page,
                pages: data.pages
            },
            message: "Get list City"
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
        let data = await new editCity(id, req).update();
        return res.status(201).json({
            status: "success",
            data,
            message: "City updated successfully"
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
        let data = await new detailCity(id).exec();
        console.log(`Type of detailCity is ${typeof detailCity}`);

        return res.status(200).json({
            status: "success",
            data,
            message: "Get detail of city"
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
        let data = await new deleteCity(id).delete();
        return res.status(201).json({
            status: "success",
            data,
            message: "City delete successfully"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

module.exports = router;
