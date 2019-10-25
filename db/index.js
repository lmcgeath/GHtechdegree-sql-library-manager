const routes = require('express').Router();

const Sequelize = require('sequelize');

routes.get('/', (req, res) => {
   res.status(200).json({ message: 'Connected!' });
 });

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db',
  logging: false
});

const db = {
  sequelize,
  Sequelize,
  models: {},
};
//Find out what this code is doing, it throws an error
db.models.Book = require('./models/book.js')(sequelize);

// db.models.Person = require('./models/person.js')(sequelize);

module.exports = db;

module.exports = routes;
