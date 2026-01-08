import { NextResponse } from 'next/server';
import connectMongoDatabase from '@/lib/db';
import Product from '@/models/productModel';
import { verifyUserAuth, roleBasedAccess } from '@/middleware/auth';
import HandleError from '@/utils/handleError';

export async function PUT(req) {
    await connectMongoDatabase();

    try {
        const authResult = await verifyUserAuth(req);
        if (!authResult.isAuthenticated) {
            return NextResponse.json({ message: authResult.error.message }, { status: authResult.statusCode });
        }
        const user = authResult.user;

        const accessResult = roleBasedAccess(['admin'])(req, user);
        if (!accessResult.hasAccess) {
            return NextResponse.json({ message: accessResult.error.message }, { status: accessResult.statusCode });
        }

        const { answer, productId, queryId } = await req.json();

        if (!productId || !queryId || !answer) {
            return NextResponse.json({ message: "Product ID, Query ID, and answer are required." }, { status: 400 });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return NextResponse.json({ message: "Product not found." }, { status: 404 });
        }

        const query = product.customerQueries.id(queryId);

        if (!query) {
            return NextResponse.json({ message: "Query not found." }, { status: 404 });
        }

        query.answer = answer;
        query.answeredBy = user._id;

        await product.save({ validateBeforeSave: false });

        return NextResponse.json({
            success: true,
            message: "Answer submitted successfully.",
        }, { status: 200 });

    } catch (error) {
        console.error("Answer submission error:", error);
        return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
    }
}
