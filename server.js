require("dotenv").config();
const { dbConnection } = require("./database/config");
const fileUpload = require("express-fileupload");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const songRoutes = require("./routes/songRoutes");
const musicRoutes = require("./routes/musicRoutes");
const adminRoutes = require("./routes/adminRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

dbConnection();

// routes

app.use("/users", userRoutes);
app.use("/playlist", playlistRoutes);
app.use("/artist", songRoutes);
app.use("/music", musicRoutes);
app.use("/admin", adminRoutes);
app.use("/search", searchRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on PORT... ${process.env.PORT || 5000}`);
});
