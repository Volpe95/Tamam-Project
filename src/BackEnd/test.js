const Sequelize = require('sequelize');
const express = require('express');
const sequelize = require('./utils/database');

const cors = require('cors')
const fs = require('fs');
const { connect } = require('http2');
const { where , DATEONLY, CHAR } = require('sequelize');

const TermSchedule = require('./models/TermSchedule');


//sequelize.sync({force: true});

/*
var examHall = [] ;
for(let i = 0 ; i <= 10; i++){
  examHall[i] = [] ;
  for(let j = 0 ; j <= 16 ; j++){
    examHall[i][j] = 'o'
  }
}

let secondYear = 70 , fifthYear = 70; // 2nd year as '2' char 5th year '5' year

let cnt1 = 0 , cnt2 = 0 ;

let idx = [1 , -1 , 0 , 0];
let idy = [0 , 0 , 1 , -1];

for(let i = 1 ; i <= 9; i++){
  for(let j = 1 ; j <= 16 ; j++){

    if(examHall[i][j] === 'o'){
      let fnd2 = false , fnd5 = false ;
      for(let k = 0 ; k < 4 ; k++){
        let ch = examHall[i + idx[k]][j + idy[k]];
        fnd2 = fnd2 || (ch == '2');
        fnd5 = fnd5 || (ch == '5');
      }
      if(fnd2 && fnd5){
        console.log('A7a');
      }
      else if(fnd2){
        examHall[i][j] = '5';
        cnt2++;
      }
      else if(fnd5){
        examHall[i][j] = '2';
        cnt1++;
      }
      else{
        if(cnt1 > cnt2){
          examHall[i][j] = '5';
          cnt2++;
        }
        else {
          examHall[i][j] = '2';
          cnt1++;
        }
      }
    }
  }
}

console.log('Number of 2nd year' , cnt1 , 'Number of 5th year' , cnt2);
console.log(examHall);

Student.findAll({where: {year: [2 , 5] , classCode: ['ELEC' , 'RD' , 'EP' , 'CW' , 'EX' , 'RP'] , classNo: [0 , 1 , 2 , 3 , 4]} , raw: true})
.then(students => {
  var ret = [] , secondYear = [] , fifthYear = [] ;

  for(let i = 0 ; i < students.length; i++){
    if(students[i].year == 2){
      secondYear.push(students[i]);
    }
    else{
      fifthYear.push(students[i]);
    }
  }

  let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  secondYear.sort((a , b) => {
    return (a.classCode > b.classCode? 1: (a.classCode !== b.classCode? -1: (a.classNo < b.classNo? 1:-1))) ;
  })
  fifthYear.sort((a , b) => {
    return (a.classCode > b.classCode? 1: (a.classCode !== b.classCode? -1: (a.classNo < b.classNo? 1:-1))) ;
  })
  for(let i = 1 ; i <= 9 ; i++){
    for(let j = 1 ; j <= 16 ; j++){
      var number = String.fromCharCode(65 + (i - 1)) + j;
      if(examHall[i][j] == '2'){
        var tmp = secondYear.pop() ;
        ret.push({ ID: tmp.studentID , name: tmp.studentName , year: tmp.year , classCode: tmp.classCode , classNo: tmp.classNo , sittingCode: number});
      }
      else{
        var tmp = fifthYear.pop() ;
        ret.push({ ID: tmp.studentID , name: tmp.studentName , year: tmp.year , classCode: tmp.classCode , classNo: tmp.classNo , sittingCode: number});
      }
    }
  }
  var util = require('util');
  fs.writeFileSync('./data.json', util.inspect(ret) , 'utf-8');
})
.catch(err => {
  console.log(err);
})
*/
