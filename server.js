const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const request = require('request');
const router = express.Router();
const mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
});

const app = express();
app.use(bodyParser.json());


app.use("/get-test/:id", (req, res, next) => {
    connection.connect();
    const id = req.params.id;
    connection.query(`SELECT * from portal.test where id = ${id}`, function(err, rows, fields) {
    if (err) throw err;
        console.log('The solution is: ', rows);
        res.send(rows);
    });
    
});

app.use("/get-feedback/:id", (req, res, next) => {
    connection.connect();
    const id = req.params.id;
    connection.query(`SELECT * from portal.feedback where id = ${id}`, function(err, rows, fields) {
    if (err) throw err;
        console.log('The solution is: ', rows);
        res.send(rows);
    });
    
});

app.use("/save-feedback", (req, res, next) =>{
    connection.connect();
    const { feedback } = req.body;

    res.send(req.body);
})

app.use("/save-test", (req, res, next) =>{
    connection.connect();
    const { test } = req.body;
    let query = 'INSERT INTO `portal`.`test` (`name`, `language`, `timeSpent`, `email`, `a1`, `a2`, `a3`, `a4`, `a5`, `a6`, `a7`, `a8`, `a9`, `a10`, `a11`, `a12`, `a13`, `a14`, `a15`, `a16`, `a17`, `a18`, `a19`)  ';
    query += `VALUES ('${test.name}', '${test.language}', '${test.timeSpent}', '${test.email}', '${test.a1}', '${test.a2}', '${test.a3}', '${test.a4}', '${test.a5}', '${test.a6}', '${test.a7}', '${test.a8}', '${test.a9}', '${test.a10}', '${test.a11}', '${test.a12}', '${test.a13}', '${test.a14}', '${test.a15}', '${test.a16}', '${test.a17}', '${test.a18}', '${test.a19}')`;
    console.log(query);
    connection.query(query, function(err, rows, fields){
        if (err) res.send(err)
        res.send(rows);
    });
    //res.send(query);
   
})
router.get("/ping", function(req, res, next){
    console.log("get test");
    res.send("test");
})

app.listen(process.env.PORT || 8080, () => { console.log("server ready listening on port 8080")});


