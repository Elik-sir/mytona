const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '141115',
    database: 'mytona',
  },
});
db.select('*')
  .from('users')
  .then((data) => {
    console.log(data);
  });
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/newscount', (req, res) => {
  db.count('*')
    .from('news')
    .then((news) => {
      res.json(news);
    });
});

app.post('/signin', (req, res) => {
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', req.body.email)
    .then((data) => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', req.body.email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json('unable to signin'));
      } else {
        res.status(400).json('wrong password or email');
      }
    })
    .catch((err) => res.status(400).json('wrong password or email'));
});

app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({ email, hash })
      .into('login')
      .returning('email')
      .then((loginEmail) => {
        return trx('users')
          .returning('*')
          .insert({ email: loginEmail[0] })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json(err));
});

app.post('/news', (req, res) => {
  const { numberNews } = req.body;
  db.select('*')
    .from('news')
    .where('id', '>', `${numberNews * 3 - 3}`)
    .limit(3)
    .then((news) => {
      res.json(news);
    });
});
app.post('/newsinfo', (req, res) => {
  const { newsId } = req.body;
  console.log(newsId);
  db.select('*')
    .from('newsinfo')
    .where('id', '=', `${newsId}`)
    .then((news) => {
      res.json(news);
    })
    .catch((err) => res.status(400).json(err));
});
app.listen(3001, () => {
  console.log('app is running on port 3000');
});
