import ProductModel from '@/models/productModel'; // Import the server-side model
import connectMongoDatabase from '@/lib/db'; // Import your DB connection
import ProductDetailsClientComponent from '@/components/ProductDetailsClientComponent'; // Import the client component

// This function will run on the server
export async function generateMetadata({ params }) {
  let id;
  // This is a workaround for an unusual environment where 'params' is a Promise.
  // The standard Next.js behavior is for 'params' to be a plain object.
  if (params && typeof params.then === 'function') { 
    try {
      const resolvedParams = await params;
      id = resolvedParams.id;
    } catch (err) {
      console.error("Error resolving 'params' Promise.", err);
      return {
        title: "Product not found",
        description: "The product you are looking for does not exist.",
      }
    }
  } else {
    id = params.id;
  }

  await connectMongoDatabase(); // Connect to your database

  let product = null;
  try {
    // Fetch product directly using Mongoose
    product = await ProductModel.findById(id).populate('category');
  } catch (error) {
    console.error("Error fetching product in generateMetadata:", error);
  }

  if (!product) {
    return {
      title: "Product not found",
      description: "The product you are looking for does not exist.",
    }
  }

  const keywords = [product.name, product.category?.name, ...product.name.split(' '), ...product.description.split(' ').slice(0, 10)];

  return {
    title: product.name,
    description: product.description,
    keywords: keywords,
    openGraph: {
        title: product.name,
        description: product.description,
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/product/${product._id}`,
        images: [
            {
                url: product.image[0]?.url || '/og-image.png',
                width: 1200,
                height: 630,
            },
        ],
        type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.description,
        images: [product.image[0]?.url || '/twitter-image.png'],
    },
  }
}

export default async function ProductDetailsPage({ params }) {
  
  let id;
  // This is a workaround for an unusual environment where 'params' is a Promise.
  // The standard Next.js behavior is for 'params' to be a plain object.
  if (params && typeof params.then === 'function') { 
    try {
      const resolvedParams = await params;
      id = resolvedParams.id;
    } catch (err) {
      console.error("Error resolving 'params' Promise.", err);
      return <p>Error: Could not resolve product route parameters.</p>;
    }
  } else {
    id = params.id;
  }

  // If id is still not resolved, we cannot proceed.
  if (!id) {
    console.error("Product ID could not be determined from params.");
    return <p>Error: Product ID not found in URL.</p>;
  }


  await connectMongoDatabase(); // Connect to your database

  let product = null;
  try {
    // Fetch product directly using Mongoose
    const fetchedProduct = await ProductModel.findById(id).populate('category');
    product = fetchedProduct ? JSON.parse(JSON.stringify(fetchedProduct)) : null;

    // Increment viewsCount
    if (fetchedProduct) {
        await ProductModel.findByIdAndUpdate(id, { $inc: { viewsCount: 1 } });
    }

  } catch (error) {
    console.error("Error fetching product in Server Component:", error);
    // You might want to handle this error more gracefully, e.g., show a 404 or error page
  }

  // Pass the fetched product data to the Client Component
  return (
    <ProductDetailsClientComponent initialProduct={product} productId={id} />
  );
}