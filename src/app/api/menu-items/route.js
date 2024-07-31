import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";

async function connectMongo() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL);
  }
}

export async function POST(req) {
  try {
    await connectMongo();
    const data = await req.json();
    if (await isAdmin()) {
      const menuItemDoc = await MenuItem.create(data);
      console.log("Menu item created:", menuItemDoc); // Debugging log
      return new Response(JSON.stringify(menuItemDoc), { status: 201 });
    } else {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 403,
      });
    }
  } catch (error) {
    console.error("POST /api/menu-items error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  try {
    await connectMongo();
    const { _id, ...data } = await req.json();
    if (await isAdmin()) {
      const result = await MenuItem.findByIdAndUpdate(_id, data);
      console.log("Menu item updated:", result); // Debugging log
      return new Response(JSON.stringify(result), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 403,
      });
    }
  } catch (error) {
    console.error("PUT /api/menu-items error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectMongo();
    const menuItems = await MenuItem.find();
    console.log("Menu items fetched:", menuItems); // Debugging log
    return new Response(JSON.stringify(menuItems), { status: 200 });
  } catch (error) {
    console.error("GET /api/menu-items error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    await connectMongo();
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");
    if (await isAdmin()) {
      const result = await MenuItem.deleteOne({ _id });
      console.log("Menu item deleted:", result); // Debugging log
      return new Response(JSON.stringify(result), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 403,
      });
    }
  } catch (error) {
    console.error("DELETE /api/menu-items error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
