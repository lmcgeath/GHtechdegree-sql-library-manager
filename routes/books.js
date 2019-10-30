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
  res.render('new-book', { book: {}, title: 'New Book' });
});

/* POST create book. */
router.post('/new', asyncHandler(async (req, res) => {
   let book;
   try {
     book = await Book.create(req.body);
     res.redirect('/books/');
   } catch (error) {
     if(error.name === "SequelizeValidationError") { // checking the error
       book = await Book.build(req.body);
       res.render('form-error', { book, errors: error.errors, title: 'New Book' })
       
     } else {
       throw error; // error caught in the asyncHandler's catch block
     }  
   }
 }));

/* Edit book form. */
router.get('/:id', asyncHandler(async(req, res) => {
   const book = await Book.findByPk(req.params.id);
   if(book) {
      res.render('update-book', { book, title: book.title });      
    } else {
      res.render('error');
    }
}));

/* Update a book. */
router.post('/:id', asyncHandler(async (req, res) => {
   let book;
   try {
     book = await Book.findByPk(req.params.id);
     if(book) {
       await book.update(req.body);
       res.redirect('/books/'); 
     } else {
      res.render('error');
     }
   } catch (error) {
     if(error.name === "SequelizeValidationError") {
       book = await Book.build(req.body);
       book.id = req.params.id; // make sure correct book gets updated
       res.render('update-form-error', { book, errors: error.errors, title: 'Update Book' })
     } else {
       throw error;
     }
   }
 }));

/* Delete individual books. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
   const book = await Book.findByPk(req.params.id);
   await book.destroy();

   if(book) {
      res.redirect('/books');
    } else {
      res.render('error');
    }
}));


module.exports = router;
