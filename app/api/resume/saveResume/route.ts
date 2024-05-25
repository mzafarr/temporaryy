import dbConnect from "@/app/lib/dbConnect";
import ResumeModel from "@/app/model/Resume";
import UserModel from "@/app/model/User";
import { NextResponse, NextRequest } from "next/server";

//save resume
export async function POST(req) {
  try {
    const data = await req.json();
    console.log("data", data);
    await dbConnect();
    const { email, resume, resumeFileName } = data;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Account with this email doesn't exist." },
        { status: 401 }
      );
    }

    const dbResume = await ResumeModel.create({
      resumeFileName,
      updatedAt: new Date(),
      ...resume,
    });
    // console.log("dbResume", dbResume);
    user.resumes.push(dbResume.id);
    await user.save();

    return NextResponse.json({ message: "Resume saved successfully" });
  } catch (error) {
    console.error("error: ", error);
    return NextResponse.json("Failed to save resume");
  }
}
