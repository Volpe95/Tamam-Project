const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Subject = sequelize.define('subject' , {
  subjectCode:{
    type: Sequelize.STRING,
    allowNull: false
  },
  subjectName: Sequelize.STRING,
  lectureHours: Sequelize.INTEGER,
  exerciseHours: Sequelize.INTEGER,
  year: Sequelize.INTEGER,
  totalHours: Sequelize.INTEGER,
  classCode:{
    type:Sequelize.STRING,
    foreignKey: true,
    allowNull: false
  }
});

module.exports = Subject ;
