import { User } from "./../../../models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req) {
  const body = await req.json();

  await mongoose.connect(process.env.MONGO_URL);

  const { email, password, username } = body;

  if (!password || password.length < 5) {
    return new Response("Password must be at least 5 characters", {
      status: 400,
    });
  }

  if (!email || !username) {
    return new Response("Email and username are required", { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response("User already exists", { status: 400 });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    email,
    password: hashedPassword,
    username,
  });

  const createdUser = await newUser.save();

  return new Response(JSON.stringify(createdUser), { status: 201 });
}
