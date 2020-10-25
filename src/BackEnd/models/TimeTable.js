const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const TimeTable = sequelize.define('timeTable' , {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey:true
  },
  year:Sequelize.INTEGER,
  classCode:{
    type: Sequelize.STRING,
    foreignKey: true
  },
  className:{
    type : Sequelize.STRING,
    allowNull: true,
  },
  classNo:{
    type: Sequelize.INTEGER,
  },
  subjectCode:{
    type:Sequelize.STRING,
    foreignKey: true
  },
  subjectName:{
    type: Sequelize.STRING,
  },
  oddWeek:Sequelize.BOOLEAN,
  Day:Sequelize.STRING,
  lectureNo:Sequelize.INTEGER,
  lectureHall:Sequelize.STRING,
  lectureType:{
    type: Sequelize.STRING,
  },
});

module.exports = TimeTable;
