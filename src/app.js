const express = require("express");

const app = express();

const connectDB = require("./config/database");

const User = require("./models/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");

const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

const { validateSignupData } = require("./utils/validations");

app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        validateSignupData(req);
        const passwordHash = await bcrypt.hash(password, 10);

        // const user = new User(req.body);
        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });

        await user.save();
        res.send("User created successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user:" + error.message);
    }

})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            // throw new error("User not found");
            res.status(404).send("User not found");
        }

        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {

            const token = await user.getJwtToken();
            res.cookie("token", token);
            console.log("Token:", token);
            res.send("Login successful");
        }
        else {
            // throw new error("Invalid password");
            res.status(400).send("Invalid password");
        }

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).send("login is not successful:" + error.message);
    }
})

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user; // using middleware to get user
        res.send(user);
    } catch (error) {
        res.status(400).send("Error:" + error.message);
    }
})

app.post("/sendRequest", userAuth, async (req, res) => {
    try {
        const user = req.user; // using middleware to get user
        res.send(user.firstName + " " + " has sent you a request");
    } catch (error) {
        res.status(400).send("Error:" + error.message);
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
        await User.findByIdAndDelete({ _id: userId });
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
        const allowedUpdates = ["firstName", "lastName", "password", "skills"];
        const updates = Object.keys(data).every(key => allowedUpdates.includes(key));
        if (!updates) {
            throw new error("Invalid updates");
        }
        if (data.skills.length > 20) {
            throw new error("Skills cannot exceed 20 items");
        }
        await User.findByIdAndUpdate(userId, data);
        res.send("User updated successfully");
    }
    catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).send("Error updating user" + error.message);
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

