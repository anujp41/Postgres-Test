const router = require('express').Router();
const {Owners, Pets} = require ('../models');

router.get('/', (req, res, next) => {
  console.log('request from ', req.protocol + '://' + req.get('host') + req.originalUrl)
  Owners.findAll()
    .then(owners => Pets.findAll({
      attributes: ['id', 'name'],
      where: {parentId: null}
    })
  .then(pets => res.json({owners, pets}))
  );
})

module.exports = router;