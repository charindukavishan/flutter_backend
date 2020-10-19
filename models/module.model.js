const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var moduleSchema = new mongoose.Schema({
    moduleId: {
        type: String, 
    },
    studentId: {
        type: String,
    },
    moduleName: {
        type: String,
    },
    level: {
        type: Number
    },
    semester: {
        type: Number
    },
    result: {
        type: Number
    },
    credit: {
        type: Number
    }
});


mongoose.model('Module', moduleSchema);