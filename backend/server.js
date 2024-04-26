import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import cookirParser from 'cookie-parser'
import { notFound,errorHandler } from './middleware/errMiddleware.js';
import connectDB from './config/db.js';
const port=process.env.PORT||5000;
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { corsOptions } from './config/corsOptions.js';
import { credentials } from './middleware/credentials.js';
import { getAllItems } from './controllers/itemController.js';
import { getItems } from './controllers/itemController.js';
// import bodyParser from 'body-parser';

connectDB()
const app=express()


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

//cross Orignis Resource Sharing 
app.use(cors(corsOptions))


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use('/api/users',userRoutes)

app.get('/',(req,res)=>res.send('Server is ready'))

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>console.log(`Server started on ${port}`))