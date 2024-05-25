import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "../../lib/dbConnect";
import UserModel from "@/app/model/User";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, password } = body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      console.log("Email already in use");
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }
    if (name === "") {
      console.log("Name can`t  be Empty!");
      return NextResponse.json(
        { error: "Name can`t  be Empty!" },
        { status: 400 }
      );
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return NextResponse.json({
      message: "Account created successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
