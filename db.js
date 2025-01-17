const mongoose=require('mongoose');              //database connection
require('dotenv').config();
const DB_URL=process.env.DB_URL;
const mongoURL=DB_URL;

mongoose.connect(mongoURL);

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to db");
});

module.exports=db;