const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
let app = express();
let port = 3000;
let path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sample_sql',
  password: "Chandu@9698"
});

// let q = `INSERT INTO user VALUES ?`;
// let data = [];

let createRandomUser = () =>  {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),

  ];
  };


// for (let i = 0; i < 21; i++) {
//   data.push(createRandomUser());
// }
// try {
//   connection.query(q,[data], (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// } catch {
//   console.log(err);
// }



app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM USER`;
  try {
  connection.query(q, (err, result) => {
    if (err) throw err;
    console.log(result);
    let count = result[0]["count(*)"];
    res.render("home.ejs",{count});
  });
} catch (err) {
    console.log(err);
    res.send("some error");
}
})

app.listen(port, () => {
  console.log("port is listening");
})
// connection.end();