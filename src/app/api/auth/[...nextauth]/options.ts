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
                    return user;
                } catch (error: unknown) {
                    throw new Error(error as string);
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            await connectDb();
            console.log("From line 51", user);
            console.log("From line 52", account);
            console.log("From line 53", profile);
            const existingUser = await User.findOne({ email: user?.email })
            if (!existingUser) {
                const newUser = new User({
                    name: user?.name,
                    email: user?.email
                })
                await newUser.save();
            }
            return true;
        },
        async jwt({ user, token }) {
            if (user) {
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            console.log("from line 81", session);
            console.log("from line 82", token);
            if (token && session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}