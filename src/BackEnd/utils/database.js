const Sequelize = require('sequelize');

sequelize = new Sequelize('motab3a-db' , 'root' , 'rootAdmin' , {
  dialect: 'mysql' ,
  host:'localhost',
  logging: true,
  pool: {
    max: 30,
    min: 0,
    acquire: 60000,
    idle: 5000
}
});


module.exports = sequelize;
