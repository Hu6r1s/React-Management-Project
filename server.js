const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./db.json");
const config = JSON.parse(data);
const mysql = require("mysql");
const conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database
});
conn.connect();

app.get("/api/customers", (req, res) => {
    conn.query(
        "SELECT * FROM customer", 
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.listen(port, console.log(`Lisening on port ${port}`));