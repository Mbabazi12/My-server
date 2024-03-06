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
const user_1 = require("../model/user");
const successMessage_1 = require("../utils/successMessage");
const errorMessage_1 = require("../utils/errorMessage");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginMessage_1 = require("../utils/loginMessage");
class userController {
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, role } = req.body;
            if (!password) {
                return (0, errorMessage_1.errorMessage)(res, 400, 'Password is required');
            }
            const hashPassword = bcrypt_1.default.hashSync(password, 10);
            const user = yield user_1.User.create({ username, email, password: hashPassword, role });
            if (user) {
                return (0, successMessage_1.successMessage)(res, 200, 'User created', user);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 404, 'Failed to create user');
            }
            ;
        });
    }
    ;
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.find();
            if (user) {
                return (0, successMessage_1.successMessage)(res, 200, `all users found ${user.length}`, user);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 401, 'users not found');
            }
            ;
        });
    }
    ;
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const user = yield user_1.User.findById(userId);
            if (user) {
                return (0, successMessage_1.successMessage)(res, 200, 'user found', user);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 401, 'user not found');
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const user = yield user_1.User.findByIdAndUpdate(userId, req.body, { new: true });
            if (user) {
                return (0, successMessage_1.successMessage)(res, 200, 'user updated', user);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 401, 'user not updated');
            }
            ;
        });
    }
    ;
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const user = yield user_1.User.findByIdAndDelete(userId);
            if (user) {
                return (0, successMessage_1.successMessage)(res, 200, 'user deleted successfully', user);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 401, 'user not deleted');
            }
            ;
        });
    }
    ;
    static deleteAllUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.deleteMany();
            if (user) {
                return (0, errorMessage_1.errorMessage)(res, 401, 'all users deleted');
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 401, 'users not deleted');
            }
            ;
        });
    }
    ;
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const secretKey = 'mbabazi';
            try {
                if (!secretKey) {
                    return (0, errorMessage_1.errorMessage)(res, 404, 'secret key not defined');
                }
                const user = yield user_1.User.findOne({ email });
                if (!user) {
                    return (0, errorMessage_1.errorMessage)(res, 401, 'Invalid email ');
                }
                else {
                    const comparePassword = bcrypt_1.default.compareSync(password, user.password);
                    if (comparePassword) {
                        return (0, successMessage_1.successMessage)(res, 402, 'invalid password', user);
                    }
                    else {
                        const token = jsonwebtoken_1.default.sign({ user: user }, secretKey, { expiresIn: '300d' });
                        if (token) {
                            return (0, loginMessage_1.loginMessage)(res, 201, 'user login successfully', token);
                        }
                        else {
                            return (0, errorMessage_1.errorMessage)(res, 401, 'token not found');
                        }
                    }
                }
            }
            catch (error) {
                console.log(error);
                return (0, errorMessage_1.errorMessage)(res, 500, 'internal server error');
            }
            ;
        });
    }
    ;
}
;
exports.default = userController;
