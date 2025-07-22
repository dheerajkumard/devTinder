const express = require("express");

const app = express();

const { adminAuth } = require("./middlewares/auth");

//multiple route handlers
app.get("/user", (req, res, next) => {
    console.log("First handler");
    next();
}, (req, res) => {
    console.log("Second handler");
    res.send("Multiple route handlers executed");  //output will be "Multiple route handlers executed"
});

app.use("/admin", adminAuth);

app.use("/admin/getAlldata", (req, res, next) => {

    throw new Error("Simulated error"); // Simulating an error for testing
   res.send("All data retrieved successfully");
});
// error handling middleware
app.use("/", (err,req,res,next) => {
    res.status(500).send("Internal Server Error");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

