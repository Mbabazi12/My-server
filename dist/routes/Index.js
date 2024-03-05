"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const blogsRoutes_1 = __importDefault(require("./blogsRoutes"));
const commentsRoutes_1 = __importDefault(require("./commentsRoutes"));
const contactRoutes_1 = __importDefault(require("./contactRoutes"));
const router = express_1.default.Router();
router.use('/user', 
/*
#swagger.tags = ['USERS Routes']
*/
userRoutes_1.default);
router.use('/blog', 
/*
#swagger.tags = ['BLOGS Routes']
*/
blogsRoutes_1.default);
router.use('/comment', 
/*
#swagger.tags = ['COMMENTS Routes']
*/
commentsRoutes_1.default);
router.use('/contact', 
/*
#swagger.tags = ['MESSAGES Routes']
*/
contactRoutes_1.default);
exports.default = router;
// import authentication from './authentication';
// // import users from './users';
// const router = express.Router();
// router.use('/user',authentication)
// // export default (): express.Router => {
// //     authentication(router);
// //     users(router);
// //     return router;
// // };
// export default router;
