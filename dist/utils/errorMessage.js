"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessage = void 0;
const errorMessage = (res, status, message) => {
    res.status(status).json({
        message: message,
    });
};
exports.errorMessage = errorMessage;
