const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HazardRoute = require("./routes/HazardRoute");
const UpdatesRoute = require("./routes/UpdatesRoute");
const AuthRoute = require("./routes/AuthRoute");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", HazardRoute);
app.use("/api", UpdatesRoute);
app.use("/api", AuthRoute);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${port}`);
});
