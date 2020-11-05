const Sequelize = require('sequelize');

const sequelize = require('../utils/database');


const Geza2at = sequelize.define('geza2at' , {

  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  studentID:{
    type: Sequelize.INTEGER,
    foreignKey: true,
    allowNull: false ,
  },

  studentName:{
    type: Sequelize.STRING,
    allowNull:false,
  },

  year:{
    type:Sequelize.INTEGER,
    allowNull:false,
  },

  classCode:{
    type: Sequelize.STRING,
    allowNull: false,
    foreignKey: true,
  },

  className:{
    type: Sequelize.STRING,
    allowNull: false ,
  },

  classNo:{
    type: Sequelize.INTEGER,
    allowNull: false ,
  },


  crimeID:{
    type: Sequelize.INTEGER ,
    foreignKey: true,
    allowNull: false ,
  },

  crimeName:{
    type: Sequelize.STRING ,
    allowNull: false ,
  },

  officerID:{
    type: Sequelize.INTEGER,
    allowNull: false ,
    foreignKey: true ,
  },

  officerRank: {
    type : Sequelize.STRING,
    allowNull: false ,
    foreignKey: true ,
  },

  officerName:{
    type: Sequelize.STRING,
    allowNull: false ,
  },

  geza2Points:{
    type: Sequelize.INTEGER ,
    allowNull: true ,
  },

  geza2ID:{
    type: Sequelize.INTEGER,
    foreignKey: true ,
    allowNull: true ,
  },

  geza2Name: {
    type: Sequelize.STRING,
    allowNull: true ,
  },

  geza2Date:{
    type : Sequelize.DATEONLY,
    allowNull: false ,
  },


});

module.exports = Geza2at ;
