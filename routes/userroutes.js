

const express=require("express");
const { registeruser, loginUser, currentUser } = require("../controllers/usercontroller");
const router=express.Router();
const validtoken=require("../middleware/validatetokenhandling");


router.post("/register",registeruser);

router.post("/login",loginUser);

router.get("/current",validtoken,currentUser);

module.exports=router;
