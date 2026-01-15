import { NextResponse } from 'next/server';
import connectMongoDatabase from '@/lib/db';
import Product from '@/models/productModel';
import { verifyUserAuth, roleBasedAccess } from '@/middleware/auth';
import mongoose from 'mongoose';

export async function GET(req) {
    await connectMongoDatabase();

    try {
        const authResult = await verifyUserAuth(req);
        if (!authResult.isAuthenticated) {
            return NextResponse.json({ message: authResult.error.message }, { status: authResult.statusCode });
        }
        const user = authResult.user;

        const roleAccessResult = roleBasedAccess(['admin'])(req, user);
        if (!roleAccessResult.hasAccess) {
            return NextResponse.json({ message: roleAccessResult.error.message }, { status: roleAccessResult.statusCode });
        }

        const { searchParams } = new URL(req.url);
        const keyword = searchParams.get('keyword');

        let products;
        if (keyword) {
            if (mongoose.Types.ObjectId.isValid(keyword)) {
                products = await Product.find({ _id: keyword }).populate('category');
            } else {
                products = await Product.find({
                    name: {
                        $regex: keyword,
                        $options: 'i',
                    },
                }).populate('category');
            }
        } else {
            products = await Product.find().populate('category');
        }

        return NextResponse.json({
            success: true,
            products: JSON.parse(JSON.stringify(products)),
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
    }
}