const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        select: false
    },
    favorites:{
        type:Array,
        default:[]
    },
    watchHistory:[{
        movieId: String,
        title: String,
        posterPath: String,
        watchAt:{
            type:Date,
            default:Date.now
        }
    }],
    role: {type: String, enum:['user', 'admin'], default: 'user'}
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;