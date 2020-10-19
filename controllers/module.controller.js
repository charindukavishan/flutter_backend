const mongoose = require('mongoose');
const passport = require('passport');

const Module = mongoose.model('Module');
const User = mongoose.model('User');
module.exports.modulsBySemester = (req, res, next) => {
    Module.find({ studentId: req.body.studentId, semester: req.body.semester }).select().exec((err, modules) => {
        if (!modules) {
            return res.status(404).json({ status: false, message: 'Moudel not found.' });
        }
        else {
            return res.send(modules);
        }
    })
}

module.exports.addModule = (req, res, next) => {
    var module = new Module({
        moduleId: req.body.moduleId,
        studentId: req.body.studentId,
        moduleName: req.body.moduleName,
        level: req.body.level,
        semester: req.body.semester,
        result: req.body.result,
        credit: req.body.credit
    });

    Module.find({ studentId: req.body.studentId, semester: req.body.semester }).select().exec((err, modules) => {
        if (err) throw err;
        if (!modules) {
            module.save((err, doc) => {
                console.log(err)
                if (!err) {
                    calculateGPA(req.body.studentId)
                    res.status(200).send({ 'module': doc });
                }
                else {
                    res.status(422).send({message:'Error with the adding a module'});
                }
            });
        } else {
            res.status(422).send({message:'Already registered'});
        }
    })
    
}

module.exports.deleteModule = (req, res, next) => {
    Module.deleteOne({ studentId: req.body.studentId, moduleId: req.body.moduleId },
        (err, doc) => {
            if (err) {
                return res.json({ sucsess: false, message: err })
            }
            else {
                res.json({ sucsess: true, message: "Delete success" })
            }
        }
    )
}

module.exports.updateModule = (req, res, next) => {
    Module.findOne({ studentId: req.body.studentId, moduleId: req.body.moduleId }).select().exec((err, module) => {

        if (err) console.log(err);
        if (!module) {
            res.json({ sucsess: false, message: 'Module was not found' })
        }
        else {
            module.result = req.body.result;
            module.save((err) => {
                if (err) {
                    res.json({ sucsess: false, message: err })
                }
                else {
                    calculateGPA(req.body.studentId)
                    res.json({ sucsess: true, message: module })
                }
            })
        }
    })
}

function calculateGPA(studentId) {
    console.log(studentId)
    var gpa = 0;
    Module.find({ studentId: studentId }).select().exec((err, modules) => {

        if (err) throw err;
        if (modules) {
            var sum = 0;
            var creditSum = 0;

            for (let index = 0; index < modules.length; index++) {
                var module = modules[index];
                sum = sum + (module.credit * module.result)
                creditSum += module.credit
            }
            gpa = sum / creditSum;
        }
    })

    User.findOne({ _id: studentId }).select().exec((err, user) => {
        user.gpa = gpa;
        console.log(user)
        user.save((err) => {
            if (err) {
                return false;
            }
            else {
                return true;
            }
        })

    })
}

module.exports.calculateSGPA = (req, res, next) => {
    var sgpa = 0;
    console.log(req.body.studentId)

    console.log(req.body.semester)
    Module.find({ studentId: req.body.studentId, semester: req.body.semester }).select().exec((err, modules) => {
        if (err) throw err;
        if (modules) {
            var sum = 0;
            var creditSum = 0;

            for (let index = 0; index < modules.length; index++) {
                var module = modules[index];
                sum = sum + (module.credit * module.result)
                creditSum += module.credit
            }
            sgpa = sum / creditSum;

            res.json({ sucsess: true, message: sgpa })
        } else {
            res.json({ sucsess: false, message: "No module registered for selected semester" })
        }
    })
}