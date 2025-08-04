const express = require('express');
const userRouter = express.Router();

const ConnectionRequest = require("../models/connectionRequest");

const { userAuth } = require("../middlewares/auth");

userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try {
        const loggedinUser = req.user;
        const receivedRequests = await ConnectionRequest.find({ toUserId: loggedinUser._id, status: "interested" }).populate('fromUserId', 'firstName lastName email');

        res.json({ message: "Received connection requests fetched successfully", data: receivedRequests });

    } catch (error) {
        res.status(500).json({ message: "Error fetching received connection requests", error: error.message });
    }
})

userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedinUser = req.user;
        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedinUser._id, status: "accepted" },
                { toUserId: loggedinUser._id, status: "accepted" }
            ]
        }).populate('fromUserId', 'firstName lastName email').populate('toUserId', 'firstName lastName email');

        const data = connections.map((connection) => {
            if (connection.fromUserId._id.toString() === loggedinUser._id.toString()) {
                return connection.toUserId
            }
           return connection.fromUserId
        });

        res.json({ message: "Connections fetched successfully", data: data });

    } catch (error) {
        res.status(500).json({ message: "Error fetching connections", error: error.message });
    }
})

module.exports = userRouter;