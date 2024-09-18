require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbconnection');
const authroutes = require("./routes/authroutes");
const itemroutes = require("./routes/itemroutes");
const searchroutes = require("./routes/searchroutes");
const cors = require('cors');

const app= express();
connectDB();
app.use(express.json());
app.use(cors());


// ROuTES
app.use('/lostFound',authroutes); 
app.use('/lostFoundItems',itemroutes);
app.use('/search',searchroutes);
const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`server running pon port ${PORT}`)
});