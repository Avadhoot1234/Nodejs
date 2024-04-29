const asynchandler=require("express-async-handler");
const jwt=require("jsonwebtoken");

const validToken=asynchandler(async(req,res,next)=>{
    let token;
    let authHeader=req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
    jwt.verify(token,process.env.Access_Token_Secret,(err,decoded)=>{
        if(err){
            res.status(401);
            throw new Error("User is not authorized");
        }
        req.user=decoded.user;
        next();
    });
    if(!token){
        res.status(401);
        throw new Error("User is not authorized or token is missing");s
    }
}     
});

module.exports=validToken;