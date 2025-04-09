//used to store the common function code of the Controller in which the user.js

import jwt from 'jsonwebtoken';



export const generateCookie =(user,res,statusCode=200,message)=>{
     const token = jwt.sign({ _id: user._id }, 'process.env.JWT_SECERT', { expiresIn: '10m' });
    
        res.status(201).cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000,
            sameSite:process.env.NODE_ENV==="Development" ? "lax":"none",
            secure:process.env.NODE_ENV==="Devlopement" ? false:true,
        }).json({
            success: true,
            message,
            user,
        });
}

