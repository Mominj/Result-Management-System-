const {Schema, model} = require('mongoose');

const superadminSchema  = new Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
    }
})

const SuperAdmin = model('SuperAdmin',superadminSchema);
module.exports = SuperAdmin