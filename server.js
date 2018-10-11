const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./models').db;
const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
   } else {
       next();
   }
});

app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message)
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Starting the db at in port ${port}!`);
  // db.sync({force: true})
  db.sync()
  .then(() => console.log('Database is synched!'))
  .catch((err) => console.error('Trouble in flavor town!', err, err.stack));
});