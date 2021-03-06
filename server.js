// Read .ENV Config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Import Library
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')

// Import Router
const userloginRouter = require('./routes/userlogin')
const homeRouter = require('./routes/home')
const servicesRouter = require('./routes/services')
const registryRouter = require('./routes/registry')
const reportRouter = require('./routes/report')

// App default Setting
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// DB Connection
const mongoose = require('mongoose')
const { request } = require('express')
mongoose.connect(process.env.DATABASE_USER_URL, {
useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose by user'))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
}))

// Passport Config
const passportConfig = require('./config/passport')
passportConfig(passport)

// Router
app.use('/', homeRouter)
app.use('/user', userloginRouter)
app.use('/services', servicesRouter)
app.use('/registers', registryRouter)
app.use('/reports', reportRouter)

app.listen(process.env.PORT || 3000)