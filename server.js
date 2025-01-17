const express=require('express')
const app =express();
const db=require('./db');
const bodyParser=require('body-parser');
const personRoutes=require('./routes/personRoutes')
const menuRoutes=require('./routes/menuRoutes');
//const { config } = require('dotenv');
require('dotenv').config();
const PORT=process.env.PORT||3000;
app.use(bodyParser.json());

app.use('/person',personRoutes);

app.use('/menu',menuRoutes);

app.listen(PORT ,() => {
    console.log('http://localhost:3000');
    });
