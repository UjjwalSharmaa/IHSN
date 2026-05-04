import mongoose from "mongoose";
import Passage from "next-auth/providers/passage";

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin", "subscriber"],
        default:"subscriber"
    },
    subscriptionStart:{
        type:Date
    },
    subscriptionEnd:{
        type:Date
    },
    isActive:{
        type:Boolean,
        default:true
    }
}, {timestamps:true});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;