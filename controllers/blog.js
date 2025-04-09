import { Blog } from "../models/blogs.js";
import { isAunthencticated } from '../middlewares/auth.js';


export const createBlog = async (req, res) => {
    try {
      const { title, description, image } = req.body;
  
      const blog = await Blog.create({
        title,
        description,
        image:imgUrl,
        user: req.user
      });
  
      res.status(201).json({
        success: true,
        message: 'Blog added successfully',
        blog,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
  
export  const myBlog=async(req,res)=>{
    const userid=req.user._id;
    

    const blogs = await Blog.find({user:userid})
    res.status(200).json({
        success:true,
        blogs,
    });
};
export  const updateBlog=async(req,res)=>{
 const {title,description,imgUrl}=req.body;
    const id=req.params.id;
    

    const blog=await Blog.findById(id);
    if(!blog) return res.status(404).json({
        success:false,
        message:"Blog not found",
    })
    blog.title=title,
    blog.description=description,
    blog.image=imgUrl,
    blog.save()
    res.json({
        success:true,
        message:"updating blog",
        blog
    });
};
export  const deleteBlog=async(req,res)=>{
    const id =req.params.id;
    const blog=await Blog.findById(id);
    if(!blog) return res.status(404).json({
        success:false,
        message:"Blog not found",
    })
    await blog.deleteOne();
    res.json({
        success:true,
        message:"Blog deleted successfully",
    });
};