'use strict';

const express = require('express');
const session = require('express-session')
const passport = require('passport')

const port = process.env.PORT || 3000
const routes = require("./routes/")
const { connect } = require('./database')
const bodyParser = require("body-parser")
const {cyan, red } = require('chalk')

const app = express()
app.set('view engine', 'pug');

app.use(({ method, url, headers: { 'user-agent': agent } }, res, next) => {
    const timeStamp = new Date()
  console.log(`[${timeStamp}] "${cyan(`${method} ${url}`)}" "${agent}"`)
  next()
})

require('./passport-config')
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
	app.locals.email = req.user && req.user.email
	next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))



/////routes should be last
app.use(routes)




connect()
  .then(() => {
    app.listen(port, () =>
      console.log(`Listening on port: ${port}`)
    )
  })
  .catch(console.error)
