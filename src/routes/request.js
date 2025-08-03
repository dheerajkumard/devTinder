const express = require('express');

const requestRouter = express.Router();

const ConnectionRequest = require("../models/connectionRequest");

const User = require("../models/user");

const { userAuth } = require("../middlewares/auth");

requestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
 try { 
  const fromUserId = req.user._id;
  const toUserId = req.params.userId;
  const status = req.params.status;
  
  // Validate the status of the connection request
  const allowedStatus = ["interested", "ignored"];
  if (!allowedStatus.includes(req.params.status)) {
    return res.status(400).json({ message: "Invalid status provided" });
  }

  // Check if a connection request already exists
  const existingRequest = await ConnectionRequest.findOne({
    $or : [{fromUserId, toUserId}, 
            {fromUserId: toUserId, toUserId: fromUserId}],
  })
  if (existingRequest) {
    return res.status(400).json({ message: "Connection request already exists" });
  }

  const toUser = await User.findById(toUserId);
  if (!toUser) {
    return res.status(404).json({ message: "User not found" });
  }
 
  const connectionRequest = await new ConnectionRequest({
    fromUserId,
    toUserId,
    status,
  });
   const data = await connectionRequest.save();
    res.json({ message: "Connection request sent successfully", data: data });
}   catch (error) {
    console.error("Error sending connection request:", error);
    res.status(500).json({ message: "Error sending connection request", error: error.message });
  }
})


module.exports = requestRouter;