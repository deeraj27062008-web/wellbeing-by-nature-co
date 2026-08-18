import React from 'react';
import { categories } from '../data/categories';

export const CategoryRoundels = ({ onSelectCategory, activeCategory }) => {
  return (
    <section className="bg-white py-8 border-b border-warm-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-brand-700 uppercase">
              Curated Formulations
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
              Shop by Category
            </h2>
          </div>
          <a
            href="#products-section"
            className="text-xs sm:text-sm font-bold text-brand-800 hover:text-brand-600 flex items-center space-x-1"
          >
            <span>View All</span>
            <span>→</span>
          </a>
        </div>

        {/* Categories Horizontal Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-1">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.name || activeCategory === cat.shortName;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className="flex flex-col items-center group focus:outline-hidden text-center p-3 rounded-2xl hover:bg-warm-50/80 transition-all cursor-pointer"
              >
                {/* Roundel Image Container */}
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 transition-all duration-300 ${
                  isSelected 
                    ? 'ring-3 ring-brand-800 shadow-lg scale-105 bg-brand-50' 
                    : 'bg-warm-100 group-hover:bg-brand-50 border border-warm-200 group-hover:scale-105 group-hover:shadow-md'
                }`}>
                  <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-inner">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Category Title */}
                <span className={`mt-2.5 text-xs sm:text-sm font-bold transition-colors line-clamp-1 ${
                  isSelected ? 'text-brand-900 font-extrabold' : 'text-gray-800 group-hover:text-brand-900'
                }`}>
                  {cat.shortName}
                </span>
                <span className="text-[10px] text-gray-500 line-clamp-1 max-w-[140px] mt-0.5 hidden sm:block">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
