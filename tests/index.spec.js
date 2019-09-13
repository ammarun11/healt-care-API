require("../server")
const welcome_test = require("./index/test.spec")
const login_test = require("./auth/login.spec")
const register_test = require("./auth/register.spec")
const forgot_test = require("./auth/forgotPasword.spec")
const reset_test = require("./auth/resetPassword.spec")
const verify_test = require("./auth/verify-forgot-password.spec")

describe("Unit Test Section", () => {
    welcome_test.test();

    login_test()

    register_test()

    forgot_test()

    verify_test()

    reset_test()

})
