import mongoose from "mongoose";

const Schema = new mongoose.schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    authorImg:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true,
        default:Date.now
    },
})

const BlogModel = mongoose.models.blog || mongoose.model('blog ',Schema);

export default BlogModel;