const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');
module.exports.register = (req, res, next) => {
    var user=new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password : req.body.password,
        });

        
        user.save((err, doc) => {
        if (!err){
            res.send(doc);
            }
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    console.log(req.body)
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json({"status":"error","error":err});
        // registered user
        else if (user) return res.status(200).json({ "status":"success","user":{
            "fname": user.firstName,
            "lname":user.lastName,
            "uid":user._id,
            "email":user.email,
        }});
        // unknown user or wrong password
        else return res.status(200).json({"status":"error","error":info});//test
    })(req, res);
}
