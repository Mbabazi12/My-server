"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = __importDefault(require("../controllers/contactController"));
const verifyAccess_1 = __importDefault(require("../middlewares/verifyAccess"));
const router = express_1.default.Router();
router.post("/addMessage", contactController_1.default.addmessage);
router.get("/getMessages", (0, verifyAccess_1.default)("admin"), contactController_1.default.getAllMessages);
router.get("/:id", contactController_1.default.deleteAllMessages);
router.get("/deleteAll", contactController_1.default.deleteAllMessages);
exports.default = router;
