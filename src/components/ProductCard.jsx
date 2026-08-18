import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Eye, 
  Check, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const selectedVariant = product.variants ? product.variants[selectedVariantIndex] : {
    size: product.packSize,
    price: product.price,
    mrp: product.mrp,
    discount: `${product.discountPercent}% OFF`,
    savings: `₹${(product.mrp || product.price) - product.price}`
  };

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, selectedVariant);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  return (
    <div 
      className="bg-white rounded-2xl border border-warm-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Floating Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.badge && (
          <span className="bg-brand-900 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow-sm flex items-center space-x-1">
            <Sparkles size={11} className="text-gold-400 mr-1" />
            <span>{product.badge}</span>
          </span>
        )}
        {product.isAuthenticFlagship && (
          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-bold uppercase px-2 py-0.5 rounded shadow-xs">
            100% Genuine Direct Brand
          </span>
        )}
      </div>

      {/* Wishlist Heart Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-gray-700 hover:text-coral-500 shadow-md flex items-center justify-center transition-all duration-200"
        aria-label="Toggle Wishlist"
      >
        <Heart size={18} className={isWishlisted ? "fill-coral-500 text-coral-500" : ""} />
      </button>

      {/* Image Showcase Container */}
      <div 
        className="relative w-full h-64 bg-[#FAF8F5] p-4 flex items-center justify-center cursor-pointer overflow-hidden border-b border-warm-100"
        onClick={() => onQuickView(product)}
      >
        <img
          src={getAssetUrl(isHovered && product.backImage ? product.backImage : product.image)}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="bg-white text-brand-900 hover:bg-brand-50 text-xs font-bold px-4 py-2.5 rounded-full shadow-lg flex items-center space-x-1.5 transition-transform transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye size={15} />
            <span>Quick View & Nutrition</span>
          </button>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <span className="font-semibold uppercase text-[10px] text-brand-700 tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center space-x-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              <Star size={12} className="fill-amber-500 text-amber-500" />
              <span className="font-bold text-gray-900 text-[11px]">{product.rating}</span>
              <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif font-bold text-base sm:text-lg text-gray-900 group-hover:text-brand-800 transition line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Subtitle / Key Benefit snippet */}
          <p className="text-xs text-gray-600 line-clamp-1 mt-1">
            {product.subtitle}
          </p>

          {/* Tag Pills */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {product.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-[10px] bg-warm-100 text-gray-700 px-2 py-0.5 rounded-md font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Multi-Pack Variant Selector (Wellbeing Nutrition style) */}
        {product.variants && product.variants.length > 1 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-gray-700 block">Select Pack:</span>
            <div className="grid grid-cols-3 gap-1.5">
              {product.variants.map((v, idx) => {
                const isSelected = selectedVariantIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVariantIndex(idx);
                    }}
                    className={`py-1.5 px-1 rounded-lg text-center transition-all text-xs flex flex-col items-center justify-center border ${
                      isSelected
                        ? 'bg-brand-900 text-white border-brand-900 shadow-xs'
                        : 'bg-warm-50 text-gray-800 border-warm-200 hover:bg-warm-100'
                    }`}
                  >
                    <span className="font-bold text-[10px] truncate max-w-full">{v.size.split('(')[0]}</span>
                    {v.discount && (
                      <span className={`text-[8px] font-extrabold uppercase mt-0.5 ${isSelected ? 'text-gold-300' : 'text-coral-600'}`}>
                        {v.discount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pricing & Add to Cart */}
        <div className="pt-2 border-t border-warm-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-lg sm:text-xl font-extrabold text-brand-950">
                ₹{selectedVariant.price}
              </span>
              {selectedVariant.mrp && selectedVariant.mrp > selectedVariant.price && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{selectedVariant.mrp}
                </span>
              )}
            </div>
            {selectedVariant.savings && (
              <span className="text-[10px] text-brand-700 font-bold">
                Save {selectedVariant.savings}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all shadow-sm ${
              addedAnimation 
                ? 'bg-emerald-600 text-white' 
                : 'bg-brand-900 hover:bg-brand-800 text-white hover:shadow-md'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check size={15} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={15} className="text-gold-400" />
                <span>Add +</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
