require('dotenv').config();
require('./db/connect');
const port = process.env.PORT
const connectDB = require('./db/connect');
const connectionString = process.env.MONGO_URI;

const express = require('express');
const app = express();



const tasks = require('./routes/tasks');

// middleware

// Parses data from req.body
app.use(express.static("./public"));
app.use(express.json());


app.use('/api/v1/tasks', tasks);

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