"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contactSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sendAt: {
        type: Date,
        default: Date.now()
    },
});
const Messages = mongoose_1.default.model("Contact", contactSchema);
exports.default = Messages;
