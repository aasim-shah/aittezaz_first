import categoryModel from '../models/categoryModel.js'
import productModel from '../models/productModel.js'
class categories {
    home(req , res){
        res.send('home')
    }
   
    async addnew_post(req ,res){
        const {name , products} = req.body
       const data = new categoryModel({
           name,
            products,
       })
       const added = await data.save()

        res.send(added)
    }
}
export default categories