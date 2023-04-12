require('dotenv').config();
require('./db/connect');

const port = process.env.PORT || 3000;
const connectionString = process.env.MONGO_URI;
const tasks = require('./routes/tasks');

const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/errorHandler');

const express = require('express');
const app = express();

// middleware

app.use(express.static("./public"));
app.use(express.json());
app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);


const start = async () => {
  try {
    await connectDB(connectionString);
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();