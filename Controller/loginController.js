const md5 = require('md5')
const jwt = require('jsonwebtoken')
const config = require('./config')

const tokenList = {}
const connection = require('../conn')

exports.login = function(req,res){
    const username = req.body.username 
    const password = md5(req.body.password)
    connection.query('SELECT nama,imgEmployee FROM Employee WHERE username=? AND password=?',[username,password],function(error, values){
        if(values !=""){
            const data = {
                values
            };
            // res.json(data);
            const token = jwt.sign(data, config.secret,{expiresIn:config.tokenLife})
    const refreshToken = jwt.sign(data,
        config.refreshTokenSecret,{expiresIn:config.refreshTokenLife})
        const response = {
            "status" : "Logged in",
            "token"  : token,
            "refreshToken" : refreshToken,
            "data" : values
        }
        tokenList[refreshToken] = response
        res.status(200).json(response);
        }else{
            const response = {
                "status" : "failed",
            }
            res.json(response)
        }
    })
}

exports.check = function(req,res,next){
    const token = req.body.token || req.query.token ||req.headers['x-access-token']
    if(token){
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
            }else{
                req.decoded = decoded;
                console.log(decoded)
            }

        });
      } else {
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
      }
}
