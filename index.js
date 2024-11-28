'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config(); // Load environment variables

const app = express();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// In-memory conversation state (for demo purposes; use a database in production)
const userStates = {};

// Webhook Verification
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'my_voice_is_my_password_verify_me';

    if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong token');
    }
});

// Webhook Endpoint for Message Handling
app.post('/webhook', (req, res) => {
    const body = req.body;

    if (body.object === 'page') {
        body.entry.forEach(entry => {
            entry.messaging.forEach(event => {
                const senderId = event.sender.id;

                if (event.message && event.message.text) {
                    const userMessage = event.message.text;
                    handleUserMessage(senderId, userMessage);
                }
            });
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

// Function to Handle User Messages
function handleUserMessage(senderId, userMessage) {
    const currentState = userStates[senderId] || 'start';

    let reply;
    switch (currentState) {
        case 'start':
            reply = 'Welcome! How can I help you today? (e.g., "Help", "Order", "Feedback")';
            userStates[senderId] = 'awaiting_response';
            break;

        case 'awaiting_response':
            if (userMessage.toLowerCase().includes('help')) {
                reply = 'Sure, I can help you. What do you need assistance with?';
                userStates[senderId] = 'help_requested';
            } else if (userMessage.toLowerCase().includes('order')) {
                reply = 'Great! Please provide your order details.';
                userStates[senderId] = 'order_details';
            } else if (userMessage.toLowerCase().includes('feedback')) {
                reply = 'We value your feedback. Please share it with us.';
                userStates[senderId] = 'awaiting_feedback';
            } else {
                reply = 'I’m sorry, I didn’t understand that. Can you try again?';
            }
            break;

        case 'help_requested':
            reply = `Thank you for providing more details: "${userMessage}". We'll get back to you soon!`;
            userStates[senderId] = 'start'; // Reset state
            break;

        case 'order_details':
            reply = `Your order details: "${userMessage}" have been received. Thank you!`;
            userStates[senderId] = 'start'; // Reset state
            break;

        case 'awaiting_feedback':
            reply = `Thank you for your feedback: "${userMessage}". We appreciate it!`;
            userStates[senderId] = 'start'; // Reset state
            break;

        default:
            reply = 'Oops! Something went wrong. Let’s start over.';
            userStates[senderId] = 'start'; // Reset state
            break;
    }

    sendTextMessage(senderId, reply);
}

// Function to Send Messages via Messenger API
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
        }
    });
}

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Bot is running on port ${PORT}`));
