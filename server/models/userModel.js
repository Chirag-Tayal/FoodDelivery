const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter your email"]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false, 
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
        // validate: {
        //     validator: function (el) {
        //         return el !== this.password
        //     },
        //     message: "Password are not matched"
        // },
    },
    isVerified: {
        type: Boolean,
        select: false,
        default: true
    },
     role:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    },
    profileImage:{
        type:String,
        default :"https://placehold.co/200x60"
    },
    houseNo:{
        type:String
    },
    street:{
        type:String
    },
    country:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    zipCode:{
        type:String
    },
    cart:{
        type:Array,
        default:[]
    }

},{
    timestamps:true
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;