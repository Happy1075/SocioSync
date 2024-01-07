const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    activity:{
        type:String,
        enum: ["active", "inactive"],
        required: true,
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
    },
    lastSeen:{
        type: Date,
        default:Date.now(),
        // TODO:-update whenever user logs in and out of socket
    },
    chats:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chat",
        }
    ],
    // profilePic:{
    //     type:String,
    //     trim:true,
    // },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null,
    }],
    requests:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:null,
        }
    ],
    invites:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:null,
        }
    ],
    groups:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        default:null,
    }],
    saved:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
        default:null,
    }]
})
module.exports = mongoose.model("User",userSchema);