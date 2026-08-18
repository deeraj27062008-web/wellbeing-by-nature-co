import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer = ({ onSelectProduct }) => {
  const { wishlist, isWishlistOpen, closeWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-warm-300 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-warm-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center space-x-2">
            <Heart size={20} className="fill-coral-500 text-coral-500" />
            <h2 className="font-serif font-bold text-lg text-gray-900">Your Saved Favourites</h2>
            <span className="bg-coral-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full">
              {wishlistedProducts.length}
            </span>
          </div>
          <button
            onClick={closeWishlist}
            className="p-1.5 rounded-full hover:bg-warm-200 text-gray-600 transition"
            aria-label="Close Wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center mx-auto text-gray-400">
                <Heart size={28} />
              </div>
              <p className="text-base font-bold text-gray-800">No saved products yet</p>
              <p className="text-xs text-gray-500">Tap the heart on any product to save it to your wishlist.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-2xl border border-warm-200 shadow-xs"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-warm-200 shrink-0"
                    />
                    <div className="truncate">
                      <p className="text-xs font-bold text-gray-900 truncate">{product.name}</p>
                      <p className="text-xs text-brand-950 font-extrabold mt-0.5">₹{product.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => {
                        addToCart(product);
                        toggleWishlist(product.id);
                      }}
                      className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
                    >
                      Move to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-warm-200 bg-[#FAF8F5]">
          <button
            onClick={closeWishlist}
            className="w-full bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold py-3 rounded-xl transition"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};
