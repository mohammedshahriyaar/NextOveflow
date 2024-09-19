import mongoose, {Schema,Document}from "mongoose";
export interface Notification extends Document{
    type:string;
    from:string;
    postId:string;
    message:string;
    status:string;
    date:string;
    fromUser:string
}

const NotificationSchema:Schema<Notification> = new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    fromUser:{
        type:String,
        required:true
    }
    
})
export interface User extends Document{
    username:string;
    email:string;
    password:string;
    profilePic:string;
    notifications:Notification[];
    emailNotifications:boolean
}

const UserSchema:Schema<User> = new mongoose.Schema({
    
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        unique:true,
        match:[/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,'Please use a valid email address']
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    profilePic:{
        type:String,
        required:false
    },
    notifications:[NotificationSchema],
    emailNotifications:{
        type:Boolean,
        required:false
    }

})


//  (if model already exists return that ) || (create the model now)
const Usermodel = (mongoose.models.User as mongoose.Model<User>) || ( mongoose.model<User>("User",UserSchema))
export default Usermodel