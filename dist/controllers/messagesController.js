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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageController = void 0;
const messages_1 = __importDefault(require("../model/messages"));
const successMessage_1 = require("../utils/successMessage");
const errorMessage_1 = require("../utils/errorMessage");
class messageController {
    static postMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, message } = req.body;
            try {
                const messages = yield messages_1.default.create({ email, message });
                if (messages) {
                    return (0, successMessage_1.successMessage)(res, 200, `message sent successfully`, messages);
                }
                else {
                    return (0, errorMessage_1.errorMessage)(res, 204, `no blog posted`);
                }
            }
            catch (error) {
                console.error("Error deleting user:", error);
                return (0, errorMessage_1.errorMessage)(res, 500, `Internal server error`);
            }
        });
    }
    static getAllMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield messages_1.default.find();
                if (message) {
                    return (0, successMessage_1.successMessage)(res, 200, `all message retrived`, message);
                }
                else {
                    return (0, errorMessage_1.errorMessage)(res, 200, `no blogs retrived`);
                }
            }
            catch (error) {
            }
        });
    }
    static getOneMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageId = req.params.id;
            try {
                const message = yield messages_1.default.findById(messageId);
                if (message) {
                    return (0, successMessage_1.successMessage)(res, 200, `message retrived`, message);
                }
                else {
                    return (0, errorMessage_1.errorMessage)(res, 200, `no message retrived`);
                }
            }
            catch (error) {
            }
        });
    }
    static deleteOneMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageId = req.params.id;
            try {
                const message = yield messages_1.default.findByIdAndDelete(messageId);
                if (message) {
                    return (0, errorMessage_1.errorMessage)(res, 200, `message deleted`);
                }
                else {
                    return (0, errorMessage_1.errorMessage)(res, 400, `no message retrived`);
                }
            }
            catch (error) {
            }
        });
    }
    static updateMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageId = req.params.id;
            try {
                const message = yield messages_1.default.findByIdAndUpdate(messageId, req.body, { new: true });
                if (message) {
                    return (0, successMessage_1.successMessage)(res, 200, `message updated successfully`, message);
                }
                else {
                    return (0, errorMessage_1.errorMessage)(res, 400, `no message updated`);
                }
            }
            catch (error) {
            }
        });
    }
}
exports.messageController = messageController;
