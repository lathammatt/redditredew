'use strict';

const express = require('express');

const port = process.env.PORT || 3000
const routes = require("./routes/")
const { connect } = require('./database/database') ////////moved database to its own folder

/////////auth requires///////////////
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
///////////////////////////////////////////////
const bodyParser = require("body-parser")
const {cyan, red } = require('chalk')

const app = express()

//////////////////1. set View Engine///////////////////////
app.set('view engine', 'pug');
////////////////////////////////////////

//////////////////2. Middlewares///////////////////////
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))
app.use(({ method, url, headers: { 'user-agent': agent } }, res, next) => {
    const timeStamp = new Date()
  console.log(`[${timeStamp}] "${cyan(`${method} ${url}`)}" "${agent}"`)
  next()
})
////////////////////////////////////////////////////////////////////////
////////////////////3. routes (should be last) //////////////////////////
app.use(routes)
////////////////////////////////////////////////////////////////////////

//////////////////////4. Error handling//////////////////////////////////////////////////
app.use((err, { method, url, headers: { 'user-agent': agent } }, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendStatus(err.status || 500)
  } else {
    res.set('Content-Type', 'text/plain').send(err.stack)
  }

  const timeStamp = new Date()
  const statusCode = res.statusCode
  const statusMessage = res.statusMessage

  console.error(
    `[${timeStamp}] "${red(`${method} ${url}`)}" Error (${statusCode}): "${statusMessage}"`
  )
  console.error(err.stack)
})

/////////////////////////5. Connect to the database/server///////////////////////////////////////////////
connect()
  .then(() => {
    app.listen(port, () =>
      console.log(`Listening on port: ${port}`)
    )
  })
  .catch(console.error)
