import React, { useState } from 'react';
import { quizQuestions, quizRecommendations } from '../data/quizData';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  ShoppingBag,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RoutineQuizModal = ({ isOpen, onClose, onSelectProduct }) => {
  if (!isOpen) return null;

  const { addToCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTarget, setSelectedTarget] = useState('gut');
  const [isCompleted, setIsCompleted] = useState(false);
  const [bundleAdded, setBundleAdded] = useState(false);

  const handleOptionSelect = (option) => {
    if (currentStep === 0 && option.target) {
      setSelectedTarget(option.target);
    }

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsCompleted(false);
    setBundleAdded(false);
    setSelectedTarget('gut');
  };

  const recommendation = quizRecommendations[selectedTarget] || quizRecommendations.gut;
  const recommendedProducts = products.filter((p) => recommendation.productIds.includes(p.id));

  const handleAddBundleToCart = () => {
    recommendedProducts.forEach((prod) => {
      addToCart(prod, null, 1);
    });
    setBundleAdded(true);
    setTimeout(() => {
      setBundleAdded(false);
      onClose();
    }, 1200);
  };

  const currentQ = quizQuestions[currentStep];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-warm-300 overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 text-gray-700 flex items-center justify-center transition"
          aria-label="Close Quiz"
        >
          <X size={18} />
        </button>

        {!isCompleted ? (
          /* Quiz Question View */
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-2">
                <span className="flex items-center space-x-1 text-brand-800 uppercase tracking-wider">
                  <Sparkles size={13} className="text-gold-500" />
                  <span>Personalized Wellness Finder</span>
                </span>
                <span>Step {currentStep + 1} of {quizQuestions.length}</span>
              </div>
              <div className="w-full bg-warm-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-brand-800 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Title */}
            <div className="text-center pt-2">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 leading-snug">
                {currentQ.question}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Select the option that best matches your health priority.
              </p>
            </div>

            {/* Options Grid */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(opt)}
                  className="w-full p-4 rounded-2xl bg-warm-50 hover:bg-brand-50 border border-warm-200 hover:border-brand-400 text-left transition-all duration-200 flex items-center justify-between group shadow-xs hover:shadow-md"
                >
                  <div className="flex items-center space-x-3.5">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{opt.icon}</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-brand-900">
                      {opt.label}
                    </span>
                  </div>
                  <ArrowRight size={18} className="text-gray-400 group-hover:text-brand-800 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>

          </div>
        ) : (
          /* Recommendation Result View */
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            
            {/* Header Badge */}
            <div className="text-center space-y-2">
              <span className="bg-coral-100 text-coral-700 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border border-coral-200">
                ✨ Tailored 30-Day Routine Protocol
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 leading-tight">
                {recommendation.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
                {recommendation.description}
              </p>
            </div>

            {/* Recommended Products Showcase */}
            <div className="space-y-3 bg-[#FAF8F5] p-4 rounded-2xl border border-warm-200">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Included in Your Stack ({recommendedProducts.length} Items):
              </p>
              <div className="space-y-2.5">
                {recommendedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-warm-200 shadow-xs"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={prod.image} alt={prod.name} className="w-12 h-12 object-contain rounded-lg bg-warm-50 p-1" />
                      <div>
                        <p className="text-xs font-bold text-gray-900">{prod.name}</p>
                        <p className="text-[11px] text-gray-500">{prod.packSize} • <span className="font-semibold text-brand-900">₹{prod.price}</span></p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-brand-50 text-brand-800 px-2 py-0.5 rounded font-bold border border-brand-200">
                      Step Included
                    </span>
                  </div>
                ))}
              </div>

              {/* Bundle Pricing Summary */}
              <div className="pt-3 border-t border-warm-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Bundle Price ({recommendation.discountPercent}% Off):</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-extrabold text-brand-950">₹{recommendation.bundlePrice}</span>
                    <span className="text-xs text-gray-400 line-through">₹{recommendation.originalPrice}</span>
                    <span className="text-xs text-brand-700 font-bold">Save ₹{recommendation.savings}</span>
                  </div>
                </div>

                <button
                  onClick={handleAddBundleToCart}
                  className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-md ${
                    bundleAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-coral-500 hover:bg-coral-600 text-white shadow-coral-500/30'
                  }`}
                >
                  {bundleAdded ? (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Added Bundle to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>Add Full Stack to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Retake Button */}
            <div className="text-center pt-1">
              <button
                onClick={handleReset}
                className="text-xs font-bold text-gray-500 hover:text-brand-800 flex items-center justify-center space-x-1 mx-auto"
              >
                <RotateCcw size={13} />
                <span>Retake Quiz with different answers</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
