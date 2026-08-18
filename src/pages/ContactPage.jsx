import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCircle, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { brandInfo } from '../data/brandInfo';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [ticketId, setTicketId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `WBN-CARE-${Math.floor(10000 + Math.random() * 90000)}`;
      setTicketId(generatedId);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono font-bold uppercase text-gold-600 tracking-widest bg-gold-100/60 px-3 py-1 rounded-full border border-gold-300">
            CONNECT WITH WELLBEINGBYNATURECO
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-950">
            We Are Here To Nurture Your Journey
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
            Have questions about an order, dosage recommendations, or bulk corporate gifting? Our botanical wellness team is always ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Contact Channels & Addresses */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Cards */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-warm-200 space-y-6">
              <h3 className="font-serif text-xl font-bold text-brand-950">Customer Care & Support</h3>
              
              <div className="space-y-4 text-xs">
                {/* Email */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 uppercase font-mono text-[10px]">Email Assistance</p>
                    <a href={`mailto:${brandInfo.email}`} className="text-brand-800 hover:underline font-semibold text-xs">
                      {brandInfo.email}
                    </a>
                    <p className="text-[11px] text-gray-500">Response within 2-4 business hours</p>
                  </div>
                </div>

                {/* WhatsApp Support */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 uppercase font-mono text-[10px]">Direct WhatsApp Helpline</p>
                    <a 
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(brandInfo.whatsappText)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-800 hover:underline font-bold text-xs flex items-center space-x-1"
                    >
                      <span>+91 98765 43210</span>
                      <ExternalLink size={11} />
                    </a>
                    <p className="text-[11px] text-gray-500">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-gold-50 text-gold-700 flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 uppercase font-mono text-[10px]">Hours of Operation</p>
                    <p className="text-gray-800 font-semibold">Monday – Saturday: 9:00 AM – 7:00 PM</p>
                    <p className="text-[11px] text-gray-500">Sunday: Closed (Orders dispatched next morning)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Physical Addresses */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-warm-200 space-y-4">
              <h3 className="font-serif text-lg font-bold text-brand-950">Manufacturing & Offices</h3>
              
              <div className="space-y-4 text-xs">
                <div className="p-3.5 bg-warm-50 rounded-2xl border border-warm-200">
                  <p className="font-mono font-bold text-[10px] uppercase text-brand-800">Corporate Headquarters</p>
                  <p className="text-gray-800 font-medium mt-1">{brandInfo.corporateAddress}</p>
                </div>

                <div className="p-3.5 bg-warm-50 rounded-2xl border border-warm-200">
                  <p className="font-mono font-bold text-[10px] uppercase text-brand-800">Manufacturing Facility (FSSAI Lic. 20126211000610)</p>
                  <p className="text-gray-800 font-medium mt-1">{brandInfo.registeredAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Support Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-warm-200">
              
              {ticketId ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-950">Inquiry Received!</h3>
                  <p className="text-xs text-gray-600 max-w-md mx-auto">
                    Thank you for contacting WellBeingByNatureCo. Your support ticket ID is:
                  </p>
                  <div className="font-mono font-bold text-sm bg-warm-100 text-brand-950 px-4 py-2 rounded-xl inline-block border border-warm-300">
                    {ticketId}
                  </div>
                  <p className="text-[11px] text-gray-500">
                    A wellness representative will review your message and reach out via email/phone within 2-4 hours.
                  </p>
                  <button
                    onClick={() => setTicketId(null)}
                    className="bg-brand-950 text-gold-300 text-xs font-bold px-6 py-2.5 rounded-full hover:bg-brand-900 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-950 mb-1">Send Us a Direct Message</h3>
                  <p className="text-xs text-gray-500 mb-6">
                    Fill in your details below and our team will get back to you promptly.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 font-mono mb-1">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Radhika Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 font-mono mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. radhika@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 font-mono mb-1">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. +91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 font-mono mb-1">
                          Inquiry Type
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand-800"
                        >
                          <option>General Inquiry</option>
                          <option>Order Status & Tracking</option>
                          <option>Seed Cycling Guidance</option>
                          <option>Bulk & Corporate Gifting</option>
                          <option>Dietary / Nutrition Advice</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 font-mono mb-1">
                        How Can We Assist? *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Write your message here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand-800"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-950 hover:bg-brand-900 text-gold-300 font-bold py-3.5 rounded-2xl transition shadow-md flex items-center justify-center space-x-2 text-xs uppercase tracking-wider border border-gold-500/30"
                    >
                      <Send size={15} />
                      <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry to Wellness Care"}</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
