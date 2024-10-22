import { connectDb } from "@/database/connectDB";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export const POST = async (request: NextRequest) => {
    try {
        await connectDb();
        const {name, email, password } = await request.json();
        // console.log(newUser.email);

        const userExists = await User.findOne({ email })
        if (userExists) {
            return NextResponse.json({
                message: "User already exists",
                status: 400,
            });
        }
        const hashedPass = await bcrypt.hash(password, 10)
        const newUser = {
            name,
            email,
            password: hashedPass
        }
        await User.create(newUser)
        return NextResponse.json({ msg: "User added successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error,
        });
    }
}