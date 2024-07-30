"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var messageSchema = new mongoose_1.Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    text: {
        type: String,
    },
    image: {
        type: String
    },
    audio: {
        type: String
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("messages", messageSchema);
