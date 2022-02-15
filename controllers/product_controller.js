import productModel from '../models/productModel.js'
class products {
    home(req , res){
        res.send('home')
    }
  async get_product(req ,res){
      const product_id = req.params.id;
    const product = await productModel.findById(product_id)
      res.render('single_product' , {product})
  }
    async addnew_post(req ,res){
        const {name , price , desc , stocks , image , rating} = req.body
       const data = new productModel({
           name,
           price,
           desc,
           stocks,
           rating
       })
       const added = await data.save()
       console.log('asdkfljslkdfjlsdf')
       const update_image = await findOneAndUpdate({id : added._id}, {
           $push : {images : req.file.filename}
       })

        res.send(added)
    }
}
export default products