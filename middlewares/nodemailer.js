import nodemailer from 'nodemailer'
export const   transporter  = nodemailer.createTransport({
    service: 'gmail',
    options: {
      debug: true,
    },
        auth: {
            user: "penspowerr@gmail.com",
            pass: "mardan1122"
        }
    });
  // verify connection configuration
  transporter.verify(function(error, success) {
    if (error) {
         console.log(error);
    } else {
         console.log('Server is ready to take our messages');
    }
 });

export const generateOtp = ()=> {   
    
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;    
}

export const OrderPlaced  = (name , email ,service)=>{
    let   sentToAdmin = {
        from: '<PENS POWER> penspowerr@gmail.com',
        to: 'asimshah8110@gmail.com', 
        subject: `${name} Placed a New Order For ${service}`,
        text: `A New order from   ${name}  : ${email}  is placed for  ${service}`
    }
    transporter.sendMail(sentToAdmin, function(error, response){
        if(error){
            console.log(error);
        }else{
           console.log('sent to admin')
        }
      }); 

    let   sentToUser = {
        from: 'mernstackdevv@gmail.com',
        to: email, 
        subject: `Order Placed Successfully`,
        text: `Congratulations ${name} Your Order for ${service} is Placed successfully , Kindly Visit https://penspowerr.com/my_orders to view your order`
    }
 
      transporter.sendMail(sentToUser, function(error, response){
        if(error){
            console.log(error);
        }else{
           console.log('sent to user')
        }
      }); 
}