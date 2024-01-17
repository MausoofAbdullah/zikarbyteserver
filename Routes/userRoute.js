
import express from 'express'
import { loginUser, registerUser,addContent,getContent} from '../controllers/userController.js'
import authMiddleware from '../middleware/authmiddleware.js'


const router = express.Router()
router.post('/login',loginUser)
router.post('/register',registerUser)
router.post('/addcontent',authMiddleware,addContent)
router.get('/getcontent',authMiddleware,getContent)

export default router
