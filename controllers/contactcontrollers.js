const asynchandler=require("express-async-handler");
const Contact=require("../models/contactmodel");
const getContacts=asynchandler(async(req,res)=>{
    const contacts=await contact.find({user_id:req.user.id});
    res.status(200).json(contacts)
});

//Creating a contact
const createContact=asynchandler(async(req,res)=>{
    console.log("The request body is:",req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact=await Contact.create({
        name,
        email,
        phone,      
    });
    res.status(201).json(contact);
});

//Getting the contact details
const getContact=asynchandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//Updating the Contact
const updateContact=asynchandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
    )
    res.status(200).json(updatedContact);
});

//Deleting contacts
const deleteContact=asynchandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne()
    res.status(200).json(contact);
});



module.exports={getContacts,createContact,getContact,updateContact,deleteContact};