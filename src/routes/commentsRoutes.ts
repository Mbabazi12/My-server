import express,{Router} from 'express';
import commentController from '../controllers/commentController';


const router:Router = express.Router()
router.post("/",commentController.addComment)
router.get("/",commentController.Comments)
router.get("/",commentController.deleteComment)


export default router






