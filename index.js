import nodemailer from 'nodemailer'

exports.handler = (event, context, callback) => {
  const item = JSON.parse(event.body)
  let name = item.name;
  let emailAddress = item.email;
  let message = item.message;
   nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
        host: 'cpanel.freehosting.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'info@kkbeverages.in',
            pass: 'Smart1$1'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'info@kkbeverages.in',
        to: 'info@kkbeverages.in',
        subject: 'Inquiry comes from '+name,
        text: 'Hello world',
        html: 'Dear KK Beverages<br/><br/> Please find below inquiry for your product <br/><br/>'+message
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }

        const response = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
              "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({ "message": 'Message sent: %s'+ info.messageId })
          };
          callback(null, response); 
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
   });
};
