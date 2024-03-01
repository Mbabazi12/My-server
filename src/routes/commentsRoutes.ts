import express,{Router} from 'express';
import commentController from '../controllers/commentController';


const router:Router = express.Router()
router.post("/addComment",commentController.addComment)
router.get("/getComment",commentController.Comments)
router.delete("/delete",commentController.deleteComment)


export default router






