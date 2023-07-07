const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const bp = require('express').urlencoded({extended:true})
const authGuard = require('./authGuard')


router.get('/signup',authGuard.isNotAuth,authController.getSignUpPage)
router.post('/signup',bp,authController.postSignUpData)


router.get('/login',authGuard.isNotAuth,authController.getLoginPage)
router.post('/login',bp,authController.postLoginData)

router.post('/logout',authController.logoutFunctionModel)



module.exports=router