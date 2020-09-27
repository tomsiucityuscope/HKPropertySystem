if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const inderRouter = require('./routes/home')
const servicesRouter = require('./routes/services')
const customerRouter = require('./routes/customer')
const agentRouter = require('./routes/agent')
const BranchRouter = require('./routes/branch')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_USER_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', inderRouter)
app.use('/services', servicesRouter)
app.use('/customer', customerRouter)
app.use('/agent', agentRouter)
app.use('/branch', BranchRouter)

app.listen(process.env.PORT || 3000)
