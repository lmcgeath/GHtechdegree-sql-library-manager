const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb){
   return async(req, res, next) => {
     try {
       await cb(req, res, next)
     } catch(error){
       res.status(500).send(error);
     }
   }
 }

/* GET books listing. */
router.get('/', asyncHandler(async (req, res) => {
   const books = await Book.findAll({ order: [[ "year", "DESC" ]] });
  res.render('index', { books, title: 'Books' });
}));

/* Create a new book form. */
router.get('/new', (req, res) => {
  res.render("articles/new", { article: {}, title: "New Article" });
});

/* POST create book. */
//will be add new book form
router.post('/', asyncHandler(async (req, res) => {
   let article;
   try {
     article = await Article.create(req.body);
     res.redirect("/articles/" + article.id);
   } catch (error) {
     if(error.name === "SequelizeValidationError") { // checking the error
       article = await Article.build(req.body);
       res.render("articles/new", { article, errors: error.errors, title: "New Article" })
     } else {
       throw error; // error caught in the asyncHandler's catch block
     }  
   }
 }));

/* Edit book form. */
router.get("/:id/edit", asyncHandler(async(req, res) => {
   const article = await Article.findByPk(req.params.id);
   if(article) {
      res.render("articles/edit", { article, title: "Edit Article" });      
    } else {
      res.sendStatus(404);
    }
}));

/* GET individual book. */
//will be show book detail
router.get("/:id", asyncHandler(async (req, res) => {
   const article = await Article.findByPk(req.params.id);
   if(article){
      res.render("articles/show", { article, title: article.title });
   } else {
      res.sendStatus(404);
   }
}));

/* Update a book. */
router.post('/:id/edit', asyncHandler(async (req, res) => {
   let article;
   try {
     article = await Article.findByPk(req.params.id);
     if(article) {
       await article.update(req.body);
       res.redirect("/articles/" + article.id); 
     } else {
       res.sendStatus(404);
     }
   } catch (error) {
     if(error.name === "SequelizeValidationError") {
       article = await Article.build(req.body);
       article.id = req.params.id; // make sure correct article gets updated
       res.render("articles/edit", { article, errors: error.errors, title: "Edit Article" })
     } else {
       throw error;
     }
   }
 }));

/* Delete article form. */
router.get("/:id/delete", asyncHandler(async (req, res) => {
   const article = await Article.findByPk(req.params.id);
   if(article) {
      res.render("articles/delete", { article, title: "Delete Article" });
    } else {
      res.sendStatus(404);
    }
}));

/* Delete individual article. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
   const article = await Article.findByPk(req.params.id);
   if(article) {
      await article.destroy();
      res.redirect("/articles");
    } else {
      res.sendStatus(404);
    }
}));

module.exports = router;
