const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Class = sequelize.define('class' , {
  classCode:{
    primaryKey : true,
    type: Sequelize.STRING ,
    allowNull: false ,
  },
  className:{
    type: Sequelize.STRING,
  }
});

module.exports = Class ;
