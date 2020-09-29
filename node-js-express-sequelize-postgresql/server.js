const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//Parse Json

app.use(bodyParser.json());

//Parse urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

//Opening Route

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// set port, listen for requests
require("./app/routes/tutorial.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
