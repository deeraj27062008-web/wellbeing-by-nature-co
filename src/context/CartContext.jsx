import React, { createContext, useContext, useState, useEffect } from 'react';
import { brandInfo } from '../data/brandInfo';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('wb_cart_items_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.filter(item => !item.image?.includes('unsplash.com'));
      }
      return [
        {
          id: "morning-shots-gut-drink",
          name: "Morning Shots | Gut Friendly Drink Mix",
          price: 349,
          mrp: 449,
          packSize: "10 Sachets (50g)",
          image: "/images/products/morning-shots-10sachets.jpg",
          quantity: 1
        }
      ];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('wb_cart_items_v2', JSON.stringify(items));
    } catch (e) {}
  }, [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const addToCart = (product, selectedVariant = null, qty = 1) => {
    const variant = selectedVariant || (product.variants && product.variants[0]) || {
      size: product.packSize || "Standard",
      price: product.price,
      mrp: product.mrp
    };

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.packSize === variant.size
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: variant.price,
            mrp: variant.mrp || variant.price * 1.2,
            packSize: variant.size,
            image: product.image,
            quantity: qty
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (id, packSize) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.packSize === packSize)));
  };

  const updateQuantity = (id, packSize, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.packSize === packSize) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const upperCode = code.trim().toUpperCase();
    const found = brandInfo.coupons.find((c) => c.code === upperCode);
    if (!found) {
      setCouponError('Invalid coupon code. Try NATURE15 or GUTHEALTH.');
      return false;
    }
    setAppliedCoupon(found);
    setCouponError('');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const mrpTotal = items.reduce((sum, item) => sum + (item.mrp || item.price * 1.2) * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const isFreeShippingEligible = subtotal >= brandInfo.shippingThresholdFree;
  const shippingFee = items.length === 0 ? 0 : (isFreeShippingEligible ? 0 : 50);
  const freeShippingProgress = Math.min(100, (subtotal / brandInfo.shippingThresholdFree) * 100);
  const amountToFreeShipping = Math.max(0, brandInfo.shippingThresholdFree - subtotal);

  const isFreeGiftUnlocked = subtotal >= brandInfo.giftThreshold;
  const amountToFreeGift = Math.max(0, brandInfo.giftThreshold - subtotal);
  const freeGiftProgress = Math.min(100, (subtotal / brandInfo.giftThreshold) * 100);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      discountAmount = appliedCoupon.discountAmount;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const totalSavings = (mrpTotal - subtotal) + discountAmount + (isFreeShippingEligible ? 50 : 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        subtotal,
        mrpTotal,
        totalItems,
        shippingFee,
        isFreeShippingEligible,
        freeShippingProgress,
        amountToFreeShipping,
        isFreeGiftUnlocked,
        amountToFreeGift,
        freeGiftProgress,
        discountAmount,
        grandTotal,
        totalSavings
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
