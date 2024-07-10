// RESPONSIBLE FOR ESTABLISHING CONNECTION BETWEEN NODE JS AND MONGO DB THROUGH MONGOOSE LIBERARY:
const mongoose=require('mongoose');
// DEFINE THE MONGODB CONNECTION URL:
const mongoURL=  'mongodb://127.0.0.1:27017/hotels'//mongodb://127.0.0.1:27017/YOURDB

// SET UP MONGODB CONNECTION:
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true

})
    // GET THE DEFAULT CONNECTION
    // MONGOOSE MAINTAIN THE DEFAULT CONNECTION OBJECT REPRESENT THE MOINGODB CONNECTION:
const db=mongoose.connection;

// DEFINE EVENT LISTNERS FOR DATABASE CONNECTION:
 db.on('connected',()=>{
    console.log('connected to mongo db server:')
 })

 db.on('error',(err)=>{
    console.log('MONGODB connection error')
 })

 db.on('disconnected',()=>{
    console.log('disconneced from server')
 })

// EXPORT THE DATABASE CONNECTION:
module.exports=db;  