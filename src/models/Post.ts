import mongoose, {Schema,Document}from "mongoose";

export interface Reply extends Document{
    reply:string;
    userId:mongoose.Schema.Types.ObjectId
}

export const ReplySchema:Schema<Reply> = new mongoose.Schema({
    reply:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

export interface Commment extends Document{
    content:string;
    userId:string;
    datePosted:string;
    username:string;
    fromProfilePic:string;
}

export const CommentSchema:Schema<Commment> = new mongoose.Schema({
    content:{
        type:String,
        required:[true ,"Comment Content is required"]
    },
    userId:{
        type:String,
        required:true
    },
    datePosted:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    fromProfilePic:{
        type:String,
        required:true
    }
})


export interface Post extends Document{
    userId:string;
    post:string;
    comments:Commment[];
    upvotes: string[];
    upvotesCount:number;
    image:string;
    datePosted:Date;
}

export const postSchema:Schema<Post> = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true
    },
    comments:[CommentSchema],
    upvotes:[{
        type:String,
        required:true
    }],
    upvotesCount:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    datePosted:{
        type:Date,
        required:true
    }
})

const PostModel = (mongoose.models.Post as mongoose.Model<Post> )||(mongoose.model<Post>("Post",postSchema))
export default PostModel
