const express = require("express");

const app = express();
// dynamic routing
app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    res.send({firstname: "Dheeraj", lastname: "Kumar"});
});

// query param
app.get("/user1", (req, res) => {
    console.log(req.query);
    res.send({firstname: "Dheeraj", lastname: "Kumar"});
});

app.get("/user", (req, res) => {
    res.send("In User page");
});

app.post("/user", (req, res) => {
    res.send("posting the data");
});

app.delete("/user", (req, res) => {
    res.send("deleting the data");
});

app.use("/home", (req,res) => {
    res.send("In Home page");
});

app.use("/dashboard", (req,res) => {
    res.send("In dashboard page");
});

app.use("/test", (req,res) => {
    res.send("testing the server!!");
});

app.use((req,res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

