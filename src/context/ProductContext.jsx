import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

const ProductContext = createContext(null);

const STORAGE_KEY = 'wbn_official_products_v4';

const BANNED_PRODUCT_IDS = new Set([
  'korean-marine-collagen-peptides',
  'korean-marine-collagen',
  'organic-superfood-plant-protein',
  'organic-plant-protein',
  'melts-restful-sleep',
  'daily-prebiotic-fiber',
  'triple-magnesium-complex'
]);

export function ProductProvider({ children }) {
  const [productsList, setProductsList] = useState(() => {
    try {
      // Clear legacy storage key if present
      localStorage.removeItem('wbn_custom_products_v1');
      localStorage.removeItem('wbn_custom_products_v2');

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out any deprecated / third-party items
          const cleaned = parsed.filter(p => 
            !BANNED_PRODUCT_IDS.has(p.id) && 
            !BANNED_PRODUCT_IDS.has(p.slug) &&
            !(p.image && p.image.includes('unsplash.com'))
          );
          if (cleaned.length > 0) {
            return cleaned;
          }
        }
      }
    } catch (e) {
      console.warn('Failed to load products from storage', e);
    }
    return initialProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productsList));
    } catch (e) {
      console.error('Failed to save products to storage', e);
    }
  }, [productsList]);

  const getProductById = (id) => {
    return productsList.find((p) => p.id === id || p.slug === id);
  };

  const updateProduct = (updatedProduct) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p))
    );
  };

  const addProduct = (newProduct) => {
    const id = newProduct.id || newProduct.slug || `wbn-${Date.now()}`;
    const productWithId = {
      ...newProduct,
      id,
      slug: newProduct.slug || id,
      brand: "WellBeingByNatureCo",
      tagline: "NURTURE • BALANCE • THRIVE",
      rating: newProduct.rating || 5.0,
      reviewCount: newProduct.reviewCount || 1,
      inStock: newProduct.inStock ?? true,
      stockCount: Number(newProduct.stockCount) || 100,
      price: Number(newProduct.price) || 499,
      mrp: Number(newProduct.mrp) || 599,
      discountPercent: Math.round(((Number(newProduct.mrp || 599) - Number(newProduct.price || 499)) / Number(newProduct.mrp || 599)) * 100),
      images: newProduct.images?.length ? newProduct.images : [newProduct.image || "/images/products/rajamudi-red-rice-front.jpg"]
    };
    setProductsList((prev) => [productWithId, ...prev]);
    return productWithId;
  };

  const deleteProduct = (id) => {
    setProductsList((prev) => prev.filter((p) => p.id !== id && p.slug !== id));
  };

  const resetToDefaultProducts = () => {
    setProductsList(initialProducts);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  return (
    <ProductContext.Provider
      value={{
        products: productsList,
        getProductById,
        updateProduct,
        addProduct,
        deleteProduct,
        resetToDefaultProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
