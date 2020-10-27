const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const TermSchedule = sequelize.define('termschedule' , {
  weekNo:{
    type: Sequelize.INTEGER,
    primaryKey: true,
  },

  startDate:Sequelize.DATEONLY ,
  endDate: Sequelize.DATEONLY
});

module.exports = TermSchedule;
