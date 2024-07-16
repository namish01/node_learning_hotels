const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const person=require('./models/person');

passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
    try {
      console.log("recieved credientials:",USERNAME,password );
      const user=await person.findOne({username:USERNAME});
      if(!user){
        return done(null,false,{message:'Incorrect ussername:...'});
      }
      const ispassword= await user.comparePassword(password);
      if(ispassword){
        return done(null,user);
      }
      else{
        return done(null,false,{message:'Incorret password:...'});
      }
    } catch (error) {
      return done(error); 
    }
}));
module.exports=passport;