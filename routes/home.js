const route=require('express').Router();
const controller=require('../controllers/home');
const passport=require('passport')

route.get('/',controller.home);

route.get('/profile',passport.authenticate('jwt',{session:false}),controller.profile);
route.get('/sign',controller.signIn);
route.post('/sign',controller.post_signIn);
route.post('/create-session',controller.createSession)

module.exports=route;