const router = require('express').Router();
const {Owners, Pets} = require ('../models');

const genError = errMsg => {
  const newError = new Error(errMsg);
  newError.status = 400;
  return newError;
}

router.get('/', (req, res, next) => {
  Owners.findAll()
    .then(owners => Pets.findAll({
      attributes: ['id', 'name'],
      where: {parentId: null}
    })
  .then(pets => res.json({owners, pets}))
  );
});

router.post('/', (req, res, next) => {
  const {owner, pet} = req.body;
  Owners.findOne({where: {name: owner}})
  .then(parent => {
    if (parent === null) throw genError('User not found!');
    if (parent.numOfPets >= 10) throw genError(`${parent.name} already has max of 10 pets!`);
    res.json(parent)
  })
  .catch(err => next(err));
})

module.exports = router;