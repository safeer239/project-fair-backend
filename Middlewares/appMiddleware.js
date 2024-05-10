const appMiddleware = (req,res,next)=>{
    console.log(("Inside the Application-level middleware"));
    next()
}

module.exports = appMiddleware