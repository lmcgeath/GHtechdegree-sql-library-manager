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

db.models.Book = require('./models/Book.js')(sequelize);

// db.models.Person = require('./models/person.js')(sequelize);

module.exports = db;