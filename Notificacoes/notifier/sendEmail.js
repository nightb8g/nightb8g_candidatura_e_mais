const nodemailer = require('nodemailer');

const emailer = {
    config: {
        host: 'smtp.mailgun.org',
        port: 587,
        user: 'postmaster@sandbox14ed993157264664982486615428b24e.mailgun.org',
        pass: '4fda0a92b4f880b6ae6748395a39df90-5645b1f9-45093d40'
    }
};

emailer.transporter = nodemailer.createTransport({
    host: emailer.config.host,
    port: emailer.config.port,
    secure: false,
    requireTLS: true,
    auth: {
        user: emailer.config.user,
        pass: emailer.config.pass
    }
});

emailer.compose = (to, subject, message) => {
    return {
        from: emailer.config.user,
        to,
        subject,
        text: message
    };
};

module.exports = function send(to, subject, message) {
    emailer.transporter.sendMail(emailer.compose(to, subject, message), (error) => {
        if (error) {
            return console.log(error.message);
        }
    });
};