const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const fileRoutes = require("./routes/fileRouter");
var corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.use('/api/v1/file', fileRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
});