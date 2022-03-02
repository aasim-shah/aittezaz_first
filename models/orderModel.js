import mongoose from "mongoose";


const orderSchema = mongoose.Schema({
    name : String,
    email : {type : String },
    phone : {type : Number },
    service : String,
    comment : String,
    pages :{type : Number , default : 1},
    delivery_date : Date,
})




const orderModel = mongoose.model('orders' , orderSchema)
export default  orderModel 