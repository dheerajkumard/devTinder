const express = require("express");

const app = express();

const connectDB = require("./config/database");

const User = require("./models/user");

app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Medhashree",
        lastName: "Dheeraj",
        email: "test@gmail.com",
        password: "password123",
    });
    try {
        await user.save();
        res.send("User created successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }

})

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.error("Database connection failed");
    });

