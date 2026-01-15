const express = require("express");
const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

// sending request and receiving response
// app.use((req, res) => {
//     console.log("new request");
//     res.send("this is a basic response");
// });

// Routing

app.get("/", (req, res) => {
    res.send("you contacted root node");
});

app.get("/home", (req,res) => {
    res.send("You contacted home page");
});

// this will not work in express js v5
// app.get("/*", (req, res) => {
//     res.send("this path doesn't exits");
// });

// path parameters

app.get("/:username/:id", (req, res) => {
    let { username, id } = req.params;
    res.send(`Welcome to the page ${username}`);
})

// Query strings

app.get("/search", (req, res) => {
    let { q } = req.query;// res.query return in object so {q} has braces
    if (!q) {
        res.send("No search query");
    }
    res.send(`these are the search results for: ${q}`);
});