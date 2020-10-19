const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const email=require('nodemailer');
const bcrypt = require('bcryptjs');

const User = mongoose.model('User');
var transporter = email.createTransport({
    service: 'gmail',
    auth: {
      user: 'uniloginmy@gmail.com',
      pass: 'Wageesha@uniloginmy'
    }
  });
module.exports.register = (req, res, next) => {
    console.log('jshdbfjhbgjhb')
    var user=new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password : req.body.password,
        });
        user.save((err, doc) => {
        if (!err){
            res.send(doc);
            // var email={
            //     from:'uniloginmy@gmail.com',
            //     to:user.email,
            //     subject:user.firstName,
            //     text:"Use this code to continue registration : "+user.regcode
            // };
            // transporter.sendMail(email, function(error, info){
            //     if (error) {
            //       console.log(error);
            //     } else {
            //       console.log('Email sent: ' + info.response);
            //       //res.json({sucsess:true,message:'message was send to your email'})
            //     }
            //   });
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
        if (err) return res.status(400).json({"status":"error","error":err});
        // registered user
        else if (user) return res.status(200).json({ "status":"success","user":{
            "fname": user.firstName,
            "lname":user.lastName,
            "uid":user._id,
            "email":user.email,
            "registered":user.verified,
            "regcode":user.regcode
        }});
        // unknown user or wrong password
        else return res.status(200).json({"status":"error","error":info});//test
    })(req, res);
}

module.exports.test = (req,res, next)=>{
    User.findOne({ _id: "5b938499608bc60004046f2d"},
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else{console.log('Im in backend');
                return res.status(200).json({ status: true, user});}
        }
    );
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else{console.log('Im in backend');
                return res.status(200).json({ status: true, user});}
        }
    );
}


module.exports.getname=(req,res,next)=>{
    User.findOne({email:req.params.email}).select().exec((err,user)=>{
        console.log(bcrypt.getRounds(user.password))
            if(!user){ console.log('svdjsdj')
                res.json({sucsess:false,message:'email was not found'})
            }
            else{ 
                var email={
                    from:'',
                    to:'',
                    subject:user.firstName,
                    text:bcrypt.getRounds(user.password)
                };
                transporter.sendMail(email, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                  return res.status(200).json({ status: true, user});
            }  
    })
}

module.exports.verify=(req,res)=>{
    User.findOne({email:req.body.email}).select().exec((err,user)=>{console.log(user)
        if(err) throw err;
        if(!user){
            res.json({sucsess:false,message:'user was not found'})
        }
        else{
            if(user.regcode==req.body.regcode){
                user.verified= true;
                user.save((err)=>{
                    if(err){
                        res.json({sucsess:false,message:err})
                    }
                    else{
                        res.json({sucsess:true})
                    }
                })
            }
            else{
                res.json({sucsess:false,message:"Wrong code"})
            }
            
        }
    })
}

module.exports.puttoken=(req,res)=>{
    User.findOne({email:req.body.email}).select().exec((err,user)=>{console.log(user)
        if(err) throw err;
        if(!user){
            res.json({sucsess:false,message:'user was not found'})
        }
        else{
            user.temptoken= user.generateJwt();
            user.save((err)=>{
                if(err){
                    res.json({sucsess:false,message:err})
                }
                else{
                    var email={
                        from:'charindukavishan@gmail.com',
                        to:user.email,
                        subject:user.firstName,
                        text:'http://localhost:4200/newpassword/'+user.temptoken
                    };
                    transporter.sendMail(email, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                          res.json({sucsess:true,message:'message was send to your email'})
                        }
                      });
                }
            })
        }
    })


}

module.exports.getUser=(req,res)=>{
    User.findOne({email:req.body.email}).select().exec((err,user)=>{console.log(user)
        if(err) throw err;
        if(!user){
            res.json({sucsess:false,message:'user was not found'})
        }else{
            res.json({sucsess:true,user:user});    
        }
    });
}

module.exports.updateUser=(req,res)=>{
    var obj = {}
    if(req.body.nic) obj.nic=req.body.nic
    if(req.body.dob) obj.dob=req.body.dob
    if(req.body.mobileNo) obj.mobileNo=req.body.mobileNo
    if(req.body.verified) obj.verified=req.body.verified
    console.log(obj);
    User.updateOne(
        {
            email:req.body.email
        },
        {
            $set:obj
        },
        function(err){
            if(err){
                res.json({sucsess:false,message:err,email:req.body.email})
            }else{
                res.json({success:true,email:req.body.email})
            }
        }
    )
}

module.exports.addUserVehicle=(req,res)=>{
    //console.log(obj);
    User.updateOne(
        {
            email:req.body.email
        },
        { 
            $push:{
                'vehicles':req.body.vehicle
            }
        },
        function(err){
            if(err){
                res.json({sucsess:false,message:err,email:req.body.email})
            }else{
                res.json({success:true,email:req.body.email})
            }
        }
    )
}

module.exports.updateUserVehicle=(req,res)=>{
    //console.log(obj);
    User.updateOne(
        {
            email:req.body.email,
            'vehicles.number':req.body.number
        },
        {
            $set:{
                'vehicles.$.name':req.body.name
            }
        },
        function(err){
            if(err){
                res.json({sucsess:false,message:err,email:req.body.email})
            }else{
                res.json({success:true,email:req.body.email})
            }
        }
    )

}

module.exports.deleteUserVehicle=(req,res)=>{
    //console.log(obj);
    User.updateOne(
        {
            email:req.body.email
        },
        {
            $pull:{'vehicles':{'number':req.body.number}}
        },
        function(err){
            if(err){
                res.json({sucsess:false,message:err,email:req.body.email})
            }else{
                res.json({success:true,email:req.body.email})
            }
        }
    )

}