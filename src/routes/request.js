const express = require('express');

const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendRequest", userAuth, async (req, res) => {
    try {
        const user = req.user; // using middleware to get user
        res.send(user.firstName + " " + " has sent you a request");
    } catch (error) {
        res.status(400).send("Error:" + error.message);
    }
})


module.exports = requestRouter;