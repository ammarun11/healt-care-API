const jwt = require("jsonwebtoken")

module.exports = () => {
    return (req, res, next) => {
        let token = req.header("Authorization")
        let unauthenticated = {
            status : "unauthenticated",
            message: "Invalid header Token"
        }

        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, (err,data) => {
                if(err) return res.status(401).json(unauthenticated)

                return next()
            })
        } else {
            return res.status(401).json(unauthenticated)
        }
    }
}