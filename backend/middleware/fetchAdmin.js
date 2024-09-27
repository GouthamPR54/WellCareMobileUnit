const jwt = require('jsonwebtoken');
const key = "Hello"; 

const fetchAdmin = (req, res, next) => {
    const token = req.header('Auth-token');
    if (!token) {
        return res.status(401).send("Token not found");
    }
    try {
        const data = jwt.verify(token, key);
        req.user = data; 
        next();
    } catch (err) {
        console.log(err);
        res.status(401).send("Invalid token");
    }
};

module.exports = fetchAdmin;
