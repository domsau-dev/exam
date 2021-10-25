const express = require('express')
const app = express()
const port = 3003
const mysql = require('mysql2')
const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'egzaminas'
})

con.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
})

app.post('/books', (req, res) => {
    console.log(req.body.title)
    const sql = `
        INSERT INTO books
        (title, price, discount_price, sale)
        VALUES (?, ?, ?, ?)
        `;
    con.query(sql, [req.body.title, 
        req.body.price, 
        req.body.discount_price, 
        req.body.sale], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

app.delete('/books/:id', (req, res) => {
    const sql = `
        DELETE FROM books
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

app.put('/books/:id', (req, res) => {
    const sql = `
        UPDATE books
        SET title = ?, price = ?, discount_price = ?, sale = ?
        WHERE id = ?
        `;
    con.query(sql, [req.body.title, 
        req.body.price, req.body.discount_price, 
        req.body.sale, 
        req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

app.get('/books', (req, res) => {
    con.query('SELECT * FROM books ORDER BY id DESC', (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    })
})

app.get('/books/count', (req, res) => {
    con.query('SELECT COUNT(id) AS bookCount FROM books', (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    })
})

app.get('/books/average_price', (req, res) => {
    con.query('SELECT AVG(price) AS averagePrice FROM books', (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})