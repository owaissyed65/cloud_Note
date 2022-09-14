const jwt = require('jsonwebtoken');
const JWT_Token = "L@veThi$Girl"
const User = require('../models/User')
const fetchuser = async (req, res, next) => {
    try {
        let token = await req.header('Authorization');
        if (!token) {
            res.status(401).send("please authorize using valid authentication");
        }
        const data = jwt.verify(token, JWT_Token);
        const userVerify = await User.findOne({ _id: data._id });
        req.user = data;
        req.verifyUser = userVerify;
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}
module.exports = fetchuser;