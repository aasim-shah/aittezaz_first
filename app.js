import express  from 'express'

import ejs from 'ejs'
import userRoute from './routes/user_route.js'
import apps from './controllers/appController.js'
import passport  from 'passport';
import  Jwt from 'jsonwebtoken';
import flash from 'connect-flash'
import session from 'express-session';
import { services } from './controllers/servicesController.js';
import MongoStore from 'connect-mongo';
import Razorpay from "razorpay"
import bcrypt from 'bcrypt'
import Stripe  from 'stripe'
const stripe = Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
import  userModel from './models/userModel.js';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import multer from 'multer'
import jwtAuth from './middlewares/jwtauth.js'
const local = passportLocal.Strategy

const app = express()
const { urlencoded } = express;
let  auth = new jwtAuth()
let  isAdmin = auth.isAdmin
const Tokenauth  = auth.Tokenauth
const verifyOtp = auth.verifyOtp
const service = services(app)

var Publishable_Key = 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'
var Secret_Key = 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'

const port = process.env.port || 8000
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,  uniqueSuffix  + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })
app.use(express.static('./public'))
app.use('/user' , express.static('./public'))
app.use('/services' , express.static('./public'))
app.use('/user/admin' , express.static('./public'))
app.set('view engine' , 'ejs')
app.use(express.json())
const home = new apps()




app.use(urlencoded({extended : false}))
app.use(cookieParser())
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store : MongoStore.create({mongoUrl : 'mongodb://asim:Mardan8110@cluster0-shard-00-00.btwlh.mongodb.net:27017,cluster0-shard-00-01.btwlh.mongodb.net:27017,cluster0-shard-00-02.btwlh.mongodb.net:27017/Aittezaz?ssl=true&replicaSet=atlas-x564yd-shard-0&authSource=admin&retryWrites=true&w=majority' , collectionName : 'sessions'}),
  cookie: { maxAge : 1000 * 60 * 60 * 24 }
}))
app.use((req , res , next)=>{
  res.locals.session = req.session
    next()
  })

app.use(express.json()) 
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new local(
    function(username, password, done) {
      userModel.findOne({ email: username },async function  (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if(!await bcrypt.compare(password , user.password)){ return done(false)}
        return done(null, user);
      });
    }
  ));

  passport.deserializeUser(function(id, done) {
    userModel.findById(id, function(err, user) {
      done(err, user);
    });
  });
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  


app.get('/' , home.home)
app.use('/user' , userRoute)



app.get('/contact', home.getContact);
app.get('/blog', home.getBlog);
app.post('/subscribe', home.postSubscribe);
app.post('/contact', home.postContact);
app.get('/register', home.registered);
app.post('/register', home.registering);
app.get('/login', home.login_get);
app.post('/login' , passport.authenticate('local', { failureRedirect: 'login' }),
home.login_post
);
app.get('/services', service.home)
app.get('/services/article', service.getArticle)
app.get('/services/assignment', service.getAssignment)
app.get('/services/blog-post', service.getBlogpost)
app.get('/services/case-study', service.getCasestudy)
app.get('/services/essay', service.getEssay)
app.get('/services/post-content', service.getPostcontent)
app.get('/services/research', service.getResearch)
app.get('/services/thesis', service.getThesis)



app.get('/place_order'  , home.getOrder)
app.post('/place_order'  , home.postOrder)
app.get('/getotp'  , home.get_otp_get)
app.post('/getotp'  , home.get_otp_post)
app.get('/verifyOtp'  , home.verify_otp_get)
app.post('/verifyOtp'  , home.verify_otp_post)
app.get('/dashboard' ,Tokenauth , verifyOtp, home.dashboard_get)
app.get('/logout', Tokenauth,  home.logout);


app.listen(port , ()=> {
    console.log('server is running on 8000')
})
