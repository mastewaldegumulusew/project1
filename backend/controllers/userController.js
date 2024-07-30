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
exports.signUp = signUp;
exports.Login = Login;
exports.deleteAccount = deleteAccount;
exports.findUser = findUser;
var jwt = require("jsonwebtoken");
var userModel_1 = require("../models/userModel");
function createToken(_id) {
    return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
}
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, userName, displayPicture, user, token, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password, userName = _a.userName, displayPicture = _a.displayPicture;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userModel_1.default.signup(email, password, userName, displayPicture)];
                case 2:
                    user = _b.sent();
                    token = createToken(user._id);
                    res.status(200).json({ id: user._id, displayPicture: displayPicture, token: token, email: email, password: password, userName: userName });
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
function Login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, userName, user, token, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password, userName = _a.userName;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userModel_1.default.login(email, password, userName)];
                case 2:
                    user = _b.sent();
                    token = createToken(user._id);
                    res.status(200).json({ id: user._id, displayPicture: user.displayPicture, token: token, email: email, password: password, userName: userName });
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
function deleteAccount(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, user, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userModel_1.default.findOneAndDelete({ _id: id, })];
                case 2:
                    user = _a.sent();
                    res.status(200).json(user);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    res.status(400).json({ error: error_3.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function findUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userName, user, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userName = req.params.userName;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userModel_1.default.findOne({ userName: userName })];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(404).json({ error: "User doesn't exist" })];
                    }
                    res.status(200).json(user);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
