
const Model = require("./../Models/adminModel");

//getAll
module.exports.getAll =(request, response, next) => {
    console.log("get all admins");
    Model.find({}).then((data) => {
        if (data.length == 0) throw new error("No data");
        response.status(200).json({ data });
      })
      .catch((error) => next(error));
  };

 
  //getById
  module.exports.getById = ((request, response, next) => {
    console.log("get by id");

    Model.find({"_id":request.params.id})
    .then((data)=>{
        if(data.length==0)
        throw new error("No data");
        response.status(200).json({data}) ;
    })
    .catch(error=>next(error))
});

//create 
module.exports.create = (request, response, next) => {
  console.log("create");

  Model.find({ Email: request.body.Email })
    .then((Data) => {
      if (Object.keys(Data).length != 0) {
        //exist
        console.log("Already Exists");
        throw new error("Duplicated Email");
      } else {
        let admin = new Model({
          email: request.body.email,
          name: request.body.name,
          password: request.body.password,
         
        });
        admin.save().then((data) => {
            response.status(201).json({ message: "created", data });
            console.log("created");
          })
          .catch((error) => {
            next(error);
            console.log(error + "");
          });
      }
    })
    .catch((error) => {
      next(error);
      console.log(error + "");
    });
};


  //Update
  module.exports.update = ((request, response, next) => {
    console.log("update");

    Model.updateOne({"_id":request.body.id},{
      $set:{
        email: request.body.email,
        name: request.body.name,
       // password: request.body.password,
      }
  }).then((data)=>{
      if(data.matchedCount==0)
      throw new error("No Data!")
      response.status(200).json({ message: "updated",data });
  }).catch((error)=>{
      next(error)
      console.log(error+"")
  })}
);


//Delete
module.exports.delete = (request, response, next) => {
  console.log("delete");

            Model.deleteOne({ _id: request.params.id })
            .then(data => {
                response.status(200).json({ message: "Deleted", data });
            })
            .catch(error => next(error))
    }