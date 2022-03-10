import mongoose from "mongoose";


const blogSchema = mongoose.Schema({
    title : String,
    desc : String ,
    image : String,
    likes : Number ,
    comments : Number
   
})

const blogModel = mongoose.model('blog' , blogSchema)
export default  blogModel 