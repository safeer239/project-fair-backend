const { default: mongoose } = require("mongoose");
const validator = require("validator");
const projectSchema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    github:{
        type:String,
        required:true
    },
    linkedin:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        required:true
    },
    projectImg:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }

})

const projects = new mongoose.model('project',projectSchema)

module.exports = projects;