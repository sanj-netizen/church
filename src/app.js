const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const registerRouter = require('./Router/registerRouter');
const LoginRouter =require('./Router/LoginRouter');
const profilePictureUploadImage = require('./Router/uplodeRouter');
const emailRouter =require("./Router/emailRouter");
const verifyOtpRouter = require('./Router/emailOrSmsOtpVerificationRouter');
const sendSMSRouter = require('./Router/smsSendingRouter');
// const verifySmsOtpRouter =require('./Router/smmOtpVerificationRouter');
const profileDataRouter =require('./Router/profileDataRouter')
const app = express();




// Allow CORS from localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].join(','),
}));

// Add bodyParser middleware
app.use(express.json());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));


// Parse cookies sent from the client
app.use(cookieParser());
// Routes
app.use(registerRouter);
app.use(LoginRouter);
app.use(profilePictureUploadImage);
app.use(emailRouter);
app.use(verifyOtpRouter);//email otp verifivation
app.use(sendSMSRouter);
// app.use(verifySmsOtpRouter);
app.use(profileDataRouter)//pemding to connect  front end



// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Catch-all route handler that sends index.html for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
