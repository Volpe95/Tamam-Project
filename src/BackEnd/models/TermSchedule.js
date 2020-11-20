const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const TermSchedule = sequelize.define('termschedule' , {
  weekNo:{
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
 /* year:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },*/
  startDate:Sequelize.DATEONLY ,
  endDate: Sequelize.DATEONLY
});

module.exports = TermSchedule;
