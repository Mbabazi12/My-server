"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successMessage = void 0;
const successMessage = (res, status, message, data) => {
    res.status(status).json({
        message: message,
        data: data
    });
};
exports.successMessage = successMessage;
