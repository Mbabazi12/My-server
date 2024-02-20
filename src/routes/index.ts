import express,{Router} from 'express'
import routes from './routes'

const router: Router = express.Router()
router.use('/user',routes)

export default router