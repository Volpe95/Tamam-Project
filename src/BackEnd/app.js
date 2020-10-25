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
const Tamams = require('./models/Tamams');
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
  console.log('now server is listening on localhost port 3200');
});

app.get('/add-subject', (req, res) => {

  Subject.findAll()
    .then(result => {
      res.send(result);
      res.end();
    })
    .catch(err => console.log(err));
});


app.post('/add-subject', (req, res) => {
  let subject = req.body;

  Subject.findAndCountAll({
    where: {
      subjectCode: subject.subjectCode,
      year: subject.year,
      classCode: subject.classCode
    }
  })
    .then(result => {
      if (result.count == 0) {
        return Subject.create({
          subjectCode: subject.subjectCode,
          subjectName: subject.subjectName,
          lectureHours: subject.lectureHours,
          exerciseHours: subject.exerciseHours,
          year: subject.year,
          totalHours: subject.totalHours,
          classCode: subject.classCode
        });
      }
      else {
        result.send(false);
        result.end();
      }
    })
    .then(result => {
      res.send(true);
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.send(false);
    });
});
//Subject.create()

app.delete('/add-subject', (req, res) => {
  subjectToDelete = req.query;
  console.log(req.query); // Debug :)
  Subject.destroy({ where: subjectToDelete })
    .then(result => {
      res.send(true);
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.send(false);
      res.end();
    });
});



app.get('/calculatePercentage', (req, res) => {
  var query = req.query; // {year , percentage}
  console.log(req.query);

  /* TODO
    You have to then fetch the Tamams for the given year and fetch the ones with the percentage above the given
  */
  res.send({ resceived: "received the req" });
  res.end();
})


app.get('/getStudent', (req, res) => {
  var query = req.query; // {id : string}
  var student ;
  Student.findAndCountAll({ where: { studentID: query.id } })
  .then(result =>{
    if(!result.count){
      res.send();
      res.end() ;
    }
    else{
      student = result.rows[0].dataValues;
      return Class.findAll({where: {classCode: result.rows[0].dataValues.classCode}});
    }
  })
  .then(result => {
      res.send({...student , className: result[0].dataValues.className});
      res.end();
  })
  .catch(err => {
    res.send();
    res.end();
    console.log(err);
  })
})


app.post('/insertTamamRecord' , (req , res) => {
    Tamams.create(req.body)
    .then(result => {
      res.send({recordId: result.dataValues.id});
      res.end();
    })
    .catch(err => {
      res.send(false);
      console.log(err)
    });
});

app.get('/getTamams' , (req , res) => {
  console.log(req.query);
  var date = req.query.date;

  Tamams.findAll({where: {date: date}})
  .then(result => {
    // console.log(result); // Debug :)
    res.send(result);
    res.end();
  })
  .catch(err => {
    res.end();
    console.log(err);
  })
})

app.delete('/deleteTamam' , (req , res) => {
  idToDelete = req.query.id ;

  Tamams.destroy({where: {id: idToDelete}})
  .then(result => {
    res.send(true);
    res.end();
  })
  .catch(err => {
    res.send(false);
    res.end();
    console.log(err);
  })
})


app.get('/getAllClasses' , (req , res) =>{
   // refactor the this part to make a table with those unique values
    var notUniqueClasses;
    var uniqueClasses;
    Student.findAll({attributes: ['year' , 'classCode' , 'classNo'] , raw: true })
    .then(result => {
      notUniqueClasses = result;
      uniqueClasses = notUniqueClasses.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i);
      return Class.findAll({raw: true});
    })
    .then(result => {
      var returnedClasses = [] ;
      for(var i = 0 ; i < uniqueClasses.length; i++){
          var val = uniqueClasses[i].classCode;
          for(var j = 0 ; j < result.length; j++){
            if(result[j].classCode == val){
              returnedClasses.push({...uniqueClasses[i] , className: result[j].className});
              break ;
            }
          }
      }
      res.send(returnedClasses);
      res.end();
    })
    .catch(err => {
      console.log(err);
    });
});


app.get('/getAllSubjects' , (req , res) => {

    Subject.findAll({raw: true})
    .then(result => {
      res.send(result);
      res.end() ;
    })
    .catch(err => {
      console.log(err);
    })
});


app.post('/insertTimeTableSlot' , (req , res) => {

  // the update should be later be done with a more smart way
  var TimeTableSlot = req.body ;
  var created = false ;
  var slotCondition = {
    year: TimeTableSlot.year ,
    classCode: TimeTableSlot.classCode,
    classNo: TimeTableSlot.classNo,
    Day: TimeTableSlot.Day,
    oddWeek: TimeTableSlot.oddWeek,
    lectureNo: TimeTableSlot.lectureNo,
  };

  console.log(req.body);
  TimeTable.findOrCreate({
    where: slotCondition,
    defaults: TimeTableSlot})
    .then(result => {
      console.log(result[1]);
      if(!result[1]){
        return TimeTable.destroy({where: slotCondition});
      }
      else {
        created = true ;
      }
    })
    .then(result => {
      if(!created)
        return  TimeTable.create(TimeTableSlot);
    })
    .then(result => {
      res.send(true);
      res.end() ;
    })
    .catch(err => {
      res.send(false);
      res.end() ;
      console.log(err);
    })
});


app.get('/getTimeTable' , (req , res) => {
    console.log(req.query);
    TimeTable.findAll({where: req.query})
    .then(result => {
      console.log(result);
      res.send(result);
      res.end() ;
    })
    .catch(err => {
      res.end() ;
      console.log(err);
    })
});
