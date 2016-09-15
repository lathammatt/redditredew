'use strict';

const express = require('express');

const app = express()
const port = 3000
const routes = require("./routes/")


app.set('view engine', 'pug');
app.use(routes)
app.use(express.static("public"))



const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
})
