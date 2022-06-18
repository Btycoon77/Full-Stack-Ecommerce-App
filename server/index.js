const express = require('express');
const connectDb = require('./config/database');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT
const product = require("./routes/productRoute");
const errorMiddleware = require("./middlewares/error");
// dotenv.config("./config/config.env");
const user = require('./routes/userRoute');
const cookieParser = require('cookie-parser');
const order = require('./routes/orderRoute');
const cors = require('cors');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const payment = require('./routes/paymentRoute')

// middleware for accessing req.body;
app.use(express.json());

// cookie parser
app.use(cookieParser());

// middleware for errors
app.use(errorMiddleware);

// cors
app.use(cors());

app.use(fileUpload())

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);




// connecting to database;
connectDb();

cloudinary.config({
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
});


app.listen(port,()=>{
    console.log(`Server running at port ${port}`)
});