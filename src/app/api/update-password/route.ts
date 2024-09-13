import dbConnect from "@/lib/dbConnect";
import Usermodel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req:Request) {
    
    await dbConnect()

    try {
        let {password} = await req.json();

        let hashedPassword = await bcrypt.hash(password,10);

        let res = await Usermodel.updateOne
        
    } catch (error) {
        
    }
}