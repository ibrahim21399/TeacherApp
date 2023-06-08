
const Model = require("./../Models/teacherModel");


//Get All 
module.exports.getAll =(request, response, next) => {
    console.log("get all");
    Model.find({}).then((data) => {
        if (data.length == 0) throw new error("No data");
        response.status(200).json({ data });
      })
      .catch((error) => next(error));
  };
  
  //Get By Id
  module.exports.getById = ((request, response, next) => {
    response.status(200).json({ message:"Get By Id" });
         
  });
  
  //create 
  module.exports.create = ((request, response, next) => {
    let teacher=new Model({
        name:request.body.name,
       
       })
       teacher.save()
       .then((data)=>{
        
            response.status(200).json({ message: "Student Created" });
     
        })
        .catch((error)=>{
            next(error)
            console.log(error+"")
        });
     });
  
  //Update 
  module.exports.update = ((request, response, next) => {
    response.status(200).json({ message:"update" });
   
  });
  
  
  //delete 
  module.exports.delete = ((request, response, next) => {
    response.status(200).json({ message:"delete" });
   
      });