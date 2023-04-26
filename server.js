require('dotenv').config();
const { dbConnection } = require('./database/config');
const  fileUpload = require("express-fileupload");
const allRoutes  = require("./routes/indexRoutes");


const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./upload"
}))

dbConnection();

// routes

app.use("/api", allRoutes);

// app.use('/home', routeVariable)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on PORT... ${process.env.PORT || 5000}`);
});
