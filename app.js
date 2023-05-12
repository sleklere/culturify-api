const express = require('express');

const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();

// MIDDLEWARES
// Security HTTP headers
app.use(helmet()); // Best to set it at the beginning so that we make sure the headers are always set

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

express.json();

app.use(mongoSanitize());

app.use(xss());

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// Test route
app.get('/', (req, res) => {
  console.log('This is a test route');
  res.status(200).json({
    status: 'success',
    data: 'route working',
  });
});

module.exports = app;
