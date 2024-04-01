"use strict";
import "dotenv/config";
import express from "express";
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
    res.header("Access-Control-Allow-Origin", "*"); // !!! TODO: change to domain name to prevent CSRF attacks
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// helmet.js protection
app.use(helmet({
    xDnsPrefetchControl: true,
}));

// POST route for handling form submissions
app.post("/api/send-email", (req, res) => {
    // Validate user input
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
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
