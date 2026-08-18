import React, { createContext, useContext, useState, useEffect } from 'react';

const OfferContext = createContext(null);

const OFFER_STORAGE_KEY = 'wbn_offers_settings_v1';
const OWNER_AUTH_KEY = 'wbn_owner_auth_v1';

const defaultOffersState = {
  announcements: [
    "FREE SHIPPING ON ALL ORDERS ABOVE ₹999",
    "100% NATURAL • NO ARTIFICIAL ADDITIVES • ETHICALLY SOURCED",
    "USE CODE 'NATURE10' FOR EXTRA 10% OFF ON FIRST PURCHASE",
    "NURTURE • BALANCE • THRIVE — AYURVEDIC CLINICALLY TESTED BOTANICALS"
  ],
  announcementSpeed: 4000,
  freeShippingThreshold: 999,
  promoBanner: {
    enabled: true,
    tag: "FESTIVE WELLNESS FEST",
    title: "Flat 15% OFF On 28-Day Seed Cycling & Morning Shots",
    code: "WELLNESS15",
    discountPercent: 15,
    expiresInDays: 4
  },
  activeCoupons: [
    { code: "NATURE10", discountPercent: 10, minOrder: 0, description: "Flat 10% off for new wellness enthusiasts" },
    { code: "WELLNESS15", discountPercent: 15, minOrder: 899, description: "15% off on orders above ₹899" },
    { code: "FREESHIP", discountPercent: 0, isFreeShip: true, minOrder: 0, description: "Instant free express delivery" },
    { code: "HEALTH20", discountPercent: 20, minOrder: 1999, description: "20% off on bulk family immunity packs" }
  ]
};

export function OfferProvider({ children }) {
  const [offers, setOffers] = useState(() => {
    try {
      const saved = localStorage.getItem(OFFER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultOffersState;
  });

  const [ownerAuth, setOwnerAuth] = useState(() => {
    try {
      const saved = localStorage.getItem(OWNER_AUTH_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      isAuthenticated: false,
      ownerPhone: "9876543210",
      ownerName: "WellBeing Owner",
      lastLogin: null
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(OFFER_STORAGE_KEY, JSON.stringify(offers));
    } catch (e) {}
  }, [offers]);

  useEffect(() => {
    try {
      localStorage.setItem(OWNER_AUTH_KEY, JSON.stringify(ownerAuth));
    } catch (e) {}
  }, [ownerAuth]);

  const updateAnnouncements = (newAnnouncements) => {
    setOffers((prev) => ({ ...prev, announcements: newAnnouncements }));
  };

  const updatePromoBanner = (newBanner) => {
    setOffers((prev) => ({ ...prev, promoBanner: { ...prev.promoBanner, ...newBanner } }));
  };

  const addCoupon = (coupon) => {
    setOffers((prev) => ({
      ...prev,
      activeCoupons: [coupon, ...prev.activeCoupons.filter((c) => c.code !== coupon.code)]
    }));
  };

  const deleteCoupon = (code) => {
    setOffers((prev) => ({
      ...prev,
      activeCoupons: prev.activeCoupons.filter((c) => c.code !== code)
    }));
  };

  const updateFreeShippingThreshold = (threshold) => {
    setOffers((prev) => ({ ...prev, freeShippingThreshold: Number(threshold) || 999 }));
  };

  const loginOwner = (phone) => {
    setOwnerAuth({
      isAuthenticated: true,
      ownerPhone: phone,
      ownerName: "Verified Store Owner",
      lastLogin: new Date().toISOString()
    });
  };

  const logoutOwner = () => {
    setOwnerAuth({
      isAuthenticated: false,
      ownerPhone: ownerAuth.ownerPhone,
      ownerName: "WellBeing Owner",
      lastLogin: null
    });
  };

  const resetOffersToDefault = () => {
    setOffers(defaultOffersState);
  };

  return (
    <OfferContext.Provider
      value={{
        offers,
        ownerAuth,
        updateAnnouncements,
        updatePromoBanner,
        addCoupon,
        deleteCoupon,
        updateFreeShippingThreshold,
        loginOwner,
        logoutOwner,
        resetOffersToDefault
      }}
    >
      {children}
    </OfferContext.Provider>
  );
}

export function useOffers() {
  const context = useContext(OfferContext);
  if (!context) {
    throw new Error('useOffers must be used within an OfferProvider');
  }
  return context;
}
