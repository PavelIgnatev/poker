module.exports = {
  PORT: Number(process.env.PORT) || 80,
  NODE_ENV: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === "production",
};
