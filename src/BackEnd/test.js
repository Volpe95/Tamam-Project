const Sequelize = require('sequelize');
const express = require('express');
const sequelize = require('./utils/database');
const Student = require('./models/Student');
const cors = require('cors')
const Class = require('./models/Class');
const fs = require('fs');
const { connect } = require('http2');
const { where } = require('sequelize');

// Insert students values

