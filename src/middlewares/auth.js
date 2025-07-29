const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send("Access denied. Invalid Token");
        }

        const decodeddata = await jwt.verify(token, "DevTinderSecret");
        const { _id } = decodeddata;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).send("Unauthorized: " + error.message);
    }
}

module.exports = { userAuth };