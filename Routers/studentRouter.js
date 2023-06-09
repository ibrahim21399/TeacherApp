const express=require("express");
//const {body,param,query} =require("express-validator");


const Controller=require("./../Controllers/studentController")
//const authMW=require("./../Middleware/authMiddleware")

const router=express.Router();
router.route("/students")
.get(Controller.getAll)
.post(Controller.create)
.put(Controller.update)

router.route("/students/:id?")
.get(Controller.getById)
.delete(Controller.delete)

router.route("/changestdstatus/")
.put(Controller.changeStatus)

router.route("/blockedstudents")
.get(Controller.getAllBlocked)


module.exports=router;