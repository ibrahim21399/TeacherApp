const express=require("express");
//const {body,param,query} =require("express-validator");


const Controller=require("./../Controllers/teacherController")
//const authMW=require("./../Middleware/authMiddleware")

const router=express.Router();
router.route("/teachers")
.get(Controller.getAll)
.post(Controller.RegisterTeacher)
.put(Controller.update)

router.route("/teachers/:id?")
.get(Controller.getById)
.delete(Controller.delete)

module.exports=router;