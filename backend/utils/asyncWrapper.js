const asyncWrap = require('express-async-handler');

const asyncWrapper = (func) => {
  return asyncWrap(async function () {
    try {
      return await func.apply(this, arguments);
    } catch (error) {
      throw new Error(error);
    }
  });
};

module.exports = asyncWrapper;
