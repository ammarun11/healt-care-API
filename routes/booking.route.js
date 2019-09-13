const express = require("express");
const router = express.Router();
const createBooking = require("../actions/bookings/createBooking.action");
const getListBooking = require("../actions/bookings/getList.action");
const getDetailBooking = require("../actions/bookings/detailBooking.action");
const editBooking = require("../actions/bookings/editBooking.action");
const deleteBooking = require("../actions/bookings/deleteBooking.action");

router.post("/create", async (req, res, next) => {
    try {
        let data = await new createBooking(req).exec();

        return res.status(201).json({
            status: "success",
            data,
            message: "Booking created successfully"
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
        let data = await new getListBooking(req).getList();
            
        return res.status(200).json({
            status: "success",
            data,
            message: "Get all Booking"
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
        let data = await new getDetailBooking(id).exec();
        console.log(`Type of getDetailBooking is ${typeof getDetailBooking}`);

        return res.status(200).json({
            status: "success",
            data,
            message: "Get detail of booking populate"
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
        let data = await new editBooking(id, req).exec();

        return res.status(201).json({
            status: "success",
            data,
            message: "Booking data updated successfully!"
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
        let data = await new deleteBooking(id).delete();

        return res.status(200).json({
            status: "success",
            data,
            message: "Booking data deleted successfully!"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

module.exports = router;
