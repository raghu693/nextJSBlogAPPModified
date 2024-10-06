import { initDatabase } from "@/db/init";
import { User } from "@/db/models";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

await initDatabase();

export async function POST(req) {
  let data = await req.json();
  if (!data.username || !data.password) {
    return NextResponse.json({
      message: "Username and password are required",
      data: null,
      success: false,
    }, { status: 400 });
  } else if(await User.findOne({username: data.username})){
    return NextResponse.json({
      message: "Username already exists",
      data: null,
      success: false,
    }, { status: 400 });
  } else{
    let user = new User({
      username: data.username,
      password: await bcrypt.hash(data.password, 10),
    });
    user.save();
    return NextResponse.json({
      message: "User created successfully",
      data: user,
      success: true,
    }, { status: 200 });
  }
}
