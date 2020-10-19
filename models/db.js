const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + err) }
});

require('./user.model');
// require('./webuser.model');
// require('./park');
// require('./files');
// require('./booking')
// require('./history');
// require('./adminfile');