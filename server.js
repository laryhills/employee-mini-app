const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const empRouter = require("./app/routes/employee.routes.js")

// Init express
const app = express();

// Init environment
dotenv.config();

// enabling cors for all requests by using cors middleware
app.use(cors());

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded( { extended:true } ));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Employee application." });
});

//Set Port
const port = Number(process.env.PORT || 3331);


//Initialize Routes
empRouter(app);

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});