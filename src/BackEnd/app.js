const express = require('express');

const Sequelize = require('sequelize');
const sequelize = require('./utils/database');

// DB models
const Class = require('./models/Class');
const Student = require('./models/Student');
const Subject = require('./models/Subject');
const TimeTable = require('./models/TimeTable');
const TermSchedule = require('./models/TermSchedule');

/*
// models relations
Class.hasOne(Student , {
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});
Student.belongsTo(Class);
*/
// sync DB table
sequelize
//.sync({force: true})
.sync()
.then(result => {
  //console.log(result);
})
.catch(err => console.log(err));

