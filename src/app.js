const express = require("express");

const app = express();

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

