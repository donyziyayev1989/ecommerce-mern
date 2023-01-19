const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello from server');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
