const db = require('../db');

const Owners = require('./owners');
const Pets = require('./pets');

Pets.belongsTo(Owners, {as: 'parent'});
Owners.hasMany(Pets, {
  foreignKey: 'parentId',
  allowNull: true
})

module.exports = {db, Owners, Pets};