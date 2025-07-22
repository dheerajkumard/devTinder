const adminAuth = (req, res, next) => {
    console.log("Admin middleware");
    const token = "xyz";
    const adminAuthenticated = token === "xyz"; // Simulating admin authentication
    if (adminAuthenticated) {
        next();
    }
    else {
        res.status(401).send("Unauthorized");
    }
}

module.exports = { adminAuth };