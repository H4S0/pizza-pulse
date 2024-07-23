import { isAdmin } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";
import { ReturnDocument } from "mongodb";
import mongoose from "mongoose";

async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}

export default route;
