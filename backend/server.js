const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const credentials = require('./private/credentials');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: credentials.username,
    password: credentials.password,
    database: 'thoughtBank'
});

connection.connect();

app.post('/api/signUp', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, encrypted) => {
        connection.query("INSERT INTO users (username, email, password) VALUES (?,?,?)", [req.body.username, req.body.email, encrypted], (err, result) => {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.json({id: result.inserId});
        });
    });
});

app.post('/api/logIn', (req, res) => {
    connection.query("SELECT id, password FROM users WHERE username = ?", [req.body.username], (err, result) => {
        if (err) throw err;
        bcrypt.compare(req.body.password, result[0].password, (err, same) => {
            if (same) {
                res.setHeader('Content-Type', 'application/json');
                res.json({id: result[0].id});
            }
        });
    });
});

app.post('/api/post', (req, res) => {
    const {thought, asAnon, userId, date} = req.body;
    connection.query("INSERT INTO thoughts (thought, date, asAnon, userId) VALUES (?,?,?,?)", [thought, date, asAnon, userId], (err, result)=>{
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send();
    });
});

app.get('/api/withdraw', (req, res) => {
    connection.query("SELECT thoughts.*, users.username FROM thoughts LEFT JOIN users ON thoughts.userId = users.id", (err, result)=>{
        if (err) throw err;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
    });
});

app.get('/api/users', (req, res) => {
    connection.query("SELECT username, email FROM users WHERE username = ?", [req.query.name], (err, result) => {
        if (err) throw err;
        res.setHeader("Content-Type", "application/json");
        res.json(result[0]);
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));