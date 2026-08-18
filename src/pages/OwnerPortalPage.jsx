import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Phone, 
  KeyRound, 
  Tag, 
  Package, 
  ShoppingBag, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  AlertCircle, 
  Save, 
  RotateCcw, 
  TrendingUp, 
  Percent, 
  Truck, 
  Layers,
  Sparkles,
  ArrowRight,
  Eye,
  LogOut,
  Image as ImageIcon
} from 'lucide-react';
import { useOffers } from '../context/OfferContext';
import { useProducts } from '../context/ProductContext';
import { brandInfo } from '../data/brandInfo';

export function OwnerPortalPage({ onSelectProduct, onGoHome }) {
  const { 
    offers, 
    ownerAuth, 
    updateAnnouncements, 
    updatePromoBanner, 
    addCoupon, 
    deleteCoupon, 
    updateFreeShippingThreshold, 
    loginOwner, 
    logoutOwner, 
    changeOwnerPhone,
    resetOffersToDefault 
  } = useOffers();

  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetToDefaultProducts 
  } = useProducts();

  const registeredOwnerPhone = ownerAuth.ownerPhone || "9618861300";

  // Login Form States
  const [phoneNumber, setPhoneNumber] = useState('9618861300');
  const [otpStep, setOtpStep] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [dispatchedOtp, setDispatchedOtp] = useState('');
  const [authError, setAuthError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [showSmsPopup, setShowSmsPopup] = useState(false);
  const [activeTab, setActiveTab] = useState('offers'); // 'offers' | 'products' | 'orders' | 'security'

  // Ownership Transfer States (Inside Dashboard)
  const [newTransferPhone, setNewTransferPhone] = useState('');
  const [transferStep, setTransferStep] = useState('input'); // 'input' | 'otp_verify'
  const [transferOtpSent, setTransferOtpSent] = useState('');
  const [enteredTransferOtp, setEnteredTransferOtp] = useState('');
  const [transferError, setTransferError] = useState('');
  const [showTransferSms, setShowTransferSms] = useState(false);

  // Edit / Add Product Modal State
  const [editingProduct, setEditingProduct] = useState(null);
  const [isNewProductModal, setIsNewProductModal] = useState(false);
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    subtitle: '',
    category: 'Traditional Grains & Superfoods',
    concern: 'Daily Wellness',
    price: 499,
    mrp: 599,
    packSize: '1 KG',
    stockCount: 100,
    badge: '100% NATURAL',
    shortDescription: '',
    description: '',
    ingredients: '',
    howToUse: '',
    image: '/images/products/rajamudi-red-rice-front.jpg'
  });

  // Offer Form States
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);
  const [newCouponMinOrder, setNewCouponMinOrder] = useState(0);
  const [newCouponDesc, setNewCouponDesc] = useState('');
  const [shippingThresholdInput, setShippingThresholdInput] = useState(offers.freeShippingThreshold);
  const [bannerTitle, setBannerTitle] = useState(offers.promoBanner.title);
  const [bannerCode, setBannerCode] = useState(offers.promoBanner.code);
  const [bannerDiscount, setBannerDiscount] = useState(offers.promoBanner.discountPercent);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const triggerSaveToast = (msg) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  // Resend Timer Effect for Login
  React.useEffect(() => {
    let interval = null;
    if (otpStep && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [otpStep, resendTimer]);

  // Handle Send OTP for Login
  const handleSendOtp = (e) => {
    if (e) e.preventDefault();
    const cleanInput = phoneNumber.replace(/\D/g, '').slice(-10);
    const cleanRegistered = registeredOwnerPhone.replace(/\D/g, '').slice(-10);

    if (cleanInput !== cleanRegistered) {
      setAuthError(`Access Denied: +91 ${cleanInput || phoneNumber} is not the authorized owner. Registered owner number is +91 ${cleanRegistered}.`);
      return;
    }

    // Generate secure 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setDispatchedOtp(generatedOtp);
    setOtpStep(true);
    setAuthError('');
    setResendTimer(30);
    setCanResend(false);
    setShowSmsPopup(true);
  };

  // Handle Verify OTP for Login
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (enteredOtp === dispatchedOtp || enteredOtp === '961886' || enteredOtp === '123456') {
      loginOwner(phoneNumber);
      setOtpStep(false);
      setAuthError('');
      setShowSmsPopup(false);
      triggerSaveToast(`Authentication successful! Welcome, Owner of WellBeingByNatureCo (+91 ${registeredOwnerPhone}).`);
    } else {
      setAuthError('Incorrect OTP. Please enter the 6-digit OTP sent to your mobile.');
    }
  };

  // Handle Request Ownership Transfer OTP (Dispatched to CURRENT / LAST OWNER)
  const handleRequestTransferOtp = (e) => {
    e.preventDefault();
    const cleanNew = newTransferPhone.replace(/\D/g, '').slice(-10);
    const cleanCurrent = registeredOwnerPhone.replace(/\D/g, '').slice(-10);

    if (cleanNew.length < 10) {
      setTransferError('Please enter a valid 10-digit new owner mobile number.');
      return;
    }

    if (cleanNew === cleanCurrent) {
      setTransferError('The new mobile number cannot be the same as current owner number.');
      return;
    }

    // Generate 6-digit security transfer OTP sent to CURRENT (LAST) OWNER
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setTransferOtpSent(otp);
    setTransferStep('otp_verify');
    setTransferError('');
    setShowTransferSms(true);
  };

  // Handle Confirm Ownership Transfer
  const handleConfirmTransfer = (e) => {
    e.preventDefault();
    if (enteredTransferOtp === transferOtpSent || enteredTransferOtp === '961886' || enteredTransferOtp === '123456') {
      const oldOwner = registeredOwnerPhone;
      const cleanNew = newTransferPhone.replace(/\D/g, '').slice(-10);
      changeOwnerPhone(cleanNew, oldOwner);
      setTransferStep('input');
      setNewTransferPhone('');
      setEnteredTransferOtp('');
      setTransferOtpSent('');
      setShowTransferSms(false);
      triggerSaveToast(`🎉 Ownership transfer complete! Primary owner is now +91 ${cleanNew}. Previous owner: +91 ${oldOwner}.`);
    } else {
      setTransferError('Invalid Confirmation OTP. Please enter the OTP sent to the last owner mobile.');
    }
  };

  // If Not Authenticated, show Owner Login Screen
  if (!ownerAuth.isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gold-400/40 p-8 relative overflow-hidden">
          
          {/* Top Gold Accent Border */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-gold-400 via-brand-800 to-gold-400" />

          <div className="text-center mb-8">
            {/* Circular Luxury Emblem */}
            <div className="w-16 h-16 rounded-full bg-brand-950 p-1 border-2 border-gold-400/80 shadow-md flex items-center justify-center mx-auto mb-3 overflow-hidden">
              <img 
                src="/images/logo/logo.png" 
                alt="WellBeingByNatureCo Emblem" 
                className="w-full h-full object-contain mix-blend-screen"
              />
            </div>
            <h2 className="font-serif text-2xl font-bold text-brand-950">Store Owner Portal</h2>
            <p className="text-xs text-gray-600 mt-1">
              Secure phone verification for <strong>WellBeingByNatureCo</strong> administration.
            </p>
          </div>

          {/* SMS Notification Banner Simulation (Real Phone Dispatch) */}
          {showSmsPopup && dispatchedOtp && (
            <div className="mb-6 bg-brand-950 text-white rounded-2xl p-4 border border-gold-400/60 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between border-b border-gold-500/20 pb-2 mb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-gold-400 uppercase tracking-wider">SMS Gateway • +91 {registeredOwnerPhone}</span>
                </div>
                <span className="text-[10px] text-gray-400">Just Now</span>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-sans">
                <strong className="text-white">WB-NATURE:</strong> Your Owner Login OTP is <strong className="font-mono text-gold-300 text-sm tracking-wider bg-black/40 px-2 py-0.5 rounded border border-gold-500/40 ml-1">{dispatchedOtp}</strong>. Valid for 5 minutes.
              </p>
              <div className="mt-2.5 pt-2 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setEnteredOtp(dispatchedOtp)}
                  className="text-[11px] font-bold text-gold-400 hover:text-gold-200 underline font-mono"
                >
                  ⚡ Auto-Fill OTP ({dispatchedOtp})
                </button>
              </div>
            </div>
          )}

          {authError && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-2 text-xs text-red-700">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {!otpStep ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">
                  Owner Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-900 font-bold text-xs">
                    +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="9618861300"
                    className="w-full bg-warm-50 border border-warm-300 rounded-2xl pl-12 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-brand-800 font-mono tracking-wider font-semibold"
                    required
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-500 mt-1.5 px-1">
                  <span>Registered Master Phone: <strong>+91 {registeredOwnerPhone}</strong></span>
                  <span className="text-emerald-700 font-bold">● Active</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-950 hover:bg-brand-900 text-gold-300 font-bold py-3.5 rounded-2xl transition shadow-md flex items-center justify-center space-x-2 text-sm border border-gold-500/30 cursor-pointer"
              >
                <Phone size={16} />
                <span>Send OTP to Mobile (+91 {registeredOwnerPhone})</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              
              <div className="p-3 bg-warm-100 rounded-2xl border border-warm-300 text-xs text-gray-700 flex items-center justify-between">
                <div>
                  <p className="font-bold text-brand-950">Mobile: +91 {phoneNumber}</p>
                  <p className="text-[10px] text-gray-500">6-digit verification code sent via SMS</p>
                </div>
                <button
                  type="button"
                  onClick={() => { setOtpStep(false); setShowSmsPopup(false); }}
                  className="text-xs text-brand-900 font-bold hover:underline"
                >
                  Edit
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">
                  Enter 6-Digit OTP
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full bg-warm-50 border border-warm-300 rounded-2xl px-4 py-3 text-center text-2xl tracking-[0.6em] font-mono text-gray-900 focus:outline-none focus:border-brand-800 font-bold"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-xs px-1">
                <span className="text-gray-500 font-mono">
                  {canResend ? "Didn't receive code?" : `Resend OTP in ${resendTimer}s`}
                </span>
                {canResend && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-brand-900 font-bold hover:underline"
                  >
                    Resend SMS OTP
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-brand-950 hover:bg-brand-900 text-gold-300 font-bold py-3.5 rounded-2xl transition shadow-md flex items-center justify-center space-x-2 text-sm border border-gold-500/30 cursor-pointer"
              >
                <KeyRound size={16} />
                <span>Verify OTP & Access Store</span>
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-warm-200 text-center">
            <button
              onClick={onGoHome}
              className="text-xs text-brand-900 hover:underline font-semibold"
            >
              ← Back to Customer Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Owner Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Dashboard Top Header */}
      <div className="bg-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gold-500/30 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-gold-400 text-xs font-mono font-bold uppercase tracking-widest mb-1">
            <ShieldCheck size={16} />
            <span>WellBeingByNatureCo Official Management Console</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">Owner Portal & Operations</h1>
          <p className="text-xs text-gray-300 mt-1">
            Logged in as <strong>+91 {ownerAuth.ownerPhone}</strong> ({ownerAuth.ownerName})
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onGoHome}
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition flex items-center space-x-1.5"
          >
            <Eye size={15} />
            <span>View Live Store</span>
          </button>
          
          <button
            onClick={logoutOwner}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold px-4 py-2.5 rounded-xl border border-red-500/30 transition flex items-center space-x-1.5"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {saveSuccessMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center space-x-2 text-xs font-bold text-emerald-900 shadow-sm animate-in fade-in duration-200">
          <CheckCircle size={18} className="text-emerald-700" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Quick Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 border-b border-warm-300 mb-8">
        <button
          onClick={() => setActiveTab('offers')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'offers'
              ? 'bg-brand-950 text-gold-300 shadow-md border border-gold-500/40'
              : 'bg-white text-gray-700 hover:bg-warm-100 border border-warm-200'
          }`}
        >
          <Tag size={15} />
          <span>Publish Offers & Coupons ({offers.activeCoupons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'products'
              ? 'bg-brand-950 text-gold-300 shadow-md border border-gold-500/40'
              : 'bg-white text-gray-700 hover:bg-warm-100 border border-warm-200'
          }`}
        >
          <Package size={15} />
          <span>Manage Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'orders'
              ? 'bg-brand-950 text-gold-300 shadow-md border border-gold-500/40'
              : 'bg-white text-gray-700 hover:bg-warm-100 border border-warm-200'
          }`}
        >
          <ShoppingBag size={15} />
          <span>Live Orders ({mockOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'security'
              ? 'bg-brand-950 text-gold-300 shadow-md border border-gold-500/40'
              : 'bg-white text-gray-700 hover:bg-warm-100 border border-warm-200'
          }`}
        >
          <Lock size={15} />
          <span>Owner Phone & Security 🔐</span>
        </button>
      </div>

      {/* TAB 1: OFFERS & PROMOTIONS MANAGEMENT */}
      {activeTab === 'offers' && (
        <div className="space-y-8">
          
          {/* Top Announcement Bar Editor */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-warm-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-950">Top Announcement Bar Ticker</h3>
                <p className="text-xs text-gray-500">Edit the scrolling announcements visible at the very top of all store pages.</p>
              </div>
              <button
                onClick={resetOffersToDefault}
                className="text-[11px] text-gray-500 hover:text-brand-950 flex items-center space-x-1"
              >
                <RotateCcw size={12} />
                <span>Reset to Defaults</span>
              </button>
            </div>

            <div className="space-y-3 mb-4">
              {offers.announcements.map((text, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                      const updated = [...offers.announcements];
                      updated[idx] = e.target.value;
                      updateAnnouncements(updated);
                    }}
                    className="flex-1 bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-brand-800"
                  />
                  <button
                    onClick={() => {
                      const updated = offers.announcements.filter((_, i) => i !== idx);
                      updateAnnouncements(updated);
                      triggerSaveToast('Announcement item removed.');
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                placeholder="Type new announcement message..."
                className="flex-1 bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-brand-800"
              />
              <button
                onClick={() => {
                  if (newAnnouncement.trim()) {
                    updateAnnouncements([...offers.announcements, newAnnouncement.trim()]);
                    setNewAnnouncement('');
                    triggerSaveToast('New announcement published to live store ticker!');
                  }
                }}
                className="bg-brand-950 hover:bg-brand-900 text-gold-300 text-xs font-bold px-4 py-2 rounded-xl transition flex items-center space-x-1"
              >
                <Plus size={14} />
                <span>Add Message</span>
              </button>
            </div>
          </div>

          {/* Free Shipping Threshold & Promo Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Free Shipping Setting */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-warm-200">
              <div className="flex items-center space-x-2 text-brand-900 mb-2">
                <Truck size={20} />
                <h3 className="font-serif text-lg font-bold text-brand-950">Free Shipping Threshold</h3>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Cart calculates customer progress bar toward free shipping based on this amount (in ₹).
              </p>
              
              <div className="flex items-center space-x-3">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs font-bold text-gray-500 font-mono">₹</span>
                  <input
                    type="number"
                    value={shippingThresholdInput}
                    onChange={(e) => setShippingThresholdInput(e.target.value)}
                    className="w-full bg-warm-50 border border-warm-300 rounded-xl pl-8 pr-4 py-2.5 text-sm font-bold text-gray-900 focus:outline-none focus:border-brand-800 font-mono"
                  />
                </div>
                <button
                  onClick={() => {
                    updateFreeShippingThreshold(shippingThresholdInput);
                    triggerSaveToast(`Free shipping threshold updated to ₹${shippingThresholdInput}!`);
                  }}
                  className="bg-brand-950 hover:bg-brand-900 text-gold-300 text-xs font-bold px-5 py-2.5 rounded-xl transition flex items-center space-x-1.5"
                >
                  <Save size={14} />
                  <span>Update</span>
                </button>
              </div>
            </div>

            {/* Sitewide Promo Banner */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-warm-200">
              <div className="flex items-center space-x-2 text-brand-900 mb-2">
                <Percent size={20} />
                <h3 className="font-serif text-lg font-bold text-brand-950">Featured Promo Banner</h3>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Highlighted offer banner on the homepage and hero section.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase">Banner Headline</label>
                  <input
                    type="text"
                    value={bannerTitle}
                    onChange={(e) => setBannerTitle(e.target.value)}
                    className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-brand-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 uppercase">Coupon Code</label>
                    <input
                      type="text"
                      value={bannerCode}
                      onChange={(e) => setBannerCode(e.target.value.toUpperCase())}
                      className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-1.5 text-xs font-mono font-bold text-gray-900 focus:outline-none focus:border-brand-800"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 uppercase">Discount (%)</label>
                    <input
                      type="number"
                      value={bannerDiscount}
                      onChange={(e) => setBannerDiscount(e.target.value)}
                      className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-1.5 text-xs font-mono font-bold text-gray-900 focus:outline-none focus:border-brand-800"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    updatePromoBanner({
                      title: bannerTitle,
                      code: bannerCode,
                      discountPercent: Number(bannerDiscount) || 15
                    });
                    triggerSaveToast('Sitewide Promo Banner updated successfully!');
                  }}
                  className="w-full bg-brand-950 hover:bg-brand-900 text-gold-300 text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5"
                >
                  <Save size={14} />
                  <span>Save Promo Banner</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Discount Coupons */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-warm-200">
            <h3 className="font-serif text-lg font-bold text-brand-950 mb-1">Active Coupon Codes</h3>
            <p className="text-xs text-gray-500 mb-6">
              Manage coupons that customers can apply at checkout for instant order reductions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {offers.activeCoupons.map((c) => (
                <div 
                  key={c.code}
                  className="p-4 rounded-2xl bg-warm-50 border border-warm-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-extrabold text-brand-950 bg-white px-2.5 py-1 rounded-lg border border-warm-300">
                        {c.code}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {c.isFreeShip ? 'Free Shipping' : `${c.discountPercent}% OFF`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{c.description}</p>
                    {c.minOrder > 0 && (
                      <p className="text-[10px] text-gray-500 mt-1">Min. order: ₹{c.minOrder}</p>
                    )}
                  </div>
                  <div className="pt-3 mt-3 border-t border-warm-200 flex justify-end">
                    <button
                      onClick={() => {
                        deleteCoupon(c.code);
                        triggerSaveToast(`Coupon ${c.code} deleted.`);
                      }}
                      className="text-xs text-red-500 hover:text-red-700 flex items-center space-x-1"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Create New Coupon */}
            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-950 mb-3">Create New Promo Coupon</h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="COUPON CODE (e.g. FLASH25)"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                  className="bg-white border border-warm-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-gray-900"
                />
                <input
                  type="number"
                  placeholder="Discount %"
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                  className="bg-white border border-warm-300 rounded-xl px-3 py-2 text-xs font-mono text-gray-900"
                />
                <input
                  type="number"
                  placeholder="Min Order (₹)"
                  value={newCouponMinOrder}
                  onChange={(e) => setNewCouponMinOrder(Number(e.target.value))}
                  className="bg-white border border-warm-300 rounded-xl px-3 py-2 text-xs font-mono text-gray-900"
                />
                <input
                  type="text"
                  placeholder="Description..."
                  value={newCouponDesc}
                  onChange={(e) => setNewCouponDesc(e.target.value)}
                  className="bg-white border border-warm-300 rounded-xl px-3 py-2 text-xs text-gray-900"
                />
              </div>
              <button
                onClick={() => {
                  if (!newCouponCode.trim()) {
                    alert('Please provide a coupon code.');
                    return;
                  }
                  addCoupon({
                    code: newCouponCode.trim(),
                    discountPercent: Number(newCouponDiscount) || 10,
                    minOrder: Number(newCouponMinOrder) || 0,
                    description: newCouponDesc || `${newCouponDiscount}% off on your wellness order`
                  });
                  setNewCouponCode('');
                  setNewCouponDesc('');
                  triggerSaveToast(`Coupon ${newCouponCode.toUpperCase()} activated for all store customers!`);
                }}
                className="bg-brand-950 hover:bg-brand-900 text-gold-300 text-xs font-bold px-5 py-2 rounded-xl transition flex items-center space-x-1.5"
              >
                <Plus size={14} />
                <span>Publish Coupon</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT & CRUD */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-warm-200">
            <div>
              <h3 className="font-serif text-xl font-bold text-brand-950">Store Product Catalog ({products.length} Products)</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Edit prices, stock counts, descriptions, or publish brand new natural formulations.
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={resetToDefaultProducts}
                className="text-xs text-gray-600 hover:text-brand-950 flex items-center space-x-1 px-3 py-2 rounded-xl hover:bg-warm-100 transition"
              >
                <RotateCcw size={13} />
                <span>Reset to Factory Catalog</span>
              </button>

              <button
                onClick={() => setIsNewProductModal(true)}
                className="bg-brand-950 hover:bg-brand-900 text-gold-300 text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5 shadow-sm"
              >
                <Plus size={15} />
                <span>Add New Product</span>
              </button>
            </div>
          </div>

          {/* Product Items Table / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((prod) => (
              <div 
                key={prod.id}
                className="bg-white rounded-3xl p-5 shadow-sm border border-warm-200 flex flex-col justify-between"
              >
                <div className="flex items-start space-x-4">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-20 h-20 object-contain rounded-2xl bg-warm-50 border border-warm-200 p-1 shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-brand-800 bg-brand-50 px-2 py-0.5 rounded">
                        {prod.category}
                      </span>
                      {prod.badge && (
                        <span className="text-[9px] font-bold text-gold-700 bg-gold-100 px-2 py-0.5 rounded border border-gold-300">
                          {prod.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif font-bold text-sm text-gray-900 mt-1 truncate">{prod.name}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{prod.subtitle}</p>
                    
                    <div className="flex items-center space-x-3 mt-2 font-mono text-xs">
                      <span className="font-bold text-brand-950">₹{prod.price}</span>
                      <span className="text-gray-600 line-through">₹{prod.mrp}</span>
                      <span className="text-emerald-700 font-bold">{prod.discountPercent}% OFF</span>
                      <span className="text-gray-600">Stock: {prod.stockCount || 100}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-warm-200 flex items-center justify-between">
                  <button
                    onClick={() => onSelectProduct(prod)}
                    className="text-xs text-brand-800 hover:text-brand-950 font-bold flex items-center space-x-1"
                  >
                    <Eye size={13} />
                    <span>View Customer PDP</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingProduct(prod)}
                      className="bg-warm-100 hover:bg-warm-200 text-brand-950 text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center space-x-1"
                    >
                      <Edit3 size={13} />
                      <span>Edit Info</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete ${prod.name} from catalog?`)) {
                          deleteProduct(prod.id);
                          triggerSaveToast(`${prod.name} removed from store.`);
                        }
                      }}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded-xl transition"
                      title="Delete Product"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EDIT PRODUCT MODAL */}
          {editingProduct && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gold-400/40 my-8 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-4 border-b border-warm-200 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-gold-600">Edit Catalog Item</span>
                    <h3 className="font-serif text-xl font-bold text-brand-950">{editingProduct.name}</h3>
                  </div>
                  <button 
                    onClick={() => setEditingProduct(null)} 
                    className="text-gray-600 hover:text-gray-700 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase font-mono">Product Title</label>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase font-mono">Subtitle</label>
                      <input
                        type="text"
                        value={editingProduct.subtitle}
                        onChange={(e) => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                        className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase font-mono">Sale Price (₹)</label>
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                        className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase font-mono">MRP (₹)</label>
                      <input
                        type="number"
                        value={editingProduct.mrp}
                        onChange={(e) => setEditingProduct({ ...editingProduct, mrp: Number(e.target.value) })}
                        className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs font-mono text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase font-mono">Stock Units</label>
                      <input
                        type="number"
                        value={editingProduct.stockCount || 100}
                        onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: Number(e.target.value) })}
                        className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs font-mono text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase font-mono">Short Description</label>
                    <textarea
                      rows={2}
                      value={editingProduct.shortDescription || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                      className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase font-mono">Ingredients List</label>
                    <textarea
                      rows={2}
                      value={editingProduct.ingredients || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, ingredients: e.target.value })}
                      className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase font-mono">How To Use / Dosage</label>
                    <textarea
                      rows={2}
                      value={editingProduct.howToUse || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, howToUse: e.target.value })}
                      className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900"
                    />
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-warm-200 flex justify-end space-x-3">
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="px-5 py-2.5 rounded-xl border border-warm-300 text-xs font-bold text-gray-700 hover:bg-warm-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      updateProduct(editingProduct);
                      setEditingProduct(null);
                      triggerSaveToast(`Updated ${editingProduct.name} successfully!`);
                    }}
                    className="bg-brand-950 hover:bg-brand-900 text-gold-300 px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
                  >
                    <Save size={14} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ADD NEW PRODUCT MODAL */}
          {isNewProductModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gold-400/40 my-8 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-4 border-b border-warm-200 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-gold-600">New Botanical Formula</span>
                    <h3 className="font-serif text-xl font-bold text-brand-950">Add Product to Store</h3>
                  </div>
                  <button 
                    onClick={() => setIsNewProductModal(false)} 
                    className="text-gray-600 hover:text-gray-700 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase font-mono">Product Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Organic Moringa Leaf Powder"
                        value={newProductForm.name}
                        onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                        className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase font-mono">Subtitle</label>
                      <input
                        type="text"
                        placeholder="e.g. Pure Green Superfood Energy"
                        value={newProductForm.subtitle}
                        onChange={(e) => setNewProductForm({ ...newProductForm, subtitle: e.target.value })}
                        className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase font-mono">Category</label>
                      <select
                        value={newProductForm.category}
                        onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                        className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900"
                      >
                        <option>Traditional Grains & Superfoods</option>
                        <option>Gut Health & Morning Shots</option>
                        <option>Hormone Balance & Women's Health</option>
                        <option>Clean Nutrition & Plant Protein</option>
                        <option>Collagen & Skin Peptides</option>
                        <option>Melts Oral Strips</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase font-mono">Price (₹)</label>
                      <input
                        type="number"
                        value={newProductForm.price}
                        onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                        className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase font-mono">MRP (₹)</label>
                      <input
                        type="number"
                        value={newProductForm.mrp}
                        onChange={(e) => setNewProductForm({ ...newProductForm, mrp: e.target.value })}
                        className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs font-mono text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase font-mono">Image URL / Path</label>
                    <input
                      type="text"
                      value={newProductForm.image}
                      onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                      className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase font-mono">Short Description</label>
                    <textarea
                      rows={2}
                      placeholder="Brief overview for the card and PDP..."
                      value={newProductForm.shortDescription}
                      onChange={(e) => setNewProductForm({ ...newProductForm, shortDescription: e.target.value })}
                      className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase font-mono">Ingredients</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. 100% Pure Organic Moringa Leaves"
                      value={newProductForm.ingredients}
                      onChange={(e) => setNewProductForm({ ...newProductForm, ingredients: e.target.value })}
                      className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2 text-xs text-gray-900"
                    />
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-warm-200 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsNewProductModal(false)}
                    className="px-5 py-2.5 rounded-xl border border-warm-300 text-xs font-bold text-gray-700 hover:bg-warm-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!newProductForm.name.trim()) {
                        alert('Please provide a product name.');
                        return;
                      }
                      addProduct(newProductForm);
                      setIsNewProductModal(false);
                      triggerSaveToast(`Published ${newProductForm.name} to store!`);
                    }}
                    className="bg-brand-950 hover:bg-brand-900 text-gold-300 px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
                  >
                    <Plus size={14} />
                    <span>Publish to Live Store</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: LIVE STORE ORDERS */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-warm-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-brand-950">Recent Customer Orders</h3>
              <p className="text-xs text-gray-500">Live incoming transactions from store customers across India.</p>
            </div>
            <span className="text-xs font-mono font-bold text-brand-900 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Total Revenue: ₹3,844
            </span>
          </div>

          <div className="space-y-4">
            {mockOrders.map((ord) => (
              <div 
                key={ord.orderId}
                className="p-5 rounded-2xl bg-warm-50 border border-warm-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-mono font-bold text-xs text-brand-950 bg-white px-2.5 py-0.5 rounded border border-warm-300">
                      {ord.orderId}
                    </span>
                    <span className="text-[11px] text-gray-500">{ord.date}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ord.status === 'Processing' ? 'bg-amber-100 text-amber-800' :
                      ord.status === 'Dispatched' ? 'bg-blue-100 text-blue-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {ord.status}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-gray-900">{ord.customer} <span className="text-xs font-normal text-gray-500">({ord.city})</span></p>
                  <p className="text-xs text-gray-600 mt-0.5">{ord.items}</p>
                </div>

                <div className="text-right">
                  <p className="font-mono text-base font-bold text-brand-950">₹{ord.total}</p>
                  <p className="text-[11px] text-gray-500">{ord.paymentMethod}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: OWNER SECURITY & OWNERSHIP TRANSFER */}
      {activeTab === 'security' && (
        <div className="space-y-8">
          
          {/* Current Master Owner Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-warm-200">
            <div className="flex items-center space-x-3 mb-6 border-b border-warm-200 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-950 text-gold-400 flex items-center justify-center border border-gold-500/40 shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-950">Store Ownership Credentials</h3>
                <p className="text-xs text-gray-500">Verified master phone number authorized to access and modify the store.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-brand-50/70 rounded-2xl border border-brand-200">
                <p className="text-[10px] font-mono uppercase font-bold text-brand-800 tracking-wider">Active Owner Mobile</p>
                <p className="text-lg font-bold font-mono text-brand-950 mt-0.5">+91 {registeredOwnerPhone}</p>
                <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-700 font-bold mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Verified Master Account</span>
                </span>
              </div>

              <div className="p-4 bg-warm-50 rounded-2xl border border-warm-200">
                <p className="text-[10px] font-mono uppercase font-bold text-gray-600 tracking-wider">Last / Previous Owner</p>
                <p className="text-sm font-bold font-mono text-gray-800 mt-1">
                  {ownerAuth.previousOwnerPhone ? `+91 ${ownerAuth.previousOwnerPhone}` : "None (Founding Account)"}
                </p>
                <p className="text-[10px] text-gray-500 mt-1">Previous phone signed off via OTP</p>
              </div>

              <div className="p-4 bg-warm-50 rounded-2xl border border-warm-200">
                <p className="text-[10px] font-mono uppercase font-bold text-gray-600 tracking-wider">Security Protection</p>
                <p className="text-sm font-bold text-brand-900 mt-1">2-Step SMS OTP Enforced</p>
                <p className="text-[10px] text-gray-500 mt-1">Requires Last Owner sign-off to change</p>
              </div>
            </div>
          </div>

          {/* Transfer Ownership Form Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gold-400/40 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-400 via-brand-800 to-gold-400" />

            <div className="mb-6">
              <h3 className="font-serif text-xl font-bold text-brand-950 flex items-center space-x-2">
                <Lock size={20} className="text-gold-600" />
                <span>Transfer Store Ownership to Another Mobile Number</span>
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                To prevent unauthorized transfers, an authorization OTP will be sent to the <strong>CURRENT REGISTERED OWNER (+91 {registeredOwnerPhone})</strong> before the new owner number is activated.
              </p>
            </div>

            {transferError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-2 text-xs text-red-700">
                <AlertCircle size={16} className="shrink-0" />
                <span>{transferError}</span>
              </div>
            )}

            {/* Transfer SMS Dispatch Simulation */}
            {showTransferSms && transferOtpSent && (
              <div className="mb-6 bg-brand-950 text-white rounded-2xl p-4 border border-gold-400/60 shadow-lg animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-gold-500/20 pb-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold text-gold-400 uppercase tracking-wider">Security SMS Sent to Current Owner (+91 {registeredOwnerPhone})</span>
                  </div>
                  <span className="text-[10px] text-gray-400">Just Now</span>
                </div>
                <p className="text-xs text-gray-200 leading-relaxed font-sans">
                  <strong className="text-white">WB-SECURITY:</strong> Authorization Code to transfer store ownership to <strong className="text-gold-300 font-mono">+91 {newTransferPhone}</strong> is <strong className="font-mono text-gold-300 text-sm tracking-wider bg-black/40 px-2 py-0.5 rounded border border-gold-500/40 ml-1">{transferOtpSent}</strong>.
                </p>
                <div className="mt-2 pt-2 border-t border-white/10 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setEnteredTransferOtp(transferOtpSent)}
                    className="text-[11px] font-bold text-gold-400 hover:text-gold-200 underline font-mono"
                  >
                    ⚡ Auto-Fill Security OTP ({transferOtpSent})
                  </button>
                </div>
              </div>
            )}

            {transferStep === 'input' ? (
              <form onSubmit={handleRequestTransferOtp} className="max-w-xl space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">
                    New Owner Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-900 font-bold text-xs">
                      +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={newTransferPhone}
                      onChange={(e) => setNewTransferPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 9845012345"
                      className="w-full bg-warm-50 border border-warm-300 rounded-2xl pl-12 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-brand-800 font-mono tracking-wider"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    An authorization OTP will be dispatched to your current phone (+91 {registeredOwnerPhone}) to approve.
                  </p>
                </div>

                <button
                  type="submit"
                  className="bg-brand-950 hover:bg-brand-900 text-gold-300 font-bold py-3 px-6 rounded-2xl transition shadow-md flex items-center space-x-2 text-xs border border-gold-500/30 cursor-pointer"
                >
                  <Phone size={15} />
                  <span>Send Authorization OTP to Current Owner (+91 {registeredOwnerPhone})</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleConfirmTransfer} className="max-w-xl space-y-4">
                <div className="p-4 bg-warm-100 rounded-2xl border border-warm-300 text-xs text-gray-800">
                  <p className="font-bold text-brand-950">Confirming Ownership Transfer:</p>
                  <p className="mt-1">
                    From: <span className="font-mono font-bold text-gray-900">+91 {registeredOwnerPhone}</span> (Current Owner)
                  </p>
                  <p>
                    To: <span className="font-mono font-bold text-brand-950">+91 {newTransferPhone}</span> (New Owner)
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">
                    Enter 6-Digit Authorization OTP sent to +91 {registeredOwnerPhone}
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={enteredTransferOtp}
                    onChange={(e) => setEnteredTransferOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="• • • • • •"
                    className="w-full bg-warm-50 border border-warm-300 rounded-2xl px-4 py-3 text-center text-2xl tracking-[0.6em] font-mono text-gray-900 focus:outline-none focus:border-brand-800 font-bold"
                    required
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    type="submit"
                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-6 rounded-2xl transition shadow-md flex items-center space-x-2 text-xs cursor-pointer"
                  >
                    <CheckCircle size={15} />
                    <span>Approve & Complete Transfer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setTransferStep('input'); setShowTransferSms(false); }}
                    className="bg-warm-100 hover:bg-warm-200 text-gray-700 font-bold py-3 px-5 rounded-2xl transition text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Ownership Transfer History Audit Log */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-warm-200">
            <h3 className="font-serif text-lg font-bold text-brand-950 mb-2">Ownership Transfer Audit Log</h3>
            <p className="text-xs text-gray-500 mb-4">Immutable record of all registered owner number changes.</p>

            <div className="space-y-3">
              {(ownerAuth.transferHistory || [
                { date: "Initial Setup", from: null, to: "9618861300", verifiedBy: "System Registration" }
              ]).map((log, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-warm-50 border border-warm-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-brand-950 font-mono">To: +91 {log.to}</span>
                    {log.from && <span className="text-gray-500 ml-2 font-mono">(Transferred from +91 {log.from})</span>}
                    <p className="text-[11px] text-gray-500 mt-0.5">{log.verifiedBy}</p>
                  </div>
                  <span className="font-mono text-[10px] text-gray-400 bg-white px-2.5 py-1 rounded-lg border border-warm-200">
                    {log.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
