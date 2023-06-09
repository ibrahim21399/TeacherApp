const Model = require("./../Models/teacherModel");
const bcrypt = require('bcrypt');
const checkValidation = require("./../Middleware/checkValidationFn");
//getActiveTeachers
module.exports.getActiveTeachers =(request, response, next) => {
    console.log("get Active");
    Model.find({"Active":true}).then((data) => {
        if (data.length == 0) throw new error("No data");
        response.status(200).json({ data });
      })
      .catch((error) => next(error));
  };

  //getNotActiveTeachers
  module.exports.getNotActiveTeachers =(request, response, next) => {
    console.log("get Not Active");
    Model.find({"Active":false}).populate('FieldId').then((data) => {
        if (data.length == 0) throw new error("No data");
        response.status(200).json({ data });
      })
      .catch((error) => next(error));
  };

//getHighRateTeachers
module.exports.getHighRateTeachers =(request, response, next) => {
  console.log("get get High Rate Teachers");
  Model.find({"Active":true}).populate('FieldId').sort({ rating: -1 }).then((data) => {
      if (data.length == 0) throw new error("No data");
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

  //getById
  module.exports.getById = ((request, response, next) => {
    Model.find({"_id":request.params.id})
    .then((data)=>{
        if(data.length==0)
        throw new error("No data");
        response.status(200).json({data}) ;
    })
    .catch(error=>next(error))
});

  //Update
  module.exports.update = ((request, response, next) => {
    Model.updateOne({"_id":request.body.id},{
      $set:{
        /*

    Active: { type: Boolean},
    AcceptanceDate: { type: Date },

        */
          name:request.body.name,
          email:request.body.email,
          phone:request.body.phone,
          pricePerHour:request.body.pricePerHour,
          experience:request.body.experience,
          Latitude:request.body.Latitude,
          Longitude:request.body.Longitude,
          FieldId:request.body.FieldId,


          rating:request.body.rating,
          password:request.body.password
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

  //ChangeStatus
  module.exports.changeStatus = ((request, response, next) => {
    Model.updateOne({"_id":request.body.id},{
      $set:{
    Active:!Active,
    AcceptanceDate:Date.now,
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

//Create
module.exports.RegisterTeacher = (request, response, next) => {
  // checkValidation(request)
  console.log(request);
  Model.findOne({ email: request.body.email })
      .then((data) => {
          if (data){
              throw new Error("this email is already taken");
          }
          // encrypt the password
          bcrypt.hash(request.body.password, 10).then((hash) => {
              let newTeacher = new Model({
                  email: request.body.email,
                  Phone:request.body.Phone,
                  FieldId:request.body.FieldId,
                  rating:0,
                  experience:request.body.experience,
                  Latitude:request.body.Latitude,
                  Longitude:request.body.Longitude,
                  name:request.body.name,
                  pricePerHour:request.body.pricePerHour,
                  Active:false,
                  password:hash,
              });
              newTeacher.save().then((data) => {
                      response.status(201).json({ message: "teacher registered successfully", data });
                  }).catch(error => next(error));
          });
      }).catch(error => next(error));
};

//Delete