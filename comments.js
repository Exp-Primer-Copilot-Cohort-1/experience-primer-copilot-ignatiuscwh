// create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
// create connection to database
const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'comments'
});
// connect to database
con.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});
// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// get all comments
app.get('/comments', (req, res) => {
    con.query('SELECT * FROM comments', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
// get comment by id
app.get('/comments/:id', (req, res) => {
    con.query(`SELECT * FROM comments WHERE id=${req.params.id}`, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
// create comment
app.post('/comments', (req, res) => {
    const sql = `INSERT INTO comments (author, text) VALUES ('${req.body.author}', '${req.body.text}')`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
// update comment
app.put('/comments/:id', (req, res) => {
    const sql = `UPDATE comments SET author='${req.body.author}', text='${req.body.text}' WHERE id=${req.params.id}`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
// delete comment
app.delete('/comments/:id', (req, res) => {
    const sql = `DELETE FROM comments WHERE id=${req.params.id}`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
// start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});