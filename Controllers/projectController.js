const projects =require('../Models/projectSchema')

//add project 
exports.addProject = async(req,res)=>{
    console.log("Inside the add project");
    //get userId
    const userId = req.payload
    console.log(userId)
    //get image name
    const projectImg=req.file.filename

    //addproject details
    const {title,language,github,linkedin,overview}=req.body
    console.log(title,language,github,linkedin,overview,projectImg)
    //logic of adding new project details
    try{
        const existingProject = await projects.findOne({github})
        //if any github link is present in mongodb
        if(existingProject){
            res.status(406).json("Project Already Exists")
        }
        else{
            //there is no other github link in mongodb
            const newProject =  new projects({title,language,github,linkedin,overview,projectImg,userId})
            //to save the new project details in to mongodb
            await newProject.save()
            //send response to the client
            res.status(200).json(newProject)

        }
    }
    catch(err){
        res.status(401).json({"Request failed": +err})
    }
}


//get user projects (particular user's projects)
exports.allUsersProjects = async(req,res)=>{
    const userId=req.payload
    try{
        const userProjects =await projects.find({userId})
        res.status(200).json(userProjects)
    }
    catch(err){
        res.status(401).json({"Request failed:": +err})
    }
}

//get all projects
exports.allProjects = async(req,res)=>{

    const searchKey=req.query.search

    const query={
        $or:[
            {language:{$regex:searchKey,
                $options:"i"}} ,
            {title:{$regex:searchKey,
                $options:"i"}}
        ]
        
    }
    try{
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    }
    catch(err){
        res.status(401).json({"Request failed:": +err})

    }
}

//home projects(3)
exports.homeProjects = async(req,res)=>{
    try{
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }
    catch(err){
        res.status(401).json({"Request failed:": +err})

    }
}

exports.deleteProject = async(req,res)=>{
    const id=req.params.id
    try{
        const deleted= await projects.findByIdAndDelete(id);
        if (deleted) {
            res.status(200).json("Deleted Successfully");
        } else {
            return res.status(404).json("Project does not exist");
        }

    }
    catch(err){
        res.status(401).json({"Request failed:": +err})

    }
        
    
}

exports.editProject = async(req,res)=>{
    const id=req.params.id
    const {title,language,github,linkedin,overview}=req.body
    const edited = await projects.findByIdAndUpdate(id,
        {title,language,github,linkedin,overview},
        {new:true}
        )
        if (edited) {
            res.status(200).json("edited Successfully");
        }
        else {
            return res.status(404).json("cannot edit project");
        }
}