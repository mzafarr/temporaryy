import dbConnect from "@/app/lib/dbConnect";
import ResumeModel from "@/app/model/Resume";
import UserModel from "@/app/model/User";
import { NextResponse, NextRequest } from "next/server";
import { parse, URLSearchParams } from "url";

//delete resume with with it's id
export async function DELETE(req) {
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
    await ResumeModel.findByIdAndDelete(resumeId);

    await UserModel.findOneAndUpdate(
      { resumes: resumeId },
      { $pull: { resumes: resumeId } }
    );
    return NextResponse.json(
      { message: "Resume deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error: ", error);
    return NextResponse.json("Failed to get resume");
  }
}
