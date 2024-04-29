const express=require("express");
const errorhandler = require("./middleware/errorhandler");
const dotenv=require("dotenv").config();
const app=express();
const connectDb=require('./config/dbconnection');

connectDb();
const port=process.env.PORT || 5000;

app.use(express.json())
app.use("/api/contacts",require("./routes/contactroutes"));
app.use("/api/users",require("./routes/userroutes"));
app.use(errorhandler);

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});