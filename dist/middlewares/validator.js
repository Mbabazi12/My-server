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
exports.validator = void 0;
const express_validator_1 = require("express-validator");
const errorMessage_1 = require("../utils/errorMessage");
class validator {
    static InputValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                errors.array().map((error) => {
                    (0, errorMessage_1.errorMessage)(res, 401, error.msg);
                });
            }
            else {
                next();
            }
        });
    }
    static userAccount() {
        return [
            (0, express_validator_1.check)("username", "Please provide a valid username without numbers").trim().isAlpha(),
            (0, express_validator_1.check)("email", "Please provide a valid email address").trim().isEmail(),
            (0, express_validator_1.check)("password", "Please provide a strong password starting with a capital letter, mixing numbers and symbols").isStrongPassword()
        ];
    }
}
exports.validator = validator;
