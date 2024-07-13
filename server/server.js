const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const {
    connectDB
} = require("./config/db");
const morgan = require('morgan')
const app = express();






// configuration
dotenv.config({});
connectDB();


//
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));



app.use('/api/v1/all' ,require('./routes/imageRoute'))
app.use('/api/v1/user' ,require('./routes/userRoute'))
app.use('/api/v1/food' ,require('./routes/foodRoute'))
app.use('/api/v1/order' ,require('./routes/orderRoute'))
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server is live on port ${port}`);
})