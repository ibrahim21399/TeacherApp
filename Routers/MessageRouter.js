const express=require("express");
//const {body,param,query} =require("express-validator");


const Controller=require("./../Controllers/messageController")
//const authMW=require("./../Middleware/authMiddleware")

const router=express.Router();
router.route("/messages")
.post(Controller.SendMessage)


router.route("/messages/:stdId/:teachId")
.get(Controller.getAll)

module.exports=router;