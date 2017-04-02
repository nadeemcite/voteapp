var config = require('./config');
var jwt = require('jsonwebtoken');
module.exports={
    checkToken: function (req, res, next) {
        var token = req.headers.token;
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                   console.log(err)
                    res.status(401).send({ status: -2, message: 'Failed to authenticate token.' })
                    res.end();
                }
                else {
                    req.decoded = decoded;
                    return next();
                }
            });
        }
        else {
            res.json({
                success: false
                , message: "token not found"
            });
            res.end();
        }
    }
}