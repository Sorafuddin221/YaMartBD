'use client';
import React, { useState } from 'react'
import Link from 'next/link'
import '../componentStyles/Product.css'
import Rating from './Rating';


import AddToCart from './AddToCart';


function Product({product, hideAddToCartButton = false}) {
  if (!product) {
    return null; // or a loading skeleton
  }

  const [rating,setRating]=useState(0);
  const handleRatingChange=(newRating)=>{
    setRating(rating)
  }

  const discount = product.offeredPrice ? Math.round(((product.price - product.offeredPrice) / product.price) * 100) : null;

  const isNew = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const productDate = new Date(product.createdAt);
    return productDate > thirtyDaysAgo;
  };

  return (
    <div className="product_id_container" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Link href={`/product/${product._id}`} className="product_id">
        <div className="product-card">
            {isNew() && <div className="new-badge">New</div>}
            {discount && <div className="discount-badge">{discount}% off</div>}
            <img src={product.image && product.image.length > 0 ? product.image[0].url : '/images/blog-placeholder.png'} alt={product.name} className='product-image-card' />
            <div className="product-details">
    <h3 className="product-title">{product.name}</h3>
    <div className="product-meta">
        <span>{new Date(product.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        <span>{product.numOfReviews} {product.numOfReviews === 1 ? "Comment" : "Comments"}</span>
    </div>
    <div className="rating_container">
        <Rating
            value={product.ratings}
            onRatingChange={handleRatingChange}
            disabled={true}
        />
    </div>
    <p className="home-price">
        {product.offeredPrice ? (
            <>
                <span className="original-price">TK {product.price}</span>
                <span className="offered-price">TK {product.offeredPrice}</span>
            </>
        ) : (
            <strong>TK {product.price}</strong>
        )}
    </p>
</div>
        </div>
      </Link>
    </div>
  )
}

export default Product;