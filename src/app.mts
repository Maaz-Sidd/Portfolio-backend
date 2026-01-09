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

/// Define allowed origins
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://maaz-portfolio-7e727.firebaseapp.com',
    'https://maazsidd.ca',
    'https://maaz-portfolio-7e727.web.app'
];

// CORS configuration with dynamic origin checking
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    },
    name: 'sessionId' // Custom name to avoid conflicts
}));

app.use("/api/portfolio", portfolioRouter);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    console.log(`CORS enabled for origins: ${allowedOrigins.join(', ')}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});