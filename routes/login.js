'use strict';

const {Router} = require('express')
const passport = require('passport')

const router = Router()

// const session = require('../controllers/session')

router.get('/login', (req, res) => {
  res.render('/login')
})


router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router