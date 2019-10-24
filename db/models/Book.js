const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
      // Set custom primary key column
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   title: {
      type: Sequelize.STRING,
      allowNull: false, // disallow null
      validate: { 
         notNull: {
            msg: 'Please provide a value for "title"',
          },
         notEmpty: {
            // custom error message
          msg: 'Please provide a value for "title"',
         }
      },
    },
   
    year: {
      type: Sequelize.DATEONLY,
      allowNull: false, // disallow null
      validate: { 
         notNull: {
            msg: 'Please provide a value for "year"',
          },
      },
    },
    genre: {
      type: Sequelize.INTEGER,
      allowNull: false, // disallow null
      defaultValue: false, // set default value
    },
     author: {
      type: Sequelize.STRING,
      allowNull: false, // disallow null
      validate: { 
         notNull: {
            msg: 'Please provide a value for "author"',
          },
         notEmpty: {
            // custom error message
          msg: 'Please provide a value for "author"',
         }
      },
    },   
      deletedAt: {
         type: Sequelize.DATEONLY,
         allowNull: true
      },
    
      paranoid: true, // enable "soft" deletes
      sequelize });

  return Book;
   };