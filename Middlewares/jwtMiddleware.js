const jwt=require("jsonwebtoken")


const jwtMiddleware = (req,res,next)=>{
    console.log("Inside the Router middlleware");
    
    //token verification
    //1. Get the token - from the req headers
    const token = req.headers['authorization'].slice(7)
    console.log(token);
   try{
         //2.vrify the token - verify()
    const tokenVerification=jwt.verify(token,"superkey2023")
    console.log(tokenVerification);
    req.payload = tokenVerification.userId
    next();
   }
   catch(error){
        res.status(401).json("Authorization failed...Please login again")
   }
  
}
module.exports=jwtMiddleware