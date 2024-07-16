// MAKING SERVER USING EXPRESS JS:
const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();
const passport=require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());//MIDDLE WARE THAT GIVES US DATA IN JSON FORMAT FROM THE DATA RECIEVED:
//  req.body m save krta  h data ko lake
//  (bodyparser ko bhi npm i karna padta h):
const PORT=process.env.PORT||3000;

// MIDDLE WARE :
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}]:request made to :${req.originalUrl}`);
  next();
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false});

app.get('/', function (req, res) {
  res.send('How can i assist you...?');
})



const menuRoutes=require('./Routes/menuRoutes');
app.use('/menu', menuRoutes);

const personRoutes=require('./Routes/personRoutes');
app.use('/person',personRoutes);


app.listen(PORT, () => {
  console.log("listening on port 3000");
})

