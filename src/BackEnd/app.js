const express = require('express');
const cors = require('cors')
const Sequelize = require('sequelize');
const sequelize = require('./utils/database');
const insertdb = require('./InsertTables');

// DB models
const Class = require('./models/Class');
const Student = require('./models/Student');
const Subject = require('./models/Subject');
const TimeTable = require('./models/TimeTable');
const TermSchedule = require('./models/TermSchedule');

/*
// sync DB table
sequelize
  //.sync({ force: true })
  .sync()
  .then(result => {
  })
  .catch(err => console.log(err));
*/
const app = express();

app.use(cors());
app.use(express.json());
app.listen(3200, () => {
  console.log('now server is listening on localhost port 3000');
});

app.get('/add-subject', (req, res) => {

  Subject.findAll()
    .then(result => {
        res.send(result);
        res.end() ;
    })
    .catch(err => console.log(err));
});


app.post('/add-subject' , (req , res) => {
  let subject = req.body;

   Subject.findAndCountAll({where: {
    subjectCode: subject.subjectCode ,
    year: subject.year ,
    classCode: subject.classCode}})
    .then(result => {
      if(result.count == 0){
        return Subject.create({
          subjectCode:subject.subjectCode,
          subjectName:subject.subjectName,
          lectureHours:subject.lectureHours,
          exerciseHours: subject.exerciseHours,
          year: subject.year,
          totalHours:subject.totalHours,
          classCode:subject.classCode});
      }
      else{
        result.send(false);
        result.end() ;
      }
    })
    .then(result => {
      res.send(true);
      res.end() ;
    })
    .catch(err => {
      console.log(err);
      res.send(false);
    });
  });
  //Subject.create()

  app.delete('/add-subject' , (req , res) =>{
      subjectToDelete = req.query ;
      console.log(req.query); // Debug :)
      Subject.destroy({where: subjectToDelete})
      .then(result => {
        res.send(true);
        res.end();
      })
      .catch(err => {
        console.log(err);
        res.send(false);
        res.end() ;
      });
  });
