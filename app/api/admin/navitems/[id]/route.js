import { NextResponse } from "next/server";
import connectMongoDatabase from "@/lib/db";
import NavItem from "@/models/navItemModel";
import handleAsyncError from "@/middleware/handleAsyncError";

// Get a single nav item
export const GET = handleAsyncError(async (req, { params }) => {
    await connectMongoDatabase();
    const navItem = await NavItem.findById(params.id);
    if (!navItem) {
        return NextResponse.json({ message: "Nav item not found" }, { status: 404 });
    }
    return NextResponse.json(navItem);
});

// Update a nav item
export const PUT = handleAsyncError(async (req, { params }) => {
    await connectMongoDatabase();
    const body = await req.json();
    const updatedNavItem = await NavItem.findByIdAndUpdate(params.id, body, {
        new: true,
        runValidators: true,
    });
    if (!updatedNavItem) {
        return NextResponse.json({ message: "Nav item not found" }, { status: 404 });
    }
    return NextResponse.json(updatedNavItem);
});

// Delete a nav item
export const DELETE = handleAsyncError(async (req, { params }) => {
    await connectMongoDatabase();
    const navItem = await NavItem.findById(params.id);
    if (!navItem) {
        return NextResponse.json({ message: "Nav item not found" }, { status: 404 });
    }
    await NavItem.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Nav item deleted successfully" });
});
