const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');
module.exports.register = (req, res, next) => {

    var user = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        level: req.body.level,
        semester: req.body.semester,
        batch: req.body.batch
    });


    user.save((err, doc) => {
        console.log(err)
        if (!err) {
            res.status(200).send({ 'user': doc });
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
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json({ "status": "error", "error": err });
        // registered user
        else if (user) return res.status(200).json({
            "status": "success", "user": {
                "username": user.username,
                "uid": user._id,
            }
        });
        // unknown user or wrong password
        else return res.status(200).json({ "status": "error", "error": info });//test
    })(req, res);
}

module.exports.getUser = (req, res, next) => {
    // call for passport authentication
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user) {
                return res.status(404).json({ status: false, message: 'User record not found.' });
                console.log(err)
            }
            else {
                console.log('Im in backend');
                return res.status(200).json({ status: true, user });
            }
        }
    );
}

module.exports.calculateRank = (req, res, next) => {
    // call for passport authentication
    var rank = 1;
    User.find({},
        (err, users) => {
            if (!users) {
                return res.status(404).json({ status: false, message: 'User record not found.' });
                console.log(err)
            }
            else {
                for (let index = 0; index < users.length; index++) {
                    var user = users[index];
                    if(req.body.gpa < user.gpa)
                        rank++                    
                }
                return res.status(200).json({ status: true, rank: rank });
            }
        }
    );
}