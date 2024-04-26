import dotenv from 'dotenv';
dotenv.config()
let allowedOrigins;
if (process.env.NODE_ENV=="development"){
allowedOrigins = [
    'http://localhost:5000',
    'http://localhost:8000',
    'http://localhost:3000',
    ]
} 


export {allowedOrigins}