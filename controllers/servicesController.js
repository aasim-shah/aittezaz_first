import userModel from "../models/userModel.js";
import  Jwt  from 'jsonwebtoken';
import cookieParser from "cookie-parser";


export const services = (app)=> {
    return ({
      home(req , res){
        res.redirect('/')
    },
    async getArticle(req ,res){
        res.render('article')
    },
    async getAssignment(req ,res){
        res.render('assignment')
    }
    ,
    async getBlogpost(req ,res){
        res.render('blogposts')
    }
    ,
    async getCasestudy(req ,res){
        res.render('case_study')
    }
    ,
    async getEssay(req ,res){
        res.render('essay')
    }
    ,
    async getPostcontent(req ,res){
        res.render('post_content')
    }
    ,
    async getResearch(req ,res){
        res.render('research')
    }
    ,
    async getThesis(req ,res){
        res.render('thesis')
    }



    
    })
}