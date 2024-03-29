const route = require('express').Router();
const UserService = require('./user.service');

route.post('/register', async function(req, res) {
  await UserService.register(req)
    .then(user => res.json(user))
    .catch(err => {
      res.status(500);
      res.statusMessage = "Internal Server Error";
    });
});

route.post('/signin', async function(req, res) {
  await UserService.signin(req.body)
    .then(user => user ? res.json(user) : res.status(400).message('username or password is incorrect'))
    .then(token => token ? res.json(token) : res.status(400).message('username or password is incorrect'))
    .catch(err => {
      res.status(500);
      res.statusMessage = "Internal Server Error";
    })
});

route.get('/list', async function(req, res) {
  await UserService.list(req, res)
    .then(users => res.json(users))
    .catch(err => {
      res.status(500);
      res.statusMessage = "Internal Server Error";
    })
});

module.exports = route;
