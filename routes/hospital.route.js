const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const Hospital = require("../actions/hospital/hospital.create");
const ShowAllHospital = require("../actions/hospital/show-all.action");
const ShowHospital = require("../actions/hospital/show.action");
const DeleteHospital = require("../actions/hospital/hospital.delete");
const UpdateHospital = require("../actions/hospital/hospital.update");

// For images
const multer = require("multer");
// Memberi Date ke gambar dan memberikan file sesuai ekstensi gambar
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/img/");
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
// Fillter gambar yang boleh di upload hanya jpg dan png
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
// Kumpulin Fungsi gambar
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // memberi limits size gambar yang bisa di upload hanya 5MB
    },
    fileFilter: fileFilter
});

router.post(
    "/create",
    upload.array("images_path", 100),
    async (req, res, next) => {
        try {
            let data = await new Hospital(req).exec();

            return res.status(200).json({
                status: "success",
                data,
                message: "Create hospital data"
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
        let data = await new ShowAllHospital(req).getAll();

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
        let data = await new ShowHospital(id).exec();
        console.log(`Type of ShowHospital is ${typeof ShowShop}`);

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

router.delete("/:id", async (req, res) => {
    let { id } = req.params;

    try {
        let data = await DeleteHospital.destroy(id);

        return res.send({
            status: "success",
            data,
            message: "deleted successful"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

router.put("/:id", async (req, res) => {
    let { id } = req.params;
    let updated_data = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        city_id: req.body.city_id,
        fresh: req.body.fresh
    };

    try {
        let data = await UpdateHospital.update(id, updated_data);

        return res.status(200).json({
            status: "success",
            data,
            message: "Hospital data Update successfully!"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

module.exports = router;
