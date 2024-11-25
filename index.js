'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello world, I am a chat bot'));

app.get('/webhook/', (req, res) => {
    const VERIFY_TOKEN = 'my_voice_is_my_password_verify_me';
    if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong token');
    }
});

app.listen(process.env.PORT || 5000, () => console.log('Bot is running.'));
