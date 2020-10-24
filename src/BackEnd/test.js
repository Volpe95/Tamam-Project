const Sequelize = require('sequelize');
const express = require('express');
const sequelize = require('./utils/database');
const cors = require('cors')
const fs = require('fs');
const { connect } = require('http2');
const { where } = require('sequelize');


const Tamams = require('./models/Tamams');

// Insert students values

sequelize
  .sync({ force: true })
  //.sync()
  .then(result => {
  })
  .catch(err => console.log(err));
