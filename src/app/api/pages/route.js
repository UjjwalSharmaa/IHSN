import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Page from "@/models/Page";

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const pageName = searchParams.get("pageName");
        
        const page = await Page.findOne({ pageName });
        
        if (!page) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 });
        }
        
        return NextResponse.json(page, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        
        const page = await Page.findOneAndUpdate(
            { pageName: body.pageName },
            body,
            { upsert: true, new: true }
        );
        
        return NextResponse.json(page, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}