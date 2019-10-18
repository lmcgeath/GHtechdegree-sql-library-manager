const db = require('./db');
const { Book } = db.models;
const { Op } = db.Sequelize;
const app = require('express')();
// const routes = require('./routes');

app.set('view engine', 'pug');

app.get('/', (req, res) => {
   res.render('index')
});//must redirect to /books

//Shows the full list of books
app.get('/books', (req, res) => { 
   // res.render('index')
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
  await db.sequelize.sync({ force: true });

  try {
   // const movie = await Movie.create({
   //    title: 'Toy Story',
   //    runtime: 81,
   //    releaseDate: '1995-11-22',
   //    isAvailableOnVHS: true,
   //  });
   // //  console.log(movie.toJSON());

   //  const movie2 = await Movie.create({
   //    title: 'The Incredibles',
   //    runtime: 115,
   //    releaseDate: '2004-04-14',
   //    isAvailableOnVHS: true,
   //  });
   // //  console.log(movie2.toJSON());

   //   // New instance
   //   const movie3 = await Movie.build({
   //    title: 'Toy Story 3',
   //    runtime: 103,
   //    releaseDate: '2010-06-18',
   //    isAvailableOnVHS: false,
   //  });
   //  await movie3.save();
   // //  console.log(movie3.toJSON());

   // const movieById = await Movie.findByPk(1);
   // //  console.log(movieById.toJSON());

   // const movieByRuntime = await Movie.findOne({ where: { runtime: 115 } });
   // // console.log(movieByRuntime.toJSON());

   // const Allmovies = await Movie.findAll({
   //    attributes: ['id', 'title'],
   //    where: {
   //      releaseDate: {
   //        [Op.gte]: '2004-01-01', // greater than or equal to the date
   //      },
   //      runtime: {
   //        [Op.gt]: 95, // greater than 95
   //      },
   //    },
   //    order: [['id', 'DESC']] // IDs in descending order
   //  });
   // //  console.log( movies.map(movie => movie.toJSON()) );

   // const toyStory3 = await Movie.findByPk(3);
   // await toyStory3.update({
   //   title: 'Trinket Tale 3', // this will be ignored
   //   isAvailableOnVHS: true,
   // }, { fields: ['isAvailableOnVHS'] }); 

   // // console.log( toyStory3.get({ plain: true }) );
  
   //  // Find a record
   //  const toyStory = await Movie.findByPk(1);

   //   // Delete a record
   //   await toyStory.destroy();

   //   // Find and log all movies
   //   const movies = await Movie.findAll();
   //   console.log( movies.map(movie => movie.toJSON()) );


   //  const person = await Person.create({
   //    firstName: 'Tom',
   //    lastName: 'Hanks',
   //  });
   // //  console.log(person.toJSON());
   // const people = await Person.findAll({
   //    where: {
   //      lastName: 'Hanks'
   //    }});
   // // console.log( people.map(person => person.toJSON()));

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