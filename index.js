'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config(); // Load environment variables
const app = express();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'my_voice_is_my_password_verify_me';

    if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong token');
    }
});


app.get('/', (req, res) => {
    res.send(`
        <h1>Front end log in????<h1>
        <p>i dontk now. heroku fucks me up.</p>

    `);
});

// HANDLE MESSAGE
app.post('/webhook', (req, res) => {
    const body = req.body;

    // Check if the event is from a page subscription
    if (body.object === 'page') {
        body.entry.forEach(entry => {
            // Get the message event
            const messagingEvents = entry.messaging;

            messagingEvents.forEach(event => {
                const sender = event.sender.id;

                if (event.message && event.message.text) {
                    const text = event.message.text;
                    sendTextMessage(sender, `Text received, echo: ${text.substring(0, 200)}`);
                }
            });
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

// MESSAGE
function sendTextMessage(sender, text) {
    const messageData = { text: text };

    request({
        url: 'https://graph.facebook.com/v16.0/me/messages',
        qs: { access_token: PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData
        }
    }, (error, response, body) => {
        if (error) {
            console.error('Error sending messages:', error);
        } else if (response.body.error) {
            console.error('Error:', response.body.error);
        }
    });
}

//serve frontend

const path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend')));

// Catch-all route for frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});


//backend api login API

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Hardcoded credentials for simplicity
    if (username === 'admin' && password === 'password') {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});



// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Bot is running on port ${PORT}`));