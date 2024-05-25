import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await UserModel.findOne({ email });

    if (!user || !(await compare(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }

    const token = sign({ userId: user.id }, jwtSecret, {
      expiresIn: "7d",
    });

    return NextResponse.json({
      data: { token },
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Error during authentication:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
