const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

var appDir = path.dirname(require.main.filename);

const sendMail = {
    postMail : (toAddr, subjectStr, mailContent) => {
        //let authNum = Math.random().toString().substr(2, 6);
        let emailTemplate;
        var subURL = '/views/mail.ejs';
        var authType;
        if (mailContent.type == 'login') {
            authType = 'login';
        } else if (mailContent.type == 'signup') {
            authType = 'signup';
        }
        ejs.renderFile(appDir + subURL, {type : authType, authcode : mailContent.authcode, email : mailContent.email}, function (err, data) {
            if(err) {
                console.log(err);
            }
            emailTemplate = data;
        });
    
        let transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            secure: false,
            auth: {
                user: 'be3e7d9eebbb7e',
                pass: 'ad8d898be9848a'
            }
        });

        const mailOptions = {
            from: 'blueskyocean123@protonmail.com',
            to: toAddr,
            subject: subjectStr,
            html: emailTemplate,
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            //console.log("Finish sending email : " + info.response);
            transporter.close();
        });
    }
}

module.exports = sendMail;