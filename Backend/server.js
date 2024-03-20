const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS middleware - if your frontend and backend are running on different domains
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// POST route for handling form submissions
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a Nodemailer transporter using SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'sguerra.dev@gmail.com', // your email
            pass: '79?QNNw!byV]cL:' // your email password
        }
    });

    // Email content
    let mailOptions = {
        from: '"Your Name" <your_email@example.com>', // sender address
        to: 'recipient@example.com', // list of receivers
        subject: 'New Message from Contact Form', // Subject line
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // plain text body
        // html: '<b>Hello world?</b>' // html body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
