const jwt = require('jsonwebtoken')
const authorize = (req,res,next) => {
    const token = req.headers.authorization?.split("")[1]
    if(!token){
        res.send({status : false , message : "Please Login Frist"})
    }
    jwt.verify(token,process.env.SECRET_KEY,function(decoded,err){
        if(decoded){
            next()
        }else{
            res.send({status : false , message : "Please Login"})
            console.log(err)
        }
    })
}

module.exports = {authorize}
