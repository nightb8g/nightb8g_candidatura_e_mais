const smtp = require('./sendEmail');
const notify = require('./notify');

module.exports = (res, body, payload) => {
    res.status(201).json({});
    notify(body.to, body.subscription, payload);

    smtp(body.to, body.subject, body.message);
    console.log(`send email to ${body.to}`);
};