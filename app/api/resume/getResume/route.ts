import dbConnect from "@/app/lib/dbConnect";
import ResumeModel from "@/app/model/Resume";
import UserModel from "@/app/model/User";
import { NextResponse, NextRequest } from "next/server";
import { parse, URLSearchParams } from "url";

//get 1 resume with all details
export async function GET(req) {
  try {
    // const data = await req.json();
    await dbConnect();
    const { query } = parse(req.url, true);
    const { resumeId } = query;
    const user = await UserModel.findOne({ resumes: resumeId });

    if (!user) {
      return NextResponse.json(
        { error: "Account with this resume id doesn't exist." },
        { status: 401 }
      );
    }
    const resume = await ResumeModel.findById(resumeId);

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({ resume, userId: user._id });
  } catch (error) {
    console.error("error: ", error);
    return NextResponse.json("Failed to get resume");
  }
}
