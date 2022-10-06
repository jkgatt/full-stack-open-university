const { info } = require('./logger');

const requestLogger = (request, response, next) => {
  info(`Method: ${request.method}`);
  info(`Path: ${request.path}`);
  info(`Body: ${request.body}`);
  info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  return response.status(500).end();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
