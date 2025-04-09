import mongoose from "mongoose";




// Mongoose Schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", //SChame name 
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const Blog = mongoose.model("Blog", blogSchema);
 

