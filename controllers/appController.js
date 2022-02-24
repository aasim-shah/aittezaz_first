import userModel from "../models/userModel.js";
import  Jwt  from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import productModel from "../models/productModel.js";
import bcrypt from 'bcrypt'
import categoryModel from "../models/categoryModel.js";
import {transporter , generateOtp} from '../middlewares/nodemailer.js'
class apps {
     async   home(req ,res) {
      res.render('newhome')
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
                from: 'mernstackdevv@gmail.com',
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
      async  getContact(req ,res) {
        res.render('contact')
     }
      async  get_otp_get(req ,res) {
        res.render('getotp')
     }
      async  get_otp_post(req ,res) {
        let otp = generateOtp()
        let   mailOptions = {
            from: 'mernstackdevv@gmail.com',
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
             res.redirect('dashboard')
     }
     async  login_get(req ,res) {
       res.render('login')
     }
 
     async  dashboard_get(req ,res) {
         res.send('dashboard')
    //    res.render('home')
     }

     async  logout(req ,res) {
         res.clearCookie('jwt_Token')
         res.redirect('/login')
     }
     
}
export default apps