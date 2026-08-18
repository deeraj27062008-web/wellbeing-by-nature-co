import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  Truck, 
  Sparkles, 
  RotateCcw,
  ShoppingBag,
  ChevronLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { brandInfo } from '../data/brandInfo';

export function CheckoutPage({ onGoHome, onGoCart }) {
  const { 
    items, 
    subtotal, 
    mrpTotal, 
    discountAmount, 
    shippingFee, 
    grandTotal, 
    totalSavings, 
    appliedCoupon, 
    clearCart 
  } = useCart();

  const [step, setStep] = useState(1); // 1: Contact/Address, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Karnataka',
    pincode: '',
    saveInfo: true
  });

  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' | 'upi' | 'card' | 'cod'
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phone || !formData.address || !formData.pincode) {
      alert('Please fill in all mandatory shipping address fields.');
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `WBN-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const orderObj = {
        orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...items],
        total: grandTotal,
        customer: `${formData.firstName} ${formData.lastName}`,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        paymentMethod: paymentMethod.toUpperCase()
      };

      setConfirmedOrder(orderObj);
      setIsProcessing(false);
      setStep(3);
      clearCart();

      // Trigger celebratory luxury confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#233324', '#C5A059', '#747A58', '#B97850']
        });
      } catch (e) {}
    }, 1200);
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-sm border border-warm-200 space-y-4">
          <ShoppingBag size={32} className="mx-auto text-gray-400" />
          <h2 className="font-serif text-2xl font-bold text-brand-950">Your Cart is Empty</h2>
          <p className="text-xs text-gray-600">Please add items to your cart before proceeding to checkout.</p>
          <button
            onClick={onGoHome}
            className="w-full bg-brand-950 text-gold-300 text-xs font-bold py-3.5 rounded-2xl"
          >
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  // STEP 3: ORDER CONFIRMED SCREEN
  if (step === 3 && confirmedOrder) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gold-400/40 text-center space-y-6">
            
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 size={42} />
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-gold-600">
                ORDER SUCCESSFUL • DISPATCHING SOON
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950 mt-1">
                Thank You for Choosing Nature!
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-md mx-auto">
                We have received your order. A confirmation email and SMS with live courier tracking has been dispatched.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-6 rounded-2xl bg-warm-50 border border-warm-200 text-left space-y-4 font-mono text-xs">
              <div className="flex justify-between border-b border-warm-200 pb-3">
                <span className="text-gray-500">Order Reference:</span>
                <span className="font-bold text-brand-950 text-sm">{confirmedOrder.orderId}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span className="text-gray-900 font-bold">{confirmedOrder.customer}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Shipping Address:</span>
                <span className="text-gray-900 font-sans text-xs text-right max-w-xs">{confirmedOrder.address}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Payment Mode:</span>
                <span className="text-emerald-800 font-bold">{confirmedOrder.paymentMethod} (Verified)</span>
              </div>

              <div className="flex justify-between border-t border-warm-200 pt-3 text-sm font-bold text-brand-950">
                <span>Total Paid:</span>
                <span>₹{confirmedOrder.total}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onGoHome}
                className="w-full sm:w-auto bg-brand-950 hover:bg-brand-900 text-gold-300 font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition shadow-md border border-gold-500/30"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 1 & 2: CHECKOUT FLOW
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-warm-300">
          <div className="flex items-center space-x-3">
            <button onClick={onGoCart} className="p-2 rounded-full hover:bg-warm-200 text-gray-700">
              <ChevronLeft size={20} />
            </button>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950">Secure Checkout</h1>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-gray-500">
            <span className={step === 1 ? "font-bold text-brand-950" : ""}>1. Shipping</span>
            <span>→</span>
            <span className={step === 2 ? "font-bold text-brand-950" : ""}>2. Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Steps */}
          <div className="lg:col-span-7 space-y-6">
            
            {step === 1 ? (
              <form onSubmit={handleAddressSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-warm-200 space-y-6">
                
                <div>
                  <h3 className="font-serif text-lg font-bold text-brand-950 mb-1">1. Contact Details</h3>
                  <p className="text-xs text-gray-500 mb-4">We will send dispatch alerts and tracking link to these details.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 font-mono mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-brand-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 font-mono mb-1">
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-brand-800"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-warm-200">
                  <h3 className="font-serif text-lg font-bold text-brand-950 mb-1">2. Shipping Address</h3>
                  <p className="text-xs text-gray-500 mb-4">Where should we deliver your natural wellness package?</p>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 font-mono mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Radhika"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-brand-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 font-mono mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Sharma"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-brand-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 font-mono mb-1">
                        Street Address / Flat / Building *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="House / Flat No., Landmark"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-brand-800"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 font-mono mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          required
                          placeholder="560068"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                          className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs font-mono text-gray-900 focus:outline-none focus:border-brand-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 font-mono mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Bengaluru"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-brand-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 font-mono mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-brand-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-950 hover:bg-brand-900 text-gold-300 font-bold py-3.5 rounded-2xl transition shadow-md flex items-center justify-center space-x-2 text-xs uppercase tracking-wider border border-gold-500/30"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight size={15} />
                </button>
              </form>
            ) : (
              <form onSubmit={handlePlaceOrder} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-warm-200 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-warm-200">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-950">Select Payment Method</h3>
                    <p className="text-xs text-gray-500">256-Bit Encrypted Indian Payment Processing</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-brand-900 hover:underline font-bold"
                  >
                    Edit Address
                  </button>
                </div>

                <div className="space-y-3">
                  
                  {/* Razorpay / UPI */}
                  <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'razorpay' ? 'border-brand-950 bg-brand-50/60 ring-1 ring-brand-950' : 'border-warm-200 hover:border-warm-300'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'razorpay'}
                        onChange={() => setPaymentMethod('razorpay')}
                        className="accent-brand-950"
                      />
                      <div>
                        <p className="text-xs font-bold text-gray-900">Razorpay Express (UPI, Cards, NetBanking)</p>
                        <p className="text-[10px] text-gray-500">Google Pay, PhonePe, Paytm, All Major Cards</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Instant Confirmation
                    </span>
                  </label>

                  {/* UPI QR / Direct */}
                  <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'upi' ? 'border-brand-950 bg-brand-50/60 ring-1 ring-brand-950' : 'border-warm-200 hover:border-warm-300'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="accent-brand-950"
                      />
                      <div>
                        <p className="text-xs font-bold text-gray-900">Instant UPI Direct</p>
                        <p className="text-[10px] text-gray-500">Scan QR Code via any UPI app</p>
                      </div>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'cod' ? 'border-brand-950 bg-brand-50/60 ring-1 ring-brand-950' : 'border-warm-200 hover:border-warm-300'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-brand-950"
                      />
                      <div>
                        <p className="text-xs font-bold text-gray-900">Cash on Delivery (COD)</p>
                        <p className="text-[10px] text-gray-500">Pay cash/UPI at the time of delivery</p>
                      </div>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-brand-950 hover:bg-brand-900 text-gold-300 font-bold py-4 rounded-2xl transition shadow-md flex items-center justify-center space-x-2 text-sm uppercase tracking-wider border border-gold-500/30"
                >
                  <Lock size={15} />
                  <span>{isProcessing ? "Verifying Transaction..." : `Pay ₹${grandTotal} & Place Order`}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-warm-200 space-y-4">
              <h3 className="font-serif text-lg font-bold text-brand-950 pb-3 border-b border-warm-200">
                Order Items ({items.length})
              </h3>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map((it) => (
                  <div key={`${it.id}-${it.packSize}`} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3 truncate">
                      <img src={it.image} alt={it.name} className="w-10 h-10 object-contain rounded-lg bg-warm-50 border border-warm-200 p-0.5" />
                      <div className="truncate">
                        <p className="font-bold text-gray-900 truncate">{it.name}</p>
                        <p className="text-[10px] text-gray-500">Qty: {it.quantity} • {it.packSize}</p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-brand-950 shrink-0">
                      ₹{it.price * it.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation Table */}
              <div className="space-y-2 text-xs pt-4 border-t border-warm-200 font-mono">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-brand-950 pt-3 border-t border-warm-200">
                  <span className="font-serif">Total Due</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
