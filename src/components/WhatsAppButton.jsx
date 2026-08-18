import React from 'react';
import { brandInfo } from '../data/brandInfo';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const whatsappUrl = `https://wa.me/${brandInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(brandInfo.whatsappText)}`;

  return (
    <aside aria-label="Support Contacts" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 group"
        aria-label="Chat on WhatsApp with WellBeingByNatureCo"
      >
        <MessageCircle size={22} className="group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold hidden sm:inline">Ask Nutritionist</span>
      </a>
    </aside>
  );
};
