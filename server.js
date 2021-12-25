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

const multer = require("multer");
const upload = multer({dest: "./upload"});

app.get("/api/customers", (req, res) => {
    conn.query(
        "SELECT * FROM customer", 
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.use("/image", express.static("./upload"));

app.post("/api/customers", upload.single("image"), (req, res) => {
    let sql = "INSERT INTO customer VALUES (null, ?, ?, ?, ?, ?)";
    let image = "/image/" + req.file.filename;
    let name = req.body.name;
    let age = req.body.age;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, age, gender, job];
    conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    });

});

app.listen(port, console.log(`Lisening on port ${port}`));