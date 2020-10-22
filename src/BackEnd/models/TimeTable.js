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
  subjectCode:{
    type:Sequelize.STRING,
    foreignKey: true
  },
  oddWeek:Sequelize.BOOLEAN,
  Day:Sequelize.STRING,
  lectureNo:Sequelize.INTEGER,
  lectureHall:Sequelize.STRING
});

module.exports = TimeTable;
