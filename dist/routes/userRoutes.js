"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const datachecker_1 = require("../middlewares/datachecker");
const router = express_1.default.Router();
router.post('/create', datachecker_1.dataChecker.inputIsEmpty, datachecker_1.dataChecker.EmailExist, userControllers_1.default.signup);
router.post('/login', userControllers_1.default.UserLogin);
router.get('/get', userControllers_1.default.getAllUsers);
router.get('/:id', userControllers_1.default.getUser);
router.delete('/:id', userControllers_1.default.deleteUser);
router.patch('/:id', userControllers_1.default.updateUser);
exports.default = router;
// import controllers from '../controllers/userControllers';
// import { isAuthenticated, isOwner} from '../middlewares/middlewares';
// export default (router: express.Router) => {
//     router.get('/users', isAuthenticated , controllers.getAllUsers);
//     router.delete('/users/:id', isAuthenticated, isOwner, controllers.deleteUser);
//     router.patch('/users/:id', isAuthenticated, isOwner, controllers.updateUser);
// };
