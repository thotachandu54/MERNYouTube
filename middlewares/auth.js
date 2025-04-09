import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export const isAunthencticated = async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token)

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized, please login",
        });
    }

    try {
        const decoded = jwt.verify(token, 'process.env.JWT_SECERT'); // Replace with your secret key
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};