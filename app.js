const express = require('express');
const db = require('./db');
const  { Book }  = db.models.Book
const { Op } = db.Sequelize;
const app = express();
const router = express.Router();
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: 'library.db',
   logging: false
 });

// module.exports = router;
// const routes = require('./routes');
// app.set('views', path.join(__dirname, "views"));

app.set('view engine', 'pug');
//Not sure if this or '..path.join.. is right
app.use('/static', express.static('public'));

// console.log(Book.title);
//Routes
app.get('/', (req, res) => {
   // res.redirect('/books')
   res.render('index')

});//must redirect to /books

//Shows the full list of books
app.get('/books', (req, res) => { 
   res.render('index')
});

app.get('/books/new', (req, res) => { //Shows the create new book form.
   res.render('new-book')
});
//Posts a new book to the database. -- not sure if app.post is correct
app.post('/books/new', (req, res) => { 
   // res.render('books')
});
// Shows book detail form.
app.get('/books/:id', (req, res) => { 
   let id = req.params.id;//possibly..
   // res.render('books')
});
// Updates book info in the database.
app.post('/books/:id', (req, res) => { 
   // res.render('books')
});

//Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.
app.post('/books/:id/delete', (req, res) => { 
   // res.render('books')
});


(async () => {
  await db.sequelize.sync();

  try {
   const books = await Book.findAll({
      attributes: ['id', 'title'],
      where: {
        releaseDate: {
          [Op.gte]: '1812-01-01', // greater than or equal to the date
        },
      },
      order: [['id', 'DESC']] // IDs in descending order
    })
    .then(books => {
      res.json(books)
      
      .catch(function(err){});
      return books     
  });
   //  console.log( books.map(book => book.toJSON()) );
   //  console.log(AllBooks)

  } catch (error) {
   if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);

   } else {
      throw error;
   }
 }
})();

// // Set up a middleware function that returns a 404 NOT FOUND HTTP status code and renders a "Page Not Found" view when the user navigates to a non-existent route, such as /error. See the page_found.html file in the example markup folder for an example of what this would look like.

// //Creates error object if the user direct to a page that doesn't exist -- copied from node project, needs editing
// app.use((req, res, next) => {
//    const err = new Error('Not Found')
//    err.status = 404;
//    next(err);
// })
// //Formats 404 error to be more readable -- copied from node project, needs editing
// app.use((err, req, res, next) => {
//    res.locals.error = err;
//    res.status(err.status);
//    res.render('error', err);
//    next(err);
// });


app.listen(3000, () => {
   console.log('App listening on port 3000');
});