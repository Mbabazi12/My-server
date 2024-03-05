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
const comments_1 = require("../model/comments");
const sucess_1 = require("../utils/sucess");
const successMessage_1 = require("../utils/successMessage");
const errorMessage_1 = require("../utils/errorMessage");
class commentController {
    static addComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comments_1.Comment.create(req.body);
            if (comment) {
                return (0, successMessage_1.successMessage)(res, 200, `comment added`, comment);
            }
        });
    }
    static Comments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comments_1.Comment.find();
            if (comment) {
                return (0, sucess_1.success)(res, 200, `comments found`, comment);
            }
        });
    }
    static deleteMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageId = req.params.id;
            const comment = yield comments_1.Comment.findByIdAndDelete(messageId);
            if (comment) {
                return (0, sucess_1.success)(res, 201, `messages deleted`, comment);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 401, `messages not deleted`);
            }
        });
    }
    static deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comments_1.Comment.deleteMany();
            if (comment) {
                return (0, sucess_1.success)(res, 201, `comment deleted`, comment);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 401, `comment not deleted`);
            }
        });
    }
}
exports.default = commentController;
