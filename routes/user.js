import express from 'express';
import {userLogin,userRegister,logout,getMyProfile} from '../controllers/user.js';//importing the user controller
const router= express.Router();
import { isAunthencticated } from '../middlewares/auth.js';

//User Registration Route
router.post('/register',userRegister);

//User Login Route
router.post('/login',userLogin);

//User LogOut Route
router.get('/logout',logout);

//User Profile Route
router.get('/myprofile',isAunthencticated,getMyProfile);



//User default Route or home Route
export default router;