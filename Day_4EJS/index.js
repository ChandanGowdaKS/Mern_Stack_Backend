const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname, "/public")));

// home page
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// dice rolling page
app.get("/rolldice", (req, res) => {
    let diceVal = Math.floor(Math.random() * 6) + 1;
    res.render("diceroll.ejs",{diceVal});
});

// port
app.listen(port, () => {
    console.log(`listening on ${port}`)
});

// instagram ejs
// app.get("/ig/:username", (req, res) => {
//     let { username } = req.params;
//     let followers = ["chandu", "theju", "siddart", "god", "punith"];
//     res.render("instagram", { username ,followers});
// });

app.get("/ig/:username", (req, res) => {
    let { username } = req.params;
    const InstaData = require("./data.json");
    let data = InstaData[username];
    console.log(data);
    if (data) {
        res.render("Instagram2.ejs", { data });
    } else {
        res.send("No accounts found");
    }
    
})