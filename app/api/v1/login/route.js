import { initDatabase } from "@/db/init";
import { User } from "@/db/models";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

await initDatabase();

export async function POST(req) {
  let data = await req.json();
  let user = await User.findOne({username: data.username});

  if(user){
    if(await bcrypt.compare(data.password, user.password)){
      return NextResponse.json({
        message: "Login successful",
        success: true,
      }, { status: 200 });
    } else{
      return NextResponse.json({
        message: "Incorrect password",
        success: false,
      }, { status: 400 });
    }
  } else{
    return NextResponse.json({
      message: "User not found",
      success: false,
    }, { status: 400 });
  }
}