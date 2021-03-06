import userModel from "../models/userModel.js";
import  Jwt  from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import orderModel from "../models/orderModel.js";
import contactModel from "../models/contactModel.js";
import blogModel from "../models/blogModel.js";
import authorModel from "../models/authorModel.js";
import subscribersModel from "../models/subscribersModel.js";
import bcrypt from 'bcrypt'
import moment from "moment";

import {transporter , generateOtp , OrderPlaced} from '../middlewares/nodemailer.js'
class apps {
     async   home(req ,res) {
      const authors = await authorModel.find();
      res.render('newhome' , {authors})
    }
    async  registering(req ,res) {
       const {username , email , password} = req.body;
       let otp = generateOtp()
       let hash = await bcrypt.hash(password , 10)
         const data = new userModel({
             username ,
             email,
             password : hash ,
             otp
         })       
         const registed = await data.save()
         const regtoken = await data.Authuser()
         if(registed){
            let   mailOptions = {
                from: "penspowerr@gmail.com",
                to: req.body.email, 
                subject: 'Confirm you Email Account',
                text: otp
            }
           
            transporter.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                }else{
                   console.log('sent')
                }
              }); 
            res.render('otp' , {email : req.body.email})
         }else{
             res.redirect('back')
         }
     }
     async  registered(req ,res) {
        res.render('register')
     }
   
     
     async  getBlog(req ,res) {
       const blogs = await blogModel.find().sort({created_at : -1});
      res.render('blogpage' , {blogs})
   }

      async  getContact(req ,res) {
        res.render('contact')
     }
     async  postContact(req ,res) {
        const {fullname , email , message } = req.body;
        const d = new contactModel({
           fullname,
           email,
           message
           
        })
        const saved_d = await d.save()
        res.redirect('back')
     }
      async  get_otp_get(req ,res) {
        res.render('getotp')
     }
     async  getOrder(req ,res) {
        res.render('placeorder' , {msg : null})
     }


     async  login_Failed(req ,res) {
      res.render('login' , {msg : "Email or Password Incorrect ! Please try again :)"})
   }

     async  getMyOrders(req ,res) {
      const orders = await orderModel.find({email : req.user.email})
      console.log(orders)
      res.render('myorders' , {orders , moment})
   }

     async  postOrder(req ,res) {
       const {name , email , phone , comment ,service , words , delivery_date} = req.body;
      const data = new orderModel({
          name,
          email,
          phone,
          comment,
          service,
          words,
            delivery_date
      })
      const saved_data = await data.save()
      console.log(saved_data);
      OrderPlaced(name , email , service);
      res.render('placeorder' , {msg : true})
     }
      async  get_otp_post(req ,res) {
        let otp = generateOtp()
        let   mailOptions = {
            from: "penspowerr@gmail.com",
            to: req.body.email, 
            subject: 'Confirm you Email Account',
            text: otp
        }
       
        transporter.sendMail(mailOptions,async function(error, response){
            if(error){
                console.log(error);
            }else{
                const user = await userModel.findOneAndUpdate({email : req.body.email},{otp : otp})
               console.log('sent')
            }
          });
        res.render('otp' , {email : req.body.email})
     }

      async  verify_otp_get(req ,res) {
        res.render('otp' , {email : ""})
     }
      async  postSubscribe(req ,res) {
        const email = req.body.email
        const d = new subscribersModel({
            email,
        })
        const saved_d = await d.save()
        res.redirect('back')
     }
     async  verify_otp_post(req ,res , next) {
     const otp = req.body.otp;
    const email = req.body.email;
        const user = await userModel.findOne({email : email});
        if(user.otp === otp){
            const updateUser = await userModel.findOneAndUpdate({email} , {otp_verified : true})
            res.redirect('/login')
        }else{
            res.redirect('/register')
        }

    }

     async  login_post(req ,res) {
         const Token = await req.user.Authuser()
         res.cookie('jwt_Token' , Token )
         if(req.user.isAdmin){
          return res.redirect('/user/admin')
        }
             res.redirect('/')
     }
     async  login_get(req ,res) {
       res.render('login' , {msg : null})
     }
 
     async  dashboard_get(req ,res) {
       const orders = await orderModel.find({email : req.user.email})
       if(orders){
        res.status(200).render('dashboard' , {orders : orders})
        }else{
          res.status(200).render('dashboard' , {orders : null})
       }
    //    res.render('home')
     }

     async  logout(req ,res) {
         res.clearCookie('jwt_Token')
         res.redirect('/login')
     }
     
}
export default apps