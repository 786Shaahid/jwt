const passport=require('passport');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const Doctor=require('../models/model')
const opts={
jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey:"codial"
}

passport.use(new JwtStrategy(opts,function(jwtPayLoad,done){
    // console.log(jwtPayLoad._id);
   const user= Doctor.findById(jwtPayLoad._id);
   auth(user);
        function  auth(user){
 if(user){
    return done(null,user);
 }else{
    return done(null,false)
 }}
    }))  


module.exports=passport;