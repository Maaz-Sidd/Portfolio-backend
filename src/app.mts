import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router as portfolioRouter } from './routes/portfolio.route.mjs';
import cors from 'cors';
import session from 'express-session';

dotenv.config();

const mongodb_uri: string = process.env.MONGODB_URI || '';
const app = express();
const PORT = 8000;

async function connect_mogodb(connection_string: string): Promise<void> {
    await mongoose.connect(connection_string);
    console.log('connected to mogodb database!');
}

try {
    await connect_mogodb(mongodb_uri);
} catch(e) {
    console.log('error connecting to mongodb: ', e);
}

// CORS configuration - Must come first
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite's default port
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

app.use("/api/portfolio", portfolioRouter);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});