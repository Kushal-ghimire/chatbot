const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    name: String,
    email: String,
    time: Date,
    chat: [
        {
            time: Date,
            message: String,
            response: String,
        }
    ],
    isHumanRequired: Boolean,
    assignedTo: String,
    assignedTime: Date
})