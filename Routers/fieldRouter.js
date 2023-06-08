const express=require("express");
//const {body,param,query} =require("express-validator");


const Controller=require("./../Controllers/fieldController")
//const authMW=require("./../Middleware/authMiddleware")

const router=express.Router();
router.route("/fields")
.get(Controller.getAll)
.post(Controller.create)
.put(Controller.update)

router.route("/fields/:id?")
.get(Controller.getById)
.delete(Controller.delete)




module.exports=router;