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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorMessage_1 = require("../utils/errorMessage");
const user_1 = require("../model/user");
const VerifyAccess = (passrole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token || Array.isArray(token)) {
            return (0, errorMessage_1.errorMessage)(res, 401, `No valid token provided`);
        }
        const secretKey = 'mbabazi';
        if (!secretKey) {
            return (0, errorMessage_1.errorMessage)(res, 500, `Secret key is not defined`);
        }
        console.log(token);
        const verifyToken = jsonwebtoken_1.default.verify(token, secretKey);
        console.log(verifyToken);
        req.user = verifyToken;
        try {
            const userId = req.user.userId;
            const user = yield user_1.User.findOne({ _id: userId });
            if ('admin' !== (user === null || user === void 0 ? void 0 : user.role)) {
                return (0, errorMessage_1.errorMessage)(res, 403, `You don't have access`);
            }
            else {
                next();
            }
        }
        catch (error) {
            return (0, errorMessage_1.errorMessage)(res, 401, 'no user');
        }
        // try {
        //     const verifyToken = Jwt.verify(token, secretKey) as UserPayload;
        //     req.user = verifyToken;
        //     console.log(verifyToken)
        //     if (passrole !== verifyToken.role) {
        //         return errorMessage(res, 403, `You don't have access`);
        //     } else {
        //         next();
        //     }
        // } catch (error) {
        //     if (error instanceof TokenExpiredError) {
        //         return errorMessage(res, 401, `Token expired`);
        //     } else if (error instanceof JsonWebTokenError) {
        //         console.log(error)
        //         return errorMessage(res, 401, `Invalid token`);
        //     }
        //     return errorMessage(res, 500, `Server Error: ${(error as Error).message}`);
        // }
    });
};
exports.default = VerifyAccess;
