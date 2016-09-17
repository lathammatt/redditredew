"use strict";

const { Router } = require("express");
const router = Router();
const Articles = require("../models/articles")

// router.get("/", (req, res)=>{
//   res.render("index")
// })
router.get("/new", (req, res)=>{
  res.render("new")
})

router.get('/', (req, res, err) =>
Promise
.all([
  Articles.find().sort({ score: -1 })
])
.then(([
  articles
]) =>
res.render('index', {page: "index", articles })
)
.catch(err)
)

router.post('/:id/down', (req, res, next) => {

  const postId = req.params.id;

  Articles
    .findByIdAndUpdate(postId, {$inc: { score: -1} })
    .then(() => res.redirect('/'))
    .catch(console.error)
})

	router.post('/:id/up', (req, res, next) => {
		const postId = req.params.id;

		Articles
			.findByIdAndUpdate(postId, {$inc: { score: 1} })
			.then(() => res.redirect('/'))
			.catch(console.error)
	})

router.post('/new', (req, res, err) =>
  Articles
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(err)
)





module.exports = router
