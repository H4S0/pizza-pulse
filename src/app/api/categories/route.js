import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { Category } from "@/models/Category";
import mongoose from "mongoose";

// Helper function to connect to the database
async function connectToDatabase() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } else {
    console.log("Database already connected");
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const { name } = await req.json();
    console.log("Received name for category:", name);

    if (await isAdmin()) {
      const categoryDoc = await Category.create({ name });
      console.log("Category created:", categoryDoc);
      return new Response(JSON.stringify(categoryDoc), { status: 201 });
    } else {
      console.log("Unauthorized access attempt");
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 403,
      });
    }
  } catch (error) {
    console.error("Error in POST /api/categories:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();
    const { _id, name } = await req.json();
    console.log("Received data for updating category:", { _id, name });

    if (await isAdmin()) {
      const updateResult = await Category.updateOne({ _id }, { name });
      console.log("Category update result:", updateResult);
      return new Response(JSON.stringify(true), { status: 200 });
    } else {
      console.log("Unauthorized access attempt");
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 403,
      });
    }
  } catch (error) {
    console.error("Error in PUT /api/categories:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find();
    console.log("Fetched categories:", categories);
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/categories:", error);
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
    console.log("Received ID for deletion:", _id);

    if (await isAdmin()) {
      const deleteResult = await Category.deleteOne({ _id });
      console.log("Category delete result:", deleteResult);
      return new Response(JSON.stringify(true), { status: 200 });
    } else {
      console.log("Unauthorized access attempt");
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 403,
      });
    }
  } catch (error) {
    console.error("Error in DELETE /api/categories:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
