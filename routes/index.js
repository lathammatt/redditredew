"use strict";

const { Router } = require("Express");
const router = Router();
const Articles = require("../models/articles")

// router.get("/", (req, res)=>{
//   res.render("index")
// })
router.get("/new", (req, res)=>{
  res.render("new")
})


router.post('/new', (req, res, err) =>
  Articles
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(err)
)

router.get('/', (req, res, err) =>
  Promise
    .all([
      Articles.find().sort({ score: 1 })
    ])
    .then(([
        articles
      ]) =>
      res.render('index', {page: "index", articles })
    )
    .catch(err)
)


module.exports = router
