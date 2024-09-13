import dbConnect from "@/lib/dbConnect";
import Usermodel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req:Request) {

    await dbConnect()
    try {

        let {username,email,password} = await req.json();
        //check if user already exists

        let existingUser = await Usermodel.findOne({username})

        if(existingUser){
            return Response.json(
                {
                    success:false,
                    message:'Username already exists..☹️'
                },
                {
                    status:400
                }
            )

        }

        let hashedPassword = await bcrypt.hash(password,10)
        const newUser = new Usermodel({
            username,
            email,
            password:hashedPassword
        })

        await newUser.save()


        return Response.json({
            success:true,
            message:"User created successfully"
        },{status:201})



        
    } catch (error) {
        console.error(error);
        return Response.json({
            success:false,
            message:"Error registering user"
        },{
            status:500
        })
        
    }
    
}