const express = require("express");
const connectDB = require("./database/database");  
const User = require("./models/user");


const app = express();
app.use(express.json());

//sign up route
app.post("/signUp", async (req, res) => {       

    try{
        const user = new User(req.body);
        const isAlreadyExists = await User.findOne({emailId:user.emailId});
        if(isAlreadyExists){
            return res.status(400).send("Email already exists!");
        }
        
        await user.save();
        return res.send("User added successfully");
    }catch(err){
        return res.status(400).send("Error saving the data to DB");
    }
})


//finding user with their email id
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try{
        const user = await User.findOne({emailId: userEmail});
        if(user){
            return res.send(user);
        }else{
            return res.send("No user found"); 
        }
        
    }catch(error){
        return res.status(400).send("Somethhing went wrong");
    }
})

//get all the users from database
app.get("/feed", async (req, res) => {
    try{
        const allUsers = await User.find({});
        res.send(allUsers);        
    }catch(err){
        res.status(404).send("Something went wrong");
    }
});


//deleting a user
app.delete("/user", async (req, res) => {
    
    const userId = req.body.userId;

    try{
        const isAvailable = await User.findOne({userId});
        if(!isAvailable){
            return res.send("User doesn't exist");
        }

        const user = await User.findByIdAndDelete(userId);
        return res.send("User deleted successfully!");
    }catch(err){
        return res.status(400).send("Error deleting the user");
    }
});



//updating things in a specific user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try{
        await User.findByIdAndUpdate({_id:userId}, data);
        return res.send("User updated successfully");
    }catch(err){
        return res.status(400).send("Error in updating data");
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
