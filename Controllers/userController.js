const Users = require("../Models/userSchema");

const jwt = require('jsonwebtoken')

//  to define registration
exports.register = async (req, res) => {
    console.log("Inside the register function");

    const { username, email, password } = req.body;
    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(406).json("User already registered");
        } else {
            const newUser = new Users({
                username,
                email,
                password,
                github: "",
                linkedin: "",
                profile: "",
            });
            await newUser.save(); // Data is saved in the database
            // Send response with the new user object
            res.status(200).json(newUser);
        }
    } catch (error) {
        res.status(500).json('Register API failed');
    }
};


//to define login 

exports.login = async(req,res)=>{
    console.log("Inside the register function");

    const {  email, password } = req.body;
    try{
        const existingUser = await Users.findOne({ email,password });
        if (existingUser) {
            //token generation 
            const token= jwt.sign({userId:existingUser._id},"superkey2023")
            return res.status(200).json({existingUser,token});
        } else {
           res.status(401).json("Invalid credentials");
            }
           
        }
    

    catch(error) {
        res.status(500).json('Login API failed');
    }
}