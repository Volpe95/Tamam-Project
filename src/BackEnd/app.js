const express = require('express');
const cors = require('cors')
const Sequelize = require('sequelize');
const sequelize = require('./utils/database');
const insertdb = require('./InsertTables');
const { Op } = require("sequelize");

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
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var ClassNames ;
  var semesterNumberOfWeeks, semseterWeeks;
  var subjectTotalHours , structuredTimeTable;
  var students = {}; // [studentID] = {...Info}
  var subjects = {};  // [SubjectCode] =  Subject name
  TermSchedule.findAndCountAll({ raw: true })
    .then(result => {
      semesterNumberOfWeeks = result.count;
      semseterWeeks = result.rows;
      return TimeTable.findAll({
        where: {
          year: query.year,
        }, raw: true
      });

    })
    .then(result => {
      // merge both functions in one function at a later time
      subjectTotalHours = getEachSubjectTotalHours(result, semesterNumberOfWeeks);
      structuredTimeTable = structureTimeTable(result);
      return Student.findAll({ where: { year: query.year }, raw: true })
    })
    .then(result => {
      for (let i = 0; i < result.length; i++) {
        students[result[i].studentID] = {
          studentName: result[i].studentName,
          className: '',
          classNo: result[i].classNo,
        };
      }
      return Subject.findAll({ where: { year: query.year }, raw: true });
    })
    .then(result => {
      for (let i = 0; i < result.length; i++) {
        subjects[result[i].subjectCode] = result[i].subjectName;
      }

      return Tamams.findAll({ where: { year: query.year }, raw: true });
    })
    .then(result => {

      studentsAbsenceHours = {};
      TamamPropertiesNames = [
        'firstLectureTamam',
        'secondLectureTamam',
        'thirdLectureTamam',
        'fourthLectureTamam',
        'fifthLectureTamam'];
      for (let i = 0; i < result.length; i++) {
        var Class = mergeClassInfo(result[i].year,
          result[i].classCode,
          result[i].classNo);

        var studentID = result[i].studentID;
        var date = new Date(result[i].date);
        var day = days[date.getDay()];
        var WeekType; // 0 for even 1 for odd
        var Tamams = [] , studentSubjects = [] ;

        if(students[studentID].className == ''){
          students[studentID].className = result[i].className;
        }

        for (let j = 0; j < semseterWeeks.length; j++) {
          var start = new Date(semseterWeeks[j].startDate);
          var end = new Date(semseterWeeks[j].endDate);

          if (date >= start && date <= end) {
            WeekType = (j + 1) % 2;
            break;
          }
        }

        for(let j = 0 ; j < TamamPropertiesNames.length; j++){
          if(result[i][TamamPropertiesNames[j]] != '---'){
            Tamams.push(j + 1);
            var tmp = structuredTimeTable[Class][day][j + 1];
            if(tmp.even != '' && WeekType == 0){
              studentSubjects.push(tmp.even);
            }
            else {
              studentSubjects.push(tmp.odd);
            }
          }
        }

        if (!studentsAbsenceHours[Class]) {
          studentsAbsenceHours[Class] = {};
        }
        if (!studentsAbsenceHours[Class][studentID]) {
          studentsAbsenceHours[Class][studentID] = {};
        }
        for(let j = 0 ; j < studentSubjects.length; j++){
          if(!studentsAbsenceHours[Class][studentID][studentSubjects[j]]){
            studentsAbsenceHours[Class][studentID][studentSubjects[j]] = 0 ;
          }
          studentsAbsenceHours[Class][studentID][studentSubjects[j]] += 2;
        }
      }
      ret = [] ;
      for(Class in studentsAbsenceHours){
        for(studentId in studentsAbsenceHours[Class]){
          for(subjectCode in studentsAbsenceHours[Class][studentId]){
            var percentage = studentsAbsenceHours[Class][studentId][subjectCode] / subjectTotalHours[Class][subjectCode] * 100;
            percentage = Math.round(percentage * 100) / 100 ;
            console.log(percentage);
            if(percentage >= query.percentage){
              ret.push({
                studentID: studentId,
                studentName: students[studentId].studentName,
                className: students[studentId].className,
                classNo: students[studentId].classNo,
                subjectCode: subjectCode,
                subjectName: subjects[subjectCode],
                percentage: percentage,
              });
            }
          }
        }
      }

      res.send(ret);
      res.end();
    })
    .catch(err => {
      console.log(err);
    });

})

