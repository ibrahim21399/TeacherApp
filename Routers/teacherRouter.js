const express=require("express");
//const {body,param,query} =require("express-validator");


const Controller=require("./../Controllers/teacherController")
//const authMW=require("./../Middleware/authMiddleware")

const router=express.Router();
router.route("/teachers")
.get(Controller.getActiveTeachers)
.put(Controller.update)
.post(Controller.RegisterTeacher)
router.route("/teachers/:id?")
.get(Controller.getById)

router.route("/notactiveteachers")
.get(Controller.getNotActiveTeachers)

router.route("/highrateteachers")
.get(Controller.getHighRateTeachers)

router.route("/changeteacherstatus/")
.put(Controller.changeStatus)



module.exports=router;