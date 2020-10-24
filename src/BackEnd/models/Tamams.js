const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Tamams = sequelize.define('tamam' , {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentID:{
    foreignKey: true,
    type: Sequelize.INTEGER,
  },
  studentName:{
    type: Sequelize.STRING,
  },
  year:{
    type: Sequelize.INTEGER,
  },
  classCode:{
    type: Sequelize.STRING,
    foreignKey: true,
  },
  className:{
    type: Sequelize.STRING
  },
  classNo:{
    type:Sequelize.INTEGER,
  },
  firstLectureTamam:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  secondLectureTamam:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  thirdLectureTamam:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  fourthLectureTamam:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  fifthLectureTamam:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  firstLectureSubjectCode:{
    type: Sequelize.STRING,
    allowNull:true,
  },
  secondLectureSubjectCode:{
    type: Sequelize.STRING,
    allowNull:true,
  },
  thirdLectureSubjectCode:{
    type: Sequelize.STRING,
    allowNull:true,
  },
  fourthLectureSubjectCode:{
    type: Sequelize.STRING,
    allowNull:true,
  },
  fifthLectureSubjectCode:{
    type: Sequelize.STRING,
    allowNull:true,
  },
  firstLectureSubjectName:{
    type: Sequelize.STRING,
    allowNull:true,
  },
  secondLectureSubjectName:{
    type: Sequelize.STRING,
    allowNull:true,
  },
  thirdLectureSubjectName:{
    type: Sequelize.STRING,
    allowNull:true,
  },
  fourthLectureSubjectName:{
    type: Sequelize.STRING,
    allowNull:true,
  },
  fifthLectureSubjectName:{
    type: Sequelize.STRING,
    allowNull:true,
  },
  date:{
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
});


module.exports = Tamams;
