const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const TermSchedule = sequelize.define('termschedule' , {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  startDate:Sequelize.DATE ,
  endDate: Sequelize.DATE
});

module.exports = TermSchedule;
