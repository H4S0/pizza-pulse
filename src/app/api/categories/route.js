// pages/api/categories.js

import mongoose from "mongoose";
import { Category } from "@/models/Category";
import { isAdmin } from "@/app/api/auth/[...nextauth]/route";

async function connectToDatabase() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();
    const categories = await Category.find();
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const { name } = await req.json();

    if (await isAdmin()) {
      const categoryDoc = await Category.create({ name });
      return new Response(JSON.stringify(categoryDoc), { status: 201 });
    } else {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 403,
      });
    }
  } catch (error) {
    console.error("Error creating category:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();
    const { _id, name } = await req.json();

    if (await isAdmin()) {
      const updateResult = await Category.updateOne({ _id }, { name });
      return new Response(JSON.stringify(updateResult), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 403,
      });
    }
  } catch (error) {
    console.error("Error updating category:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    if (await isAdmin()) {
      const deleteResult = await Category.deleteOne({ _id });
      return new Response(JSON.stringify(deleteResult), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 403,
      });
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
