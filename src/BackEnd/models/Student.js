const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const Student = sequelize.define('student' , {
  studentID:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  studentName:{
    type: Sequelize.STRING,
    allowNull: false
  },
  year:Sequelize.INTEGER,
  classCode:{
    type: Sequelize.STRING,
    foreignKey: true,
    allowNull: false
  },
  classNo:{
    type:Sequelize.INTEGER
  }
});

module.exports = Student;