function structureTimeTable(timeTableValues) {
  var structuredTimeTable = {};

  for (let i = 0; i < timeTableValues.length; i++) {
    var Class = mergeClassInfo(timeTableValues[i].year,
      timeTableValues[i].classCode,
      timeTableValues[i].classNo);

    var day = timeTableValues[i].Day;
    var lectureNo = timeTableValues[i].lectureNo;
    var WeekType = timeTableValues[i].lectureWeekType;

    if (!structuredTimeTable[Class]) {
      structuredTimeTable[Class] = {};
    }

    if (!structuredTimeTable[Class][day]) {
      structuredTimeTable[Class][day] = {};
    }
    if (!structuredTimeTable[Class][day][lectureNo]) {
      structuredTimeTable[Class][day][lectureNo] = { odd: '', even: '' };
    }

    if (WeekType <= 1) {
      structuredTimeTable[Class][day][lectureNo].odd = timeTableValues[i].subjectCode;
    }
    else {
      structuredTimeTable[Class][day][lectureNo].even = timeTableValues[i].subjectCode;
    }

  }
  console.log(structuredTimeTable);
  return structuredTimeTable;
}

function mergeClassInfo(year, classCode, classNo) {
  return year + classCode + classNo;
}
function getEachSubjectTotalHours(timeTableValues, semesterWeeks) {
  var subjectTotalHours = {};
  for (let i = 0; i < timeTableValues.length; i++) {
    var subjectCode = timeTableValues[i].subjectCode;

    var weekType = timeTableValues[i].lectureWeekType;

    var Class = mergeClassInfo(timeTableValues[i].year,
      timeTableValues[i].classCode,
      timeTableValues[i].classNo);

    if (!subjectTotalHours[Class]) {
      subjectTotalHours[Class] = {};
    }
    if (!subjectTotalHours[Class][subjectCode]) {
      subjectTotalHours[Class][subjectCode] = 0;
    }
    if (weekType == 0) // Both
      subjectTotalHours[Class][subjectCode] += 2 * semesterWeeks;
    else if (weekType == 1) // Odd
      subjectTotalHours[Class][subjectCode] += 2 * Math.ceil(semesterWeeks / 2);
    else
      subjectTotalHours[Class][subjectCode] += 2 * Math.floor(semesterWeeks / 2);
  }

  return subjectTotalHours

}



app.get('/getStudent', (req, res) => {
  if (req.query.date == '') {
    res.send(false);
    res.end();
  }
  var query = req.query; // {id : string , date: string}
  var student, day, WeekType = 1, validDate = false;
  var ret;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  date = query.date;
  Student.findAndCountAll({ where: { studentID: query.id } })
    .then(result => {
      if (!result.count) {
        res.send();
        res.end();
      }
      else {
        student = result.rows[0].dataValues;
        return Class.findAll({ where: { classCode: result.rows[0].dataValues.classCode } });
      }
    })
    .then(result => {
      // get Subjects for this day
      ret = { studentInfo: { ...student, className: result[0].dataValues.className } };

      return TermSchedule.findAll({ raw: true });
    })
    .then(result => {
      // Change this to make a sql query instead of this garbage
      var curDate = new Date(date);
      for (let i = 0; i < result.length; i++) {
        var start = new Date(result[i].startDate);
        var end = new Date(result[i].endDate);
        console.log(start, curDate, end);
        if (curDate >= start && curDate <= end) {
          if (i % 2 == 1) {
            WeekType = 2;
          }
          day = days[curDate.getDay()];
          validDate = true;
          return TimeTable.findAll({
            where: {
              classCode: ret.studentInfo.classCode,
              classNo: ret.studentInfo.classNo,
              year: ret.studentInfo.year,
              day: day,
              lectureWeekType: { [Op.or]: [WeekType, 0] },
            }, raw: true
          });
        }
      }
      /*if(!validDate){
        res.send(false);
        res.end();
      }*/
    })
    .then(result => {
      console.log(result);
      ret.subjects = result;
      res.send(ret);
      res.end();
    })
    .catch(err => {
      res.send();
      res.end();
      console.log(err);
    })
})


