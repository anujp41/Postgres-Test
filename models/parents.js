const Sequelize = require('sequelize');
const db = require('../db');

const Parents = db.define('parent')

module.exports = Parents;