"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessage = addMessage;
exports.getMessages = getMessages;
exports.getLastMessage = getLastMessage;
var messageModel_1 = require("../models/messageModel");
function addMessage(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, text, image, audio, senderId, receiverId, chat, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, text = _a.text, image = _a.image, audio = _a.audio, senderId = _a.senderId, receiverId = _a.receiverId;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, messageModel_1.default.create({ text: text, image: image, audio: audio, senderId: senderId, receiverId: receiverId })];
                case 2:
                    chat = _b.sent();
                    res.status(200).json(chat);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    res.status(400).json({ error: error_1.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getMessages(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, senderId, receiverId, chats, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, senderId = _a.senderId, receiverId = _a.receiverId;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, messageModel_1.default.find({
                            $and: [
                                {
                                    $or: [{ senderId: senderId }, { receiverId: senderId }],
                                },
                                {
                                    $or: [{ receiverId: receiverId }, { senderId: receiverId }],
                                },
                            ],
                        }).sort({ createdAt: 1 })];
                case 2:
                    chats = _b.sent();
                    res.status(200).json(chats);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    res.status(400).json({ error: error_2.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getLastMessage(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, senderId, receiverId, uId, chats, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, senderId = _a.senderId, receiverId = _a.receiverId;
                    uId = req.user._id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, messageModel_1.default.findOne({
                            $and: [
                                {
                                    $or: [{ senderId: senderId }, { receiverId: senderId }],
                                },
                                {
                                    $or: [{ receiverId: receiverId }, { senderId: receiverId }],
                                },
                            ],
                        }).sort({ createdAt: -1 }).select("text image audio").where("senderId").ne(uId)];
                case 2:
                    chats = _b.sent();
                    if ((chats === null || chats === void 0 ? void 0 : chats.text) === "" || (chats === null || chats === void 0 ? void 0 : chats.image) || (chats === null || chats === void 0 ? void 0 : chats.audio)) {
                        return [2 /*return*/, res.status(200).json({ text: "media-alt-send" })];
                    }
                    res.status(200).json(chats);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    res.status(400).json({ error: error_3.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
