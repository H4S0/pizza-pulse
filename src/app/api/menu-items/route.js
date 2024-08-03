import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const {
      name,
      description,
      basePrice,
      category,
      sizes,
      extraIngredientPrices,
    } = await req.json();

    if (await isAdmin()) {
      const menuItemDoc = await MenuItem.create({
        name,
        description,
        basePrice,
        category,
        sizes,
        extraIngredientPrices,
      });
      return new Response(JSON.stringify(menuItemDoc), { status: 201 });
    } else {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
  } catch (error) {
    console.error("POST /api/menu-items error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const {
      _id,
      name,
      description,
      basePrice,
      category,
      sizes,
      extraIngredientPrices,
    } = await req.json();

    if (await isAdmin()) {
      await MenuItem.updateOne(
        { _id },
        { name, description, basePrice, category, sizes, extraIngredientPrices }
      );
      return new Response(JSON.stringify(true), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
  } catch (error) {
    console.error("PUT /api/menu-items error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const menuItems = await MenuItem.find();
    return new Response(JSON.stringify(menuItems), { status: 200 });
  } catch (error) {
    console.error("GET /api/menu-items error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    if (await isAdmin()) {
      await MenuItem.deleteOne({ _id });
      return new Response(JSON.stringify(true), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
  } catch (error) {
    console.error("DELETE /api/menu-items error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
