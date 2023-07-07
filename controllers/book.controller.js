const BookModel = require('../models/book.model')


exports.getAllBooksController = (req,res,next)=>{

    BookModel.getAllBooks().then(books=>{
        res.render('books',{books:books,verifUser:req.session.userId})
    })
}



exports.getBookDetailsController = (req,res,next)=>{
    
    let id = req.params.id

    BookModel.getBookDetails(id).then(book=>{
        res.render('details',{book:book,verifUser:req.session.userId})
    })
}


exports.getAddBookController = (req,res,next)=>{

    res.render('addbook',{verifUser:req.session.userId,Smessage:req.flash('SuccessMessage')[0],Emessage:req.flash('ErrorMessage')[0]})

}

exports.postAddBookController = (req,res,next)=>{

    console.log(req.body)
    console.log(req.file.filename)
    BookModel.postAddBookController(req.body.title,req.body.author,req.body.description,
                                    req.body.price,req.body.nbr_pages,req.file.filename,req.session.userId)
                                    .then((msg)=>{
                                    
                                        req.flash('SuccessMessage',msg)
                                        res.redirect('/addbook')
                                    
                                    }).catch((err)=>{
                                    
                                        req.flash('ErrorMessage',err)
                                        res.redirect('/addbook')
                                    })

}


exports.getMyBooks = (req,res,next)=>{
    BookModel.getMyBooks(req.session.userId).then((books)=>{
        
        res.render('mybooks',{
            verifUser:req.session.userId,
            mybooks:books})

    })
    
}

exports.deleteBook = (req,res,next)=>{
    let id=req.params.id
    
    BookModel.deleteBook(id).then((verif)=>{
        res.redirect('/mybooks')
    }).catch((err)=>{
        console.log(err)
    })
}

exports.getUpdateBookPage = (req,res,next)=>{

    let id=req.params.id
    BookModel.getUpdateBookPageModel(id).then((book)=>{
        res.render('updatebook',{updatedBook:book,verifUser:req.session.userId,Smessage:req.flash('SuccessMessage')[0],Emessage:req.flash('ErrorMessage')[0]})
    })

}

exports.updateBookController = (req,res,next)=>{

    if(req.file){
        BookModel.updateBookModel(req.body.bookId,req.body.title,req.body.description,req.body.author,req.body.price,req.body.nbr_pages,req.file.filename,req.session.userId).then((msg)=>{
            req.flash('SuccessMessage',msg)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        }).catch((err)=>{
            req.flash('ErrorMessage',err)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        })
    }else{
        BookModel.updateBookModel(req.body.bookId,req.body.title,req.body.description,req.body.author,req.body.price,req.body.nbr_pages,req.body.oldImage,req.session.userId).then((msg)=>{
            req.flash('SuccessMessage',msg)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        }).catch((err)=>{
            req.flash('ErrorMessage',err)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        })
    }
}
