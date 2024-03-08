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
exports.dataChecker = void 0;
const user_1 = require("../model/user");
class dataChecker {
    static inputIsEmpty(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, passWord } = req.body;
            if (username == "") {
                return res.status(401).json({ status: 'failed', error: 'username required' });
            }
            else if (email == "") {
                return res.status(401).json({ status: 'failed', error: 'Email required' });
            }
            else if (passWord == "") {
                return res.status(401).json({ status: 'failed', error: 'Password required' });
            }
            else {
                next();
            }
            return res.status(201).json({ status: 'success', });
        });
    }
    static EmailExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const user = yield user_1.User.findOne({ email });
            if (user) {
                return res.status(401).json({ status: 'failed', error: 'Email already exist' });
            }
            else {
                next();
            }
            return res.status(201).json({ status: 'success', });
        });
    }
}
exports.dataChecker = dataChecker;
