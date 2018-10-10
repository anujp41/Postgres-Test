'use strict';

const Chance = require('chance');
const chance = new Chance();
const { db, Owners, Pets } = require('./models');

const genEventSeed = () => {
  const petCount = {};
  let parents = new Array(10).fill(0);
  parents = parents.map(() => {
    const name = chance.name();
    return {name};
  });

  let pets = new Array(100).fill(0);
  pets = pets.map(() => {
    const name = chance.first({nationality: 'it'});
    const parentId = chance.bool({ likelihood: 50 }) ? chance.integer({ min: 0, max: 9 }) : null;
    return {name, parentId};
  })

  pets.forEach(pet => {
    const parentId = pet.parentId;
    if (parentId) {
      petCount[parentId] ? petCount[parentId]++ : petCount[parentId] = 1;
    }
  })

  parents.forEach((parent, id) => {
    if (petCount[id]) parent.numOfPets = petCount[id]
    else parent.numOfPets = 0;
  })

  return [parents, pets];
}

const seedData = genEventSeed();

const seedParents = parents => {
  parents = parents.map(parent => Owners.build(parent))
  console.log('parents ', parents);
}

const main = (parents, pets) => {
  db.sync({force: true})
  .then(() => {
    seedParents(parents);
    console.log('Seeding owners database....');
  })
}

main(seedData[0], seedData[1]);

// const main = (parents, pets) => {
//   console.log("Syncing db...");
//   db.sync({force: true})
//     .then(async () => {
//       console.log("Seeding owners database...");
//       await Owners.bulkCreate(parents);
//       return;
//     })
//     .then(async () => {
//       console.log("Seeding pets database...");
//       await Pets.bulkCreate(pets);
//       return;
//     })
//     .catch(err => {
//       console.log("Error while seeding");
//       console.log(err.stack);
//     })
//     .then(() => {
//       db.close();
//       return null;
//     });
// };

// main(seedData[0], seedData[1]);