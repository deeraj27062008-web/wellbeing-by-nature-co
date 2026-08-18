export const quizQuestions = [
  {
    id: 1,
    question: "What is your primary wellness goal right now?",
    options: [
      { label: "Improve Gut Digestion & Relieve Bloating", icon: "🫚", target: "gut" },
      { label: "Balance Hormones & Smooth Cycle", icon: "🌸", target: "hormone" },
      { label: "Healthy Heirloom Grains & Daily Nutrition", icon: "🌾", target: "heirloom" },
      { label: "Daily Energy, Plant Calcium & Vitality", icon: "🥣", target: "energy" }
    ]
  },
  {
    id: 2,
    question: "How would you describe your daily routine & diet?",
    options: [
      { label: "Fast-paced lifestyle with morning heaviness or sluggish digestion", icon: "⚡" },
      { label: "Home-cooked meals, looking for authentic clean heirloom grains", icon: "🍲" },
      { label: "Experiencing PMS, hormonal breakouts or cycle shifts", icon: "📅" },
      { label: "Seeking clean plant-based protein and calcium for family wellness", icon: "🌱" }
    ]
  },
  {
    id: 3,
    question: "What format of natural wellness do you prefer?",
    options: [
      { label: "Warm morning botanical elixirs (Turmeric, Amla, Ginger)", icon: "🍵" },
      { label: "Daily unpolished heirloom rice & nutritious millets", icon: "🌾" },
      { label: "Complete 28-day structured seed cycling routine", icon: "🌻" },
      { label: "Traditional nourishing multigrain porridge blends", icon: "🥣" }
    ]
  }
];

export const quizRecommendations = {
  gut: {
    title: "Gut Cleanse & Morning Vitality Stack",
    description: "Formulated to calm morning digestive heaviness, reduce bloating, and nurture friendly gut flora.",
    productIds: ["morning-shots-gut-drink", "rajamudi-red-rice"],
    discountPercent: 15,
    originalPrice: 848,
    bundlePrice: 720,
    savings: 128
  },
  hormone: {
    title: "28-Day Hormone Harmony Protocol Stack",
    description: "Aligns with your natural biological cycle with Phase 1 & 2 raw seeds plus Morning Shots for gut absorption.",
    productIds: ["seed-cycling-duo-kit", "morning-shots-gut-drink"],
    discountPercent: 15,
    originalPrice: 1248,
    bundlePrice: 1049,
    savings: 199
  },
  heirloom: {
    title: "Traditional Heritage Supergrain Stack",
    description: "100% Heirloom Rajamudi Red Rice paired with Millet Mixed Powder for sustained low-GI daily energy.",
    productIds: ["rajamudi-red-rice", "millet-mixed-powder"],
    discountPercent: 15,
    originalPrice: 948,
    bundlePrice: 799,
    savings: 149
  },
  energy: {
    title: "Complete Everyday Superfood Wellness Stack",
    description: "Multi-millet plant calcium porridge, raw seed cycling essentials, and morning gut detox shots.",
    productIds: ["millet-mixed-powder", "morning-shots-gut-drink", "seed-cycling-duo-kit"],
    discountPercent: 20,
    originalPrice: 1697,
    bundlePrice: 1357,
    savings: 340
  }
};
