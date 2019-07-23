const NodeJSONdb = require('node-json-db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const db = new NodeJSONdb('users', true, true, '/');

async function register(req) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const users = await db.getData('/users');
  const id = users.length;
  const token = jwt.sign({sub: id}, config.secret);
  const newUser = {
    "id": id,
    "firstName": req.body.firstName,
    "username": req.body.username,
    "sureName": req.body.sureName,
    "mail": req.body.mail,
    "city": req.body.city,
    "password": hash,
    "token": token
  };
  await db.push(`/users[${id}]`, newUser);
  return {
    "id": id,
    "username": req.body.username,
    "firstName": req.body.firstName,
    "sureName": req.body.sureName,
    "mail": req.body.mail,
    "city": req.body.city,
    "token": token
  }
  
}

async function signin({username, password}) {
  const users = await db.getData('/users');
  const user = await users.find(u => {
    return u.username === username
  });
  const token = (user && bcrypt.compareSync(password, user.password)) ? jwt.sign({sub: user.id}, config.secret) : null;
  if(token) {
    return {
      ...user,
      token
    };
  }
}

async function userList(req, res) {
  return await db.getData('/users');
}

module.exports = {
  register,
  signin,
  userList
};
