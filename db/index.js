const Sequelize = require('sequelize');

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
// db.models.Book = require('./models/Book.js')(sequelize);

// db.models.Person = require('./models/person.js')(sequelize);

module.exports = db;