import express from 'express'
import cors from 'cors';
import connectDB from './db/index.js'
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import foodRoutes from './routes/foodRoutes.js'

// config
dotenv.config()

// express app
const app = express();

// port
const port = process.env.PORT || 5000;

// connect to database
connectDB();

// middleware
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.json({ limit: '16kb' }));
app.use(express.static('public'));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// routes
app.get('/', (req, res) => {
    res.send('Hello World');
})
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/foods', foodRoutes);

// listen
app.listen(port, () => {
    console.log(`⚙️  Server is running at port : http://localhost:${process.env.PORT}`);
})