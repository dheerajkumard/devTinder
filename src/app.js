const express = require("express");

const app = express();

//multiple route handlers
app.get("/user", (req, res, next) => {
    console.log("First handler");
    next();
}, (req, res) => {
    console.log("Second handler");
    res.send("Multiple route handlers executed");  //output will be "Multiple route handlers executed"
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

