import mongoose from "mongoose";


const subscribersSchema = mongoose.Schema({
    email : {type : String },
    dated  : {type : Date , default : Date.now}
})




const subscribersModel = mongoose.model('subscibers' , subscribersSchema)
export default  subscribersModel 