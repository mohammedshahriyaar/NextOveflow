import dbConnect from "@/lib/dbConnect";
import Usermodel from "@/models/User";
import {z} from "zod"

import { usernameValidation } from "@/schemas/singUpSchema";


const UsernameQuerySchema = z.object({
    username:usernameValidation
})


export async function GET(request:Request) {


    await dbConnect();

    try {
        const {searchParams} = new URL(request.url)
    
        const queryParam = {
            username:searchParams.get("username")
        }
    
        // validate  query param with zod
    
        const result = UsernameQuerySchema.safeParse(queryParam)
        console.log(result);
    
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
    
            return Response.json({
                success:false,
                message:usernameErrors?.length>0
                ?usernameErrors.join(","):"Invalid Query parameters"
            },{status:400})
    
        }
    
        const {username} = result.data;
    
        const existingUser = await Usermodel.findOne({username});
    
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
    
        return Response.json(
            {
                sucess:true,
                message:'Username is Available'
            },
            {
                status:200
            }
        )

    } catch (error) {

        console.error("Error checking username",error);
        return Response.json(
            {
                success:false,
                message:"Error checking username"
            },
            {
                status:500
            }
        )
        
    }
}
