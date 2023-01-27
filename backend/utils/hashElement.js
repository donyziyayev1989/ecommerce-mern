const bcrypt = require('bcrypt');

const hashedElement = async (el) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(el, salt);
  return hash;
};
// first element should be element from req.body, second one is hashed
const compareToHash = async (el, hashEl) => {
  return await bcrypt.compare(el, hashEl);
};

module.exports = { hashedElement, compareToHash };
