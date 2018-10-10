const Sequelize = require('sequelize');
const db = require('../db');

const Owners = db.define('owner', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING,
  numOfPets: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    min: 0
  },
}, {
  timestamps: false
});

module.exports = Owners;