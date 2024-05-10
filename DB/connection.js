// import mongoose
const { default: mongoose } = require("mongoose");

// connect database
 mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("database connected"))
    .catch((error)=>{
        console.log("Mongo DB connection error: " + error);
    })

module.exports