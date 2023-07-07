const authModel = require('../models/auth.model')



exports.getSignUpPage = (req,res,next)=>{

    res.render('signup',{verifUser:req.session.userId, message:req.flash('error')[0]})
}

exports.postSignUpData = (req,res,next)=>{

    authModel.signupFunctionModel(req.body.firstName,req.body.lastName,req.body.email,req.body.password).then((user)=>{
        res.redirect('/login')
    }).catch((err)=>{
        req.flash('error',err)
        res.redirect('/signup')

    })
}



exports.getLoginPage = (req,res,next)=>{

    res.render('login',{verifUser:req.session.userId, message:req.flash('error')[0]})
}

exports.postLoginData = (req,res,next)=>{

    authModel.loginFunctionModel(req.body.email,req.body.password).then((id)=>{
        req.session.userId = id
        res.redirect('/')
    }).catch((err)=>{
        req.flash('error',err)
        res.redirect('/login')
    })
}

exports.logoutFunctionModel = (req,res,next)=>{
    
    req.session.destroy(()=>{
        res.redirect('/login')
    })
}