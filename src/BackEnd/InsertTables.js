const Sequelize = require('sequelize');
const sequelize = require('./utils/database');
const Student = require('./models/Student');
const Class = require('./models/Class');
const fs = require('fs');
const { connect } = require('http2');

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

let rawClass = fs.readFileSync('./Data/Classes.json');
let Classes = JSON.parse(rawClass);

// Insert Classes Table values
/*Classes['Class'].forEach(res => {
  Class.create({classCode: res['classCode'] , className: res['className']})
  .then(val => {
    //console.log(val);
  })
  .catch(err => console.log(err));
});*/


// Insert students values
/*
let rawStudents = fs.readFileSync('./Data/student.json');
let students = JSON.parse(rawStudents);

let total = 0 ;
console.log(students['Students List'].length);
for(let i = 2100 ; i < 2138; i++){
  student = students['Students List'][i];
  Student.create({
    studentID: student['Student No.'],
    studentName: student['Student Name'],
    year: student['Student Year'],
    classCode: student['Specialization'],
    classNo: student['Class No.']
  });
}
*/


Student.findAll().then(res => {
  console.log(res);
}).catch();
