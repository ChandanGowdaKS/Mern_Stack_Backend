const mongoose = require("mongoose");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/book");
}

main().then((res) => {
    console.log("connection successful");
}).catch((err) => {
    console.log(err);
});

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    price: {
        type: Number,
    },
});

const Book = mongoose.model("Book", bookSchema);

const book1 = new Book({
    author: "chandu",
    title: "me and coastal land relation ship",
    price: 2000,
});

book1.save().then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});