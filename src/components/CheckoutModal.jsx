import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { brandInfo } from '../data/brandInfo';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Truck, 
  ShoppingBag, 
  Lock, 
  ArrowLeft, 
  Sparkles,
  Download,
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal = () => {
  const {
    items,
    isCheckoutOpen,
    closeCheckout,
    subtotal,
    discountAmount,
    shippingFee,
    grandTotal,
    appliedCoupon,
    clearCart
  } = useCart();

  const [step, setStep] = useState('details'); // 'details' | 'payment' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Form state with sensible defaults
  const [formData, setFormData] = useState({
    name: 'Bhanu Teja',
    phone: '+91 98765 43210',
    email: 'teja@wellbeingbynature.co',
    address: 'Flat 402, Green Meadows, Sai Nagar',
    pincode: '515004',
    city: 'Anantapur',
    state: 'Andhra Pradesh'
  });

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      alert("Please fill in your name, phone, address, and pincode.");
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrder = `WBN-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setStep('success');
      clearCart();
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-warm-300 overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-warm-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center space-x-2">
            <Lock size={18} className="text-emerald-700" />
            <h2 className="font-serif font-bold text-lg text-gray-900">
              {step === 'details' && "1. Delivery Details"}
              {step === 'payment' && "2. Secure Payment"}
              {step === 'success' && "Order Confirmed!"}
            </h2>
          </div>
          <button
            onClick={closeCheckout}
            className="p-1.5 rounded-full hover:bg-warm-200 text-gray-600 transition"
            aria-label="Close Checkout"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-7 flex-1">
          
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-warm-50 border border-warm-300 rounded-xl p-3 text-xs focus:bg-white focus:outline-hidden focus:border-brand-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number (for updates) *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-warm-50 border border-warm-300 rounded-xl p-3 text-xs focus:bg-white focus:outline-hidden focus:border-brand-600 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-warm-50 border border-warm-300 rounded-xl p-3 text-xs focus:bg-white focus:outline-hidden focus:border-brand-600 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Delivery Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House/Flat No., Street, Landmark"
                    required
                    className="w-full bg-warm-50 border border-warm-300 rounded-xl p-3 text-xs focus:bg-white focus:outline-hidden focus:border-brand-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-warm-50 border border-warm-300 rounded-xl p-3 text-xs focus:bg-white focus:outline-hidden focus:border-brand-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">City / Town *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-warm-50 border border-warm-300 rounded-xl p-3 text-xs focus:bg-white focus:outline-hidden focus:border-brand-600 font-medium"
                  />
                </div>
              </div>

              {/* Order Quick Summary */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-warm-200 text-xs space-y-1.5 mt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Items Total ({items.reduce((s, i) => s + i.quantity, 0)} items):</span>
                  <span className="font-semibold text-gray-900">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount ({appliedCoupon?.code}):</span>
                    <span>- ₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span className="font-semibold">{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between font-extrabold text-sm text-brand-950 pt-1.5 border-t border-warm-200">
                  <span>Payable Amount:</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-lg transition"
              >
                Continue to Payment • ₹{grandTotal}
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              <button
                onClick={() => setStep('details')}
                className="text-xs font-bold text-brand-800 hover:underline flex items-center space-x-1"
              >
                <ArrowLeft size={14} />
                <span>Back to Delivery Details</span>
              </button>

              {/* Payment Methods Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-700">Select Payment Mode:</label>
                
                {/* UPI / QR Code */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'upi'
                      ? 'bg-brand-50 border-brand-800 ring-2 ring-brand-800/20 shadow-xs'
                      : 'bg-warm-50 border-warm-200 hover:bg-warm-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-900 border border-warm-200 shadow-xs">
                      <QrCode size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Instant UPI (Google Pay, PhonePe, Paytm)</p>
                      <p className="text-[10px] text-gray-500">Fastest checkout with instant confirmation</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded">
                    ⚡ Fast & Safe
                  </span>
                </div>

                {/* Cards */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'card'
                      ? 'bg-brand-50 border-brand-800 ring-2 ring-brand-800/20 shadow-xs'
                      : 'bg-warm-50 border-warm-200 hover:bg-warm-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-900 border border-warm-200 shadow-xs">
                      <CreditCard size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Credit / Debit Cards / NetBanking</p>
                      <p className="text-[10px] text-gray-500">Visa, MasterCard, RuPay, ICICI, HDFC, SBI</p>
                    </div>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'cod'
                      ? 'bg-brand-50 border-brand-800 ring-2 ring-brand-800/20 shadow-xs'
                      : 'bg-warm-50 border-warm-200 hover:bg-warm-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-900 border border-warm-200 shadow-xs">
                      <Truck size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Cash on Delivery (COD)</p>
                      <p className="text-[10px] text-gray-500">Pay cash or UPI upon delivery at your doorstep</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address Review */}
              <div className="bg-warm-50 p-3.5 rounded-2xl border border-warm-200 text-xs text-gray-600">
                <p className="font-bold text-gray-900">Delivering to:</p>
                <p className="mt-0.5">{formData.name} • {formData.phone}</p>
                <p>{formData.address}, {formData.city}, {formData.state} - {formData.pincode}</p>
              </div>

              {/* Pay Now Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm py-4 px-4 rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <span>Securing Order & Verifying Payment...</span>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    <span>Confirm & Pay ₹{grandTotal}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6 space-y-5 animate-in fade-in zoom-in-95 duration-300">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 size={36} />
              </div>

              <div className="space-y-1">
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border border-emerald-200">
                  Payment Verified • Order Placed
                </span>
                <h3 className="text-2xl font-serif font-bold text-gray-950 mt-2">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto">
                  Your wellness parcel is being hygienically packed at our clean facility. A tracking link has been sent to <span className="font-bold">{formData.email}</span>.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-warm-200 text-left text-xs space-y-3 max-w-md mx-auto shadow-xs">
                <div className="flex justify-between items-center pb-2 border-b border-warm-200">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Order ID</span>
                    <p className="font-mono font-bold text-brand-900 text-sm">{orderNumber}</p>
                  </div>
                  <span className="bg-brand-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Processing
                  </span>
                </div>

                <div className="space-y-1 text-gray-700 text-[11px]">
                  <p><span className="font-bold">Brand:</span> {brandInfo.legalName}</p>
                  <p><span className="font-bold">FSSAI Lic:</span> {brandInfo.fssaiNumber}</p>
                  <p><span className="font-bold">Shipping To:</span> {formData.address}, {formData.city} - {formData.pincode}</p>
                  <p><span className="font-bold">Paid via:</span> {paymentMethod.toUpperCase()}</p>
                </div>

                <div className="pt-2 border-t border-warm-200 flex justify-between font-bold text-brand-950">
                  <span>Amount Paid:</span>
                  <span className="text-sm">₹{grandTotal}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center space-x-3">
                <button
                  onClick={closeCheckout}
                  className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-sm"
                >
                  Continue Browsing
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
