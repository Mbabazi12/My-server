"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = void 0;
const success = (res, status, message, data) => {
    res.status(status).json({
        message: message,
        data: data
    });
};
exports.success = success;
