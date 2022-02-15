import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    name : String,
    price : {type : Number , default : 0},
    stocks : {type : Number , default : 1},
    brand : String,
    category : String,
    rating :{type : Number , default : 5},
    desc : String,
    thumbnail : String,
    tag : {type : String , default : 'new'},
    images : []
})




const productModel = mongoose.model('products' , productSchema)
export default  productModel 