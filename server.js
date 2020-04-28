const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')

require('dotenv').config()

//Database connection 
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("autoIndex", false);


//Models
require("./models/user");

//Routing
const userRouter = require('./routes/user')

const app = express()
const port = process.env.PORT || 3000;

var sess = {
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true
}

app.use(session(sess))

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

//Create view engine
app.set('view engine', 'ejs')

app.locals = {
    site: {
        title: 'Chat-Application',
    }
}

//Encodes url for data passing
app.use(express.urlencoded())
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    if(req.session.loggedin)
        res.redirect('/chat')
    else
        res.render('pages/index')
})

app.use('/', userRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
})