app.post('/insertTamamRecord', (req, res) => {
  Tamams.create(req.body)
    .then(result => {
      res.send({ recordId: result.dataValues.id });
      res.end();
    })
    .catch(err => {
      res.send(false);
      console.log(err)
    });
});

app.get('/getTamams', (req, res) => {
  console.log(req.query);
  var date = req.query.date;

  Tamams.findAll({ where: { date: date } })
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

app.delete('/deleteTamam', (req, res) => {
  idToDelete = req.query.id;

  Tamams.destroy({ where: { id: idToDelete } })
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


app.get('/getAllClasses', (req, res) => {
  // refactor the this part to make a table with those unique values
  var notUniqueClasses;
  var uniqueClasses;
  Student.findAll({ attributes: ['year', 'classCode', 'classNo'], raw: true })
    .then(result => {
      notUniqueClasses = result;
      // .filter is too slow you have to change it in future re-factoring
      uniqueClasses = notUniqueClasses.filter((v, i, a) => a.findIndex(t => (JSON.stringify(t) === JSON.stringify(v))) === i);
      return Class.findAll({ raw: true });
    })
    .then(result => {
      var returnedClasses = [];
      for (var i = 0; i < uniqueClasses.length; i++) {
        var val = uniqueClasses[i].classCode;
        for (var j = 0; j < result.length; j++) {
          if (result[j].classCode == val) {
            returnedClasses.push({ ...uniqueClasses[i], className: result[j].className });
            break;
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


app.get('/getAllSubjects', (req, res) => {

  Subject.findAll({ raw: true })
    .then(result => {
      res.send(result);
      res.end();
    })
    .catch(err => {
      console.log(err);
    })
});


app.post('/insertTimeTableSlot', (req, res) => {

  // the update should be later be done with a more smart way
  var TimeTableSlot = req.body;
  var created = false;
  var slotCondition = {
    year: TimeTableSlot.year,
    classCode: TimeTableSlot.classCode,
    classNo: TimeTableSlot.classNo,
    Day: TimeTableSlot.Day,
    lectureNo: TimeTableSlot.lectureNo,
  };

  //console.log(req.body);
  TimeTable.findAndCountAll({ where: slotCondition })
    .then(result => {
      if (!result.count) {
        created = true;
        return TimeTable.create(TimeTableSlot);
      }

      if (TimeTableSlot.lectureWeekType == 0) {
        return TimeTable.destroy({ where: slotCondition });
      }
      else {
        console.log(result.rows[0]);
        if (result.rows[0].lectureWeekType == 0) {
          return TimeTable.destroy({ where: slotCondition });
        }

        for (let i = 0; i < result.rows.length; i++) {
          if (result.rows[i].lectureWeekType == TimeTableSlot.lectureWeekType) {
            return TimeTable.destroy({
              where: {
                ...slotCondition,
                lectureWeekType: TimeTableSlot.lectureWeekType
              }
            });
          }
        }
      }
    })
    .then(result => {
      if (!created)
        return TimeTable.create(TimeTableSlot);
    })
    .then(result => {
      res.send(true);
      res.end();
    })
    .catch(err => {
      res.send(false);
      res.end();
      console.log(err);
    })
});


app.get('/getTimeTable', (req, res) => {
  console.log(req.query);
  TimeTable.findAll({ where: req.query })
    .then(result => {
      console.log(result);
      res.send(result);
      res.end();
    })
    .catch(err => {
      res.end();
      console.log(err);
    })
});
