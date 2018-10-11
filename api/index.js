const router = require('express').Router();
const {Owners, Pets} = require ('../models');

const genError = errMsg => {
  const newError = new Error(errMsg);
  newError.status = 400;
  return newError;
}

router.get('/', (req, res, next) => {
  Owners.findAll({order: [['id', 'ASC']]})
    .then(owners => Pets.findAll({
      attributes: ['id', 'name'],
      where: {parentId: null},
      order: [['id', 'ASC']]
    })
  .then(pets => res.json({owners, pets}))
  );
});

router.post('/', (req, res, next) => {
  const {owner, pet: petName} = req.body;
  // console.log(owner, petName)
  Owners.findOne({where: {name: owner}})
  .then(parent => {
    if (parent === null) return next(genError('User not found!'));
    if (parent.numOfPets >= 10) return next(genError(`${parent.name} already has max of 10 pets!`));
    Pets.findOne({where: {name: petName}})
    .then(pet => {
      if (pet === null) return next(genError('Pet not found!'));
      if (pet.parentId !== null) return next(genError('Pet has an owner!'));
      Pets.update({
        parentId: parent.id
      }, {
        where: {
          name: pet.name
        }
      })
      .then(() => {
        let totalPets = parent.numOfPets;
        totalPets += 1;
        Owners.update({
          numOfPets: totalPets
        }, {
          where: {
            name: parent.name
          }
        })
        .then(result => res.send(`${pet.name} adopted by ${parent.name}`));
      })
    })
  })
  .catch(err => next(err));
})

module.exports = router;