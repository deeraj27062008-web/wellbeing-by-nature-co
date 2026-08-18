import React, { useState } from 'react';
import { reviews } from '../data/reviews';
import { Star, CheckCircle, Quote, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialsSection = () => {
  const [filterRating, setFilterRating] = useState('all');

  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews.filter((r) => r.rating === parseInt(filterRating));

  return (
    <section className="py-16 bg-white border-b border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              <Star size={12} className="fill-amber-500 text-amber-500" />
              <span>Real Customer Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-950 tracking-tight">
              Loved by 500,000+ Wellness Seekers
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Verified buyers sharing their transformative experiences with Rajamudi, Morning Shots, and Seed Cycling.
            </p>
          </div>

          {/* Rating Summary Pill */}
          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-warm-200 flex items-center space-x-4 shrink-0">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-brand-950">4.92</p>
              <div className="flex text-amber-500 text-xs">
                {"★★★★★"}
              </div>
            </div>
            <div className="border-l border-warm-300 pl-4 text-xs text-gray-600">
              <p className="font-bold text-gray-900">Over 15,000+ Reviews</p>
              <p className="text-[11px] text-gray-500">100% Verified Purchases</p>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF8F5] p-6 rounded-2xl border border-warm-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Rating & Verified */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 text-sm">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle size={10} />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                {/* Product Tag */}
                <span className="inline-block text-[11px] font-bold text-brand-800 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200 truncate max-w-full">
                  {rev.product}
                </span>

                {/* Review Title & Body */}
                <h4 className="font-bold text-sm text-gray-900 leading-snug">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {rev.text}
                </p>
              </div>

              {/* Author & Location */}
              <div className="pt-4 mt-4 border-t border-warm-200 flex items-center justify-between text-xs text-gray-500">
                <span className="font-bold text-gray-900">{rev.name}, {rev.location}</span>
                <span className="text-[10px]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
