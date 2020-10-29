const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Lewa2TalbaTamam = sequelize.define('lewa2TalbaTamam' , {
  studentID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true,
  },
  date:{
    type: Sequelize.DATEONLY,
    allowNull: false,
    foreignKey: true,
  },
  tamamType:{
    type: Sequelize.STRING,
    allowNull: false,
    foreignKey: true,
  },
});

module.exports = Lewa2TalbaTamam;
