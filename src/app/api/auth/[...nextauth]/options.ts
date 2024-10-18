import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Simple Signup",
            credentials: {
                email: { label: "Email Address", type: "email", placeholder: "Enter Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = { id: "1", name: "J Smith", email: credentials?.email }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
                }
            }
        })
    ]
}