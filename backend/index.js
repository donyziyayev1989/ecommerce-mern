const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const dotenv = require('dotenv').config();
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
dbConnect();

app.get('/', (req, res) => {
  res.json('Hello from server');
});

const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const blogRoute = require('./routes/blogRoute');
const categoryRoute = require('./routes/categoryRoute');
app.use('/api/user', authRoute);
app.use('/api/product', productRoute);
app.use('/api/blog', blogRoute);
app.use('/api/category', categoryRoute);

// Always use error middlewares below the routes
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
