const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const nodemailer=require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const User = mongoose.model('webUser');
// const User=require('../models/user.model')
const Park = mongoose.model('park');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'parkheresl@gmail.com',
      pass: 'Parkherechuru'
    }
  });

// module.exports.pkregister = (req, res, next) => {
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(req.body.password, salt, (err, hash) => {
            

//             var user=new User({
//                 email:req.body.email,
//                 name:req.body.firstName,
//                 ownerid:req.params.id,
//                 password:hash,
//                 role:req.body.role,
//                 state:"close",
//                 isactivate:"no",
//                 lat:req.body.lat,
//                 lng:req.body.lng,
//                 saltSecret :salt
//                 });
//                 user.save((err, doc) => {
//                 if (!err)
//                 res.json({
//                     status:true,
//                     data:doc,
//                     message:'user registered sucessfully'
//                 })
//                 else {
//                     if (err.code == 11000)
//                         res.status(422).send(['Duplicate email adrress found.']);
//                     else
//                         return next(err);
//                 }
        
//             });
//         });
//     });
// }
module.exports.puttoken=(req,res)=>{console.log('sjhdfjb')
    Park.findOne({email:req.params.email}).select().exec((err,user)=>{console.log(user)
        if(err) console.log(err)
        
        if(!user){
            res.json({sucsess:false,message:'user was not found'})
        }
        else{
            user.temptoken= jwt.sign({ _id: this._id},
                process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXP
            });
            user.save((err)=>{
                if(err){
                    res.json({sucsess:false,message:err})
                }
                else{console.log(user.temptoken);
                    res.json({sucsess:true,message:'message was send to your email'})
                    var email={
                        from:'parkheresl@gmail.com',
                        to:user.email,
                        subject:user.firstName,
                        text:'http://localhost:4200/newpassword/keeper/'+user.temptoken
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

module.exports.rstpw=(req,res)=>{
    Park.findOne({ temptoken:req.params.token}).select().exec((err,user)=>{
        if(err) throw err;
        var token=req.params.token;
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                res.json({sucsess:false,message:'password link has expired'});
            }else{
                res.json({sucsess:true,user:user});

            }
        })
    })
}

module.exports.pkregister =  (req,res,next)=>{
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
             let newUser =new Park(req.body);
            newUser.ownerid=req.params.id;
            newUser.password=hash
            let slot={
             "isBook":false,
             "slotNumber":0,
             "name":"",
             "nic":"",
             "email":"",
             "parkedAt":"",
             "leavAt":"",
             "isLeav":true,
             "slotId":'',
             "charge":''
             }
             id="";

             
            Park.addUser(newUser, (err,user)=>{console.log(user)
                if(err) throw err;
                else{
                for(i=1;i<=req.body.alocatedSlots1;i++){
                 slot.slotNumber=i;
                 slot.slotId=req.params.id+1+i;
              Park.updateOne(
                  {
                      email:user.email
                  },
                  { 
                      $push:{
                          'type1':slot
                      }
                  },
                  function(err,user){
                      
                  }
              )
             }
             for(i=1;i<=req.body.alocatedSlots2;i++){
                 slot.slotNumber=i;
                 slot.slotId=req.params.id+2+i;
              Park.updateOne(
                  {
                      email:user.email
                  },
                  { 
                      $push:{
                          'type2':slot
                      }
                  },
                  function(err,user){
                      
                  }
              )
             }
             for(i=1;i<=req.body.alocatedSlots3;i++){
                 slot.slotNumber=i;
                 slot.slotId=req.params.id+3+i;
              Park.updateOne(
                  {
                      email:user.email
                  },
                  { 
                      $push:{
                          'type3':slot
                      }
                  },
                  function(err,user){
                      
                  }
              )
             }
             for(i=1;i<=req.body.alocatedSlots4;i++){
                 slot.slotNumber=i;
                 slot.slotId=req.params.id+4+i;
              Park.updateOne(
                  {
                      email:user.email
                  },
                  { 
                      $push:{
                          'type4':slot
                      }
                  },
                  function(err,user){
                      
                  }
              )
             }
             for(i=1;i<=req.body.alocatedSlots5;i++){
                 slot.slotNumber=i;
                 slot.slotId=req.params.id+5+i;
              Park.updateOne(
                  {
                      email:user.email
                  },
                  { 
                      $push:{
                          'type5':slot
                      }
                  },
                  function(err,user){
                      
                  }
              )
             }
             res.json({success: true,msg:'User registered'});
         
         }
            });})});
  

};

module.exports.editkeeper=(req,res,next)=>{
    let newUser =new Park(req.body);
    Park.updateOne({_id:req.params.id},
        (err, user, info)=>{
if(err) throw err;
else
res.json({sucsess:false,message:'Updated details'})
        }
    )

}

module.exports.authenticate = (req, res, next) => {console.log('sjdvh')
    // call for passport authentication
    passport.authenticate('keeper', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) {
            console.log(user)
            return res.status(200).json({ "token": jwt.sign({ _id:user._id,role:user.role,isactivate:user.isactivate
            },
            process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        }) });}
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}


module.exports.keeperProfile = (req, res, next) =>{console.log('aghkbadhfb');
    Park.findOne({ _id: req._id },
        (err, user) => {
            if (!user){
                return res.status(404).json({ status: false, message: 'User record not found.' });
            console.log(err)}
                else{console.log('Im in backend');
                return res.status(200).json({ status: true, user});}
        }
    );
}

module.exports.getkeepers = (req, res, next) => {
   Park.find({ ownerid :req.params.id },
        (err, user) => {console.log(user)
            if (!user){
                return res.status(404).json({ status: false, message: 'User record not found.' });
            console.log(err)}
                else{
                res.json(user);}
        }
    );
}
module.exports.getkeeperprofile = (req, res, next) => {
    Park.findOne({ _id :req.params.id },
         (err, user) => {console.log(user)
             if (!user){
                 return res.status(404).json({ status: false, message: 'User record not found.' });
             console.log(err)}
                 else{
                 res.json(user);}
         }
     );
 }

 module.exports.allkeepers = (req, res, next) => {console.log('kshdgfj')
    Park.find({},
         (err, user) => {console.log(user)
             if (!user){
                 return res.status(404).json({ status: false, message: 'User record not found.' });
             console.log(err)}
                 else{
                 res.json(user);}
         }
     );
 }
module.exports.reported=(req,res,next)=>{
    Park.find({isReport:true},
        (err, user) => {console.log(user)
            if (!user){
                return res.status(404).json({ status: false, message: 'User record not found.' });
            console.log(err)}
                else{
                res.json(user);}
        }
    );
}


module.exports.setstate=(req,res)=>{
    Park.findOne({_id:req.params.id}).select().exec((err,user)=>{console.log(user)
        if(err) throw err;
        if(!user){
            res.json({sucsess:false,message:'user was not found'})
        }
        else{ 
            user.state=req.params.state
            
            user.save((err)=>{
                if(err){
                    res.json({sucsess:false,message:err})
                }
                else{
                    res.json({sucsess:true,message:user})
                }
            }) 
        }
    })
}

module.exports.getnewkeepers=(req,res)=>{
   Park.find({isactivate:"no"}).select().exec((err,user)=>{console.log(user)
        if(err) throw err;
        if(!user){
            res.json({sucsess:false,message:'user was not found'})
        }
        else{ 
            
            res.json(user)
        }
    })
}

module.exports.acceptpark=(req,res)=>{
    Park.findOne({_id:req.params.id}).select().exec((err,user)=>{
        
        if(err) throw err;
       
            user.isactivate="yes";
            user.isReport=false;
            user.save((err)=>{
                if(err){
                    res.json({sucsess:false,message:err})
                }
                else{
                    res.json({sucsess:true,message:'Password has been reset'});
                }
            })
            
        
    })

}

module.exports.reject=(req,res)=>{
    Park.deleteOne({_id:req.params.id}).select().exec((err,user)=>{
        
        if(err) throw err;
        else
        res.json({sucsess:true,message:'profile deleted.'})
       })

}

module.exports.editPic=(req,res)=>{
    Park.findOne({_id:req.params.id}).select().exec((err,user)=>{console.log(req.body);
        if(err) throw err;
        if(!user){
            res.json({sucsess:false,message:'user was not found'})
        }
        else{
            user.proPic=req.body.PicUrl;
            user.save((err)=>{
                if(err){
                    res.json({sucsess:false,message:err})
                }
                else{
                    res.json({sucsess:true,message:user})
                }
            })
        }
    })
}

module.exports.savepassword=(req,res)=>{
    Park.findOne({email:req.body.email}).select().exec((err,user)=>{
        console.log(req.body.password)
        if(err) throw err;
        if(req.body.password==null||req.body.password==''){
            res.json({sucsess:false,message:'Password not provided'});
        }   
        else{
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
               
                user.password=hash;
                user.saltSecret=salt
            user.temptoken='';
            user.save((err)=>{
                if(err){
                    res.json({sucsess:false,message:err})
                }
                else{
                    res.json({sucsess:true,message:'Password has been reset'});
                }
            })
                });
            });   
        }
    })

}