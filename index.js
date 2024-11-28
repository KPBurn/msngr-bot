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

// Frontend
app.get('/', (req, res) => {
    res.send(`
        <h1>Front end log in????<h1>
        <p>I don't know. Heroku is acting up.</p>
    `);
});

// Handle Messenger Events
app.post('/webhook', (req, res) => {
    const body = req.body;

    // Check if the event is from a page subscription
    if (body.object === 'page') {
        body.entry.forEach(entry => {
            const messagingEvents = entry.messaging;

            messagingEvents.forEach(event => {
                const sender = event.sender.id;

                if (event.message && event.message.text) {
                    const userMessage = event.message.text.toLowerCase();
                    const reply = generateReply(userMessage);
                    sendTextMessage(sender, reply);
                }
            });
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

// Generate Reply Based on User Message
function generateReply(userMessage) {
    if (userMessage.includes('hello') || userMessage.includes('hi')) {
        return 'Hello! How can I assist you today?';
    } else if (userMessage.includes('help')) {
        return 'Sure, let me know what you need help with.';
    } else if (userMessage.includes('thanks') || userMessage.includes('thank you')) {
        return 'You’re welcome! Is there anything else I can help you with?';
    } else if (userMessage.includes('bye')) {
        return 'Goodbye! Have a great day!';
    } else {
        return `I'm sorry, I didn't quite understand that. Can you rephrase?`;
    }
}

// Send Message Function
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
app.listen(PORT, () => console.log(`Bot is running on port ${PORT}`));
