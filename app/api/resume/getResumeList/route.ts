import dbConnect from "@/app/lib/dbConnect";
import ResumeModel from "@/app/model/Resume";
import UserModel from "@/app/model/User";
import { NextResponse, NextRequest } from "next/server";
import { parse, URLSearchParams } from "url";

//get a user's resumes without resume content
export async function GET(req) {
  try {
    // const data = await req.json();
    await dbConnect();
    const { query } = parse(req.url, true);
    const { email } = query;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Account with this email doesn't exist." },
        { status: 401 }
      );
    }
    const resumesWithoutContent = await ResumeModel.find(
      { _id: { $in: user.resumes } },
      "_id resumeFileName updatedAt"
    );
    return NextResponse.json({ resumesWithoutContent });
  } catch (error) {
    console.error("error: ", error);
    return NextResponse.json("Failed to get resumeList");
  }
}
