const express = require("express");
const app = express();
const myError = require("./ExpressError");

// Simple middleware
// app.use((req, res,next) => {
//     let { query } = req.query;
//     console.log(query);
//     console.log("This is 1st Middleware");
    
//     next();// calls next middleware or next routes
// });

// app.use((req, res, next) => {
//     console.log("This is 2nd Middleware");
//     next();
// });

// API Token as Query String
const checkToken = (req, res, next) => {
    let { token } = req.query;
    if (token === "giveaccess") {
        next();
    }
    throw new myError(401,"ACCESS DENIED!");
};

app.use("/api", checkToken,(req, res) => {
    res.send("This is main API Route");
});


// Utility middleware logger

app.use((req, res, next) => {
    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, req.time);
    console.log(req.path);
    next();
});

// custom error handling
app.get("/err", (req, res) => {
    abcd = abc;
});
// app.use((err, req, res, next) => {
//     console.log("------ERROR------");
//     res.send(err);
// })

// default status and message

app.use((err, req, res, next) => {
    let { status = 500, message = "Some Error Occured" } = err;
    res.status(status).send(message );
});

//route page
app.get("/", (req, res) => {
    res.send("root page");
});

app.get("/random", (req, res) => {
    res.send("this is random page");
});



app.listen(3000, () => {
    console.log("server is listening to port 3000");
});