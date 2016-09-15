'use strict';

const express = require('express');

const app = express()
const port = 3000
const routes = require("./routes/")
const { connect } = require('./database')
const bodyParser = require("body-parser")

app.set('view engine', 'pug');
app.use(routes)
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))




connect()
  .then(() => {
    app.listen(port, () =>
      console.log(`Listening on port: ${port}`)
    )
  })
  .catch(console.error)
