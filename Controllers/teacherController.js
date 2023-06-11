const Model = require("./../Models/teacherModel");
const bcrypt = require('bcrypt');
const checkValidation = require("./../Middleware/checkValidationFn");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: "teacherapp67@gmail.com",
    pass:"nryxzoxaeroptjfy"
  },
});






//getActiveTeachers
module.exports.getActiveTeachers =(request, response, next) => {
    console.log("get Active");
    Model.find({"Active":true}).populate('FieldId').then((data) => {
    console.log(data);

        if (data.length == 0) throw new error("No data");
        response.status(200).json({data} );
      })
      .catch((error) => next(error));
  };

  //getPendingTeachers
  module.exports.getNotActiveTeachers =(request, response, next) => {
    console.log("get Not Active");
    Model.find({"Active":false}).populate('FieldId').then((data) => {
        if (data.length == 0) throw new error("No data");
        response.status(200).json({data} );
      })
      .catch((error) => next(error));
  };

//getHighRateTeachers
module.exports.getHighRateTeachers =(request, response, next) => {
  console.log("get get High Rate Teachers");
  Model.find({"Active":true}).populate('FieldId').sort({ rating: -1 }).then((data) => {
      if (data.length == 0) throw new error("No data");
      response.status(200).json( {data });
    })
    .catch((error) => next(error));
};

  //getById
  module.exports.getById = ((request, response, next) => {
    Model.find({"_id":request.params.id}).populate('FieldId').populate({
      path: 'studentEnrolled',
      populate: {
        path: '_id',
        select: 'name'
      }
    })
    .then((data)=>{
        if(data.length==0)
        throw new error("No data");
        response.status(200).json(data) ;
    })
    .catch(error=>next(error))
});

  //Update
  module.exports.update = ((request, response, next) => {
    Model.updateOne({"_id":request.body._id},{
      $set:{
       
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
  module.exports.Active = ((request, response, next) => {
    console.log(request.params.id)
    Model.updateOne({"_id":request.params.id},{
      $set:{
    Active:true,
    AcceptanceDate:Date.now(),
      }
  }).then((data)=>{
      if(data.matchedCount==0)
      throw new error("No Data!");
      else{
Model.findById(request.params.id).then((data)=>{
  const mailOptions = {
    from:"teacherapp67@gmail.com",
    to:data.email,
    subject: 'Your account has been approved',
    text: 'Congratulations! Your account has been approved.'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});
      response.status(200).json({ message: "updated",data });

      }
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
                  FieldId:request.body.fieldId,
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
module.exports.delete = (request, response, next) => {
  console.log("delete");

            Model.deleteOne({ _id: request.params.id })
            .then(data => {
                response.status(200).json({ message: "Deleted", data });
            })
            .catch(error => next(error))
    }