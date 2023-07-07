const bookController = require('../controllers/book.controller')
const router = require('express').Router()
const authGuard = require('./authGuard')
const multer = require('multer')



router.get('/books',authGuard.isAuth,bookController.getAllBooksController)
router.get('/books/:id',authGuard.isAuth,bookController.getBookDetailsController)


router.get('/addbook',authGuard.isAuth,bookController.getAddBookController)
router.post('/addbook',multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'assets/uploads')
        },
        filename:function(req,file,cb){
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
}).single('image'),
authGuard.isAuth,bookController.postAddBookController)



module.exports=router