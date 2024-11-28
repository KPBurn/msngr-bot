'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config(); // Load environment variables
const app = express();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Webhook Verification
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'my_voice_is_my_password_verify_me';

    if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong token');
    }
});

// Set up the Get Started Button
function setupGetStartedButton() {
    const messageData = {
        get_started: {
            payload: "GET_STARTED"
        }
    };

    request({
        url: `https://graph.facebook.com/v16.0/me/messenger_profile`,
        qs: { access_token: PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: messageData
    }, (error, response, body) => {
        if (error) {
            console.error('Error setting up Get Started button:', error);
        } else if (response.body.error) {
            console.error('Error in response:', response.body.error);
        } else {
            console.log('Get Started button set up successfully');
        }
    });
}

// Handle Messenger Events
app.post('/webhook', (req, res) => {
    const body = req.body;

    // Check if the event is from a page subscription
    if (body.object === 'page') {
        body.entry.forEach(entry => {
            const messagingEvents = entry.messaging;

            messagingEvents.forEach(event => {
                const sender = event.sender.id;

                if (event.postback) {
                    const payload = event.postback.payload;

                    if (payload === "GET_STARTED") {
                        // Respond to Get Started button
                        sendButtonMessage(sender, "Welcome! Do you agree to our Terms and Conditions?");
                    } else if (payload === "AGREE_TERMS") {
                        sendTextMessage(sender, "Thank you for agreeing to the Terms and Conditions!");
                    }
                }
            });
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

// Send Text Message
function sendTextMessage(sender, text) {
    const messageData = { text };

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
        } else {
            console.log(`Message sent to ${sender}: ${text}`);
        }
    });
}

// Send Button Message
function sendButtonMessage(sender, text) {
    const messageData = {
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: text,
                buttons: [
                    {
                        type: "postback",
                        title: "I Agree",
                        payload: "AGREE_TERMS"
                    },
                    {
                        type: "web_url",
                        title: "View Terms",
                        url: "https://example.com/terms" // Replace with your terms URL
                    }
                ]
            }
        }
    };

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
            console.error('Error sending button message:', error);
        } else if (response.body.error) {
            console.error('Error in response:', response.body.error);
        } else {
            console.log(`Button message sent to ${sender}`);
        }
    });
}

// Serve Frontend
const path = require('path');
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Backend API Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Bot is running on port ${PORT}`);
    setupGetStartedButton(); // Set up the Get Started button when the server starts
});
