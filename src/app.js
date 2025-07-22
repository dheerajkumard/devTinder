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

// app.use("/admin", (req, res, next) => {
//     console.log("Admin middleware");
//     const token = "xyz";
//     const adminAuthenticated = token === "xyzs"; // Simulating admin authentication
//     if (adminAuthenticated) {
//         next();
//     }
//     else {
//         res.status(401).send("Unauthorized");
//     }
// });

app.use("/admin", adminAuth);

app.use("/admin/getAlldata", (req, res, next) => {
   res.send("All data retrieved successfully");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

