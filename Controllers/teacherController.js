
const Model = require("./../Models/teacherModel");
const bcrypt = require('bcrypt');
const checkValidation = require("./../Middleware/checkValidationFn");

//create 
module.exports.create = ((request, response, next) => {
  let teacher = new Model({
    name: request.body.name,

  })
  teacher.save()
    .then((data) => {

      response.status(200).json({ message: "Student Created" });

    })
    .catch((error) => {
      next(error)
      console.log(error + "")
    });
});


module.exports.RegisterTeacher = (request, response, next) => {
  checkValidation(request)
  Model.findOne({ Email: request.body.email })
      .then((data) => {
          if (data)
              throw new Error("this email is already taken");
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

//Get All 
module.exports.getAll = (request, response, next) => {
  console.log("get all");
  Model.find({}).then((data) => {
    if (data.length == 0) throw new error("No data");
    response.status(200).json({ data });
  })
    .catch((error) => next(error));
};

//Get By Id
module.exports.getById = ((request, response, next) => {
  response.status(200).json({ message: "Get By Id" });
});


//Update 
module.exports.update = ((request, response, next) => {
  response.status(200).json({ message: "update" });

});


//delete 
module.exports.delete = ((request, response, next) => {
  response.status(200).json({ message: "delete" });

});