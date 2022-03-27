import  express  from 'express';
import users from '../controllers/users_controller.js'
import passport  from 'passport';
import  Jwt from 'jsonwebtoken';
import session from 'express-session';
import  userModel from '../models/userModel.js';
import  blogModel from '../models/blogModel.js';

import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import AdminController from '../controllers/adminController.js';
import jwtAuth from '../middlewares/jwtauth.js';
const local = passportLocal.Strategy
const router = express.Router()
const user = users(router)
const admin = new  AdminController()
const auth = new jwtAuth()
const isAdmin = auth.isAdmin
const Tokenauth = auth.Tokenauth
import multer from 'multer'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,  uniqueSuffix  + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


  router.get('/' , user.home)
router.get('/admin' ,Tokenauth, isAdmin , admin.home)
router.get('/admin/add_product' ,Tokenauth, isAdmin , admin.add_product_get)
router.get('/admin/reject-order/:id' ,Tokenauth, isAdmin , admin.getRejectOrder)
router.get('/admin/accept-order/:id' ,Tokenauth, isAdmin , admin.getAcceptOrder)
router.get('/admin/total-orders' ,Tokenauth, isAdmin , admin.getTotalOrders)
router.get('/admin/accepted-orders' ,Tokenauth, isAdmin , admin.getAcceptedOrders)
router.get('/admin/rejected-orders' ,Tokenauth, isAdmin , admin.getRejectedOrders)
router.get('/admin/pending-orders' ,Tokenauth, isAdmin , admin.getPendingOrders)
router.get('/admin/add-blog' ,Tokenauth, isAdmin , admin.add_blog_get)
router.post('/admin/add-blog', upload.single('image'), admin.add_blog_post)
router.get('/admin/add-author' ,Tokenauth, isAdmin , admin.add_author_get)
router.post('/admin/add-author' ,upload.single('image'), admin.add_author_post)
router.post('/admin/add_product', upload.single('product_image'), upload.array('images' , 10) , admin.add_product_post)

export default router;