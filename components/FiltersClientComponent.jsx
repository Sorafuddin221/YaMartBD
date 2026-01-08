'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import '@/componentStyles/Filters.css';

function FiltersClientComponent({ categories, recentProducts }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [limit, setLimit] = useState(searchParams.get('limit') || '6');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '');
  const [expandedCategory, setExpandedCategory] = useState('');


  const buildUrl = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Apply new filter values or delete them if empty
    if (newParams.keyword !== undefined) newParams.keyword ? params.set('keyword', newParams.keyword) : params.delete('keyword');
    if (newParams.sort !== undefined) newParams.sort ? params.set('sort', newParams.sort) : params.delete('sort');
    if (newParams.limit !== undefined) newParams.limit ? params.set('limit', newParams.limit) : params.delete('limit');
    if (newParams.category !== undefined) newParams.category ? params.set('category', newParams.category) : params.delete('category');
    if (newParams.subcategory !== undefined) newParams.subcategory ? params.set('subcategory', newParams.subcategory) : params.delete('subcategory');

    // Reset page to 1 when any filter changes, unless it's just a page change
    // This logic is a bit tricky, if we are only changing page, we should keep other filters.
    // If any filter other than page changes, reset page to 1.
    const isOnlyPageChange = Object.keys(newParams).every(key => key === 'page' || params.get(key) === newParams[key]);
    if (!isOnlyPageChange) {
      params.delete('page'); // Reset page to 1 if other filters change
    }
    
    return `/products?${params.toString()}`;
  };

  const handleFilterChange = () => {
    router.push(buildUrl({ keyword, sort, limit }));
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName); // Always set the clicked category as active
    setExpandedCategory(categoryName); // Expand the clicked category's subcategories

    const newSearchParams = { category: categoryName };
    if (!categoryName) { // If 'All' category is clicked, remove subcategory filter
      newSearchParams.subcategory = '';
    } else if (searchParams.get('category') === categoryName && searchParams.get('subcategory')) {
        // If clicking on an already active category that has an active subcategory, clear subcategory
        newSearchParams.subcategory = '';
    } else {
        newSearchParams.subcategory = searchParams.get('subcategory') || ''; // Preserve subcategory if category is not changing
    }
    router.push(buildUrl(newSearchParams));
  };
  
  const handleSubCategoryClick = (categoryName, subCategoryName) => {
    router.push(buildUrl({ category: categoryName, subcategory: subCategoryName }));
  }


  const handleToggleExpand = (categoryName) => {
    // This function is no longer needed for expansion as handleCategoryClick will handle it.
    // It's kept for potential future use or if the user wants separate toggle later.
    setExpandedCategory(expandedCategory === categoryName ? '' : categoryName);
  };

  // console.log('Current expandedCategory outside render:', expandedCategory);

  return (
    <div className="filter-section">
      <div className="filter-group">
        <h4 className="filter-subheading">Search</h4>
        <input
            type="text"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleFilterChange()}
        />
      </div>
      
      <button onClick={handleFilterChange} className="apply-filters-btn">Apply Filters</button>

      <div className="filter-group">
        <h4 className="filter-subheading">Sort By</h4>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Default</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="-name">Name: Z to A</option>
        </select>
      </div>

      <div className="filter-group">
        <h4 className="filter-subheading">Show</h4>
        <select value={limit} onChange={(e) => setLimit(e.target.value)}>
            <option value="6">6 per page</option>
            <option value="12">12 per page</option>
            <option value="24">24 per page</option>
        </select>
      </div>

      <h3 className="filter-heading">Categories</h3>
      <ul>
        <li
          className={`filter-section-category-item ${!searchParams.get('category') ? 'active' : ''}`}
          onClick={() => {
            handleCategoryClick('');
            setExpandedCategory(''); // Collapse all when 'All' is clicked
          }}
        >
          <span className="category-name-clickable">All</span>
        </li>
        {categories.filter(cat => !cat.parent).map((cat) => {
          // console.log(`Rendering category: ${cat.name}, expandedCategory: ${expandedCategory}, Condition: ${expandedCategory === cat.name}`);
          return (
          <React.Fragment key={cat._id}>
            <li
              className={`filter-section-category-item ${searchParams.get('category') === cat.name && !searchParams.get('subcategory') ? 'active' : ''}`}
            >
              <div className="category-header" onClick={() => handleCategoryClick(cat.name)}> {/* Entire header is now clickable for filtering and expanding */}
                <span
                  className="category-name-clickable"
                >
                  {cat.name}
                </span>
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <span
                    className={`expand-toggle-icon ${expandedCategory === cat.name ? 'expanded' : ''}`}
                    // onClick handler removed as main click now expands
                  >
                    &#9658; {/* Right arrow HTML entity */}
                  </span>
                )}
              </div>
            </li>
            {expandedCategory === cat.name && cat.subcategories && cat.subcategories.length > 0 && (
              <>
                {/* {console.log(`Subcategory list for ${cat.name} is rendered: ${expandedCategory === cat.name}`)} */}
                <ul className={`subcategory-list ${expandedCategory === cat.name ? 'expanded' : ''}`}>
                  {cat.subcategories.map((subcat) => (
                    <li
                      key={subcat._id}
                      onClick={() => handleSubCategoryClick(cat.name, subcat.name)}
                      className={searchParams.get('subcategory') === subcat.name ? 'active' : ''}
                    >
                      {subcat.name}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </React.Fragment>
        )})}
      </ul>

      {recentProducts && recentProducts.length > 0 && (
        <div className="recent-products-sidebar">
          <h3 className="filter-heading">Recent Products</h3>
          <div className="recent-products-list">
            {recentProducts.map((product) => (
              <Link href={`/product/${product._id}`} key={product._id} className="recent-product-card">
                <div className="recent-product-image">
                  <Image
                    src={product.image[0]?.url || '/images/blog-placeholder.png'}
                    alt={product.name}
                    width={60}
                    height={60}
                  />
                </div>
                <div className="recent-product-info">
                  <p className="recent-product-name">{product.name}</p>
                  <p className="recent-product-price">TK {product.offeredPrice || product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
}

export default FiltersClientComponent;
