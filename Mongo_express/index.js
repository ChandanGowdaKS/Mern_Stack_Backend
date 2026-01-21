const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./modules/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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
    // console.log(chats);
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

// edit route
app.get("/chats/:id/edit", async(req, res) => {
    let { id } = req.params;
    let chatId = await Chat.findById(id);
    res.render("edit.ejs", { chatId });
})

// update route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        { msg: newMsg },
        { runValidators: true, new: true }
    );
    console.log(updatedChat);
    res.redirect("/chats");
});

// destroy route // delete chat
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deleted_chart = await Chat.findByIdAndDelete(id);
    console.log(deleted_chart);
    res.redirect("/chats");
});
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