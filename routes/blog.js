import express from 'express';
import { isAunthencticated } from '../middlewares/auth.js';
import {} from '../controllers/blog.js';
import  {createBlog,myBlog,updateBlog,deleteBlog} from '../controllers/blog.js';

const router = express.Router();


router.post('/new',isAunthencticated,(req,res,next)=>{
    console.log("Route hit");
    next();
},createBlog);

router.get('/myblogs',isAunthencticated,myBlog);

router.put('/:id',isAunthencticated,updateBlog);

router.delete('/:id',isAunthencticated,deleteBlog);

export default router;