const config = {
  port: process.env.PORT || 9000,
  db: {
    url: process.env.MONGO_URL,
  },
  google: {
    clienId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callback: process.env.CALL_BACK,
  },
  url: {
    client: process.env.CLIENT_URL,
  },
  showLog: process.env.SHOW_LOG || 'YES',
};
export default config;
