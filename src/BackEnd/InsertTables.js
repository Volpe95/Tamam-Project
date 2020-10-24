const Sequelize = require('sequelize');
const express = require('express');
const sequelize = require('./utils/database');
const Student = require('./models/Student');
const cors = require('cors')
const Class = require('./models/Class');
const fs = require('fs');
const { connect } = require('http2');
const { where } = require('sequelize');

/* Student.create({
  studentID: 4774,
  studentName: "Mahmoud Kassem",
  year: 5,
  classCode: 'COMM'
 })
  .then(result => {
    console.log(result);
  })
  .catch(err => console.log(err));
 */

 /*
let rawStudents = fs.readFileSync('./Data/students.json');
let students = JSON.parse(rawStudents);

let rawClasses = fs.readFileSync('./Data/Classes.json');
let classes = JSON.parse(rawClasses);

students['Students List'].forEach(student => {
     let val = student['Specialization'];
     let fnd = false ;
     classes['Class'].forEach(res => {

      if(res['className'] == val){
         fnd = true ;
         student['Specialization'] = res['classCode'];
       }
     })

     if(!fnd){
       console.log(val);
     }
});

console.log(students['Students List'][0]);
fs.writeFileSync('./Data/student.json', JSON.stringify(students, null, 2)
);
*/

module.exports.insertClassTables = function (){
  let rawClass = fs.readFileSync('./Data/Classes.json');
  let Classes = JSON.parse(rawClass);
// Insert Classes Table values
  Classes['Class'].forEach(res => {
    Class.create({classCode: res['classCode'] , className: res['className']})
    .then(val => {
      //console.log(val);
    })
    .catch(err => console.log(err));
  });
}
module.exports.insertStudentTables = function (){
    // Insert students values
    let rawStudents = fs.readFileSync('./Data/student.json');
    let students = JSON.parse(rawStudents);

    let total = 0 ;
    console.log(students['Students List'].length);
    for(let i = 0 ; i < 600; i++){
      student = students['Students List'][i];
      Student.create({
        studentID: student['Student No.'],
        studentName: student['Student Name'],
        year: student['Student Year'],
        classCode: student['Specialization'],
        classNo: student['Class No.']
      });
    }
}


/*

Student
.findAndCountAll ({ where: { year: 5 , classCode: 'RD' } })
.then(res => {
   console.log(res.count);
}).catch();


const app = express();
app.use(cors());
app.options('*', cors());

app.listen(3000 , () => {
    console.log('Server is listening at localhost port 3000');
});

app.get("/*", (req, res) => {
  console.log(req.url , req.body);
  res.send({response:'Hello nigga I am the BackEnd'});
  res.end();
});


*/
