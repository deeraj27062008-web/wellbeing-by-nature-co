import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Truck, 
  Gift, 
  Tag, 
  ShieldCheck,
  Check
} from 'lucide-react';

export const CartDrawer = ({ onSelectProduct }) => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    mrpTotal,
    shippingFee,
    isFreeShippingEligible,
    amountToFreeShipping,
    freeShippingProgress,
    isFreeGiftUnlocked,
    amountToFreeGift,
    freeGiftProgress,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    discountAmount,
    grandTotal,
    totalSavings,
    openCheckout,
    addToCart
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApply = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
    }
  };

  // Upsell candidates (products not currently in cart)
  const cartIds = items.map((i) => i.id);
  const upsellProducts = products.filter((p) => !cartIds.includes(p.id)).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-warm-300 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Cart Header */}
        <div className="p-4 sm:p-5 border-b border-warm-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center space-x-2">
            <ShoppingBag size={20} className="text-brand-900" />
            <h2 className="font-serif font-bold text-lg text-gray-900">Your Wellness Cart</h2>
            <span className="bg-brand-900 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-full hover:bg-warm-200 text-gray-600 transition"
            aria-label="Close Cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Gamified Milestone Progress Bars */}
        <div className="bg-brand-50 p-4 border-b border-brand-200 space-y-2 text-xs">
          {/* Milestone 1: Free Shipping (₹499) */}
          <div>
            <div className="flex items-center justify-between font-bold text-brand-950 mb-1">
              <span className="flex items-center space-x-1.5">
                <Truck size={14} className="text-brand-700" />
                <span>
                  {isFreeShippingEligible ? "🎉 FREE Express Shipping Unlocked!" : `Add ₹${amountToFreeShipping} more for FREE Shipping`}
                </span>
              </span>
              <span className="text-[10px] text-brand-700">Goal: ₹499</span>
            </div>
            <div className="w-full bg-brand-200/70 h-2 rounded-full overflow-hidden">
              <div
                className="bg-brand-700 h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Milestone 2: Free Gift (₹999) */}
          <div>
            <div className="flex items-center justify-between font-bold text-brand-950 mb-1">
              <span className="flex items-center space-x-1.5">
                <Gift size={14} className="text-coral-600" />
                <span>
                  {isFreeGiftUnlocked ? "🎁 FREE Herb Blend Gift Unlocked!" : `Add ₹${amountToFreeGift} more for FREE Gift`}
                </span>
              </span>
              <span className="text-[10px] text-coral-700">Goal: ₹999</span>
            </div>
            <div className="w-full bg-warm-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-coral-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${freeGiftProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center mx-auto text-gray-400">
                <ShoppingBag size={28} />
              </div>
              <div>
                <p className="text-base font-bold text-gray-800">Your cart is empty</p>
                <p className="text-xs text-gray-500 mt-1">Start nourishing your body with authentic whole-food formulas.</p>
              </div>
              <button
                onClick={closeCart}
                className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold px-6 py-3 rounded-full transition shadow-sm"
              >
                Explore Products
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.packSize}`}
                  className="flex items-start space-x-3.5 p-3.5 bg-[#FAF8F5] rounded-2xl border border-warm-200 shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-warm-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-bold text-gray-900 truncate max-w-[190px]">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id, item.packSize)}
                        className="text-gray-400 hover:text-red-500 p-0.5 transition"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Pack: <span className="font-semibold text-gray-700">{item.packSize}</span>
                    </p>

                    <div className="flex items-center justify-between mt-2.5">
                      {/* Quantity Modifier */}
                      <div className="flex items-center border border-warm-300 rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.packSize, -1)}
                          className="px-2 py-1 text-gray-600 hover:bg-warm-100 transition text-xs font-bold"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-bold text-gray-900 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.packSize, 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-warm-100 transition text-xs font-bold"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-extrabold text-brand-950">
                          ₹{item.price * item.quantity}
                        </span>
                        {item.mrp && (
                          <span className="text-[10px] text-gray-400 line-through block -mt-0.5">
                            ₹{item.mrp * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Instant Upsell Recommendations */}
              {upsellProducts.length > 0 && (
                <div className="pt-3 border-t border-warm-200">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center space-x-1">
                    <Sparkles size={12} className="text-gold-500" />
                    <span>Frequently Added Together</span>
                  </p>
                  <div className="space-y-2">
                    {upsellProducts.slice(0, 2).map((up) => (
                      <div
                        key={up.id}
                        className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-dashed border-brand-300"
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <img src={up.image} alt={up.name} className="w-10 h-10 object-contain rounded bg-warm-50 p-0.5" />
                          <div className="truncate">
                            <p className="text-xs font-bold text-gray-900 truncate">{up.name}</p>
                            <p className="text-[10px] text-brand-800 font-bold">₹{up.price}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => addToCart(up)}
                          className="bg-brand-100 hover:bg-brand-200 text-brand-900 text-[11px] font-bold px-2.5 py-1 rounded-lg transition shrink-0"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Billing Breakdown & Checkout CTA */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-warm-200 bg-[#FAF8F5] space-y-3.5">
            
            {/* Coupon Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                  <div className="flex items-center space-x-1.5 text-emerald-800 font-bold">
                    <Tag size={14} />
                    <span>{appliedCoupon.code} Applied ({appliedCoupon.description})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-500 hover:text-red-700 text-[11px] font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. NATURE15, GUTHEALTH)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-white border border-warm-300 rounded-xl px-3 py-2 text-xs uppercase placeholder:normal-case focus:outline-hidden focus:border-brand-600"
                  />
                  <button
                    type="submit"
                    className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[10px] text-red-500 font-semibold mt-1">{couponError}</p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-gray-900">₹{subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon Savings:</span>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-brand-950 pt-2 border-t border-warm-200">
                <span>Grand Total:</span>
                <span className="text-base text-brand-950">₹{grandTotal}</span>
              </div>

              {totalSavings > 0 && (
                <p className="text-[11px] font-bold text-brand-800 text-center bg-brand-100/70 py-1 rounded-md">
                  ✨ Total Savings on this order: ₹{totalSavings}
                </p>
              )}
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={openCheckout}
              className="w-full bg-coral-500 hover:bg-coral-600 text-white text-sm font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-coral-500/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout • ₹{grandTotal}</span>
              <ArrowRight size={18} />
            </button>

            <div className="flex items-center justify-center space-x-3 text-[10px] text-gray-500 pt-1">
              <span className="flex items-center space-x-1">
                <ShieldCheck size={12} className="text-emerald-600" />
                <span>100% Secure Checkout</span>
              </span>
              <span>•</span>
              <span>UPI / Cards / COD Supported</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
