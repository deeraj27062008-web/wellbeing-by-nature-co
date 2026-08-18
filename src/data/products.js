import { getAssetUrl } from '../utils/assetHelper';

const rawProducts = [
  {
    id: "rajamudi-red-rice",
    slug: "rajamudi-red-rice",
    name: "Rajamudi Red Rice (100% Traditional Heirloom)",
    brand: "WellBeingByNatureCo",
    tagline: "NURTURE • BALANCE • THRIVE",
    subtitle: "Ancient Grain • Naturally Nutritious • Wholesome Everyday Rice",
    category: "Traditional Grains & Superfoods",
    concern: "Heart Health & Metabolism",
    price: 499,
    mrp: 599,
    discountPercent: 17,
    rating: 4.92,
    reviewCount: 842,
    badge: "HEIRLOOM HERITAGE",
    isAuthenticFlagship: true,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 150,
    weight: "1 KG",
    packSize: "1 KG",
    image: "/images/products/rajamudi-red-rice-front.jpg",
    backImage: "/images/products/rajamudi-red-rice-front.jpg",
    images: [
      "/images/products/rajamudi-red-rice-front.jpg",
      "/images/products/seed-cycling-artwork.jpg"
    ],
    variants: [
      { id: "1kg", size: "1 KG", price: 499, mrp: 599, discount: "17% OFF", savings: "₹100" },
      { id: "2kg", size: "2 KG (Pack of 2)", price: 949, mrp: 1198, discount: "21% OFF", savings: "₹249" },
      { id: "4kg", size: "4 KG (Family Saver)", price: 1799, mrp: 2396, discount: "25% OFF", savings: "₹597" }
    ],
    tags: [
      "100% Natural",
      "Rich in Fibre",
      "Low Glycemic Index",
      "Supports Heart Health",
      "Rich in Antioxidants",
      "Naturally Gluten Free",
      "Non GMO",
      "Hygienically Packed"
    ],
    benefits: [
      "100% Traditional royal heirloom grain packed with bioavailable micronutrients",
      "Low Glycemic Index prevents rapid insulin spikes and sustains long-lasting energy",
      "Abundant natural anthocyanins and red bran antioxidants for cardiovascular wellness",
      "High dietary fibre content supports smooth digestion, gut flora, and satiety",
      "Naturally gluten-free with a nutty aroma and hearty, wholesome mouthfeel"
    ],
    ingredients: "100% Pure Rajamudi Red Rice",
    ingredientsList: [
      { name: "Rajamudi Red Rice", note: "Traditional unpolished grain with nutrient-dense outer red bran intact" }
    ],
    howToUse: "Rinse rice thoroughly in cold water and soak for 30–45 minutes. Cook using 2.5 cups of water for every 1 cup of rice. Simmer gently on low flame until tender and fragrant.",
    storage: "Store in a cool, dry place inside an airtight container. Keep away from direct sunlight and moisture.",
    nutrition: {
      servingSize: "50g Uncooked (20 Servings Per 1 KG Pack)",
      servingsPerPack: 20,
      items: [
        { label: "Energy", per100g: "346 kcal", perServing: "173 kcal", rda: "8.65%" },
        { label: "Protein", per100g: "7.7 g", perServing: "3.9 g", rda: "7.22%" },
        { label: "Carbohydrate", per100g: "76.0 g", perServing: "38.0 g", rda: "--" },
        { label: "Dietary Fiber", per100g: "3.6 g", perServing: "1.8 g", rda: "7.20%" },
        { label: "Total Fat", per100g: "1.6 g", perServing: "0.8 g", rda: "1.19%" },
        { label: "Iron (mg)", per100g: "2.6 mg", perServing: "1.3 mg", rda: "7.22%" },
        { label: "Calcium (mg)", per100g: "17.0 mg", perServing: "8.5 mg", rda: "1.42%" }
      ]
    },
    fssai: "20126211000610",
    batchNo: "WB/RR/0526",
    mfgDate: "15 May 2026",
    bestBefore: "14 May 2027",
    manufacturer: "WellBeing By Nature Co., Door No. 12-3-514-18, Sai Nagar, Revenue Ward 12, Anantapur, Andhra Pradesh - 515004",
    shortDescription: "Authentic unpolished heirloom red rice prized for centuries. Naturally packed with dietary fibre, antioxidants, and a gentle low-glycemic profile.",
    description: "Rajamudi Red Rice is a historic heirloom grain revered for its exceptional nutritional density and earthy aroma. Unlike stripped white rice, our Rajamudi rice preserves its ruby-red bran layer, delivering abundant natural anthocyanins, essential dietary fibre, iron, and slow-burning complex carbohydrates that nourish without blood sugar spikes."
  },
  {
    id: "morning-shots-gut-drink",
    slug: "morning-shots",
    name: "Morning Shots | Gut Friendly Drink Mix",
    brand: "WellBeingByNatureCo",
    tagline: "NURTURE • BALANCE • THRIVE",
    subtitle: "Nourish Your Gut. Elevate Your Life.",
    category: "Gut Health & Morning Shots",
    concern: "Gut Health & Detox",
    price: 349,
    mrp: 449,
    discountPercent: 22,
    rating: 4.96,
    reviewCount: 1280,
    badge: "DAILY GUT ELIXIR",
    isAuthenticFlagship: true,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 220,
    weight: "200g (or 10 Sachets / 50g)",
    packSize: "10 Sachets (50g) / 200g Pack",
    image: "/images/products/morning-shots-10sachets.jpg",
    backImage: "/images/products/morning-shots-200g.jpg",
    images: [
      "/images/products/morning-shots-10sachets.jpg",
      "/images/products/morning-shots-200g.jpg"
    ],
    variants: [
      { id: "10sachets", size: "10 Sachets (50g)", price: 349, mrp: 449, discount: "22% OFF", savings: "₹100" },
      { id: "200g", size: "200g Jar (40 Servings)", price: 599, mrp: 799, discount: "25% OFF", savings: "₹200" },
      { id: "bundle-30", size: "30 Sachets (Monthly Regimen)", price: 899, mrp: 1347, discount: "33% OFF", savings: "₹448" }
    ],
    tags: [
      "Turmeric • Amla • Ginger",
      "Gut Friendly",
      "Daily Detox",
      "Immunity Boost",
      "No Artificial Flavours",
      "No Preservatives",
      "No Added Sugar",
      "100% Natural"
    ],
    benefits: [
      "Targeted synergy of Turmeric, Amla & Dried Ginger designed to nurture healthy gut flora",
      "Soothes occasional morning bloating, acid discomfort, and sluggish digestion",
      "Amla is rich in natural Vitamin C for cellular antioxidant defence and skin radiance",
      "Ginger powder stimulates natural gastric enzymes and smooth intestinal transit",
      "Zero added sugar, zero chemical binders, zero synthetic flavorings"
    ],
    ingredients: "Turmeric Powder, Amla Dried Powder, Dried Ginger Powder",
    ingredientsList: [
      { name: "Turmeric Powder", note: "Standardized golden curcumin to ease digestive inflammation" },
      { name: "Amla Dried Powder", note: "Pure Indian Gooseberry delivering bioavailable Vitamin C & bioflavonoids" },
      { name: "Dried Ginger Powder", note: "Warming gingerols to kindle metabolic fire and ease gastric heaviness" }
    ],
    howToUse: "Mix 1 sachet (5g) or 1 tablespoon with 200ml–250ml of lukewarm water. Stir well & drink first thing in the morning on an empty stomach for maximum absorption.",
    storage: "Store in a cool, dry place away from direct heat and sunlight. Seal pouch/jar tightly after each use.",
    nutrition: {
      servingSize: "1 Sachet (5g) / 10 Sachets (50g) & 200g (40 Servings)",
      servingsPerPack: 10,
      items: [
        { label: "Energy (kcal)", per100g: "358", perServing: "17.9", rda: "0.90%" },
        { label: "Protein (g)", per100g: "6.2", perServing: "0.31", rda: "0.57%" },
        { label: "Carbohydrate (g)", per100g: "76.1", perServing: "3.81", rda: "--" },
        { label: "Total Sugars (g)", per100g: "1.8", perServing: "0.09", rda: "--" },
        { label: "Added Sugars (g)", per100g: "0.0", perServing: "0.0", rda: "0.00%" },
        { label: "Total Fat (g)", per100g: "6.8", perServing: "0.34", rda: "0.51%" },
        { label: "Saturated Fat (g)", per100g: "1.9", perServing: "0.10", rda: "0.45%" },
        { label: "Trans Fat (g)", per100g: "0.0", perServing: "0.0", rda: "0.00%" },
        { label: "Dietary Fibre (g)", per100g: "8.7", perServing: "0.44", rda: "1.76%" },
        { label: "Sodium (mg)", per100g: "28.0", perServing: "1.40", rda: "0.07%" }
      ]
    },
    fssai: "20126211000610",
    batchNo: "WBN/MS/0626",
    mfgDate: "11 July 2026",
    bestBefore: "11 January 2027",
    manufacturer: "WellBeing By Nature Co., Door No. 12-3-514-18, Sai Nagar, Revenue Ward 12, Anantapur, Andhra Pradesh, India - 515004",
    barcode: "8 906189 700015",
    shortDescription: "A soothing morning botanical blend of pure Turmeric, Amla, and Ginger crafted to ignite clean digestion, natural immunity, and daily gut vitality.",
    description: "Morning Shots is a therapeutic nutraceutical crafted to support your microbiome with every sunrise. By harmonizing raw dried Amla with golden Turmeric and warming Dried Ginger, it cleanses your internal pathways, enhances natural metabolic bile flow, and establishes a balanced digestive foundation for your entire day."
  },
  {
    id: "seed-cycling-phase-1",
    slug: "seed-cycling-phase-1",
    name: "Seed Cycling Pack | Phase 1 (Days 1–14)",
    brand: "WellBeingByNatureCo",
    tagline: "NURTURE • BALANCE • THRIVE",
    subtitle: "Flax Seeds & Pumpkin Seeds | Follicular Phase Balance",
    category: "Hormone Balance & Women's Health",
    concern: "Hormone Balance",
    price: 499,
    mrp: 599,
    discountPercent: 17,
    rating: 4.93,
    reviewCount: 710,
    badge: "HORMONE BALANCE",
    isAuthenticFlagship: true,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 95,
    weight: "250g",
    packSize: "250g (14 Servings)",
    image: "/images/products/seed-cycling-artwork.jpg",
    backImage: "/images/products/seed-cycling-artwork.jpg",
    images: [
      "/images/products/seed-cycling-artwork.jpg"
    ],
    variants: [
      { id: "250g", size: "250g (14 Days)", price: 499, mrp: 599, discount: "17% OFF", savings: "₹100" },
      { id: "500g", size: "500g (2 Cycles)", price: 899, mrp: 1198, discount: "25% OFF", savings: "₹299" }
    ],
    tags: [
      "Flax Seeds & Pumpkin Seeds",
      "Rich in Omega-3 & Zinc",
      "Follicular Phase (Days 1-14)",
      "Supports Hormone Balance",
      "Reduces Bloating & Inflammation",
      "Improves Skin & Hair"
    ],
    benefits: [
      "Naturally modulates estrogen levels during Days 1–14 with plant lignans from Flax seeds",
      "High Zinc & Magnesium in raw Pumpkin seeds prime the body for healthy progesterone synthesis",
      "Abundant Omega-3 fatty acids help calm systemic inflammation and menstrual cramps",
      "Supports clearer skin, consistent morning energy, and cycle regularity"
    ],
    ingredients: "Flax Seeds, Pumpkin Seeds (100% Raw, Unroasted, Pure Whole Seeds)",
    ingredientsList: [
      { name: "Flax Seeds", note: "Rich in Omega-3 Alpha-Linolenic Acid (ALA) & balancing lignans" },
      { name: "Pumpkin Seeds", note: "Rich in bioavailable Zinc & Magnesium to support ovarian health" }
    ],
    howToUse: "Take 1 Tbsp (10g each seed) of Flax & Pumpkin Seeds daily. Chew well or grind and add to smoothies, salads, oats, or warm meals. Follow Phase 1 for Days 1–14, then move to Phase 2.",
    storage: "Store in an airtight glass container in a cool, dry place. Grinding fresh before consumption is recommended.",
    nutrition: {
      servingSize: "1 Tbsp (10g of each seed = 20g total) | Servings Per Pack: 14",
      servingsPerPack: 14,
      items: [
        { label: "Energy (kcal)", per100g: "534", perServing: "107", rda: "5.35%" },
        { label: "Protein (g)", per100g: "22.2", perServing: "4.4", rda: "8.15%" },
        { label: "Carbohydrate (g)", per100g: "28.6", perServing: "5.7", rda: "--" },
        { label: "Total Sugars (g)", per100g: "1.5", perServing: "0.3", rda: "--" },
        { label: "Added Sugars (g)", per100g: "0.0", perServing: "0.0", rda: "0.00%" },
        { label: "Dietary Fiber (g)", per100g: "27.1", perServing: "5.4", rda: "18.00%" },
        { label: "Total Fat (g)", per100g: "42.7", perServing: "8.5", rda: "12.70%" },
        { label: "Saturated Fat (g)", per100g: "7.0", perServing: "1.4", rda: "6.36%" },
        { label: "Trans Fat (g)", per100g: "0.0", perServing: "0.0", rda: "0.00%" },
        { label: "Sodium (mg)", per100g: "12.0", perServing: "2.4", rda: "0.12%" },
        { label: "Calcium (mg)", per100g: "162.0", perServing: "32.4", rda: "3.24%" },
        { label: "Iron (mg)", per100g: "6.5", perServing: "1.3", rda: "7.22%" },
        { label: "Zinc (mg)", per100g: "8.2", perServing: "1.6", rda: "14.55%" },
        { label: "Magnesium (mg)", per100g: "262.0", perServing: "52.4", rda: "15.41%" }
      ]
    },
    fssai: "20126211000610",
    batchNo: "WB 07/26",
    mfgDate: "27 May 2025",
    bestBefore: "26 Nov 2025",
    manufacturer: "WellBeing By Nature Co., Door No 12-3-514-18, Sai Nagar, Revenue Ward 12, Anantapur Rural, Anantapur Andhra Pradesh - 515004",
    shortDescription: "Formulated specifically for Days 1–14 of your menstrual cycle, combining premium Flax & Pumpkin seeds to support balanced estrogen and reduce bloating.",
    description: "Phase 1 Seed Cycling is tailored for the follicular phase (Days 1 to 14 from the first day of your period). Combining unroasted Flax and Pumpkin seeds, it provides crucial lignans, zinc, and omega-3 fatty acids that nurture healthy estrogen metabolism and encourage vibrant ovulatory health."
  },
  {
    id: "seed-cycling-phase-2",
    slug: "seed-cycling-phase-2",
    name: "Seed Cycling Pack | Phase 2 (Days 15–28)",
    brand: "WellBeingByNatureCo",
    tagline: "NURTURE • BALANCE • THRIVE",
    subtitle: "Sesame Seeds & Sunflower Seeds | Luteal Phase Harmony",
    category: "Hormone Balance & Women's Health",
    concern: "Hormone Balance",
    price: 499,
    mrp: 599,
    discountPercent: 17,
    rating: 4.90,
    reviewCount: 680,
    badge: "HORMONE BALANCE",
    isAuthenticFlagship: true,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 88,
    weight: "250g",
    packSize: "250g (14 Servings)",
    image: "/images/products/seed-cycling-artwork.jpg",
    backImage: "/images/products/seed-cycling-artwork.jpg",
    images: [
      "/images/products/seed-cycling-artwork.jpg"
    ],
    variants: [
      { id: "250g", size: "250g (14 Days)", price: 499, mrp: 599, discount: "17% OFF", savings: "₹100" },
      { id: "500g", size: "500g (2 Cycles)", price: 899, mrp: 1198, discount: "25% OFF", savings: "₹299" }
    ],
    tags: [
      "Sesame Seeds & Sunflower Seeds",
      "Rich in Calcium, Iron & Vitamin E",
      "Luteal Phase (Days 15-28)",
      "Helps Reduce PMS Symptoms",
      "Promotes Glowing Skin & Vitality"
    ],
    benefits: [
      "Sesame seed sesamin and lignans naturally buffer against excess circulating estrogen",
      "Sunflower seed Vitamin E & Selenium bolster progesterone synthesis in the luteal phase",
      "Significantly eases PMS symptoms, breast tenderness, mood swings, and cramping",
      "Promotes radiant, blemish-free skin and peaceful restorative sleep"
    ],
    ingredients: "Sesame Seeds, Sunflower Seeds (100% Raw, Natural Whole Seeds)",
    ingredientsList: [
      { name: "Sesame Seeds", note: "Rich in Calcium, Iron, and unique lignans to balance hormonal shifts" },
      { name: "Sunflower Seeds", note: "Rich in fat-soluble Vitamin E and trace Selenium for luteal support" }
    ],
    howToUse: "Take 1 Tbsp (10g each seed) of Sesame & Sunflower Seeds daily for Days 15–28. Chew well or grind and mix into your meals, yogurt, or smoothies.",
    storage: "Store in a cool, airtight container away from heat and light.",
    nutrition: {
      servingSize: "1 Tbsp (10g of each seed = 20g total) | Servings Per Pack: 14",
      servingsPerPack: 14,
      items: [
        { label: "Energy (kcal)", per100g: "568", perServing: "114", rda: "5.70%" },
        { label: "Protein (g)", per100g: "20.3", perServing: "4.1", rda: "7.59%" },
        { label: "Carbohydrate (g)", per100g: "20.4", perServing: "4.1", rda: "--" },
        { label: "Total Sugars (g)", per100g: "1.6", perServing: "0.3", rda: "--" },
        { label: "Added Sugars (g)", per100g: "0.0", perServing: "0.0", rda: "0.00%" },
        { label: "Dietary Fiber (g)", per100g: "18.2", perServing: "3.6", rda: "12.00%" },
        { label: "Total Fat (g)", per100g: "48.7", perServing: "9.7", rda: "14.48%" },
        { label: "Saturated Fat (g)", per100g: "6.7", perServing: "1.3", rda: "5.91%" },
        { label: "Trans Fat (g)", per100g: "0.0", perServing: "0.0", rda: "0.00%" },
        { label: "Sodium (mg)", per100g: "11.0", perServing: "2.2", rda: "0.11%" },
        { label: "Calcium (mg)", per100g: "975.0", perServing: "195.0", rda: "19.50%" },
        { label: "Iron (mg)", per100g: "14.5", perServing: "2.9", rda: "16.11%" },
        { label: "Vitamin E (mg)", per100g: "35.2", perServing: "7.0", rda: "46.67%" },
        { label: "Magnesium (mg)", per100g: "325.0", perServing: "65.0", rda: "19.12%" }
      ]
    },
    fssai: "20126211000610",
    batchNo: "WB 07/26",
    mfgDate: "27 May 2025",
    bestBefore: "26 Nov 2025",
    manufacturer: "WellBeing By Nature Co., Door No 12-3-514-18, Sai Nagar, Revenue Ward 12, Anantapur Rural, Anantapur Andhra Pradesh - 515004",
    shortDescription: "Formulated for Days 15–28 (the luteal phase), featuring unroasted Sesame & Sunflower seeds high in Vitamin E, Calcium, and Iron to soothe PMS.",
    description: "Phase 2 Seed Cycling is designed to nurture your body during the luteal phase (Days 15–28). Rich in natural Vitamin E, calcium, and mineral complexes, this synergy aids progesterone balance and keeps skin radiant and moods steady as your cycle concludes."
  },
  {
    id: "seed-cycling-duo-kit",
    slug: "seed-cycling-duo-kit",
    name: "28-Day Hormone Harmony Seed Cycling Duo Kit",
    brand: "WellBeingByNatureCo",
    tagline: "NURTURE • BALANCE • THRIVE",
    subtitle: "Complete Phase 1 + Phase 2 (500g Total) Monthly Hormone Protocol",
    category: "Hormone Balance & Women's Health",
    concern: "Hormone Balance",
    price: 899,
    mrp: 998,
    discountPercent: 10,
    rating: 4.98,
    reviewCount: 1540,
    badge: "COMPLETE 28-DAY KIT",
    isAuthenticFlagship: true,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 120,
    weight: "500g (250g x 2 Packs)",
    packSize: "500g Duo Pack",
    image: "/images/products/seed-cycling-artwork.jpg",
    backImage: "/images/products/seed-cycling-artwork.jpg",
    images: [
      "/images/products/seed-cycling-artwork.jpg"
    ],
    variants: [
      { id: "1month", size: "1 Month Kit (500g)", price: 899, mrp: 998, discount: "10% OFF", savings: "₹99" },
      { id: "3month", size: "3 Months Protocol (1.5 KG)", price: 2399, mrp: 2994, discount: "20% OFF", savings: "₹595" }
    ],
    tags: [
      "Complete 28-Day Cycle",
      "Phase 1 + Phase 2",
      "Flax, Pumpkin, Sesame, Sunflower",
      "Doctor Recommended",
      "Save ₹99"
    ],
    benefits: [
      "Seamlessly spans your complete 28-day cycle for consistent endocrine harmony",
      "Targets hormonal acne, erratic cycle lengths, period fatigue, and bloating",
      "Supplies whole-food Omega-3, Zinc, Magnesium, Calcium, Iron & Vitamin E",
      "100% natural, unroasted, preservative-free whole superfood seeds"
    ],
    ingredients: "Phase 1: Flax Seeds & Pumpkin Seeds (250g). Phase 2: Sesame Seeds & Sunflower Seeds (250g).",
    howToUse: "Take 1 Tbsp daily of Phase 1 (Days 1–14), then switch to 1 Tbsp daily of Phase 2 (Days 15–28). Repeat every cycle.",
    storage: "Keep both packs in airtight containers in a cool, dry place.",
    nutrition: {
      servingSize: "20g per day (28 Servings Total)",
      servingsPerPack: 28,
      items: [
        { label: "Average Energy", per100g: "551 kcal", perServing: "110 kcal", rda: "5.5%" },
        { label: "Bioavailable Zinc", per100g: "High", perServing: "1.6 mg", rda: "14.55%" },
        { label: "Natural Vitamin E", per100g: "35.2 mg", perServing: "7.0 mg", rda: "46.67%" }
      ]
    },
    fssai: "20126211000610",
    batchNo: "WB 07/26",
    mfgDate: "27 May 2025",
    bestBefore: "26 Nov 2025",
    manufacturer: "WellBeing By Nature Co., Anantapur, Andhra Pradesh - 515004",
    shortDescription: "The complete 28-day hormone balance protocol combining both Phase 1 and Phase 2 in one discounted value duo pack.",
    description: "The complete 28-day Seed Cycling duo provides full-spectrum nutritional support designed to synchronize with women's natural hormonal biorhythms. By rotating specific seeds across the follicular and luteal phases, it fosters regular cycles, blemish-free skin, and steady emotional vitality."
  },
  {
    id: "millet-mixed-powder",
    slug: "millet-mixed-powder",
    name: "Millet Mixed Powder (Nourishing Blend. Naturally.)",
    brand: "WellBeingByNatureCo",
    tagline: "NURTURE • BALANCE • THRIVE",
    subtitle: "Ragi • Jowar • Chickpea • Foxtail Millet | 100% Whole Supergrain Blend",
    category: "Traditional Grains & Superfoods",
    concern: "Daily Nutrition & Energy",
    price: 449,
    mrp: 549,
    discountPercent: 18,
    rating: 4.91,
    reviewCount: 520,
    badge: "100% WHOLE GRAIN",
    isAuthenticFlagship: true,
    isBestseller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 110,
    weight: "1 KG",
    packSize: "1 KG",
    image: "/images/products/millet-mixed-powder.jpg",
    backImage: "/images/products/millet-mixed-powder.jpg",
    images: [
      "/images/products/millet-mixed-powder.jpg",
      "/images/products/seed-cycling-artwork.jpg"
    ],
    variants: [
      { id: "1kg", size: "1 KG", price: 449, mrp: 549, discount: "18% OFF", savings: "₹100" },
      { id: "2kg", size: "2 KG (Pack of 2)", price: 849, mrp: 1098, discount: "23% OFF", savings: "₹249" }
    ],
    tags: [
      "Ragi - Rich in Calcium",
      "Jowar - Protein & Fiber",
      "Chickpea - Plant Protein",
      "Foxtail Millet - Nutrition",
      "No Preservatives",
      "100% Natural"
    ],
    benefits: [
      "Ragi provides rich natural plant calcium for bone density and muscle strength",
      "Jowar delivers clean, slow-digesting dietary fibre to keep hunger cravings at bay",
      "Chickpea supplies natural vegetarian protein to support lean muscle maintenance",
      "Foxtail Millet stabilizes post-meal blood sugar and delivers essential B-vitamins",
      "Versatile blend ideal for nourishing breakfast porridge, rotis, cheelas, or pancakes"
    ],
    ingredients: "Finger Millet (Ragi), Sorghum (Jowar), Bengal Gram (Chickpea), Foxtail Millet",
    ingredientsList: [
      { name: "Ragi (Finger Millet)", note: "Traditional ancient grain exceptionally rich in bioavailable Calcium" },
      { name: "Jowar (Sorghum)", note: "Gluten-free supergrain rich in dietary fiber and essential minerals" },
      { name: "Chickpea (Bengal Gram)", note: "Protein-rich legume enhancing amino acid profile and satiety" },
      { name: "Foxtail Millet", note: "Low-glycemic ancient grain supporting balanced blood sugar" }
    ],
    howToUse: "Mix 2 tablespoons of Millet Mixed Powder with 250ml water or milk. Cook on medium heat for 4–5 minutes while stirring continuously until smooth and aromatic. Add jaggery, fruits, or a pinch of salt to taste.",
    storage: "Keep stored in a clean, airtight container in a dry pantry.",
    nutrition: {
      servingSize: "40g (25 Servings Per 1 KG Pack)",
      servingsPerPack: 25,
      items: [
        { label: "Energy", per100g: "362 kcal", perServing: "145 kcal", rda: "7.25%" },
        { label: "Protein", per100g: "12.4 g", perServing: "5.0 g", rda: "9.25%" },
        { label: "Dietary Fiber", per100g: "11.2 g", perServing: "4.5 g", rda: "15.00%" },
        { label: "Calcium", per100g: "280 mg", perServing: "112 mg", rda: "11.20%" },
        { label: "Iron", per100g: "4.2 mg", perServing: "1.7 mg", rda: "9.44%" }
      ]
    },
    fssai: "20126211000610",
    batchNo: "WB/MMP/0726",
    mfgDate: "20 June 2026",
    bestBefore: "19 Dec 2026",
    manufacturer: "WellBeing By Nature Co., Sai Nagar, Anantapur, Andhra Pradesh - 515004",
    shortDescription: "A wholesome traditional blend of Ragi, Jowar, Chickpea, and Foxtail Millet delivering pure calcium, plant protein, and sustained daily energy.",
    description: "Millet Mixed Powder is an artisanal amalgamation of time-honored Indian supergrains. Combining sprouted Ragi, hearty Jowar, wholesome Chickpea, and delicate Foxtail Millet, this nutrient-dense mix delivers rich plant calcium, fiber, and clean protein for people of all ages."
  }
];

export const initialProducts = rawProducts.map((p) => ({
  ...p,
  image: getAssetUrl(p.image),
  backImage: p.backImage ? getAssetUrl(p.backImage) : getAssetUrl(p.image),
  images: (p.images || [p.image]).map((img) => getAssetUrl(img))
}));

export const products = initialProducts;
