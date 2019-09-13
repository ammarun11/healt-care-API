const express = require("express");
const router = express.Router();
const GetListReview = require("../actions/reviews/list.review");
const { check } = require("express-validator");
const Review = require("../actions/reviews/createReview.action");
const GetReview = require("../actions/reviews/get.id.review");
const DEleteReview = require("../actions/reviews/delete.review.action");

router.post(
    "/create",
    [
        check("hospital_id")
            .not()
            .isEmpty(),
        check("rate")
            .not()
            .isEmpty(),
        check("user_id")
            .not()
            .isEmpty()
    ],
    async (req, res, next) => {
        try {
            let data = await new Review(req).exec();

            return res.status(200).json({
                status: "success",
                data,
                message: "Create Review data"
            });
        } catch (err) {
            return res.status(400).json({
                status: "error",
                message: err.message
            });
        }
    }
);

router.get("/", async (req, res, next) => {
    try {
        let { hospital_id, rate, user_id } = req.query;
        let params = {
            deleted_at: null
        };

        if (hospital_id) {
            params.hospital_id = hospital_id;
        }

        if (rate) {
            params.rate = rate;
        }

        // if(comment) {
        //     params.comment = comment
        // }
        if (user_id) {
            params.comment = user_id;
        }

        console.log(`Params ${JSON.stringify(params)}`);

        let data = await new GetListReview(params).getAll();

        return res.status(200).json({
            status: "success",
            data: data.docs,
            meta: {
                total: data.total,
                limit: data.limit,
                page: data.page,
                pages: data.pages
            },
            message: "Get all Review"
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
        let data = await new GetReview(id).exec();
        // console.log(`Type of Get List Hospital is ${typeof ShowShop}`)

        return res.status(200).json({
            status: "success",
            data,
            message: "Get detail of review hospital"
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
        let data = await new UpdateReview(id, req).update();
        return res.status(201).json({
            status: "success",
            data,
            message: "Review updated successfully"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    let { id } = req.params;

    try {
        let data = await DEleteReview.destroy(id);

        return res.send({
            status: "success",
            data,
            message: "deleted review successful"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

module.exports = router;
