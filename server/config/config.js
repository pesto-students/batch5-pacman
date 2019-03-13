const config = {
  port: process.env.PORT || 9000,
  db: {
    url: process.env.MONGO_URL,
  },
};

module.exports = config;
