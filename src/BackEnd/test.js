const Sequelize = require('sequelize');
const express = require('express');
const sequelize = require('./utils/database');

const cors = require('cors')
const fs = require('fs');
const { connect } = require('http2');
const { where , DATEONLY } = require('sequelize');


const TermSchedule = require('./models/TermSchedule');

//sequelize.sync({force: true });

var tmp = new Date('2020-10-24');

TermSchedule.findAll({raw: true})
.then(res => {
  console.log(res[0].startDate , tmp , res[0].endDate);
  for(let i = 0 ; i < 16 ; i++){
    var val1 = new Date(res[i].startDate);
    var val2 = new Date(res[i].endDate);
    if(tmp >= val1 && tmp <= val2){
      console.log(i + 1);
      console.log(tmp.getDay());
    }
  }
})
.catch()
