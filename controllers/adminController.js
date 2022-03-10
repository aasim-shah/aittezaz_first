import blogModel from '../models/blogModel.js';
import userModel from '../models/userModel.js'
import orderModel from '../models/orderModel.js'
class AdminController {
    home(req , res){
       res.render('admin/home')
    }

   async add_product_get(req , res){
        res.render('admin/add_product')
    }

    async add_product_get(req , res){
        res.render('admin/add_product')
    }
    async getRejectOrder(req , res){
        const id = req.params.id;
        const rejected = await orderModel.findByIdAndUpdate(id , {
            status : "rejected"
        })
        res.redirect('back')
    }

    async getAcceptOrder(req , res){
        const id = req.params.id;
        const rejected = await orderModel.findByIdAndUpdate(id , {
            status : "accepted"
        })
        res.redirect('back')
    }

    async getTotalOrders(req , res){
        const total_orders = await orderModel.find()
        res.render('admin/total_orders'  , {total_orders})
    }

    
    async getAcceptedOrders(req , res){
        const accepted_orders = await orderModel.find({status : "accepted"})
        res.render('admin/accepted_orders'  , {accepted_orders})
    }
    
    async getRejectedOrders(req , res){
        const rejected_orders = await orderModel.find({status : "rejected"})
        res.render('admin/rejected_orders'  , {rejected_orders})
    }

    async getPendingOrders(req , res){
        const pending_orders = await orderModel.find({status : "pending"})
        res.render('admin/pending_orders'  , {pending_orders})
    }

    async add_blog_get(req , res){
        res.render('admin/add_blog')
    }

    async add_blog_post(req , res){
        const {title ,  desc} = req.body;
        const blog_data = new blogModel({
           title,
           desc,
            image :'images/'+req.file.filename
        })

        const added = await blog_data.save()
        res.redirect('back')
    }
   async add_product_post(req , res){
        const {name , price , desc , category} = req.body;
        const product_data = new productModel({
            name ,
            price , 
            desc ,
            category,
            thumbnail :'images/'+req.file.filename
        })

        const added = await product_data.save()
        res.redirect('back')
    }
   
}
export default AdminController