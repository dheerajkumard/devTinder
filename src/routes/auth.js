const express = require('express');
const bcrypt = require('bcrypt');

const authRouter = express.Router();

const { validateSignupData } = require("../utils/validations");

const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())});
    res.send("Logout successful");
});


module.exports = authRouter;