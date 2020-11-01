const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const Officers = sequelize.define('officer' , {

    officerID:{
      type:Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    officerRank:{
      type: Sequelize.STRING,
      allowNull: false ,
    },

    officerName:{
      type: Sequelize.STRING,
      allowNull: false ,
    },

});

module.exports = Officers;
