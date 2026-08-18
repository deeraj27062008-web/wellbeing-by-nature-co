import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryRoundels } from './components/CategoryRoundels';
import { ProductTabs } from './components/ProductTabs';
import { SensoryRitualSection } from './components/SensoryRitualSection';
import { ScienceSection } from './components/ScienceSection';
import { DoctorBoard } from './components/DoctorBoard';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CertificationsBar } from './components/CertificationsBar';
import { Footer } from './components/Footer';

// Pages
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OwnerPortalPage } from './pages/OwnerPortalPage';
import { PolicyPage } from './pages/PolicyPage';

// Modals & Drawers
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { RoutineQuizModal } from './components/RoutineQuizModal';
import { ProductQuickView } from './components/ProductQuickView';
import { CheckoutModal } from './components/CheckoutModal';
import { BatchVerifierModal } from './components/BatchVerifierModal';
import { VipConciergeModal } from './components/VipConciergeModal';
import { ProductChatbot } from './components/ProductChatbot';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Bot, Sparkles } from 'lucide-react';
import { useProducts } from './context/ProductContext';

export function App() {
  const { products } = useProducts();

  // Navigation State
  const [currentPage, setCurrentPage] = useState('home'); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [shopCategoryFilter, setShopCategoryFilter] = useState(null);
  const [shopConcernFilter, setShopConcernFilter] = useState(null);

  // Modals State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBatchVerifierOpen, setIsBatchVerifierOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // AI Chatbot State
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatbotProduct, setChatbotProduct] = useState(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProduct]);

  // Unified Page Router
  const handleNavigate = (pageName, extraParam = null) => {
    // If extraParam is a product object or id
    if (pageName === 'product-detail') {
      if (typeof extraParam === 'object' && extraParam !== null) {
        setSelectedProduct(extraParam);
      } else if (typeof extraParam === 'string') {
        const found = products.find(p => p.id === extraParam || p.slug === extraParam);
        setSelectedProduct(found || products[0]);
      }
      setCurrentPage('product-detail');
      return;
    }

    // If navigating to shop with a category/concern filter
    if (pageName === 'shop') {
      if (typeof extraParam === 'string') {
        setShopCategoryFilter(extraParam);
      } else {
        setShopCategoryFilter(null);
      }
      setShopConcernFilter(null);
      setCurrentPage('shop');
      return;
    }

    // General Navigation
    setShopCategoryFilter(null);
    setShopConcernFilter(null);
    setCurrentPage(pageName);
  };

  // Open Chatbot for a specific product or general advice
  const handleOpenChatbot = (product = null) => {
    setChatbotProduct(product || selectedProduct || null);
    setIsChatbotOpen(true);
  };

  // Quick View vs Full Page Navigation
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#14201C] selection:bg-[#C5A059]/30 selection:text-brand-950">
      {/* Top Banner Announcement Ticker */}
      <AnnouncementBar />

      {/* Luxury Sticky Header */}
      <Header
        activePage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenBatchVerifier={() => setIsBatchVerifierOpen(true)}
        onOpenChatbot={() => handleOpenChatbot(null)}
      />

      {/* Main Page Content Router */}
      <main className="flex-1">
        {/* 1. HOME PAGE */}
        {currentPage === 'home' && (
          <div>
            <HeroCarousel
              onOpenQuiz={() => setIsQuizOpen(true)}
              onOpenBatchVerifier={() => setIsBatchVerifierOpen(true)}
              onSelectProduct={handleSelectProduct}
            />

            <CategoryRoundels
              activeCategory={shopCategoryFilter}
              onSelectCategory={(cat) => handleNavigate('shop', cat)}
            />

            <ProductTabs
              selectedCategory={shopCategoryFilter}
              onClearCategory={() => setShopCategoryFilter(null)}
              onQuickView={handleSelectProduct}
            />

            <SensoryRitualSection
              onSelectProduct={handleSelectProduct}
            />

            <ScienceSection />

            <DoctorBoard />

            <TestimonialsSection />

            <CertificationsBar />
          </div>
        )}

        {/* 2. SHOP PAGE */}
        {currentPage === 'shop' && (
          <ShopPage
            initialCategory={shopCategoryFilter}
            initialConcern={shopConcernFilter}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {/* 3. PRODUCT DETAIL PAGE */}
        {currentPage === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct || products[0]}
            onOpenChatbot={() => handleOpenChatbot(selectedProduct || products[0])}
            onSelectProduct={handleSelectProduct}
            onOpenBatchVerifier={() => setIsBatchVerifierOpen(true)}
          />
        )}

        {/* 4. ABOUT US */}
        {currentPage === 'about' && (
          <AboutPage onGoShop={() => handleNavigate('shop')} />
        )}

        {/* 5. OUR STORY */}
        {currentPage === 'our-story' && (
          <OurStoryPage onGoShop={() => handleNavigate('shop')} />
        )}

        {/* 6. CONTACT US */}
        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {/* 7. CART PAGE */}
        {currentPage === 'cart' && (
          <CartPage
            onGoShop={() => handleNavigate('shop')}
            onProceedToCheckout={() => handleNavigate('checkout')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {/* 8. WISHLIST PAGE */}
        {currentPage === 'wishlist' && (
          <WishlistPage
            onGoShop={() => handleNavigate('shop')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {/* 9. CHECKOUT PAGE */}
        {currentPage === 'checkout' && (
          <CheckoutPage
            onGoHome={() => handleNavigate('home')}
            onGoCart={() => handleNavigate('cart')}
          />
        )}

        {/* 10. OWNER PORTAL & OTP AUTH */}
        {currentPage === 'owner' && (
          <OwnerPortalPage
            onSelectProduct={handleSelectProduct}
            onGoHome={() => handleNavigate('home')}
          />
        )}

        {/* 11. POLICY PAGES */}
        {currentPage === 'policy-privacy' && <PolicyPage policyType="privacy" />}
        {currentPage === 'policy-terms' && <PolicyPage policyType="terms" />}
        {currentPage === 'policy-shipping' && <PolicyPage policyType="shipping" />}
        {currentPage === 'policy-refund' && <PolicyPage policyType="refund" />}
      </main>

      {/* Comprehensive Brand Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating AI Botanical Advisor (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => handleOpenChatbot(null)}
          className="group flex items-center bg-brand-950 hover:bg-brand-900 text-gold-300 px-4 py-3 rounded-full shadow-2xl border border-gold-400/40 transition-all transform hover:scale-105 cursor-pointer"
          aria-label="Open AI Wellness Advisor"
        >
          <div className="relative flex items-center justify-center mr-2">
            <Bot size={20} className="text-gold-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-[11px] font-bold uppercase tracking-wider text-white flex items-center">
              <span>Dr. Botanica AI</span>
              <Sparkles size={11} className="text-gold-400 ml-1" />
            </p>
            <p className="text-[9px] text-gold-300/80 font-mono">Product & Dosage Advisor</p>
          </div>
        </button>
      </div>

      {/* Floating WhatsApp Support (Bottom Right) */}
      <WhatsAppButton />

      {/* Global Modals & Slide-Over Drawers */}
      <CartDrawer onSelectProduct={handleSelectProduct} onProceedToCheckout={() => handleNavigate('checkout')} />
      <WishlistDrawer onSelectProduct={handleSelectProduct} />
      
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      <RoutineQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      <BatchVerifierModal
        isOpen={isBatchVerifierOpen}
        onClose={() => setIsBatchVerifierOpen(false)}
      />

      <VipConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />

      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onViewFullPage={handleSelectProduct}
      />

      <CheckoutModal onGoCheckout={() => handleNavigate('checkout')} />

      {/* Interactive AI Wellness Advisor */}
      <ProductChatbot
        currentProduct={chatbotProduct}
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
    </div>
  );
}

export default App;
