const checkID = require('../utils/checkID');
const generateKey = require('../utils/generateKey');

const JSONdb = require('node-json-db');
const db = new JSONdb('stories', true, false);
const sendMessage = require('../utils/MQService');

async function storiesAll() {
  return await db.getData('/');
}

async function storyByID(req, res) {
  const data = await db.getData('/data');
  checkID(req, data);
  return await db.getData(`/data[${req.params.id}]`);
}

async function storyNew(req, res) {
  const reqBody = await JSON.stringify({
    'title': req.body.title,
    'username': req.body.username,
    'body': req.body.body
  });
  sendMessage('json_stories', reqBody)
  return { 'message-sent': true }
}
async function storyUpdate(req, res) {
  const data = await db.getData('/data');
  const key = generateKey(data, res);
  await db.push(`/data[${req.params.id}]`, {
    'ID': key,
    'title': req.body.title,
    'username': req.body.username,
    'body': req.body.body
  }, true)
  await db.get(`/data[${req.params.id}]`);
}

async function storyDelete(req, res) {
  const data = await db.getData('/data');
  await doIdExists(req, data);
  await db.getData(`/data[${req.params.id}]`);
  return await db.delete(`/data[${req.params.id}]`);
}

module.exports = {
  storyUpdate,
  storyDelete,
  storiesAll,
  storyByID,
  storyNew
};
