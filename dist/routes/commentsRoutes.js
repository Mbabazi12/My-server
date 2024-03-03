"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = __importDefault(require("../controllers/commentController"));
const router = express_1.default.Router();
router.post("/addComment", commentController_1.default.addComment);
router.get("/getComment", commentController_1.default.Comments);
router.delete("/delete", commentController_1.default.deleteComment);
exports.default = router;
