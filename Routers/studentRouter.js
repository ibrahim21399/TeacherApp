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

router.route("/BlockStudent/:id")
.get(Controller.Block)


router.route("/ActiveStudent/:id")
.get(Controller.Active)

router.route("/enroll")
.post(Controller.Enroll)

module.exports=router;