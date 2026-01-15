const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
    id:uuidv4(),
    username: "Chandan",
    Content: "International Rated chess Player and Software Developer",
},
    {
    id:uuidv4(),
    username: "Shiva",
    Content: "God",
},
    {
    id:uuidv4(),
    username: "BMS",
    Content: "College at Bengaluru",
    },
];


app.get("/posts", (req, res) => {
    res.render("index.ejs",{posts});
    // res.send("Server is working");
})

app.get("/posts/new", (req, res) => {
    res.render("new_post.ejs");
})

app.post("/posts", (req, res) => {
    let id = uuidv4();
    let { username, content } = req.body;
    posts.push({ id,username, Content: content }); // Correct way to add
    res.redirect("/posts"); // Redirect to main page
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show", { post });
})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    post.Content = newContent;
    console.log(post);
    res.send("patch request is working");
})

app.listen(port, () => {
    console.log("3000 Port is listening");
});