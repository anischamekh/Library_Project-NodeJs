const express = require('express')
const path = require('path')
const homeRouter = require('./routes/home.route')
const bookRouter = require('./routes/book.route')
const authRouter = require('./routes/auth.route')
const myBooksRouter = require('./routes/mybooks.route')
const contactRouter = require('./routes/contact.route')
const aboutRouter = require('./routes/about.route')
const session = require('express-session')
const flash = require('connect-flash')
var MongoDBStore = require('connect-mongodb-session')(session)


const app = express()


var Store = new MongoDBStore({
    uri:'mongodb://localhost:27017/library',
    collection:'mySessions'
})

app.use(flash())
app.use(session({
    secret:'this is my secret key dfjkbnjdfnbhjshdvbshdvsd',
    store:Store,
    resave: true,
    saveUninitialized: true
}))




app.use(express.static(path.join(__dirname,'assets')))



app.set('view engine','ejs')
app.set('views','views')



app.get('/',homeRouter)

app.use('/',bookRouter)

app.use('/',authRouter)

app.use('/mybooks',myBooksRouter)

app.get('/contact',contactRouter)

app.get('/about',aboutRouter)


app.get('/dashboard',(req,res,next)=>{
    res.render('dashboard')
})
app.get('/tables',(req,res,next)=>{
    res.render('tables')
})



app.listen(3000,(console.log('The server is running on port 3000')))