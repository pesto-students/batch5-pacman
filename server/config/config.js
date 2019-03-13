const config = {
  port: process.env.PORT || 9000,
  db: {
    url: 'mongodb://admin:#Password123@ds135255.mlab.com:35255/pacman',
  },
};

module.exports = config;
