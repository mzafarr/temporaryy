// Here's the API you'll use api/points:
import dbConnect from "@/app/lib/dbConnect";
import ResumeModel from "@/app/model/Resume";
import UserModel from "@/app/model/User";
import { NextResponse, NextRequest } from "next/server";
import { parse, URLSearchParams } from "url";

//get the number of remaining points (no of resumes that can be AI generated)
export async function GET(req) {
  try {
    await dbConnect();
    const { query } = parse(req.url, true);
    const { userId } = query;
    console.log("Show the id",userId)
    const user = await UserModel.findById(userId);
     console.log("Show the User",user)
    if (!user) {
      return NextResponse.json(
        { error: "Account with this resume id doesn't exist." },
        { status: 401 }
      );
    }
    return NextResponse.json({ points: user.points }, { status: 200 });
  } catch (error) {
    console.error("error: ", error);
    return NextResponse.json("Failed to get resume");
  }
}