import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wb_user_wishlist_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Preload flagship for instant demonstration
    return [initialProducts[0]];
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('wb_user_wishlist_v2', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  const toggleWishlist = (productOrId) => {
    const id = typeof productOrId === 'string' ? productOrId : productOrId.id;
    setWishlist((prev) => {
      const exists = prev.some((p) => (typeof p === 'string' ? p === id : p.id === id));
      if (exists) {
        return prev.filter((p) => (typeof p === 'string' ? p !== id : p.id !== id));
      } else {
        const fullProduct = typeof productOrId === 'object' ? productOrId : initialProducts.find((p) => p.id === id) || { id };
        return [...prev, fullProduct];
      }
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((p) => (typeof p === 'string' ? p !== id : p.id !== id)));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const isInWishlist = (productOrId) => {
    const id = typeof productOrId === 'string' ? productOrId : productOrId.id;
    return wishlist.some((p) => (typeof p === 'string' ? p === id : p.id === id));
  };

  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        isWishlistOpen,
        openWishlist,
        closeWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
