const express = require('express')


//Routing
const userRouter = require('./routes/user')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000;

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

app.use('/', userRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
})