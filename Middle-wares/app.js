const express = require("express");
const app = express();

app.use((req, res) => {
    let { query } = req.query;
    console.log(query);
    res.send("Middleware completed");
});

app.get("/", (req, res) => {
    res.send("root page");
});

app.get("/random", (req, res) => {
    res.send("this is random page");
});

app.listen(3000, () => {
    console.log("server is listening to port 3000");
});