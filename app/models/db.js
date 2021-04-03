const mysql = require("mysql");
const dotenv = require('dotenv');

// Init environment
dotenv.config();

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  typeCast: function castField(field,next){
    if ((field.type === "TINY") && (field.length === 1)){
      // let val = field === 1 ? true : false
      return (field.string() === '1')
    }else{
      return next()
    }
  }
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
// export default connection;