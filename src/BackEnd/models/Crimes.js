const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Crimes = sequelize.define('crime',  {

    crimeID:{
      type:Sequelize.INTEGER,
      primaryKey: true ,
      autoIncrement: true,
    },

    crimeName: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    crimePoints: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

});


module.exports = Crimes ;
