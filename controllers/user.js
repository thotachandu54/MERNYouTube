import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../models/user.js';//importing the User model
import { generateCookie }  from '../utils/feature.js';//impoting from the utils 
import { json } from 'express';
import bcrypt from 'bcryptjs';
//function to register a user
//user registration
export const userRegister=async (req, res) => {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email }); // Fixed the logic
    if (user)
        return res.status(400).json({
            success: false,
            message: "User already exists"
        });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    generateCookie(user,res,201,"User Register successfully")
}
//funtcion to login a user
//user Login
export const userLogin=async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email }); // Fixed the logic
    if (!user)
        return res.status(400).json({
            success: false,
            message: "User does not exist"
        });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        });

        generateCookie(user,res,201,`Welcome ${user.name}` );
};

//function to logout a user
//user Logout
export const logout=(req,res)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now())
    });
    res.json({
        success:true,
        message:"Logged out successfully"

    })
}

//profile Blog
export const getMyProfile =  (req,res)=>{
 res.status(200).json({
      hello:'hello',
      user:req.user,
    })
}