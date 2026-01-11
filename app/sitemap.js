// app/sitemap.js
import ProductModel from '../models/productModel';
import connectMongoDatabase from '../lib/db';

const URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

export default async function sitemap() {
  await connectMongoDatabase();
  const products = await ProductModel.find({}, '_id updatedAt');

  const productUrls = products.map((product) => ({
    url: `${URL}/product/${product._id}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const staticUrls = [
    {
      url: `${URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
        url: `${URL}/products`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
    },
    {
      url: `${URL}/register`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${URL}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  return [...staticUrls, ...productUrls];
}
