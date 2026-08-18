import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export function ProductTabs({ onQuickView, selectedCategory, onClearCategory, onGoShop }) {
  const { products } = useProducts();
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Formulations' },
    { id: 'flagship', label: '⭐ Flagship Heroes' },
    { id: 'hormone', label: 'Hormone Balance' },
    { id: 'gut', label: 'Gut Health' },
    { id: 'grains', label: 'Heirloom Grains & Millets' }
  ];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory) {
      return (
        product.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        product.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (product.concern && product.concern.toLowerCase().includes(selectedCategory.toLowerCase()))
      );
    }

    if (activeTab === 'all') return true;
    if (activeTab === 'flagship') return product.isAuthenticFlagship;
    if (activeTab === 'hormone') return product.category.includes('Hormone') || product.id.includes('seed-cycling');
    if (activeTab === 'gut') return product.category.includes('Gut') || product.id.includes('morning-shots');
    if (activeTab === 'grains') return product.category.includes('Grain') || product.id.includes('rajamudi') || product.id.includes('millet');
    return true;
  });

  return (
    <section id="products-section" className="py-14 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 bg-brand-100/70 border border-brand-200 text-brand-900 text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 shadow-2xs font-mono">
            <Sparkles size={13} className="text-gold-600" />
            <span>NURTURE • BALANCE • THRIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-950 tracking-tight">
            Featured Botanical Formulations
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-xl mx-auto">
            100% clean-label heirloom superfoods, morning gut drink mixes, and 28-day seed cycling protocols.
          </p>
        </div>

        {/* Category active banner if roundel clicked */}
        {selectedCategory && (
          <div className="mb-6 flex items-center justify-between p-3.5 bg-brand-50 border border-brand-200 rounded-2xl">
            <p className="text-xs sm:text-sm font-bold text-brand-900">
              Filtering by: <span className="text-coral-600 font-mono font-extrabold">"{selectedCategory}"</span>
            </p>
            <button
              onClick={onClearCategory}
              className="text-xs font-bold text-brand-800 underline hover:text-brand-950"
            >
              Clear filter (Show All)
            </button>
          </div>
        )}

        {/* Tab Filters */}
        {!selectedCategory && (
          <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-brand-950 text-gold-300 shadow-md border border-gold-400/40'
                    : 'bg-white text-gray-700 hover:bg-warm-100 border border-warm-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* View All Shop CTA */}
        <div className="text-center mt-12">
          <button
            onClick={onGoShop}
            className="bg-brand-950 hover:bg-brand-900 text-gold-300 font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition shadow-md inline-flex items-center space-x-2 border border-gold-500/30"
          >
            <span>View All Botanical Products</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </section>
  );
}
