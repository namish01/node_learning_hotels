// MAKING SERVER USING EXPRESS JS:
const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());//MIDDLE WARE THAT GIVES US DATA IN JSON FORMAT FROM THE DATA RECIEVED:
//  req.body m save krta  h data ko lake
//  (bodyparser ko bhi npm i karna padta h):
const PORT=process.env.PORT||3000;
app.get('/', function (req, res) {
  res.send('How can i assist you...?');
})

const menuRoutes=require('./Routes/menuRoutes');
app.use('/menu',menuRoutes);

const personRoutes=require('./Routes/personRoutes');
app.use('/person',personRoutes);


app.listen(PORT, () => {
  console.log("listening on port 3000");
})

