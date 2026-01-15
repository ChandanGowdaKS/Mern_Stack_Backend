const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./modules/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main().then(() => {
    console.log("connection successful");
}).catch((err) => console.log(err));

app.get("/",(req,res)=>{
    res.send("root is working");
});
//New route
app.get("/chats/new", (req, res) => {
    res.render("newchat.ejs");
})

//index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("./whatsapp", { chats });
});
// create route
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    console.log(newChat);

    newChat.save().then((res) => {
        console.log("saved");
    }).catch((err) => {
        console.log(err);
    });
    res.redirect("/chats");
})
app.listen(3000, () => {
    console.log("port is listenning");
});

// let chat1 = new Chat({
//     from: "chandu",
//     to: "god",
//     created_at: new Date(),
//     msg: "hello god, god is great",
// });

// chat1.save().then(() => {
//     console.log("saved chat1");
// }).catch((err) => {
//     console.log(err);
// });