import React from 'react';
import { ShieldCheck, FileText, Truck, RotateCcw, Lock } from 'lucide-react';
import { brandInfo } from '../data/brandInfo';

export function PolicyPage({ policyType = 'privacy' }) {
  const policies = {
    privacy: {
      title: "Privacy & Data Protection Policy",
      subtitle: "Last Updated: August 2026",
      icon: Lock,
      content: [
        {
          heading: "1. Information We Collect",
          body: "When you browse our store, place an order, or subscribe to wellness newsletters at WellBeingByNatureCo, we collect personal information including your name, shipping address, email, phone number, and transaction details. We never store credit/debit card numbers; all payments are processed through PCI-DSS certified gateway partners."
        },
        {
          heading: "2. How We Use Your Data",
          body: "Your information is used strictly to fulfill your orders, provide dispatch tracking updates, offer personalized nutritional guidance through Dr. Botanica AI, and share exclusive seasonal discounts. We never sell, rent, or trade your personal data with third-party advertising brokers."
        },
        {
          heading: "3. Cookies & Analytics",
          body: "We use essential cookies to maintain your shopping bag and wishlist state. Anonymous analytics help us improve page loading speeds and optimize our mobile e-commerce experience."
        },
        {
          heading: "4. Your Rights & Data Requests",
          body: `You may request a copy of your personal data or request deletion of your account at any time by emailing our Data Privacy Officer at ${brandInfo.email}.`
        }
      ]
    },
    terms: {
      title: "Terms & Conditions of Service",
      subtitle: "Governing Law: Republic of India",
      icon: FileText,
      content: [
        {
          heading: "1. Botanical Wellness Disclaimer",
          body: "The products offered by WellBeingByNatureCo (including Seed Cycling packs, Morning Shots, Rajamudi Red Rice, and Millet Mixed Powder) are whole-food nutritional products and nutraceuticals manufactured under FSSAI license 20126211000610. They are intended to support everyday vitality and are not intended to diagnose, cure, mitigate, or treat any medical disease."
        },
        {
          heading: "2. Pricing & Orders",
          body: "All prices listed are in Indian Rupees (INR) and are inclusive of Goods & Services Tax (GST). We reserve the right to modify promotional pricing or cancel orders resulting from typographical pricing errors."
        },
        {
          heading: "3. Intellectual Property",
          body: "All content, artwork, photography, logo marks, and packaging illustrations are the exclusive proprietary property of WellBeing By Nature Co."
        }
      ]
    },
    shipping: {
      title: "Shipping & Delivery Policy",
      subtitle: "Pan-India Express Logistics",
      icon: Truck,
      content: [
        {
          heading: "1. Free Shipping Threshold",
          body: "All domestic orders with a net subtotal of ₹999 or above automatically qualify for Free Express Delivery across India. For orders below ₹999, a nominal flat delivery charge of ₹50 is applied."
        },
        {
          heading: "2. Dispatch & Delivery Timelines",
          body: "Orders placed before 2:00 PM IST Monday through Saturday are dispatched the same day from our Bengaluru and Anantapur fulfillment centers. Delivery times are 2–3 business days for tier-1 metro cities (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Kolkata) and 3–5 business days for regional pin codes."
        },
        {
          heading: "3. Order Tracking",
          body: "Upon dispatch, you will receive an SMS and WhatsApp notification containing your live courier tracking link (BlueDart / Delhivery / DTDC)."
        }
      ]
    },
    refund: {
      title: "Refund, Returns & Cancellation Policy",
      subtitle: "100% Customer Satisfaction Guarantee",
      icon: RotateCcw,
      content: [
        {
          heading: "1. Damaged or Defective Shipments",
          body: "If your parcel arrives damaged, unsealed, or compromised in transit, please notify us within 48 hours of delivery at care@wellbeingbynature.co with a photo of the outer box. We will immediately dispatch a fresh replacement free of charge or initiate a full 100% refund."
        },
        {
          heading: "2. Cancellation Window",
          body: "You may cancel an order anytime before it has been dispatched from our fulfillment facility by contacting our WhatsApp helpline at +91 98765 43210. Once dispatched, standard return guidelines apply."
        },
        {
          heading: "3. Food Safety & Hygiene Note",
          body: "Due to strict FSSAI food safety regulations, consumable botanical products and opened seed packages cannot be returned once unsealed, except in verified cases of transit damage or quality defects."
        }
      ]
    }
  };

  const currentPolicy = policies[policyType] || policies.privacy;
  const IconComponent = currentPolicy.icon;

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-warm-200 flex items-center space-x-5">
          <div className="w-14 h-14 rounded-2xl bg-brand-950 text-gold-400 flex items-center justify-center shrink-0 border border-gold-400/50 shadow-md">
            <IconComponent size={28} />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-600">
              {currentPolicy.subtitle}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950">
              {currentPolicy.title}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">WellBeing By Nature Co. Legal & Compliance Documentation</p>
          </div>
        </div>

        {/* Content Clauses */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-warm-200 space-y-8">
          {currentPolicy.content.map((clause, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-serif text-base sm:text-lg font-bold text-brand-950">
                {clause.heading}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {clause.body}
              </p>
            </div>
          ))}

          <div className="pt-6 border-t border-warm-200 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-gray-500 gap-3">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck size={14} className="text-brand-700" />
              <span>FSSAI Lic. No: {brandInfo.fssaiNumber}</span>
            </span>
            <span>Support: {brandInfo.email}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
