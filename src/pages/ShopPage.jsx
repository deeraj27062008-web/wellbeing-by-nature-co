import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  ChevronDown, 
  SlidersHorizontal, 
  Search, 
  Sparkles, 
  X, 
  Check,
  ArrowUpDown,
  Grid3X3,
  LayoutGrid
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { categories, healthBenefits } from '../data/categories';

export function ShopPage({ onSelectProduct, initialCategory = null, initialConcern = null }) {
  const { products } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedConcern, setSelectedConcern] = useState(initialConcern);
  const [priceRange, setPriceRange] = useState(3000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating' | 'discount'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = (p.subtitle || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q);
        const matchesTags = (p.tags || []).some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesTags) return false;
      }

      // Category match
      if (selectedCategory) {
        if (p.category !== selectedCategory) return false;
      }

      // Concern match
      if (selectedConcern) {
        if (p.concern !== selectedConcern) return false;
      }

      // Price limit
      if (p.price > priceRange) return false;

      // In Stock
      if (inStockOnly && !p.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return 0; // 'featured' default
    });
  }, [products, searchQuery, selectedCategory, selectedConcern, priceRange, inStockOnly, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedConcern(null);
    setPriceRange(3000);
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory || selectedConcern || priceRange < 3000 || inStockOnly || searchQuery;

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs text-gray-500 font-mono mb-2">
            <span>HOME</span>
            <span>/</span>
            <span className="text-brand-950 font-bold">SHOP WELLNESS CATALOG</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-950">
            Discover Natural Nutrition
          </h1>
          <p className="text-sm text-gray-600 mt-2 max-w-2xl">
            Thoughtfully formulated superfoods, traditional heirloom grains, and morning elixirs crafted for clean, everyday vitality.
          </p>
        </div>

        {/* Search & Mobile Filter Bar */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-warm-200 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ingredient, benefit, or product name..."
              className="w-full bg-warm-50 border border-warm-300 rounded-full pl-11 pr-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Controls: Sort & Mobile Filter Toggle */}
          <div className="flex items-center space-x-3">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex-1 flex items-center justify-center space-x-2 bg-warm-100 hover:bg-warm-200 text-brand-950 px-4 py-2.5 rounded-full text-xs font-bold transition"
            >
              <SlidersHorizontal size={14} />
              <span>Filters {hasActiveFilters ? '(Active)' : ''}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 bg-warm-50 border border-warm-300 rounded-full px-4 py-2 text-xs">
              <ArrowUpDown size={14} className="text-gray-500" />
              <span className="text-gray-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-gray-900 font-bold focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Savings</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="flex items-center flex-wrap gap-2 mb-6 animate-in fade-in duration-150">
            <span className="text-xs text-gray-500 font-mono font-bold uppercase">Active Filters:</span>
            
            {selectedCategory && (
              <span className="inline-flex items-center space-x-1.5 bg-brand-950 text-gold-300 text-xs font-semibold px-3 py-1 rounded-full">
                <span>{selectedCategory}</span>
                <button onClick={() => setSelectedCategory(null)}><X size={12} /></button>
              </span>
            )}

            {selectedConcern && (
              <span className="inline-flex items-center space-x-1.5 bg-brand-950 text-gold-300 text-xs font-semibold px-3 py-1 rounded-full">
                <span>{selectedConcern}</span>
                <button onClick={() => setSelectedConcern(null)}><X size={12} /></button>
              </span>
            )}

            {priceRange < 3000 && (
              <span className="inline-flex items-center space-x-1.5 bg-brand-950 text-gold-300 text-xs font-semibold px-3 py-1 rounded-full">
                <span>Under ₹{priceRange}</span>
                <button onClick={() => setPriceRange(3000)}><X size={12} /></button>
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center space-x-1.5 bg-brand-950 text-gold-300 text-xs font-semibold px-3 py-1 rounded-full">
                <span>In Stock Only</span>
                <button onClick={() => setInStockOnly(false)}><X size={12} /></button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs text-coral-600 hover:text-coral-700 underline font-semibold ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Catalog Grid & Sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* DESKTOP SIDEBAR FILTERS */}
          <div className="hidden md:block space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-warm-200 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-warm-200">
                <span className="font-serif font-bold text-base text-brand-950">Filters</span>
                {hasActiveFilters && (
                  <button onClick={clearAllFilters} className="text-[11px] text-coral-600 hover:underline font-semibold">
                    Reset
                  </button>
                )}
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 font-mono">Collections</h4>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left text-xs py-1.5 px-2.5 rounded-xl transition flex items-center justify-between ${
                      selectedCategory === null ? 'bg-brand-950 text-gold-300 font-bold' : 'text-gray-700 hover:bg-warm-50'
                    }`}
                  >
                    <span>All Collections</span>
                    <span className="text-[10px] opacity-70">({products.length})</span>
                  </button>
                  {Array.from(new Set(products.map((p) => p.category))).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                      className={`w-full text-left text-xs py-1.5 px-2.5 rounded-xl transition flex items-center justify-between ${
                        selectedCategory === cat ? 'bg-brand-950 text-gold-300 font-bold' : 'text-gray-700 hover:bg-warm-50'
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      <span className="text-[10px] opacity-70">
                        ({products.filter((p) => p.category === cat).length})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Health Concerns */}
              <div className="pt-4 border-t border-warm-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 font-mono">Wellness Concern</h4>
                <div className="space-y-1.5">
                  {Array.from(new Set(products.map((p) => p.concern).filter(Boolean))).map((con) => (
                    <button
                      key={con}
                      onClick={() => setSelectedConcern(selectedConcern === con ? null : con)}
                      className={`w-full text-left text-xs py-1.5 px-2.5 rounded-xl transition flex items-center justify-between ${
                        selectedConcern === con ? 'bg-brand-950 text-gold-300 font-bold' : 'text-gray-700 hover:bg-warm-50'
                      }`}
                    >
                      <span className="truncate">{con}</span>
                      <span className="text-[10px] opacity-70">
                        ({products.filter((p) => p.concern === con).length})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price Slider */}
              <div className="pt-4 border-t border-warm-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 font-mono">Max Price</h4>
                  <span className="font-mono text-xs font-bold text-brand-950">₹{priceRange}</span>
                </div>
                <input
                  type="range"
                  min={300}
                  max={3000}
                  step={50}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-brand-900 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-600 font-mono mt-1">
                  <span>₹300</span>
                  <span>₹3,000</span>
                </div>
              </div>

              {/* In Stock Toggle */}
              <div className="pt-4 border-t border-warm-200">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded accent-brand-900 w-4 h-4"
                  />
                  <span className="text-xs font-medium text-gray-800">In-Stock Formulations Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* PRODUCT LISTINGS */}
          <div className="md:col-span-3">
            
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-warm-200">
                <Sparkles size={36} className="text-gold-500 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-brand-950">No Formulations Match Your Filter</h3>
                <p className="text-xs text-gray-500 mt-2 mb-6">
                  Try adjusting your price range or clearing active filters to see our full range.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-brand-950 hover:bg-brand-900 text-gold-300 text-xs font-bold px-6 py-2.5 rounded-full transition shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 px-1">
                  <span>Showing <strong>{filteredProducts.length}</strong> botanical products</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={onSelectProduct}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER MODAL BOTTOM SHEET */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end">
          <div className="w-full bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-warm-200 mb-4">
              <span className="font-serif font-bold text-lg text-brand-950">Filter Formulations</span>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-gray-500">
                <X size={20} />
              </button>
            </div>

            {/* Mobile Category Selection */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 font-mono">Collections</h4>
              <div className="flex flex-wrap gap-1.5">
                {Array.from(new Set(products.map((p) => p.category))).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    className={`text-xs px-3 py-1.5 rounded-xl border transition ${
                      selectedCategory === cat ? 'bg-brand-950 text-gold-300 font-bold border-brand-950' : 'bg-warm-50 text-gray-800 border-warm-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price Slider */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Max Price</span>
                <span>₹{priceRange}</span>
              </div>
              <input
                type="range"
                min={300}
                max={3000}
                step={50}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-brand-900"
              />
            </div>

            <div className="flex items-center space-x-3 pt-4 border-t border-warm-200">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 text-xs font-bold text-gray-700 bg-warm-100 rounded-2xl"
              >
                Clear All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 text-xs font-bold text-gold-300 bg-brand-950 rounded-2xl"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
