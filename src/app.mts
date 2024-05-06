import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router as portfolioRouter } from './routes/portfolio.route.mjs';
import cors from 'cors';

dotenv.config();

const mongodb_uri: string = process.env.MONGODB_URI || '';
const app = express();
const PORT = 8000;

async function connect_mogodb(connection_string: string){
    await mongoose.connect(connection_string);
    console.log('connected to mogodb database!');
}

try{
    await connect_mogodb(mongodb_uri);
} catch(e){
    console.log('error connecting to mongodb: ', e);
};

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

app.use(cors());

app.use(express.json());

app.get('/', (req,res)=>{
    res.status(200).send('Hello World');
});

app.use("/api/portfolio", portfolioRouter);