const mongoose=require('mongoose');              //database connection
require('dotenv').config();
//const DB_URL=process.env.DB_URL;
//const mongoURL=DB_URL;
const DB_URL_PUBLIC=process.env.DB_URL_PUBLIC;
const mongoURL=DB_URL_PUBLIC;

mongoose.connect(mongoURL);

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to db");
});

module.exports=db;