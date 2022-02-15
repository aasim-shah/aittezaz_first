import express  from 'express'
import categories from '../controllers/category_controller.js'
const router = express.Router()
router.use(express.json())
let category = new categories()
router.get('/' , category.home)
router.post('/add' , category.addnew_post)


export default router