const express=require("express");
const router=express.Router();
const {getContacts,createContact,getContact,updateContact,deleteContact}=require("../controllers/contactcontrollers");
const validatetoken=require("../middleware/validatetokenhandling");

router.route("/").get(getContacts);

router.route("/").post(createContact);

router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);
router.use(validatetoken)
module.exports=router;