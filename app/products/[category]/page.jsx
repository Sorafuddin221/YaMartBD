import React from 'react';

export const dynamic = 'force-dynamic';
import PageTitle from '@/components/PageTitle';
import '@/pageStyles/Products.css';
import Category from '@/models/categoryModel';
import connectMongoDatabase from '@/lib/db';
import ProductModel from '@/models/productModel';
import APIFunctionality from '@/utils/apiFunctionality';
import ProductsClientComponent from '../ProductsClientComponent';
import Filters from '@/components/Filters';

async function getProducts(resolvedSearchParams) {
    await connectMongoDatabase();

    // Convert resolvedSearchParams to a plain object
    const queryObj = {};
    for (const [key, value] of Object.entries(resolvedSearchParams)) {
        queryObj[key] = value;
    }

    const limit = Number(queryObj.limit) || 6;
    const page = Number(queryObj.page) || 1;

    const apiFeatures = new APIFunctionality(ProductModel.find(), queryObj)
        .search();

    await apiFeatures.filter();

    apiFeatures.sort();

    const filteredQuery = apiFeatures.query.clone();
    const productCount = await filteredQuery.countDocuments();

    const totalPages = Math.ceil(productCount / limit);

    apiFeatures.pagination();
    const products = await apiFeatures.query.populate('category');

    return {
        products: JSON.parse(JSON.stringify(products)),
        productCount,
        resultsPerPage: limit,
        totalPages,
        currentPage: page,
    };
}

async function getCategories() {
    await connectMongoDatabase();
    const categories = await Category.find({ parent: null }).populate('subcategories');
    return JSON.parse(JSON.stringify(categories));
}

async function getRecentProducts() {
    await connectMongoDatabase();
    const recentProducts = await ProductModel.find({})
        .sort({ createdAt: -1 })
        .limit(5);
    return JSON.parse(JSON.stringify(recentProducts));
}

export default async function CategoryProductsPage({ params, searchParams }) {
    let resolvedParams;
    if (params && typeof params.then === 'function') {
        resolvedParams = await params;
    } else {
        resolvedParams = params;
    }

    let resolvedSearchParams;
    if (searchParams && typeof searchParams.then === 'function') {
        resolvedSearchParams = await searchParams;
    } else {
        resolvedSearchParams = searchParams;
    }

    const categoryName = decodeURIComponent(resolvedParams.category);
    // Pass the entire resolvedSearchParams object to getProducts
    const { products, productCount, totalPages, currentPage, resultsPerPage } = await getProducts(resolvedSearchParams);
    const allCategories = await getCategories();
    const recentProducts = await getRecentProducts();

    return (
        <>
            <PageTitle title={`Products in ${categoryName}`} />
            <div className='products-layout'>
                <Filters categories={allCategories} recentProducts={recentProducts} />
                <ProductsClientComponent
                    products={products}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    keyword={resolvedSearchParams.keyword}
                    categories={allCategories}
                    category={categoryName}
                    showSubCategoryCards={true}
                    resultsPerPage={resultsPerPage}
                />
            </div>
        </>
    );
}
