import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Search, X, Star, ArrowRight, Sparkles, Tag } from 'lucide-react';

export const SearchModal = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === '' ? [] : products.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const popularSearches = [
    "Rajamudi Red Rice",
    "Morning Shots",
    "Seed Cycling",
    "Gut Health",
    "Marine Collagen",
    "Hormone Balance"
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4 pb-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-warm-200 overflow-hidden">
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-warm-200 flex items-center space-x-3">
          <Search size={22} className="text-brand-700 shrink-0" />
          <input
            type="text"
            placeholder="Search products by name, benefit, or ingredient (e.g., Amla, Rice, Seed)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-base sm:text-lg focus:outline-hidden text-gray-900 placeholder-gray-400"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={18} />
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-xs bg-warm-100 hover:bg-warm-200 text-gray-700 px-2.5 py-1.5 rounded-md font-medium transition"
          >
            ESC
          </button>
        </div>

        {/* Search Content */}
        <div className="max-h-[65vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center space-x-1.5">
                <Sparkles size={13} className="text-gold-500" />
                <span>Trending Wellness Searches</span>
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs bg-brand-50/80 hover:bg-brand-100 text-brand-900 px-3 py-1.5 rounded-full border border-brand-200 transition font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Featured Flagship Products
              </p>
              <div className="space-y-2">
                {products.filter((p) => p.isAuthenticFlagship).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-warm-50 border border-warm-200 transition group cursor-pointer"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded-lg bg-warm-100 border border-warm-200" 
                      />
                      <div>
                        <p className="text-xs font-bold text-gray-900 group-hover:text-brand-800 transition">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-gray-500 flex items-center space-x-2">
                          <span>{product.category}</span>
                          <span>•</span>
                          <span className="font-bold text-brand-900">₹{product.price}</span>
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-gray-400 group-hover:text-brand-800 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-base font-bold text-gray-800 mb-1">No products found for "{query}"</p>
              <p className="text-xs text-gray-500">Try searching for "Rajamudi", "Morning", "Seed", or "Collagen".</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Found {filteredProducts.length} result(s)
              </p>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-50/50 border border-warm-200 transition group cursor-pointer"
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                >
                  <div className="flex items-center space-x-3.5">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-14 h-14 object-cover rounded-lg bg-warm-100 border border-warm-200 shrink-0" 
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        {product.badge && (
                          <span className="bg-brand-100 text-brand-800 text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded">
                            {product.badge}
                          </span>
                        )}
                        <span className="text-[10px] text-gray-500 flex items-center">
                          <Star size={10} className="fill-gold-500 text-gold-500 mr-0.5" />
                          {product.rating}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-gray-900 group-hover:text-brand-800 transition">
                        {product.name}
                      </p>
                      <p className="text-xs text-brand-900 font-extrabold">
                        ₹{product.price}{" "}
                        <span className="text-[11px] text-gray-400 line-through font-normal">₹{product.mrp}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                      onClose();
                    }}
                    className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition shrink-0"
                  >
                    Add +
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
