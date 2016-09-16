'use strict';

const express = require('express');

const app = express()
const port = process.env.PORT || 3000
const routes = require("./routes/")
const { connect } = require('./database')
const bodyParser = require("body-parser")
const {cyan, red } = require('chalk')

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))
app.use(({ method, url, headers: { 'user-agent': agent } }, res, next) => {
    const timeStamp = new Date()
  console.log(`[${timeStamp}] "${cyan(`${method} ${url}`)}" "${agent}"`)
  next()
})
/////routes should be last
app.use(routes)




connect()
  .then(() => {
    app.listen(port, () =>
      console.log(`Listening on port: ${port}`)
    )
  })
  .catch(console.error)
