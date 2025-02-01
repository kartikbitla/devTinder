const express = require("express");
const connectDB = require("./database/database");  
const User = require("./models/user");


const app = express();


app.use("/signUp", (req, res) => {
    const user = new User({
        firstName:"Pankaj",
        lastName:"Bitla",
        emailId:"pankajbitla@gmail.com",
        password:"Password@123"
    });

    try{
        user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Error saving the data to DB");
    }
})

async function startServer() { 
    try {
        await connectDB(); 

        app.listen(3000, () => {
            console.log("Server is listening on port 3000");
        });
    } catch (err) {
        console.error("Server startup failed:", err);        
        
    }
}

startServer();