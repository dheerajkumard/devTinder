const express = require('express');

const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const { validEditFields, validPasswordEditField } = require("../utils/validations");

const bcrypt = require('bcrypt');

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user; // using middleware to get user
        res.send(user);
    } catch (error) {
        res.status(400).send("Error:" + error.message);
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if(!validEditFields) {
            return res.status(400).send("Invalid fields for editing profile");
        }
        const loggedInUser = req.user;
        
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        });
        await loggedInUser.save();
        res.send("Profile updated successfully");

    } catch (error) {
        res.status(400).send("Error:" + error.message);
    }
})

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        if(!validPasswordEditField) {
            return res.status(400).send("Invalid fields for editing password");
        }
        const loggedInUser = req.user;      
         Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        });
        const passwordHash = await bcrypt.hash(loggedInUser.password, 10);
        loggedInUser.password = passwordHash; // Update the password with the hashed version
        await loggedInUser.save();
        res.send("Password updated successfully");

    } catch (error) {
        res.status(400).send("Error:" + error.message);
    }
})


module.exports = profileRouter;