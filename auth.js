const Person=require('./models/Person');
const passport=require('passport');
const localStrategy=require('passport-local').Strategy;


passport.use(new localStrategy(async(username,password,done)=>{
    try{
       console.log("received credentials");
       const user=await Person.findOne({username: username});
       if(!user)
       {
           return done(null,false,{message:"Incorrect username"});
       }
       const isPasswordMatch=await user.comparePassword(password);
       if(isPasswordMatch)
        {
            return done(null,user);
        }else{
            return done(null, false,{message:"Incorrect password"});
        }
    }
    catch(err){
           console.log(err);
    }
}))

module.exports=passport;