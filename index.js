const express = require('express')
const app = express()
const logger = require("morgan")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./swagger.json")
require('./db')

const options = {
    customCss: '.swagger-ui .topbar { display: none }'
}

app.use(logger('dev'))
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())

require("./routes/main")(app); // all routes imported
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc, options))

module.exports = app
