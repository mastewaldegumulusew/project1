"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userFriendSchema = new mongoose_1.Schema({
    friendDetails: {
        type: Map,
        of: String
    }
});
exports.default = mongoose_1.default.model("userFriends", userFriendSchema);
