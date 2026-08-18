import React, { useState, useEffect } from 'react';
import { useOffers } from '../context/OfferContext';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export function AnnouncementBar() {
  const { offers } = useOffers();
  const announcements = offers?.announcements || [
    "FREE SHIPPING ON ORDERS ABOVE ₹999",
    "100% NATURAL • CLEAN • CAREFULLY SOURCED",
    "USE CODE 'NATURE10' FOR EXTRA 10% OFF"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, offers?.announcementSpeed || 4000);
    return () => clearInterval(timer);
  }, [announcements.length, offers?.announcementSpeed]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? announcements.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const currentMsg = announcements[currentIndex] || announcements[0] || "Natural Nutrition. Everyday Wellness.";

  return (
    <div className="bg-[#1C2A1E] text-warm-100 text-xs py-2 px-4 relative overflow-hidden border-b border-[#2D3E30] z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Arrow */}
        <button 
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="text-gray-300 hover:text-white transition p-1 hidden sm:block"
        >
          <ChevronLeft size={15} />
        </button>

        {/* Dynamic Announcement Message */}
        <div className="flex-1 text-center font-medium tracking-wider uppercase flex items-center justify-center space-x-2 text-[11px] font-mono">
          <Sparkles size={12} className="text-[#C5A059] animate-pulse hidden xs:inline" />
          <span className="truncate">{currentMsg}</span>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={handleNext}
          aria-label="Next announcement"
          className="text-gray-300 hover:text-white transition p-1 hidden sm:block"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
