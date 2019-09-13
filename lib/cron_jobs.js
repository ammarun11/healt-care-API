const cron = require("node-cron")
const moment = require("moment")

module.exports = cron.schedule("*/5 * * * * *", () => { // Running every 5 seconds
    console.log("--------------------")
    console.log(`Running Cron Job ${moment().format("H:m:s a")}`)
})
