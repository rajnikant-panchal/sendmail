'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'cpanel.@@@@@@@.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'info@kkbeverages.in', // generated ethereal user
            pass: '@@@@@@@@@@' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'info@kkbeverages.in', // sender address
        to: 'rpanchal@yahoo.com', // list of receivers
        subject: 'Hello Testing mail', // Subject line
        text: 'Hello world', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});
