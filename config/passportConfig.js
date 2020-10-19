const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
var User = mongoose.model('User');
// var webUser = mongoose.model('webUser');
// var Park = mongoose.model('park');
passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            console.log('passport')
            User.findOne({ email: username },
                (err, user) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!user)
                        return done(null, false, { message: 'Email is not registered' });
                    // wrong password
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' }); 
                    // authentication succeeded
                    else
                        return done(null, user);
                });
        })
);


// passport.use('web',
//     new localStrategy({ usernameField: 'email' },
//         (username, password, done) => {
//             console.log('passport')
//             webUser.findOne({ email: username },
//                 (err, user) => {
//                     if (err)
//                         return done(err);
//                     // unknown user
//                     else if (!user)
//                          return done(null, false, { message: 'Email is not registered' });
//                     // wrong password
//                     else if (!user.verifyPassword(password))
//                         return done(null, false, { message: 'Wrong password.' });
//                     else if(user.isactivate=="no")
//                         return done(null, false, { message: 'Admin not activate yet.' });
//                     else if(user.role=="keeper"){
//                         if(user.state=="close")
//                         return done(null, false, { message: 'Park is closed' });
//                         return done(null, user);
//                     } 
//                     // authentication succeeded
//                     else
//                         return done(null, user);
//                 });
//         })
// );

// passport.use('keeper',
//     new localStrategy({ usernameField: 'email' },
//         (username, password, done) => {
//             console.log('passport')

//             Park.findOne({ email: username },
//                 (err, user) => {
//                     if (err)
//                         return done(err);
//                     // unknown user
//                     else if (!user)
//                          return done(null, false, { message: 'Email is not registered' });
//                     // wrong password
//                     else if (!bcrypt.compareSync(password, user.password))
//                         return done(null, false, { message: 'Wrong password.' });
//                     else if(user.isactivate=="no")
//                         return done(null, false, { message: 'Admin not activate yet.' });
//                     else if(user.role=="keeper"){
//                         if(user.state=="close")
//                         return done(null, false, { message: 'Park is closed' });
//                         return done(null, user);
//                     } 
//                     // authentication succeeded
//                     else
//                         return done(null, user);
//                 });
//         })
// );