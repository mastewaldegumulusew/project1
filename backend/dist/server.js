"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const cors = require("cors");
const socket_io_1 = require("socket.io");
const http = __importStar(require("http"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const userFriendRoute_1 = __importDefault(require("./routes/userFriendRoute"));
const messageRoute_1 = __importDefault(require("./routes/messageRoute"));
console.log(process.env.DB_URI);
console.log("hello");
class Connection {
    constructor() {
        this.app = express();
        this.http = http.createServer(this.app);
        this.io = new socket_io_1.Server(this.http, {
            cors: {
                origin: "*"
            }
        });
        this.activeUsers = [];
    }
    test() {
        this.app.get("/", (req, res) => {
            res.status(200).json("Testing server!");
        });
    }
    useMiddleWares() {
        this.app.use(express.json({ limit: "50mb" }));
        this.app.use(cors());
    }
    initializeRoutes() {
        this.app.use("/api/user", userRoute_1.default);
        this.app.use("/api/friend", userFriendRoute_1.default);
        this.app.use("/api/message", messageRoute_1.default);
    }
    initSocketConnection() {
        this.io.on("connection", (socket) => {
            socket.on("add-new-user", (userId) => {
                if (!this.activeUsers.find(user => user.userId === userId) && userId) {
                    this.activeUsers.push({
                        userId,
                        socketId: socket.id
                    });
                    this.io.emit("get-online-users", this.activeUsers);
                }
            });
            socket.on("send-message", data => {
                const { receiverId } = data;
                const user = this.activeUsers.find(user => user.userId === receiverId);
                if (user) {
                    this.io.to(user.socketId).emit("receive-message", data);
                }
            });
            socket.on("disconnect", () => {
                this.activeUsers = this.activeUsers.filter(user => user.socketId !== socket.id);
                this.io.emit("get-online-users", this.activeUsers);
            });
        });
    }
    listen() {
        this.http.listen(process.env.PORT, () => {
            console.log("Connected to db & server started on port", process.env.PORT);
        });
    }
    connectToDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect(process.env.DB_URI);
            this.listen();
        });
    }
}
const server = new Connection();
server.useMiddleWares();
server.initializeRoutes();
server.initSocketConnection();
server.test();
server.connectToDB();
