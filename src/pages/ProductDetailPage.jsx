import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Leaf, 
  Sparkles, 
  Check, 
  Share2, 
  HelpCircle, 
  Bot, 
  Calendar, 
  ChevronRight, 
  Plus, 
  Minus, 
  Microscope,
  Info,
  MapPin
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { brandInfo } from '../data/brandInfo';
import { getAssetUrl } from '../utils/assetHelper';

export function ProductDetailPage({ product, onOpenChatbot, onSelectProduct, onOpenBatchVerifier }) {
  const { addToCart, openCheckout } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('benefits'); // 'benefits' | 'ingredients' | 'nutrition' | 'usage' | 'reviews'
  const [addedToast, setAddedToast] = useState(false);

  if (!product) return null;

  const inWish = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentMrp = selectedVariant ? selectedVariant.mrp : product.mrp;
  const currentDiscount = selectedVariant ? selectedVariant.discount : `${product.discountPercent}% OFF`;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    openCheckout();
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus({
        valid: true,
        message: "Standard Delivery in 2-3 Business Days • Free Express on ₹999+"
      });
    } else {
      setPincodeStatus({
        valid: false,
        message: "Please enter a valid 6-digit Indian PIN code."
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500 font-mono mb-6 overflow-x-auto whitespace-nowrap">
          <span>HOME</span>
          <ChevronRight size={12} />
          <span>{product.category.toUpperCase()}</span>
          <ChevronRight size={12} />
          <span className="text-brand-950 font-bold truncate">{product.name}</span>
        </nav>

        {/* Top Product Hero: Gallery (Left) & Purchasing Info (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-warm-200 mb-12">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative aspect-square rounded-3xl bg-warm-50/80 border border-warm-200 overflow-hidden flex items-center justify-center p-6 sm:p-8">
              
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-brand-950 text-gold-300 text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md border border-gold-400/40 flex items-center space-x-1">
                    <Sparkles size={11} className="text-gold-400" />
                    <span>{product.badge}</span>
                  </span>
                </div>
              )}

              {/* Wishlist Heart */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white shadow-md transition text-gray-700 hover:text-coral-500"
                aria-label="Save to Wishlist"
              >
                <Heart size={20} className={inWish ? "fill-coral-500 text-coral-500" : ""} />
              </button>

              <img
                src={getAssetUrl(images[activeImageIndex] || product.image)}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 select-none"
              />

              {/* Packaging authenticity note */}
              <div className="absolute bottom-3 inset-x-0 text-center">
                <span className="bg-white/90 backdrop-blur-xs text-[10px] font-mono text-brand-900 font-bold px-3 py-0.5 rounded-full border border-warm-300 shadow-xs">
                  Official Verified Packaging & Artwork
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl p-1 bg-warm-50 border-2 transition overflow-hidden shrink-0 ${
                      activeImageIndex === idx ? 'border-brand-950 shadow-md' : 'border-warm-200 hover:border-warm-400'
                    }`}
                  >
                    <img src={getAssetUrl(img)} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Chatbot Trigger Banner */}
            <div className="bg-brand-950 text-white rounded-2xl p-4 flex items-center justify-between border border-gold-500/30">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-gold-400/20 text-gold-300 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Have questions about this formulation?</p>
                  <p className="text-[10px] text-gold-300/90">Ask Dr. Botanica about dosage, benefits & timing</p>
                </div>
              </div>
              <button
                onClick={() => onOpenChatbot(product)}
                className="bg-gold-400 hover:bg-gold-300 text-brand-950 font-bold text-xs px-3.5 py-1.5 rounded-full transition shrink-0"
              >
                Ask Assistant
              </button>
            </div>
          </div>

          {/* Right Column: Purchasing Details */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1.5 text-xs text-gray-600 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold text-gray-900">{product.rating}</span>
                  <span>({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-950 leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed mb-4">
                {product.subtitle}
              </p>

              {/* Pricing Display */}
              <div className="flex items-baseline space-x-3 p-4 bg-warm-50 rounded-2xl border border-warm-200 mb-6">
                <span className="font-mono text-3xl font-extrabold text-brand-950">₹{currentPrice}</span>
                {currentMrp && (
                  <span className="font-mono text-base text-gray-600 line-through">₹{currentMrp}</span>
                )}
                {currentDiscount && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold font-mono px-2.5 py-0.5 rounded-full">
                    {currentDiscount}
                  </span>
                )}
                <span className="text-[11px] text-gray-600 ml-auto">Inclusive of all taxes</span>
              </div>

              {/* Pack Size / Variant Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 font-mono mb-2">
                    Select Pack Size / Quantity:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.variants.map((v) => (
                      <button
                        key={v.id || v.size}
                        onClick={() => setSelectedVariant(v)}
                        className={`p-3 rounded-2xl border text-left transition flex items-center justify-between ${
                          selectedVariant?.size === v.size
                            ? 'border-brand-950 bg-brand-50/50 shadow-xs ring-1 ring-brand-950'
                            : 'border-warm-200 bg-white hover:border-warm-300'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold text-gray-900">{v.size}</p>
                          <p className="text-[10px] text-emerald-700 font-semibold">{v.discount} • Save {v.savings}</p>
                        </div>
                        <span className="font-mono text-xs font-bold text-brand-950">₹{v.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Controls & Action Buttons */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-warm-300 rounded-2xl bg-warm-50 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-700 hover:bg-white transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-sm text-brand-950">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-700 hover:bg-white transition"
                      aria-label="Increase quantity"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-brand-950 hover:bg-brand-900 text-gold-300 font-bold py-3.5 px-6 rounded-2xl transition shadow-md flex items-center justify-center space-x-2 text-sm border border-gold-500/30"
                  >
                    <ShoppingBag size={18} className="text-gold-400" />
                    <span>{addedToast ? "Added to Cart ✓" : `Add to Cart • ₹${currentPrice * quantity}`}</span>
                  </button>
                </div>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-gold-400 hover:bg-gold-300 text-brand-950 font-extrabold py-3.5 px-6 rounded-2xl transition shadow-sm flex items-center justify-center space-x-2 text-sm"
                >
                  <Sparkles size={16} />
                  <span>Instant Checkout / Buy Now</span>
                </button>
              </div>

              {/* Pincode Estimator */}
              <div className="p-4 bg-warm-50 rounded-2xl border border-warm-200 space-y-2 mb-6">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-gray-800">
                  <MapPin size={14} className="text-brand-700" />
                  <span>Estimated Delivery Checker</span>
                </div>
                <form onSubmit={handleCheckPincode} className="flex items-center space-x-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-white border border-warm-300 rounded-xl px-3.5 py-1.5 text-xs font-mono text-gray-900"
                  />
                  <button
                    type="submit"
                    className="bg-brand-950 text-gold-300 text-xs font-bold px-4 py-1.5 rounded-xl hover:bg-brand-900 transition"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p className={`text-[11px] font-medium ${pincodeStatus.valid ? 'text-emerald-800' : 'text-red-600'}`}>
                    {pincodeStatus.message}
                  </p>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-warm-200 text-center">
                <div className="p-2 bg-warm-50 rounded-xl">
                  <ShieldCheck size={18} className="mx-auto text-brand-700 mb-1" />
                  <span className="text-[10px] font-bold text-gray-800 block">100% Natural</span>
                  <span className="text-[9px] text-gray-600">Zero Artificial Chemicals</span>
                </div>
                <div className="p-2 bg-warm-50 rounded-xl cursor-pointer hover:bg-brand-50 transition" onClick={onOpenBatchVerifier}>
                  <Microscope size={18} className="mx-auto text-brand-700 mb-1" />
                  <span className="text-[10px] font-bold text-gray-800 block">Lab Tested</span>
                  <span className="text-[9px] text-gray-600">Heavy Metal Safe</span>
                </div>
                <div className="p-2 bg-warm-50 rounded-xl">
                  <Truck size={18} className="mx-auto text-brand-700 mb-1" />
                  <span className="text-[10px] font-bold text-gray-800 block">Free Shipping</span>
                  <span className="text-[9px] text-gray-600">On Orders Above ₹999</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Comprehensive Tabs: Verified Nutrition, Ingredients, How To Use, Reviews */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-warm-200 mb-12">
          
          {/* Tab Navigation */}
          <div className="flex items-center space-x-2 border-b border-warm-300 pb-4 overflow-x-auto">
            {[
              { id: 'benefits', label: 'Benefits & Efficacy' },
              { id: 'nutrition', label: 'Verified Nutrition Facts' },
              { id: 'ingredients', label: '100% Whole Ingredients' },
              { id: 'usage', label: 'How to Consume' },
              { id: 'regulatory', label: 'Purity & FSSAI Details' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-brand-950 text-gold-300 shadow-sm'
                    : 'bg-warm-50 text-gray-700 hover:bg-warm-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Benefits */}
          {activeTab === 'benefits' && (
            <div className="pt-6 space-y-6">
              <h3 className="font-serif text-xl font-bold text-brand-950">Why This Botanical Blend Works</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-3xl">
                {product.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {product.benefits.map((b, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-warm-50 border border-warm-200 flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-brand-950 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={13} />
                    </div>
                    <p className="text-xs text-gray-800 leading-relaxed font-medium">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Nutrition Facts */}
          {activeTab === 'nutrition' && (
            <div className="pt-6 space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-600">Transcribed from Packaging Artwork</span>
                <h3 className="font-serif text-xl font-bold text-brand-950">Nutritional Information Table</h3>
                {product.nutrition?.servingSize && (
                  <p className="text-xs text-gray-500 mt-0.5">Serving Size: <strong>{product.nutrition.servingSize}</strong></p>
                )}
              </div>

              {product.nutrition?.items ? (
                <div className="overflow-x-auto border border-warm-200 rounded-2xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-brand-950 text-white font-mono text-[11px] uppercase">
                        <th className="p-3.5">Nutrient</th>
                        <th className="p-3.5">Per 100g</th>
                        <th className="p-3.5">Per Serving</th>
                        <th className="p-3.5">% RDA*</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-warm-200 font-mono">
                      {product.nutrition.items.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-warm-50/50'}>
                          <td className="p-3.5 font-bold text-gray-900">{row.label}</td>
                          <td className="p-3.5 text-gray-700">{row.per100g}</td>
                          <td className="p-3.5 text-gray-700">{row.perServing}</td>
                          <td className="p-3.5 text-brand-800 font-bold">{row.rda || '--'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-3 bg-warm-50 text-[10px] text-gray-500 border-t border-warm-200">
                    * % RDA values are based on a 2000 kcal diet for an average adult.
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-600">Nutritional information is being transcribed from batch packaging.</p>
              )}
            </div>
          )}

          {/* Tab 3: Ingredients */}
          {activeTab === 'ingredients' && (
            <div className="pt-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-950">100% Pure Botanical Ingredients</h3>
                <p className="text-xs text-gray-500 mt-0.5">Ethically harvested, unadulterated, and free of synthetic fillers.</p>
              </div>

              <div className="p-4 bg-brand-50 rounded-2xl border border-brand-200 text-xs font-semibold text-brand-950">
                Ingredients: {product.ingredients}
              </div>

              {product.ingredientsList && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.ingredientsList.map((ing, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-warm-50 border border-warm-200">
                      <p className="text-xs font-bold text-brand-950 flex items-center space-x-1.5">
                        <Leaf size={14} className="text-brand-700" />
                        <span>{ing.name}</span>
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{ing.note}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 4: How To Use */}
          {activeTab === 'usage' && (
            <div className="pt-6 space-y-6">
              <h3 className="font-serif text-xl font-bold text-brand-950">Usage & Preparation Routine</h3>
              
              <div className="p-5 rounded-2xl bg-warm-50 border border-warm-200 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase text-brand-950 mb-1">Recommended Method:</h4>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                    {product.howToUse}
                  </p>
                </div>

                {product.storage && (
                  <div className="pt-3 border-t border-warm-200">
                    <h4 className="text-xs font-bold uppercase text-brand-950 mb-1">Storage Instructions:</h4>
                    <p className="text-xs text-gray-600">
                      {product.storage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 5: Regulatory & FSSAI */}
          {activeTab === 'regulatory' && (
            <div className="pt-6 space-y-6">
              <h3 className="font-serif text-xl font-bold text-brand-950">Batch Traceability & Legal Compliance</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200">
                  <p className="text-gray-500 uppercase text-[10px]">FSSAI License No.</p>
                  <p className="font-bold text-brand-950 text-sm">{product.fssai || brandInfo.fssaiNumber}</p>
                </div>

                <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200">
                  <p className="text-gray-500 uppercase text-[10px]">Batch Number</p>
                  <p className="font-bold text-brand-950 text-sm">{product.batchNo || "WBN/MS/0626"}</p>
                </div>

                <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200">
                  <p className="text-gray-500 uppercase text-[10px]">Mfg Date / Best Before</p>
                  <p className="font-bold text-brand-950">{product.mfgDate || "27 July 2026"} • {product.bestBefore || "26 January 2027"}</p>
                </div>

                <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200">
                  <p className="text-gray-500 uppercase text-[10px]">Manufacturer & Marketer</p>
                  <p className="font-bold text-brand-950 font-sans text-xs">{product.manufacturer || brandInfo.registeredAddress}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
