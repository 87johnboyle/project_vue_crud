const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models")

const app = express();

let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//Parse Json

app.use(bodyParser.json());

//Parse urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

//Opening Route

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
