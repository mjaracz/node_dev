const checkID = (req, data) => {
  const length = data.length;
  if (req.params.id >= length) {
    throw new Error('Nie znaleziono dokumentu o podanym id');
  }
};

module.exports = checkID;
