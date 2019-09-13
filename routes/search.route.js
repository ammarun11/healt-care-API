const express = require('express')
const router = express.Router()
const SearchHospital = require("../actions/sarch/Search.action")

router.get("/", async (req, res, next) => {
    
    try {

        let data = await new SearchHospital(req).exec();
            
        return res.status(200).json({
            status: "success",
            data,
            message: "Get Search data Succes"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }
});

module.exports = router
