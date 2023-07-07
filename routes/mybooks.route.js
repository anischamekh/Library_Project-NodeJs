const bookController = require('../controllers/book.controller')
const router = require('express').Router()
const authGuard = require('./authGuard')
const multer = require('multer')


router.get('/',authGuard.isAuth,bookController.getMyBooks)
router.get('/delete/:id',authGuard.isAuth,bookController.deleteBook)

router.get('/update/:id',authGuard.isAuth,bookController.getUpdateBookPage)


router.post('/update',multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'assets/uploads')
        },
        filename:function(req,file,cb){
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
}).single('image'),
authGuard.isAuth,bookController.updateBookController)


module.exports = router