import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Leaf, 
  Sparkles, 
  Flame,
  Award,
  ChevronRight,
  Info
} from 'lucide-react';

export const ProductQuickView = ({ product, onClose }) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('nutrition');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const selectedVariant = product.variants ? product.variants[selectedVariantIndex] : {
    size: product.packSize,
    price: product.price,
    mrp: product.mrp,
    discount: `${product.discountPercent}% OFF`,
    savings: `₹${(product.mrp || product.price) - product.price}`
  };

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-warm-300 overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-warm-100 hover:bg-warm-200 text-gray-700 flex items-center justify-center transition shadow-sm"
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto p-5 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-5 space-y-4">
            
            {/* Active Image Display */}
            <div className="w-full h-72 sm:h-80 bg-[#FAF8F5] rounded-2xl border border-warm-200 p-4 flex items-center justify-center relative overflow-hidden shadow-inner">
              {product.badge && (
                <span className="absolute top-3 left-3 bg-brand-900 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-xs">
                  {product.badge}
                </span>
              )}
              <img
                src={images[activeImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl border p-1 bg-[#FAF8F5] transition ${
                      activeImageIndex === idx ? 'border-brand-900 ring-2 ring-brand-900/20' : 'border-warm-200 hover:border-brand-400'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Purity & Compliance Badge */}
            <div className="bg-brand-50 rounded-xl p-3 border border-brand-200 text-xs text-brand-950 space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-brand-900">
                <ShieldCheck size={16} className="text-brand-700" />
                <span>FSSAI License: {product.fssai || "20126211000610"}</span>
              </div>
              <p className="text-[11px] text-brand-800">
                100% Genuine Direct Product • Manufactured & Marketed by WellBeing By Nature Co.
              </p>
            </div>
          </div>

          {/* Right Column: Information, Pricing, Nutrition Table & Purchase */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            
            <div className="space-y-3">
              {/* Category, Rating & Wishlist */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  {product.category}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <Star size={13} className="fill-amber-500 text-amber-500" />
                    <span className="font-bold text-xs text-gray-900">{product.rating}</span>
                    <span className="text-[10px] text-gray-500">({product.reviewCount} reviews)</span>
                  </div>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-1.5 rounded-full hover:bg-warm-100 text-gray-700 transition"
                  >
                    <Heart size={18} className={isWishlisted ? "fill-coral-500 text-coral-500" : ""} />
                  </button>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-950 leading-tight">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                {product.subtitle}
              </p>

              {/* Price & Savings */}
              <div className="flex items-baseline space-x-3 pt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-950">
                  ₹{selectedVariant.price}
                </span>
                {selectedVariant.mrp && selectedVariant.mrp > selectedVariant.price && (
                  <>
                    <span className="text-sm sm:text-base text-gray-400 line-through">
                      ₹{selectedVariant.mrp}
                    </span>
                    <span className="bg-coral-100 text-coral-700 text-xs font-extrabold px-2.5 py-0.5 rounded-md">
                      {selectedVariant.discount || 'Special Price'}
                    </span>
                  </>
                )}
              </div>

              {/* Pack Selector */}
              {product.variants && product.variants.length > 1 && (
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-bold text-gray-800 block">Select Package Size:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {product.variants.map((v, idx) => {
                      const isSelected = selectedVariantIndex === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedVariantIndex(idx)}
                          className={`p-2.5 rounded-xl text-center border transition-all flex flex-col items-center justify-center ${
                            isSelected
                              ? 'bg-brand-900 text-white border-brand-900 shadow-sm'
                              : 'bg-warm-50 text-gray-800 border-warm-200 hover:bg-warm-100'
                          }`}
                        >
                          <span className="font-bold text-xs truncate max-w-full">{v.size}</span>
                          <span className="text-xs font-extrabold mt-0.5">₹{v.price}</span>
                          {v.discount && (
                            <span className={`text-[9px] font-bold uppercase ${isSelected ? 'text-gold-300' : 'text-coral-600'}`}>
                              {v.discount}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Informative Tabs: Nutrition Facts, How To Use, Ingredients */}
              <div className="pt-3 border-t border-warm-200">
                <div className="flex border-b border-warm-200 space-x-4 mb-3">
                  <button
                    onClick={() => setActiveTab('nutrition')}
                    className={`pb-2 text-xs font-bold transition border-b-2 ${
                      activeTab === 'nutrition'
                        ? 'border-brand-900 text-brand-900'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Nutritional Information
                  </button>
                  <button
                    onClick={() => setActiveTab('usage')}
                    className={`pb-2 text-xs font-bold transition border-b-2 ${
                      activeTab === 'usage'
                        ? 'border-brand-900 text-brand-900'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    How To Use / Cook
                  </button>
                  <button
                    onClick={() => setActiveTab('benefits')}
                    className={`pb-2 text-xs font-bold transition border-b-2 ${
                      activeTab === 'benefits'
                        ? 'border-brand-900 text-brand-900'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Key Benefits & Origin
                  </button>
                </div>

                {/* Tab 1: Authentic Nutrition Table */}
                {activeTab === 'nutrition' && (
                  <div className="space-y-2 text-xs animate-in fade-in duration-150">
                    {product.nutrition ? (
                      <div className="border border-warm-200 rounded-xl overflow-hidden shadow-xs">
                        <div className="bg-warm-100 p-2 font-bold text-gray-800 text-[11px] flex justify-between">
                          <span>Serving Size: {product.nutrition.servingSize}</span>
                          <span>*RDA on 2000 kcal diet</span>
                        </div>
                        <table className="w-full text-left">
                          <thead className="bg-warm-50 text-[10px] text-gray-500 uppercase border-b border-warm-200">
                            <tr>
                              <th className="p-2">Nutrient</th>
                              <th className="p-2">Per 100g</th>
                              <th className="p-2">Per Serving</th>
                              <th className="p-2">% RDA</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-warm-100 text-[11px]">
                            {product.nutrition.items.map((row, idx) => (
                              <tr key={idx} className="hover:bg-warm-50">
                                <td className="p-2 font-semibold text-gray-800">{row.label}</td>
                                <td className="p-2 text-gray-600">{row.per100g}</td>
                                <td className="p-2 text-brand-900 font-bold">{row.perServing}</td>
                                <td className="p-2 text-gray-500">{row.rda}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-600 text-xs">
                        {product.description}
                      </p>
                    )}
                    <p className="text-[10px] text-gray-500 italic mt-1">
                      Ingredients: {product.ingredients}
                    </p>
                  </div>
                )}

                {/* Tab 2: How to Use */}
                {activeTab === 'usage' && (
                  <div className="space-y-2 text-xs animate-in fade-in duration-150 bg-warm-50 p-3.5 rounded-xl border border-warm-200">
                    <p className="font-bold text-gray-900 flex items-center space-x-1.5">
                      <Sparkles size={14} className="text-gold-600" />
                      <span>Directions:</span>
                    </p>
                    <p className="text-gray-700 leading-relaxed">{product.howToUse}</p>
                    {product.storage && (
                      <p className="text-[11px] text-gray-500 pt-1 border-t border-warm-200">
                        <span className="font-semibold">Storage:</span> {product.storage}
                      </p>
                    )}
                  </div>
                )}

                {/* Tab 3: Benefits */}
                {activeTab === 'benefits' && (
                  <div className="space-y-2 text-xs animate-in fade-in duration-150">
                    <ul className="space-y-1.5">
                      {product.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-gray-700">
                          <Check size={14} className="text-brand-700 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </div>

            {/* Quantity Selector & Add To Cart Button */}
            <div className="pt-4 border-t border-warm-200 flex items-center space-x-3">
              <div className="flex items-center border border-warm-300 rounded-xl bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-warm-100 transition font-bold"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-bold text-gray-900 min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-warm-100 transition font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-coral-500 hover:bg-coral-600 text-white hover:shadow-coral-500/30'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check size={18} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Cart • ₹{selectedVariant.price * quantity}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
