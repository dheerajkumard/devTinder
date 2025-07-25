const express = require("express");

const app = express();

const connectDB = require("./config/database");

const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {

    const user = new User(req.body);
    // const user = new User({
    //     firstName: "Medhashree",
    //     lastName: "Dheeraj",
    //     email: "test@gmail.com",
    //     password: "password123",
    // });
    try {
        await user.save();
        res.send("User created successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }

})
// Fetching user data based on email
app.get("/user", async (req, res) => {
    try {
        const userEmail = req.body.email;
        const users = await User.find({ email: userEmail });
        res.send(users);
    }
    catch (err) {
        res.status(500).send("Error fetching users");
    }
})
// Fetching all users
app.get("/feed", async (req, res) => {
    try {

        const users = await User.find({});
        res.send(users);
    }
    catch (err) {
        res.status(500).send("Error fetching users");
    }
})
//deleting the user data
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        await User.findByIdAndDelete({_id: userId});
        // await User.findByIdAndDelete(userId); // this also works
        res.send("User deleted successfully");
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Error deleting user");
    }
})
// updating the user data
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        await User.findByIdAndUpdate(userId, data);
        res.send("User updated successfully");
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Error updating user");
    }
});


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

