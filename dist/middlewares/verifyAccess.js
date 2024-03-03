"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const errorMessage_1 = require("../utils/errorMessage");
const VerifyAccess = (passrole) => {
    return (req, res, next) => {
        const token = req.headers["authorization"];
        if (!token || Array.isArray(token)) {
            return (0, errorMessage_1.errorMessage)(res, 401, `No valid token provided`);
        }
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            return (0, errorMessage_1.errorMessage)(res, 500, `Secret key is not defined`);
        }
        try {
            const verifyToken = jsonwebtoken_1.default.verify(token, secretKey);
            req.user = verifyToken;
            if (passrole !== verifyToken.role) {
                return (0, errorMessage_1.errorMessage)(res, 403, `You don't have access`);
            }
            else {
                next();
            }
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                return (0, errorMessage_1.errorMessage)(res, 401, `Token expired`);
            }
            else if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                return (0, errorMessage_1.errorMessage)(res, 401, `Invalid token`);
            }
            return (0, errorMessage_1.errorMessage)(res, 500, `Server Error: ${error.message}`);
        }
    };
};
exports.default = VerifyAccess;
