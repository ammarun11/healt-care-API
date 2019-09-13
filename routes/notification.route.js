const express = require("express")
const router = express.Router()
const detailNotif = require("../actions/notifications/detailNotif.action")


// ROute untuk melihat detail notif yang sudah terbuat..
router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params
        let data = await new detailNotif(id).exec()

        return res.send({
            status: 'Succes dan terbaca oleh dirimu',
            data
        })

    } catch(err) {
        return res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
})

module.exports = router