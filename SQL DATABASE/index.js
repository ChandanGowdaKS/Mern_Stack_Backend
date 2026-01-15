const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
let port = 3000;
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sample_sql',
  password: "Chandu@9698"
});

// creation of fake datas
let createRandomUser = () =>  {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),

  ];
  };

  // show all user data
app.get("/users", (req, res) => {
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("usersdata.ejs", { users });
    });
  } catch (err){
    res.send("error occured");
  }
})


// home route , couting total number of users
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

// editing 
app.get("/users/:id/edit", (req, res) => {
  let { id } = req.params;

  let q = `SELECT * From user WHERE userId = '${id}' `;
  try {
  connection.query(q, (err, result) => {
    if (err) throw err;
    let user = result[0];
    res.render("edit.ejs",{user})
    
  });
} catch (err) {
    console.log(err);
    res.send("some error");
}
  
})

// Update DB route
app.patch("/users/:id", (req, res) => {
  res.send("updated");
})
app.listen(port, () => {
  console.log("port is listening");
})
