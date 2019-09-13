const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { randomKey } = require("../../lib/generatorkey");
const Notif = require("../notifications/Notif.action");
const token = randomKey(54, "aA#");

class Register {
  constructor(req) {
    (this.name = req.body.name),
      (this.email = req.body.email),
      (this.phone = req.body.phone),
      (this.username = req.body.username),
      (this.password = req.body.password),
      (this.password_confirm = req.body.password_confirm),
      (this.gender = req.body.gender),
      (this.activation_token = token),
      (this.role_id = JSON.parse(req.body.role_id));
  }

  async exec() {
    try {
      const options = {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      };

      let password = bcrypt.hashSync(this.password, 8); // params: password, salt
      console.log(`Hashing password ${password}`);

      let insert_data = {
        name: this.name,
        username: this.username,
        email: this.email,
        phone: this.phone,
        gender: this.gender,
        activation_token: this.activation_token,
        password,
        role_id: this.role_id
      };

      let query = new User(insert_data);
      await query.save();

      const transporter = await nodemailer.createTransport(options);

      const data = {
        to: this.email, // string
        subject: "Register and GET token to verify",
        text: `Your token for verify is: ${token}`,
        html: ``
      };

      setTimeout(async () => {
        // Send Email
        return await transporter.sendMail(data, (error, resp) => {
          if (error) {
            console.log(error);
          }
        });
      }, 600);

      /// Notif Bila user telah sukses registrasi.
      let notif_data = {
        title: "Register User",
        message: "User Belum Aktivasi",
        user_id: query._id
      };
      await new Notif(notif_data).exec();

      return {
        token,
        expires_in: "24 hours"
      };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Register;
