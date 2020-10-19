const express = require('express');
const router = express.Router();

const ctrlMobile = require('../controllers/UserAcaMeter');

// const jwtHelper = require('../config/jwtHelper');

// const ctrlBook=require('../controllers/booking.controller');
// Mobile routing >>>>>>>>>>


router.post('/register', ctrlMobile.register);
router.post('/authenticate', ctrlMobile.authenticate);
// router.post('/updateUser', ctrlMobile.updateUser);
// router.post('/getUser', ctrlMobile.getUser);
// router.post('/addUserVehicle', ctrlMobile.addUserVehicle);
// router.post('/updateUserVehicle', ctrlMobile.updateUserVehicle);
// router.post('/deleteUserVehicle', ctrlMobile.deleteUserVehicle);
// router.post('/verify', ctrlMobile.verify);
// router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlMobile.userProfile);
// router.get('/getname/:email', ctrlMobile.getname);
// router.put('/rstpw',ctrlMobile.puttoken);
// router.get('/test',ctrlMobile.test);



// webApp routing  >>>>>>>>>>>>>>>>>>>>>>>


// const ctrlUser = require('../controllers/webuser.controller');
// const keeper=require('../controllers/parkkeeper.controller')
// const filecntrl=require('../controllers/userfile');
// const admincntrl=require('../controllers/adminfile')
// const jwtHelper = require('../config/jwtHelper');

// router.post('/web/register', ctrlUser.register);
// router.post('/web/authenticate', ctrlUser.authenticate);
// router.get('/web/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
// router.get('/web/userProfile/:id', ctrlUser.getowner);
// router.get('/web/getname/:email', ctrlUser.getname);
// router.get('/web/rstpw/user/:email',ctrlUser.puttoken);
// router.get('/web/rstpw/keeper/:email',keeper.puttoken);
// router.get('/web/resetpassword/user/:token', ctrlUser.rstpw);
// router.get('/web/resetpassword/keeper/:token', keeper.rstpw);
// router.put('/web/savepassword/user',ctrlUser.savepassword);
// router.put('/web/savepassword/keeper',keeper.savepassword);
// router.post('/web/newPost', ctrlUser.newPost);
// router.get('/web/getPosts',ctrlUser.getPosts)
// router.put('/web/editpro/:id',ctrlUser.editpro);
// router.post('/updateprofilepic/:id',ctrlUser.editPic)
 
// router.post('/web/regkeeper/:id',keeper.pkregister);
// router.post('/web/editkeeper/:id',keeper.editkeeper);
// router.post('/web/keeper/authenticate', keeper.authenticate);
// router.get('/web/keeperProfile',jwtHelper.verifyJwtToken, keeper.keeperProfile);
// router.get('/web/getkeepers/:id', keeper.getkeepers);
// router.get('/web/setstate/:id/:state',keeper.setstate);
// router.get('/web/getnewkeepers',keeper.getnewkeepers);
// router.get('/web/acceptpark/:id',keeper.acceptpark)
// router.get('/web/reject/:id',keeper.reject)
// router.post('/updatekeeperpic/:id',keeper.editPic)
// router.get('/web/getkeeperprofile/:id', keeper.getkeeperprofile);
// router.get('/web/allkeepers',keeper.allkeepers)
// router.get('/web/reported',keeper.reported)

// router.get('/web/users', ctrlUser.users);
// router.get('/web/readmsg/:file',ctrlUser.readmsg);
// router.get('/web/getowners', ctrlUser.getowners);

// router.get('/web/bookingDetails/:slotId',ctrlBook.bookingDetails)
// router.get('/web/booking/:id',ctrlBook.booking)
// router.get('/web/bookinghistory/:id',ctrlBook.bookinhistory)
// router.post('/web/setBook',ctrlBook.setBook)
// router.get('/web/deletebook/:bookId',ctrlBook.deleteBook)
// router.post('/web/sethistory',ctrlBook.sethistory)
// router.post('/web/releaseslot',ctrlBook.releaseslot)
// router.post('/upload/:id',filecntrl.savefile);
// router.get('/files/:id',filecntrl.files)
// router.get('/file/:filename',filecntrl.file)
// router.get('/adminfile/:filename',filecntrl.adminfile)
// router.get('/getusername/:id',ctrlUser.getusername)

// router.post('/upload/:id/:sid',admincntrl.savefile);
// router.get('/rfiles/:id',admincntrl.files)
// router.get('/userfiles',admincntrl.userfiles)
// router.get('/admindoc',admincntrl.adminfiles)
// router.get('/messages',admincntrl.messages)

module.exports = router;



