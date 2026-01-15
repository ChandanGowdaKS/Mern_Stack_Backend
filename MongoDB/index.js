// requiring mongoose
const mongoose = require("mongoose");

// connecting mongoose to MongoDB
main()
.then(()=>{
    console.log("Connection successful");
})
.catch((err)=>
    console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}
// defining schema
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});
// model
const User = mongoose.model("User", userSchema);
// inserting

// const user1 = new User({
//     name: "chandu",
//     email: "cha@gmail.com",
//     age: 20,
    
// });

// user1.save().then((res) => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// });

// inserting many collections

// User.insertMany([
//     { name: "chan", email: "gowda@gmailcom", age: 20 },
//     { name: "god", email: "god@gmail", age: 25 },
//     { name: "shiva", email: "shiva@gmail.com", age: 30 },
// ]).then((res) => {
//     console.log(res);
// });

// to find in mongoose
// User.find().then((res) => {
//     console.log(res);
// })

// User.find({ age: { $gt: 20 } }).then((data) => {
//     console.log(data);
// });

// update
// User.updateOne({ name: "chan" }, { age: 50 }).then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);
// });

// updating many
// User.updateMany({ age: { $lt: 40 } }, { age: 60 }).then((data) => {
//     console.log(data);
// });

// User.find().then((data) => {
//     console.log(data);
// });

//delete
// User.findOneAndDelete({ name: "chan" }).then((data) => {
//     console.log(data);
// });
