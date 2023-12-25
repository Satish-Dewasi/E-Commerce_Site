import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from "./routes/authRoute.js";



//configure env
dotenv.config();

// database config
connectDB();

// rest object
const app = express();


//middlewares
app.use(express.json())
app.use(morgan('dev'))


//routes

app.use("/api/v1/auth", authRoute)

//rest api
app.get('/', (req, res)=>{
    res.send(
       "<h1> Welome to E-Commerce Site</h1>"
    );
})

//port 
const PORT = process.env.PORT;
const AUTHOR = process.env.AUTHOR;

// run listen
app.listen(PORT, ()=>{
    console.log(`Hey ${AUTHOR} Server Running on ${PORT}`);
})