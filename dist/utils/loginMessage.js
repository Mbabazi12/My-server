"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginMessage = void 0;
const loginMessage = (res, status, message, token) => {
    res.status(status).json({
        message: message,
        token: token
    });
};
exports.loginMessage = loginMessage;
