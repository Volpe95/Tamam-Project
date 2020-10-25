const Sequelize = require('sequelize');
const express = require('express');
const sequelize = require('./utils/database');

const cors = require('cors')
const fs = require('fs');
const { connect } = require('http2');
const { where } = require('sequelize');


const TimeTable = require('./models/TimeTable');

sequelize.sync({force: true });
