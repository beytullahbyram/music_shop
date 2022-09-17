const express = require("express");
const mysql = require('mysql');

/* DB CONNECT*/
let connection = mysql.createConnection({
    host: 'host',
    user: 'user',
    password: '****',
    database: 'db'
});


connection.connect(function (err) {
    if (err) throw err;

    console.log('MySQL bağlantısı başarıyla gerçekleştirildi.');
});

const app = express();

app.set("view engine", "ejs")

/* RUN CSS FİLE */
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/about-us", (req, res) => {
    res.render("about-us");
})

let sqlSorgusu = `select * from urunler`;
app.get("/product", (req, res) => {
    connection.query(sqlSorgusu, function (err, results, fields) {
        if (err) throw err;
        // console.log(results);
        res.render('product', {
            results
        })
    });
   
})
app.listen(3000);