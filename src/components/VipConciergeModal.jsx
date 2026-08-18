import React, { useState } from 'react';
import { X, Sparkles, Calendar, Clock, User, Phone, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { brandInfo } from '../data/brandInfo';

export const VipConciergeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    healthGoal: 'Gut Health & Bloating Relief',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] w-full max-w-lg rounded-3xl shadow-2xl border border-gold-400/40 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-brand-950 text-white p-6 border-b border-gold-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-brand-900 border border-gold-400/50 flex items-center justify-center text-gold-400 font-serif font-bold">
              VIP
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 font-bold">
                Private Wellness Consultation
              </span>
              <h2 className="text-xl font-serif font-bold text-white">
                Bespoke Clinical Concierge
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 size={36} />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-gray-900">Consultation Confirmed</h3>
                <p className="text-xs text-gray-600 mt-1 max-w-xs mx-auto">
                  Our Senior Clinical Nutritionist will connect with you on WhatsApp at <strong>{formData.phone}</strong>.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                Enjoy a complimentary 1-on-1 session with our integrative nutritionists to calibrate your heirloom grain intake and botanical regimen.
              </p>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-warm-300 rounded-xl p-3 text-xs focus:outline-hidden focus:border-brand-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp / Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-warm-300 rounded-xl p-3 text-xs focus:outline-hidden focus:border-brand-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Primary Health Priority</label>
                <select
                  value={formData.healthGoal}
                  onChange={(e) => setFormData({ ...formData, healthGoal: e.target.value })}
                  className="w-full bg-white border border-warm-300 rounded-xl p-3 text-xs focus:outline-hidden focus:border-brand-700 font-medium"
                >
                  <option>Gut Health & Bloating Relief</option>
                  <option>Hormone Balance & 28-Day Seed Cycling</option>
                  <option>Heirloom Grain Nutrition & Glycemic Wellness</option>
                  <option>Skin Collagen & Youth Radiance</option>
                  <option>Restorative Sleep & Stress Management</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Preferred Time Window</label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full bg-white border border-warm-300 rounded-xl p-3 text-xs focus:outline-hidden focus:border-brand-700 font-medium"
                >
                  <option>Morning (10:00 AM - 1:00 PM)</option>
                  <option>Afternoon (2:00 PM - 5:00 PM)</option>
                  <option>Evening (6:00 PM - 8:00 PM)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-900 hover:bg-brand-800 text-gold-300 font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 border border-gold-400/40 mt-2"
              >
                <Sparkles size={16} className="text-gold-400" />
                <span>Book Complimentary VIP Session</span>
              </button>

              <p className="text-[10px] text-center text-gray-500 pt-1">
                🔒 100% Confidential • Advised by Certified Ayurvedic Doctors & Dietitians
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
