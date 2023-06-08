const express =require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");


const teacherRouter=require("./Routers/teacherRouter")
const adminRouter=require("./Routers/adminRouter")


const server=express();
mongoose.connect("mongodb://localhost:27017/TeacherApp")
.then(()=>{
    console.log("DB Connected");
        server.listen(process.env.PORT||8080,()=>{
        console.log("I'm Listening.....");
});

})
.catch(error=>{console.log("Error occured")})



// Logger Middle Ware
server.use((request, response, next) => {
    console.log(request.url, request.method);
    next();
});

// Cors



//body parser
server.use(body_parser.json());
server.use(body_parser.urlencoded({extended:false}));

//routes
server.use(teacherRouter);
server.use(adminRouter);



//NotFound MW
server.use((request,response)=>{
    response.status(404).json({message:"Page is Not Found!"});
});


//Error MW
server.use((error,request,response,next)=>{
    // response.status(500).json({message:"Something went wrong"})
    response.status(500).json({message:error+""})
});