'use strict';

const express = require('express');
const notify = require('../notifier');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// notify
router.post('/notify', (req, res) => {

    let payload = JSON.stringify({ title: 'Notification', message: 'Sent email to ' + req.body.to });

    notify(res, req.body, payload);
});

module.exports = router;