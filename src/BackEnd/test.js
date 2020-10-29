const Sequelize = require('sequelize');
const express = require('express');
const sequelize = require('./utils/database');

const cors = require('cors')
const fs = require('fs');
const { connect } = require('http2');
const { where , DATEONLY } = require('sequelize');

const Lewa2TalbaTamam = require('./models/Lewa2TalbaTamam');


//sequelize.sync();

