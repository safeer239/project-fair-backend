// import express
const express = require('express');


// create router object of express to define routes
const router = new express.Router();

// import register from userController
const {register} = require('../Controllers/userController')


// using router object to define routes(paths)
// register api call 
router.post('/users/register', register)

const {login} = require('../Controllers/userController')
// login api call
router.post('/users/login',login)

const { addProject}= require('../Controllers/projectController')

const jwtMiddleware = require('../Middlewares/jwtMiddleware');
const { multerConfig } = require('../Middlewares/multerMiddlewares');
//add project
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImg'),addProject)

//get user projects 
const {allUsersProjects} = require('../Controllers/projectController')
router.get('/user/project',jwtMiddleware,allUsersProjects)

//get all projects
const {allProjects} = require('../Controllers/projectController')
router.get('/projects/all',jwtMiddleware,allProjects)

//get home projects 
const {homeProjects} = require('../Controllers/projectController')
router.get("/projects/home",homeProjects)

//delete user projects
const {deleteProject} = require('../Controllers/projectController')
router.delete('/user/project/:id',jwtMiddleware,deleteProject)

//edit user projects
const {editProject} = require('../Controllers/projectController')
router.put('/user/project/:id',jwtMiddleware,editProject)

module.exports = router;