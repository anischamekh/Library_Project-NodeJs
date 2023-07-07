const route=require('express').Router()
const AboutController=require('../controllers/about.controller')



route.get('/about',AboutController.getAboutPage)


module.exports=route