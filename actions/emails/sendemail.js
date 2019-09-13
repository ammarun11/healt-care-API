const nodemailer = require("nodemailer")

/**
 * Send Mail using mailtrap
 * 
 * @param       params - [ 'to', 'subject', 'text', 'html' ]
 */
class SendMailtrap {
    constructor(params) {
        this.params = params
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
            }

            const transporter = await nodemailer.createTransport(options)

            const data = {
                to: this.params.to.toString(), // string
                from: 'pawit@gmail.com', // Totally up to you
                subject: this.params.subject,
                text: this.params.text,
                html: this.params.html
            }

            setTimeout(async () => {
                // Send Email
                return await transporter.sendMail(data, (error, resp) => {
                    if(error) {
                        console.log(error)
                    }
                })
            }, 600)
        } catch(err) {
            throw err
        }
    }
}

module.exports = SendMailtrap
