const {constants}=require("../constants");

const errorhandler=(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode :500;
    switch(statusCode){
        case constants.Validation_Error:
            res.json({
                title:"Validation Failed",
                message:err.message,
                stackTrace:err.stack,
            });
            break;
        case constants.Unauthorised:
            res.json({
                title:"Unauthorised",
                message:err.message,
                stackTrace:err.stack,
            });
        case constants.Forbidden:
            res.json({
                title:"Forbidden",
                message:err.message,
                stackTrace:err.stack,
            });
        case constants.Not_Found:
            res.json({
                title:"Not Found",
                message:err.message,
                stackTrace:err.stack,
            });
        case constants.Server_Error:
            res.json({
                title:"Server Error",
                message:err.message,
                stackTrace:err.stack,
            });
        default:
            console.log("No error")
            break;
    }

}

module.exports=errorhandler;