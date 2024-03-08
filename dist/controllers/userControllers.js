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
const successMessage_1 = require("../utils/successMessage");
const errorMessage_1 = require("../utils/errorMessage");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../model/user");
const validation_1 = require("../middlewares/validation");
class userController {
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, role } = req.body;
                const userData = yield (0, validation_1.validateUser)({ username, email, password, role });
                if ('validationErrors' in userData) {
                    const { validationErrors } = userData;
                    return res.status(400).json({ status: 'fail', validationErrors });
                }
                const userName = yield user_1.User.findOne({ username });
                if (userName) {
                    return res.status(401).json({ status: 'failed', error: 'username already exist', userName });
                }
                const user = yield user_1.User.create(userData);
                return res.status(201).json({ status: 'Success', data: user });
            }
            catch (error) {
                console.error('Error during signup:', error);
                return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
            }
        });
    }
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
            try {
                const userId = req.params.userId;
                const { username, email, password, role } = req.body;
                const updatedUserData = yield (0, validation_1.validateupdatedUser)({ username, email, password, role });
                if ('validationErrors' in updatedUserData) {
                    const { validationErrors } = updatedUserData;
                    return res.status(400).json({ status: "fail", validationErrors });
                }
                const updatedUser = yield user_1.User.findByIdAndUpdate(userId, updatedUserData, { new: true });
                if (!updatedUser) {
                    return res.status(404).json({ status: 'fail', error: 'User not found' });
                }
                return res.status(200).json({ status: 'Success', data: updatedUser });
            }
            catch (error) {
                console.error('Error updating user:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const deletedUser = yield user_1.User.findByIdAndDelete(userId);
                if (!deletedUser) {
                    return res.status(404).json({ status: "fail", error: 'User not found' });
                }
                return res.status(200).json({ status: 'Success', message: 'User successfully deleted' });
            }
            catch (error) {
                console.error('Error deleting user and associated comments:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static UserLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const authUser = yield user_1.User.findOne({ email });
                if (!authUser) {
                    return res.status(404).json({ error: 'User not found' });
                }
                if (authUser.password) {
                    const passwordMatch = yield (0, bcryptjs_1.compare)(password, authUser.password);
                    if (!passwordMatch) {
                        return res.status(401).json({ error: 'Incorrect password' });
                    }
                    const token = jsonwebtoken_1.default.sign({ userId: authUser._id, email: authUser.email, role: authUser.role }, 'mbabazi');
                    return res.status(200).json({ status: "success", user: { _id: authUser._id, username: authUser.username, email: authUser.email, role: authUser.role }, token });
                }
                else {
                    return res.status(500).json({ status: "fail", error: 'User password not available' });
                }
            }
            catch (error) {
                console.error('Error during user login:', error);
                return res.status(500).json({ status: "error", error: 'Internal Server Error' });
            }
        });
    }
}
;
exports.default = userController;
