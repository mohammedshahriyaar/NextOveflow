import dbConnect from "@/lib/dbConnect";
import PostModel, { Post } from "@/models/Post";
import Usermodel from "@/models/User";



export async function POST(req:Request) {
    
    await dbConnect()

    const {username,content} = await req.json();

    try {
        const user = await Usermodel.findOne({username})

        if(!user){
            return Response.json(
                {
                    sucess:'false',
                    message:"User not found"
                },
                {
                    status:404
                }
            )
        }

        const newPost: Post = new PostModel({
            userId:user._id,
            post:content,
            comments:[],
            upvotes:[],
            upvotesCount:0,
            datePosted:new Date(),
        })

        const savedPost = await newPost.save()
        
        return Response.json(
            {
                sucess:true,
                message:'Post created successfully',
                post:savedPost
            },
            {
                status:201
            }
        )
        
    } catch (error) {
        console.log("Error in creating a post",error)

        return Response.json(
            {
                sucess:true,
                message:'eRROR CREATING POST',
            },
            {
                status:500
            }
        )
        
    }
}