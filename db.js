const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/test-postgres', {logging: false});

module.exports = db;