import mongoose from "mongoose";


const contactSchema = mongoose.Schema({
    fullname : String,
    email : {type : String },
    message : String,
    dated  : {type : Date , default : Date.now}
})




const contactModel = mongoose.model('contact' , contactSchema)
export default  contactModel 