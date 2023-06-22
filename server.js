const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// dotenv needs to go before requiring app.js so that the env variables are available in the app.js file
dotenv.config({ path: './config.env' });

const app = require('./app');

const database = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(database)
  .then(() => console.log('Database connection successful'));

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
  console.log(`Environment is set to: ${process.env.NODE_ENV}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
