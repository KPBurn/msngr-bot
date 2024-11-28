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

                    // Check for "terms" keyword to send a button
                    if (userMessage.includes('terms')) {
                        sendButtonMessage(sender);
                    } else {
                        const reply = generateReply(userMessage);
                        sendTextMessage(sender, reply);
                    }
                } else if (event.postback) {
                    // Handle button postbacks
                    const payload = event.postback.payload;

                    if (payload === "AGREE_TERMS") {
                        sendTextMessage(sender, "Thank you for agreeing to the Terms and Conditions!");
                        console.log(`User ${sender} agreed to the terms.`);
                    } else {
                        sendTextMessage(sender, "I'm not sure what you meant. Please try again.");
                    }
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

// Send Text Message
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

// Send Button Message
function sendButtonMessage(sender) {
    const messageData = {
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: "Do you agree to our Terms and Conditions?",
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
app.listen(PORT, () => console.log(`Bot is running on port ${PORT}`));
