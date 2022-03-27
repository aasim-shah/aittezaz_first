import mongoose from "mongoose";


const authoSchema = mongoose.Schema({
    name : String,
    education : String ,
    image : String,
    desc : String ,
    reviews : String,
    joined : {type : Date , default : Date.now()}
   
})

const authorModel = mongoose.model('author' , authoSchema)
export default  authorModel 