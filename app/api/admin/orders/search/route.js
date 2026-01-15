import { NextResponse } from 'next/server';
import connectMongoDatabase from '@/lib/db';
import Order from '@/models/orderModel';
import { verifyUserAuth as isAuthenticatedUser } from '@/middleware/auth';
import mongoose from 'mongoose';

export async function GET(req) {
    await connectMongoDatabase();
    const { isAuthenticated, user, error, statusCode } = await isAuthenticatedUser(req);

    if (!isAuthenticated) {
        return NextResponse.json({ message: error.message }, { status: statusCode });
    }

    if (user.role !== 'admin') {
        return NextResponse.json({ message: `Role (${user.role}) is not allowed to access this resource.` }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('keyword');

    try {
        let orders;
        if (keyword) {
            // Ensure the keyword is a valid ObjectId
            if (mongoose.Types.ObjectId.isValid(keyword)) {
                orders = await Order.find({ _id: keyword });
            } else {
                orders = [];
            }
        } else {
            orders = await Order.find();
        }

        return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
    }
}
