import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.js';//importing the userRouter
import blogRouter from './routes/blog.js';//importing the blogRouter
import { config } from 'dotenv';
import cors from 'cors';
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Required for cookie handling
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}))

 config({
  path:'./data/.env'
 });
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    dbName: "mernYoutube",
}).then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log("MongoDB connection error:", err));


app.use('/api/users',userRouter);//Register the userRouter


app.use('/api/blog',blogRouter);//register the blogRouter

//MVC =MODEL VIEWS CONTROLLERS

app.listen(process.env.port, () =>
    console.log(`Server is running on port ${process.env.port}`)
);
