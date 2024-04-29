const mongoose=require("mongoose");

const userschema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add your username"],
    },
    email:{
        type:String,
        required:[true,"Please add your email id"],
        unique:[true,"Email id already taken"],
    },
    password:{
        type:String,
        required:[true,"Please add a password"],
    },
},
{
    timestamps:true,
}
);

module.exports=mongoose.model("User",userschema);