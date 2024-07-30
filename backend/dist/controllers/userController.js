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
exports.signUp = signUp;
exports.Login = Login;
exports.deleteAccount = deleteAccount;
exports.findUser = findUser;
const jwt = __importStar(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
function createToken(_id) {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
}
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, userName, displayPicture } = req.body;
        try {
            const user = yield userModel_1.default.signup(email, password, userName, displayPicture);
            const token = createToken(user._id);
            res.status(200).json({ id: user._id, displayPicture, token, email, password, userName });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
function Login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, userName } = req.body;
        try {
            const user = yield userModel_1.default.login(email, password, userName);
            const token = createToken(user._id);
            res.status(200).json({ id: user._id, displayPicture: user.displayPicture, token, email, password, userName });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
function deleteAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const user = yield userModel_1.default.findOneAndDelete({ _id: id, });
            res.status(200).json(user);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
function findUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userName } = req.params;
        try {
            const user = yield userModel_1.default.findOne({ userName });
            if (!user) {
                return res.status(404).json({ error: "User doesn't exist" });
            }
            res.status(200).json(user);
        }
        catch (error) {
        }
    });
}
