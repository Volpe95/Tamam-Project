const sequelize = require('./utils/database');
const Officers = require('./models/Officers');
const Sequelize = require('sequelize');
const Crimes = require('./models/Crimes');

const fs = require('fs');

var data = JSON.parse(fs.readFileSync('./data.json' , 'utf-8'));

data = data['crime'];
console.log(data);
for(let i = 0 ; i < 102; i++){
  console.log(i);
  Crimes.create({crimeName: data[i]['Description'] , crimePoints: 0});
}


console.log('Okay Done! :)');
console.log(data.length);
