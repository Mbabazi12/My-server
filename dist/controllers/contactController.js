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
Object.defineProperty(exports, "__esModule", { value: true });
const contact_1 = require("../model/contact");
const sucess_1 = require("../utils/sucess");
const successMessage_1 = require("../utils/successMessage");
const errorMessage_1 = require("../utils/errorMessage");
class contactController {
    static addmessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield contact_1.Contact.create(req.body);
            if (message) {
                return (0, successMessage_1.successMessage)(res, 200, `message added`, message);
            }
        });
    }
    static getAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield contact_1.Contact.find();
            if (message) {
                return (0, sucess_1.success)(res, 200, `messages found`, message);
            }
        });
    }
    static deleteMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageId = req.params.id;
            const message = yield contact_1.Contact.findByIdAndDelete(messageId);
            if (message) {
                return (0, sucess_1.success)(res, 201, `messages deleted`, message);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 401, `messages not deleted`);
            }
        });
    }
    static deleteAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield contact_1.Contact.deleteMany();
            if (message) {
                return (0, successMessage_1.successMessage)(res, 201, `messages deleted`, message);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 401, `messages not deleted`);
            }
        });
    }
}
exports.default = contactController;
