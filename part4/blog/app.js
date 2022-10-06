const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const { MONGODB_URI } = require('./utils/config');
const blogsRouter = require('./controllers/blogs');

mongoose
  .connect(MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => logger.error(`Error connecting to MongoDB: ${error.message}`));

const app = express();
app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
