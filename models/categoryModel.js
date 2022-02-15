import mongoose from "mongoose";


const categorySchema = mongoose.Schema({
    name : String,
    sub_categories : [],
    products : {type : Number, default : 0},


})

const categoryModel = mongoose.model('categoryies' , categorySchema)
export default  categoryModel 