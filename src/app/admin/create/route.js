import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
    try {
        await connectDB();
        const { email, password } = await request.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            role: "admin"
        });

        return NextResponse.json({ message: "Admin created successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error:", error.message); // add this
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}