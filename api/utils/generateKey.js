const RandomKey = require('../utils/RandomKey');

function generateKey(data) {
  const arrID = [];
  for (let i = 0; i < data.length; i++) {
    arrID[i] = data[i].ID
  }
  return new RandomKey(arrID, data.length).startMachine();
}

module.exports = generateKey;
