import React, { useState } from 'react';
import { 
  X, 
  Search, 
  ShieldCheck, 
  Award, 
  FileCheck2, 
  CheckCircle2, 
  Download, 
  Sparkles,
  Microscope,
  Building2
} from 'lucide-react';
import { brandInfo } from '../data/brandInfo';

export const BatchVerifierModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [batchQuery, setBatchQuery] = useState('WBN/MS/0626');
  const [searchedBatch, setSearchedBatch] = useState('WBN/MS/0626');

  const batchDatabase = {
    'WBN/MS/0626': {
      product: "Morning Shots | Gut Friendly Drink Mix (10 Sachets)",
      mfgDate: "11 July 2026",
      expiryDate: "11 January 2027 (18 Months)",
      origin: "Direct Organic Harvest (Western Ghats & Anantapur)",
      purityScore: "99.8%",
      fssaiLicense: brandInfo.fssaiNumber,
      tests: [
        { parameter: "Bio-Active Curcuminoid Assay", standard: "> 5.0%", result: "6.24%", status: "PASSED (SUPERIOR)" },
        { parameter: "Amla Vitamin C Retention", standard: "> 450mg/100g", result: "580mg/100g", status: "PASSED" },
        { parameter: "Ginger Gingerol Potency", standard: "> 1.5%", result: "2.1%", status: "PASSED" },
        { parameter: "Heavy Metals (Lead, Mercury, Cadmium)", standard: "Below 0.01 ppm", result: "NOT DETECTED", status: "CLEAN 100%" },
        { parameter: "Pesticide & Chemical Residues", standard: "Zero Tolerance", result: "NIL (PASSED)", status: "PASSED" },
        { parameter: "Microbial Assay (E. coli, Salmonella)", standard: "Absent in 25g", result: "COMPLIANT / ZERO", status: "PASSED" }
      ]
    },
    'WB 07/26': {
      product: "Rajamudi Red Rice (100% Traditional Heirloom 1 KG)",
      mfgDate: "27 May 2026",
      expiryDate: "26 November 2026 (6 Months From Mfg.)",
      origin: "Heirloom Heritage Paddy Farms, Anantapur",
      purityScore: "100% Heirloom",
      fssaiLicense: brandInfo.fssaiNumber,
      tests: [
        { parameter: "Anthocyanin Natural Pigment Index", standard: "Rich Red Bran", result: "HIGH (Natural)", status: "PASSED" },
        { parameter: "Dietary Fibre Retention", standard: "> 3.0g / 100g", result: "3.6g / 100g", status: "PASSED" },
        { parameter: "Moisture Content", standard: "< 14.0%", result: "11.2%", status: "OPTIMAL" },
        { parameter: "Chemical Polishing / Wax", standard: "Zero Tolerance", result: "100% RAW UNPOLISHED", status: "PASSED" },
        { parameter: "Heavy Metals Screen", standard: "Below 0.05 ppm", result: "PASSED (0.00 ppm)", status: "PASSED" }
      ]
    }
  };

  const currentReport = batchDatabase[searchedBatch] || batchDatabase['WBN/MS/0626'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] w-full max-w-3xl rounded-3xl shadow-2xl border border-gold-400/40 overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-brand-950 text-white p-5 sm:p-6 border-b border-gold-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-brand-900 border border-gold-400/50 flex items-center justify-center text-gold-400">
              <Microscope size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 font-bold flex items-center space-x-1">
                <Sparkles size={11} className="mr-1 inline" />
                <span>Haute Quality & Purity Assurance</span>
              </span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                Certificate of Analysis (COA) Lookup
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

        {/* Modal Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          
          {/* Search Box */}
          <div className="bg-white p-4 rounded-2xl border border-warm-300 shadow-xs space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Enter Packaging Batch Number:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={batchQuery}
                onChange={(e) => setBatchQuery(e.target.value.toUpperCase())}
                placeholder="e.g. WBN/MS/0626 or WB 07/26"
                className="flex-1 bg-warm-50 border border-warm-300 rounded-xl px-4 py-2.5 text-xs font-mono font-bold focus:outline-hidden focus:border-brand-700"
              />
              <button
                onClick={() => setSearchedBatch(batchQuery)}
                className="bg-brand-900 hover:bg-brand-800 text-gold-300 font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 shrink-0"
              >
                <Search size={14} />
                <span>Verify Batch</span>
              </button>
            </div>

            {/* Quick Sample Batch Buttons */}
            <div className="flex items-center space-x-2 pt-1 text-[11px] text-gray-500">
              <span className="font-semibold">Quick Select Batch:</span>
              <button
                onClick={() => { setBatchQuery('WBN/MS/0626'); setSearchedBatch('WBN/MS/0626'); }}
                className="text-brand-800 underline font-mono font-bold hover:text-brand-950"
              >
                WBN/MS/0626 (Morning Shots)
              </button>
              <span>•</span>
              <button
                onClick={() => { setBatchQuery('WB 07/26'); setSearchedBatch('WB 07/26'); }}
                className="text-brand-800 underline font-mono font-bold hover:text-brand-950"
              >
                WB 07/26 (Rajamudi Rice)
              </button>
            </div>
          </div>

          {/* Official Certificate Card */}
          <div className="bg-white rounded-2xl border-2 border-gold-400/30 p-5 sm:p-6 shadow-md space-y-5 relative">
            {/* Watermark Emblem */}
            <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1">
              <ShieldCheck size={14} className="text-emerald-700" />
              <span>100% Certified Pure</span>
            </div>

            {/* Certificate Header */}
            <div className="border-b border-warm-200 pb-4">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                Official Laboratory Purity Report
              </p>
              <h3 className="text-base sm:text-lg font-serif font-bold text-gray-900 mt-0.5">
                {currentReport.product}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs">
                <div>
                  <span className="text-[10px] text-gray-500 block">Batch Code:</span>
                  <span className="font-mono font-bold text-brand-950">{searchedBatch}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">Mfg. Date:</span>
                  <span className="font-semibold text-gray-800">{currentReport.mfgDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">Best Before:</span>
                  <span className="font-semibold text-gray-800">{currentReport.expiryDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">FSSAI License:</span>
                  <span className="font-mono font-bold text-brand-900">{currentReport.fssaiLicense}</span>
                </div>
              </div>
            </div>

            {/* Test Results Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2.5 flex items-center space-x-1.5">
                <FileCheck2 size={15} className="text-brand-700" />
                <span>Chemical, Botanical & Microbial Assay:</span>
              </h4>
              <div className="border border-warm-200 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-warm-100 text-[10px] text-gray-600 uppercase">
                    <tr>
                      <th className="p-2.5">Testing Parameter</th>
                      <th className="p-2.5">Regulatory Standard</th>
                      <th className="p-2.5">Observed Value</th>
                      <th className="p-2.5 text-right">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-warm-100 text-[11px]">
                    {currentReport.tests.map((t, idx) => (
                      <tr key={idx} className="hover:bg-warm-50">
                        <td className="p-2.5 font-medium text-gray-900">{t.parameter}</td>
                        <td className="p-2.5 text-gray-500">{t.standard}</td>
                        <td className="p-2.5 font-bold text-brand-900">{t.result}</td>
                        <td className="p-2.5 text-right">
                          <span className="text-emerald-700 font-extrabold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quality Officer Signature Stamp */}
            <div className="pt-3 border-t border-warm-200 flex items-center justify-between text-xs text-gray-500">
              <div>
                <p className="font-bold text-gray-800">Chief Quality Officer</p>
                <p className="text-[10px] text-gray-500 font-mono">WellBeing By Nature Analytical Lab, Bengaluru</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-brand-900 bg-warm-100 px-2.5 py-1 rounded-lg border border-warm-300">
                  Seal of Authenticity Verified ✓
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
