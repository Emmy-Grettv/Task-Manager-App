const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv');
const hbs = require('nodemailer-express-handlebars');
const fileURLToPath = require('node:url');

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async (
    subject,
    send_to,
    send_from,
    reply_to,
    template,
    name,
    link
) => {
    const transporter = nodemailer.createTransport({
        service: "Outlook365",
        host: "smtp.office365.com",
        port: 567,
        secure: false,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.EMAIL_PASS
        },
    });

    const handlebarsOptions = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve(__dirname, "../views"),
            defaultLayout: false,
        },
        viewPath: path.resolve(__dirname, "../views"),
        extName: ".handlebars"
    };

    transporter.use("compile", hbs(handlebarsOptions));

    const mailOptions = {
        from: send_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        template: template,
        context: {
            name: name,
            link: link
        }
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.log("Error sending message: ", error);
        throw error;
    }
}

export default sendEmail;