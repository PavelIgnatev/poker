const { json } = require("express");
const rateLimiter = require("express-rate-limit");
const slowDown = require("express-slow-down");
const disablePoweredBy = require("./disablePoweredBy");
const errorHandler = require("./errorHandler");
const logger = require("./logger");

const limiter = rateLimiter({
  windowMs: 1 * 60 * 1000,
  max: 120,
});

const speedLimiter = slowDown({
  windowMs: 1 * 60 * 1000,
  delayAfter: 100,
  delayMs: 1000,
});

module.exports = (app) => {
  app.use(json());

  app.use(disablePoweredBy);

  app.use(errorHandler);

  app.use(logger);

  app.use(speedLimiter);
  app.use(limiter);
};
