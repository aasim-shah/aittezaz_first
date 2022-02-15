import express  from 'express'
import products from '../controllers/product_controller.js'
const router = express.Router()
router.use(express.json())
let product = new products()
router.get('/' , product.home)
router.get('/:id' , product.get_product)
router.post('/add' , product.addnew_post)


export default router