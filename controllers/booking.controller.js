const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const nodemailer=require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const files=mongoose.model('files');
const User = mongoose.model('webUser'); 
// const User=require('../models/user.model');
const Keeper = mongoose.model('park');
const booking=mongoose.model('booking');
const history=mongoose.model('history');

module.exports.bookingDetails = (req, res, next) =>{console.log('aghkbadhfb');
    booking.find({ slotId: req.params.slotId },
        (err, record) => {
            if (!record){
                return res.status(404).json({ status: false, message: 'User record not found.' });
            console.log(err)}
                else{console.log('Im in backend');
                // return res.status(200).json({ status: true, record:record})
                return res.send(record);
                ;}
        }
    );
}

module.exports.booking = (req, res, next) =>{console.log('aghkbadhfb');
    booking.find({keeperId:req.params.id},
        (err, record) => {
            if (!record){
                return res.status(404).json({ status: false, message: 'User record not found.' });
            console.log(err)}
                else{console.log('Im in backend');
                // return res.status(200).json({ status: true, record:record})
                return res.send(record);
                ;}
        }
    );
}

module.exports.bookinhistory=(req, res, next) =>{console.log('aghkbadhfb');
history.find({keeperId:req.params.id},
    (err, record) => {
        if (!record){
            return res.status(404).json({ status: false, message: 'User record not found.' });
        console.log(err)}
            else{console.log('Im in backend');
            // return res.status(200).json({ status: true, record:record})
            return res.send(record);
            ;}
    }
);
}

module.exports.setBook =  (req,res,next)=>{

  let  newbook=new booking(req.body);
//   this.newbook.bookId=Date.now();
var date=new Date().getTime()
newbook.bookId=date;
console.log(date)
  newbook.save((err)=>{
    if(err){
        res.json({sucsess:false,message:err})
    }
    else{
        res.json({sucsess:true,message:"Success booking"})
    }
}) 

}

module.exports.deleteBook=(req,res,next)=>{
    booking.deleteOne({bookId:req.params.bookId},
        (err,doc)=>{
            if(err){
              return  res.json({sucsess:false,message:err})
            }
            else{
                res.json({sucsess:true,message:"Delete success"})
            }
        }
    )
}

module.exports.sethistory =  (req,res,next)=>{

    let  newhistory=new history(req.body);
  //   this.newbook.bookId=Date.now();
  console.log(req.body)
    Keeper.updateOne(
        {
          _id: req.body.keeperId,
          type2: { $elemMatch: { slotId:req.body.slotId } }
        },
        { $set: { 
            "type2.$.isBook" : true,
            "type2.$.name" : req.body.DriverName,   
            "type2.$.nic" : req.body.DriverId,  
            "type2.$.parkedAt" : req.body.arivalTime,   
            "type2.$.leavAt" : req.body.depatureTime, 
            "type2.$.charge":req.body.charge          
    } },
    function(err,doc){
        if(err){console.log(err)
            // res.json({sucsess:false,message:err})
        }else{
            console.log(doc)
        }
    }
     )
  
    newhistory.save((err)=>{
      if(err){
          res.json({sucsess:false,message:err})
      }
      else{
          res.json({sucsess:true,message:"Saved"})
      }
  }) 
  
  }

  module.exports.releaseslot=(req,res,next)=>{
    Keeper.updateOne(
        {
          _id: req.body.keeperId,
          type2: { $elemMatch: { slotId:req.body.slotId } }
        },
        { $set: { 
            "type2.$.isBook" : false,
            "type2.$.name" : '',   
            "type2.$.nic" :'',  
            "type2.$.parkedAt" :'',   
            "type2.$.leavAt" :'',           
    } },
    function(err,doc){
        if(err){console.log(err)
            // res.json({sucsess:false,message:err})
        }else{
            // res.json({sucsess:true,message:doc})
        }
    }
     )

     Keeper.findOne({_id:req.body.keeperId}).select().exec((err,user)=>{
        let charge=user.monthrev;
        console.log(charge)
        console.log(req.body.charge)
        user.monthrev=(charge+req.body.charge);console.log(user)
        user.save((err)=>{
            if(err){
                res.json({sucsess:false,message:err})
            }
            else{
                res.json({sucsess:true,message:'Charge recoded'});
            }
        })
     })



  }
