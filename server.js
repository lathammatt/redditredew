'use strict';

const express = require('express');

const app = express()
const port = 3000
const routes = require("./routes/")
const { connect } = require('./database')
const bodyParser = require("body-parser")

app.set('view engine', 'pug');
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
