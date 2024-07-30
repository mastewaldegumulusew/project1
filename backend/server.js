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
var express = require("express");
var mongoose_1 = require("mongoose");
require("dotenv").config();
var cors = require("cors");
var socket_io_1 = require("socket.io");
var http = require("http");
var userRoute_1 = require("./routes/userRoute");
var userFriendRoute_1 = require("./routes/userFriendRoute");
var messageRoute_1 = require("./routes/messageRoute");
console.log(process.env.DB_URI);
console.log("hello");
var Connection = /** @class */ (function () {
    function Connection() {
        this.app = express();
        this.http = http.createServer(this.app);
        this.io = new socket_io_1.Server(this.http, {
            cors: {
                origin: "*"
            }
        });
        this.activeUsers = [];
    }
    Connection.prototype.test = function () {
        this.app.get("/", function (req, res) {
            res.status(200).json("Testing server!");
        });
    };
    Connection.prototype.useMiddleWares = function () {
        this.app.use(express.json({ limit: "50mb" }));
        this.app.use(cors());
    };
    Connection.prototype.initializeRoutes = function () {
        this.app.use("/api/user", userRoute_1.default);
        this.app.use("/api/friend", userFriendRoute_1.default);
        this.app.use("/api/message", messageRoute_1.default);
    };
    Connection.prototype.initSocketConnection = function () {
        var _this = this;
        this.io.on("connection", function (socket) {
            socket.on("add-new-user", function (userId) {
                if (!_this.activeUsers.find(function (user) { return user.userId === userId; }) && userId) {
                    _this.activeUsers.push({
                        userId: userId,
                        socketId: socket.id
                    });
                    _this.io.emit("get-online-users", _this.activeUsers);
                }
            });
            socket.on("send-message", function (data) {
                var receiverId = data.receiverId;
                var user = _this.activeUsers.find(function (user) { return user.userId === receiverId; });
                if (user) {
                    _this.io.to(user.socketId).emit("receive-message", data);
                }
            });
            socket.on("disconnect", function () {
                _this.activeUsers = _this.activeUsers.filter(function (user) { return user.socketId !== socket.id; });
                _this.io.emit("get-online-users", _this.activeUsers);
            });
        });
    };
    Connection.prototype.listen = function () {
        this.http.listen(process.env.PORT, function () {
            console.log("Connected to db & server started on port", process.env.PORT);
        });
    };
    Connection.prototype.connectToDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.default.connect(process.env.DB_URI)];
                    case 1:
                        _a.sent();
                        this.listen();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Connection;
}());
var server = new Connection();
server.useMiddleWares();
server.initializeRoutes();
server.initSocketConnection();
server.test();
server.connectToDB();
