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
exports.validateupdatedUser = exports.validateUser = void 0;
const zod_1 = require("zod");
const bcryptjs_1 = require("bcryptjs");
const userZodSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, { message: 'Username is required' }),
    email: zod_1.z.string().email({ message: 'Invalid email format' }).min(1, { message: 'Email is required' }),
    password: zod_1.z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    role: zod_1.z.string().optional()
});
const validateUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = userZodSchema.parse(userData);
        if (validatedData.password) {
            const hashedPassword = yield (0, bcryptjs_1.hash)(validatedData.password, 10);
            validatedData.password = hashedPassword;
        }
        return validatedData;
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            console.error('Validation failed:', error.errors);
            const errorMessages = {};
            error.errors.forEach((validationError) => {
                const fieldName = validationError.path[0];
                const errorMessage = validationError.message;
                errorMessages[fieldName] = errorMessage;
            });
            return { validationErrors: errorMessages };
        }
        else {
            console.error('Unexpected error:', error);
            return { validationErrors: { unexpected: 'Unexpected error occurred' } };
        }
    }
});
exports.validateUser = validateUser;
const updateUserSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, { message: 'Username is required' }).optional(),
    email: zod_1.z.string().email({ message: 'Invalid email format' }).min(1, { message: 'Email is required' }).optional(),
    password: zod_1.z.string().min(6, { message: 'Password must be at least 6 characters long' }).optional(),
    role: zod_1.z.string().optional()
});
const validateupdatedUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = updateUserSchema.parse(userData);
        if (validatedData.password) {
            const hashedPassword = yield (0, bcryptjs_1.hash)(validatedData.password, 10);
            validatedData.password = hashedPassword;
        }
        return validatedData;
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            console.error('Validation failed:', error.errors);
            const errorMessages = {};
            error.errors.forEach((validationError) => {
                const fieldName = validationError.path[0];
                const errorMessage = validationError.message;
                errorMessages[fieldName] = errorMessage;
            });
            return { validationErrors: errorMessages };
        }
        else {
            console.error('Unexpected error:', error);
            return { validationErrors: { unexpected: 'Unexpected error occurred' } };
        }
    }
});
exports.validateupdatedUser = validateupdatedUser;
