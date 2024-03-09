"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messagesController_1 = require("../controllers/messagesController");
const router = express_1.default.Router();
router.post("/addMessage", messagesController_1.messageController.postMessage);
router.get("/getMessages", messagesController_1.messageController.getAllMessage);
router.get("/:id", messagesController_1.messageController.getOneMessage);
router.delete("/:id", messagesController_1.messageController.deleteOneMessage);
router.put("/:id", messagesController_1.messageController.updateMessage);
exports.default = router;
