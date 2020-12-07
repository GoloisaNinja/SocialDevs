const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
//const db = process.env.REACT_APP_MONGOURI;
//const devDB = config.get('mongoDBLOCAL')
//const devDB = process.env.REACT_APP_DBLOCAL;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    // exit process on failure
    process.exit(1);
  }
};

module.exports = connectDB;
