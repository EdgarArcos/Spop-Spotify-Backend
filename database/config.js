const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected!');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = {
  dbConnection,
};
