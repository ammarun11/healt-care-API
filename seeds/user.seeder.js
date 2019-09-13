require("dotenv").config();
require("../db");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Role = require("../models/role.models");

const user_datas = [
    {
        name: "admin",
        username: "admin",
        email: "admin@abc.com",
        phone: "0873668376",
        gender: "male",
        password: "12341234",
        role_id: "",
        activation_token: "",
        activated_at: new Date()
    },
    {
        name: "user",
        username: "nonadmin",
        email: "user@abc.com",
        phone: "0873778899",
        gender: "female",
        password: "43214321",
        role_id: "",
        activation_token: "",
        activated_at: new Date()
    }
];

const seed = async (user_datas) => {
    console.log("Seed running user");
    console.log("=====================");
    await User.remove({}).exec();
    let users = [];
    let queryAdmin = await Role.findOne({
        name: "Admin"
    }).exec()
    let queryUser = await Role.findOne({
        name: "User"
    }).exec()

    user_datas.forEach(async (el) => {
        if (el.username === "admin") {
            el.role_id = [queryAdmin._id];
        } else {
            el.role_id = [queryUser._id];
        }
    })

    user_datas.forEach(async (el) => {
        let password = bcrypt.hashSync(el.password, 8); // params: password, salt
        console.log(`Hashing password ${password}`);
        el.password = password;
        let insert = new User(el);

        try {
            await insert.save();
            console.log(insert);
            users.push(insert._id);
        } catch (err) {
            console.log("=====================");
            console.error(err.message);
            setTimeout(() => {
                process.exit(0);
            }, 10000);
        }
    });
};

module.exports = seed(user_datas);
