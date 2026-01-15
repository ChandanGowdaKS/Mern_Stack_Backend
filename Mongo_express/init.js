const mongoose = require("mongoose");
const Chat = require("./modules/chat.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main().then(() => {
    console.log("connection successful");
}).catch((err) => console.log(err));

let manyChats = [{
    from: "chanduu",
    to: "theju",
    created_at: new Date(),
    msg: "hello god i love u",
},
{
    from: "goddd",
    to: "godd",
    created_at: new Date(),
    msg: "hello god i love u",
},
{
    from: "appa",
    to: "amma",
    created_at: new Date(),
    msg: "hello god i love u",
},
{
    from: "thej",
    to: "theju",
    created_at: new Date(),
    msg: "hello god i love u",
    }];

Chat.insertMany(manyChats);