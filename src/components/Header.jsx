import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  ShieldCheck, 
  Leaf,
  Bot,
  User,
  Microscope,
  Stethoscope,
  Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useOffers } from '../context/OfferContext';
import { brandInfo } from '../data/brandInfo';
import { categories, healthBenefits } from '../data/categories';

export function Header({
  activePage,
  onNavigate,
  onOpenSearch,
  onOpenQuiz,
  onOpenBatchVerifier,
  onOpenChatbot
}) {
  const { totalItems, openCart } = useCart();
  const { wishlist, openWishlist } = useWishlist();
  const { ownerAuth } = useOffers();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageName, categoryFilter = null) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    onNavigate(pageName, categoryFilter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-md py-2.5 border-b border-[#C5A059]/30' 
        : 'bg-[#FAF7F2] py-3.5 border-b border-warm-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-950 p-2 rounded-xl hover:bg-warm-200 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button 
              onClick={onOpenSearch}
              className="text-brand-950 p-2 hover:text-brand-700 transition"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Official Brand Logo */}
          <div 
            className="flex items-center shrink-0 cursor-pointer py-1 pr-4" 
            onClick={() => handleNavClick('home')}
          >
            <img 
              src="/images/logo/logo.png" 
              alt="WellBeingByNatureCo Logo" 
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 shrink-0">
            
            {/* HOME */}
            <button 
              onClick={() => handleNavClick('home')}
              className={`text-xs uppercase tracking-wider font-bold px-3 py-2 rounded-xl transition ${
                activePage === 'home' ? 'text-brand-950 bg-warm-200/70' : 'text-gray-700 hover:text-brand-900 hover:bg-warm-100'
              }`}
            >
              Home
            </button>

            {/* SHOP */}
            <button 
              onClick={() => handleNavClick('shop')}
              className={`text-xs uppercase tracking-wider font-bold px-3 py-2 rounded-xl transition ${
                activePage === 'shop' ? 'text-brand-950 bg-warm-200/70' : 'text-gray-700 hover:text-brand-900 hover:bg-warm-100'
              }`}
            >
              Shop All
            </button>

            {/* HEALTH NEEDS Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('needs')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className="flex items-center space-x-1 text-xs uppercase tracking-wider font-bold text-gray-700 hover:text-brand-900 px-3 py-2 rounded-xl hover:bg-warm-100 transition"
              >
                <span>Health Needs</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'needs' ? 'rotate-180 text-brand-700' : ''}`} />
              </button>

              {activeDropdown === 'needs' && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-3xl shadow-2xl border border-gold-400/30 py-3 px-2 grid grid-cols-1 gap-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-brand-900 border-b border-warm-200 flex items-center justify-between">
                    <span>Shop by Wellness Need</span>
                    <Sparkles size={12} className="text-gold-500" />
                  </div>
                  {healthBenefits.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => handleNavClick('shop', b.title)}
                      className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-warm-50 transition text-left group"
                    >
                      <span className="text-lg group-hover:scale-110 transition">{b.icon}</span>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-900 group-hover:text-brand-900">{b.title}</p>
                        <p className="text-[10px] text-gray-500">{b.count}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ABOUT US */}
            <button 
              onClick={() => handleNavClick('about')}
              className={`text-xs uppercase tracking-wider font-bold px-3 py-2 rounded-xl transition ${
                activePage === 'about' ? 'text-brand-950 bg-warm-200/70' : 'text-gray-700 hover:text-brand-900 hover:bg-warm-100'
              }`}
            >
              About Us
            </button>

            {/* OUR STORY */}
            <button 
              onClick={() => handleNavClick('our-story')}
              className={`text-xs uppercase tracking-wider font-bold px-3 py-2 rounded-xl transition ${
                activePage === 'our-story' ? 'text-brand-950 bg-warm-200/70' : 'text-gray-700 hover:text-brand-900 hover:bg-warm-100'
              }`}
            >
              Our Story
            </button>

            {/* CONTACT */}
            <button 
              onClick={() => handleNavClick('contact')}
              className={`text-xs uppercase tracking-wider font-bold px-3 py-2 rounded-xl transition ${
                activePage === 'contact' ? 'text-brand-950 bg-warm-200/70' : 'text-gray-700 hover:text-brand-900 hover:bg-warm-100'
              }`}
            >
              Contact
            </button>

            {/* OWNER PORTAL */}
            <button 
              onClick={() => handleNavClick('owner')}
              className={`flex items-center space-x-1 text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-full transition border ${
                activePage === 'owner' 
                  ? 'bg-brand-950 text-gold-300 border-gold-400' 
                  : 'bg-warm-100/80 text-brand-900 border-warm-300 hover:bg-warm-200'
              }`}
              title="Store Owner & Admin Section"
            >
              <Lock size={12} className="text-gold-600" />
              <span>Owner Section</span>
            </button>
          </nav>

          {/* Right Action Icons: Search, Chatbot, Wishlist, Cart */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Search Input Bar (Desktop) */}
            <button
              onClick={onOpenSearch}
              className="hidden lg:flex items-center space-x-2 text-xs text-gray-600 bg-white hover:bg-warm-50 border border-warm-300 px-3.5 py-2 rounded-full transition shadow-2xs"
              aria-label="Open Search"
            >
              <Search size={14} className="text-gray-500" />
              <span className="text-gray-500 font-medium">Search "Morning", "Seed"...</span>
              <kbd className="bg-warm-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
            </button>

            {/* AI Chatbot Assistant Icon */}
            <button
              onClick={() => onOpenChatbot(null)}
              className="p-2 text-brand-900 hover:bg-warm-100 rounded-full transition relative group"
              title="Ask Dr. Botanica AI"
              aria-label="Open Wellness Chatbot"
            >
              <Bot size={21} className="text-brand-900 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white"></span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={openWishlist}
              className="relative p-2 text-gray-700 hover:text-brand-900 hover:bg-warm-100 rounded-full transition"
              aria-label="Wishlist"
            >
              <Heart size={21} className={wishlist.length > 0 ? "fill-coral-500 text-coral-500" : ""} />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-coral-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center space-x-2 bg-brand-950 hover:bg-brand-900 text-gold-300 px-4 py-2 rounded-full transition shadow-md border border-gold-500/30 group"
              aria-label="View Cart"
            >
              <ShoppingBag size={18} className="text-gold-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold hidden sm:inline uppercase tracking-wider text-white">Cart</span>
              <span className="bg-coral-500 text-white rounded-full text-[11px] font-extrabold px-2 py-0.5 min-w-[20px] text-center shadow-xs">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Slide-out Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#FAF7F2] border-b border-warm-300 shadow-2xl p-5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4 duration-200 z-50">
          <div className="space-y-4">
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenQuiz(); }}
                className="bg-brand-950 text-white p-3 rounded-2xl flex flex-col items-start border border-gold-500/40 shadow-xs"
              >
                <Sparkles size={16} className="text-gold-400 mb-1" />
                <span className="text-xs font-bold">Routine Quiz</span>
                <span className="text-[10px] text-gold-300 font-mono">Personalized Match</span>
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenChatbot(null); }}
                className="bg-white text-gray-900 p-3 rounded-2xl flex flex-col items-start border border-warm-300 shadow-xs"
              >
                <Bot size={16} className="text-brand-700 mb-1" />
                <span className="text-xs font-bold">Dr. Botanica AI</span>
                <span className="text-[10px] text-gray-500 font-mono">Product Advisor</span>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 pt-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'shop', label: 'Shop All Products' },
                { id: 'about', label: 'About Us' },
                { id: 'our-story', label: 'Our Story' },
                { id: 'contact', label: 'Contact & Support' },
                { id: 'owner', label: 'Store Owner Portal 🔐' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                    activePage === link.id ? 'bg-brand-950 text-gold-300' : 'text-gray-800 hover:bg-warm-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-warm-300">
              <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500 px-1 mb-2 font-mono">Shop By Need</p>
              <div className="grid grid-cols-2 gap-2">
                {healthBenefits.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleNavClick('shop', b.title)}
                    className="flex items-center space-x-2 p-2 rounded-xl bg-white hover:bg-brand-50 border border-warm-200 text-xs font-semibold text-gray-800 text-left"
                  >
                    <span>{b.icon}</span>
                    <span className="truncate">{b.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-warm-300">
              <div className="p-3 bg-brand-50 rounded-xl text-[11px] text-brand-950 border border-brand-200">
                <p className="font-bold flex items-center space-x-1">
                  <ShieldCheck size={14} className="text-brand-700" />
                  <span>FSSAI License: {brandInfo.fssaiNumber}</span>
                </p>
                <p className="text-[10px] text-brand-700 mt-0.5">Manufactured & Marketed by {brandInfo.legalName}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
