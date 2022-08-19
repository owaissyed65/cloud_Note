const jwt = require('jsonwebtoken');
const JWT_Token="L@veThi$Girl"
const fetchuser = (req,res,next)=>{
    const token = req.header('authToken')
    if (!token) {                                   
        res.status(401).send("please authorize using valid authentication");
    }
    try {
        const data = jwt.verify(token, JWT_Token)
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send("please authorize using valid authentications");
    }
}
module.exports = fetchuser;