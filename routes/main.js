const users = require("./user.routes");
const index = require("./index");
const register = require("./register");
const activation = require("./activation");
const login = require("./login");
const citys = require("./city.route");
const hospitals = require("./hospital.route");
const roles = require("./role.routes");
const reset = require("./reset.routes");
const authtoken = require("./auth.routes");
const verfyJWTadmin = require("../middleware/verfyJWTadmin.middleware"); // Auth middlewar admin cak
const verfyJWT = require("../middleware/verifyJWT.middleware"); // Auth Middelware user biasa
const notif = require("./notification.route");
const review = require("./review.route");
const patient = require("./patient.route");
const poly = require("../routes/poly.routes");
const booking = require("../routes/booking.route");

const routes = app => {
    app.use("/", index);
    app.use("/user", users);
    app.use("/auth", authtoken);
    app.use("/register", register);
    app.use("/activation", activation);
    app.use("/login", login);
    app.use("/city",  citys);
    app.use("/hospital",  hospitals);
    app.use("/role",  roles);
    app.use("/reset", reset);
    app.use("/notif",  notif);
    app.use("/review", review);
    app.use("/patient",  patient);
    app.use("/poly", poly);
    app.use("/booking", booking);
};

module.exports = routes;
