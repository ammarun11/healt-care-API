const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const UserAll = require("../actions/users/getAll.action");
const UserDetail = require("../actions/users/getDetail.action");
const CreateUser = require("../actions/users/create.action");
const DeleteUser = require("../actions/users/delete.action");
const Update = require("../actions/users/update.action");
const AktivToken = require("../actions/users/activationToken.action");

// create user
router.post(
    "/",
    [
        check("name")
            .not()
            .isEmpty(),
        check("email")
            .not()
            .isEmpty()
            .isEmail(),
        check("username")
            .not()
            .isEmpty(),
        check("phone")
            .not()
            .isEmpty(),
        check("gender")
            .not()
            .isEmpty(),
        check("password")
            .not()
            .isEmpty()
            .isLength({ min: 8 }),
        check("password_confirmation")
            .not()
            .isEmpty(),
        body("password_confirmation").custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error("Password confirmation does not match");
            } else {
                return true;
            }
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: "error",
                message: errors.array()
            });
        }

        try {
            let data = await new CreateUser(req).create();

            return res.status(200).json({
                status: "success",
                data,
                message: "User created successfully!"
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
        let { name, email, phone, username, page, limit } = req.query;
        let params = {
            deleted_at: null
        };

        if (name) {
            params.name = name;
        }

        if (email) {
            params.email = email;
        }

        if (phone) {
            params.phone = phone;
        }
        if (username) {
            params.username = username;
        }
        if (page) {
            params.page = page;
        }
        if (limit) {
            params.limit = limit;
        }
        console.log(`Params ${JSON.stringify(params)}`);

        let data = await new UserAll.getAllUser(params).getAll();

        return res.status(200).json({
            status: "success",
            data: data.docs,
            meta: {
                total: data.total,
                limit: data.limit,
                page: data.page,
                pages: data.pages
            },
            message: "Get all User"
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
        let data = await new UserDetail(id).exec();

        return res.status(200).json({
            status: "success",
            data,
            message: "Get detail of User"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

router.get("/:token", async (req, res) => {
    try {
        let data = await new AktivToken(req.params.token).activated();

        return res.send({
            status: "success aktivasi token",
            data
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
        let data = await new DeleteUser(id).delete();
        return res.status(201).json({
            status: "success",
            data,
            message: "User delete successfully"
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
        let data = await new Update(id, req).update();

        return res.status(200).json({
            status: "success",
            data,
            message: "User updated successfully"
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

module.exports = router;
