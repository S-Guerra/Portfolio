"use strict";
import "dotenv/config";
import express from "express";
import { body, validationResult } from "express-validator";
import { createTransport } from "nodemailer";
import bodyparser from "body-parser";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 3001;

// Body parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// CORS middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // change to your domain name
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// helmet.js protection
app.use(helmet({
    xDnsPrefetchControl: true,
}));

// POST route for handling form submissions
app.post("/api/send-email",
    // input validation
    body("name").trim().notEmpty().isString().isLength({
        min: 2,
        max: 12
    }).withMessage("Not a valid name"),
    body("email").trim().notEmpty().isEmail().withMessage("Not a valid e-mail address"),
    body("message").trim().notEmpty().isString().isLength({
        min: 30,
        max: 2000
    }).withMessage("Not a valid message"),
    (req, res) => {
        try {
            const errors = validationResult(req);
            errors.throw(); // only triggers if any validation fails

            const { name, email, message } = req.body;

            // Create a Nodemailer transporter using SMTP transport
            let transporter = createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: `${process.env.EMAIL}`,
                    pass: `${process.env.PASSWORD}`
                }
            });

            // Email content
            let mailOptions = {
                from: `${name}: ${email}`,
                to: `${process.env.EMAIL}`,
                subject: "New message from portfolio contact form",
                text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            };

            // Send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    res.status(500).send("Error sending email");
                } else {
                    console.log("Email sent: " + info.response);
                    res.send("Email sent successfully");
                }
            });
        } catch (err) {
            console.error(err.array()[0].msg)
            res.status(400).json({ error: err.array()[0].msg });
        }
    });

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
