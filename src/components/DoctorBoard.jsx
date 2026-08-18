import React from 'react';
import { doctors } from '../data/doctors';
import { Sparkles, Quote, Stethoscope } from 'lucide-react';

export const DoctorBoard = () => {
  return (
    <section className="py-16 bg-[#FAF8F5] border-b border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-brand-100 text-brand-900 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3">
            <Stethoscope size={14} className="text-brand-700" />
            <span>Clinical Formulation Board</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-950 tracking-tight">
            The Experts Behind the Science
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Every ingredient ratio, micronutrient chelation, and botanical dosage is clinically validated by our international panel.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-warm-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-brand-700 p-0.5 shadow-sm">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-serif font-bold text-base text-gray-900">{doc.name}</h3>
                  <p className="text-[11px] font-bold text-brand-800 uppercase tracking-wider mt-0.5">{doc.location}</p>
                  <p className="text-xs text-gray-600 font-medium mt-1">{doc.role}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{doc.credentials}</p>
                </div>
                <div className="bg-warm-50 p-3 rounded-xl border border-warm-100 text-[11px] text-gray-600 italic leading-relaxed relative">
                  <Quote size={12} className="text-brand-300 absolute top-2 left-2" />
                  <p className="pl-3.5">{doc.quote}</p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-warm-100 text-center">
                <span className="text-[10px] text-brand-700 font-bold uppercase tracking-wider">
                  Verified Formulation Advisor
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
