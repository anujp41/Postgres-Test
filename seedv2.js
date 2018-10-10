'use strict';

const chance = new require('chance')();
const Promise = require('bluebird');
const { db, Owners, Pets } = require('./models');

const genEventSeed = () => {
  const petCount = {};
  let parents = new Array(10).fill(0);
  parents = parents.map((val, idx) => {
    const id = idx+1;
    const name = chance.name();
    return {id, name};
  });

  let pets = new Array(100).fill(0);
  pets = pets.map((val, idx) => {
    const id = idx+1;
    const name = chance.first({nationality: 'it'});
    const parentId = chance.bool({ likelihood: 50 }) ? chance.integer({ min: 0, max: 9 }) : null;
    return {id, name, parentId};
  })

  pets.forEach(pet => {
    const parentId = pet.parentId;
    if (parentId) {
      petCount[parentId] ? petCount[parentId]++ : petCount[parentId] = 1;
    }
  })

  parents.forEach((parent, id) => {
    if (petCount[id+1]) parent.numOfPets = petCount[id+1]
    else parent.numOfPets = 0;
  });

  parents = parents.map(parent => Owners.build(parent))
  pets = pets.map(pet => Pets.build(pet));

  return [parents, pets];
}

const seedData = genEventSeed();
const parentsData = seedData[0];
const petsData = seedData[1];

function createParents(seed) {
  return Promise.map(seed, function (parent) {
    return parent.save();
  });
}

function createPets(seed) {
  return Promise.map(seed, function (pet) {
    return pet.save();
  });
}

function seed(parents, pets) {
  return createParents(parents)
  .then(function () {
    return createPets(pets);
  });
}


const main = (parents, pets) => {
  console.log("Syncing db...");
  db.sync({force: true})
  .then(function () {
    console.log('Seeding database');
    return seed(parents, pets);
  })
  .then(function () {
    console.log('Seeding successful');
  }, function (err) {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(function () {
    db.close();
    return null;
  });
};

main(parentsData, petsData);