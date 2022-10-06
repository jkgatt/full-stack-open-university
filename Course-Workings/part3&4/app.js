const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const notesRouter = require("./controllers/notes");
const logger = require('./utils/logger')

// Connecting to MongoDB and Setting Up Note Model
const url = config.MONGODB_URI;

console.log(`Connecting to: ${url}`);

mongoose
  .connect(url)
  .then((result) => logger.info(`Connected to MongoDB`))
  .catch((error) =>
    logger.error(`Error connecting to MongoDB: ${error.message}`)
  );

const app = express();
app.use(express.static("build"));
app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);
// this has to be the last loaded middleware.
app.use(middleware.errorHandler);

module.exports = app;
