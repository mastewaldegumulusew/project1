"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var messageController_1 = require("../controllers/messageController");
var requireAuth_1 = require("../middlewares/requireAuth");
var router = express.Router();
router.use(requireAuth_1.default);
router.post("/", messageController_1.addMessage);
router.get("/:senderId/:receiverId", messageController_1.getMessages);
router.get("/lastMessage/:senderId/:receiverId", messageController_1.getLastMessage);
exports.default = router;