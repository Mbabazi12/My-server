import express,{Router} from 'express';
import contactController from '../controllers/contactController';


const router:Router = express.Router()
router.post("/addMessage",contactController.addmessage)
router.get("/getMessages",contactController.getAllMessages)
router.get("/deleteAll",contactController.deleteAllMessages)


export default router
