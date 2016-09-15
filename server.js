'use strict';

const express = require('express');

const app = express()
const port = 3000

app.set('view engine', 'pug');

const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
})
