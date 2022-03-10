import mongoose from "mongoose";


const orderSchema = mongoose.Schema({
    name : String,
    email : {type : String },
    phone : {type : Number },
    service : String,
    comment : String,
    status : {type : String , default : "pending"},
    words :{type : String , default : "1"},
    delivery_date : Date,
})




const orderModel = mongoose.model('orders' , orderSchema)
export default  orderModel 