const mongoose = require('mongoose');

const dbConnect = () => {
  try {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGODB_URL);

    console.log('Database connected');
  } catch (error) {
    console.log('Database error');
  }
};
module.exports = dbConnect;
