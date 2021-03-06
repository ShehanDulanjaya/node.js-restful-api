const jwt = require('jsonwebtoken');


module.exports =(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
       // console.log(req.headers);
        const decoded =jwt.verify(token, "secret");
        req.userData = decoded;
        res.status(200).json({
            message:"auth success"
        })
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }   
};