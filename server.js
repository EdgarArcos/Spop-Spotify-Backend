require('dotenv').config();
const { dbConnection } = require('./database/config');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

dbConnection();

// routes
// app.use('/home', routeVariable)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on PORT... ${process.env.PORT || 5000}`);
});
