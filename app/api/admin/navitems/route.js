import { NextResponse } from "next/server";
import connectMongoDatabase from "@/lib/db";
import NavItem from "@/models/navItemModel";
import handleAsyncError from "@/middleware/handleAsyncError";

// Get all nav items
export const GET = handleAsyncError(async () => {
  await connectMongoDatabase();
  const navItems = await NavItem.find({}).sort({ order: 1 });
  return NextResponse.json(navItems);
});

// Create a new nav item
export const POST = handleAsyncError(async (req) => {
  await connectMongoDatabase();
  const body = await req.json();
  const newNavItem = new NavItem(body);
  await newNavItem.save();
  return NextResponse.json(newNavItem, { status: 201 });
});
