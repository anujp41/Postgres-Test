const Sequelize = require('sequelize');
const db = require('../db');

const Pets = db.define('pet', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING
}, {
  timestamps: false
})

module.exports = Pets