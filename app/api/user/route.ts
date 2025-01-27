import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

const FormSchema = z.object({
  name: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
  // company: z.string().min(1, "Company is required").max(100),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const { name, email, password } = FormSchema.parse(body);

    console.log(name, email, password);

    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });

    console.log("existing user by email ", existingUserByEmail);

    if (existingUserByEmail) {
      return NextResponse.json({
        user: null,
        message: "Email already exists",
        status: 409,
      });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    console.log("new user ", newUser);
    const { password: newPassword, ...rest } = newUser;

    return NextResponse.json({
      user: rest,
      message: "User created successfully",
      status: 201,
    });
  } catch (e) {
    // return NextResponse.error(e);
    return NextResponse.json({ error: e, status: 500 });
  }
}
