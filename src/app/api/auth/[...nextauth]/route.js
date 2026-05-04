import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import ConnectDB from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials){
                await ConnectDB();
                const user = await User.findOne({ email: credentials.email });
                console.log("User found:", user);
                if (!user) {
                    throw new Error("No user found with the provided email.");
                }
                const isMatch = await bcrypt.compare(credentials.password, user.password);
                console.log("Password match:", isMatch);
                if (!isMatch) {
                    throw new Error("Invalid password.");
                }
                if(!user.isActive){
                    throw new Error("Your account is inactive. Please contact support.");
                }
                return{
                    id: user._id.toString(),
                    email: user.email,
                    role: user.role,
                };
            }
})
    ],
    callbacks: {
    async jwt({token, user}){
        if(user){
            token.id = user.id;
            token.role = user.role;
        }
        return token;
    },
    async session({session, token}){
            session.user.role = token.role;
            session.user.id = token.id;
            return session;
        }
    },
    pages:{
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };