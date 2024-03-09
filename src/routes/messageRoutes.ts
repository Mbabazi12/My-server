import express,{Router} from 'express';
import {  messageController } from '../controllers/messagesController';


const router:Router = express.Router();

router.post("/addMessage",messageController.postMessage);
router.get("/getMessages",messageController.getAllMessage);
router.get("/:id",messageController.getOneMessage);
router.delete("/:id",messageController.deleteOneMessage);
router.put("/:id",messageController.updateMessage);

export default router;