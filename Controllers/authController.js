const jwt = require("jsonwebtoken");
const student = require("./../Models/studentModel");
const teacher = require("./../Models/teacherModel");
const admin = require("./../Models/adminModel");
const checkValidation = require("./../Middleware/checkValidationFn");
const bcrypt = require('bcrypt');


module.exports.login = async(request, response, next) => {

    //checkValidation(request);
    const email = request.body.email;
    let password = request.body.password;
    let loggedIn = false;

    // check if it's the admin
    if (!loggedIn) {
        await admin.findOne({email: email}).then(async(data) => {
            console.log("Admin");
            if (data) {
                await bcrypt.compare(password, data.password, (err, result) => {
                    if (result) {
                        let token = jwt.sign({
                                role: "admin",
                                _id:data.id,
                                name:data.name,
                            },
                            "thisismysecuritykey", { expiresIn: "1h" });
                        response.status(200).json({ message: "admin logged in successfully", token });
                        loggedIn = true;
                    } else {
                        response.status(400).json({message: "Email or password incorrect"});
                    }
                });
            }
            console.log("admin");
            console.log(loggedIn);
        }).catch(error => next(error));
    } 
    if (!loggedIn) {
        await student.findOne({
            email: email,
        }).then(async(data) => {
            if (data) {
                await bcrypt.compare(password, data.password, (err, result) => {
                    if (result) {
                        let token = jwt.sign({
                                role: "student",
                                _id:data.id,
                                name:data.name,
                            },
                            "thisismysecuritykey", { expiresIn: "1h" });
                        response.status(200).json({ message: "student logged in successfully", token });
                        loggedIn = true;
                    } else {
                        response.status(400).json({message: "Email or password incorrect"});
                    }
                });
            }
            console.log("std-");
            console.log(loggedIn);
        }).catch(error => next(error));
    }
   if (!loggedIn) {
            await teacher.findOne({
                email: email
            }).then(async data => {
                if (data) {
                    await bcrypt.compare(password, data.password, (err, result) => {
                        if (result) {
                            let token = jwt.sign({
                                    role: "teacher",
                                    _id:data.id,
                                    name:data.name,
                                },
                                "thisismysecuritykey", { expiresIn: "1h" });
                            response.status(200).json({ message: "teacher logged in successfully", token });
                            loggedIn = true;
                        } else {
                            response.status(400).json({message: "Email or password incorrect"});
                        }
                    });
                }
            }).catch(error => next(error));
        }
    }
