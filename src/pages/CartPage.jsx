import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  Tag, 
  Check, 
  Percent 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOffers } from '../context/OfferContext';

export function CartPage({ onGoShop, onProceedToCheckout, onSelectProduct }) {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal, 
    mrpTotal, 
    totalItems,
    shippingFee,
    isFreeShippingEligible,
    freeShippingProgress,
    amountToFreeShipping,
    discountAmount,
    grandTotal,
    totalSavings,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { offers } = useOffers();
  const [couponInput, setCouponInput] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 text-center shadow-sm border border-warm-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-warm-100 text-gray-500 flex items-center justify-center mx-auto">
            <ShoppingBag size={28} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-brand-950">Your Cart is Empty</h2>
          <p className="text-xs text-gray-600">
            Explore our curated natural superfoods, morning gut drinks, and seed cycling routines.
          </p>
          <button
            onClick={onGoShop}
            className="w-full bg-brand-950 hover:bg-brand-900 text-gold-300 font-bold text-xs uppercase tracking-wider py-3.5 rounded-2xl transition shadow-md flex items-center justify-center space-x-2 border border-gold-500/30"
          >
            <span>Start Shopping</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950">Your Shopping Bag</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Review your items, apply savings coupons, and checkout securely.</p>
        </div>

        {/* Free Shipping Progress Alert */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-warm-200 mb-8 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center space-x-1.5 text-brand-950">
              <Truck size={16} className="text-brand-700" />
              <span>
                {isFreeShippingEligible 
                  ? "🎉 You unlocked FREE Express Shipping across India!" 
                  : `Add ₹${amountToFreeShipping} more to unlock FREE Express Shipping!`}
              </span>
            </span>
            <span className="font-mono text-gray-500">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full h-2 bg-warm-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div 
                key={`${item.id}-${item.packSize}`}
                className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-warm-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-contain rounded-2xl bg-warm-50 border border-warm-200 p-1 shrink-0 cursor-pointer"
                    onClick={() => onSelectProduct(item)}
                  />
                  <div>
                    <h4 
                      onClick={() => onSelectProduct(item)}
                      className="font-serif font-bold text-sm text-gray-900 hover:text-brand-900 cursor-pointer"
                    >
                      {item.name}
                    </h4>
                    <span className="inline-block text-[11px] text-gray-500 font-mono mt-0.5">
                      Pack: {item.packSize}
                    </span>
                    <div className="flex items-baseline space-x-2 mt-1">
                      <span className="font-mono font-bold text-sm text-brand-950">₹{item.price}</span>
                      {item.mrp && <span className="font-mono text-xs text-gray-600 line-through">₹{item.mrp}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-warm-300 rounded-2xl bg-warm-50 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.packSize, -1)}
                      className="w-7 h-7 rounded-xl flex items-center justify-center text-gray-700 hover:bg-white transition"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center font-mono font-bold text-xs text-brand-950">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.packSize, 1)}
                      className="w-7 h-7 rounded-xl flex items-center justify-center text-gray-700 hover:bg-white transition"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <span className="font-mono font-bold text-sm text-brand-950 min-w-[60px] text-right">
                    ₹{item.price * item.quantity}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id, item.packSize)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={onGoShop}
                className="text-xs text-brand-900 hover:underline font-bold"
              >
                ← Continue Browsing Store
              </button>
              <button
                onClick={clearCart}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-warm-200 space-y-6">
              <h3 className="font-serif text-lg font-bold text-brand-950">Order Summary</h3>

              {/* Coupon Box */}
              <div>
                <form onSubmit={handleApply} className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Coupon (e.g. NATURE10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full bg-warm-50 border border-warm-300 rounded-xl pl-9 pr-3 py-2 text-xs font-mono font-bold text-gray-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-brand-950 hover:bg-brand-900 text-gold-300 text-xs font-bold px-4 py-2 rounded-xl transition"
                  >
                    Apply
                  </button>
                </form>

                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1.5">{couponError}</p>
                )}

                {appliedCoupon && (
                  <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                    <span className="font-mono font-bold">Code '{appliedCoupon.code}' applied!</span>
                    <button onClick={removeCoupon} className="text-red-500 font-bold hover:underline">
                      Remove
                    </button>
                  </div>
                )}

                {/* Quick Coupon Chips */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {offers.activeCoupons.slice(0, 3).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => applyCoupon(c.code)}
                      className="text-[10px] font-mono font-bold text-brand-800 bg-brand-50 hover:bg-brand-100 border border-brand-200 px-2 py-0.5 rounded-md"
                    >
                      {c.code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Calculation Table */}
              <div className="space-y-2.5 text-xs pt-4 border-t border-warm-200 font-mono">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-brand-950 pt-3 border-t border-warm-200">
                  <span className="font-serif">Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {totalSavings > 0 && (
                <div className="p-3 bg-emerald-50 rounded-xl text-center text-xs font-bold text-emerald-800 border border-emerald-200">
                  🎉 Total Savings on this order: ₹{totalSavings}
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full bg-brand-950 hover:bg-brand-900 text-gold-300 font-bold py-4 rounded-2xl transition shadow-md flex items-center justify-center space-x-2 text-sm border border-gold-500/30"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-500">
                <ShieldCheck size={13} className="text-brand-700" />
                <span>256-Bit Encrypted Indian Payment Processing</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
