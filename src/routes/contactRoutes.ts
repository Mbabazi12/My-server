import express,{Router} from 'express';
import contactController from '../controllers/contactController';
import VerifyAccess from '../middlewares/verifyAccess';


const router:Router = express.Router()
router.post("/addMessage",contactController.addmessage)
router.get("/getMessages", VerifyAccess("admin"), contactController.getAllMessages)
router.get("/:id",contactController.deleteAllMessages)
router.get("/deleteAll",contactController.deleteAllMessages)


export default router
