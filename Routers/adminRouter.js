const express=require("express");
//const {body,param,query} =require("express-validator");


const Controller=require("./../Controllers/adminController")
//const authMW=require("./../Middleware/authMiddleware")

const router=express.Router();
router.route("/admins")
.get(Controller.getAll)
.post(Controller.create)
.put(Controller.update)

router.route("/admins/:id?")
.get(Controller.getById)
.delete(Controller.delete)




module.exports=router;