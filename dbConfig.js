const fs = require("fs");

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:conf.host,
    user:conf.user,
    password:conf.password,
    port:conf.port,
    database:conf.database
}); 
connection.connect();
module.exports = connection;

// Execute the following query in MYSQL Workbench
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
// Where root as your user localhost as your URL and password as your password
// Then run this query to refresh privileges:
// flush privileges;
