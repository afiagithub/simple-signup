import { connectDb } from "@/database/connectDB";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        await connectDb();
        const newUser = await request.json();
        console.log(newUser);

        await User.create(newUser)
        return NextResponse.json({ msg: "User added successfully"}, { status: 200 })        
    } catch (error) {
        console.log(error);        
    }
}