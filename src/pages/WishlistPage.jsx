import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export function WishlistPage({ onGoShop, onSelectProduct }) {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 text-center shadow-sm border border-warm-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-coral-50 text-coral-500 flex items-center justify-center mx-auto">
            <Heart size={28} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-brand-950">Your Wishlist is Empty</h2>
          <p className="text-xs text-gray-600">
            Save your favorite whole superfoods and hormone balancing kits for later.
          </p>
          <button
            onClick={onGoShop}
            className="w-full bg-brand-950 hover:bg-brand-900 text-gold-300 font-bold text-xs uppercase tracking-wider py-3.5 rounded-2xl transition shadow-md flex items-center justify-center space-x-2 border border-gold-500/30"
          >
            <span>Explore Formulations</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950">Saved Wishlist ({wishlist.length})</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Your curated selection of whole botanical wellness products.</p>
          </div>
          <button
            onClick={clearWishlist}
            className="text-xs text-red-500 hover:text-red-700 font-semibold"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl p-5 shadow-sm border border-warm-200 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square rounded-2xl bg-warm-50/80 p-4 mb-3 flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => onSelectProduct(item)}
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-gray-400 hover:text-red-500 transition shadow-xs"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <span className="text-[10px] font-mono font-bold uppercase text-brand-800 bg-brand-50 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <h4 
                  onClick={() => onSelectProduct(item)}
                  className="font-serif font-bold text-sm text-gray-900 mt-1 hover:text-brand-900 cursor-pointer line-clamp-2"
                >
                  {item.name}
                </h4>
                
                <div className="flex items-baseline space-x-2 mt-2 font-mono">
                  <span className="font-bold text-brand-950 text-sm">₹{item.price}</span>
                  {item.mrp && <span className="text-xs text-gray-600 line-through">₹{item.mrp}</span>}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-warm-200">
                <button
                  onClick={() => {
                    addToCart(item);
                    removeFromWishlist(item.id);
                  }}
                  className="w-full bg-brand-950 hover:bg-brand-900 text-gold-300 text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 shadow-xs"
                >
                  <ShoppingBag size={14} />
                  <span>Move to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
