import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  Leaf, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  ShoppingBag, 
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

export function ProductChatbot({ currentProduct = null, isOpen, onClose }) {
  const { addToCart } = useCart();
  const { products } = useProducts();
  
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Initialize greeting based on whether a specific product is open
      if (currentProduct) {
        setMessages([
          {
            id: 'init-1',
            sender: 'bot',
            text: `Hello! I am Dr. Botanica, your WellBeingByNatureCo wellness advisor. 🌿`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          },
          {
            id: 'init-2',
            sender: 'bot',
            text: `I have full clinical & nutritional details on **${currentProduct.name}**. How can I assist your wellness routine today?`,
            quickQuestions: [
              `How do I take this daily?`,
              `What are the active ingredients?`,
              `What are the verified benefits?`,
              `What is the nutritional breakdown?`,
              `Is this 100% natural & safe?`
            ],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        setMessages([
          {
            id: 'init-1',
            sender: 'bot',
            text: `Namaste & Welcome to WellBeingByNatureCo! 🌿 I am Dr. Botanica, your certified botanical wellness guide.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          },
          {
            id: 'init-2',
            sender: 'bot',
            text: `Whether you are curious about **Seed Cycling** for hormone harmony, **Morning Shots** for gut health, **Rajamudi Red Rice**, or **Millet Mixed Powder**, ask me anything!`,
            quickQuestions: [
              `What is the 28-Day Seed Cycling routine?`,
              `How does Morning Shots help gut health?`,
              `What are the benefits of Rajamudi Red Rice?`,
              `How do I cook Millet Mixed Powder?`,
              `What is your FSSAI license & purity standard?`
            ],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    }
  }, [isOpen, currentProduct]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateAnswer = (query) => {
    const q = query.toLowerCase();
    const activeProd = currentProduct;

    // 1. Seed Cycling
    if (q.includes('seed cycling') || (activeProd && activeProd.id.includes('seed-cycling'))) {
      if (q.includes('phase 1') || q.includes('days 1')) {
        return {
          text: `**Seed Cycling Phase 1 (Days 1–14 / Follicular Phase)**:\n• **Ingredients**: 100% Raw Flax Seeds & Pumpkin Seeds (10g each = 1 Tbsp daily).\n• **Action**: Flax lignans modulate estrogen, while Pumpkin seed Zinc & Magnesium prime healthy progesterone production.\n• **Usage**: Take 1 Tbsp daily mixed in smoothies, yogurt, or oats from Day 1 of your cycle.\n• **Nutritional Energy**: 107 kcal per 20g serving, 5.4g fiber, 1.6mg zinc (14.5% RDA).`,
          productLink: products.find(p => p.id === 'seed-cycling-phase-1')
        };
      }
      if (q.includes('phase 2') || q.includes('days 15') || q.includes('luteal')) {
        return {
          text: `**Seed Cycling Phase 2 (Days 15–28 / Luteal Phase)**:\n• **Ingredients**: 100% Raw Sesame Seeds & Sunflower Seeds (10g each = 1 Tbsp daily).\n• **Action**: Sesame lignans buffer against excess estrogen, and Sunflower seed Vitamin E & Selenium support progesterone production.\n• **Benefits**: Helps relieve PMS cramping, mood swings, and promotes skin vitality.\n• **Nutritional Energy**: 114 kcal per 20g serving, 195mg Calcium (19.5% RDA), 7mg Vitamin E (46.7% RDA).`,
          productLink: products.find(p => p.id === 'seed-cycling-phase-2')
        };
      }
      return {
        text: `**The WellBeingByNatureCo 28-Day Seed Cycling Protocol**:\n1. **Phase 1 (Days 1–14)**: 1 Tbsp daily of Flax + Pumpkin seeds to nourish estrogen.\n2. **Phase 2 (Days 15–28)**: 1 Tbsp daily of Sesame + Sunflower seeds to nurture progesterone.\n• **Purity**: 100% raw unroasted whole seeds, zero preservatives, FSSAI certified (Lic. 20126211000610).`,
        productLink: products.find(p => p.id === 'seed-cycling-duo-kit' || p.id === 'seed-cycling-phase-1')
      };
    }

    // 2. Morning Shots
    if (q.includes('morning shot') || q.includes('gut') || q.includes('turmeric') || q.includes('amla') || (activeProd && activeProd.id.includes('morning-shots'))) {
      if (q.includes('how') || q.includes('take') || q.includes('use') || q.includes('dosage')) {
        return {
          text: `**How to take Morning Shots**:\n• **Instruction**: Mix 1 sachet (5g) or 1 tablespoon with 200ml–250ml of lukewarm water. Stir well & drink first thing in the morning on an empty stomach.\n• **Ingredients**: Turmeric Powder, Amla Dried Powder, Dried Ginger Powder.\n• **Key Benefits**: Soothes digestive fire, reduces morning bloating, stimulates bile transit, and provides natural Vitamin C.\n• **Purity**: 0g added sugar, 0% trans fat, 100% plant extracts.`,
          productLink: products.find(p => p.id === 'morning-shots-gut-drink')
        };
      }
      return {
        text: `**Morning Shots | Gut Friendly Drink Mix**:\n• **Ingredients**: Pure Turmeric Powder, Amla Dried Powder, and Ginger Powder.\n• **Nutrition per 5g Sachet**: 17.9 kcal, 0.44g dietary fiber, 0g added sugars, 0.31g protein.\n• **Why it works**: Amla delivers bioavailable Vitamin C, Turmeric eases systemic gut irritation, and Ginger kindles gastric enzyme secretions.\n• **Batch Details**: Batch WBN/MS/0626, FSSAI Lic. 20126211000610.`,
        productLink: products.find(p => p.id === 'morning-shots-gut-drink')
      };
    }

    // 3. Rajamudi Red Rice
    if (q.includes('rajamudi') || q.includes('rice') || (activeProd && activeProd.id.includes('rajamudi'))) {
      if (q.includes('cook') || q.includes('recipe')) {
        return {
          text: `**How to Cook Rajamudi Heirloom Red Rice**:\n1. Rinse thoroughly in fresh water 2 times.\n2. Soak in clean water for 30–45 minutes (helps soften the mineral-dense outer red bran layer).\n3. Use **1 cup rice to 2.5 cups water**.\n4. Cook on low flame until tender and fragrant (approx. 20–25 mins in open pot, or 3 whistles in pressure cooker).\n5. Enjoy with dal, rasam, curries, or as a wholesome antioxidant-rich bowl.`,
          productLink: products.find(p => p.id === 'rajamudi-red-rice')
        };
      }
      return {
        text: `**Rajamudi Red Rice (100% Traditional Heirloom)**:\n• **Origin**: Ancient royal unpolished grain preserved with its nutrient-dense red bran intact.\n• **Nutrition (per 50g serving)**: 173 kcal, 3.9g protein, 1.8g dietary fiber, 1.3mg iron, 8.5mg calcium.\n• **Key Features**: Low Glycemic Index (steady energy without sugar spikes), Heart health anthocyanins, and naturally gluten-free.\n• **100% Natural**: Free of polish, chemicals, or bleaching.`,
        productLink: products.find(p => p.id === 'rajamudi-red-rice')
      };
    }

    // 4. Millet Mixed Powder
    if (q.includes('millet') || q.includes('ragi') || q.includes('jowar') || (activeProd && activeProd.id.includes('millet'))) {
      return {
        text: `**Millet Mixed Powder (Nourishing Blend. Naturally.)**:\n• **Ingredients**: Sprouted Ragi (Calcium), Jowar (Protein & Fiber), Chickpea (Plant Protein), Foxtail Millet (Low GI Energy).\n• **Preparation**: Mix 2 tbsp (40g) in 250ml milk or water, simmer on medium heat for 4–5 mins with continuous stirring until fragrant. Serve with jaggery or a pinch of rock salt.\n• **Benefits**: Supports strong bones, clean muscle recovery, and easy morning digestion.`,
        productLink: products.find(p => p.id === 'millet-mixed-powder')
      };
    }

    // 5. General / Safety / FSSAI / Delivery
    if (q.includes('fssai') || q.includes('safety') || q.includes('certified') || q.includes('pure')) {
      return {
        text: `**Quality, Purity & Regulatory Standards**:\n• **FSSAI License**: 20126211000610\n• **Facility**: Manufactured & Marketed by WellBeing By Nature Co., Bengaluru & Anantapur.\n• **Standards**: 100% non-GMO, zero artificial additives, triple-filtered for heavy metals, and packaged in food-grade eco-safe containers.`
      };
    }

    if (q.includes('shipping') || q.includes('delivery') || q.includes('free ship')) {
      return {
        text: `**Shipping & Delivery Details**:\n• **Free Express Shipping** on all orders above ₹999!\n• Orders are dispatched within 24 hours from our certified fulfillment hubs.\n• Typical delivery timeline is 2–4 business days across major Indian metros, and 3–5 days nationwide.`
      };
    }

    if (q.includes('discount') || q.includes('coupon') || q.includes('offer')) {
      return {
        text: `**Active Wellness Offers**:\n• Use coupon code **NATURE10** for 10% OFF on your order.\n• Use coupon code **WELLNESS15** for 15% OFF on orders above ₹899.\n• Use code **FREESHIP** for free delivery.`
      };
    }

    // Default intelligent response
    return {
      text: `Thank you for your question! At WellBeingByNatureCo, our formulations are built on whole-food bioactives, traditional Indian heritage grains, and clean Ayurvedic wisdom. For the best routine, pair our **Morning Shots** at 7 AM followed by **Seed Cycling** with your breakfast bowl! Would you like specific dosage recommendations?`
    };
  };

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAnswer(text);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        productLink: response.productLink,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 pointer-events-none">
      <div 
        className="w-full sm:w-[420px] max-h-[92vh] sm:max-h-[640px] bg-[#FAF7F2] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gold-400/50 flex flex-col pointer-events-auto overflow-hidden animate-in slide-in-from-bottom-6 duration-200"
      >
        {/* Header */}
        <div className="bg-brand-950 text-white p-4 flex items-center justify-between border-b border-gold-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gold-400/20 border border-gold-400/60 flex items-center justify-center text-gold-300">
              <Bot size={22} />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-serif font-bold text-base text-white">Dr. Botanica AI</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[11px] text-gold-300/90 font-mono">
                {currentProduct ? `Advising on ${currentProduct.name.slice(0, 26)}...` : "WellBeingByNatureCo Wellness Advisor"}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition"
            aria-label="Close Assistant"
          >
            <X size={20} />
          </button>
        </div>

        {/* Product context pill if viewing a specific product */}
        {currentProduct && (
          <div className="bg-brand-900/10 border-b border-brand-900/10 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2 truncate">
              <img src={currentProduct.image} alt={currentProduct.name} className="w-6 h-6 object-contain rounded bg-white" />
              <span className="text-xs font-semibold text-brand-950 truncate">{currentProduct.name}</span>
            </div>
            <span className="text-[10px] bg-brand-950 text-gold-300 font-bold px-2 py-0.5 rounded-full shrink-0">
              ₹{currentProduct.price}
            </span>
          </div>
        )}

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF7F2]">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-brand-950 text-white rounded-br-xs'
                    : 'bg-white text-gray-900 border border-warm-200 rounded-bl-xs'
                }`}
              >
                <div className="whitespace-pre-line">
                  {msg.text.split('\n').map((line, idx) => {
                    if (line.startsWith('•') || line.startsWith('1.') || line.startsWith('2.')) {
                      return <p key={idx} className="mt-1 pl-1 font-medium">{line}</p>;
                    }
                    if (line.includes('**')) {
                      const clean = line.replace(/\*\*/g, '');
                      return <p key={idx} className="font-bold text-brand-950 mt-1">{clean}</p>;
                    }
                    return <p key={idx} className="mt-0.5">{line}</p>;
                  })}
                </div>

                {/* Attached Product CTA card if recommended */}
                {msg.productLink && (
                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between bg-warm-50 p-2 rounded-xl">
                    <div className="flex items-center space-x-2 truncate">
                      <img 
                        src={msg.productLink.image} 
                        alt={msg.productLink.name} 
                        className="w-8 h-8 object-contain rounded bg-white border border-warm-200" 
                      />
                      <div className="truncate">
                        <p className="text-[11px] font-bold text-gray-900 truncate">{msg.productLink.name}</p>
                        <p className="text-[10px] text-brand-700 font-bold">₹{msg.productLink.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(msg.productLink)}
                      className="shrink-0 bg-brand-950 hover:bg-brand-900 text-gold-300 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1"
                    >
                      <ShoppingBag size={11} />
                      <span>Add</span>
                    </button>
                  </div>
                )}

                {/* Quick question suggestion chips */}
                {msg.quickQuestions && msg.quickQuestions.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap gap-1.5">
                    {msg.quickQuestions.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(chip)}
                        className="text-[10px] text-brand-900 bg-brand-50 hover:bg-brand-100 border border-brand-200 px-2.5 py-1 rounded-full text-left transition font-medium"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[9px] text-gray-600 mt-1 px-1">{msg.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-1.5 bg-white border border-warm-200 text-gray-600 p-2.5 rounded-2xl w-fit text-xs">
              <Sparkles size={13} className="text-gold-500 animate-spin" />
              <span>Dr. Botanica is reviewing verified botanical data...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-warm-200">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about dosage, ingredients, recipe..."
              className="flex-1 bg-warm-50 border border-warm-300 rounded-full px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand-800 transition"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="w-10 h-10 rounded-full bg-brand-950 hover:bg-brand-900 disabled:opacity-40 text-gold-300 flex items-center justify-center transition shadow-sm"
              aria-label="Send query"
            >
              <Send size={16} />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-gray-600 px-2 mt-2">
            <span className="flex items-center space-x-1">
              <ShieldCheck size={11} className="text-brand-700" />
              <span>FSSAI Lic. 20126211000610 Verified</span>
            </span>
            <span>100% Natural Wisdom</span>
          </div>
        </div>
      </div>
    </div>
  );
}
