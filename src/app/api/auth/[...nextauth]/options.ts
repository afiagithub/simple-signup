import { connectDb } from "@/database/connectDB";
import User from "@/models/UserModel";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

interface Credentials {
    email: string;
    password: string;
}

interface User {
    id: string;
    name: string;
    email: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Simple Signup",
            credentials: {
                email: { label: "Email Address", type: "email", placeholder: "Enter Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: Credentials | undefined): Promise<User | null> {
                if (!credentials) {
                    throw new Error("Credentials not found!!!");
                }
                await connectDb();
                try {
                    const email = credentials.email;
                    const password = credentials.password;
                    const user = await User.findOne({ email });
                    if (!user) {
                        throw new Error("User not found");
                    }
                    const checkPassword = await bcrypt.compare(password, user.password);
                    if (!checkPassword) {
                        throw new Error("Incorrect password");
                    }
                    console.log(user);                    
                    return user;
                } catch (error: unknown) {
                    console.log(error);
                    throw new Error(error as string);
                }
            }
        })
    ]
}