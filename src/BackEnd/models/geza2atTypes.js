const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Geza2atTypes = sequelize.define('geza2atType' , {

  geza2ID:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  geza2Name:{
    type: Sequelize.STRING,
    allowNull: false,
  },

});

module.exports = Geza2atTypes;
