const mongoose = require('mongoose')

var schemaBook = mongoose.Schema({
    title:String,
    author:String,
    description:String,
    price:Number,
    nbr_pages:Number,
    image:String,
    userId:String
})


var Book = mongoose.model('book',schemaBook)
var url = 'mongodb://localhost:27017/library'

exports.getAllBooks=()=>{
    return new Promise((resolve,reject)=>{

        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return Book.find({})

        }).then(books=>{
            mongoose.disconnect()
            resolve(books)

        }).catch(err=>reject(err))
    })
    
}

exports.getThreeBooks=()=>{
    return new Promise((resolve,reject)=>{

        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return Book.find({}).limit(3)

        }).then(books=>{
            mongoose.disconnect()
            resolve(books)

        }).catch(err=>reject(err))
    })
    
}

exports.getBookDetails=(id)=>{
    return new Promise((resolve,reject)=>{
        
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true} ).then(()=>{
            return Book.findById(id)

        }).then(books=>{
            mongoose.disconnect()
            resolve(books)

        }).catch(err=>reject(err))
    })
    
}

exports.postAddBookController = (title,author,description,price,nbr_pages,image,userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true} ).then(()=>{
            let book = new Book({
                title:title,
                author:author,
                description:description,
                price:price,
                nbr_pages:nbr_pages,
                image:image,
                userId:userId
            })
            return book.save()
        
        }).then(()=>{
            mongoose.disconnect()
            resolve('Added !')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)

        })

    }) 

}


exports.getMyBooks=(userId)=>{
    return new Promise((resolve,reject)=>{
    
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return Book.find({userId:userId})
   
       }).then(books=>{
           mongoose.disconnect()
           resolve(books)
   
       }).catch(err=>reject(err))
 
    }) 
 
 }


 exports.deleteBook=(id)=>{
    return new Promise((resolve,reject)=>{
    
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return Book.deleteOne({_id:id})
   
       }).then(books=>{
           mongoose.disconnect()
           resolve(true)
   
       }).catch(err=>reject(err))

    })
  
 }


exports.getUpdateBookPageModel = (id)=>{
    return new Promise((resolve,reject)=>{
    
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return Book.findById(id)
   
       }).then(books=>{
           mongoose.disconnect()
           resolve(books)
   
       }).catch(err=>reject(err))
 
    }) 
 
 }

 exports.updateBookModel = (bookId,newTitle,newDescription,newAuthor,newPrice,newNbr_pages,newFilename,userId) =>{
    
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            
            return Book.updateOne({_id:bookId},{title:newTitle,
                                                description:newDescription,
                                                author:newAuthor,
                                                image:newFilename,
                                                nbr_pages:newNbr_pages,
                                                price:newPrice,
                                                userId:userId})
        
        }).then(()=>{
            mongoose.disconnect()
            resolve('Updated !')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)

        })

    }) 

}
