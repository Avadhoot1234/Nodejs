const asynchandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const User=require("../models/usermodel");
const jwt=require("jsonwebtoken");

//Registering a user along with authnetication
const registeruser=asynchandler(async(req,res)=>{
    const {username,email,password}=req.body;
    //To check wether all fields are filled
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    //Checks whether the registering username already exists in the db
    const userAvailable=await User.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists");
    }
    //Takes care of password by hashing the password
    const hashedPassword=await bcrypt.hash(password,10);
    console.log("Hashed Password",hashedPassword);
    const user=await User.create({
        username,
        email,
        password:hashedPassword,
    });
    console.log(`User created ${user}`);
    //Checking done with the db
    if(user){
        res.status(201).json({_id:user.id,email:user.email});
    }else{
        res.status(400);
        throw new Error("User data is invalid");
    }
    res.json({message:"Register the user"})
});

//Take care of the login users
const loginUser=asynchandler(async(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user=await User.findOne({email});
    //compare password with hashedpassword
    if(user&&(await bcrypt.compare(password,user.password))){
        const accesstoken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            }
        },
        process.env.Access_Token_Secret,
        {expiresIn:"15m"}
    );
        res.status(200).json({accesstoken});
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
    
});

//Keeps the information of the current
const currentUser=asynchandler(async(req,res)=>{
    res.json({message:"current user info"})
});

module.exports={registeruser,loginUser,currentUser};