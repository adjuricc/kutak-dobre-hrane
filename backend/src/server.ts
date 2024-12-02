import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import user_router from './routers/user.routes';
import admin_router from './routers/admin.routes';
import subject_router from './routers/subject.routes';
import restaurant_router from './routers/restaurant.routes';
import axios_router from './routers/axios.routes';
import reservation_router from './routers/reservation.routes';
import meal_router from './routers/meal.routes';
import order_router from './routers/order.routes';

const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const axios = require('axios');


app.use(cors());
app.use(express.json());

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // Example: limit to 50MB file size
}));

app.use(bodyParser.json());

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));



// app.use(bodyParser.json({ limit: '50mb' }));  // Adjust the limit as needed
// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const port = 4000;
const uri = "mongodb://127.0.0.1:27017/kutak_dobre_hrane";

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
    
    const router = express.Router();
    router.use('/users', user_router);
    router.use('/admin', admin_router);
    router.use('/subjects', subject_router);
    router.use('/restaurants', restaurant_router);
    router.use('/axios', axios_router);
    router.use('/reservations', reservation_router);
    router.use('/meals', meal_router);
    router.use('/orders', order_router);

    app.use('/', router);

    app.listen(4000, () => console.log(`Express server running on port 4000`));
})