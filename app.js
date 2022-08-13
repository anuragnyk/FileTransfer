const express = require("express");
const app = express();
require("dotenv").config();

const fileRoutes = require("./routes/fileRouter");

app.use('/api/v1/file', fileRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
});